import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import sdk from '../lib/sdk-instance';

interface BlogSubscriber {
  id: string;
  uid: string;
  email: string;
  blogId: string;
  status: 'active' | 'inactive';
  subscriptionTier: 'free' | 'premium';
  subscribedAt: string;
  preferences: {
    emailNotifications: boolean;
    newPosts: boolean;
    newsletter: boolean;
    categories: string[];
  };
  subscriberType: string;
}

interface BlogSubscriberAuthContextType {
  subscriber: BlogSubscriber | null;
  sessionToken: string | null;
  login: (email: string, password: string, blogId: string) => Promise<void>;
  register: (email: string, password: string, blogId: string, preferences?: Partial<BlogSubscriber['preferences']>) => Promise<void>;
  logout: () => void;
  loading: boolean;
  blogId: string | null;
  setBlogId: (blogId: string) => void;
  updatePreferences: (preferences: Partial<BlogSubscriber['preferences']>) => Promise<void>;
}

const BlogSubscriberAuthContext = createContext<BlogSubscriberAuthContextType | undefined>(undefined);

export const useBlogSubscriberAuth = () => {
  const context = useContext(BlogSubscriberAuthContext);
  if (context === undefined) {
    throw new Error('useBlogSubscriberAuth must be used within a BlogSubscriberAuthProvider');
  }
  return context;
};

interface BlogSubscriberAuthProviderProps {
  children: ReactNode;
}

export const BlogSubscriberAuthProvider: React.FC<BlogSubscriberAuthProviderProps> = ({ children }) => {
  const [subscriber, setSubscriber] = useState<BlogSubscriber | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogIdState] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem('blogSubscriberToken');
    const savedBlogId = localStorage.getItem('blogSubscriberBlogId');
    
    if (savedToken && savedBlogId) {
      validateSession(savedToken, savedBlogId);
    } else {
      setLoading(false);
    }
  }, []);

  const validateSession = async (token: string, blogIdParam: string) => {
    try {
      const sessions = await sdk.get('subscriberSessions');
      const session = sessions.find((s: any) => s.sessionToken === token && s.blogId === blogIdParam);
      
      if (session && new Date(session.expiresAt) > new Date()) {
        const subscribers = await sdk.get('blogSubscribers');
        const currentSubscriber = subscribers.find((s: any) => s.id === session.subscriberId);
        
        if (currentSubscriber) {
          setSubscriber(currentSubscriber);
          setSessionToken(token);
          setBlogIdState(blogIdParam);
        } else {
          localStorage.removeItem('blogSubscriberToken');
          localStorage.removeItem('blogSubscriberBlogId');
        }
      } else {
        // Session expired or invalid
        if (session) {
          await sdk.delete('subscriberSessions', session.id);
        }
        localStorage.removeItem('blogSubscriberToken');
        localStorage.removeItem('blogSubscriberBlogId');
      }
    } catch (error) {
      console.error('Session validation error:', error);
      localStorage.removeItem('blogSubscriberToken');
      localStorage.removeItem('blogSubscriberBlogId');
    } finally {
      setLoading(false);
    }
  };

  const setBlogId = (newBlogId: string) => {
    setBlogIdState(newBlogId);
    localStorage.setItem('blogSubscriberBlogId', newBlogId);
  };

  const register = async (email: string, password: string, blogIdParam: string, preferences?: Partial<BlogSubscriber['preferences']>) => {
    setLoading(true);
    try {
      // Check if subscriber already exists
      const subscribers = await sdk.get('blogSubscribers');
      const existingSubscriber = subscribers.find((s: any) => s.email === email && s.blogId === blogIdParam);
      
      if (existingSubscriber) {
        throw new Error('Email already registered for this blog');
      }

      // Create new subscriber
      const newSubscriber = await sdk.insert('blogSubscribers', {
        email,
        blogId: blogIdParam,
        status: 'active' as const,
        subscriptionTier: 'free' as const,
        subscribedAt: new Date().toISOString(),
        subscriberType: 'blog_subscriber',
        preferences: {
          emailNotifications: true,
          newPosts: true,
          newsletter: true,
          categories: [],
          ...preferences
        }
      }) as BlogSubscriber;

      // Create session
      const sessionTokenValue = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      
      await sdk.insert('subscriberSessions', {
        subscriberId: newSubscriber.id,
        blogId: blogIdParam,
        sessionToken: sessionTokenValue,
        expiresAt: expiresAt.toISOString()
      });

      setSubscriber(newSubscriber);
      setSessionToken(sessionTokenValue);
      setBlogIdState(blogIdParam);
      localStorage.setItem('blogSubscriberToken', sessionTokenValue);
      localStorage.setItem('blogSubscriberBlogId', blogIdParam);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, blogIdParam: string) => {
    setLoading(true);
    try {
      const subscribers = await sdk.get('blogSubscribers');
      const existingSubscriber = subscribers.find((s: any) => s.email === email && s.blogId === blogIdParam);
      
      if (!existingSubscriber) {
        throw new Error('Subscriber not found for this blog');
      }

      if (existingSubscriber.status !== 'active') {
        throw new Error('Account is inactive');
      }

      // Create session
      const sessionTokenValue = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      
      await sdk.insert('subscriberSessions', {
        subscriberId: existingSubscriber.id,
        blogId: blogIdParam,
        sessionToken: sessionTokenValue,
        expiresAt: expiresAt.toISOString()
      });

      setSubscriber(existingSubscriber);
      setSessionToken(sessionTokenValue);
      setBlogIdState(blogIdParam);
      localStorage.setItem('blogSubscriberToken', sessionTokenValue);
      localStorage.setItem('blogSubscriberBlogId', blogIdParam);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<BlogSubscriber['preferences']>) => {
    if (!subscriber) throw new Error('No subscriber logged in');

    try {
      const updatedSubscriber = await sdk.update('blogSubscribers', subscriber.id, {
        preferences: { ...subscriber.preferences, ...newPreferences }
      }) as BlogSubscriber;
      setSubscriber(updatedSubscriber);
    } catch (error) {
      console.error('Update preferences error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (sessionToken) {
      try {
        const sessions = await sdk.get('subscriberSessions');
        const session = sessions.find((s: any) => s.sessionToken === sessionToken);
        if (session) {
          await sdk.delete('subscriberSessions', session.id);
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    setSubscriber(null);
    setSessionToken(null);
    setBlogIdState(null);
    localStorage.removeItem('blogSubscriberToken');
    localStorage.removeItem('blogSubscriberBlogId');
  };

  const value: BlogSubscriberAuthContextType = {
    subscriber,
    sessionToken,
    login,
    register,
    logout,
    loading,
    blogId,
    setBlogId,
    updatePreferences
  };

  return (
    <BlogSubscriberAuthContext.Provider value={value}>
      {children}
    </BlogSubscriberAuthContext.Provider>
  );
};
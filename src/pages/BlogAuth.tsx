import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { useBlogSubscriberAuth } from '../contexts/BlogSubscriberAuthContext';
import { Blog } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { ArrowLeft, Mail, User, Bell, BookOpen } from 'lucide-react';

const BlogAuth: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, subscriber, setBlogId } = useBlogSubscriberAuth();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    preferences: {
      emailNotifications: true,
      newPosts: true,
      newsletter: true,
      categories: [] as string[]
    }
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogSlug) return;
      
      try {
        const blogs = await sdk.get<Blog>('blogs');
        const foundBlog = blogs.find(b => b.slug === blogSlug);
        
        if (foundBlog) {
          setBlog(foundBlog);
          setBlogId(foundBlog.id);
        } else {
          navigate('/not-found');
          return;
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast({
          title: "Error",
          description: "Failed to load blog information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogSlug, setBlogId, navigate, toast]);

  useEffect(() => {
    // Redirect if already logged in
    if (subscriber && blog) {
      navigate(`/${blog.slug}/dashboard`);
    }
  }, [subscriber, blog, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setSubmitting(true);
    try {
      await login(loginForm.email, loginForm.password, blog.id);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate(`/${blog.slug}/dashboard`);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (registerForm.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await register(registerForm.email, registerForm.password, blog.id, registerForm.preferences);
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      navigate(`/${blog.slug}/dashboard`);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/${blog.slug}`)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </Button>
          <h2 className="text-3xl font-bold text-gray-900">
            Join {blog.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {blog.description}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Subscriber Access</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Signing in..." : "Sign In"}
                    <User className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="email-notifications"
                          checked={registerForm.preferences.emailNotifications}
                          onCheckedChange={(checked) => 
                            setRegisterForm(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, emailNotifications: !!checked }
                            }))
                          }
                        />
                        <Label htmlFor="email-notifications" className="text-sm flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="new-posts"
                          checked={registerForm.preferences.newPosts}
                          onCheckedChange={(checked) => 
                            setRegisterForm(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, newPosts: !!checked }
                            }))
                          }
                        />
                        <Label htmlFor="new-posts" className="text-sm flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          New post notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={registerForm.preferences.newsletter}
                          onCheckedChange={(checked) => 
                            setRegisterForm(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, newsletter: !!checked }
                            }))
                          }
                        />
                        <Label htmlFor="newsletter" className="text-sm flex items-center">
                          <Bell className="w-4 h-4 mr-1" />
                          Newsletter subscription
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Creating account..." : "Create Account"}
                    <User className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogAuth;
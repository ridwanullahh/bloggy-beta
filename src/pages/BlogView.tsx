import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, BlogSubscriber, Category } from '../types/blog';
import { getThemeById } from '../constants/themes';
import enhancedSDK from '../lib/enhanced-sdk';
import { Calendar, User, Tag, Mail, Lock, Menu, X, Home, FileText, Phone, Search, Moon, Sun } from 'lucide-react';
import { SearchModal } from '../components/blog/SearchModal';
import { MobileNavigation } from '../components/blog/MobileNavigation';
import { ThemeRenderer } from '../components/themes/ThemeRenderer';
import { UniversalThemeWrapper } from '../components/themes/UniversalThemeWrapper';

const BlogView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        const allBlogs = await enhancedSDK.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === slug && b.status === 'active');
        
        if (!foundBlog) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        // Fetch posts
        const blogPosts = await enhancedSDK.filter<Post>('posts', p => p.blogId === foundBlog.id && p.status === 'published');
        blogPosts.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        
        setPosts(blogPosts);

        // Fetch categories
        try {
          const allCategories = await enhancedSDK.get<Category>('categories');
          const blogCategories = allCategories.filter(c => c.blogId === foundBlog.id);
          setCategories(blogCategories);
        } catch (error) {
          console.log('Categories not found, setting empty array');
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    const unsubscribe = enhancedSDK.subscribe('blogs', (data) => {
      if (data.type === 'update' || data.type === 'refresh') {
        const updatedBlog = Array.isArray(data.data) 
          ? data.data.find((b: Blog) => b.slug === slug)
          : data.data.slug === slug ? data.data : null;
        
        if (updatedBlog) {
          setBlog(updatedBlog);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [slug]);

  const handleSubscribe = async () => {
    if (!blog || !subscriberEmail) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscriberEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubscribing(true);
    try {
      await enhancedSDK.insert<BlogSubscriber>('subscribers', {
        email: subscriberEmail,
        blogId: blog.id,
        status: 'active',
        subscriptionTier: 'free',
        subscriptionDate: new Date().toISOString()
      });

      toast({
        title: "Success",
        description: "Successfully subscribed to the blog!",
      });
      setSubscriberEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. You may already be subscribed.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const handlePostClick = (post: Post) => {
    navigate(`/${slug}/${post.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const theme = getThemeById(blog.theme);
  const customColors = blog.customization?.brandColors;

  return (
    <UniversalThemeWrapper 
      blogSlug={slug!} 
      pageType="home"
      onSearch={() => setSearchModalOpen(true)}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      isDarkMode={isDarkMode}
    >
      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        blog={blog}
        blogSlug={slug || ''}
      />

      {/* Newsletter Subscription Section */}
      {blog.customization?.homepageSettings?.showNewsletter !== false && (
        <div className="border-b" style={{ backgroundColor: customColors?.primary || theme?.styles.primaryColor || '#1F2937' }}>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
              <p className="text-white/90">Get the latest posts delivered right to your inbox</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email to subscribe"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button 
                onClick={handleSubscribe}
                disabled={subscribing || !subscriberEmail}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <Mail className="w-4 h-4 mr-2" />
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Renderer */}
      <ThemeRenderer
        blog={blog}
        posts={posts}
        onPostClick={handlePostClick}
        customColors={customColors}
      />
    </UniversalThemeWrapper>
  );
};

export default BlogView;

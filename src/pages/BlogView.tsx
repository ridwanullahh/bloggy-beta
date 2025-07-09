
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, BlogSubscriber } from '../types/blog';
import { getThemeById } from '../constants/themes';
import sdk from '../lib/sdk-instance';
import { Calendar, User, Tag, Mail, Lock, Menu, X, Home, FileText, Phone, Search, Moon, Sun } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { SearchModal } from '../components/blog/SearchModal';
import { MobileNavigation } from '../components/blog/MobileNavigation';

const BlogView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === slug && b.status === 'active');
        
        if (!foundBlog) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        const allPosts = await sdk.get<Post>('posts');
        const blogPosts = allPosts
          .filter(p => p.blogId === foundBlog.id && p.status === 'published')
          .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
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
      await sdk.insert<BlogSubscriber>('subscribers', {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
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

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
      fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
    }}>
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-xl font-bold cursor-pointer text-white"
                onClick={() => navigate(`/${slug}`)}
              >
                {blog.title}
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate(`/${slug}`)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </button>
              <button 
                onClick={() => navigate(`/${slug}/archive`)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <FileText className="w-4 h-4 mr-1" />
                Archive
              </button>
              <button 
                onClick={() => navigate(`/${slug}/about`)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <User className="w-4 h-4 mr-1" />
                About
              </button>
              <button 
                onClick={() => navigate(`/${slug}/contact`)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </button>
              <button 
                onClick={() => setSearchModalOpen(true)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <Search className="w-4 h-4 mr-1" />
                Search
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Navigation Component */}
            <MobileNavigation
              blog={blog}
              blogSlug={slug}
              onSearch={() => setSearchModalOpen(true)}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        blog={blog}
        blogSlug={slug || ''}
      />

      {/* Blog Header */}
      <div className="bg-white border-b" style={{ backgroundColor: theme?.styles.primaryColor || '#1F2937' }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
          {blog.description && (
            <p className="text-xl text-white/90 mb-4">{blog.description}</p>
          )}
          
          {/* Subscribe Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 max-w-md">
              <div className="flex space-x-2">
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
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h2>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl hover:text-blue-600">
                      {post.title}
                    </CardTitle>
                    {post.monetization?.isPaid && (
                      <Badge variant="secondary" className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Paid
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <div className="flex space-x-1">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {post.excerpt ? (
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  ) : (
                    <p className="text-gray-700 mb-4">
                      {truncateContent(post.content)}
                    </p>
                  )}
                  
                  {post.monetization?.isPaid && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-yellow-800">Premium Content</h4>
                          <p className="text-sm text-yellow-600">
                            This post requires payment to access
                          </p>
                        </div>
                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                          ₦{post.monetization.price}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;

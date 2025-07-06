
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
import { EnhancedSearchModal } from '../components/blog/EnhancedSearchModal';
import { ReadingProgress } from '../components/blog/ReadingProgress';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
        setDarkMode(foundBlog.darkMode || false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
  const isDark = darkMode && blog.darkMode;

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : ''}`}
      style={{ 
        backgroundColor: isDark ? '#111827' : (theme?.styles.secondaryColor || '#F3F4F6'),
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
      }}
    >
      <ReadingProgress theme={theme} />

      {/* Navigation */}
      <nav 
        className={`border-b sticky top-0 z-50 backdrop-blur-lg transition-colors ${
          isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
        }`}
        style={{ 
          backgroundColor: isDark ? '#1F2937CC' : `${theme?.styles.primaryColor}CC`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className={`text-xl font-bold cursor-pointer ${isDark ? 'text-white' : 'text-white'}`}
                onClick={() => navigate(`/${slug}`)}
              >
                {blog.title}
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate(`/${slug}`)}
                className={`hover:opacity-80 flex items-center transition-opacity ${
                  isDark ? 'text-white' : 'text-white'
                }`}
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </button>
              <button 
                onClick={() => navigate(`/${slug}/about`)}
                className={`hover:opacity-80 flex items-center transition-opacity ${
                  isDark ? 'text-white' : 'text-white'
                }`}
              >
                <User className="w-4 h-4 mr-1" />
                About
              </button>
              <button 
                onClick={() => navigate(`/${slug}/contact`)}
                className={`hover:opacity-80 flex items-center transition-opacity ${
                  isDark ? 'text-white' : 'text-white'
                }`}
              >
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </button>
              
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`hover:opacity-80 flex items-center transition-opacity ${
                  isDark ? 'text-white' : 'text-white'
                }`}
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Search</span>
              </button>

              {/* Dark Mode Toggle */}
              {blog.darkMode && (
                <button
                  onClick={toggleDarkMode}
                  className={`hover:opacity-80 transition-opacity ${
                    isDark ? 'text-white' : 'text-white'
                  }`}
                  title="Toggle dark mode"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-md ${isDark ? 'text-white' : 'text-white'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isDark ? 'text-white' : 'text-white'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => {
                    navigate(`/${slug}`);
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:opacity-80 flex items-center py-2 transition-opacity ${
                    isDark ? 'text-white' : 'text-white'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </button>
                <button 
                  onClick={() => {
                    navigate(`/${slug}/about`);
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:opacity-80 flex items-center py-2 transition-opacity ${
                    isDark ? 'text-white' : 'text-white'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  About
                </button>
                <button 
                  onClick={() => {
                    navigate(`/${slug}/contact`);
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:opacity-80 flex items-center py-2 transition-opacity ${
                    isDark ? 'text-white' : 'text-white'
                  }`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </button>
                {blog.darkMode && (
                  <button
                    onClick={() => {
                      toggleDarkMode();
                      setMobileMenuOpen(false);
                    }}
                    className={`hover:opacity-80 flex items-center py-2 transition-opacity ${
                      isDark ? 'text-white' : 'text-white'
                    }`}
                  >
                    {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Blog Header */}
      <div 
        className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        style={{ backgroundColor: isDark ? '#1F2937' : (theme?.styles.primaryColor || '#1F2937') }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-white'}`}>
            {blog.title}
          </h1>
          {blog.description && (
            <p className={`text-xl mb-4 ${isDark ? 'text-gray-200' : 'text-white/90'}`}>
              {blog.description}
            </p>
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
                  className={`flex-1 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                      : 'bg-white/10 border-white/20 text-white placeholder:text-white/70'
                  }`}
                />
                <Button 
                  onClick={handleSubscribe}
                  disabled={subscribing || !subscriberEmail}
                  className={`${
                    isDark
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
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
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No posts yet
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Check back later for new content!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white hover:shadow-xl'
                }`}
                onClick={() => handlePostClick(post)}
                style={{
                  borderRadius: theme?.styles?.borderRadius || '8px',
                  boxShadow: theme?.styles?.shadow || '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-2xl hover:opacity-80 transition-opacity ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ color: isDark ? 'white' : (theme?.styles?.textColor || '#1F2937') }}
                    >
                      {post.title}
                    </CardTitle>
                    {post.monetization?.isPaid && (
                      <Badge variant="secondary" className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Paid
                      </Badge>
                    )}
                  </div>
                  <div className={`flex items-center space-x-4 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {post.readingTime} min read
                      </div>
                    )}
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
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.excerpt}
                    </p>
                  ) : (
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {truncateContent(post.content)}
                    </p>
                  )}
                  
                  {post.monetization?.isPaid && (
                    <div className={`border rounded-lg p-4 mb-4 ${
                      isDark 
                        ? 'bg-yellow-900/20 border-yellow-700' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-medium ${
                            isDark ? 'text-yellow-400' : 'text-yellow-800'
                          }`}>
                            Premium Content
                          </h4>
                          <p className={`text-sm ${
                            isDark ? 'text-yellow-500' : 'text-yellow-600'
                          }`}>
                            This post requires payment to access
                          </p>
                        </div>
                        <Badge variant="outline" className={
                          isDark ? 'text-yellow-400 border-yellow-600' : 'text-yellow-700 border-yellow-300'
                        }>
                          ₦{post.monetization.price}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className={`w-full sm:w-auto ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : ''
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Search Modal */}
      <EnhancedSearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        posts={posts}
        blogSlug={slug || ''}
        theme={theme}
      />
    </div>
  );
};

export default BlogView;

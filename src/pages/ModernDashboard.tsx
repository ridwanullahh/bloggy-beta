import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Globe, 
  Edit, 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Sparkles,
  Zap,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import enhancedSDK from '../lib/enhanced-sdk';
import { Blog, Post } from '../types/blog';
import { useToast } from '../hooks/use-toast';

const ModernDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalPosts: 0,
    totalViews: 0,
    totalSubscribers: 0,
    monthlyGrowth: 0,
    revenueThisMonth: 0
  });

  useEffect(() => {
    loadDashboardData();
    
    // Subscribe to real-time updates
    const unsubscribeBlogs = enhancedSDK.subscribe('blogs', () => {
      loadDashboardData();
    });
    
    const unsubscribePosts = enhancedSDK.subscribe('posts', () => {
      loadDashboardData();
    });

    return () => {
      unsubscribeBlogs();
      unsubscribePosts();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      const [blogsData, postsData] = await Promise.all([
        enhancedSDK.get<Blog>('blogs'),
        enhancedSDK.get<Post>('posts')
      ]);

      const userBlogs = blogsData.filter(blog => blog.ownerId === user?.id);
      const userPosts = postsData.filter(post => 
        userBlogs.some(blog => blog.id === post.blogId)
      );

      setBlogs(userBlogs);
      setRecentPosts(userPosts.slice(0, 5));

      // Calculate stats
      const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalSubscribers = userBlogs.reduce((sum, blog) => sum + (blog.subscriberCount || 0), 0);

      setStats({
        totalBlogs: userBlogs.length,
        totalPosts: userPosts.length,
        totalViews,
        totalSubscribers,
        monthlyGrowth: 12.5, // Mock data
        revenueThisMonth: 1250 // Mock data
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      change: '+2 this month',
      icon: <Globe className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      change: '+12 this month',
      icon: <FileText className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      change: `+${stats.monthlyGrowth}% this month`,
      icon: <Eye className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenueThisMonth}`,
      change: '+18% this month',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--brand-light)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--brand-primary)' }}></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-light)' }}>
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--brand-dark)' }}>
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-sm text-gray-600">Manage your blogs and content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Link to="/create-blog">
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="card hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2" style={{ color: 'var(--brand-dark)' }}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}
                  >
                    <div style={{ color: 'var(--brand-primary)' }}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blogs Section */}
          <div className="lg:col-span-2">
            <Card className="card">
              <CardHeader className="card-header">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="heading-3">Your Blogs</CardTitle>
                    <CardDescription>Manage and monitor your blog performance</CardDescription>
                  </div>
                  <Link to="/create-blog">
                    <Button size="sm" className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      New Blog
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="card-body">
                {blogs.length === 0 ? (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs yet</h3>
                    <p className="text-gray-600 mb-6">Create your first blog to get started</p>
                    <Link to="/create-blog">
                      <Button className="btn-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Blog
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: 'var(--brand-primary)' }}
                          >
                            {blog.title.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{blog.title}</h4>
                            <p className="text-sm text-gray-600">/{blog.slug}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {blog.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {blog.theme} theme
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Link to={`/blog/${blog.slug}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Link to={`/blog/${blog.slug}/manage`}>
                            <Button size="sm" className="btn-primary">
                              <Settings className="h-4 w-4 mr-1" />
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="card">
              <CardHeader className="card-header">
                <CardTitle className="heading-3">Recent Posts</CardTitle>
                <CardDescription>Your latest published content</CardDescription>
              </CardHeader>
              <CardContent className="card-body">
                {recentPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">No posts yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <h5 className="font-medium text-gray-900 mb-1 line-clamp-2">
                          {post.title}
                        </h5>
                        <p className="text-xs text-gray-500 mb-2">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {post.views || 0}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {post.likes || 0}
                            </span>
                          </div>
                          <Badge 
                            variant={post.status === 'published' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {post.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card mt-6">
              <CardHeader className="card-header">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="card-body">
                <div className="space-y-3">
                  <Link to="/create-blog" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-3" />
                      Create New Blog
                    </Button>
                  </Link>
                  <Link to="/user-dashboard" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-3" />
                      User Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics Overview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;

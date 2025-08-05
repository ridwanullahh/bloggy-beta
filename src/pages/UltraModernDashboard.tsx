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
  ExternalLink,
  Bell,
  Menu,
  X,
  ChevronRight,
  Activity,
  PieChart,
  Layers,
  Bookmark,
  Star,
  Trending
} from 'lucide-react';
import enhancedSDK from '../lib/enhanced-sdk';
import { Blog, Post } from '../types/blog';
import { useToast } from '../hooks/use-toast';

const UltraModernDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalPosts: 0,
    totalViews: 0,
    totalSubscribers: 0,
    monthlyGrowth: 0,
    revenueThisMonth: 0,
    engagementRate: 0,
    avgReadTime: 0
  });

  useEffect(() => {
    loadDashboardData();
    
    // Real-time updates
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
      setRecentPosts(userPosts.slice(0, 6));

      // Calculate comprehensive stats
      const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalSubscribers = userBlogs.reduce((sum, blog) => sum + (blog.subscriberCount || 0), 0);
      const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

      setStats({
        totalBlogs: userBlogs.length,
        totalPosts: userPosts.length,
        totalViews,
        totalSubscribers,
        monthlyGrowth: 15.3,
        revenueThisMonth: 2450,
        engagementRate: totalViews > 0 ? ((totalLikes / totalViews) * 100) : 0,
        avgReadTime: 4.2
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
      changeType: 'positive',
      icon: <Globe className="h-6 w-6" />,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Published Posts',
      value: stats.totalPosts,
      change: '+12 this month',
      changeType: 'positive',
      icon: <FileText className="h-6 w-6" />,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      change: `+${stats.monthlyGrowth}% this month`,
      changeType: 'positive',
      icon: <Eye className="h-6 w-6" />,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenueThisMonth.toLocaleString()}`,
      change: '+23% this month',
      changeType: 'positive',
      icon: <DollarSign className="h-6 w-6" />,
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100'
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers.toLocaleString(),
      change: '+8% this month',
      changeType: 'positive',
      icon: <Users className="h-6 w-6" />,
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100'
    },
    {
      title: 'Engagement Rate',
      value: `${stats.engagementRate.toFixed(1)}%`,
      change: '+5.2% this month',
      changeType: 'positive',
      icon: <Heart className="h-6 w-6" />,
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--brand-light)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6" style={{ borderColor: 'var(--brand-primary)' }}></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h3>
          <p className="text-gray-600">Preparing your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-light)' }}>
      {/* Ultra-Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate" style={{ color: 'var(--brand-dark)' }}>
                    Welcome back, {user?.firstName}! 👋
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 truncate">Here's what's happening with your blogs today</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search blogs, posts..."
                  className="form-modern pl-10 w-64 xl:w-80"
                />
              </div>

              <Button variant="outline" size="sm" className="relative flex-shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
              </Button>

              <Link to="/create-blog">
                <Button className="btn-primary-modern text-xs sm:text-sm">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Create Blog</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - Ultra Modern */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="stat-card group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                >
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-right min-w-0 flex-1 ml-3">
                  <div className="stat-value text-lg sm:text-xl lg:text-2xl truncate">{stat.value}</div>
                  <div className="stat-label text-xs sm:text-sm truncate">{stat.title}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`stat-change flex items-center text-xs sm:text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                } min-w-0 flex-1`}>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{stat.change}</span>
                </div>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blogs Section - Ultra Modern */}
          <div className="lg:col-span-2">
            <div className="dashboard-card">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Blogs</h2>
                  <p className="text-sm sm:text-base text-gray-600">Manage and monitor your blog performance</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Filter className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Link to="/create-blog" className="flex-1 sm:flex-none">
                    <Button className="btn-primary-modern w-full">
                      <Plus className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">New Blog</span>
                    </Button>
                  </Link>
                </div>
              </div>
              
              {blogs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No blogs yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Create your first blog to start sharing your thoughts with the world
                  </p>
                  <Link to="/create-blog">
                    <Button className="btn-primary-modern">
                      <Plus className="h-5 w-5 mr-2" />
                      Create Your First Blog
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="group p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                            style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}
                          >
                            {blog.title.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{blog.title}</h4>
                            <p className="text-gray-600 mb-2">/{blog.slug}</p>
                            <div className="flex items-center space-x-4">
                              <Badge className="badge-success">
                                {blog.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {blog.theme} theme
                              </span>
                              <span className="text-sm text-gray-500">
                                {blog.subscriberCount || 0} subscribers
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/blog/${blog.slug}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Link to={`/blog/${blog.slug}/manage`}>
                            <Button className="btn-primary-modern">
                              <Settings className="h-4 w-4 mr-2" />
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Posts</h3>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              
              {recentPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No posts yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h5>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes || 0}
                          </span>
                        </div>
                        <Badge 
                          className={`text-xs ${
                            post.status === 'published' ? 'badge-success' : 'badge-warning'
                          }`}
                        >
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/create-blog" className="block">
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors">
                    <Plus className="h-5 w-5 mr-3" />
                    Create New Blog
                  </Button>
                </Link>
                <Link to="/user-dashboard" className="block">
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors">
                    <Users className="h-5 w-5 mr-3" />
                    User Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start h-12 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Analytics Overview
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 transition-colors">
                  <Settings className="h-5 w-5 mr-3" />
                  Account Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraModernDashboard;

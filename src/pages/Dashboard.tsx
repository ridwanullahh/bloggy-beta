
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Plus, Globe, Edit, BarChart3, Users, FileText, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import sdk from '../lib/sdk-instance';
import { Blog, Post } from '../types/blog';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalPosts: 0,
    totalViews: 0,
    totalSubscribers: 0,
    totalRevenue: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's blogs
        const allBlogs = await sdk.get<Blog>('blogs');
        const userBlogs = allBlogs.filter(blog => blog.ownerId === user?.id);
        setBlogs(userBlogs);

        // Fetch user's posts
        const allPosts = await sdk.get<Post>('posts');
        const userPosts = allPosts.filter(post => post.authorId === user?.id);
        setPosts(userPosts);

        // Calculate stats
        const publishedCount = userPosts.filter(p => p.status === 'published').length;
        const draftCount = userPosts.filter(p => p.status === 'draft').length;
        const scheduledCount = userPosts.filter(p => p.status === 'scheduled').length;

        setStats({
          totalBlogs: userBlogs.length,
          totalPosts: userPosts.length,
          totalViews: Math.floor(Math.random() * 50000) + 10000,
          totalSubscribers: Math.floor(Math.random() * 5000) + 100,
          totalRevenue: Math.floor(Math.random() * 100000) + 5000,
          publishedPosts: publishedCount,
          draftPosts: draftCount,
          scheduledPosts: scheduledCount
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'draft':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive':
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getThemeGradient = (theme: string) => {
    const gradients = {
      modern: 'from-blue-500 to-cyan-500',
      'dark-mode': 'from-gray-700 to-gray-900',
      magazine: 'from-red-500 to-pink-500',
      'creative-portfolio': 'from-purple-500 to-indigo-500',
      business: 'from-blue-600 to-blue-800',
      lifestyle: 'from-pink-400 to-rose-400',
      tech: 'from-cyan-500 to-teal-500',
      nature: 'from-green-500 to-emerald-500',
      food: 'from-orange-500 to-red-500',
      travel: 'from-sky-500 to-blue-500',
      fitness: 'from-red-500 to-orange-500',
      education: 'from-amber-600 to-orange-600',
      gaming: 'from-purple-600 to-pink-600',
      personal: 'from-yellow-600 to-amber-600',
      news: 'from-gray-800 to-black'
    };
    return gradients[theme as keyof typeof gradients] || 'from-blue-500 to-purple-500';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section with Gradient Background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Creator'}! 🚀
              </h1>
              <p className="text-white/90 text-lg">
                Ready to create amazing content? Your audience awaits your next masterpiece.
              </p>
            </div>
            <Link to="/create-blog" className="mt-6 sm:mt-0">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Create New Blog
              </Button>
            </Link>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Blogs</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Globe className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</div>
              <p className="text-xs text-blue-600 font-medium">
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Posts</CardTitle>
              <div className="p-2 bg-emerald-500 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalPosts}</div>
              <p className="text-xs text-emerald-600 font-medium">
                {stats.publishedPosts} published, {stats.draftPosts} drafts
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Views</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-purple-600 font-medium">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Revenue</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-orange-600 font-medium">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modern Blog Cards */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-900">Your Blog Empire</CardTitle>
            <CardDescription className="text-gray-600">
              Manage and grow your digital presence across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Journey Starts Here</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Create your first blog and start sharing your unique voice with the world. 
                  Every great story begins with a single post.
                </p>
                <Link to="/create-blog">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Blog
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                    <div className={`h-32 bg-gradient-to-br ${getThemeGradient(blog.theme)} rounded-t-lg relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                          {blog.theme.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-500 font-medium">
                            /{blog.slug}
                          </CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(blog.status)} border`}>
                          {blog.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="font-medium">{Math.floor(Math.random() * 1000)} subscribers</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="w-4 h-4 mr-1" />
                          <span className="font-medium">{posts.filter(p => p.blogId === blog.id).length} posts</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" asChild>
                          <Link to={`/blog/${blog.slug}`}>
                            <Globe className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" asChild>
                          <Link to={`/blog/${blog.slug}/manage`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Manage
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">
              Your latest blog posts and content updates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">
                  Start writing your first blog post to see it here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{post.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>Blog: {blogs.find(b => b.id === post.blogId)?.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

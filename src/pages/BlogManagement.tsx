import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, BlogSubscriber } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { 
  Settings, 
  FileText, 
  Users, 
  BarChart3, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  DollarSign,
  Mail,
  Globe
} from 'lucide-react';
import '../styles/modern.css';

const BlogManagement: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [subscribers, setSubscribers] = useState<BlogSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalSubscribers: 0,
    monthlyRevenue: 0,
    totalViews: 0
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug || !user) return;

      try {
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === slug && b.ownerId === user.id);
        
        if (!foundBlog) {
          toast({
            title: "Error",
            description: "Blog not found or you don't have permission to manage it.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        setBlog(foundBlog);

        // Fetch posts
        const allPosts = await sdk.get<Post>('posts');
        const blogPosts = allPosts.filter(post => post.blogId === foundBlog.id);
        setPosts(blogPosts);

        // Fetch subscribers
        const allSubscribers = await sdk.get<BlogSubscriber>('subscribers');
        const blogSubscribers = allSubscribers.filter(sub => sub.blogId === foundBlog.id);
        setSubscribers(blogSubscribers);

        // Calculate stats
        setStats({
          totalPosts: blogPosts.length,
          publishedPosts: blogPosts.filter(p => p.status === 'published').length,
          draftPosts: blogPosts.filter(p => p.status === 'draft').length,
          totalSubscribers: blogSubscribers.length,
          monthlyRevenue: Math.floor(Math.random() * 50000), // Mock data
          totalViews: blogPosts.reduce((acc, post) => acc + (post.views || 0), 0)
        });
      } catch (error) {
        console.error('Error fetching blog data:', error);
        toast({
          title: "Error",
          description: "Failed to load blog data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, user, navigate, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await sdk.delete('posts', postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
      toast({
        title: "Success",
        description: "Post deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!blog) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Blog not found</h1>
          <Button asChild className="mt-4">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 modern-dashboard">
        {/* Modern Header */}
        <div className="modern-card">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: 'var(--brand-dark)' }}>{blog.title}</h1>
                  <p className="text-gray-600 text-lg">/{blog.slug}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className={`px-3 py-1 ${blog.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {blog.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  🎨 {blog.theme}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  📊 {stats.totalViews.toLocaleString()} views
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild className="px-6 py-3">
                <Link to={`/blog/${blog.slug}`}>
                  <Eye className="w-5 h-5 mr-2" />
                  View Blog
                </Link>
              </Button>
              <Button asChild style={{ backgroundColor: 'var(--primary-green)', color: 'var(--utility-white)'}} className="px-6 py-3">
                <Link to={`/blog/${blog.slug}/post/new`}>
                  <Plus className="w-5 h-5 mr-2" />
                  New Post
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-6 py-3">
                <Link to={`/blog/${blog.slug}/settings`}>
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="modern-card">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Posts</h3>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedPosts} published, {stats.draftPosts} drafts
              </p>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Subscribers</h3>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Monthly Revenue</h3>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">₦{stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {blog.monetization?.enabled ? 'Monetization active' : 'Not monetized'}
              </p>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Views</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="modern-card">
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating your first blog post.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link to={`/blog/${blog.slug}/post/new`}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Post
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{post.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {post.status === 'published' && post.publishedAt 
                              ? `Published ${new Date(post.publishedAt).toLocaleDateString()}`
                              : `Created ${new Date(post.createdAt).toLocaleDateString()}`
                            }
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/blog/${blog.slug}/post/${post.slug || post.id}/edit`}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <div className="modern-card">
              <CardHeader>
                <CardTitle>Subscribers</CardTitle>
                <CardDescription>Manage your blog subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No subscribers yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start promoting your blog to get your first subscribers.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscribers.map((subscriber) => (
                      <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-sm text-gray-500">
                            Subscribed {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {subscriber.status}
                          </Badge>
                          <Badge variant="outline">
                            {subscriber.subscriptionTier}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="modern-card">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track your blog's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">Analytics Coming Soon</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Detailed analytics and insights will be available here.
                  </p>
                </div>
              </CardContent>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="modern-card">
              <CardHeader>
                <CardTitle>Blog Settings</CardTitle>
                <CardDescription>Configure your blog preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Theme</h4>
                      <p className="text-sm text-gray-500">{blog.theme}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Status</h4>
                      <p className="text-sm text-gray-500">{blog.status}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Monetization</h4>
                      <p className="text-sm text-gray-500">
                        {blog.monetization?.enabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Comments</h4>
                      <p className="text-sm text-gray-500">
                        {blog.settings?.allowComments ? 'Allowed' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" asChild>
                      <Link to={`/blog/${blog.slug}/settings`}>
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Settings
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BlogManagement;

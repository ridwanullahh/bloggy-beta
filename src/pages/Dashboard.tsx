
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Plus, Globe, Edit, BarChart3, Users, FileText } from 'lucide-react';
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
    totalSubscribers: 0
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
        setStats({
          totalBlogs: userBlogs.length,
          totalPosts: userPosts.length,
          totalViews: Math.floor(Math.random() * 10000), // Mock data
          totalSubscribers: Math.floor(Math.random() * 1000) // Mock data
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
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
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

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your blogs and create amazing content with AI assistance.
            </p>
          </div>
          <Link to="/create-blog">
            <Button className="mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle>Your Blogs</CardTitle>
            <CardDescription>Manage and view your blog sites</CardDescription>
          </CardHeader>
          <CardContent>
            {blogs.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No blogs</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first blog.
                </p>
                <div className="mt-6">
                  <Link to="/create-blog">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Blog
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{blog.title}</CardTitle>
                          <CardDescription className="text-sm">
                            /{blog.slug}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(blog.status)}>
                          {blog.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Theme: {blog.theme}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/blog/${blog.slug}`}>
                              <Globe className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/blog/${blog.slug}/manage`}>
                              <Edit className="w-4 h-4 mr-1" />
                              Manage
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest blog posts across all blogs</CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start writing your first blog post.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      <Button size="sm" variant="outline">
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

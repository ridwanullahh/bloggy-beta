import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Category } from '../types/blog';
import { ArrowLeft } from 'lucide-react';
import sdk from '../lib/sdk-instance';
import ModernRichTextEditor from '../components/editor/ModernRichTextEditor';

const PostEditor: React.FC = () => {
  const { slug, postId } = useParams<{ slug: string; postId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    tags: [] as string[]
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchBlogAndPost = async () => {
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

        if (postId) {
          setIsEdit(true);
          const allPosts = await sdk.get<Post>('posts');
          const foundPost = allPosts.find(p => p.id === postId && p.blogId === foundBlog.id);

          if (!foundPost) {
            toast({
              title: "Error",
              description: "Post not found or you don't have permission to edit it.",
              variant: "destructive",
            });
            navigate(`/blog/${foundBlog.slug}/manage`);
            return;
          }

          setPost(foundPost);
          setFormData({
            title: foundPost.title,
            slug: foundPost.slug || '',
            content: foundPost.content,
            excerpt: foundPost.excerpt || '',
            status: foundPost.status === 'archived' ? 'draft' : foundPost.status,
            tags: foundPost.tags || []
          });
          setSelectedCategories(foundPost.categories || []);
        }
      } catch (error) {
        console.error('Error fetching blog or post:', error);
        toast({
          title: "Error",
          description: "Failed to load blog or post data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndPost();
  }, [slug, postId, user, navigate, toast]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!blog) return;
      
      try {
        const allCategories = await sdk.get<Category>('categories');
        const blogCategories = allCategories.filter(cat => cat.blogId === blog.id);
        setCategories(blogCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [blog]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !blog) return;

    try {
      const categoryData = {
        name: newCategoryName.trim(),
        slug: newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        blogId: blog.id,
        createdAt: new Date().toISOString()
      };

      const newCategory = await sdk.insert<Category>('categories', categoryData);
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      
      toast({
        title: "Success",
        description: "Category added successfully!",
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blog || !user) return;
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        content: formData.content,
        excerpt: formData.excerpt,
        blogId: blog.id,
        authorId: user.id,
        status: formData.status as 'draft' | 'published' | 'scheduled',
        tags: formData.tags.filter(tag => tag.trim()),
        categories: selectedCategories,
        readingTime: calculateReadingTime(formData.content),
        ...(isEdit ? {} : { createdAt: new Date().toISOString() }),
        updatedAt: new Date().toISOString()
      };

      if (isEdit && postId) {
        await sdk.update('posts', postId, postData);
        toast({
          title: "Success",
          description: "Post updated successfully!",
        });
      } else {
        await sdk.insert('posts', postData);
        toast({
          title: "Success",
          description: "Post created successfully!",
        });
      }
      
      navigate(`/blog/${blog.slug}/manage`);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout blogSlug={slug}>
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
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout blogSlug={slug}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/blog/${blog.slug}/manage`)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog Management
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Post' : 'New Post'}</h1>
              <p className="text-gray-600">{blog.title}</p>
            </div>
          </div>
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      title: e.target.value,
                      slug: prev.slug || generateSlug(e.target.value)
                    }))}
                  />
                </CardContent>
              </Card>

              {/* Slug */}
              <Card>
                <CardHeader>
                  <CardTitle>Slug</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter post slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <ModernRichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    height={500}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'draft' | 'published' | 'scheduled' }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Saving...' : 'Save Post'}
                  </Button>
                </CardContent>
              </Card>

              {/* Categories Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories(prev => [...prev, category.id]);
                            } else {
                              setSelectedCategories(prev => prev.filter(id => id !== category.id));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="New category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleAddCategory}
                        disabled={!newCategoryName.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter tags, separated by commas"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                  />
                </CardContent>
              </Card>

              {/* Excerpt Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Excerpt</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter a brief excerpt of your post"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default PostEditor;

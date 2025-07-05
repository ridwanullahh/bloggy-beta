
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Category, Tag } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { Save, Eye, Calendar, Tags, Folder, Settings } from 'lucide-react';

const PostEditor: React.FC = () => {
  const { blogSlug, postId } = useParams<{ blogSlug: string; postId?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled' | 'archived',
    selectedCategories: [] as string[],
    selectedTags: [] as string[],
    newTags: '',
    scheduledFor: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!blogSlug || !user) return;

      try {
        // Fetch blog
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === blogSlug && b.ownerId === user.id);
        
        if (!foundBlog) {
          toast({
            title: "Error",
            description: "Blog not found or you don't have permission to edit it.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        setBlog(foundBlog);

        // Fetch categories and tags
        const allCategories = await sdk.get<Category>('categories');
        const allTags = await sdk.get<Tag>('tags');
        setCategories(allCategories.filter(c => c.blogId === foundBlog.id));
        setTags(allTags.filter(t => t.blogId === foundBlog.id));

        // If editing existing post
        if (postId && postId !== 'new') {
          const allPosts = await sdk.get<Post>('posts');
          const foundPost = allPosts.find(p => 
            (p.id === postId || p.slug === postId) && p.blogId === foundBlog.id
          );
          
          if (foundPost) {
            setPost(foundPost);
            setIsNewPost(false);
            setFormData({
              title: foundPost.title,
              slug: foundPost.slug || '',
              content: foundPost.content,
              excerpt: foundPost.excerpt || '',
              featuredImage: foundPost.featuredImage || '',
              status: foundPost.status,
              selectedCategories: foundPost.categories || [],
              selectedTags: foundPost.tags || [],
              newTags: '',
              scheduledFor: foundPost.scheduledFor || '',
              seoTitle: foundPost.seo?.metaTitle || '',
              seoDescription: foundPost.seo?.metaDescription || '',
              seoKeywords: foundPost.seo?.keywords?.join(', ') || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogSlug, postId, user, navigate, toast]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: isNewPost ? generateSlug(value) : prev.slug
    }));
  };

  const handleSave = async (publishNow = false) => {
    if (!blog || !user) return;

    setSaving(true);
    try {
      // Process new tags
      const tagsToCreate = formData.newTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag && !tags.some(t => t.name.toLowerCase() === tag.toLowerCase()));

      for (const tagName of tagsToCreate) {
        const newTag = await sdk.insert<Tag>('tags', {
          name: tagName,
          slug: generateSlug(tagName),
          blogId: blog.id,
          color: '#10B981'
        });
        setTags(prev => [...prev, newTag]);
        setFormData(prev => ({
          ...prev,
          selectedTags: [...prev.selectedTags, tagName]
        }));
      }

      const postData: Partial<Post> = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        featuredImage: formData.featuredImage || undefined,
        blogId: blog.id,
        authorId: user.id!,
        status: publishNow ? 'published' : formData.status,
        categories: formData.selectedCategories,
        tags: [...formData.selectedTags, ...tagsToCreate],
        scheduledFor: formData.scheduledFor || undefined,
        publishedAt: publishNow ? new Date().toISOString() : undefined,
        seo: {
          metaTitle: formData.seoTitle,
          metaDescription: formData.seoDescription,
          keywords: formData.seoKeywords.split(',').map(k => k.trim()).filter(k => k)
        }
      };

      if (isNewPost) {
        const newPost = await sdk.insert<Post>('posts', postData);
        setPost(newPost);
        setIsNewPost(false);
        navigate(`/blog/${blogSlug}/post/${newPost.slug || newPost.id}/edit`);
      } else if (post) {
        const updatedPost = await sdk.update<Post>('posts', post.id, postData);
        setPost(updatedPost);
      }

      toast({
        title: "Success",
        description: publishNow ? "Post published successfully!" : "Post saved successfully!",
      });

      // Clear new tags field
      setFormData(prev => ({ ...prev, newTags: '' }));
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTagToggle = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagName)
        ? prev.selectedTags.filter(t => t !== tagName)
        : [...prev.selectedTags, tagName]
    }));
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
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNewPost ? 'Create New Post' : 'Edit Post'}
            </h1>
            <p className="text-gray-600">Blog: {blog.title}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saving || !formData.title || !formData.content}
            >
              <Eye className="w-4 h-4 mr-2" />
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of your post..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your post content here..."
                    rows={15}
                    className="font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supports Markdown formatting
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  SEO Settings
                </CardTitle>
                <CardDescription>Optimize your post for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">Meta Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="seoDescription">Meta Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Brief description for search results..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="seoKeywords">Keywords</Label>
                  <Input
                    id="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published' | 'scheduled') =>
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.status === 'scheduled' && (
                  <div>
                    <Label htmlFor="scheduledFor">Publish Date</Label>
                    <Input
                      id="scheduledFor"
                      type="datetime-local"
                      value={formData.scheduledFor}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500">No categories available</p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={formData.selectedCategories.includes(category.name)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              selectedCategories: isChecked
                                ? [...prev.selectedCategories, category.name]
                                : prev.selectedCategories.filter(c => c !== category.name)
                            }));
                          }}
                          className="rounded"
                        />
                        <Label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tags className="w-4 h-4 mr-2" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing Tags */}
                {tags.length > 0 && (
                  <div>
                    <Label>Select existing tags:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={formData.selectedTags.includes(tag.name) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag.name)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* New Tags */}
                <div>
                  <Label htmlFor="newTags">Add new tags:</Label>
                  <Input
                    id="newTags"
                    value={formData.newTags}
                    onChange={(e) => setFormData(prev => ({ ...prev, newTags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple tags with commas
                  </p>
                </div>
                
                {/* Selected Tags */}
                {formData.selectedTags.length > 0 && (
                  <div>
                    <Label>Selected tags:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.selectedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostEditor;

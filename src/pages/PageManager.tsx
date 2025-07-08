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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Blog, BlogPage } from '../types/blog';
import { ModernRichTextEditor } from '../components/editor/ModernRichTextEditor';
import sdk from '../lib/sdk-instance';
import { 
  Save, 
  ArrowLeft, 
  FileText, 
  Eye, 
  Plus,
  Edit3,
  Trash2,
  Settings,
  Globe
} from 'lucide-react';

const PageManager: React.FC = () => {
  const { slug, pageType } = useParams<{ slug: string; pageType?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [pages, setPages] = useState<BlogPage[]>([]);
  const [currentPage, setCurrentPage] = useState<BlogPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  const [formData, setFormData] = useState({
    type: 'about' as BlogPage['type'],
    title: '',
    content: '',
    slug: '',
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!slug || !user) return;

      try {
        const [allBlogs, allPages] = await Promise.all([
          sdk.get<Blog>('blogs'),
          sdk.get<BlogPage>('blogPages')
        ]);

        const foundBlog = allBlogs.find(b => b.slug === slug && b.ownerId === user.id);
        
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

        const blogPages = allPages.filter(p => p.blogId === foundBlog.id);
        setPages(blogPages);

        // If editing a specific page type
        if (pageType) {
          const existingPage = blogPages.find(p => p.type === pageType);
          if (existingPage) {
            setCurrentPage(existingPage);
            setFormData({
              type: existingPage.type,
              title: existingPage.title,
              content: existingPage.content,
              slug: existingPage.slug,
              isPublished: existingPage.isPublished,
              metaTitle: existingPage.seo?.metaTitle || '',
              metaDescription: existingPage.seo?.metaDescription || '',
              keywords: existingPage.seo?.keywords?.join(', ') || ''
            });
            setActiveTab('edit');
          } else {
            // Create new page of this type
            const defaultTitles = {
              about: 'About',
              contact: 'Contact',
              terms: 'Terms of Service',
              privacy: 'Privacy Policy',
              custom: 'Custom Page'
            };
            
            setFormData(prev => ({
              ...prev,
              type: pageType as BlogPage['type'],
              title: defaultTitles[pageType as keyof typeof defaultTitles] || 'New Page',
              slug: pageType
            }));
            setActiveTab('edit');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load page data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, pageType, user, navigate, toast]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    if (!blog) return;

    setSaving(true);
    try {
      const pageData = {
        blogId: blog.id,
        type: formData.type,
        title: formData.title,
        content: formData.content,
        slug: formData.slug || generateSlug(formData.title),
        isPublished: formData.isPublished,
        seo: {
          metaTitle: formData.metaTitle || formData.title,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
        }
      };

      let savedPage: BlogPage;
      
      if (currentPage) {
        savedPage = await sdk.update('blogPages', currentPage.id, pageData) as BlogPage;
        setPages(prev => prev.map(p => p.id === currentPage.id ? savedPage : p));
      } else {
        savedPage = await sdk.insert<BlogPage>('blogPages', pageData);
        setPages(prev => [...prev, savedPage]);
      }

      setCurrentPage(savedPage);
      
      toast({
        title: "Success",
        description: `Page ${currentPage ? 'updated' : 'created'} successfully.`,
      });
      
      setActiveTab('list');
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: "Failed to save page.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      await sdk.delete('blogPages', pageId);
      setPages(prev => prev.filter(p => p.id !== pageId));
      
      if (currentPage?.id === pageId) {
        setCurrentPage(null);
        setActiveTab('list');
      }
      
      toast({
        title: "Success",
        description: "Page deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "Failed to delete page.",
        variant: "destructive",
      });
    }
  };

  const handleNewPage = () => {
    setCurrentPage(null);
    setFormData({
      type: 'custom',
      title: '',
      content: '',
      slug: '',
      isPublished: true,
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    });
    setActiveTab('edit');
  };

  const handleEditPage = (page: BlogPage) => {
    setCurrentPage(page);
    setFormData({
      type: page.type,
      title: page.title,
      content: page.content,
      slug: page.slug,
      isPublished: page.isPublished,
      metaTitle: page.seo?.metaTitle || '',
      metaDescription: page.seo?.metaDescription || '',
      keywords: page.seo?.keywords?.join(', ') || ''
    });
    setActiveTab('edit');
  };

  const getPageTypeLabel = (type: BlogPage['type']) => {
    const labels = {
      about: 'About',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      custom: 'Custom Page'
    };
    return labels[type];
  };

  const getPageTypeIcon = (type: BlogPage['type']) => {
    switch (type) {
      case 'about':
        return <FileText className="w-4 h-4" />;
      case 'contact':
        return <Globe className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
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
          <Button className="mt-4" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Page Manager</h1>
            <p className="text-gray-600 mt-1">{blog.title}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate(`/blog/${blog.slug}/manage`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Management
            </Button>
            <Button onClick={handleNewPage}>
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Page List</TabsTrigger>
            <TabsTrigger value="edit">{currentPage ? 'Edit Page' : 'New Page'}</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Pages</CardTitle>
                <CardDescription>Manage your blog's static pages</CardDescription>
              </CardHeader>
              <CardContent>
                {pages.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                    <p className="text-gray-500 mb-4">Create your first page to get started</p>
                    <Button onClick={handleNewPage}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Page
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pages.map((page) => (
                      <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getPageTypeIcon(page.type)}
                          <div>
                            <h3 className="font-medium">{page.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{getPageTypeLabel(page.type)}</span>
                              <span>•</span>
                              <span>/{page.slug}</span>
                              {!page.isPublished && (
                                <>
                                  <span>•</span>
                                  <span className="text-orange-600">Draft</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/${blog.slug}/${page.slug}`, '_blank')}
                            disabled={!page.isPublished}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPage(page)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(page.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentPage ? 'Edit Page' : 'Create New Page'}</CardTitle>
                    <CardDescription>
                      {currentPage ? 'Update your page content' : 'Create a new static page for your blog'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Page Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData(prev => ({ 
                            ...prev, 
                            title,
                            slug: prev.slug || generateSlug(title)
                          }));
                        }}
                        placeholder="Enter page title"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Page Type</Label>
                        <Select value={formData.type} onValueChange={(value: BlogPage['type']) => 
                          setFormData(prev => ({ ...prev, type: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="about">About</SelectItem>
                            <SelectItem value="contact">Contact</SelectItem>
                            <SelectItem value="terms">Terms of Service</SelectItem>
                            <SelectItem value="privacy">Privacy Policy</SelectItem>
                            <SelectItem value="custom">Custom Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="page-url"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <div className="mt-2">
                        <ModernRichTextEditor
                          value={formData.content}
                          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                          placeholder="Write your page content here..."
                          height={400}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Page Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="published">Published</Label>
                        <p className="text-sm text-gray-500">Make this page visible to visitors</p>
                      </div>
                      <Switch
                        id="published"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, isPublished: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">SEO Title</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="Page title for search engines"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">SEO Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="Brief description for search engines"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <Button 
                      onClick={handleSave} 
                      disabled={saving || !formData.title.trim()} 
                      className="w-full"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : (currentPage ? 'Update Page' : 'Create Page')}
                    </Button>

                    {currentPage && (
                      <Button 
                        variant="outline" 
                        onClick={() => window.open(`/${blog.slug}/${currentPage.slug}`, '_blank')}
                        disabled={!currentPage.isPublished}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Page
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PageManager;
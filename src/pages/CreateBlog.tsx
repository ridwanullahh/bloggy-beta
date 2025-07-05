
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { useToast } from '../hooks/use-toast';
import { BLOG_THEMES } from '../constants/themes';
import { Blog } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { Palette, Globe, DollarSign, Mail, Cog } from 'lucide-react';

const CreateBlog: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    theme: 'modern',
    customDomain: '',
    monetizationEnabled: false,
    subscriptionPrice: 0,
    payPerArticle: false,
    paywallEnabled: false,
    emailMarketing: false,
    socialAutoPost: false,
    contentScheduling: false,
    allowComments: true,
    moderateComments: false,
    seoOptimized: true
  });

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
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      // Check if slug is unique
      const existingBlogs = await sdk.get<Blog>('blogs');
      if (existingBlogs.some(blog => blog.slug === formData.slug)) {
        toast({
          title: "Error",
          description: "Blog URL already exists. Please choose a different title or slug.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const blogData: Partial<Blog> = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        ownerId: user.id!,
        theme: formData.theme,
        status: 'active',
        customDomain: formData.customDomain || undefined,
        monetization: {
          enabled: formData.monetizationEnabled,
          subscriptionPrice: formData.subscriptionPrice,
          payPerArticle: formData.payPerArticle,
          paywallEnabled: formData.paywallEnabled
        },
        marketing: {
          emailMarketing: formData.emailMarketing,
          socialAutoPost: formData.socialAutoPost,
          contentScheduling: formData.contentScheduling
        },
        settings: {
          allowComments: formData.allowComments,
          moderateComments: formData.moderateComments,
          seoOptimized: formData.seoOptimized
        }
      };

      const newBlog = await sdk.insert<Blog>('blogs', blogData);
      
      toast({
        title: "Success",
        description: "Blog created successfully!",
      });
      
      navigate(`/blog/${newBlog.slug}/manage`);
    } catch (error) {
      console.error('Error creating blog:', error);
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedThemeData = BLOG_THEMES.find(theme => theme.id === selectedTheme);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
          <p className="text-gray-600 mt-2">Set up your new blog with custom themes and features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>Essential details about your blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Blog Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="My Awesome Blog"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Blog URL *</Label>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">yourdomain.com/blog/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="my-awesome-blog"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of your blog..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
                <Input
                  id="customDomain"
                  value={formData.customDomain}
                  onChange={(e) => setFormData(prev => ({ ...prev, customDomain: e.target.value }))}
                  placeholder="blog.yourdomain.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Theme Selection
              </CardTitle>
              <CardDescription>Choose the perfect design for your blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BLOG_THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTheme === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setFormData(prev => ({ ...prev, theme: theme.id }));
                    }}
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                    <h4 className="font-medium text-sm">{theme.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
                  </div>
                ))}
              </div>
              
              {selectedThemeData && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Theme: {selectedThemeData.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Primary Color:</span>
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-4 h-4 rounded mr-2" 
                          style={{ backgroundColor: selectedThemeData.styles.primaryColor }}
                        />
                        {selectedThemeData.styles.primaryColor}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Layout:</span>
                      <div className="mt-1 capitalize">{selectedThemeData.styles.layout}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Font:</span>
                      <div className="mt-1">{selectedThemeData.styles.fontFamily.split(',')[0]}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monetization Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Monetization
              </CardTitle>
              <CardDescription>Set up payment and subscription options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monetization">Enable Monetization</Label>
                  <p className="text-sm text-gray-500">Allow paid subscriptions and premium content</p>
                </div>
                <Switch
                  id="monetization"
                  checked={formData.monetizationEnabled}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, monetizationEnabled: checked }))
                  }
                />
              </div>
              
              {formData.monetizationEnabled && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  <div>
                    <Label htmlFor="subscriptionPrice">Monthly Subscription Price (NGN)</Label>
                    <Input
                      id="subscriptionPrice"
                      type="number"
                      value={formData.subscriptionPrice}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        subscriptionPrice: Number(e.target.value) 
                      }))}
                      placeholder="5000"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payPerArticle">Pay-per-Article</Label>
                      <p className="text-sm text-gray-500">Allow readers to buy individual articles</p>
                    </div>
                    <Switch
                      id="payPerArticle"
                      checked={formData.payPerArticle}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, payPerArticle: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paywallEnabled">Enable Paywall</Label>
                      <p className="text-sm text-gray-500">Restrict content to paid subscribers</p>
                    </div>
                    <Switch
                      id="paywallEnabled"
                      checked={formData.paywallEnabled}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, paywallEnabled: checked }))
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Marketing Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Marketing Tools
              </CardTitle>
              <CardDescription>Automated marketing and growth features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailMarketing">Email Marketing</Label>
                  <p className="text-sm text-gray-500">Send newsletters and updates to subscribers</p>
                </div>
                <Switch
                  id="emailMarketing"
                  checked={formData.emailMarketing}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, emailMarketing: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="socialAutoPost">Social Media Auto-Post</Label>
                  <p className="text-sm text-gray-500">Automatically share new posts on social media</p>
                </div>
                <Switch
                  id="socialAutoPost"
                  checked={formData.socialAutoPost}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, socialAutoPost: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contentScheduling">Content Scheduling</Label>
                  <p className="text-sm text-gray-500">Schedule posts for automatic publishing</p>
                </div>
                <Switch
                  id="contentScheduling"
                  checked={formData.contentScheduling}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, contentScheduling: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Blog Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="w-5 h-5 mr-2" />
                Blog Settings
              </CardTitle>
              <CardDescription>Configure how your blog works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowComments">Allow Comments</Label>
                  <p className="text-sm text-gray-500">Let readers comment on your posts</p>
                </div>
                <Switch
                  id="allowComments"
                  checked={formData.allowComments}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, allowComments: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="moderateComments">Moderate Comments</Label>
                  <p className="text-sm text-gray-500">Review comments before they appear</p>
                </div>
                <Switch
                  id="moderateComments"
                  checked={formData.moderateComments}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, moderateComments: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="seoOptimized">SEO Optimization</Label>
                  <p className="text-sm text-gray-500">Automatically optimize for search engines</p>
                </div>
                <Switch
                  id="seoOptimized"
                  checked={formData.seoOptimized}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, seoOptimized: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateBlog;

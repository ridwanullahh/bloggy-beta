import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Blog } from '../types/blog';
import { BLOG_THEMES } from '../constants/themes';
import sdk from '../lib/sdk-instance';
import { ArrowLeft, Save, Globe, Palette, Settings, Mail, DollarSign, Shield } from 'lucide-react';

const BlogSettings: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    title: '',
    description: '',
    theme: '',
    customDomain: '',
    darkMode: false,
    aboutContent: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    monetization: {
      enabled: false,
      allowFreeContent: true,
      subscriptionPrice: 0,
      payPerArticle: false,
      paywallEnabled: false
    },
    marketing: {
      emailMarketing: false,
      socialAutoPost: false,
      contentScheduling: false
    },
    blogSettings: {
      allowComments: true,
      moderateComments: false,
      seoOptimized: true,
      showReadingTime: true,
      enableTableOfContents: true,
      enableSocialShare: true,
      enableRelatedPosts: true
    }
  });

  useEffect(() => {
    const fetchBlog = async () => {
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
        setSettings({
          title: foundBlog.title,
          description: foundBlog.description || '',
          theme: foundBlog.theme,
          customDomain: foundBlog.customDomain || '',
          darkMode: foundBlog.darkMode || false,
          aboutContent: foundBlog.aboutContent || '',
          contactEmail: foundBlog.contactInfo?.email || '',
          contactPhone: foundBlog.contactInfo?.phone || '',
          contactAddress: foundBlog.contactInfo?.address || '',
          socialLinks: {
            twitter: foundBlog.contactInfo?.socialLinks?.twitter || '',
            facebook: foundBlog.contactInfo?.socialLinks?.facebook || '',
            instagram: foundBlog.contactInfo?.socialLinks?.instagram || '',
            linkedin: foundBlog.contactInfo?.socialLinks?.linkedin || '',
            youtube: foundBlog.contactInfo?.socialLinks?.youtube || ''
          },
          monetization: {
            enabled: foundBlog.monetization?.enabled || false,
            allowFreeContent: foundBlog.monetization?.allowFreeContent !== undefined ? foundBlog.monetization.allowFreeContent : true,
            subscriptionPrice: foundBlog.monetization?.subscriptionPrice || 0,
            payPerArticle: foundBlog.monetization?.payPerArticle || false,
            paywallEnabled: foundBlog.monetization?.paywallEnabled || false
          },
          marketing: foundBlog.marketing || {
            emailMarketing: false,
            socialAutoPost: false,
            contentScheduling: false
          },
          blogSettings: {
            allowComments: foundBlog.settings?.allowComments !== undefined ? foundBlog.settings.allowComments : true,
            moderateComments: foundBlog.settings?.moderateComments || false,
            seoOptimized: foundBlog.settings?.seoOptimized !== undefined ? foundBlog.settings.seoOptimized : true,
            showReadingTime: foundBlog.settings?.showReadingTime !== undefined ? foundBlog.settings.showReadingTime : true,
            enableTableOfContents: foundBlog.settings?.enableTableOfContents !== undefined ? foundBlog.settings.enableTableOfContents : true,
            enableSocialShare: foundBlog.settings?.enableSocialShare !== undefined ? foundBlog.settings.enableSocialShare : true,
            enableRelatedPosts: foundBlog.settings?.enableRelatedPosts !== undefined ? foundBlog.settings.enableRelatedPosts : true
          }
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast({
          title: "Error",
          description: "Failed to load blog settings.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, user, navigate, toast]);

  const handleSave = async () => {
    if (!blog) return;

    setSaving(true);
    try {
      await sdk.update('blogs', blog.id, {
        title: settings.title,
        description: settings.description,
        theme: settings.theme,
        customDomain: settings.customDomain,
        darkMode: settings.darkMode,
        aboutContent: settings.aboutContent,
        contactInfo: {
          email: settings.contactEmail,
          phone: settings.contactPhone,
          address: settings.contactAddress,
          socialLinks: settings.socialLinks
        },
        monetization: settings.monetization,
        marketing: settings.marketing,
        settings: settings.blogSettings,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "Success",
        description: "Blog settings updated successfully.",
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      toast({
        title: "Error",
        description: "Failed to update blog settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
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
              <h1 className="text-3xl font-bold text-gray-900">Blog Settings</h1>
              <p className="text-gray-600">{blog.title}</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="domain" className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Domain
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="monetization" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Monetization
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic information about your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    value={settings.title}
                    onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter blog title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your blog"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="about">About Content</Label>
                  <Textarea
                    id="about"
                    value={settings.aboutContent}
                    onChange={(e) => setSettings(prev => ({ ...prev, aboutContent: e.target.value }))}
                    placeholder="Content for your about page"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how your blog looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_THEMES.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="darkMode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                  />
                  <Label htmlFor="darkMode">Enable Dark Mode</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Domain</CardTitle>
                <CardDescription>Connect your own domain to your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    value={settings.customDomain}
                    onChange={(e) => setSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                    placeholder="yourdomain.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your custom domain (e.g., myblog.com). You'll need to configure DNS settings separately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="contactAddress">Address</Label>
                  <Textarea
                    id="contactAddress"
                    value={settings.contactAddress}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactAddress: e.target.value }))}
                    placeholder="Your address"
                    rows={3}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Social Media Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={settings.socialLinks.twitter}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                        }))}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings.socialLinks.facebook}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                        }))}
                        placeholder="https://facebook.com/page"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={settings.socialLinks.instagram}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                        }))}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={settings.socialLinks.linkedin}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                        }))}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monetization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monetization Settings</CardTitle>
                <CardDescription>Configure how you monetize your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="monetizationEnabled"
                    checked={settings.monetization.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ 
                      ...prev, 
                      monetization: { ...prev.monetization, enabled: checked }
                    }))}
                  />
                  <Label htmlFor="monetizationEnabled">Enable Monetization</Label>
                </div>
                
                {settings.monetization.enabled && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowFreeContent"
                        checked={settings.monetization.allowFreeContent}
                        onCheckedChange={(checked) => setSettings(prev => ({ 
                          ...prev, 
                          monetization: { ...prev.monetization, allowFreeContent: checked }
                        }))}
                      />
                      <Label htmlFor="allowFreeContent">Allow Free Content</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="subscriptionPrice">Monthly Subscription Price (₦)</Label>
                      <Input
                        id="subscriptionPrice"
                        type="number"
                        value={settings.monetization.subscriptionPrice}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          monetization: { ...prev.monetization, subscriptionPrice: Number(e.target.value) }
                        }))}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payPerArticle"
                        checked={settings.monetization.payPerArticle}
                        onCheckedChange={(checked) => setSettings(prev => ({ 
                          ...prev, 
                          monetization: { ...prev.monetization, payPerArticle: checked }
                        }))}
                      />
                      <Label htmlFor="payPerArticle">Pay Per Article</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="paywallEnabled"
                        checked={settings.monetization.paywallEnabled}
                        onCheckedChange={(checked) => setSettings(prev => ({ 
                          ...prev, 
                          monetization: { ...prev.monetization, paywallEnabled: checked }
                        }))}
                      />
                      <Label htmlFor="paywallEnabled">Enable Paywall</Label>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Features</CardTitle>
                <CardDescription>Control what features are enabled on your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowComments"
                      checked={settings.blogSettings.allowComments}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, allowComments: checked }
                      }))}
                    />
                    <Label htmlFor="allowComments">Allow Comments</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="moderateComments"
                      checked={settings.blogSettings.moderateComments}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, moderateComments: checked }
                      }))}
                    />
                    <Label htmlFor="moderateComments">Moderate Comments</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showReadingTime"
                      checked={settings.blogSettings.showReadingTime}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, showReadingTime: checked }
                      }))}
                    />
                    <Label htmlFor="showReadingTime">Show Reading Time</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableTableOfContents"
                      checked={settings.blogSettings.enableTableOfContents}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, enableTableOfContents: checked }
                      }))}
                    />
                    <Label htmlFor="enableTableOfContents">Table of Contents</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableSocialShare"
                      checked={settings.blogSettings.enableSocialShare}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, enableSocialShare: checked }
                      }))}
                    />
                    <Label htmlFor="enableSocialShare">Social Share Buttons</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRelatedPosts"
                      checked={settings.blogSettings.enableRelatedPosts}
                      onCheckedChange={(checked) => setSettings(prev => ({ 
                        ...prev, 
                        blogSettings: { ...prev.blogSettings, enableRelatedPosts: checked }
                      }))}
                    />
                    <Label htmlFor="enableRelatedPosts">Related Posts</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BlogSettings;

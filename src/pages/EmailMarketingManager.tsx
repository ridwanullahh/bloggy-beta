import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Blog, BlogSubscriber } from '../types/blog';
import { EmailTemplate, EmailCampaign } from '../types/email';
import { EmailService } from '../services/emailService';
import sdk from '../lib/sdk-instance';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Send, 
  Mail, 
  Users, 
  Eye, 
  MousePointer,
  BarChart3,
  FileText,
  Edit,
  Copy
} from 'lucide-react';

const EmailMarketingManager: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [subscribers, setSubscribers] = useState<BlogSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    type: 'newsletter' as 'newsletter' | 'welcome' | 'notification' | 'promotional'
  });
  
  const [campaignForm, setCampaignForm] = useState({
    templateId: '',
    name: '',
    subject: '',
    scheduledFor: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!slug || !user) return;

      try {
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === slug && b.ownerId === user.id);
        
        if (!foundBlog) {
          toast({
            title: "Error",
            description: "Blog not found or access denied.",
            variant: "destructive",
          });
          return;
        }

        setBlog(foundBlog);

        const [blogTemplates, blogCampaigns, blogSubscribers] = await Promise.all([
          EmailService.getTemplates(foundBlog.id),
          sdk.get<EmailCampaign>('emailCampaigns').then(campaigns => 
            campaigns.filter(c => c.blogId === foundBlog.id)
          ),
          sdk.get<BlogSubscriber>('subscribers').then(subs => 
            subs.filter(s => s.blogId === foundBlog.id)
          )
        ]);

        setTemplates(blogTemplates);
        setCampaigns(blogCampaigns);
        setSubscribers(blogSubscribers);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load email marketing data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, user, toast]);

  const handleCreateTemplate = async () => {
    if (!blog || !templateForm.name || !templateForm.subject || !templateForm.htmlContent) return;

    try {
      const template = await EmailService.createTemplate(
        blog.id,
        templateForm.name,
        templateForm.subject,
        templateForm.htmlContent,
        templateForm.textContent,
        templateForm.type
      );

      setTemplates(prev => [...prev, template]);
      setTemplateForm({
        name: '',
        subject: '',
        htmlContent: '',
        textContent: '',
        type: 'newsletter'
      });
      setShowCreateTemplate(false);

      toast({
        title: "Success",
        description: "Email template created successfully!",
      });
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template.",
        variant: "destructive",
      });
    }
  };

  const handleCreateCampaign = async () => {
    if (!blog || !campaignForm.templateId || !campaignForm.name || !campaignForm.subject) return;

    try {
      const campaign = await EmailService.createCampaign(
        blog.id,
        campaignForm.templateId,
        campaignForm.name,
        campaignForm.subject,
        campaignForm.scheduledFor || undefined
      );

      setCampaigns(prev => [...prev, campaign]);
      setCampaignForm({
        templateId: '',
        name: '',
        subject: '',
        scheduledFor: ''
      });
      setShowCreateCampaign(false);

      toast({
        title: "Success",
        description: campaignForm.scheduledFor ? "Campaign scheduled successfully!" : "Campaign created successfully!",
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign.",
        variant: "destructive",
      });
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    try {
      await EmailService.sendCampaign(campaignId);
      
      const updatedCampaigns = await sdk.get<EmailCampaign>('emailCampaigns');
      const blogCampaigns = updatedCampaigns.filter(c => c.blogId === blog?.id);
      setCampaigns(blogCampaigns);

      toast({
        title: "Success",
        description: "Campaign sent successfully!",
      });
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast({
        title: "Error",
        description: "Failed to send campaign.",
        variant: "destructive",
      });
    }
  };

  const generateBasicTemplate = (type: string) => {
    const templates = {
      newsletter: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <header style="background: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">{{blog_title}}</h1>
          </header>
          <main style="padding: 20px;">
            <h2 style="color: #333;">Latest Updates</h2>
            <p>Hello {{subscriber_name}},</p>
            <p>Here are the latest updates from our blog:</p>
            {{latest_posts}}
            <p>Thank you for being a valued subscriber!</p>
          </main>
          <footer style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
            <p>You're receiving this because you subscribed to {{blog_title}}</p>
            <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
          </footer>
        </div>
      `,
      welcome: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <header style="background: #4f46e5; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Welcome to {{blog_title}}!</h1>
          </header>
          <main style="padding: 20px;">
            <h2 style="color: #333;">Welcome {{subscriber_name}}!</h2>
            <p>Thank you for subscribing to our blog. We're excited to have you on board!</p>
            <p>You'll receive regular updates about our latest posts and exclusive content.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{blog_url}}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Visit Our Blog</a>
            </div>
          </main>
          <footer style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
            <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
          </footer>
        </div>
      `,
      promotional: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <header style="background: #dc2626; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Special Offer!</h1>
          </header>
          <main style="padding: 20px;">
            <h2 style="color: #333;">Exclusive Deal for {{subscriber_name}}</h2>
            <p>We have a special offer just for you!</p>
            <div style="background: #fef2f2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="color: #dc2626; margin: 0 0 10px 0;">Limited Time Offer</h3>
              <p style="font-size: 18px; margin: 0;">Get exclusive access to premium content</p>
            </div>
            <div style="text-align: center;">
              <a href="{{offer_url}}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Claim Offer</a>
            </div>
          </main>
          <footer style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
            <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
          </footer>
        </div>
      `
    };
    return templates[type] || templates.newsletter;
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
            <p className="text-gray-600 mt-1">{blog?.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold">{subscribers.length}</div>
                  <p className="text-gray-600">Subscribers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold">{templates.length}</div>
                  <p className="text-gray-600">Templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Send className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold">{campaigns.length}</div>
                  <p className="text-gray-600">Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.openCount, 0)}
                  </div>
                  <p className="text-gray-600">Total Opens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Email Campaigns</h2>
              <Button onClick={() => setShowCreateCampaign(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            {showCreateCampaign && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Campaign</CardTitle>
                  <CardDescription>Send emails to your subscribers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campaign Name</Label>
                      <Input
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Monthly Newsletter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select 
                        value={campaignForm.templateId} 
                        onValueChange={(value) => setCampaignForm(prev => ({ ...prev, templateId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={campaignForm.subject}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Your weekly digest is here!"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Schedule For (Optional)</Label>
                    <Input
                      type="datetime-local"
                      value={campaignForm.scheduledFor}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateCampaign}>
                      {campaignForm.scheduledFor ? 'Schedule Campaign' : 'Create Campaign'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                            campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            campaign.status === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                            campaign.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{campaign.subject}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {campaign.recipientCount} recipients
                          </div>
                          {campaign.sentCount > 0 && (
                            <div className="flex items-center">
                              <Send className="w-4 h-4 mr-1" />
                              {campaign.sentCount} sent
                            </div>
                          )}
                          {campaign.openCount > 0 && (
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {campaign.openCount} opens
                            </div>
                          )}
                          {campaign.clickCount > 0 && (
                            <div className="flex items-center">
                              <MousePointer className="w-4 h-4 mr-1" />
                              {campaign.clickCount} clicks
                            </div>
                          )}
                        </div>
                      </div>
                      {campaign.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleSendCampaign(campaign.id)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {campaigns.length === 0 && !showCreateCampaign && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-600 mb-4">Create your first email campaign</p>
                <Button onClick={() => setShowCreateCampaign(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Campaign
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Email Templates</h2>
              <Button onClick={() => setShowCreateTemplate(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            {showCreateTemplate && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Email Template</CardTitle>
                  <CardDescription>Design reusable email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Template Name</Label>
                      <Input
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Welcome Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={templateForm.type} 
                        onValueChange={(value: any) => {
                          setTemplateForm(prev => ({ 
                            ...prev, 
                            type: value,
                            htmlContent: generateBasicTemplate(value)
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={templateForm.subject}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Welcome to our blog!"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>HTML Content</Label>
                    <Textarea
                      value={templateForm.htmlContent}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, htmlContent: e.target.value }))}
                      placeholder="Email HTML content"
                      rows={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Text Content (Optional)</Label>
                    <Textarea
                      value={templateForm.textContent}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, textContent: e.target.value }))}
                      placeholder="Plain text version"
                      rows={5}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateTemplate}>Create Template</Button>
                    <Button variant="outline" onClick={() => setShowCreateTemplate(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {template.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{template.subject}</p>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {templates.length === 0 && !showCreateTemplate && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
                <p className="text-gray-600 mb-4">Create your first email template</p>
                <Button onClick={() => setShowCreateTemplate(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Template
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <h2 className="text-xl font-semibold">Subscribers</h2>
            
            <div className="space-y-4">
              {subscribers.map((subscriber) => (
                <Card key={subscriber.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{subscriber.email}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {subscriber.status}
                          </span>
                          <span>{subscriber.subscriptionTier}</span>
                          <span>Joined: {new Date(subscriber.subscriptionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {subscribers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers yet</h3>
                <p className="text-gray-600">Subscribers will appear here when they sign up</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Email Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.filter(c => c.status === 'sent').map(campaign => (
                      <div key={campaign.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <div className="text-gray-500">Sent</div>
                            <div className="font-medium">{campaign.sentCount}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Opens</div>
                            <div className="font-medium">{campaign.openCount}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Clicks</div>
                            <div className="font-medium">{campaign.clickCount}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{subscribers.length}</div>
                    <p className="text-gray-600">Total Subscribers</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Active:</span>
                      <span>{subscribers.filter(s => s.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free:</span>
                      <span>{subscribers.filter(s => s.subscriptionTier === 'free').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium:</span>
                      <span>{subscribers.filter(s => s.subscriptionTier === 'premium').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EmailMarketingManager;
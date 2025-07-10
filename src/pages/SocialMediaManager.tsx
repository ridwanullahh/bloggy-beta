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
import { Blog } from '../types/blog';
import { SocialMediaAccount, SocialMediaPost } from '../types/social';
import { SocialMediaService } from '../services/socialMediaService';
import sdk from '../lib/sdk-instance';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  MessageCircle,
  Video,
  Share2,
  Clock
} from 'lucide-react';

const SocialMediaManager: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    platform: '',
    accountId: '',
    accountName: '',
    accessToken: '',
    refreshToken: ''
  });
  const [newPostForm, setNewPostForm] = useState({
    platform: '',
    content: '',
    scheduledFor: ''
  });

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle },
    { id: 'tiktok', name: 'TikTok', icon: Video },
    { id: 'whatsapp', name: 'WhatsApp', icon: Share2 },
    { id: 'snapchat', name: 'Snapchat', icon: Share2 }
  ];

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

        const connectedAccounts = await SocialMediaService.getConnectedAccounts(foundBlog.id);
        setAccounts(connectedAccounts);

        const allSocialPosts = await sdk.get<SocialMediaPost>('socialMediaPosts');
        const blogSocialPosts = allSocialPosts.filter(sp => sp.blogId === foundBlog.id);
        setSocialPosts(blogSocialPosts);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load social media data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, user, toast]);

  const handleAddAccount = async () => {
    if (!blog || !newAccountForm.platform || !newAccountForm.accessToken) return;

    try {
      const account = await SocialMediaService.connectAccount(
        blog.id,
        newAccountForm.platform as any,
        newAccountForm.accountId,
        newAccountForm.accountName,
        newAccountForm.accessToken,
        newAccountForm.refreshToken
      );

      setAccounts(prev => [...prev, account]);
      setNewAccountForm({
        platform: '',
        accountId: '',
        accountName: '',
        accessToken: '',
        refreshToken: ''
      });
      setShowAddAccount(false);

      toast({
        title: "Success",
        description: `${newAccountForm.platform} account connected successfully!`,
      });
    } catch (error) {
      console.error('Error adding account:', error);
      toast({
        title: "Error",
        description: "Failed to connect account.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    try {
      await SocialMediaService.disconnectAccount(accountId);
      setAccounts(prev => prev.filter(a => a.id !== accountId));
      
      toast({
        title: "Success",
        description: "Account disconnected successfully!",
      });
    } catch (error) {
      console.error('Error removing account:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect account.",
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = async () => {
    if (!blog || !newPostForm.platform || !newPostForm.content) return;

    try {
      const socialPost = await SocialMediaService.createSocialPost(
        'manual',
        blog.id,
        newPostForm.platform,
        newPostForm.content,
        [],
        newPostForm.scheduledFor || undefined
      );

      setSocialPosts(prev => [...prev, socialPost]);
      setNewPostForm({
        platform: '',
        content: '',
        scheduledFor: ''
      });

      toast({
        title: "Success",
        description: newPostForm.scheduledFor ? "Post scheduled successfully!" : "Post created successfully!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive",
      });
    }
  };

  const handlePublishPost = async (postId: string) => {
    try {
      await SocialMediaService.publishPost(postId);
      
      const updatedPosts = await sdk.get<SocialMediaPost>('socialMediaPosts');
      const blogSocialPosts = updatedPosts.filter(sp => sp.blogId === blog?.id);
      setSocialPosts(blogSocialPosts);

      toast({
        title: "Success",
        description: "Post published successfully!",
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      toast({
        title: "Error",
        description: "Failed to publish post.",
        variant: "destructive",
      });
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    return platformData?.icon || Share2;
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
            <h1 className="text-3xl font-bold text-gray-900">Social Media Manager</h1>
            <p className="text-gray-600 mt-1">{blog?.title}</p>
          </div>
        </div>

        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
            <TabsTrigger value="posts">Posts & Scheduling</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Connected Accounts</h2>
              <Button onClick={() => setShowAddAccount(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </div>

            {showAddAccount && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect New Account</CardTitle>
                  <CardDescription>Add a social media account to your blog</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Platform</Label>
                      <Select 
                        value={newAccountForm.platform} 
                        onValueChange={(value) => setNewAccountForm(prev => ({ ...prev, platform: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map(platform => (
                            <SelectItem key={platform.id} value={platform.id}>
                              {platform.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Name</Label>
                      <Input
                        value={newAccountForm.accountName}
                        onChange={(e) => setNewAccountForm(prev => ({ ...prev, accountName: e.target.value }))}
                        placeholder="@username or account name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Account ID</Label>
                    <Input
                      value={newAccountForm.accountId}
                      onChange={(e) => setNewAccountForm(prev => ({ ...prev, accountId: e.target.value }))}
                      placeholder="Account ID or username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Access Token</Label>
                    <Input
                      type="password"
                      value={newAccountForm.accessToken}
                      onChange={(e) => setNewAccountForm(prev => ({ ...prev, accessToken: e.target.value }))}
                      placeholder="API access token"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Refresh Token (Optional)</Label>
                    <Input
                      type="password"
                      value={newAccountForm.refreshToken}
                      onChange={(e) => setNewAccountForm(prev => ({ ...prev, refreshToken: e.target.value }))}
                      placeholder="Refresh token"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddAccount}>Connect Account</Button>
                    <Button variant="outline" onClick={() => setShowAddAccount(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account) => {
                const Icon = getPlatformIcon(account.platform);
                return (
                  <Card key={account.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-8 h-8 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{account.accountName}</h3>
                            <p className="text-sm text-gray-500 capitalize">{account.platform}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAccount(account.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-green-600">
                        ✓ Connected
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {accounts.length === 0 && !showAddAccount && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
                <p className="text-gray-600 mb-4">Connect your social media accounts to start posting</p>
                <Button onClick={() => setShowAddAccount(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Connect First Account
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Posts & Scheduling</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>Post to your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select 
                      value={newPostForm.platform} 
                      onValueChange={(value) => setNewPostForm(prev => ({ ...prev, platform: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => {
                          const Icon = getPlatformIcon(account.platform);
                          return (
                            <SelectItem key={account.id} value={account.platform}>
                              <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <span>{account.accountName} ({account.platform})</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Schedule For (Optional)</Label>
                    <Input
                      type="datetime-local"
                      value={newPostForm.scheduledFor}
                      onChange={(e) => setNewPostForm(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={newPostForm.content}
                    onChange={(e) => setNewPostForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="What do you want to share?"
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreatePost} disabled={!newPostForm.platform || !newPostForm.content}>
                  {newPostForm.scheduledFor ? (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Post
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recent Posts</h3>
              {socialPosts.map((post) => {
                const Icon = getPlatformIcon(post.platform);
                return (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Icon className="w-6 h-6 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium capitalize">{post.platform}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                post.status === 'published' ? 'bg-green-100 text-green-800' :
                                post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                post.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {post.status}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{post.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {post.scheduledFor && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Scheduled: {new Date(post.scheduledFor).toLocaleString()}
                                </div>
                              )}
                              {post.publishedAt && (
                                <div className="flex items-center">
                                  <Send className="w-4 h-4 mr-1" />
                                  Published: {new Date(post.publishedAt).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {post.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => handlePublishPost(post.id)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Publish
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {socialPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Create your first social media post above</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Social Media Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{socialPosts.filter(p => p.status === 'published').length}</div>
                  <p className="text-gray-600">Posts Published</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{socialPosts.filter(p => p.status === 'scheduled').length}</div>
                  <p className="text-gray-600">Posts Scheduled</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{accounts.length}</div>
                  <p className="text-gray-600">Connected Accounts</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platforms.map(platform => {
                    const count = socialPosts.filter(p => p.platform === platform.id).length;
                    const Icon = platform.icon;
                    return (
                      <div key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5" />
                          <span>{platform.name}</span>
                        </div>
                        <span className="font-medium">{count} posts</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SocialMediaManager;
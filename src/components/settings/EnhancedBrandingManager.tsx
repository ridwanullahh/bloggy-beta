import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { useToast } from '../../hooks/use-toast';
import { Blog } from '../../types/blog';
import { 
  Palette, 
  Image, 
  Share2, 
  Eye, 
  Save,
  RefreshCw,
  Sparkles,
  User,
  Mail
} from 'lucide-react';
import sdk from '../../lib/sdk-instance';

interface EnhancedBrandingManagerProps {
  blog: Blog;
  onUpdate: (updatedBlog: Blog) => void;
}

export const EnhancedBrandingManager: React.FC<EnhancedBrandingManagerProps> = ({
  blog,
  onUpdate
}) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Color state
  const [colors, setColors] = useState({
    primary: blog.customization?.brandColors?.primary || '#05B34D',
    secondary: blog.customization?.brandColors?.secondary || '#F2B91C',
    accent: blog.customization?.brandColors?.accent || '#181F25',
    headerBg: blog.customization?.brandColors?.headerBg || '#FFFFFF',
    headerText: blog.customization?.brandColors?.headerText || '#181F25',
    footerBg: blog.customization?.brandColors?.footerBg || '#181F25',
    footerText: blog.customization?.brandColors?.footerText || '#FFFFFF',
    siteBg: blog.customization?.brandColors?.siteBg || '#E9FBF1',
    siteText: blog.customization?.brandColors?.siteText || '#181F25'
  });

  // Social media state
  const [socialMedia, setSocialMedia] = useState({
    twitter: blog.customization?.socialMedia?.twitter || '',
    facebook: blog.customization?.socialMedia?.facebook || '',
    instagram: blog.customization?.socialMedia?.instagram || '',
    linkedin: blog.customization?.socialMedia?.linkedin || '',
    github: blog.customization?.socialMedia?.github || '',
    youtube: blog.customization?.socialMedia?.youtube || '',
    email: blog.customization?.socialMedia?.email || '',
    enableTwitter: blog.customization?.socialMedia?.enableTwitter ?? true,
    enableFacebook: blog.customization?.socialMedia?.enableFacebook ?? true,
    enableInstagram: blog.customization?.socialMedia?.enableInstagram ?? true,
    enableLinkedin: blog.customization?.socialMedia?.enableLinkedin ?? true,
    enableGithub: blog.customization?.socialMedia?.enableGithub ?? true,
    enableYoutube: blog.customization?.socialMedia?.enableYoutube ?? true,
  });

  // Branding state
  const [branding, setBranding] = useState({
    useGravatar: blog.customization?.branding?.useGravatar ?? false,
    gravatarEmail: blog.customization?.branding?.gravatarEmail || '',
    logoUrl: blog.customization?.branding?.logoUrl || '',
    faviconUrl: blog.customization?.branding?.faviconUrl || ''
  });

  const colorPalettes = [
    {
      name: 'Bloggy Green',
      primary: '#05B34D',
      secondary: '#F2B91C',
      accent: '#181F25'
    },
    {
      name: 'Ocean Blue',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#0F172A'
    },
    {
      name: 'Sunset Orange',
      primary: '#F97316',
      secondary: '#FB923C',
      accent: '#1C1917'
    },
    {
      name: 'Purple Haze',
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#1E1B4B'
    },
    {
      name: 'Forest Green',
      primary: '#059669',
      secondary: '#34D399',
      accent: '#064E3B'
    }
  ];

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
    if (previewMode) {
      applyPreviewColors({ ...colors, [colorKey]: value });
    }
  };

  const handleSocialMediaChange = (key: string, value: string | boolean) => {
    setSocialMedia(prev => ({ ...prev, [key]: value }));
  };

  const handleBrandingChange = (key: string, value: string | boolean) => {
    setBranding(prev => ({ ...prev, [key]: value }));
  };

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    const newColors = {
      ...colors,
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent
    };
    setColors(newColors);
    
    if (previewMode) {
      applyPreviewColors(newColors);
    }
  };

  const applyPreviewColors = (colorSet: typeof colors) => {
    const root = document.documentElement;
    Object.entries(colorSet).forEach(([key, value]) => {
      root.style.setProperty(`--preview-${key}`, value);
    });
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      applyPreviewColors(colors);
    } else {
      // Remove preview colors
      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.removeProperty(`--preview-${key}`);
      });
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const updatedBlog = {
        ...blog,
        customization: {
          ...blog.customization,
          brandColors: colors,
          socialMedia: socialMedia,
          branding: branding
        }
      };

      await sdk.update<Blog>('blogs', blog.id, updatedBlog);
      onUpdate(updatedBlog);

      toast({
        title: "Success",
        description: "Branding settings saved successfully!",
      });
    } catch (error) {
      console.error('Error saving branding settings:', error);
      toast({
        title: "Error",
        description: "Failed to save branding settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setColors({
      primary: '#05B34D',
      secondary: '#F2B91C',
      accent: '#181F25',
      headerBg: '#FFFFFF',
      headerText: '#181F25',
      footerBg: '#181F25',
      footerText: '#FFFFFF',
      siteBg: '#E9FBF1',
      siteText: '#181F25'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Branding & Customization</h2>
          <p className="text-gray-600">Customize your blog's appearance and social presence</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={togglePreview}
            className={previewMode ? 'bg-blue-50 border-blue-200' : ''}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Social Media</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span>Branding</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Color Palettes</span>
              </CardTitle>
              <CardDescription>
                Choose from pre-designed color palettes or customize your own
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {colorPalettes.map((palette, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-3 rounded-lg border hover:border-gray-300 transition-colors"
                    onClick={() => applyPalette(palette)}
                  >
                    <div className="flex space-x-1 mb-2">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: palette.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: palette.secondary }}
                      />
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: palette.accent }}
                      />
                    </div>
                    <p className="text-sm font-medium">{palette.name}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Custom Colors */}
              <div className="space-y-6">
                <h4 className="font-semibold">Custom Colors</h4>
                
                {/* Primary Colors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primary"
                        type="color"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        placeholder="#05B34D"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondary"
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        placeholder="#F2B91C"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="accent"
                        type="color"
                        value={colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        placeholder="#181F25"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Header Colors */}
                <div>
                  <h5 className="font-medium mb-3">Header Colors</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerBg">Header Background</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="headerBg"
                          type="color"
                          value={colors.headerBg}
                          onChange={(e) => handleColorChange('headerBg', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.headerBg}
                          onChange={(e) => handleColorChange('headerBg', e.target.value)}
                          placeholder="#FFFFFF"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headerText">Header Text</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="headerText"
                          type="color"
                          value={colors.headerText}
                          onChange={(e) => handleColorChange('headerText', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.headerText}
                          onChange={(e) => handleColorChange('headerText', e.target.value)}
                          placeholder="#181F25"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Footer Colors */}
                <div>
                  <h5 className="font-medium mb-3">Footer Colors</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="footerBg">Footer Background</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="footerBg"
                          type="color"
                          value={colors.footerBg}
                          onChange={(e) => handleColorChange('footerBg', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.footerBg}
                          onChange={(e) => handleColorChange('footerBg', e.target.value)}
                          placeholder="#181F25"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="footerText">Footer Text</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="footerText"
                          type="color"
                          value={colors.footerText}
                          onChange={(e) => handleColorChange('footerText', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.footerText}
                          onChange={(e) => handleColorChange('footerText', e.target.value)}
                          placeholder="#FFFFFF"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Site Colors */}
                <div>
                  <h5 className="font-medium mb-3">Site Colors</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteBg">Site Background</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="siteBg"
                          type="color"
                          value={colors.siteBg}
                          onChange={(e) => handleColorChange('siteBg', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.siteBg}
                          onChange={(e) => handleColorChange('siteBg', e.target.value)}
                          placeholder="#E9FBF1"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteText">Site Text</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="siteText"
                          type="color"
                          value={colors.siteText}
                          onChange={(e) => handleColorChange('siteText', e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={colors.siteText}
                          onChange={(e) => handleColorChange('siteText', e.target.value)}
                          placeholder="#181F25"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={resetToDefaults}>
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Social Media Integration</span>
              </CardTitle>
              <CardDescription>
                Add your social media handles and control their visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Media Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Handle</Label>
                  <Input
                    id="twitter"
                    value={socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    placeholder="@yourusername"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableTwitter}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableTwitter', checked)}
                    />
                    <Label className="text-sm">Show Twitter link</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook Page</Label>
                  <Input
                    id="facebook"
                    value={socialMedia.facebook}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    placeholder="facebook.com/yourpage"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableFacebook}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableFacebook', checked)}
                    />
                    <Label className="text-sm">Show Facebook link</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    placeholder="@yourusername"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableInstagram}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableInstagram', checked)}
                    />
                    <Label className="text-sm">Show Instagram link</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={socialMedia.linkedin}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableLinkedin}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableLinkedin', checked)}
                    />
                    <Label className="text-sm">Show LinkedIn link</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    value={socialMedia.github}
                    onChange={(e) => handleSocialMediaChange('github', e.target.value)}
                    placeholder="github.com/yourusername"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableGithub}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableGithub', checked)}
                    />
                    <Label className="text-sm">Show GitHub link</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube Channel</Label>
                  <Input
                    id="youtube"
                    value={socialMedia.youtube}
                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                    placeholder="youtube.com/c/yourchannel"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={socialMedia.enableYoutube}
                      onCheckedChange={(checked) => handleSocialMediaChange('enableYoutube', checked)}
                    />
                    <Label className="text-sm">Show YouTube link</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={socialMedia.email}
                  onChange={(e) => handleSocialMediaChange('email', e.target.value)}
                  placeholder="contact@yourblog.com"
                />
                <p className="text-sm text-gray-600">
                  This email will be displayed in your footer for contact purposes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="w-5 h-5" />
                <span>Visual Branding</span>
              </CardTitle>
              <CardDescription>
                Customize your blog's visual identity with logos and avatars
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gravatar Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={branding.useGravatar}
                    onCheckedChange={(checked) => handleBrandingChange('useGravatar', checked)}
                  />
                  <Label>Use Gravatar for blog avatar</Label>
                </div>

                {branding.useGravatar && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="gravatarEmail">Gravatar Email</Label>
                    <Input
                      id="gravatarEmail"
                      type="email"
                      value={branding.gravatarEmail}
                      onChange={(e) => handleBrandingChange('gravatarEmail', e.target.value)}
                      placeholder="your@email.com"
                    />
                    <p className="text-sm text-gray-600">
                      This email will be used to fetch your Gravatar image
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Custom Logo */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logoUrl">Custom Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={branding.logoUrl}
                    onChange={(e) => handleBrandingChange('logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-sm text-gray-600">
                    Upload your logo to a hosting service and paste the URL here
                  </p>
                </div>

                {branding.logoUrl && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium mb-2">Logo Preview:</p>
                    <img
                      src={branding.logoUrl}
                      alt="Logo preview"
                      className="max-h-16 max-w-32 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Favicon */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="faviconUrl">Custom Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={branding.faviconUrl}
                    onChange={(e) => handleBrandingChange('faviconUrl', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                  <p className="text-sm text-gray-600">
                    Upload a 32x32 or 16x16 pixel favicon and paste the URL here
                  </p>
                </div>

                {branding.faviconUrl && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium mb-2">Favicon Preview:</p>
                    <img
                      src={branding.faviconUrl}
                      alt="Favicon preview"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedBrandingManager;

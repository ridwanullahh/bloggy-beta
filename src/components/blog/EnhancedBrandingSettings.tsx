import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Palette, 
  Type, 
  Image, 
  Globe, 
  Eye, 
  Upload,
  Download,
  RotateCcw,
  Sparkles,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { Gravatar } from '../../utils/gravatar';

interface BrandingSettingsProps {
  blog: any;
  onUpdate: (updates: any) => void;
  onSave: () => void;
  saving?: boolean;
}

export const EnhancedBrandingSettings: React.FC<BrandingSettingsProps> = ({
  blog,
  onUpdate,
  onSave,
  saving = false
}) => {
  const [activeTab, setActiveTab] = useState('colors');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Color palette state
  const [colorPalette, setColorPalette] = useState({
    primary: blog.customization?.brandColors?.primary || '#05B34D',
    secondary: blog.customization?.brandColors?.secondary || '#E9FBF1',
    accent: blog.customization?.brandColors?.accent || '#F2B91C',
    background: blog.customization?.brandColors?.siteBg || '#FFFFFF',
    surface: blog.customization?.brandColors?.surface || '#F8FAFC',
    text: blog.customization?.brandColors?.siteText || '#1E293B',
    textSecondary: blog.customization?.brandColors?.textSecondary || '#64748B',
    border: blog.customization?.brandColors?.border || '#E2E8F0',
    success: blog.customization?.brandColors?.success || '#10B981',
    warning: blog.customization?.brandColors?.warning || '#F59E0B',
    error: blog.customization?.brandColors?.error || '#EF4444'
  });

  // Typography state
  const [typography, setTypography] = useState({
    primaryFont: blog.customization?.fonts?.primaryFont || 'Inter',
    headingFont: blog.customization?.fonts?.headingFont || 'Inter',
    codeFont: blog.customization?.fonts?.codeFont || 'JetBrains Mono',
    fontSize: blog.customization?.fonts?.fontSize || 'medium',
    lineHeight: blog.customization?.fonts?.lineHeight || 'normal'
  });

  // Branding state
  const [branding, setBranding] = useState({
    customLogo: blog.customization?.branding?.customLogo || '',
    favicon: blog.customization?.branding?.favicon || '',
    useGravatarInHeader: blog.customization?.branding?.useGravatarInHeader || false,
    showBlogNameOnHomepage: blog.customization?.branding?.showBlogNameOnHomepage !== false,
    customCSS: blog.customization?.branding?.customCSS || '',
    footerText: blog.customization?.branding?.footerText || '',
    metaDescription: blog.customization?.branding?.metaDescription || blog.description || ''
  });

  // Predefined color schemes
  const colorSchemes = [
    {
      name: 'Default Green',
      colors: {
        primary: '#05B34D',
        secondary: '#E9FBF1',
        accent: '#F2B91C',
        background: '#FFFFFF',
        text: '#1E293B'
      }
    },
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#0EA5E9',
        secondary: '#F0F9FF',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#0F172A'
      }
    },
    {
      name: 'Sunset Orange',
      colors: {
        primary: '#EA580C',
        secondary: '#FFF7ED',
        accent: '#8B5CF6',
        background: '#FFFFFF',
        text: '#1C1917'
      }
    },
    {
      name: 'Royal Purple',
      colors: {
        primary: '#7C3AED',
        secondary: '#F3F4F6',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#111827'
      }
    },
    {
      name: 'Dark Mode',
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        accent: '#F59E0B',
        background: '#111827',
        text: '#F9FAFB'
      }
    }
  ];

  // Font options
  const fontOptions = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' }
  ];

  // Update parent component when settings change
  useEffect(() => {
    onUpdate({
      customization: {
        ...blog.customization,
        brandColors: colorPalette,
        fonts: typography,
        branding: branding
      }
    });
  }, [colorPalette, typography, branding]);

  const handleColorChange = (colorKey: string, value: string) => {
    setColorPalette(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleTypographyChange = (key: string, value: string) => {
    setTypography(prev => ({ ...prev, [key]: value }));
  };

  const handleBrandingChange = (key: string, value: any) => {
    setBranding(prev => ({ ...prev, [key]: value }));
  };

  const applyColorScheme = (scheme: any) => {
    setColorPalette(prev => ({ ...prev, ...scheme.colors }));
  };

  const resetToDefaults = () => {
    setColorPalette({
      primary: '#05B34D',
      secondary: '#E9FBF1',
      accent: '#F2B91C',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    });
    setTypography({
      primaryFont: 'Inter',
      headingFont: 'Inter',
      codeFont: 'JetBrains Mono',
      fontSize: 'medium',
      lineHeight: 'normal'
    });
  };

  const exportSettings = () => {
    const settings = {
      colors: colorPalette,
      typography,
      branding
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blog.slug}-branding-settings.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          if (settings.colors) setColorPalette(settings.colors);
          if (settings.typography) setTypography(settings.typography);
          if (settings.branding) setBranding(settings.branding);
        } catch (error) {
          console.error('Failed to import settings:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brand Customization</h2>
          <p className="text-gray-600">Customize your blog's visual identity and branding</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </label>
          
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Preview Mode Selector */}
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
        <Eye className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Preview:</span>
        <div className="flex space-x-1">
          {[
            { mode: 'desktop', icon: Monitor, label: 'Desktop' },
            { mode: 'tablet', icon: Tablet, label: 'Tablet' },
            { mode: 'mobile', icon: Smartphone, label: 'Mobile' }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={previewMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode(mode as any)}
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center space-x-2">
            <Type className="w-4 h-4" />
            <span>Typography</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span>Branding</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          {/* Color Schemes */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Color Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colorSchemes.map((scheme) => (
                  <div
                    key={scheme.name}
                    className="cursor-pointer p-3 border rounded-lg hover:shadow-md transition-shadow"
                    onClick={() => applyColorScheme(scheme)}
                  >
                    <div className="flex space-x-1 mb-2">
                      {Object.values(scheme.colors).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-gray-700">{scheme.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(colorPalette).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Font</Label>
                  <select
                    value={typography.primaryFont}
                    onChange={(e) => handleTypographyChange('primaryFont', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Heading Font</Label>
                  <select
                    value={typography.headingFont}
                    onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.name} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Code Font</Label>
                <select
                  value={typography.codeFont}
                  onChange={(e) => handleTypographyChange('codeFont', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="JetBrains Mono">JetBrains Mono</option>
                  <option value="Fira Code">Fira Code</option>
                  <option value="Source Code Pro">Source Code Pro</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Monaco">Monaco</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <select
                    value={typography.fontSize}
                    onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Line Height</Label>
                  <select
                    value={typography.lineHeight}
                    onChange={(e) => handleTypographyChange('lineHeight', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Custom Logo URL</Label>
                <Input
                  value={branding.customLogo}
                  onChange={(e) => handleBrandingChange('customLogo', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label>Favicon URL</Label>
                <Input
                  value={branding.favicon}
                  onChange={(e) => handleBrandingChange('favicon', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={branding.useGravatarInHeader}
                  onCheckedChange={(checked) => handleBrandingChange('useGravatarInHeader', checked)}
                />
                <Label>Use Gravatar in Header</Label>
                {branding.useGravatarInHeader && (
                  <div className="ml-4">
                    <Gravatar
                      email={blog.ownerId}
                      size={32}
                      className="w-8 h-8 rounded-full border"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={branding.showBlogNameOnHomepage}
                  onCheckedChange={(checked) => handleBrandingChange('showBlogNameOnHomepage', checked)}
                />
                <Label>Show Blog Name on Homepage</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO & Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={branding.metaDescription}
                  onChange={(e) => handleBrandingChange('metaDescription', e.target.value)}
                  placeholder="A brief description of your blog for search engines"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Footer Text</Label>
                <Textarea
                  value={branding.footerText}
                  onChange={(e) => handleBrandingChange('footerText', e.target.value)}
                  placeholder="Custom footer text or copyright notice"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Custom CSS Code</Label>
                <Textarea
                  value={branding.customCSS}
                  onChange={(e) => handleBrandingChange('customCSS', e.target.value)}
                  placeholder="/* Add your custom CSS here */"
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Add custom CSS to override theme styles. Use CSS variables like var(--theme-color-primary) for consistency.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedBrandingSettings;

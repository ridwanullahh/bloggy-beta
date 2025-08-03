import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { Palette, Eye, RotateCcw, Sparkles, Save } from 'lucide-react';
import { Blog } from '../../types/blog';
import sdk from '../../lib/sdk-instance';

interface BrandColorManagerProps {
  blog: Blog;
  onColorsUpdate: (colors: { primary: string; secondary: string; accent: string }) => void;
}

export const BrandColorManager: React.FC<BrandColorManagerProps> = ({ blog, onColorsUpdate }) => {
  const { toast } = useToast();
  const [colors, setColors] = useState({
    primary: blog.brandColors?.primary || '#05B34D',
    secondary: blog.brandColors?.secondary || '#F2B91C',
    accent: blog.brandColors?.accent || '#181F25',
    headerBg: blog.brandColors?.headerBg || '#FFFFFF',
    headerText: blog.brandColors?.headerText || '#181F25',
    footerBg: blog.brandColors?.footerBg || '#181F25',
    footerText: blog.brandColors?.footerText || '#FFFFFF',
    siteBg: blog.brandColors?.siteBg || '#E9FBF1',
    siteText: blog.brandColors?.siteText || '#181F25'
  });
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Predefined color palettes with comprehensive colors
  const colorPalettes = [
    {
      name: 'Brand Default',
      primary: '#05B34D',
      secondary: '#F2B91C',
      accent: '#181F25',
      headerBg: '#FFFFFF',
      headerText: '#181F25',
      footerBg: '#181F25',
      footerText: '#FFFFFF',
      siteBg: '#E9FBF1',
      siteText: '#181F25'
    },
    {
      name: 'Ocean Blue',
      primary: '#0EA5E9',
      secondary: '#3B82F6',
      accent: '#06B6D4',
      headerBg: '#FFFFFF',
      headerText: '#1E293B',
      footerBg: '#1E293B',
      footerText: '#FFFFFF',
      siteBg: '#F0F9FF',
      siteText: '#1E293B'
    },
    {
      name: 'Sunset Orange',
      primary: '#F97316',
      secondary: '#FB923C',
      accent: '#FDBA74',
      headerBg: '#FFFFFF',
      headerText: '#9A3412',
      footerBg: '#9A3412',
      footerText: '#FFFFFF',
      siteBg: '#FFF7ED',
      siteText: '#9A3412'
    },
    {
      name: 'Forest Green',
      primary: '#059669',
      secondary: '#10B981',
      accent: '#34D399',
      headerBg: '#FFFFFF',
      headerText: '#064E3B',
      footerBg: '#064E3B',
      footerText: '#FFFFFF',
      siteBg: '#ECFDF5',
      siteText: '#064E3B'
    },
    {
      name: 'Royal Purple',
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      accent: '#A78BFA',
      headerBg: '#FFFFFF',
      headerText: '#581C87',
      footerBg: '#581C87',
      footerText: '#FFFFFF',
      siteBg: '#FAF5FF',
      siteText: '#581C87'
    },
    {
      name: 'Monochrome',
      primary: '#000000',
      secondary: '#6B7280',
      accent: '#F3F4F6',
      headerBg: '#FFFFFF',
      headerText: '#000000',
      footerBg: '#000000',
      footerText: '#FFFFFF',
      siteBg: '#F9FAFB',
      siteText: '#000000'
    }
  ];

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    const newColors = { ...colors, [colorType]: value };
    setColors(newColors);
    
    if (previewMode) {
      onColorsUpdate(newColors);
    }
  };

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    const newColors = {
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent
    };
    setColors(newColors);
    
    if (previewMode) {
      onColorsUpdate(newColors);
    }
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#06B6D4'
    };
    setColors(defaultColors);
    
    if (previewMode) {
      onColorsUpdate(defaultColors);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      onColorsUpdate(colors);
    }
  };

  const saveColors = async () => {
    setSaving(true);
    try {
      const updatedBlog = {
        ...blog,
        brandColors: colors
      };

      await sdk.update<Blog>('blogs', blog.id, updatedBlog);
      onColorsUpdate(colors);

      toast({
        title: "Success",
        description: "Brand colors saved successfully!",
      });
    } catch (error) {
      console.error('Error saving brand colors:', error);
      toast({
        title: "Error",
        description: "Failed to save brand colors.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Brand Color Palette</CardTitle>
            <CardDescription className="text-purple-100">
              Customize your blog's brand colors to match your identity
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Color Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="primary-color" className="text-sm font-medium text-gray-700">
              Primary Color
            </Label>
            <div className="flex items-center space-x-3">
              <Input
                id="primary-color"
                type="color"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer"
              />
              <Input
                type="text"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                placeholder="#3B82F6"
                className="flex-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            {!isValidHexColor(colors.primary) && (
              <p className="text-xs text-red-500">Invalid hex color format</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="secondary-color" className="text-sm font-medium text-gray-700">
              Secondary Color
            </Label>
            <div className="flex items-center space-x-3">
              <Input
                id="secondary-color"
                type="color"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer"
              />
              <Input
                type="text"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                placeholder="#8B5CF6"
                className="flex-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            {!isValidHexColor(colors.secondary) && (
              <p className="text-xs text-red-500">Invalid hex color format</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="accent-color" className="text-sm font-medium text-gray-700">
              Accent Color
            </Label>
            <div className="flex items-center space-x-3">
              <Input
                id="accent-color"
                type="color"
                value={colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-16 h-12 p-1 border-2 border-gray-200 rounded-lg cursor-pointer"
              />
              <Input
                type="text"
                value={colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                placeholder="#06B6D4"
                className="flex-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            {!isValidHexColor(colors.accent) && (
              <p className="text-xs text-red-500">Invalid hex color format</p>
            )}
          </div>
        </div>

        {/* Color Preview */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Color Preview</h4>
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.primary }}
            >
              Primary
            </div>
            <div 
              className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.secondary }}
            >
              Secondary
            </div>
            <div 
              className="w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.accent }}
            >
              Accent
            </div>
          </div>
        </div>

        {/* Predefined Palettes */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Palettes</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colorPalettes.map((palette, index) => (
              <button
                key={index}
                onClick={() => applyPalette(palette)}
                className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex space-x-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.primary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.secondary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.accent }}></div>
                </div>
                <span className="text-xs font-medium text-gray-700">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={togglePreview}
            variant="outline"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Stop Preview' : 'Live Preview'}
          </Button>
          
          <Button
            onClick={resetToDefault}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          
          <Button
            onClick={saveColors}
            disabled={saving || !isValidHexColor(colors.primary) || !isValidHexColor(colors.secondary) || !isValidHexColor(colors.accent)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Colors'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandColorManager;

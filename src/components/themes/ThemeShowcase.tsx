import React, { useState, useEffect } from 'react';
import { BLOG_THEMES, getThemeCategories, getThemesByCategory } from '../../constants/themes';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Check, Eye, Palette, Sparkles, Zap, Layers } from 'lucide-react';
import { themeRegistry } from './modular/ThemeRegistry';
import { registerAllThemes } from './modular/register-themes';
import { ThemePreview } from './modular/ThemePreview';
import { ModularTheme } from './modular/types';

interface ThemeShowcaseProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({
  selectedTheme,
  onThemeSelect,
  customColors
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [previewTheme, setPreviewTheme] = useState<ModularTheme | null>(null);
  const [modularThemes, setModularThemes] = useState<ModularTheme[]>([]);

  // Initialize modular themes
  useEffect(() => {
    registerAllThemes();
    const themes = themeRegistry.getAllThemes();
    setModularThemes(themes);
  }, []);

  // Combine legacy and modular themes
  const legacyCategories = getThemeCategories();
  const modularCategories = themeRegistry.getCategories();

  const allCategories = [
    { id: 'all', name: 'All Themes', count: BLOG_THEMES.length + modularThemes.length },
    ...legacyCategories,
    ...modularCategories
  ];

  const filteredLegacyThemes = getThemesByCategory(filter);
  const filteredModularThemes = filter === 'all'
    ? modularThemes
    : modularThemes.filter(theme => theme.category === filter);

  const getThemePreview = (theme: any) => {
    const colors = customColors || {
      primary: theme.styles.primaryColor,
      secondary: theme.styles.secondaryColor,
      accent: theme.styles.accentColor
    };

    return (
      <div
        className="w-full h-40 rounded-lg overflow-hidden border shadow-sm"
        style={{
          backgroundColor: colors.secondary,
          fontFamily: theme.styles.fontFamily
        }}
      >
        {/* Realistic header with navigation */}
        <div
          className="h-8 flex items-center justify-between px-3"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-white/80 rounded text-xs"></div>
            <div className="text-white text-xs font-medium">Blog Title</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 rounded-full bg-white/60"></div>
            <div className="w-1 h-1 rounded-full bg-white/60"></div>
            <div className="w-1 h-1 rounded-full bg-white/60"></div>
          </div>
        </div>

        {/* Theme-specific content preview */}
        <div className="p-2 space-y-1.5" style={{ fontSize: '6px' }}>
          {/* Hero/Title section */}
          <div className="space-y-1">
            <div
              className="h-2 rounded"
              style={{
                backgroundColor: theme.styles.textColor,
                width: theme.id.includes('minimal') ? '50%' : '70%',
                opacity: 0.9
              }}
            ></div>
            <div
              className="h-1 rounded"
              style={{
                backgroundColor: theme.styles.textColor,
                width: '85%',
                opacity: 0.6
              }}
            ></div>
          </div>

          {/* Layout-specific content */}
          <div className="mt-2">
            {theme.styles.layout === 'grid' ? (
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="space-y-0.5 p-1 rounded"
                    style={{
                      backgroundColor: 'white',
                      border: `1px solid ${colors.accent}20`,
                      borderRadius: theme.styles.borderRadius === '0px' ? '0' : '2px'
                    }}
                  >
                    <div
                      className="h-3 rounded"
                      style={{ backgroundColor: `${colors.accent}30` }}
                    ></div>
                    <div
                      className="h-0.5 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.7, width: '80%' }}
                    ></div>
                    <div
                      className="h-0.5 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.5, width: '60%' }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : theme.styles.layout === 'magazine' ? (
              <div className="space-y-1">
                <div className="flex space-x-1">
                  <div
                    className="w-8 h-6 rounded"
                    style={{ backgroundColor: `${colors.accent}40` }}
                  ></div>
                  <div className="flex-1 space-y-0.5">
                    <div
                      className="h-1 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.8, width: '90%' }}
                    ></div>
                    <div
                      className="h-0.5 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.6, width: '70%' }}
                    ></div>
                    <div
                      className="h-0.5 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.6, width: '50%' }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className="w-8 h-6 rounded"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  ></div>
                  <div className="flex-1 space-y-0.5">
                    <div
                      className="h-1 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.8, width: '85%' }}
                    ></div>
                    <div
                      className="h-0.5 rounded"
                      style={{ backgroundColor: theme.styles.textColor, opacity: 0.6, width: '65%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center space-x-1 p-1 rounded"
                    style={{
                      backgroundColor: 'white',
                      border: `1px solid ${colors.accent}15`,
                      borderRadius: theme.styles.borderRadius === '0px' ? '0' : '2px'
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    ></div>
                    <div className="flex-1 space-y-0.5">
                      <div
                        className="h-0.5 rounded"
                        style={{ backgroundColor: theme.styles.textColor, opacity: 0.8, width: '80%' }}
                      ></div>
                      <div
                        className="h-0.5 rounded"
                        style={{ backgroundColor: theme.styles.textColor, opacity: 0.5, width: '60%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer/accent elements */}
          <div className="flex justify-between items-center mt-2 pt-1">
            <div className="flex space-x-1">
              <div
                className="w-3 h-1 rounded"
                style={{ backgroundColor: colors.accent }}
              ></div>
              <div
                className="w-2 h-1 rounded"
                style={{ backgroundColor: `${colors.accent}60` }}
              ></div>
            </div>
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Blog Theme</h2>
        <p className="text-gray-600">
          Select from 25 modern, responsive themes designed for different content types
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {allCategories.map(category => (
          <Button
            key={category.id}
            variant={filter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Modular Themes (New System) */}
        {filteredModularThemes.map(theme => (
          <Card
            key={theme.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTheme === theme.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => onThemeSelect(theme.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {theme.name}
                  <Badge variant="outline" className="ml-2 text-xs bg-green-100 text-green-800">
                    New
                  </Badge>
                </CardTitle>
                {selectedTheme === theme.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {theme.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Enhanced Theme Preview */}
              <div
                className="w-full h-40 rounded-lg overflow-hidden border shadow-sm bg-gradient-to-br"
                style={{
                  background: `linear-gradient(135deg, ${theme.defaultStyles.colors.primary}, ${theme.defaultStyles.colors.secondary})`,
                  fontFamily: theme.defaultStyles.typography.fontFamily
                }}
              >
                <div className="h-full p-3 text-white">
                  <div className="text-xs font-bold mb-2">{theme.name}</div>
                  <div className="space-y-1">
                    <div className="h-1 bg-white/60 rounded w-3/4"></div>
                    <div className="h-1 bg-white/40 rounded w-1/2"></div>
                    <div className="h-1 bg-white/40 rounded w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Theme Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Category:</span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {theme.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Features:</span>
                  <div className="flex space-x-1">
                    {theme.config.hasAnimations && <Badge variant="outline" className="text-xs">Animated</Badge>}
                    {theme.config.supportsDarkMode && <Badge variant="outline" className="text-xs">Dark Mode</Badge>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTheme(theme);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onThemeSelect(theme.id)}
                >
                  {selectedTheme === theme.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Legacy Themes */}
        {filteredLegacyThemes.map(theme => (
          <Card 
            key={theme.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTheme === theme.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onThemeSelect(theme.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {theme.name}
                </CardTitle>
                {selectedTheme === theme.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {theme.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Theme Preview */}
              {getThemePreview(theme)}
              
              {/* Theme Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Layout:</span>
                  <Badge variant="outline" className="text-xs">
                    {theme.styles.layout}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Style:</span>
                  <Badge variant="outline" className="text-xs">
                    {theme.styles.cardStyle}
                  </Badge>
                </div>
                
                {/* Color Palette */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: customColors?.primary || theme.styles.primaryColor }}
                      title="Primary Color"
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: customColors?.secondary || theme.styles.secondaryColor }}
                      title="Secondary Color"
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: customColors?.accent || theme.styles.accentColor }}
                      title="Accent Color"
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTheme(theme);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onThemeSelect(theme.id)}
                >
                  {selectedTheme === theme.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Theme Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Theme Collection Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Layers className="w-4 h-4 mr-1" />
              Total Themes
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Check className="w-4 h-4 mr-1" />
              Responsive
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              <Sparkles className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Zap className="w-4 h-4 mr-1" />
              Modern Effects
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              <Palette className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-sm text-gray-600">
              Brand Colors
            </div>
          </div>
        </div>

        {/* Additional stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-800">25</span> Classic Themes
          </div>
          <div>
            <span className="font-semibold text-gray-800">25</span> Modern Effects
          </div>
          <div>
            <span className="font-semibold text-gray-800">8</span> Categories
          </div>
        </div>
      </div>

      {/* Enhanced Help Text */}
      <div className="text-center space-y-4">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-2">🎨 Advanced Theme Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Modern Effects:</strong> Glassmorphism, Neumorphism, Neon glows, and more
            </div>
            <div>
              <strong>Brand Integration:</strong> Custom colors automatically applied across all themes
            </div>
            <div>
              <strong>Responsive Design:</strong> Perfect on mobile, tablet, and desktop
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          All themes support custom brand colors, homepage section toggles, and modern visual effects.
          Switch themes instantly without losing your content or customizations.
        </p>
      </div>

      {/* Theme Preview Modal */}
      {previewTheme && (
        <ThemePreview
          isOpen={!!previewTheme}
          onClose={() => setPreviewTheme(null)}
          theme={previewTheme}
          onSelectTheme={(themeId) => {
            onThemeSelect(themeId);
            setPreviewTheme(null);
          }}
          currentTheme={selectedTheme}
        />
      )}
    </div>
  );
};

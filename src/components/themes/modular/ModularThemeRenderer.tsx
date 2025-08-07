import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { themeRegistry } from './ThemeRegistry';
import { ModularTheme, ModularThemeComponents, ThemeCustomization } from './types';

interface ModularThemeRendererProps {
  themeId: string;
  blog: any;
  pageType: 'homepage' | 'singlePost' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  customization?: ThemeCustomization;
  isDarkMode?: boolean;
  isPreview?: boolean;
  children?: React.ReactNode;
  
  // Page-specific props
  posts?: any[];
  post?: any;
  categories?: any[];
  tags?: any[];
  relatedPosts?: any[];
  
  // Event handlers
  onPostClick?: (post: any) => void;
  onSearch?: () => void;
  onThemeToggle?: () => void;
  onBack?: () => void;
}

export const ModularThemeRenderer: React.FC<ModularThemeRendererProps> = ({
  themeId,
  blog,
  pageType,
  customization = {},
  isDarkMode = false,
  isPreview = false,
  children,
  posts = [],
  post,
  categories = [],
  tags = [],
  relatedPosts = [],
  onPostClick,
  onSearch,
  onThemeToggle,
  onBack
}) => {
  const [theme, setTheme] = useState<ModularTheme | null>(null);
  const [components, setComponents] = useState<ModularThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load theme and components
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get theme definition
        const themeDefinition = themeRegistry.getTheme(themeId);
        if (!themeDefinition) {
          throw new Error(`Theme '${themeId}' not found`);
        }

        // Get theme components
        const themeComponents = await themeRegistry.getThemeComponents(themeId);
        if (!themeComponents) {
          throw new Error(`Components for theme '${themeId}' not found`);
        }

        setTheme(themeDefinition);
        setComponents(themeComponents);
      } catch (err) {
        console.error('Error loading theme:', err);
        setError(err instanceof Error ? err.message : 'Failed to load theme');
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, [themeId]);

  // Merge blog customization with theme customization
  const mergedCustomization = useMemo(() => {
    const blogCustomization = blog.customization || {};
    
    return {
      colors: {
        ...customization.colors,
        primary: blogCustomization.brandColors?.primary || customization.colors?.primary,
        secondary: blogCustomization.brandColors?.secondary || customization.colors?.secondary,
        accent: blogCustomization.brandColors?.accent || customization.colors?.accent,
        background: blogCustomization.brandColors?.siteBg || customization.colors?.background,
        text: blogCustomization.brandColors?.siteText || customization.colors?.text,
      },
      typography: {
        ...customization.typography,
        fontFamily: blogCustomization.fonts?.primaryFont || customization.typography?.fontFamily,
        headingFont: blogCustomization.fonts?.headingFont || customization.typography?.headingFont,
        codeFont: blogCustomization.fonts?.codeFont || customization.typography?.codeFont,
      },
      ...customization,
      customCSS: blogCustomization.branding?.customCSS || customization.customCSS
    };
  }, [blog.customization, customization]);

  // Get page layout components
  const getPageComponents = () => {
    if (!components) return null;

    switch (pageType) {
      case 'homepage':
        return components.homepage;
      case 'singlePost':
        return components.singlePost;
      case 'archive':
        return components.archive;
      case 'about':
        return components.about;
      case 'contact':
        return components.contact;
      case 'category':
        return components.category;
      case 'tag':
        return components.tag;
      default:
        return components.homepage;
    }
  };

  // Get content props based on page type
  const getContentProps = () => {
    const baseProps = {
      blog,
      onPostClick,
      onSearch,
      onThemeToggle,
      onBack
    };

    switch (pageType) {
      case 'homepage':
        return {
          ...baseProps,
          posts,
          categories,
          tags
        };
      case 'singlePost':
        return {
          ...baseProps,
          post,
          relatedPosts
        };
      case 'archive':
      case 'category':
      case 'tag':
        return {
          ...baseProps,
          posts,
          categories,
          tags
        };
      case 'about':
      case 'contact':
        return {
          ...baseProps,
          post: post || {
            title: pageType === 'about' ? 'About Us' : 'Contact Us',
            content: pageType === 'about' 
              ? '<p>Learn more about our mission and values.</p>' 
              : '<p>Get in touch with us.</p>'
          }
        };
      default:
        return baseProps;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !theme || !components) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme Loading Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Failed to load theme'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const pageComponents = getPageComponents();
  if (!pageComponents) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600">This page type is not supported by the current theme.</p>
        </div>
      </div>
    );
  }

  const HeaderComponent = pageComponents.header.component;
  const FooterComponent = pageComponents.footer.component;
  const ContentComponent = pageComponents.content.component;
  const SidebarComponent = pageComponents.sidebar?.component;

  const contentProps = getContentProps();

  return (
    <ThemeProvider
      theme={theme}
      customization={mergedCustomization}
      blog={blog}
      isDarkMode={isDarkMode}
      isPreview={isPreview}
    >
      <div className="modular-theme-layout min-h-screen flex flex-col">
        {/* Header */}
        <HeaderComponent
          onSearch={onSearch}
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex">
          {/* Sidebar (if exists) */}
          {SidebarComponent && (
            <aside className="sidebar">
              <SidebarComponent {...contentProps} />
            </aside>
          )}

          {/* Content */}
          <div className="content flex-1">
            {children ? (
              children
            ) : (
              <ContentComponent {...contentProps} />
            )}
          </div>
        </main>

        {/* Footer */}
        <FooterComponent />
      </div>
    </ThemeProvider>
  );
};

export default ModularThemeRenderer;

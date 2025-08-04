import React, { useEffect, useState } from 'react';
import { BlogTheme, Blog } from '../../types/blog';
import { getThemeById } from '../../constants/themes';
import enhancedSDK from '../../lib/enhanced-sdk';

interface UniversalPageThemeWrapperProps {
  blogSlug: string;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag' | 'search';
  children: React.ReactNode;
  className?: string;
}

export const UniversalPageThemeWrapper: React.FC<UniversalPageThemeWrapperProps> = ({
  blogSlug,
  pageType,
  children,
  className = ''
}) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [theme, setTheme] = useState<BlogTheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogAndTheme();
    
    // Real-time theme updates
    const unsubscribeBlog = enhancedSDK.subscribe('blogs', (data) => {
      if (data.type === 'refresh' || data.type === 'update') {
        const blogs = Array.isArray(data.data) ? data.data : [data.data];
        const updatedBlog = blogs.find((b: Blog) => b.slug === blogSlug);
        if (updatedBlog) {
          setBlog(updatedBlog);
          loadTheme(updatedBlog.theme);
        }
      }
    });

    return () => {
      unsubscribeBlog();
    };
  }, [blogSlug]);

  const loadBlogAndTheme = async () => {
    try {
      const blogs = await enhancedSDK.get<Blog>('blogs');
      const foundBlog = blogs.find(b => b.slug === blogSlug);
      
      if (foundBlog) {
        setBlog(foundBlog);
        await loadTheme(foundBlog.theme);
      }
    } catch (error) {
      console.error('Error loading blog and theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTheme = async (themeId: string) => {
    try {
      const foundTheme = getThemeById(themeId);
      
      if (foundTheme) {
        setTheme(foundTheme);
        applyThemeStyles(foundTheme, blog);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const applyThemeStyles = (themeData: BlogTheme, blogData: Blog | null) => {
    if (!themeData || !blogData) return;

    const root = document.documentElement;
    const brandColors = blogData.customization?.brandColors || {};

    // Create comprehensive CSS variables for the theme
    const themeVars = {
      // Base colors (with brand color overrides)
      '--theme-primary': brandColors.primary || themeData.styles.primaryColor,
      '--theme-secondary': brandColors.secondary || themeData.styles.secondaryColor,
      '--theme-accent': brandColors.accent || themeData.styles.accentColor,
      '--theme-text': themeData.styles.textColor,
      
      // Extended brand colors
      '--theme-header-bg': brandColors.headerBg || themeData.styles.primaryColor,
      '--theme-header-text': brandColors.headerText || '#FFFFFF',
      '--theme-footer-bg': brandColors.footerBg || themeData.styles.primaryColor,
      '--theme-footer-text': brandColors.footerText || '#FFFFFF',
      '--theme-site-bg': brandColors.siteBg || themeData.styles.secondaryColor,
      '--theme-site-text': brandColors.siteText || themeData.styles.textColor,
      
      // Typography
      '--theme-font-family': themeData.styles.fontFamily,
      '--theme-heading-font': themeData.styles.headingFont,
      
      // Layout properties
      '--theme-border-radius': themeData.styles.borderRadius,
      '--theme-spacing': getSpacingValue(themeData.styles.spacing),
      
      // Component styles
      '--theme-card-style': themeData.styles.cardStyle,
      '--theme-button-style': themeData.styles.buttonStyle,
      '--theme-header-style': themeData.styles.headerStyle,
      '--theme-navigation-style': themeData.styles.navigationStyle,
      
      // Shadows
      '--theme-shadow-sm': getShadowValue(themeData.styles.shadows, 'sm'),
      '--theme-shadow-md': getShadowValue(themeData.styles.shadows, 'md'),
      '--theme-shadow-lg': getShadowValue(themeData.styles.shadows, 'lg'),
      '--theme-shadow-xl': getShadowValue(themeData.styles.shadows, 'xl'),
    };

    // Apply all CSS variables
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply theme-specific body classes
    document.body.className = document.body.className.replace(/theme-\w+|page-\w+/g, '');
    document.body.classList.add(`theme-${themeData.id}`, `page-${pageType}`);

    // Inject theme-specific CSS
    injectThemeCSS(themeData, pageType);
    
    console.log(`🎨 Theme applied: ${themeData.name} for ${pageType} page`);
  };

  const getSpacingValue = (spacing: string): string => {
    const spacingMap: Record<string, string> = {
      'compact': '0.5rem',
      'comfortable': '1rem',
      'spacious': '1.5rem',
      'zen': '2rem'
    };
    return spacingMap[spacing] || '1rem';
  };

  const getShadowValue = (shadowType: string, size: string): string => {
    const shadowMaps: Record<string, Record<string, string>> = {
      'modern': {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      'soft': {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.12)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg': '0 5px 15px rgba(0, 0, 0, 0.08)',
        'xl': '0 15px 35px rgba(0, 0, 0, 0.1)'
      },
      'zen': {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'xl': '0 16px 32px rgba(0, 0, 0, 0.12)'
      }
    };
    return shadowMaps[shadowType]?.[size] || shadowMaps['modern'][size];
  };

  const injectThemeCSS = (themeData: BlogTheme, pageType: string) => {
    // Remove existing theme CSS
    const existingStyle = document.getElementById('dynamic-theme-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new theme CSS
    const style = document.createElement('style');
    style.id = 'dynamic-theme-css';
    style.textContent = generateThemeCSS(themeData, pageType);
    document.head.appendChild(style);
  };

  const generateThemeCSS = (theme: BlogTheme, pageType: string): string => {
    return `
      /* Universal Theme CSS for ${theme.name} - ${pageType} page */
      .theme-${theme.id} {
        font-family: var(--theme-font-family);
        color: var(--theme-text);
        background-color: var(--theme-site-bg);
      }

      .theme-${theme.id} h1, 
      .theme-${theme.id} h2, 
      .theme-${theme.id} h3, 
      .theme-${theme.id} h4, 
      .theme-${theme.id} h5, 
      .theme-${theme.id} h6 {
        font-family: var(--theme-heading-font);
      }

      .theme-${theme.id} .theme-header {
        background-color: var(--theme-header-bg);
        color: var(--theme-header-text);
      }

      .theme-${theme.id} .theme-footer {
        background-color: var(--theme-footer-bg);
        color: var(--theme-footer-text);
      }

      .theme-${theme.id} .theme-card {
        border-radius: var(--theme-border-radius);
        box-shadow: var(--theme-shadow-md);
        padding: var(--theme-spacing);
      }

      .theme-${theme.id} .theme-button {
        border-radius: var(--theme-border-radius);
        background-color: var(--theme-primary);
        color: white;
        padding: calc(var(--theme-spacing) * 0.5) var(--theme-spacing);
      }

      .theme-${theme.id} .theme-button:hover {
        background-color: var(--theme-accent);
      }

      /* Page-specific styles */
      .theme-${theme.id}.page-${pageType} {
        /* Add page-specific overrides here */
      }
    `;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!blog || !theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600">The requested blog could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`universal-theme-wrapper theme-${theme.id} page-${pageType} ${className}`}>
      {children}
    </div>
  );
};

export default UniversalPageThemeWrapper;

import React, { useEffect, useState } from 'react';
import { BlogTheme, Blog } from '../../types/blog';
import enhancedSDK from '../../lib/enhanced-sdk';

interface UniversalThemeWrapperProps {
  blogSlug: string;
  children: React.ReactNode;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  className?: string;
}

export const UniversalThemeWrapper: React.FC<UniversalThemeWrapperProps> = ({
  blogSlug,
  children,
  pageType,
  className = ''
}) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [theme, setTheme] = useState<BlogTheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogAndTheme = async () => {
      try {
        // Get blog data
        const blogs = await enhancedSDK.get<Blog>('blogs');
        const foundBlog = blogs.find(b => b.slug === blogSlug);
        
        if (foundBlog) {
          setBlog(foundBlog);
          
          // Get theme data
          const themes = await enhancedSDK.get<BlogTheme>('themes');
          const foundTheme = themes.find(t => t.id === foundBlog.theme);
          
          if (foundTheme) {
            setTheme(foundTheme);
            applyThemeStyles(foundTheme, foundBlog);
          }
        }
      } catch (error) {
        console.error('Error loading blog and theme:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogAndTheme();

    // Subscribe to real-time updates
    const unsubscribeBlog = enhancedSDK.subscribe('blogs', (data) => {
      if (data.type === 'update' || data.type === 'refresh') {
        const updatedBlog = Array.isArray(data.data) 
          ? data.data.find((b: Blog) => b.slug === blogSlug)
          : data.data.slug === blogSlug ? data.data : null;
        
        if (updatedBlog) {
          setBlog(updatedBlog);
          // Reload theme if theme changed
          if (updatedBlog.theme !== blog?.theme) {
            loadBlogAndTheme();
          }
        }
      }
    });

    const unsubscribeThemes = enhancedSDK.subscribe('themes', (data) => {
      if (data.type === 'update' || data.type === 'refresh') {
        const updatedTheme = Array.isArray(data.data)
          ? data.data.find((t: BlogTheme) => t.id === blog?.theme)
          : data.data.id === blog?.theme ? data.data : null;
        
        if (updatedTheme) {
          setTheme(updatedTheme);
          applyThemeStyles(updatedTheme, blog);
        }
      }
    });

    return () => {
      unsubscribeBlog();
      unsubscribeThemes();
    };
  }, [blogSlug]);

  const applyThemeStyles = (themeData: BlogTheme, blogData: Blog | null) => {
    if (!themeData || !blogData) return;

    const root = document.documentElement;
    
    // Apply brand colors if available, otherwise use theme defaults
    const brandColors = blogData.brandColors || {};
    
    // Set CSS custom properties for the theme
    root.style.setProperty('--theme-primary', brandColors.primary || themeData.styles.primaryColor);
    root.style.setProperty('--theme-secondary', brandColors.secondary || themeData.styles.secondaryColor);
    root.style.setProperty('--theme-accent', brandColors.accent || themeData.styles.accentColor);
    root.style.setProperty('--theme-text', themeData.styles.textColor);
    root.style.setProperty('--theme-background', themeData.styles.backgroundColor);
    root.style.setProperty('--theme-font-family', themeData.styles.fontFamily);
    root.style.setProperty('--theme-heading-font', themeData.styles.headingFont);
    root.style.setProperty('--theme-border-radius', themeData.styles.borderRadius);
    
    // Generate complementary colors
    root.style.setProperty('--theme-primary-light', lightenColor(brandColors.primary || themeData.styles.primaryColor, 20));
    root.style.setProperty('--theme-primary-dark', darkenColor(brandColors.primary || themeData.styles.primaryColor, 20));
    root.style.setProperty('--theme-secondary-light', lightenColor(brandColors.secondary || themeData.styles.secondaryColor, 20));
    root.style.setProperty('--theme-accent-light', lightenColor(brandColors.accent || themeData.styles.accentColor, 20));
    
    // Layout and spacing
    root.style.setProperty('--theme-spacing', themeData.styles.spacing === 'comfortable' ? '1.5rem' : themeData.styles.spacing === 'relaxed' ? '2rem' : '1rem');
    
    // Shadows
    const shadowLevel = themeData.styles.shadows || 'modern';
    root.style.setProperty('--theme-shadow-sm', getShadow(shadowLevel, 'sm'));
    root.style.setProperty('--theme-shadow-md', getShadow(shadowLevel, 'md'));
    root.style.setProperty('--theme-shadow-lg', getShadow(shadowLevel, 'lg'));
    
    // Apply theme-specific body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${themeData.id}`, `page-${pageType}`);
  };

  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const darkenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  };

  const getShadow = (level: string, size: string): string => {
    const shadows = {
      none: { sm: 'none', md: 'none', lg: 'none' },
      subtle: { 
        sm: '0 1px 2px rgba(0,0,0,0.1)', 
        md: '0 2px 4px rgba(0,0,0,0.1)', 
        lg: '0 4px 8px rgba(0,0,0,0.1)' 
      },
      modern: { 
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', 
        md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)', 
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)' 
      }
    };
    return shadows[level as keyof typeof shadows]?.[size as keyof typeof shadows.none] || shadows.modern[size as keyof typeof shadows.modern];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog || !theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600">The requested blog could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`universal-theme-wrapper theme-${theme.id} page-${pageType} ${className}`}
      style={{
        fontFamily: 'var(--theme-font-family)',
        color: 'var(--theme-text)',
        backgroundColor: 'var(--theme-background)',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  );
};

export default UniversalThemeWrapper;

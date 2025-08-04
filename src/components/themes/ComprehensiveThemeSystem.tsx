import React, { useEffect, useState } from 'react';
import { BlogTheme, Blog } from '../../types/blog';
import enhancedSDK from '../../lib/enhanced-sdk';

interface ComprehensiveThemeSystemProps {
  blogSlug: string;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  children: React.ReactNode;
}

export const ComprehensiveThemeSystem: React.FC<ComprehensiveThemeSystemProps> = ({
  blogSlug,
  pageType,
  children
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

    const unsubscribeThemes = enhancedSDK.subscribe('themes', (data) => {
      if (data.type === 'refresh' || data.type === 'update') {
        const themes = Array.isArray(data.data) ? data.data : [data.data];
        const updatedTheme = themes.find((t: BlogTheme) => t.id === blog?.theme);
        if (updatedTheme) {
          setTheme(updatedTheme);
          applyThemeStyles(updatedTheme, blog);
        }
      }
    });

    // Listen for custom theme update events
    const handleThemeUpdate = () => {
      loadBlogAndTheme();
    };

    window.addEventListener('theme-updated', handleThemeUpdate);
    window.addEventListener('blogs-updated', handleThemeUpdate);

    return () => {
      unsubscribeBlog();
      unsubscribeThemes();
      window.removeEventListener('theme-updated', handleThemeUpdate);
      window.removeEventListener('blogs-updated', handleThemeUpdate);
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
      const themes = await enhancedSDK.get<BlogTheme>('themes');
      const foundTheme = themes.find(t => t.id === themeId);
      
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
    const brandColors = blogData.brandColors || {};
    
    // Apply comprehensive theme variables
    const themeVars = {
      // Brand colors (priority over theme defaults)
      '--theme-primary': brandColors.primary || themeData.styles.primaryColor,
      '--theme-secondary': brandColors.secondary || themeData.styles.secondaryColor,
      '--theme-accent': brandColors.accent || themeData.styles.accentColor,
      
      // Extended brand colors
      '--theme-header-bg': brandColors.headerBg || '#FFFFFF',
      '--theme-header-text': brandColors.headerText || themeData.styles.textColor,
      '--theme-footer-bg': brandColors.footerBg || themeData.styles.primaryColor,
      '--theme-footer-text': brandColors.footerText || '#FFFFFF',
      '--theme-site-bg': brandColors.siteBg || themeData.styles.backgroundColor,
      '--theme-site-text': brandColors.siteText || themeData.styles.textColor,
      
      // Typography
      '--theme-font-family': themeData.styles.fontFamily,
      '--theme-heading-font': themeData.styles.headingFont,
      '--theme-text-color': themeData.styles.textColor,
      '--theme-bg-color': themeData.styles.backgroundColor,
      
      // Layout
      '--theme-border-radius': themeData.styles.borderRadius,
      '--theme-spacing': getSpacingValue(themeData.styles.spacing),
      
      // Shadows
      '--theme-shadow-sm': getShadowValue(themeData.styles.shadows, 'sm'),
      '--theme-shadow-md': getShadowValue(themeData.styles.shadows, 'md'),
      '--theme-shadow-lg': getShadowValue(themeData.styles.shadows, 'lg'),
      
      // Generated colors
      '--theme-primary-light': lightenColor(brandColors.primary || themeData.styles.primaryColor, 20),
      '--theme-primary-dark': darkenColor(brandColors.primary || themeData.styles.primaryColor, 20),
      '--theme-secondary-light': lightenColor(brandColors.secondary || themeData.styles.secondaryColor, 20),
      '--theme-accent-light': lightenColor(brandColors.accent || themeData.styles.accentColor, 20)
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

  const injectThemeCSS = (themeData: BlogTheme, currentPageType: string) => {
    // Remove existing theme CSS
    const existingStyle = document.getElementById('dynamic-theme-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new theme CSS
    const style = document.createElement('style');
    style.id = 'dynamic-theme-css';
    style.textContent = generateThemeCSS(themeData, currentPageType);
    document.head.appendChild(style);
  };

  const generateThemeCSS = (themeData: BlogTheme, currentPageType: string) => {
    return `
      /* Theme: ${themeData.name} - Page: ${currentPageType} */
      .theme-${themeData.id} {
        font-family: var(--theme-font-family);
        color: var(--theme-site-text);
        background-color: var(--theme-site-bg);
      }

      .theme-${themeData.id} .theme-header {
        background-color: var(--theme-header-bg);
        color: var(--theme-header-text);
        box-shadow: var(--theme-shadow-md);
      }

      .theme-${themeData.id} .theme-footer {
        background-color: var(--theme-footer-bg);
        color: var(--theme-footer-text);
      }

      .theme-${themeData.id} .theme-content {
        background-color: var(--theme-site-bg);
        color: var(--theme-site-text);
      }

      .theme-${themeData.id} .theme-card {
        background: white;
        border-radius: var(--theme-border-radius);
        box-shadow: var(--theme-shadow-md);
        padding: var(--theme-spacing);
        margin-bottom: var(--theme-spacing);
      }

      .theme-${themeData.id} .theme-button {
        background: var(--theme-primary);
        color: white;
        border: none;
        border-radius: var(--theme-border-radius);
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .theme-${themeData.id} .theme-button:hover {
        background: var(--theme-primary-dark);
        transform: translateY(-1px);
      }

      .theme-${themeData.id} h1,
      .theme-${themeData.id} h2,
      .theme-${themeData.id} h3,
      .theme-${themeData.id} h4,
      .theme-${themeData.id} h5,
      .theme-${themeData.id} h6 {
        font-family: var(--theme-heading-font);
        color: var(--theme-primary);
      }

      .theme-${themeData.id} a {
        color: var(--theme-primary);
        text-decoration: none;
      }

      .theme-${themeData.id} a:hover {
        color: var(--theme-primary-dark);
        text-decoration: underline;
      }

      /* Page-specific styles */
      .theme-${themeData.id}.page-${currentPageType} .page-content {
        ${getPageSpecificCSS(themeData, currentPageType)}
      }
    `;
  };

  const getPageSpecificCSS = (themeData: BlogTheme, currentPageType: string) => {
    switch (currentPageType) {
      case 'post':
        return `
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.8;
        `;
      case 'archive':
        return `
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem;
        `;
      case 'about':
      case 'contact':
        return `
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        `;
      default:
        return `
          padding: 1rem;
        `;
    }
  };

  // Helper functions
  const getSpacingValue = (spacing: string) => {
    switch (spacing) {
      case 'compact': return '1rem';
      case 'comfortable': return '1.5rem';
      case 'relaxed': return '2rem';
      default: return '1.5rem';
    }
  };

  const getShadowValue = (shadowType: string, size: string) => {
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
    return shadows[shadowType as keyof typeof shadows]?.[size as keyof typeof shadows.none] || shadows.modern[size as keyof typeof shadows.modern];
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`comprehensive-theme-system theme-${theme?.id} page-${pageType}`}>
      {children}
    </div>
  );
};

export default ComprehensiveThemeSystem;

import React, { useEffect } from 'react';
import { BlogTheme, Blog } from '../../types/blog';
import { ThemeFooter } from './ThemeFooter';

interface UniversalThemeWrapperProps {
  blog: Blog;
  theme: BlogTheme;
  children: React.ReactNode;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  className?: string;
  isDarkMode?: boolean;
}

export const UniversalThemeWrapper: React.FC<UniversalThemeWrapperProps> = ({
  blog,
  theme,
  children,
  pageType,
  className = '',
  isDarkMode = false
}) => {
  useEffect(() => {
    if (blog && theme) {
      applyThemeStyles(theme, blog);
    }
  }, [blog, theme, pageType]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const applyThemeStyles = (themeData: BlogTheme, blogData: Blog) => {
    if (!themeData || !blogData) return;

    const root = document.documentElement;
    
    // Apply brand colors if available, otherwise use theme defaults
    const brandColors = blogData.customization?.brandColors;
    
    // Set CSS custom properties for the theme
    root.style.setProperty('--theme-primary', brandColors?.primary || themeData.styles.primaryColor);
    root.style.setProperty('--theme-secondary', brandColors?.secondary || themeData.styles.secondaryColor);
    root.style.setProperty('--theme-accent', brandColors?.accent || themeData.styles.accentColor);
    root.style.setProperty('--theme-text', themeData.styles.textColor);
    root.style.setProperty('--theme-background', themeData.styles.backgroundColor);
    root.style.setProperty('--theme-font-family', themeData.styles.fontFamily);
    root.style.setProperty('--theme-heading-font', themeData.styles.headingFont);
    root.style.setProperty('--theme-border-radius', themeData.styles.borderRadius);
    
    // Generate complementary colors
    root.style.setProperty('--theme-primary-light', lightenColor(brandColors?.primary || themeData.styles.primaryColor, 20));
    root.style.setProperty('--theme-primary-dark', darkenColor(brandColors?.primary || themeData.styles.primaryColor, 20));
    root.style.setProperty('--theme-secondary-light', lightenColor(brandColors?.secondary || themeData.styles.secondaryColor, 20));
    root.style.setProperty('--theme-accent-light', lightenColor(brandColors?.accent || themeData.styles.accentColor, 20));
    
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
    if (!color) return '';
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
    if (!color) return '';
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
      <ThemeFooter blog={blog} />
    </div>
  );
};

export default UniversalThemeWrapper;

import React from 'react';
import { Blog, BlogTheme } from '../../../types/blog';
import { ThemeHeader } from './ThemeHeader';
import { ThemeFooter } from './ThemeFooter';

interface UniversalPageLayoutProps {
  blog: Blog;
  theme: BlogTheme;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  children: React.ReactNode;
  className?: string;
}

export const UniversalPageLayout: React.FC<UniversalPageLayoutProps> = ({
  blog,
  theme,
  pageType,
  children,
  className = ''
}) => {
  const brandColors = blog.customization?.brandColors || {};
  const fonts = blog.customization?.fonts || {};
  const darkMode = blog.customization?.darkMode || {};

  const pageStyles = {
    fontFamily: fonts.primaryFont || theme.styles.fontFamily,
    backgroundColor: brandColors.siteBg || theme.styles.secondaryColor,
    color: brandColors.siteText || theme.styles.textColor,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const getPageSpecificClasses = () => {
    const baseClasses = `universal-page-layout theme-${theme.id} page-${pageType}`;
    
    switch (pageType) {
      case 'post':
        return `${baseClasses} post-layout`;
      case 'archive':
        return `${baseClasses} archive-layout`;
      case 'about':
        return `${baseClasses} about-layout`;
      case 'contact':
        return `${baseClasses} contact-layout`;
      case 'home':
        return `${baseClasses} home-layout`;
      default:
        return `${baseClasses} default-layout`;
    }
  };

  return (
    <div className={`${getPageSpecificClasses()} ${className}`} style={pageStyles}>
      <ThemeHeader blog={blog} theme={theme} pageType={pageType} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <ThemeFooter blog={blog} theme={theme} pageType={pageType} />
    </div>
  );
};

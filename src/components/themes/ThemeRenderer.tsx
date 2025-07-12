import React from 'react';
import { Blog, Post } from '../../types/blog';
import { HashNodeTheme } from './HashNodeTheme';
import { MediumTheme } from './MediumTheme';
import { ModernMinimalTheme } from './ModernMinimalTheme';
import { MagazineTheme } from './MagazineTheme';
import { CreativePortfolioTheme } from './CreativePortfolioTheme';

interface ThemeRendererProps {
  blog: Blog;
  posts: Post[];
  onPostClick: (post: Post) => void;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ThemeRenderer: React.FC<ThemeRendererProps> = ({
  blog,
  posts,
  onPostClick,
  customColors
}) => {
  // Filter posts based on homepage settings
  const homepageSettings = blog.customization?.homepageSettings;
  
  const featuredPosts = homepageSettings?.showFeaturedPosts !== false ? posts.slice(0, 3) : [];
  const recentPosts = homepageSettings?.showRecentPosts !== false ? posts.slice(0, 10) : [];
  const mostViewedPosts = homepageSettings?.showTrending !== false ? posts.slice(0, 5) : [];
  const categories = homepageSettings?.showCategories !== false ? [] : []; // Will be populated from actual categories

  const themeProps = {
    blog,
    posts,
    onPostClick,
    featuredPosts,
    recentPosts,
    mostViewedPosts,
    categories,
    customColors
  };

  switch (blog.theme) {
    case 'hashnode':
      return <HashNodeTheme {...themeProps} />;
    case 'medium':
      return <MediumTheme {...themeProps} />;
    case 'magazine':
      return <MagazineTheme {...themeProps} />;
    case 'creative-portfolio':
      return <CreativePortfolioTheme {...themeProps} />;
    case 'modern':
    default:
      return <ModernMinimalTheme {...themeProps} />;
  }
};
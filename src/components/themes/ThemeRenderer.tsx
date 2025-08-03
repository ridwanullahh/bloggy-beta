import React from 'react';
import { Blog, Post } from '../../types/blog';
import { getThemeById } from '../../constants/themes';
import { HashNodeModernTheme } from './HashNodeModernTheme';
import { MediumInspiredTheme } from './MediumInspiredTheme';
import { NotionBlocksTheme } from './NotionBlocksTheme';
import { GhostPublicationTheme } from './GhostPublicationTheme';
import { UniversalTheme } from './UniversalTheme';

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

  // Get theme configuration
  const themeConfig = getThemeById(blog.theme);

  if (!themeConfig) {
    // Fallback to default theme if theme not found
    const defaultTheme = getThemeById('hashnode-modern');
    return (
      <UniversalTheme
        {...themeProps}
        themeConfig={defaultTheme!}
      />
    );
  }

  // Handle specific custom themes that need special components
  switch (blog.theme) {
    case 'hashnode-modern':
      return <HashNodeModernTheme {...themeProps} />;
    case 'medium-inspired':
      return <MediumInspiredTheme {...themeProps} />;
    case 'notion-blocks':
      return <NotionBlocksTheme {...themeProps} />;
    case 'ghost-publication':
      return <GhostPublicationTheme {...themeProps} />;
    default:
      // Use universal theme for all other themes
      return (
        <UniversalTheme
          {...themeProps}
          themeConfig={themeConfig}
        />
      );
  }
};
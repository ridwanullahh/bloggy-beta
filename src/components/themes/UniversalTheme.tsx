import React from 'react';
import { Blog, Post, BlogTheme } from '../../types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Tag, Heart, MessageCircle, Share2, BookOpen, TrendingUp, Clock, Star, ArrowRight } from 'lucide-react';

interface UniversalThemeProps {
  blog: Blog;
  posts: Post[];
  onPostClick: (post: Post) => void;
  featuredPosts: Post[];
  recentPosts: Post[];
  mostViewedPosts: Post[];
  categories: any[];
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  themeConfig: BlogTheme;
}

export const UniversalTheme: React.FC<UniversalThemeProps> = ({
  blog,
  posts,
  onPostClick,
  featuredPosts,
  recentPosts,
  mostViewedPosts,
  categories,
  customColors,
  themeConfig
}) => {
  const colors = customColors || blog.customization?.brandColors || {
    primary: themeConfig.styles.primaryColor,
    secondary: themeConfig.styles.secondaryColor,
    accent: themeConfig.styles.accentColor
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  const homepageSettings = blog.customization?.homepageSettings;

  // Helper functions for enhanced styling
  const getHeroBackground = () => {
    if (themeConfig.id.includes('cyberpunk') || themeConfig.id.includes('neon')) {
      return `linear-gradient(135deg, ${colors.primary} 0%, #000000 50%, ${colors.accent} 100%)`;
    } else if (themeConfig.id.includes('glassmorphism')) {
      return `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.accent}60 100%)`;
    } else if (themeConfig.id.includes('cosmic') || themeConfig.id.includes('galaxy')) {
      return `radial-gradient(ellipse at center, ${colors.primary} 0%, #000000 70%, ${colors.accent} 100%)`;
    } else if (themeConfig.id.includes('aurora')) {
      return `linear-gradient(45deg, ${colors.primary} 0%, ${colors.accent} 25%, #00ff88 50%, ${colors.primary} 75%, ${colors.accent} 100%)`;
    }
    return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`;
  };

  const getHeroTextColor = () => {
    if (themeConfig.id.includes('dark') || themeConfig.id.includes('cyberpunk') || themeConfig.id.includes('matrix')) {
      return colors.accent;
    }
    return 'white';
  };

  const getHeroTitleGradient = () => {
    if (themeConfig.id.includes('holographic') || themeConfig.id.includes('aurora')) {
      return `linear-gradient(45deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`;
    } else if (themeConfig.id.includes('neon')) {
      return `linear-gradient(45deg, ${colors.accent}, #ffffff, ${colors.accent})`;
    }
    return `linear-gradient(45deg, white, rgba(255,255,255,0.8))`;
  };

  const getHeroBackgroundEffects = () => {
    if (themeConfig.id.includes('glassmorphism')) {
      return (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      );
    } else if (themeConfig.id.includes('cosmic') || themeConfig.id.includes('galaxy')) {
      return (
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getHeroPrimaryButtonClass = () => {
    if (themeConfig.id.includes('cyberpunk') || themeConfig.id.includes('neon')) {
      return `bg-${colors.accent} text-black hover:bg-${colors.accent}/80 px-8 py-3 rounded-none font-bold border-2 border-${colors.accent}`;
    } else if (themeConfig.id.includes('glassmorphism')) {
      return 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-3 rounded-full font-semibold border border-white/30';
    }
    return 'bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold';
  };

  const getHeroSecondaryButtonClass = () => {
    if (themeConfig.id.includes('cyberpunk') || themeConfig.id.includes('neon')) {
      return `border-2 border-${colors.accent} text-${colors.accent} hover:bg-${colors.accent}/10 px-8 py-3 rounded-none font-bold`;
    } else if (themeConfig.id.includes('glassmorphism')) {
      return 'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full font-semibold';
    }
    return 'border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold';
  };

  // Dynamic styling based on theme configuration
  const getLayoutClass = () => {
    switch (themeConfig.styles.layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'magazine':
        return 'space-y-8';
      case 'list':
        return 'space-y-4';
      default:
        return 'space-y-6';
    }
  };

  const getCardClass = () => {
    let baseClass = 'transition-all duration-300 hover:shadow-lg cursor-pointer';

    // Border radius
    if (themeConfig.styles.borderRadius === '0px') {
      baseClass += ' rounded-none';
    } else if (themeConfig.styles.borderRadius === '24px') {
      baseClass += ' rounded-3xl';
    } else if (themeConfig.styles.borderRadius === '20px') {
      baseClass += ' rounded-2xl';
    } else if (themeConfig.styles.borderRadius === '16px') {
      baseClass += ' rounded-xl';
    } else if (themeConfig.styles.borderRadius === '12px') {
      baseClass += ' rounded-lg';
    } else {
      baseClass += ' rounded-md';
    }

    // Advanced shadows and effects based on theme style
    if (themeConfig.styles.shadows === 'none') {
      baseClass += ' border shadow-none';
    } else if (themeConfig.styles.shadows === 'dramatic') {
      baseClass += ' shadow-2xl border-0';
    } else if (themeConfig.styles.shadows === 'glassmorphism') {
      baseClass += ' backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl';
    } else if (themeConfig.styles.shadows === 'neumorphism') {
      baseClass += ' shadow-neumorphism border-0';
    } else if (themeConfig.styles.shadows === 'neon') {
      baseClass += ` shadow-lg shadow-${colors.accent}/50 border border-${colors.accent}/30`;
    } else if (themeConfig.styles.shadows === 'cyberpunk') {
      baseClass += ` shadow-lg shadow-${colors.accent}/40 border-2 border-${colors.accent}/60`;
    } else if (themeConfig.styles.shadows === 'holographic') {
      baseClass += ' shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20';
    } else {
      baseClass += ' shadow-md border-0';
    }

    return baseClass;
  };

  const getSpacingClass = () => {
    switch (themeConfig.styles.spacing) {
      case 'tight':
        return 'space-y-2';
      case 'comfortable':
        return 'space-y-6';
      case 'relaxed':
        return 'space-y-8';
      default:
        return 'space-y-4';
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: colors.secondary,
        fontFamily: themeConfig.styles.fontFamily,
        color: themeConfig.styles.textColor
      }}
    >
      {/* Enhanced Hero Section */}
      {homepageSettings?.heroStyle !== 'minimal' && (
        <div
          className="relative py-20 px-4 overflow-hidden"
          style={{
            background: getHeroBackground(),
            color: getHeroTextColor()
          }}
        >
          {/* Theme-specific background effects */}
          {getHeroBackgroundEffects()}

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Theme badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{themeConfig.name}</span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{
                fontFamily: themeConfig.styles.headingFont,
                background: getHeroTitleGradient(),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {blog.title}
            </h1>

            {blog.description && (
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
                {blog.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className={getHeroPrimaryButtonClass()}
              >
                Explore Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={getHeroSecondaryButtonClass()}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Posts Section */}
        {homepageSettings?.showFeaturedPosts !== false && featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <Star className="w-6 h-6 mr-3" style={{ color: colors.primary }} />
              <h2 
                className="text-3xl font-bold"
                style={{ 
                  color: colors.primary,
                  fontFamily: themeConfig.styles.headingFont
                }}
              >
                Featured Posts
              </h2>
            </div>
            <div className={getLayoutClass()}>
              {featuredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className={`group ${getCardClass()}`}
                  onClick={() => onPostClick(post)}
                  style={{ backgroundColor: 'white' }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="secondary" 
                        style={{ 
                          backgroundColor: `${colors.accent}20`,
                          color: colors.accent,
                          border: `1px solid ${colors.accent}30`
                        }}
                      >
                        Featured
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                    </div>
                    <CardTitle 
                      className="text-xl group-hover:opacity-80 transition-opacity line-clamp-2"
                      style={{ fontFamily: themeConfig.styles.headingFont }}
                    >
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || truncateContent(post.content)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>24</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>8</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        style={{ color: colors.primary }}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs"
                            style={{ 
                              borderColor: `${colors.primary}30`,
                              color: colors.primary
                            }}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Posts */}
            {homepageSettings?.showRecentPosts !== false && recentPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center mb-8">
                  <Clock className="w-6 h-6 mr-3" style={{ color: colors.primary }} />
                  <h2 
                    className="text-3xl font-bold"
                    style={{ 
                      color: colors.primary,
                      fontFamily: themeConfig.styles.headingFont
                    }}
                  >
                    Recent Posts
                  </h2>
                </div>
                <div className={getSpacingClass()}>
                  {recentPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className={`group ${getCardClass()}`}
                      onClick={() => onPostClick(post)}
                      style={{ backgroundColor: 'white' }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <h3 
                              className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2"
                              style={{ fontFamily: themeConfig.styles.headingFont }}
                            >
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {post.excerpt || truncateContent(post.content)}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(post.publishedAt || post.createdAt)}
                                </div>
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  Author
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Heart className="w-4 h-4 mr-1" />
                                  <span>12</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  <span>5</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {post.tags.slice(0, 4).map((tag, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="text-xs"
                                    style={{ 
                                      borderColor: `${colors.primary}30`,
                                      color: colors.primary
                                    }}
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Posts */}
            {homepageSettings?.showTrending !== false && mostViewedPosts.length > 0 && (
              <Card className={getCardClass()} style={{ backgroundColor: 'white' }}>
                <CardHeader>
                  <CardTitle 
                    className="flex items-center"
                    style={{ 
                      color: colors.primary,
                      fontFamily: themeConfig.styles.headingFont
                    }}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mostViewedPosts.slice(0, 5).map((post, index) => (
                      <div 
                        key={post.id} 
                        className="flex items-start space-x-3 cursor-pointer group"
                        onClick={() => onPostClick(post)}
                      >
                        <div 
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium group-hover:opacity-80 transition-opacity line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(post.publishedAt || post.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Categories */}
            {homepageSettings?.showCategories !== false && (
              <Card className={getCardClass()} style={{ backgroundColor: 'white' }}>
                <CardHeader>
                  <CardTitle 
                    className="flex items-center"
                    style={{ 
                      color: colors.primary,
                      fontFamily: themeConfig.styles.headingFont
                    }}
                  >
                    <Tag className="w-5 h-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Programming', 'Web Development', 'AI/ML', 'DevOps', 'Mobile'].map((category) => (
                      <Badge 
                        key={category} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50 transition-colors"
                        style={{ 
                          borderColor: `${colors.primary}30`,
                          color: colors.primary
                        }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

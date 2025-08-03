import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Tag, Heart, MessageCircle, Share2, BookOpen, TrendingUp, Clock } from 'lucide-react';

interface HashNodeModernThemeProps {
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
}

export const HashNodeModernTheme: React.FC<HashNodeModernThemeProps> = ({
  blog,
  posts,
  onPostClick,
  featuredPosts,
  recentPosts,
  mostViewedPosts,
  categories,
  customColors
}) => {
  const colors = customColors || blog.customization?.brandColors || {
    primary: '#2563eb',
    secondary: '#f8fafc',
    accent: '#3b82f6'
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      {/* Modern Hero Section */}
      {homepageSettings?.heroStyle !== 'minimal' && (
        <div
          className="relative py-20 px-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            color: 'white'
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Developer Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
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
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
              >
                Start Reading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold"
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
              <BookOpen className="w-6 h-6 mr-3" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                Featured Posts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
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
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
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
                  <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                    Recent Posts
                  </h2>
                </div>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                      onClick={() => onPostClick(post)}
                      style={{ backgroundColor: 'white' }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
              <Card className="border-0 shadow-lg" style={{ backgroundColor: 'white' }}>
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: colors.primary }}>
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
                          <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
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
              <Card className="border-0 shadow-lg" style={{ backgroundColor: 'white' }}>
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: colors.primary }}>
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

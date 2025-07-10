import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Heart, Eye, ArrowUpRight } from 'lucide-react';

interface CreativePortfolioThemeProps {
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

export const CreativePortfolioTheme: React.FC<CreativePortfolioThemeProps> = ({
  blog,
  posts,
  onPostClick,
  featuredPosts,
  recentPosts,
  mostViewedPosts,
  categories,
  customColors
}) => {
  const colors = customColors || {
    primary: '#7c3aed',
    secondary: '#faf5ff',
    accent: '#f59e0b'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 140) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 opacity-90"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {blog.title}
          </h1>
          {blog.description && (
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {blog.description}
            </p>
          )}
          <div className="mt-8 inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Featured Work */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: colors.primary }}>
              Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card 
                  key={post.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => onPostClick(post)}
                  style={{ borderRadius: '20px' }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                        <div className="flex items-center space-x-2">
                          {post.tags?.slice(0, 2).map((tag, index) => (
                            <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {truncateContent(post.excerpt || post.content, 120)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            0
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Recent Projects */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: colors.primary }}>
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card 
                key={post.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onPostClick(post)}
                style={{ borderRadius: '20px' }}
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {post.tags?.slice(0, 1).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          style={{ borderColor: colors.accent, color: colors.accent }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {truncateContent(post.excerpt || post.content, 100)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories as Skills */}
        {categories.length > 0 && (
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-12" style={{ color: colors.primary }}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: 'white'
                  }}
                >
                  <span className="font-medium">{category.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Most Viewed as Portfolio Highlights */}
        {mostViewedPosts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: colors.primary }}>
              Portfolio Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mostViewedPosts.slice(0, 4).map((post, index) => (
                <div
                  key={post.id}
                  className="group cursor-pointer"
                  onClick={() => onPostClick(post)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-2xl font-bold">#{index + 1}</div>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
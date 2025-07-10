import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Tag, Lock, Heart, MessageCircle, Share2, BookOpen } from 'lucide-react';

interface HashNodeThemeProps {
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

export const HashNodeTheme: React.FC<HashNodeThemeProps> = ({
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="border-b" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4" style={{ color: colors.primary }}>
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {blog.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                    Featured Posts
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <Card 
                      key={post.id}
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md"
                      onClick={() => onPostClick(post)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg"></div>
                        <div className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            {post.tags?.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {truncateContent(post.excerpt || post.content)}
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
                                <MessageCircle className="w-4 h-4 mr-1" />
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

            {/* Recent Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  Recent Posts
                </h2>
              </div>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Card 
                    key={post.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
                    onClick={() => onPostClick(post)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            {post.tags?.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" style={{ borderColor: colors.accent, color: colors.accent }}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {truncateContent(post.excerpt || post.content, 200)}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(post.publishedAt || post.createdAt)}
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                5 min read
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                0
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            {categories.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle style={{ color: colors.primary }}>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary">0</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Most Viewed */}
            {mostViewedPosts.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle style={{ color: colors.primary }}>Trending</CardTitle>
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
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: colors.accent }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Newsletter Signup */}
            <Card className="border-0 shadow-md" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)` }}>
              <CardHeader>
                <CardTitle style={{ color: colors.primary }}>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest posts delivered right to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
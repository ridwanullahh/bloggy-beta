import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

interface ModernMinimalThemeProps {
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

export const ModernMinimalTheme: React.FC<ModernMinimalThemeProps> = ({
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
    primary: '#1f2937',
    secondary: '#f8fafc',
    accent: '#3b82f6'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 160) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-light mb-6" style={{ color: colors.primary }}>
            {blog.title}
          </h1>
          {blog.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              {blog.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-light mb-12" style={{ color: colors.primary }}>
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredPosts.slice(0, 2).map((post) => (
                <article 
                  key={post.id}
                  className="group cursor-pointer"
                  onClick={() => onPostClick(post)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-6"></div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {post.tags?.slice(0, 1).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-light group-hover:opacity-70 transition-opacity" style={{ color: colors.primary }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {truncateContent(post.excerpt || post.content, 200)}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12" style={{ color: colors.primary }}>
            Recent
          </h2>
          <div className="space-y-12">
            {recentPosts.map((post) => (
              <article 
                key={post.id}
                className="group cursor-pointer border-b border-gray-100 pb-12 last:border-b-0"
                onClick={() => onPostClick(post)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded"></div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2">
                      {post.tags?.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-light group-hover:opacity-70 transition-opacity" style={{ color: colors.primary }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {truncateContent(post.excerpt || post.content, 250)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                      <div className="flex items-center text-sm group-hover:text-blue-600 transition-colors" style={{ color: colors.accent }}>
                        <span className="mr-2">Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="text-center">
            <h2 className="text-3xl font-light mb-8" style={{ color: colors.primary }}>
              Explore Topics
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="px-6 py-2 text-sm font-normal hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
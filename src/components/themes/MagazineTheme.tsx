import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, User, Eye, MessageCircle } from 'lucide-react';

interface MagazineThemeProps {
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

export const MagazineTheme: React.FC<MagazineThemeProps> = ({
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
    primary: '#dc2626',
    secondary: '#fef2f2',
    accent: '#f59e0b'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="border-b-4" style={{ borderColor: colors.primary, backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2" style={{ color: colors.primary, fontFamily: 'serif' }}>
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-lg text-gray-700 italic">{blog.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="border-b-2 border-red-600 mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-red-600 text-white px-4 py-2 inline-block">
                BREAKING NEWS
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Story */}
              {featuredPosts.slice(0, 1).map((post) => (
                <div key={post.id} className="cursor-pointer group" onClick={() => onPostClick(post)}>
                  <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {post.tags?.slice(0, 1).map((tag, index) => (
                        <Badge 
                          key={index} 
                          className="text-white font-bold"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold leading-tight group-hover:text-red-600 transition-colors" style={{ fontFamily: 'serif' }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {truncateContent(post.excerpt || post.content, 200)}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Reporter
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Side Stories */}
              <div className="space-y-6">
                {featuredPosts.slice(1, 4).map((post) => (
                  <div key={post.id} className="flex gap-4 cursor-pointer group" onClick={() => onPostClick(post)}>
                    <div className="w-24 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm group-hover:text-red-600 transition-colors line-clamp-2" style={{ fontFamily: 'serif' }}>
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
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Recent Stories */}
            <section>
              <div className="border-b-2 border-red-600 mb-8">
                <h2 className="text-2xl font-bold mb-4 bg-red-600 text-white px-4 py-2 inline-block">
                  LATEST STORIES
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentPosts.map((post) => (
                  <article key={post.id} className="cursor-pointer group" onClick={() => onPostClick(post)}>
                    <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {post.tags?.slice(0, 1).map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="text-xs font-bold"
                            style={{ borderColor: colors.accent, color: colors.accent }}
                          >
                            {tag.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors" style={{ fontFamily: 'serif' }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {truncateContent(post.excerpt || post.content, 150)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            0
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <div className="bg-red-600 text-white px-4 py-2 mb-4">
                  <h3 className="font-bold">SECTIONS</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-gray-200 pb-2">
                      <a href="#" className="font-medium hover:text-red-600 transition-colors block py-1">
                        {category.name.toUpperCase()}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Most Read */}
            {mostViewedPosts.length > 0 && (
              <div>
                <div className="bg-red-600 text-white px-4 py-2 mb-4">
                  <h3 className="font-bold">MOST READ</h3>
                </div>
                <div className="space-y-4">
                  {mostViewedPosts.slice(0, 5).map((post, index) => (
                    <div key={post.id} className="flex gap-3 cursor-pointer group" onClick={() => onPostClick(post)}>
                      <div 
                        className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm group-hover:text-red-600 transition-colors line-clamp-2" style={{ fontFamily: 'serif' }}>
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
              </div>
            )}

            {/* Advertisement Placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500 font-medium">ADVERTISEMENT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
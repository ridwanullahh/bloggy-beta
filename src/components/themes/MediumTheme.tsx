import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Bookmark, MoreHorizontal, Share } from 'lucide-react';

interface MediumThemeProps {
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

export const MediumTheme: React.FC<MediumThemeProps> = ({
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
    primary: '#1a1a1a',
    secondary: '#ffffff',
    accent: '#1a8917'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
            {blog.title}
          </h1>
          {blog.description && (
            <p className="text-gray-600 mt-2">{blog.description}</p>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Story */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="border-b border-gray-200 pb-8">
              {featuredPosts.slice(0, 1).map((post) => (
                <div key={post.id} className="cursor-pointer group" onClick={() => onPostClick(post)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        {post.tags?.slice(0, 1).map((tag, index) => (
                          <Badge key={index} variant="outline" style={{ borderColor: colors.accent, color: colors.accent }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-4xl font-bold mb-4 group-hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>
                        {post.title}
                      </h2>
                      <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {truncateContent(post.excerpt || post.content, 300)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {blog.title}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </div>
                          <span>5 min read</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Stories */}
        <section>
          <div className="space-y-8">
            {recentPosts.map((post, index) => (
              <article key={post.id} className="group cursor-pointer" onClick={() => onPostClick(post)}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{blog.title}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {truncateContent(post.excerpt || post.content)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {post.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            <span className="text-sm text-gray-500">5 min read</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex-shrink-0"></div>
                    </div>
                  </div>
                </div>
                
                {index < recentPosts.length - 1 && (
                  <hr className="mt-8 border-gray-200" />
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Categories Strip */}
        {categories.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Topics:</span>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                  style={{ borderColor: colors.accent, color: colors.accent }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
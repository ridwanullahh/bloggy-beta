import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, FileText, Folder, Hash, Plus, MoreHorizontal } from 'lucide-react';

interface NotionBlocksThemeProps {
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

export const NotionBlocksTheme: React.FC<NotionBlocksThemeProps> = ({
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
    primary: '#2f3437',
    secondary: '#ffffff',
    accent: '#0f62fe'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  const homepageSettings = blog.customization?.homepageSettings;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              <h1 className="text-xl font-semibold" style={{ color: colors.primary }}>
                {blog.title}
              </h1>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Title Block */}
        <div className="mb-8">
          <div className="flex items-start space-x-2 mb-4">
            <div className="w-6 h-6 mt-1 text-gray-400">
              <Hash className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {blog.title}
              </h1>
              {blog.description && (
                <p className="text-gray-600 text-lg">
                  {blog.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Featured Posts Block */}
        {homepageSettings?.showFeaturedPosts !== false && featuredPosts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 text-gray-400">
                <Folder className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Featured Posts
              </h2>
            </div>
            <div className="pl-8 space-y-2">
              {featuredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="group flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  <div className="w-4 h-4 text-gray-400">
                    <FileText className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {post.title}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Featured
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>#{post.tags[0]}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts Block */}
        {homepageSettings?.showRecentPosts !== false && recentPosts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 text-gray-400">
                <Folder className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Recent Posts
              </h2>
            </div>
            <div className="pl-8 space-y-1">
              {recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="group flex items-start space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  <div className="w-4 h-4 mt-0.5 text-gray-400">
                    <FileText className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {post.excerpt || truncateContent(post.content)}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Author</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Hash className="w-3 h-3" />
                          <span>{post.tags[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Block */}
        {homepageSettings?.showCategories !== false && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 text-gray-400">
                <Folder className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Categories
              </h2>
            </div>
            <div className="pl-8 space-y-1">
              {['Technology', 'Programming', 'Web Development', 'Design', 'AI/ML', 'DevOps'].map((category) => (
                <div 
                  key={category}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="w-4 h-4 text-gray-400">
                    <Hash className="w-3 h-3" />
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Block */}
        {homepageSettings?.showTrending !== false && mostViewedPosts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 text-gray-400">
                <Folder className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Trending
              </h2>
            </div>
            <div className="pl-8 space-y-1">
              {mostViewedPosts.slice(0, 5).map((post, index) => (
                <div 
                  key={post.id}
                  className="group flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  <div className="w-4 h-4 text-gray-400">
                    <FileText className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {post.title}
                      </span>
                      <Badge 
                        variant="outline" 
                        className="text-xs border-orange-200 text-orange-700"
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Block */}
        <div className="mt-12">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            <span>Add a block</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

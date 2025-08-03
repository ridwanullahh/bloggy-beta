import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Bookmark, MoreHorizontal, Share, Clock, Star } from 'lucide-react';

interface MediumInspiredThemeProps {
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

export const MediumInspiredTheme: React.FC<MediumInspiredThemeProps> = ({
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

  const homepageSettings = blog.customization?.homepageSettings;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.primary }}>
            {blog.title}
          </h1>
          {blog.description && (
            <p className="text-xl text-gray-600 max-w-2xl">
              {blog.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Story */}
        {homepageSettings?.showFeaturedPosts !== false && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="border-b border-gray-200 pb-8 mb-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 mr-2" style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.accent }}>
                  FEATURED STORY
                </span>
              </div>
              <div 
                className="cursor-pointer group"
                onClick={() => onPostClick(featuredPosts[0])}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-700 transition-colors leading-tight">
                  {featuredPosts[0].title}
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {featuredPosts[0].excerpt || truncateContent(featuredPosts[0].content, 300)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>Author</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(featuredPosts[0].publishedAt || featuredPosts[0].createdAt)}
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
            </div>
          </section>
        )}

        {/* Recent Stories */}
        {homepageSettings?.showRecentPosts !== false && recentPosts.length > 0 && (
          <section className="mb-16">
            <div className="space-y-8">
              {recentPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="group cursor-pointer border-b border-gray-100 pb-8 last:border-b-0"
                  onClick={() => onPostClick(post)}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-600">Author</span>
                        <span className="text-sm text-gray-400">·</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-gray-700 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt || truncateContent(post.content)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {post.tags && post.tags.length > 0 && (
                            <Badge 
                              variant="secondary" 
                              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              {post.tags[0]}
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">4 min read</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Placeholder for article image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded flex-shrink-0"></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Trending Section */}
        {homepageSettings?.showTrending !== false && mostViewedPosts.length > 0 && (
          <section className="mb-16">
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 mr-2" style={{ backgroundColor: colors.accent }}></div>
                <h2 className="text-lg font-semibold">Trending on {blog.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mostViewedPosts.slice(0, 6).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex items-start space-x-4 cursor-pointer group"
                    onClick={() => onPostClick(post)}
                  >
                    <div className="text-2xl font-bold text-gray-300 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <span className="text-xs text-gray-600">Author</span>
                      </div>
                      <h3 className="font-bold text-sm md:text-base group-hover:text-gray-700 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">3 min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Topics */}
        {homepageSettings?.showCategories !== false && (
          <section className="mb-16">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold mb-6">Recommended topics</h2>
              <div className="flex flex-wrap gap-3">
                {['Technology', 'Programming', 'Web Development', 'Design', 'Startup', 'AI', 'Data Science', 'Mobile'].map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="outline" 
                    className="px-4 py-2 text-sm border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">
            <p className="mb-4">© 2024 {blog.title}. All rights reserved.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-gray-700 transition-colors">About</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

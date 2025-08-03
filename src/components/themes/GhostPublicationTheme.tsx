import React from 'react';
import { Blog, Post } from '../../types/blog';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, User, Clock, ArrowRight, Tag, Share2 } from 'lucide-react';

interface GhostPublicationThemeProps {
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

export const GhostPublicationTheme: React.FC<GhostPublicationThemeProps> = ({
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
    primary: '#15171a',
    secondary: '#ffffff',
    accent: '#ff6b35'
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

  const homepageSettings = blog.customization?.homepageSettings;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      {/* Hero Section */}
      <div 
        className="relative py-20 px-4"
        style={{ 
          backgroundColor: colors.primary,
          color: 'white'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            {blog.title}
          </h1>
          {blog.description && (
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-serif">
              {blog.description}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Article */}
        {homepageSettings?.showFeaturedPosts !== false && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div 
              className="cursor-pointer group"
              onClick={() => onPostClick(featuredPosts[0])}
            >
              <div className="mb-8">
                <div className="h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">Featured Image</span>
                  </div>
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif group-hover:opacity-80 transition-opacity">
                    {featuredPosts[0].title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {featuredPosts[0].excerpt || truncateContent(featuredPosts[0].content, 200)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="font-medium">Author</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(featuredPosts[0].publishedAt || featuredPosts[0].createdAt)}</span>
                      <span>•</span>
                      <span>8 min read</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-gray-300 hover:border-gray-400"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Posts Grid */}
        {homepageSettings?.showRecentPosts !== false && recentPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 font-serif" style={{ color: colors.primary }}>
              Latest Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.slice(0, 6).map((post) => (
                <Card 
                  key={post.id} 
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onPostClick(post)}
                >
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      {post.tags && post.tags.length > 0 && (
                        <Badge 
                          variant="secondary" 
                          style={{ 
                            backgroundColor: `${colors.accent}20`,
                            color: colors.accent
                          }}
                        >
                          {post.tags[0]}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-serif group-hover:opacity-80 transition-opacity line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || truncateContent(post.content)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span>Author</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Trending Section */}
        {homepageSettings?.showTrending !== false && mostViewedPosts.length > 0 && (
          <section className="mb-16">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.primary }}>
                Trending This Week
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mostViewedPosts.slice(0, 4).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex items-start space-x-4 cursor-pointer group"
                    onClick={() => onPostClick(post)}
                  >
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:opacity-80 transition-opacity line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Author</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        {homepageSettings?.showCategories !== false && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.primary }}>
              Explore Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Technology', 'Design', 'Business', 'Culture', 'Science', 'Politics', 'Health', 'Travel'].map((category) => (
                <Card 
                  key={category} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
                >
                  <CardContent className="p-6 text-center">
                    <Tag className="w-8 h-8 mx-auto mb-3" style={{ color: colors.accent }} />
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <p className="text-sm text-gray-500 mt-1">12 stories</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer 
        className="py-12 px-4"
        style={{ backgroundColor: colors.primary, color: 'white' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif">{blog.title}</h3>
          <p className="text-lg opacity-80 mb-6">
            Stories worth reading about technology, design, and human experience.
          </p>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Contact
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Privacy
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

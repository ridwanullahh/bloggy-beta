import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  TrendingUp,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface HashnodeHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const HashnodeHomepage: React.FC<HashnodeHomepageProps> = ({
  posts,
  categories,
  onPostClick
}) => {
  const { blog } = useTheme();
  const [activeTab, setActiveTab] = useState<'recent' | 'trending' | 'featured'>('recent');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);
  const trendingPosts = [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6);

  const getTabPosts = () => {
    switch (activeTab) {
      case 'trending':
        return trendingPosts;
      case 'featured':
        return posts.filter(p => p.featured).slice(0, 6);
      default:
        return recentPosts;
    }
  };

  return (
    <div className="hashnode-homepage">
      {/* Hero Section */}
      <section className="hero-section py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {blog.description}
              </p>
            )}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Gravatar
                      email={blog.ownerId}
                      size={48}
                      className="w-12 h-12 rounded-full border-2 border-blue-200"
                      alt={featuredPost.author || blog.title}
                      fallback={
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {(featuredPost.author || blog.title).charAt(0).toUpperCase()}
                        </div>
                      }
                    />
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author || blog.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {getReadTime(featuredPost.content)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {truncateContent(featuredPost.content, 200)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {featuredPost.likes || 0}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {featuredPost.comments || 0}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredPost.views || 0}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onPostClick(featuredPost)}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'recent', label: 'Recent', icon: BookOpen },
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'featured', label: 'Featured', icon: Tag }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getTabPosts().map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => onPostClick(post)}
              >
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Gravatar
                      email={blog.ownerId}
                      size={32}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      alt={post.author || blog.title}
                      fallback={
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                          {(post.author || blog.title).charAt(0).toUpperCase()}
                        </div>
                      }
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author || blog.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        <span>•</span>
                        <span>{getReadTime(post.content)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateContent(post.content)}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {post.likes || 0}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {post.comments || 0}
                      </span>
                    </div>
                    
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          {posts.length > 6 && (
            <div className="text-center mt-12">
              <Link
                to={`/${blog.slug}/archive`}
                className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                View All Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Topics</h2>
              <p className="text-gray-600">Discover articles by category</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/${blog.slug}/category/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {category.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.postCount || 0} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .hashnode-homepage {
          font-family: var(--theme-font-family);
          color: var(--theme-color-text);
        }
        
        .hero-section {
          background: linear-gradient(135deg, var(--theme-color-secondary), var(--theme-color-background), var(--theme-color-surface));
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HashnodeHomepage;

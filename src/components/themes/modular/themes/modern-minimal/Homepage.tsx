import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const ModernMinimalHomepage: React.FC<HomepageProps> = ({
  posts,
  categories,
  onPostClick
}) => {
  const { blog } = useTheme();

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

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="modern-minimal-homepage">
      {/* Hero Section */}
      <section className="hero-section py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {blog.description}
              </p>
            )}
            
            {featuredPost && (
              <div className="mt-12">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                  Featured Post
                </p>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime || '5 min read'}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author || blog.title}
                      </span>
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
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
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
            )}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest thoughts, insights, and stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime || '5 min read'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateContent(post.content)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => onPostClick(post)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length > 7 && (
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

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <p className="text-gray-600">Browse posts by topic</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/${blog.slug}/category/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.postCount || 0} posts
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Styles are now handled by the ThemeProvider CSS variables */}
      <style>{`
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

export default ModernMinimalHomepage;

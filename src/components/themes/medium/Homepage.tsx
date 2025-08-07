import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Star,
  Bookmark,
  MoreHorizontal,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface MediumHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const MediumHomepage: React.FC<MediumHomepageProps> = ({
  posts,
  categories,
  onPostClick
}) => {
  const { blog } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  const featuredPosts = posts.slice(0, 6);
  const trendingPosts = [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6);

  return (
    <div className="medium-homepage">
      {/* Hero Section */}
      <section className="bg-yellow-400 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            Stay curious.
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
            Start reading
          </button>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Trending on {blog.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.slice(0, 6).map((post, index) => (
              <article key={post.id} className="cursor-pointer" onClick={() => onPostClick(post)}>
                <div className="flex items-start space-x-4">
                  <span className="text-3xl font-bold text-gray-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gravatar
                        email={blog.ownerId}
                        size={20}
                        className="w-5 h-5 rounded-full"
                        alt={post.author || blog.title}
                        fallback={
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                            {(post.author || blog.title).charAt(0).toUpperCase()}
                          </div>
                        }
                      />
                      <span className="text-xs text-gray-600">{post.author || blog.title}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 leading-tight mb-2 hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      <span>·</span>
                      <span>{getReadTime(post.content)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-8">
              {featuredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="border-b border-gray-200 pb-8 cursor-pointer group"
                  onClick={() => onPostClick(post)}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Gravatar
                      email={blog.ownerId}
                      size={24}
                      className="w-6 h-6 rounded-full"
                      alt={post.author || blog.title}
                      fallback={
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                          {(post.author || blog.title).charAt(0).toUpperCase()}
                        </div>
                      }
                    />
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">{post.author || blog.title}</span>
                      <span>·</span>
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {truncateContent(post.content, 200)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {post.tags?.[0] || 'Article'}
                          </span>
                          <span>{getReadTime(post.content)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Placeholder for image */}
                    <div className="md:col-span-1">
                      <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Load More */}
              <div className="text-center pt-8">
                <Link
                  to={`/${blog.slug}/archive`}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  See all stories
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Discover More */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Discover more of what matters to you</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.id}
                      to={`/${blog.slug}/category/${category.slug}`}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-4">
                  See more topics
                </button>
              </div>

              {/* Who to Follow */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Who to follow</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {blog.title.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Writer {i}</p>
                          <p className="text-xs text-gray-600">Brief bio here</p>
                        </div>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Saved */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Recently saved</h3>
                <div className="space-y-3">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="cursor-pointer" onClick={() => onPostClick(post)}>
                      <h4 className="font-medium text-gray-900 text-sm leading-tight hover:text-gray-700 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {post.author || blog.title} · {formatDate(post.publishedAt || post.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-4">
                  See all
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .medium-homepage {
          font-family: var(--theme-font-family);
          color: var(--theme-color-text);
        }
        
        .medium-homepage h1,
        .medium-homepage h2,
        .medium-homepage h3 {
          font-family: var(--theme-font-heading);
        }
      `}</style>
    </div>
  );
};

export default MediumHomepage;

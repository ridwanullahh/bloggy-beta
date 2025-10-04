import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface TechCorporateHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const TechCorporateHomepage: React.FC<TechCorporateHomepageProps> = ({
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
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="tech-corporate-homepage">
      <section className="hero-section py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Empowering Innovation Through Technology</h1>
            <p className="text-xl text-cyan-100 mb-8">{blog.description}</p>
            <div className="flex space-x-4">
              <Link to={`/${blog.slug}/archive`} className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Solutions
              </Link>
              <Link to={`/${blog.slug}/contact`} className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Article</h2>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{truncateContent(featuredPost.content, 200)}</p>
                  <Link
                    to={`/${blog.slug}/post/${featuredPost.slug}`}
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-700"
                    onClick={() => onPostClick(featuredPost)}
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center p-12">
                  <TrendingUp className="w-32 h-32 text-cyan-600 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{truncateContent(post.content)}</p>
                  <Link
                    to={`/${blog.slug}/post/${post.slug}`}
                    className="text-cyan-600 font-semibold hover:text-cyan-700 inline-flex items-center"
                    onClick={() => onPostClick(post)}
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .tech-corporate-homepage {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default TechCorporateHomepage;

import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Clock, Shield, TrendingUp, Award, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinanceTrustHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const FinanceTrustHomepage: React.FC<FinanceTrustHomepageProps> = ({
  posts,
  categories,
  onPostClick
}) => {
  const { blog } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  return (
    <div className="finance-trust-homepage">
      <section className="hero-section py-20 bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-12 h-12" />
              <span className="text-xl font-semibold">Trusted Financial Advice</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Build Your Financial Future With Confidence</h1>
            <p className="text-xl text-green-100 mb-8">{blog.description}</p>
            <div className="flex space-x-4">
              <Link to={`/${blog.slug}/contact`} className="px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100">
                Schedule Consultation
              </Link>
              <Link to={`/${blog.slug}/archive`} className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Licensed</h3>
              <p className="text-gray-600">Fully licensed and regulated financial services</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Award Winning</h3>
              <p className="text-gray-600">Recognized for excellence in financial advisory</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-gray-600">Track record of successful client outcomes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Financial Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{truncateContent(post.content)}</p>
                  <Link
                    to={`/${blog.slug}/post/${post.slug}`}
                    className="text-green-700 font-semibold hover:text-green-800"
                    onClick={() => onPostClick(post)}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .finance-trust-homepage {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default FinanceTrustHomepage;

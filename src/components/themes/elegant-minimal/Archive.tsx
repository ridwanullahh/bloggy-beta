import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ElegantMinimalArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
}

export const ElegantMinimalArchive: React.FC<ElegantMinimalArchiveProps> = ({
  posts,
  categories,
  tags
}) => {
  const { blog } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="elegant-minimal-archive">
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">All Articles</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">{filteredPosts.length} articles</p>
          </div>

          <div className="space-y-12">
            {filteredPosts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-12 last:border-0">
                <div className="mb-3">
                  <span className="text-sm text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link to={`/${blog.slug}/post/${post.slug}`}>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 leading-relaxed mb-4">{truncateContent(post.content)}</p>
                <Link
                  to={`/${blog.slug}/post/${post.slug}`}
                  className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                >
                  Continue reading →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .elegant-minimal-archive {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default ElegantMinimalArchive;

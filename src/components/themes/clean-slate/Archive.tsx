import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CleanSlateArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
}

export const CleanSlateArchive: React.FC<CleanSlateArchiveProps> = ({ posts, categories, tags }) => {
  const { blog } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };
  const filtered = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="clean-slate-archive">
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">All Articles</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 mb-6">{filtered.length} articles</p>
          <div className="space-y-8">
            {filtered.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link to={`/${blog.slug}/post/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">{post.title}</h2>
                </Link>
                <p className="text-gray-600 mb-4">{truncate(post.content, 200)}</p>
                <Link to={`/${blog.slug}/post/${post.slug}`} className="text-blue-600 font-semibold hover:text-blue-700">Read More →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`.clean-slate-archive { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default CleanSlateArchive;

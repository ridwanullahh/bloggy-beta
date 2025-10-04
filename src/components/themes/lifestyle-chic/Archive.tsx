import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LifestyleChicArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
}

export const LifestyleChicArchive: React.FC<LifestyleChicArchiveProps> = ({ posts, categories, tags }) => {
  const { blog } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };
  const filtered = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="lifestyle-chic-archive">
      <section className="py-16 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif italic text-pink-900 mb-6">All Style Posts</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input type="text" placeholder="Search style posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-500 bg-white" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-pink-800 mb-6 italic">{filtered.length} style posts</p>
          <div className="space-y-8">
            {filtered.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-l-4 border-pink-500">
                <div className="flex items-center space-x-2 text-sm text-pink-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link to={`/${blog.slug}/post/${post.slug}`}>
                  <h2 className="text-3xl font-serif italic text-pink-900 mb-3 hover:text-pink-600 transition-colors">{post.title}</h2>
                </Link>
                <p className="text-pink-800 mb-4 leading-relaxed">{truncate(post.content, 200)}</p>
                <Link to={`/${blog.slug}/post/${post.slug}`} className="text-pink-600 font-semibold hover:text-pink-700 italic">Continue Reading →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`.lifestyle-chic-archive { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default LifestyleChicArchive;

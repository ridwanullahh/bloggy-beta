import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeveloperDarkArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
}

export const DeveloperDarkArchive: React.FC<DeveloperDarkArchiveProps> = ({ posts, categories, tags }) => {
  const { blog } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 200) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };
  const filtered = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="developer-dark-archive bg-gray-900 min-h-screen text-gray-300">
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono text-green-500 mb-6"># All Posts</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" placeholder="$ grep 'search term'" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded text-gray-300 focus:border-green-500 focus:outline-none font-mono" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 mb-6 font-mono">// Found {filtered.length} posts</p>
          <div className="space-y-6">
            {filtered.map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 font-mono mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link to={`/${blog.slug}/post/${post.slug}`}>
                  <h2 className="text-2xl font-mono text-green-400 mb-3 hover:text-green-300 transition-colors">{post.title}</h2>
                </Link>
                <p className="text-gray-400 mb-4 font-mono text-sm">{truncate(post.content)}</p>
                <Link to={`/${blog.slug}/post/${post.slug}`} className="text-green-500 font-mono hover:text-green-400">cat post.md →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`.developer-dark-archive { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default DeveloperDarkArchive;

import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Terminal, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeveloperDarkHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const DeveloperDarkHomepage: React.FC<DeveloperDarkHomepageProps> = ({ posts, categories, onPostClick }) => {
  const { blog } = useTheme();
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };

  return (
    <div className="developer-dark-homepage bg-gray-900 min-h-screen">
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Terminal className="w-12 h-12 text-green-500" />
            <h1 className="text-5xl font-mono text-green-500">$ {blog.title}</h1>
          </div>
          <p className="text-xl text-gray-400 font-mono max-w-3xl">> {blog.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-mono text-green-500 mb-8"># Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 font-mono mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <h3 className="text-xl font-mono text-green-400 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 font-mono">{truncate(post.content)}</p>
                <Link to={`/${blog.slug}/post/${post.slug}`} className="text-green-500 font-mono text-sm hover:text-green-400 inline-flex items-center" onClick={() => onPostClick(post)}>
                  <Code className="w-4 h-4 mr-1" />Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.developer-dark-homepage { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default DeveloperDarkHomepage;

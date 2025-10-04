import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CleanSlateHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const CleanSlateHomepage: React.FC<CleanSlateHomepageProps> = ({ posts, categories, onPostClick }) => {
  const { blog } = useTheme();
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };

  return (
    <div className="clean-slate-homepage">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{blog.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{truncate(post.content)}</p>
                <Link to={`/${blog.slug}/post/${post.slug}`} className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center" onClick={() => onPostClick(post)}>
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.clean-slate-homepage { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default CleanSlateHomepage;

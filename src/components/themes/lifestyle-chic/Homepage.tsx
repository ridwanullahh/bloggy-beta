import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LifestyleChicHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const LifestyleChicHomepage: React.FC<LifestyleChicHomepageProps> = ({ posts, categories, onPostClick }) => {
  const { blog } = useTheme();
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };

  return (
    <div className="lifestyle-chic-homepage">
      <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-serif italic text-pink-900 mb-6">{blog.title}</h1>
          <p className="text-xl text-pink-800 max-w-2xl mx-auto italic">{blog.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif italic text-pink-900 mb-8">Latest Style</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <div key={post.id} className="group cursor-pointer" onClick={() => onPostClick(post)}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 h-48 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-pink-400 opacity-40" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-pink-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-serif italic text-pink-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h3>
                    <p className="text-pink-800 text-sm mb-4 line-clamp-3">{truncate(post.content)}</p>
                    <Link to={`/${blog.slug}/post/${post.slug}`} className="text-pink-600 font-semibold hover:text-pink-700 italic">Read More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.lifestyle-chic-homepage { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default LifestyleChicHomepage;

import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EditorialBoldHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const EditorialBoldHomepage: React.FC<EditorialBoldHomepageProps> = ({ posts, categories, onPostClick }) => {
  const { blog } = useTheme();
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const truncate = (c: string, l: number = 150) => { const t = c.replace(/<[^>]*>/g, ''); return t.length > l ? t.substring(0, l) + '...' : t; };
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="editorial-bold-homepage">
      <section className="py-4 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Breaking News & Latest Stories</span>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3 p-8">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Featured Story</div>
                  <h2 className="text-4xl font-bold mb-4 leading-tight">{featuredPost.title}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}</span>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{truncate(featuredPost.content, 200)}</p>
                  <Link to={`/${blog.slug}/post/${featuredPost.slug}`} className="inline-block px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700" onClick={() => onPostClick(featuredPost)}>
                    Read Full Story
                  </Link>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-red-100 to-gray-100 flex items-center justify-center p-8">
                  <TrendingUp className="w-32 h-32 text-red-600 opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 uppercase">Latest Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Story</div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">{truncate(post.content)}</p>
                  <Link to={`/${blog.slug}/post/${post.slug}`} className="text-red-600 font-bold hover:text-red-700 uppercase text-sm" onClick={() => onPostClick(post)}>
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.editorial-bold-homepage { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default EditorialBoldHomepage;

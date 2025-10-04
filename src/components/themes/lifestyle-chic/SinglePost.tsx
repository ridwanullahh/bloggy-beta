import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowLeft, Heart, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LifestyleChicSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const LifestyleChicSinglePost: React.FC<LifestyleChicSinglePostProps> = ({ post, relatedPosts = [], onBack }) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="lifestyle-chic-single-post">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8 italic">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Style
        </Link>

        <header className="mb-8">
          <h1 className="text-5xl font-serif italic text-pink-900 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between border-t border-b border-pink-200 py-4">
            <div className="flex items-center space-x-2 text-sm text-pink-800">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-pink-50'}`}>
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-pink-50'}`}>
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-pink-200">
          <h2 className="text-2xl font-serif italic text-pink-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rp) => (
              <Link key={rp.id} to={`/${blog.slug}/post/${rp.slug}`} className="block bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-xl font-serif italic text-pink-900 mb-2 line-clamp-2">{rp.title}</h3>
                <p className="text-pink-800 text-sm line-clamp-3">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`.lifestyle-chic-single-post { font-family: var(--theme-font-family); } .prose { color: var(--theme-color-text); } .prose h1, .prose h2, .prose h3 { color: var(--theme-color-text); font-family: var(--theme-heading-font); } .prose a { color: var(--theme-color-primary); }`}</style>
    </div>
  );
};

export default LifestyleChicSinglePost;

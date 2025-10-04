import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowLeft, Heart, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CleanSlateSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const CleanSlateSinglePost: React.FC<CleanSlateSinglePostProps> = ({ post, relatedPosts = [], onBack }) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="clean-slate-single-post">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Articles
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded ${isLiked ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded ${isBookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rp) => (
              <Link key={rp.id} to={`/${blog.slug}/post/${rp.slug}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{rp.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`.clean-slate-single-post { font-family: var(--theme-font-family); } .prose { color: var(--theme-color-text); } .prose h1, .prose h2, .prose h3 { color: var(--theme-color-text); } .prose a { color: var(--theme-color-primary); }`}</style>
    </div>
  );
};

export default CleanSlateSinglePost;

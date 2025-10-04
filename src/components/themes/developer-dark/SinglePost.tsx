import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowLeft, Heart, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeveloperDarkSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const DeveloperDarkSinglePost: React.FC<DeveloperDarkSinglePostProps> = ({ post, relatedPosts = [], onBack }) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="developer-dark-single-post bg-gray-900 min-h-screen text-gray-300">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-green-500 hover:text-green-400 mb-8 font-mono">
          <ArrowLeft className="w-4 h-4 mr-2" />cd ..
        </Link>

        <header className="mb-8 border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-mono text-green-400 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 font-mono">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded transition-colors ${isLiked ? 'bg-gray-800 text-green-500' : 'bg-gray-800 text-gray-500 hover:text-green-500'}`}>
              <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-700">
          <h2 className="text-2xl font-mono text-green-500 mb-6"># Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rp) => (
              <Link key={rp.id} to={`/${blog.slug}/post/${rp.slug}`} className="block bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors p-6">
                <h3 className="text-lg font-mono text-green-400 mb-2 line-clamp-2">{rp.title}</h3>
                <p className="text-gray-400 text-sm font-mono line-clamp-2">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`.developer-dark-single-post { font-family: var(--theme-font-family); } .prose { color: var(--theme-color-text); } .prose h1, .prose h2, .prose h3 { color: var(--theme-color-primary); font-family: var(--theme-font-family); } .prose a { color: var(--theme-color-primary); } .prose code { background-color: var(--theme-color-surface); }`}</style>
    </div>
  );
};

export default DeveloperDarkSinglePost;

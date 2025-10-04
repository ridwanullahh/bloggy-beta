import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowLeft, Heart, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ElegantMinimalSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const ElegantMinimalSinglePost: React.FC<ElegantMinimalSinglePostProps> = ({
  post,
  relatedPosts = [],
  onBack
}) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="elegant-minimal-single-post">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <header className="mb-12">
          <div className="mb-6">
            <span className="text-sm text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="text-sm text-gray-600">
              By {post.author || blog.title}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded transition-colors ${isLiked ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded transition-colors ${isBookmarked ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
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
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">More to Read</h2>
          <div className="space-y-8">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/${blog.slug}/post/${relatedPost.slug}`}
                className="block group"
              >
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .elegant-minimal-single-post {
          font-family: var(--theme-font-family);
        }
        .prose { color: var(--theme-color-text); }
        .prose h1, .prose h2, .prose h3 { color: var(--theme-color-text); font-family: var(--theme-heading-font); }
        .prose a { color: var(--theme-color-primary); }
      `}</style>
    </div>
  );
};

export default ElegantMinimalSinglePost;

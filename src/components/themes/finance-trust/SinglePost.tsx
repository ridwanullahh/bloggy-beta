import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Clock, Tag, Heart, Share2, Bookmark, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface FinanceTrustSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const FinanceTrustSinglePost: React.FC<FinanceTrustSinglePostProps> = ({
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

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    return `${Math.ceil(words / 200)} min read`;
  };

  return (
    <div className="finance-trust-single-post">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-green-700 hover:text-green-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-green-700" />
            <span className="text-sm text-green-700 font-semibold uppercase">Trusted Advice</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{getReadTime(post.content)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-3">
              <Gravatar
                email={blog.ownerId}
                size={48}
                className="w-12 h-12 rounded-full"
                alt={post.author || blog.title}
                fallback={
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                    {(post.author || blog.title).charAt(0).toUpperCase()}
                  </div>
                }
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author || blog.title}</p>
                <p className="text-sm text-gray-600">Financial Advisor</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700 border border-green-200">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/${blog.slug}/post/${relatedPost.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .finance-trust-single-post {
          font-family: var(--theme-font-family);
        }
        .prose { color: var(--theme-color-text); }
        .prose h1, .prose h2, .prose h3 { color: var(--theme-color-text); }
        .prose a { color: var(--theme-color-primary); }
        .prose code { background-color: var(--theme-color-surface); }
      `}</style>
    </div>
  );
};

export default FinanceTrustSinglePost;

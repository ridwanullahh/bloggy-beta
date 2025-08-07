import React, { useState } from 'react';
import { useTheme } from '../../ThemeProvider';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const ModernMinimalSinglePost: React.FC<SinglePostProps> = ({
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || 'Check out this post',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="modern-minimal-single-post">
      {/* Back Navigation */}
      {onBack && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </button>
        </div>
      )}

      {/* Article Header */}
      <header className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime || '5 min read'}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author || blog.title}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes || 0}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{post.comments || 0}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.readTime || '5 min read'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedPost.excerpt || relatedPost.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>
                    
                    <Link
                      to={`/${blog.slug}/post/${relatedPost.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Styles are now handled by the ThemeProvider CSS variables */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ModernMinimalSinglePost;

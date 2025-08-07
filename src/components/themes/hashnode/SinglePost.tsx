import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
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
  ArrowRight,
  Eye,
  ThumbsUp,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface HashnodeSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const HashnodeSinglePost: React.FC<HashnodeSinglePostProps> = ({
  post,
  relatedPosts = [],
  onBack
}) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt || 'Check out this post';

    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        default:
          await navigator.clipboard.writeText(url);
          return;
      }
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
    setShowShareMenu(false);
  };

  return (
    <div className="hashnode-single-post">
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
      <header className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <Gravatar
                email={blog.ownerId}
                size={56}
                className="w-14 h-14 rounded-full border-2 border-blue-200"
                alt={post.author || blog.title}
                fallback={
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {(post.author || blog.title).charAt(0).toUpperCase()}
                  </div>
                }
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">{post.author || blog.title}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {getReadTime(post.content)}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views || 0} views
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
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

      {/* Floating Action Bar */}
      <div className="sticky top-20 z-40 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{post.comments || 0}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Twitter className="w-4 h-4 mr-3 text-blue-400" />
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Linkedin className="w-4 h-4 mr-3 text-blue-600" />
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Facebook className="w-4 h-4 mr-3 text-blue-800" />
                  Share on Facebook
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => handleShare()}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LinkIcon className="w-4 h-4 mr-3" />
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Author Bio */}
          <div className="mt-16 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-start space-x-4">
              <Gravatar
                email={blog.ownerId}
                size={64}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
                alt={post.author || blog.title}
                fallback={
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {(post.author || blog.title).charAt(0).toUpperCase()}
                  </div>
                }
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author || blog.title}</h3>
                <p className="text-gray-600 mb-4">
                  {blog.description || 'Passionate writer sharing insights and knowledge through engaging content.'}
                </p>
                <div className="flex items-center space-x-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Follow
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Gravatar
                        email={blog.ownerId}
                        size={32}
                        className="w-8 h-8 rounded-full border border-gray-200"
                        alt={relatedPost.author || blog.title}
                        fallback={
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                            {(relatedPost.author || blog.title).charAt(0).toUpperCase()}
                          </div>
                        }
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{relatedPost.author || blog.title}</p>
                        <p className="text-xs text-gray-500">{formatDate(relatedPost.publishedAt || relatedPost.createdAt)}</p>
                      </div>
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

      <style>{`
        .hashnode-single-post {
          font-family: var(--theme-font-family);
          color: var(--theme-color-text);
        }
        
        .prose {
          color: var(--theme-color-text);
        }
        
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          color: var(--theme-color-text);
          font-family: var(--theme-font-heading);
        }
        
        .prose a {
          color: var(--theme-color-primary);
        }
        
        .prose blockquote {
          border-left-color: var(--theme-color-primary);
          background-color: var(--theme-color-surface);
        }
        
        .prose code {
          background-color: var(--theme-color-surface);
          color: var(--theme-color-text);
          font-family: var(--theme-font-code);
        }
        
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

export default HashnodeSinglePost;

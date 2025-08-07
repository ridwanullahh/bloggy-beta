import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import {
  Calendar,
  Clock,
  Tag,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  Link as LinkIcon,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../../utils/gravatar';

interface MediumSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const MediumSinglePost: React.FC<MediumSinglePostProps> = ({ post, relatedPosts = [], onBack }) => {
  const { blog } = useTheme();
  const [claps, setClaps] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    return `${Math.ceil(words / 200)} min read`;
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
    setShowShare(false);
  };

  return (
    <div className="medium-single-post">
      {/* Back */}
      {onBack && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button onClick={onBack} className="inline-flex items-center text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </button>
        </div>
      )}

      {/* Article header */}
      <header className="py-10 border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gravatar
                email={blog.ownerId}
                size={40}
                className="w-10 h-10 rounded-full border"
                alt={post.author || blog.title}
                fallback={
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                    {(post.author || blog.title).charAt(0).toUpperCase()}
                  </div>
                }
              />
              <div className="text-sm">
                <p className="font-medium">{post.author || blog.title}</p>
                <div className="flex items-center gap-2 opacity-80">
                  <span className="inline-flex items-center"><Calendar className="w-3 h-3 mr-1" />{formatDate(post.publishedAt || post.createdAt)}</span>
                  <span>·</span>
                  <span className="inline-flex items-center"><Clock className="w-3 h-3 mr-1" />{getReadTime(post.content)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked((b) => !b)}
                className={`p-2 rounded-full border text-sm ${bookmarked ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <div className="relative">
                <button onClick={() => setShowShare((s) => !s)} className="p-2 rounded-full border opacity-80 hover:opacity-100" aria-haspopup="menu" aria-expanded={showShare}>
                  <Share2 className="w-4 h-4" />
                </button>
                {showShare && (
                  <div role="menu" className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-md">
                    <button className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50" onClick={handleShare}>
                      <LinkIcon className="w-4 h-4 mr-2" /> Copy link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content + actions */}
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating clap bar */}
          <div className="sticky top-20 -mt-8 mb-6">
            <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2">
              <button
                onClick={() => setClaps((c) => c + 1)}
                className="inline-flex items-center gap-2 text-sm"
                aria-label="Clap"
                title="Clap"
              >
                <ThumbsUp className="w-4 h-4" /> {claps + (post.likes || 0)}
              </button>
              <span className="opacity-60">·</span>
              <button className="inline-flex items-center gap-2 text-sm" aria-label="Comments" title="Comments">
                <MessageCircle className="w-4 h-4" /> {post.comments || 0}
              </button>
            </div>
          </div>

          {/* Body */}
          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full border text-xs">
                  <Tag className="w-3 h-3 mr-1" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 border-t">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>More from {blog.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.slice(0, 4).map((rp) => (
                <article key={rp.id} className="cursor-pointer">
                  <h3 className="text-lg font-semibold leading-snug mb-2 hover:underline">{rp.title}</h3>
                  <p className="text-sm opacity-80">{rp.excerpt || rp.content.replace(/<[^>]*>/g, '').slice(0, 140) + '...'}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .medium-single-post { font-family: var(--theme-font-family); color: var(--theme-color-text); }
        .medium-single-post header { border-color: var(--theme-color-border); }
        .medium-single-post button { color: var(--theme-color-text); border-color: var(--theme-color-border); background: var(--theme-color-surface); }
        .medium-single-post button:hover { filter: brightness(0.98); }
        .prose { color: var(--theme-color-text); }
        .prose h1, .prose h2, .prose h3, .prose h4 { font-family: var(--theme-font-heading); color: var(--theme-color-text); }
        .prose a { color: var(--theme-color-primary); }
        .prose blockquote { border-left: 4px solid var(--theme-color-primary); background: var(--theme-color-surface); padding: .75rem 1rem; }
      `}</style>
    </div>
  );
};

export default MediumSinglePost;


import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EditorialBoldSinglePostProps {
  post: any;
  relatedPosts?: any[];
  onBack?: () => void;
}

export const EditorialBoldSinglePost: React.FC<EditorialBoldSinglePostProps> = ({ post, relatedPosts = [], onBack }) => {
  const { blog } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="editorial-bold-single-post">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/${blog.slug}/archive`} className="inline-flex items-center text-red-600 hover:text-red-700 mb-8 font-bold uppercase">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Stories
        </Link>

        <header className="mb-8 border-b-4 border-red-600 pb-6">
          <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Story</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              <span>•</span>
              <span>By {post.author || blog.title}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-4 border-red-600">
          <h2 className="text-2xl font-bold mb-6 uppercase">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rp) => (
              <Link key={rp.id} to={`/${blog.slug}/post/${rp.slug}`} className="block bg-white shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{rp.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`.editorial-bold-single-post { font-family: var(--theme-font-family); } .prose { color: var(--theme-color-text); } .prose h1, .prose h2, .prose h3 { color: var(--theme-color-text); font-family: var(--theme-heading-font); } .prose a { color: var(--theme-color-primary); }`}</style>
    </div>
  );
};

export default EditorialBoldSinglePost;

import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ElegantMinimalHomepageProps {
  posts: any[];
  categories: any[];
  onPostClick: (post: any) => void;
}

export const ElegantMinimalHomepage: React.FC<ElegantMinimalHomepageProps> = ({
  posts,
  categories,
  onPostClick
}) => {
  const { blog } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="elegant-minimal-homepage">
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">{blog.title}</h1>
          {blog.description && (
            <p className="text-xl text-gray-600 leading-relaxed">{blog.description}</p>
          )}
        </div>
      </section>

      {featuredPost && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="group cursor-pointer" onClick={() => onPostClick(featuredPost)}>
              <div className="mb-4">
                <span className="text-sm text-gray-500">{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{truncateContent(featuredPost.content, 300)}</p>
              <Link
                to={`/${blog.slug}/post/${featuredPost.slug}`}
                className="inline-flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors"
              >
                Continue reading <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </article>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Recent Articles</h2>
          <div className="space-y-12">
            {recentPosts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-12 last:border-0">
                <div className="mb-3">
                  <span className="text-sm text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link to={`/${blog.slug}/post/${post.slug}`} onClick={() => onPostClick(post)}>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 leading-relaxed mb-4">{truncateContent(post.content)}</p>
                <Link
                  to={`/${blog.slug}/post/${post.slug}`}
                  className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .elegant-minimal-homepage {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default ElegantMinimalHomepage;

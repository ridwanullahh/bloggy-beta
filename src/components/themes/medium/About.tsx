import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Gravatar } from '../../../utils/gravatar';

interface MediumAboutProps { post?: any }

export const MediumAbout: React.FC<MediumAboutProps> = ({ post }) => {
  const { blog } = useTheme();

  return (
    <div className="medium-about">
      <section className="py-14 border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gravatar
            email={blog.ownerId}
            size={100}
            className="w-24 h-24 rounded-full border mx-auto"
            alt={blog.title}
            fallback={<div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-3xl mx-auto">{blog.title.charAt(0).toUpperCase()}</div>}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-6" style={{ fontFamily: 'sohne, \"Helvetica Neue\", Helvetica, Arial, sans-serif' }}>About {blog.title}</h1>
          {blog.description && <p className="mt-3 opacity-80 max-w-2xl mx-auto">{blog.description}</p>}
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            {post?.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="space-y-5 opacity-90">
                <p>Welcome to my publication. I write about technology, software, and the ideas shaping our future. This blog focuses on depth, clarity, and practical insights.</p>
                <p>Over the years, I have worked across different stacks and teams, building products and sharing what I learn along the way. I believe in open knowledge and thoughtful writing.</p>
                <p>If you enjoy these essays, consider subscribing or sharing with a friend. Thank you for reading!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .medium-about { font-family: var(--theme-font-family); color: var(--theme-color-text); }
        .medium-about section { border-color: var(--theme-color-border); }
        .prose { color: var(--theme-color-text); }
        .prose a { color: var(--theme-color-primary); }
        .prose h1, .prose h2, .prose h3 { font-family: var(--theme-font-heading); }
      `}</style>
    </div>
  );
};

export default MediumAbout;


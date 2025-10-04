import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Gravatar } from '../../../utils/gravatar';

export const ElegantMinimalAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="elegant-minimal-about">
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12">About</h1>
          
          <div className="mb-12 text-center">
            <Gravatar
              email={blog.ownerId}
              size={150}
              className="w-32 h-32 rounded-full mx-auto mb-6"
              alt={blog.title}
              fallback={
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-4xl mx-auto mb-6">
                  {blog.title.charAt(0).toUpperCase()}
                </div>
              }
            />
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">{blog.title}</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {blog.description || "Welcome to our blog where we share insights, stories, and ideas."}
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              This is a space dedicated to thoughtful writing and meaningful conversations. We believe in the power of words to inspire, educate, and connect people from all walks of life.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our content is carefully crafted to provide value to our readers, whether through practical advice, thought-provoking commentary, or simply sharing experiences that resonate.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Thank you for being here. We hope you find something that speaks to you.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .elegant-minimal-about {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default ElegantMinimalAbout;

import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Gravatar } from '../../../utils/gravatar';

export const CleanSlateAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="clean-slate-about">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12">About {blog.title}</h1>
          
          <div className="text-center mb-12">
            <Gravatar email={blog.ownerId} size={120} className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg" alt={blog.title} fallback={
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-lg">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            } />
          </div>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-xl text-gray-600 leading-relaxed mb-6">{blog.description || "Welcome to our blog."}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We're dedicated to sharing valuable insights and knowledge with our readers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Thank you for visiting. We hope you find our content helpful and inspiring.
            </p>
          </div>
        </div>
      </section>

      <style>{`.clean-slate-about { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default CleanSlateAbout;

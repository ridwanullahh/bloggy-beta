import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Sparkles } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const LifestyleChicAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="lifestyle-chic-about">
      <section className="py-16 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 text-pink-600 mx-auto mb-6" />
          <h1 className="text-5xl font-serif italic text-pink-900 mb-6">About {blog.title}</h1>
          <p className="text-xl text-pink-800 max-w-2xl mx-auto italic">Living life with style and grace</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gravatar email={blog.ownerId} size={150} className="w-40 h-40 rounded-full mx-auto mb-6 shadow-xl border-4 border-pink-200" alt={blog.title} fallback={
              <div className="w-40 h-40 rounded-full mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-5xl shadow-xl border-4 border-pink-200">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            } />
          </div>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-xl text-pink-900 leading-relaxed mb-6 italic">{blog.description || "Welcome to our stylish corner of the internet."}</p>
            <p className="text-lg text-pink-800 leading-relaxed mb-6">
              We believe in living beautifully, embracing creativity, and celebrating the art of everyday moments.
            </p>
            <p className="text-lg text-pink-800 leading-relaxed">
              Join us on this journey of style, inspiration, and authentic living.
            </p>
          </div>
        </div>
      </section>

      <style>{`.lifestyle-chic-about { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default LifestyleChicAbout;

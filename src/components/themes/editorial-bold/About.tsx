import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Newspaper } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const EditorialBoldAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="editorial-bold-about">
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Newspaper className="w-12 h-12" />
            <h1 className="text-5xl font-bold uppercase">About Us</h1>
          </div>
          <p className="text-xl text-red-100">Independent journalism for the modern age</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gravatar email={blog.ownerId} size={120} className="w-32 h-32 mx-auto mb-6 shadow-xl" alt={blog.title} fallback={
              <div className="w-32 h-32 mx-auto mb-6 bg-red-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            } />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">{blog.description || "We are a team of dedicated journalists committed to bringing you the truth."}</p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is to deliver impactful stories that matter, uncovering the truth and giving voice to the voiceless.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With a commitment to excellence and integrity, we strive to be your trusted source for news and analysis.
            </p>
          </div>
        </div>
      </section>

      <style>{`.editorial-bold-about { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default EditorialBoldAbout;

import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Heart, Sparkles } from 'lucide-react';

export const LifestyleChicFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lifestyle-chic-footer bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
              <h3 className="text-xl font-serif italic text-pink-900">{blog.title}</h3>
            </div>
            <p className="text-pink-800 text-sm italic">{blog.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-pink-900 mb-4">Explore</h4>
            <nav className="space-y-2">
              <Link to={`/${blog.slug}`} className="block text-pink-800 hover:text-pink-600 text-sm">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block text-pink-800 hover:text-pink-600 text-sm">Style</Link>
              <Link to={`/${blog.slug}/about`} className="block text-pink-800 hover:text-pink-600 text-sm">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block text-pink-800 hover:text-pink-600 text-sm">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-pink-900 mb-4">Newsletter</h4>
            <p className="text-pink-800 text-sm mb-3 italic">Stay stylish with our updates</p>
            <div className="flex space-x-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-500" />
              <button className="px-4 py-2 bg-pink-600 text-white text-sm rounded-full hover:bg-pink-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-pink-200 text-center text-sm text-pink-800">
          <p className="flex items-center justify-center">© {currentYear} {blog.title}. Made with <Heart className="w-4 h-4 mx-1 text-pink-600 fill-current" /> & style</p>
        </div>
      </div>
    </footer>
  );
};

export default LifestyleChicFooter;

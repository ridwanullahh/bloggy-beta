import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Heart } from 'lucide-react';

export const ElegantMinimalFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="elegant-minimal-footer bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{blog.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{blog.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigate</h4>
            <nav className="space-y-2 text-sm">
              <Link to={`/${blog.slug}`} className="block text-gray-600 hover:text-gray-900">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block text-gray-600 hover:text-gray-900">Articles</Link>
              <Link to={`/${blog.slug}/about`} className="block text-gray-600 hover:text-gray-900">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay Connected</h4>
            <p className="text-gray-600 text-sm mb-4">Subscribe to get the latest updates</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            © {currentYear} {blog.title}. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for readers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ElegantMinimalFooter;

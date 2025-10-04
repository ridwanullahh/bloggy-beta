import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Newspaper } from 'lucide-react';

export const EditorialBoldFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="editorial-bold-footer bg-gray-900 text-gray-300 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Newspaper className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-white uppercase">{blog.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{blog.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase">Navigate</h4>
            <nav className="space-y-2">
              <Link to={`/${blog.slug}`} className="block text-gray-400 hover:text-red-600">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block text-gray-400 hover:text-red-600">Stories</Link>
              <Link to={`/${blog.slug}/about`} className="block text-gray-400 hover:text-red-600">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block text-gray-400 hover:text-red-600">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest stories</p>
            <div className="flex space-x-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-600 text-white" />
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} {blog.title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default EditorialBoldFooter;

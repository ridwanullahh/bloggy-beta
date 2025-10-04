import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';

export const CleanSlateFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="clean-slate-footer bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">{blog.title}</h3>
            <p className="text-gray-600 text-sm">{blog.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Links</h4>
            <nav className="space-y-2">
              <Link to={`/${blog.slug}`} className="block text-gray-600 hover:text-blue-600 text-sm">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block text-gray-600 hover:text-blue-600 text-sm">Archive</Link>
              <Link to={`/${blog.slug}/about`} className="block text-gray-600 hover:text-blue-600 text-sm">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block text-gray-600 hover:text-blue-600 text-sm">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Subscribe</h4>
            <div className="flex space-x-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500" />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {currentYear} {blog.title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CleanSlateFooter;

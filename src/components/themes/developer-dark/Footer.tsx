import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Terminal, Github, Twitter } from 'lucide-react';

export const DeveloperDarkFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="developer-dark-footer bg-gray-900 border-t border-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-mono text-green-500">~/$ {blog.title}</h3>
            </div>
            <p className="text-gray-400 text-sm font-mono">{blog.description}</p>
          </div>
          <div>
            <h4 className="font-mono text-green-500 mb-4"># Navigation</h4>
            <nav className="space-y-2 font-mono text-sm">
              <Link to={`/${blog.slug}`} className="block text-gray-400 hover:text-green-500">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block text-gray-400 hover:text-green-500">Posts</Link>
              <Link to={`/${blog.slug}/about`} className="block text-gray-400 hover:text-green-500">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block text-gray-400 hover:text-green-500">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-mono text-green-500 mb-4"># Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm font-mono">
          <p className="text-gray-500">© {currentYear} {blog.title} // Built with code & coffee</p>
        </div>
      </div>
    </footer>
  );
};

export default DeveloperDarkFooter;

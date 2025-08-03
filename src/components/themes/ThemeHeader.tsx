import React from 'react';
import { Link } from 'react-router-dom';
import { Blog, BlogTheme } from '../../types/blog';
import { Menu, X, Search, User, Home, Archive, Mail, Info } from 'lucide-react';
import { Button } from '../ui/button';

interface ThemeHeaderProps {
  blog: Blog;
  theme: BlogTheme;
  currentPage?: string;
}

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({ blog, theme, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigationItems = [
    { label: 'Home', href: `/blog/${blog.slug}`, icon: <Home className="h-4 w-4" /> },
    { label: 'Archive', href: `/blog/${blog.slug}/archive`, icon: <Archive className="h-4 w-4" /> },
    { label: 'About', href: `/blog/${blog.slug}/about`, icon: <Info className="h-4 w-4" /> },
    { label: 'Contact', href: `/blog/${blog.slug}/contact`, icon: <Mail className="h-4 w-4" /> }
  ];

  const renderModernHeader = () => (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={`/blog/${blog.slug}`} className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              {blog.title.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">{blog.title}</h1>
              {blog.description && (
                <p className="text-xs text-gray-600 -mt-1">{blog.description}</p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.label.toLowerCase()
                    ? 'text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={currentPage === item.label.toLowerCase() ? { backgroundColor: 'var(--theme-primary)' } : {}}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.label.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={currentPage === item.label.toLowerCase() ? { backgroundColor: 'var(--theme-primary)' } : {}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  const renderMinimalHeader = () => (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-8 text-center">
          <Link to={`/blog/${blog.slug}`}>
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-primary)' }}
            >
              {blog.title}
            </h1>
          </Link>
          {blog.description && (
            <p className="text-gray-600 text-lg mb-6">{blog.description}</p>
          )}
          
          <nav className="flex flex-wrap justify-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-gray-700 hover:text-gray-900 transition-colors ${
                  currentPage === item.label.toLowerCase() ? 'font-semibold' : ''
                }`}
                style={currentPage === item.label.toLowerCase() ? { color: 'var(--theme-primary)' } : {}}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );

  const renderMagazineHeader = () => (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={`/blog/${blog.slug}`} className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            >
              {blog.title.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{blog.title}</h1>
              {blog.description && (
                <p className="text-gray-300 text-sm">{blog.description}</p>
              )}
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.label.toLowerCase()
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.label.toLowerCase()
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // Determine header style based on theme
  const getHeaderStyle = () => {
    if (theme.id.includes('minimal') || theme.id.includes('clean')) {
      return renderMinimalHeader();
    } else if (theme.id.includes('magazine') || theme.id.includes('news')) {
      return renderMagazineHeader();
    } else {
      return renderModernHeader();
    }
  };

  return getHeaderStyle();
};

export default ThemeHeader;

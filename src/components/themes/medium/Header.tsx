import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Edit, Bell, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { Gravatar } from '../../../utils/gravatar';

interface MediumHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const MediumHeader: React.FC<MediumHeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="medium-header sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link
              to={`/${blog.slug}`}
              className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
              style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              {blog.title}
            </Link>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={`/${blog.slug}`}
              className="text-gray-700 hover:text-gray-900 text-sm transition-colors"
            >
              Home
            </Link>
            <Link
              to={`/${blog.slug}/archive`}
              className="text-gray-700 hover:text-gray-900 text-sm transition-colors"
            >
              Stories
            </Link>
            <Link
              to={`/${blog.slug}/about`}
              className="text-gray-700 hover:text-gray-900 text-sm transition-colors"
            >
              About
            </Link>
            <Link
              to={`/${blog.slug}/contact`}
              className="text-gray-700 hover:text-gray-900 text-sm transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {onSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearch}
                className="hidden sm:flex text-gray-600 hover:text-gray-900"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            {/* Write Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm">Write</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <div className="flex items-center">
              {blog.customization?.branding?.useGravatarInHeader ? (
                <Gravatar
                  email={blog.ownerId}
                  size={32}
                  className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                  alt={blog.title}
                  fallback={
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                      {blog.title.charAt(0).toUpperCase()}
                    </div>
                  }
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                  {blog.title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              to={`/${blog.slug}`}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={`/${blog.slug}/archive`}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              to={`/${blog.slug}/about`}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to={`/${blog.slug}/contact`}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {onSearch && (
              <button
                onClick={() => {
                  onSearch();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            )}

            <button className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
              <span>Write</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .medium-header {
          font-family: var(--theme-font-heading);
          background-color: var(--theme-color-background);
          border-color: var(--theme-color-border);
        }
        
        .medium-header a {
          color: var(--theme-color-text);
        }
        
        .medium-header a:hover {
          color: var(--theme-color-primary);
        }
        
        .medium-header button {
          color: var(--theme-color-text-secondary);
        }
        
        .medium-header button:hover {
          color: var(--theme-color-text);
        }
        
        @media (prefers-color-scheme: dark) {
          .dark-mode .medium-header {
            background-color: rgba(36, 36, 36, 1);
            border-color: rgba(107, 107, 107, 0.3);
          }
        }
      `}</style>
    </header>
  );
};

export default MediumHeader;

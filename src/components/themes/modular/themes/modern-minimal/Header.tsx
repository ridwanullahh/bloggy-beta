import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import { Search, Menu, X, Sun, Moon, User } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { Gravatar } from '../../../../../utils/gravatar';

interface HeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const ModernMinimalHeader: React.FC<HeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Removed - now using proper Gravatar component

  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Archive', href: `/${blog.slug}/archive` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="modern-minimal-header sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {blog.customization?.branding?.useGravatarInHeader ? (
              <Gravatar
                email={blog.ownerId}
                size={40}
                className="w-10 h-10 rounded-full border-2 border-gray-200 transition-transform hover:scale-105"
                alt={blog.title}
                fallback={
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>
                }
              />
            ) : blog.customization?.branding?.customLogo ? (
              <img
                src={blog.customization.branding.customLogo}
                alt={blog.title}
                className="h-10 w-auto max-w-[120px]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            )}
            
            <Link
              to={`/${blog.slug}`}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors truncate max-w-[200px] sm:max-w-none"
              title={blog.title}
            >
              {blog.title}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            {onSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearch}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
              </Button>
            )}

            {/* Theme Toggle */}
            {onThemeToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="text-gray-600 hover:text-blue-600"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 bg-white/95 backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {onSearch && (
              <button
                onClick={() => {
                  onSearch();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Styles are now handled by the ThemeProvider CSS variables */}
    </header>
  );
};

export default ModernMinimalHeader;

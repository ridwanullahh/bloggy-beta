import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Sun, Moon, Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../../ui/button';
import { Gravatar } from '../../../utils/gravatar';

interface HashnodeHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const HashnodeHeader: React.FC<HashnodeHeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Archive', href: `/${blog.slug}/archive` },
    { name: 'Tags', href: `/${blog.slug}/tags` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="hashnode-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {blog.customization?.branding?.useGravatarInHeader ? (
                <Gravatar
                  email={blog.ownerId}
                  size={36}
                  className="w-9 h-9 rounded-full border-2 border-blue-200 transition-transform hover:scale-105"
                  alt={blog.title}
                  fallback={
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {blog.title.charAt(0).toUpperCase()}
                    </div>
                  }
                />
              ) : blog.customization?.branding?.customLogo ? (
                <img
                  src={blog.customization.branding.customLogo}
                  alt={blog.title}
                  className="h-9 w-auto max-w-[140px]"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
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
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
              </Button>
            )}

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Theme Toggle */}
            {onThemeToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <User className="w-4 h-4" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a>
                  <hr className="my-1" />
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </a>
                </div>
              )}
            </div>

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
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .hashnode-header {
          font-family: var(--theme-font-family);
          background-color: var(--theme-color-background);
          border-color: var(--theme-color-border);
        }
        
        .hashnode-header a {
          color: var(--theme-color-text);
        }
        
        .hashnode-header a:hover {
          color: var(--theme-color-primary);
        }
        
        .hashnode-header button {
          color: var(--theme-color-text-secondary);
        }
        
        .hashnode-header button:hover {
          color: var(--theme-color-primary);
          background-color: rgba(41, 98, 255, 0.1);
        }
        
        @media (prefers-color-scheme: dark) {
          .dark-mode .hashnode-header {
            background-color: rgba(26, 32, 44, 0.95);
            border-color: rgba(74, 85, 104, 0.5);
          }
        }
      `}</style>
    </header>
  );
};

export default HashnodeHeader;

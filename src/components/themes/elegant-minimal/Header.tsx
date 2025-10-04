import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Gravatar } from '../../../utils/gravatar';

interface ElegantMinimalHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const ElegantMinimalHeader: React.FC<ElegantMinimalHeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Articles', href: `/${blog.slug}/archive` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="elegant-minimal-header sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${blog.slug}`} className="text-2xl font-serif font-bold text-gray-900">{blog.title}</Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {onSearch && (
              <Button variant="ghost" size="sm" onClick={onSearch} className="hidden sm:flex">
                <Search className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .elegant-minimal-header {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </header>
  );
};

export default ElegantMinimalHeader;

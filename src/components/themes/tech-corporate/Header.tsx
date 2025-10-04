import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../../ui/button';
import { Gravatar } from '../../../utils/gravatar';

interface TechCorporateHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const TechCorporateHeader: React.FC<TechCorporateHeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Solutions', href: `/${blog.slug}/archive` },
    { name: 'Resources', href: `/${blog.slug}/tags` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="tech-corporate-header sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            {blog.customization?.branding?.useGravatarInHeader ? (
              <Gravatar
                email={blog.ownerId}
                size={40}
                className="w-10 h-10 rounded-lg"
                alt={blog.title}
                fallback={
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>
                }
              />
            ) : blog.customization?.branding?.customLogo ? (
              <img
                src={blog.customization.branding.customLogo}
                alt={blog.title}
                className="h-10 w-auto"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            )}
            
            <Link
              to={`/${blog.slug}`}
              className="text-2xl font-bold text-gray-900 hover:text-cyan-600 transition-colors"
            >
              {blog.title}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-cyan-600 font-medium text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {onSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearch}
                className="hidden sm:flex text-gray-600 hover:text-cyan-600"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <Button className="hidden sm:inline-flex bg-cyan-600 hover:bg-cyan-700 text-white">
              Get Started
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tech-corporate-header {
          font-family: var(--theme-font-family);
          background-color: var(--theme-color-background);
          border-color: var(--theme-color-border);
        }
      `}</style>
    </header>
  );
};

export default TechCorporateHeader;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Shield } from 'lucide-react';
import { Button } from '../../ui/button';
import { Gravatar } from '../../../utils/gravatar';

interface FinanceTrustHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const FinanceTrustHeader: React.FC<FinanceTrustHeaderProps> = ({
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Services', href: `/${blog.slug}/archive` },
    { name: 'Resources', href: `/${blog.slug}/tags` },
    { name: 'About Us', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="finance-trust-header sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <Shield className="w-10 h-10 text-green-700" />
            <Link to={`/${blog.slug}`} className="text-2xl font-bold text-gray-900">{blog.title}</Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {onSearch && (
              <Button variant="ghost" size="sm" onClick={onSearch} className="hidden sm:flex">
                <Search className="w-5 h-5" />
              </Button>
            )}
            <Button className="hidden sm:inline-flex bg-green-700 hover:bg-green-800 text-white">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .finance-trust-header {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </header>
  );
};

export default FinanceTrustHeader;

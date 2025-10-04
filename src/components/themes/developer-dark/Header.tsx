import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Terminal } from 'lucide-react';
import { Button } from '../../ui/button';

interface DeveloperDarkHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const DeveloperDarkHeader: React.FC<DeveloperDarkHeaderProps> = ({ onSearch, onThemeToggle, isDarkMode = false }) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [{ name: 'Home', href: `/${blog.slug}` }, { name: 'Posts', href: `/${blog.slug}/archive` }, { name: 'About', href: `/${blog.slug}/about` }, { name: 'Contact', href: `/${blog.slug}/contact` }];

  return (
    <header className="developer-dark-header sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6 text-green-500" />
            <Link to={`/${blog.slug}`} className="text-xl font-mono text-green-500">~/$ {blog.title}</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="text-gray-300 hover:text-green-500 font-mono text-sm transition-colors">{item.name}</Link>))}
          </nav>
          <div className="flex items-center space-x-3">
            {onSearch && <Button variant="ghost" size="sm" onClick={onSearch} className="text-gray-300 hover:text-green-500"><Search className="w-5 h-5" /></Button>}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-300">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4 space-y-2">
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded font-mono" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</Link>))}
          </div>
        )}
      </div>
      <style>{`.developer-dark-header { font-family: var(--theme-font-family); }`}</style>
    </header>
  );
};

export default DeveloperDarkHeader;

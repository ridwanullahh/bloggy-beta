import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../../ui/button';

interface LifestyleChicHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const LifestyleChicHeader: React.FC<LifestyleChicHeaderProps> = ({ onSearch, onThemeToggle, isDarkMode = false }) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [{ name: 'Home', href: `/${blog.slug}` }, { name: 'Style', href: `/${blog.slug}/archive` }, { name: 'About', href: `/${blog.slug}/about` }, { name: 'Contact', href: `/${blog.slug}/contact` }];

  return (
    <header className="lifestyle-chic-header sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-pink-600" />
            <Link to={`/${blog.slug}`} className="text-3xl font-serif italic text-pink-900">{blog.title}</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="text-pink-800 hover:text-pink-600 font-medium transition-colors">{item.name}</Link>))}
          </nav>
          <div className="flex items-center space-x-3">
            {onSearch && <Button variant="ghost" size="sm" onClick={onSearch}><Search className="w-5 h-5" /></Button>}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="block px-4 py-2 text-pink-800 hover:bg-pink-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</Link>))}
          </div>
        )}
      </div>
      <style>{`.lifestyle-chic-header { font-family: var(--theme-font-family); }`}</style>
    </header>
  );
};

export default LifestyleChicHeader;

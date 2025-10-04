import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Menu, X, Newspaper } from 'lucide-react';
import { Button } from '../../ui/button';

interface EditorialBoldHeaderProps {
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const EditorialBoldHeader: React.FC<EditorialBoldHeaderProps> = ({ onSearch, onThemeToggle, isDarkMode = false }) => {
  const { blog } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Stories', href: `/${blog.slug}/archive` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <header className="editorial-bold-header sticky top-0 z-50 bg-white border-b-4 border-red-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <Newspaper className="w-10 h-10 text-red-600" />
            <Link to={`/${blog.slug}`} className="text-3xl font-bold text-gray-900 uppercase tracking-tight">{blog.title}</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="text-gray-700 hover:text-red-600 font-bold uppercase text-sm tracking-wide transition-colors">{item.name}</Link>))}
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
            {navigation.map((item) => (<Link key={item.name} to={item.href} className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</Link>))}
          </div>
        )}
      </div>
      <style>{`.editorial-bold-header { font-family: var(--theme-font-family); }`}</style>
    </header>
  );
};

export default EditorialBoldHeader;

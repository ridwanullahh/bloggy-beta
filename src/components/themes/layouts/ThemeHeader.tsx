import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, BlogTheme } from '../../../types/blog';
import { Button } from '../../ui/button';
import { Menu, X, Search, Moon, Sun, Home, FileText, Phone, User, Archive } from 'lucide-react';

interface ThemeHeaderProps {
  blog: Blog;
  theme: BlogTheme;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
}

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({ blog, theme, pageType }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const brandColors = blog.customization?.brandColors || {};
  const branding = blog.customization?.branding || {};
  const fonts = blog.customization?.fonts || {};

  const headerStyles = {
    backgroundColor: brandColors.headerBg || theme.styles.primaryColor,
    color: brandColors.headerText || '#FFFFFF',
    fontFamily: fonts.primaryFont || theme.styles.fontFamily
  };

  const getGravatarUrl = (email: string, size: number = 40) => {
    const hash = email.toLowerCase().trim();
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  };

  const navigationItems = [
    { label: 'Home', path: `/${blog.slug}`, icon: Home },
    { label: 'Archive', path: `/${blog.slug}/archive`, icon: Archive },
    { label: 'About', path: `/${blog.slug}/about`, icon: User },
    { label: 'Contact', path: `/${blog.slug}/contact`, icon: Phone }
  ];

  return (
    <header className="sticky top-0 z-50 border-b" style={headerStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/${blog.slug}`)}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              {branding.useGravatarInHeader && blog.ownerId ? (
                <img
                  src={getGravatarUrl(blog.ownerId)}
                  alt={blog.title}
                  className="w-10 h-10 rounded-full"
                />
              ) : branding.customLogo ? (
                <img
                  src={branding.customLogo}
                  alt={blog.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: brandColors.accent || theme.styles.accentColor }}
                >
                  {blog.title.charAt(0).toUpperCase()}
                </div>
              )}
              
              {!branding.showBlogNameOnHomepage || pageType !== 'home' ? (
                <div>
                  <h1 className="text-xl font-bold truncate max-w-xs sm:max-w-sm">
                    {blog.title}
                  </h1>
                  {blog.description && (
                    <p className="text-sm opacity-75 truncate max-w-xs sm:max-w-sm">
                      {blog.description}
                    </p>
                  )}
                </div>
              ) : null}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = 
                (pageType === 'home' && item.path === `/${blog.slug}`) ||
                (pageType !== 'home' && item.path.includes(pageType));
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-white hover:bg-white/10"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = 
                  (pageType === 'home' && item.path === `/${blog.slug}`) ||
                  (pageType !== 'home' && item.path.includes(pageType));
                
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

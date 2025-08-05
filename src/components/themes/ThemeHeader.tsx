import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, BlogTheme } from '../../types/blog';
import { Menu, X, Home, FileText, User, Phone, Search, Moon, Sun } from 'lucide-react';

interface ThemeHeaderProps {
  blog: Blog;
  theme: BlogTheme;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  className?: string;
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({
  blog,
  theme,
  pageType,
  className = '',
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const brandColors = blog.customization?.brandColors || {
    primary: theme.styles.primaryColor,
    secondary: theme.styles.secondaryColor,
    accent: theme.styles.accentColor,
    headerBg: theme.styles.primaryColor,
    headerText: '#FFFFFF',
    footerBg: theme.styles.primaryColor,
    footerText: '#FFFFFF',
    siteBg: theme.styles.backgroundColor,
    siteText: theme.styles.textColor
  };
  const branding = blog.customization?.branding || {
    showBlogNameOnHomepage: true,
    useGravatarInHeader: false,
    customLogo: undefined,
    favicon: undefined,
    customCSS: undefined
  };

  const headerStyle = {
    backgroundColor: brandColors.headerBg || theme.styles.primaryColor,
    color: brandColors.headerText || '#FFFFFF'
  };

  const getGravatarUrl = (email: string, size: number = 40) => {
    // Create a simple hash from email for demo - in production use proper MD5
    const hash = btoa(email.toLowerCase().trim()).substring(0, 32);
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=g`;
  };

  const navigationItems = [
    { 
      label: 'Home', 
      icon: Home, 
      path: `/${blog.slug}`,
      active: pageType === 'home'
    },
    { 
      label: 'Archive', 
      icon: FileText, 
      path: `/${blog.slug}/archive`,
      active: pageType === 'archive'
    },
    { 
      label: 'About', 
      icon: User, 
      path: `/${blog.slug}/about`,
      active: pageType === 'about'
    },
    { 
      label: 'Contact', 
      icon: Phone, 
      path: `/${blog.slug}/contact`,
      active: pageType === 'contact'
    }
  ];

  return (
    <header className={`${className} border-b`} style={headerStyle}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3 min-w-0 flex-1 md:flex-none">
            {branding.useGravatarInHeader ? (
              <img
                src={getGravatarUrl(blog.ownerId)}
                alt={blog.title}
                className="w-10 h-10 rounded-full border-2 border-white/20 flex-shrink-0"
              />
            ) : branding.customLogo ? (
              <img
                src={branding.customLogo}
                alt={blog.title}
                className="h-10 w-auto max-w-[120px] flex-shrink-0"
              />
            ) : null}

            <button
              onClick={() => navigate(`/${blog.slug}`)}
              className="font-bold hover:opacity-80 transition-opacity truncate min-w-0"
              style={{ color: brandColors.headerText || '#FFFFFF' }}
              title={blog.title}
            >
              <span className="text-lg md:text-xl truncate block">
                {branding.useGravatarInHeader && blog.title.length > 20
                  ? `${blog.title.substring(0, 20)}...`
                  : blog.title
                }
              </span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
                    item.active 
                      ? 'bg-white/20 font-medium' 
                      : 'hover:bg-white/10'
                  }`}
                  style={{ color: brandColors.headerText || '#FFFFFF' }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* Search Button */}
            {onSearch && (
              <button
                onClick={onSearch}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
                style={{ color: brandColors.headerText || '#FFFFFF' }}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            )}
            
            {/* Dark Mode Toggle */}
            {onThemeToggle && blog.customization?.darkMode?.enabled && (
              <button
                onClick={onThemeToggle}
                className="flex items-center p-2 rounded-md hover:bg-white/10 transition-all duration-200"
                style={{ color: brandColors.headerText || '#FFFFFF' }}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-all duration-200"
            style={{ color: brandColors.headerText || '#FFFFFF' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-all duration-200 ${
                      item.active 
                        ? 'bg-white/20 font-medium' 
                        : 'hover:bg-white/10'
                    }`}
                    style={{ color: brandColors.headerText || '#FFFFFF' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Search */}
              {onSearch && (
                <button
                  onClick={() => {
                    onSearch();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-white/10 transition-all duration-200"
                  style={{ color: brandColors.headerText || '#FFFFFF' }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              )}
              
              {/* Mobile Dark Mode Toggle */}
              {onThemeToggle && blog.customization?.darkMode?.enabled && (
                <button
                  onClick={() => {
                    onThemeToggle();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-white/10 transition-all duration-200"
                  style={{ color: brandColors.headerText || '#FFFFFF' }}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ThemeHeader;
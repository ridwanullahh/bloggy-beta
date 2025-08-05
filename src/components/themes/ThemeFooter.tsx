import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, BlogTheme } from '../../types/blog';
import { MessageCircle, Send, Github, ExternalLink } from 'lucide-react';

interface ThemeFooterProps {
  blog: Blog;
  theme: BlogTheme;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  className?: string;
}

export const ThemeFooter: React.FC<ThemeFooterProps> = ({
  blog,
  theme,
  pageType,
  className = ''
}) => {
  const navigate = useNavigate();
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
  const socialMedia = blog.customization?.socialMedia || {
    enabled: false,
    platforms: {}
  };
  const branding = blog.customization?.branding || {
    showBlogNameOnHomepage: true,
    useGravatarInHeader: false,
    customLogo: undefined,
    favicon: undefined,
    customCSS: undefined
  };
  
  const footerStyle = {
    backgroundColor: brandColors.footerBg || theme.styles.primaryColor,
    color: brandColors.footerText || '#FFFFFF'
  };

  const currentYear = new Date().getFullYear();

  // Get enabled social media platforms
  const socialPlatforms = socialMedia?.platforms ? Object.entries(socialMedia.platforms)
    .filter(([_, platform]: [string, any]) => platform.enabled && platform.url)
    .map(([key, platform]: [string, any]) => ({
      name: key,
      url: platform.url,
      handle: platform.handle,
      icon: getSocialIcon(key)
    })) : [];

  function getSocialIcon(platform: string) {
    switch (platform.toLowerCase()) {
      case 'twitter': return ExternalLink;
      case 'facebook': return ExternalLink;
      case 'instagram': return ExternalLink;
      case 'linkedin': return ExternalLink;
      case 'youtube': return ExternalLink;
      case 'github': return Github;
      case 'discord': return MessageCircle;
      case 'telegram': return Send;
      default: return ExternalLink;
    }
  }

  const navigationLinks = [
    { label: 'Home', path: `/${blog.slug}` },
    { label: 'Archive', path: `/${blog.slug}/archive` },
    { label: 'About', path: `/${blog.slug}/about` },
    { label: 'Contact', path: `/${blog.slug}/contact` }
  ];

  return (
    <footer className={`${className} py-12 mt-auto`} style={footerStyle}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Info Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {branding.useGravatarInHeader ? (
                <img
                  src={`https://www.gravatar.com/avatar/${btoa(blog.ownerId.toLowerCase().trim()).substring(0, 32)}?s=40&d=identicon&r=g`}
                  alt={blog.title}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
              ) : branding.customLogo ? (
                <img
                  src={branding.customLogo}
                  alt={blog.title}
                  className="h-10 w-auto max-w-[120px]"
                />
              ) : null}

              <h3 className="text-xl font-bold truncate" style={{ color: brandColors.footerText || '#FFFFFF' }}>
                {blog.title}
              </h3>
            </div>
            
            {blog.description && (
              <p className="text-sm opacity-90 mb-6 max-w-md leading-relaxed">
                {blog.description}
              </p>
            )}

            {/* Social Media Links */}
            {socialMedia?.enabled && socialPlatforms.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 opacity-90">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialPlatforms.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110"
                        title={`Follow us on ${social.name}`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-4 opacity-90">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 text-left"
                    style={{ color: brandColors.footerText || '#FFFFFF' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 opacity-90">Resources</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate(`/${blog.slug}/archive`)}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 text-left"
                  style={{ color: brandColors.footerText || '#FFFFFF' }}
                >
                  All Posts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(`/${blog.slug}/contact`)}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 text-left"
                  style={{ color: brandColors.footerText || '#FFFFFF' }}
                >
                  Get in Touch
                </button>
              </li>
              {blog.settings?.allowSubscriptions && (
                <li>
                  <span className="text-sm opacity-80">Newsletter</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs opacity-75 text-center md:text-left">
              © {currentYear} {blog.title}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4 text-xs opacity-75">
              <span>Powered by</span>
              <a 
                href="https://bloggy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity font-medium"
                style={{ color: brandColors.accent || '#F2B91C' }}
              >
                Bloggy Platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ThemeFooter;
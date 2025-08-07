import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { 
  ExternalLink, 
  Github, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Send, 
  Heart, 
  Mail,
  Rss,
  Globe
} from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const HashnodeFooter: React.FC = () => {
  const { blog } = useTheme();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'discord': return MessageCircle;
      case 'telegram': return Send;
      default: return ExternalLink;
    }
  };

  const socialMedia = blog.customization?.socialMedia || {};
  const branding = blog.customization?.branding || {};
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Archive', href: `/${blog.slug}/archive` },
    { name: 'Tags', href: `/${blog.slug}/tags` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` },
    { name: 'RSS', href: `/${blog.slug}/rss.xml` }
  ];

  const quickLinks = [
    { name: 'Privacy Policy', href: `/${blog.slug}/privacy` },
    { name: 'Terms of Service', href: `/${blog.slug}/terms` },
    { name: 'Cookie Policy', href: `/${blog.slug}/cookies` },
    { name: 'Sitemap', href: `/${blog.slug}/sitemap.xml` }
  ];

  return (
    <footer className="hashnode-footer bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              {branding.useGravatarInHeader ? (
                <Gravatar
                  email={blog.ownerId}
                  size={32}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  alt={blog.title}
                  fallback={
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {blog.title.charAt(0).toUpperCase()}
                    </div>
                  }
                />
              ) : branding.customLogo ? (
                <img
                  src={branding.customLogo}
                  alt={blog.title}
                  className="h-8 w-auto max-w-[120px]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {blog.title.charAt(0).toUpperCase()}
                </div>
              )}
              
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {blog.title}
              </h3>
            </div>
            
            {blog.description && (
              <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                {blog.description}
              </p>
            )}

            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Subscribe to Newsletter
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Get the latest posts delivered right to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center"
                >
                  {link.name === 'RSS' && <Rss className="w-3 h-3 mr-2" />}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Connect
            </h4>
            
            {/* Social Media */}
            {socialMedia.enabled && Object.keys(socialMedia.platforms || {}).length > 0 && (
              <div className="space-y-3">
                <div className="flex space-x-3">
                  {Object.entries(socialMedia.platforms || {}).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = getSocialIcon(platform);
                    return (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-200 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        title={platform}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Legal Links */}
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} {blog.title}. All rights reserved.
              {branding.footerText && (
                <span className="ml-2">{branding.footerText}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Powered by</span>
              <a
                href="https://bloggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <Globe className="w-3 h-3 mr-1" />
                Bloggy
              </a>
              <Heart className="w-3 h-3 text-red-500 mx-1" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hashnode-footer {
          font-family: var(--theme-font-family);
          background-color: var(--theme-color-surface);
          border-color: var(--theme-color-border);
        }
        
        .hashnode-footer h3,
        .hashnode-footer h4 {
          color: var(--theme-color-text);
        }
        
        .hashnode-footer p,
        .hashnode-footer span {
          color: var(--theme-color-text-secondary);
        }
        
        .hashnode-footer a {
          color: var(--theme-color-text-secondary);
        }
        
        .hashnode-footer a:hover {
          color: var(--theme-color-primary);
        }
        
        .hashnode-footer input {
          border-color: var(--theme-color-border);
          background-color: var(--theme-color-background);
        }
        
        .hashnode-footer input:focus {
          border-color: var(--theme-color-primary);
          box-shadow: 0 0 0 3px rgba(41, 98, 255, 0.1);
        }
        
        .hashnode-footer button {
          background-color: var(--theme-color-primary);
        }
        
        .hashnode-footer button:hover {
          background-color: var(--theme-color-primary);
          filter: brightness(0.9);
        }
        
        @media (prefers-color-scheme: dark) {
          .dark-mode .hashnode-footer {
            background-color: rgba(26, 32, 44, 1);
            border-color: rgba(74, 85, 104, 0.5);
          }
        }
      `}</style>
    </footer>
  );
};

export default HashnodeFooter;

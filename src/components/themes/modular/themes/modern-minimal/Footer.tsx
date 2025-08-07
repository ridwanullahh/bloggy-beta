import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import { ExternalLink, Github, MessageCircle, Send, Heart } from 'lucide-react';
import { Gravatar } from '../../../../../utils/gravatar';

export const ModernMinimalFooter: React.FC = () => {
  const { blog } = useTheme();

  // Removed - now using proper Gravatar component

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
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
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` }
  ];

  return (
    <footer className="modern-minimal-footer bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Info */}
          <div className="space-y-4">
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
                  className="h-8 w-auto max-w-[100px]"
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
              <p className="text-gray-600 text-sm leading-relaxed">
                {blog.description}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
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

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            {socialMedia.enabled && Object.keys(socialMedia.platforms || {}).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Connect
                </h4>
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
                        className="w-8 h-8 bg-gray-200 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        title={platform}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Stay Updated
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
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} {blog.title}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Powered by</span>
              <a
                href="https://bloggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Bloggy
              </a>
              <Heart className="w-3 h-3 text-red-500 mx-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Styles are now handled by the ThemeProvider CSS variables */}
    </footer>
  );
};

export default ModernMinimalFooter;

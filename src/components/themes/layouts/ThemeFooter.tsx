import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, BlogTheme } from '../../../types/blog';
import { Button } from '../../ui/button';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  MessageCircle,
  Send,
  Heart,
  Home,
  FileText,
  Phone,
  User
} from 'lucide-react';

interface ThemeFooterProps {
  blog: Blog;
  theme: BlogTheme;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
}

export const ThemeFooter: React.FC<ThemeFooterProps> = ({ blog, theme, pageType }) => {
  const navigate = useNavigate();
  
  const brandColors = blog.customization?.brandColors || {};
  const socialMedia = blog.customization?.socialMedia || {};
  const fonts = blog.customization?.fonts || {};

  const footerStyles = {
    backgroundColor: brandColors.footerBg || theme.styles.primaryColor,
    color: brandColors.footerText || '#FFFFFF',
    fontFamily: fonts.primaryFont || theme.styles.fontFamily
  };

  const socialIcons = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    discord: MessageCircle,
    telegram: Send
  };

  const quickLinks = [
    { label: 'Home', path: `/${blog.slug}`, icon: Home },
    { label: 'Archive', path: `/${blog.slug}/archive`, icon: FileText },
    { label: 'About', path: `/${blog.slug}/about`, icon: User },
    { label: 'Contact', path: `/${blog.slug}/contact`, icon: Phone }
  ];

  const enabledSocialPlatforms = socialMedia.platforms ? 
    Object.entries(socialMedia.platforms).filter(([_, config]: [string, any]) => config.enabled) : [];

  return (
    <footer className="mt-auto border-t" style={footerStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: brandColors.accent || theme.styles.accentColor }}
              >
                {blog.title.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold">{blog.title}</h3>
                {blog.description && (
                  <p className="text-sm opacity-75">{blog.description}</p>
                )}
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed">
              Stay updated with our latest posts and insights. 
              Join our community of readers and never miss an update.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="flex items-center space-x-2 text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Social Media */}
          {socialMedia.enabled && enabledSocialPlatforms.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {enabledSocialPlatforms.map(([platform, config]: [string, any]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;

                  return (
                    <a
                      key={platform}
                      href={config.url || `https://${platform}.com/${config.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      title={`Follow us on ${platform}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              <p className="text-xs opacity-75">
                Connect with us on social media for updates and behind-the-scenes content.
              </p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm opacity-75">
              Subscribe to our newsletter for the latest posts and updates.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button 
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                variant="outline"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm opacity-75">
              <span>© {new Date().getFullYear()} {blog.title}.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>using Bloggy</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm opacity-75">
              <button className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </button>
              <button className="hover:opacity-100 transition-opacity">
                Terms of Service
              </button>
              <button className="hover:opacity-100 transition-opacity">
                RSS Feed
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

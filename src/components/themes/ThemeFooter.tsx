import React from 'react';
import { Link } from 'react-router-dom';
import { Blog, BlogTheme } from '../../types/blog';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github,
  Mail,
  Heart,
  ExternalLink,
  Rss
} from 'lucide-react';

interface ThemeFooterProps {
  blog: Blog;
  theme: BlogTheme;
}

export const ThemeFooter: React.FC<ThemeFooterProps> = ({ blog, theme }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: blog.social?.twitter, enabled: blog.social?.enableTwitter },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, url: blog.social?.facebook, enabled: blog.social?.enableFacebook },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, url: blog.social?.instagram, enabled: blog.social?.enableInstagram },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: blog.social?.linkedin, enabled: blog.social?.enableLinkedin },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, url: blog.social?.youtube, enabled: blog.social?.enableYoutube },
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, url: blog.social?.github, enabled: blog.social?.enableGithub }
  ].filter(link => link.enabled && link.url);

  const footerLinks = [
    { label: 'Home', href: `/blog/${blog.slug}` },
    { label: 'Archive', href: `/blog/${blog.slug}/archive` },
    { label: 'About', href: `/blog/${blog.slug}/about` },
    { label: 'Contact', href: `/blog/${blog.slug}/contact` },
    { label: 'RSS', href: `/blog/${blog.slug}/rss`, icon: <Rss className="h-4 w-4" /> }
  ];

  const renderModernFooter = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                {blog.title.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold">{blog.title}</h3>
            </div>
            {blog.description && (
              <p className="text-gray-300 leading-relaxed">{blog.description}</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
              <Link
                to={`/blog/${blog.slug}/contact`}
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                title="Contact"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {blog.title}. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Bloggy
          </p>
        </div>
      </div>
    </footer>
  );

  const renderMinimalFooter = () => (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}

          {/* Navigation */}
          <nav className="flex justify-center space-x-6">
            {footerLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">
              © {currentYear} {blog.title}
            </p>
            <p className="text-gray-400 text-xs flex items-center justify-center">
              Powered by <Heart className="h-3 w-3 mx-1 text-red-500" /> Bloggy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderMagazineFooter = () => (
    <footer 
      className="text-white"
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Blog Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold">{blog.title}</h3>
            {blog.description && (
              <p className="text-white/80 leading-relaxed">{blog.description}</p>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navigation</h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-2">
              <Link
                to={`/blog/${blog.slug}/contact`}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
              <Link
                to={`/blog/${blog.slug}/rss`}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <Rss className="h-4 w-4" />
                <span>RSS Feed</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} {blog.title}. All rights reserved.
          </p>
          <p className="text-white/60 text-sm flex items-center mt-4 md:mt-0">
            Powered by <Heart className="h-4 w-4 mx-1 text-red-400" /> Bloggy
          </p>
        </div>
      </div>
    </footer>
  );

  // Determine footer style based on theme
  const getFooterStyle = () => {
    if (theme.id.includes('minimal') || theme.id.includes('clean')) {
      return renderMinimalFooter();
    } else if (theme.id.includes('magazine') || theme.id.includes('news')) {
      return renderMagazineFooter();
    } else {
      return renderModernFooter();
    }
  };

  return getFooterStyle();
};

export default ThemeFooter;

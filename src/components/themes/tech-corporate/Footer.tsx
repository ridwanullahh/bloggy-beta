import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const TechCorporateFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tech-corporate-footer bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {blog.customization?.branding?.customLogo ? (
                <img src={blog.customization.branding.customLogo} alt={blog.title} className="h-8" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {blog.title.charAt(0).toUpperCase()}
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{blog.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">{blog.description}</p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to={`/${blog.slug}`} className="block hover:text-cyan-400 transition-colors">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block hover:text-cyan-400 transition-colors">Solutions</Link>
              <Link to={`/${blog.slug}/about`} className="block hover:text-cyan-400 transition-colors">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block hover:text-cyan-400 transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 text-cyan-400" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400" />
                <span>123 Tech Street, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} {blog.title}. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .tech-corporate-footer {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </footer>
  );
};

export default TechCorporateFooter;

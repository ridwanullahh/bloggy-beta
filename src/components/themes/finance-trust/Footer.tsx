import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const FinanceTrustFooter: React.FC = () => {
  const { blog } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="finance-trust-footer bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-10 h-10 text-green-500" />
              <h3 className="text-xl font-bold text-white">{blog.title}</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">{blog.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-500" />
                <span>info@financetrust.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span>+1 (800) 555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>Financial District, NYC</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to={`/${blog.slug}`} className="block hover:text-green-400">Home</Link>
              <Link to={`/${blog.slug}/archive`} className="block hover:text-green-400">Services</Link>
              <Link to={`/${blog.slug}/about`} className="block hover:text-green-400">About</Link>
              <Link to={`/${blog.slug}/contact`} className="block hover:text-green-400">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block hover:text-green-400">Privacy Policy</a>
              <a href="#" className="block hover:text-green-400">Terms of Service</a>
              <a href="#" className="block hover:text-green-400">Disclosures</a>
              <a href="#" className="block hover:text-green-400">Compliance</a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} {blog.title}. All rights reserved. | Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
};

export default FinanceTrustFooter;

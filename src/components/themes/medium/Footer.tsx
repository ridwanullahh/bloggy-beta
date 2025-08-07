import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../modular/ThemeProvider';
import { Mail, Rss, Globe } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const MediumFooter: React.FC = () => {
  const { blog } = useTheme();
  const branding = blog.customization?.branding || {};

  const footerLinks = [
    { name: 'Home', href: `/${blog.slug}` },
    { name: 'Archive', href: `/${blog.slug}/archive` },
    { name: 'About', href: `/${blog.slug}/about` },
    { name: 'Contact', href: `/${blog.slug}/contact` },
    { name: 'RSS', href: `/${blog.slug}/rss.xml` }
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="medium-footer border-t" aria-label="Footer">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/${blog.slug}`} className="flex items-center space-x-3 group">
            {branding.useGravatarInHeader ? (
              <Gravatar
                email={blog.ownerId}
                size={28}
                className="w-7 h-7 rounded-full border"
                alt={blog.title}
                fallback={
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>
                }
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                {blog.title.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-semibold tracking-tight">{blog.title}</span>
          </Link>

          <div className="flex items-center space-x-3">
            <a
              href={`/${blog.slug}/rss.xml`}
              className="p-2 rounded-full border hover:bg-gray-50"
              aria-label="RSS feed"
              title="RSS feed"
            >
              <Rss className="w-4 h-4" />
            </a>
            <a
              href="https://bloggy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border hover:bg-gray-50"
              aria-label="Powered by Bloggy"
              title="Powered by Bloggy"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.name} to={link.href} className="text-sm hover:underline">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Newsletter */}
        <div className="max-w-md">
          <h4 className="text-sm font-semibold mb-2">Subscribe</h4>
          <p className="text-sm opacity-80 mb-3">Get the latest posts in your inbox.</p>
          <form
            className="flex items-center space-x-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription form"
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2"
              aria-label="Email address"
            />
            <button className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border">
              <Mail className="w-4 h-4 mr-1" />
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="opacity-80">© {year} {blog.title}. All rights reserved.</p>
          {branding.footerText && <p className="opacity-80">{branding.footerText}</p>}
        </div>
      </div>

      <style>{`
        .medium-footer {
          font-family: var(--theme-font-family);
          background-color: var(--theme-color-background);
          border-color: var(--theme-color-border);
          color: var(--theme-color-text);
        }
        .medium-footer a { color: var(--theme-color-text); }
        .medium-footer a:hover { color: var(--theme-color-primary); }
        .medium-footer input {
          border-color: var(--theme-color-border);
          background-color: var(--theme-color-surface);
          color: var(--theme-color-text);
        }
        .medium-footer input:focus { border-color: var(--theme-color-primary); }
        .medium-footer button {
          border-color: var(--theme-color-border);
          background-color: var(--theme-color-surface);
          color: var(--theme-color-text);
        }
        .medium-footer button:hover { filter: brightness(0.98); }
        @media (prefers-color-scheme: dark) {
          .dark-mode .medium-footer {
            background-color: rgba(36,36,36,1);
            border-color: rgba(107,107,107,.3);
          }
        }
      `}</style>
    </footer>
  );
};

export default MediumFooter;


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ModularTheme } from './types';
import { ModularThemeRenderer } from './ModularThemeRenderer';
import { themePreviewData } from './preview-data';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Home,
  FileText,
  Archive,
  User,
  Mail
} from 'lucide-react';

interface ThemePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ModularTheme;
  onSelectTheme: (themeId: string) => void;
  currentTheme?: string;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  isOpen,
  onClose,
  theme,
  onSelectTheme,
  currentTheme
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPage, setCurrentPage] = useState<'homepage' | 'singlePost' | 'archive' | 'about' | 'contact'>('homepage');

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-[600px]';
      case 'tablet':
        return 'w-[768px] h-[600px]';
      default:
        return 'w-full h-[600px]';
    }
  };

  const pages = [
    { id: 'homepage', name: 'Home', icon: Home },
    { id: 'singlePost', name: 'Post', icon: FileText },
    { id: 'archive', name: 'Archive', icon: Archive },
    { id: 'about', name: 'About', icon: User },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  const mockBlog = {
    ...themePreviewData.blog,
    slug: 'preview',
    ownerId: 'preview@example.com',
    customization: {
      branding: {
        useGravatarInHeader: true,
        showBlogNameOnHomepage: false
      },
      brandColors: {
        primary: theme.defaultStyles.colors.primary,
        secondary: theme.defaultStyles.colors.secondary,
        accent: theme.defaultStyles.colors.accent,
        siteBg: theme.defaultStyles.colors.background,
        siteText: theme.defaultStyles.colors.text
      },
      fonts: {
        primaryFont: theme.defaultStyles.typography.fontFamily,
        headingFont: theme.defaultStyles.typography.headingFont,
        codeFont: theme.defaultStyles.typography.codeFont
      },
      socialMedia: {
        enabled: true,
        platforms: {
          github: 'https://github.com',
          discord: 'https://discord.com',
          telegram: 'https://telegram.org'
        }
      }
    }
  };

  const handlePostClick = (post: any) => {
    setCurrentPage('singlePost');
  };

  const getPageProps = () => {
    switch (currentPage) {
      case 'homepage':
        return {
          posts: themePreviewData.posts,
          categories: themePreviewData.categories,
          tags: themePreviewData.tags
        };
      case 'singlePost':
        return {
          post: themePreviewData.posts[0],
          relatedPosts: themePreviewData.posts.slice(1, 4)
        };
      case 'archive':
        return {
          posts: themePreviewData.posts,
          categories: themePreviewData.categories,
          tags: themePreviewData.tags
        };
      case 'about':
      case 'contact':
        return {
          post: {
            title: currentPage === 'about' ? 'About Us' : 'Contact Us',
            content: currentPage === 'about' 
              ? `
                <p>Welcome to our blog! We're passionate about sharing knowledge and insights on technology, personal development, and meaningful living.</p>
                <h2>Our Mission</h2>
                <p>Our mission is to provide valuable content that helps our readers grow both personally and professionally. We believe in the power of continuous learning and the importance of sharing knowledge with others.</p>
                <h2>What We Write About</h2>
                <ul>
                  <li>Technology and programming</li>
                  <li>Personal development and productivity</li>
                  <li>Mindfulness and well-being</li>
                  <li>Career growth and professional development</li>
                </ul>
                <p>Thank you for being part of our community!</p>
              `
              : `
                <p>We'd love to hear from you! Get in touch with us using any of the methods below.</p>
                <h2>Contact Information</h2>
                <p><strong>Email:</strong> hello@example.com</p>
                <p><strong>Response Time:</strong> We typically respond within 24 hours.</p>
                <h2>What to Expect</h2>
                <p>Whether you have questions, feedback, or collaboration ideas, we're here to help. Feel free to reach out and we'll get back to you as soon as possible.</p>
              `,
            author: themePreviewData.blog.author,
            publishedAt: new Date().toISOString(),
            readTime: '2 min read'
          }
        };
      default:
        return {};
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold flex items-center">
                  {theme.name} Preview
                </DialogTitle>
                <p className="text-blue-100 mt-1">{theme.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {theme.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    v{theme.version}
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Controls */}
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between flex-wrap gap-4">
            {/* Viewport Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="h-4 w-4 mr-1" />
                Desktop
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="h-4 w-4 mr-1" />
                Tablet
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Mobile
              </Button>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Page:</span>
              {pages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <Button
                    key={page.id}
                    variant={currentPage === page.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page.id as any)}
                  >
                    <IconComponent className="h-4 w-4 mr-1" />
                    {page.name}
                  </Button>
                );
              })}
            </div>

            {/* Action Button */}
            <Button
              onClick={() => onSelectTheme(theme.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={currentTheme === theme.id}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {currentTheme === theme.id ? 'Current Theme' : 'Select Theme'}
            </Button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6 bg-gray-100 overflow-auto">
            <div className={`mx-auto bg-white rounded-lg shadow-xl overflow-hidden ${getViewportClass()}`}>
              <div className="h-full overflow-auto">
                <ModularThemeRenderer
                  themeId={theme.id}
                  blog={mockBlog}
                  pageType={currentPage}
                  isPreview={true}
                  onPostClick={handlePostClick}
                  {...getPageProps()}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemePreview;

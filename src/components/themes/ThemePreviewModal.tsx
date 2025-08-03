import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BlogTheme, Blog } from '../../types/blog';
import { RevolutionaryThemeEngine } from './RevolutionaryThemeEngine';
import { 
  X, 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle,
  Palette,
  Sparkles,
  Heart,
  MessageSquare,
  Share2,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface ThemePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: BlogTheme;
  blog: Blog;
  onSelectTheme: (theme: BlogTheme) => void;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({
  isOpen,
  onClose,
  theme,
  blog,
  onSelectTheme,
  brandColors
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPage, setCurrentPage] = useState<'home' | 'post' | 'about'>('home');

  const mockBlogData = {
    title: blog.title || 'My Amazing Blog',
    description: blog.description || 'Welcome to my blog where I share amazing content',
    posts: [
      {
        id: '1',
        title: 'The Future of Web Design: Trends to Watch in 2024',
        excerpt: 'Discover the latest trends shaping the future of web design, from AI-powered layouts to immersive user experiences.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'John Doe',
        publishedAt: '2024-01-15',
        readTime: '5 min read',
        tags: ['Design', 'Technology', 'Trends'],
        likes: 42,
        comments: 8
      },
      {
        id: '2',
        title: 'Building Scalable React Applications',
        excerpt: 'Learn best practices for building React applications that can scale with your growing user base.',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: 'Jane Smith',
        publishedAt: '2024-01-12',
        readTime: '8 min read',
        tags: ['React', 'JavaScript', 'Development'],
        likes: 67,
        comments: 15
      }
    ]
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-80';
      default:
        return 'w-full h-96';
    }
  };

  const renderPreviewContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Header */}
            <header className="theme-header">
              <h1 className="text-3xl font-bold mb-2">{mockBlogData.title}</h1>
              <p className="text-lg opacity-90">{mockBlogData.description}</p>
            </header>

            {/* Posts Grid */}
            <div className="grid gap-6">
              {mockBlogData.posts.map((post) => (
                <article key={post.id} className="theme-card">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.publishedAt}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="theme-button">Read More</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case 'post':
        const post = mockBlogData.posts[0];
        return (
          <div className="space-y-6">
            <article className="theme-card">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.publishedAt}
                </span>
                <span>{post.readTime}</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">{post.content}</p>
                <p className="leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <Button className="theme-button flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Like ({post.likes})
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </article>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="theme-card">
              <h1 className="text-3xl font-bold mb-6">About {mockBlogData.title}</h1>
              <p className="text-lg leading-relaxed mb-6">
                Welcome to my blog! I'm passionate about sharing knowledge and insights about web development, 
                design, and technology trends. Here you'll find in-depth articles, tutorials, and thoughts on 
                the latest in the tech world.
              </p>
              <p className="leading-relaxed">
                I believe in creating content that not only informs but also inspires. Whether you're a 
                beginner looking to learn the basics or an experienced developer seeking advanced techniques, 
                there's something here for everyone.
              </p>
              
              <div className="mt-8">
                <Button className="theme-button">Get in Touch</Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold flex items-center">
                  <Palette className="h-6 w-6 mr-3" />
                  {theme.name} Preview
                </DialogTitle>
                <DialogDescription className="text-purple-100 mt-1">
                  {theme.description}
                </DialogDescription>
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
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
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
              <Button
                variant={currentPage === 'home' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage('home')}
              >
                Home
              </Button>
              <Button
                variant={currentPage === 'post' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage('post')}
              >
                Post
              </Button>
              <Button
                variant={currentPage === 'about' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage('about')}
              >
                About
              </Button>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => onSelectTheme(theme)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Select This Theme
            </Button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6 bg-gray-100 overflow-auto">
            <div className={`mx-auto bg-white rounded-lg shadow-xl overflow-hidden ${getViewportClass()}`}>
              <div className="h-full overflow-auto">
                <RevolutionaryThemeEngine theme={theme} brandColors={brandColors}>
                  <div className="p-6">
                    {renderPreviewContent()}
                  </div>
                </RevolutionaryThemeEngine>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemePreviewModal;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Menu, 
  Home, 
  User, 
  Phone, 
  Settings, 
  Plus, 
  BookOpen, 
  BarChart3,
  LogOut,
  Search,
  Moon,
  Sun,
  Archive,
  FileText
} from 'lucide-react';
import { Blog } from '../../types/blog';

interface MobileNavigationProps {
  blog?: Blog | null;
  blogSlug?: string;
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  blog, 
  blogSlug, 
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isOwner = user && blog && blog.ownerId === user.id;

  const publicNavItems = [
    { 
      label: 'Home', 
      icon: Home, 
      path: blogSlug ? `/${blogSlug}` : '/',
      description: 'Browse all posts'
    },
    { 
      label: 'Archive', 
      icon: Archive, 
      path: blogSlug ? `/${blogSlug}/archive` : '/archive',
      description: 'Browse posts by date'
    },
    { 
      label: 'About', 
      icon: User, 
      path: blogSlug ? `/${blogSlug}/about` : '/about',
      description: 'Learn more about this blog'
    },
    { 
      label: 'Contact', 
      icon: Phone, 
      path: blogSlug ? `/${blogSlug}/contact` : '/contact',
      description: 'Get in touch'
    }
  ];

  const adminNavItems = [
    { 
      label: 'Dashboard', 
      icon: BarChart3, 
      path: '/dashboard',
      description: 'Manage your blogs'
    },
    { 
      label: 'Blog Management', 
      icon: BookOpen, 
      path: blog ? `/blog/${blog.slug}/manage` : '/dashboard',
      description: 'Manage this blog'
    },
    { 
      label: 'New Post', 
      icon: Plus, 
      path: blog ? `/blog/${blog.slug}/post/new` : '/dashboard',
      description: 'Create a new post'
    },
    { 
      label: 'Blog Settings', 
      icon: Settings, 
      path: blog ? `/blog/${blog.slug}/settings` : '/dashboard',
      description: 'Configure blog settings'
    }
  ];

  const userNavItems = [
    { 
      label: 'My Dashboard', 
      icon: User, 
      path: '/user/dashboard',
      description: 'Bookmarks, notes & preferences'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-left">
            {blog ? blog.title : 'Navigation'}
          </SheetTitle>
          {blog && (
            <SheetDescription className="text-left">
              {blog.description || 'Blog navigation and settings'}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="px-6 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {onSearch && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => {
                    onSearch();
                    setIsOpen(false);
                  }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              )}
              {onThemeToggle && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={onThemeToggle}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  Theme
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Public Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Navigate</h3>
            <nav className="space-y-1">
              {publicNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {isActivePath(item.path) && (
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {user && (
            <>
              <Separator />

              {/* User Dashboard */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Personal</h3>
                <nav className="space-y-1">
                  {userNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActivePath(item.path)
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Admin Navigation (if user is blog owner) */}
              {isOwner && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      Blog Management
                      <Badge variant="outline" className="ml-2 text-xs">Owner</Badge>
                    </h3>
                    <nav className="space-y-1">
                      {adminNavItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActivePath(item.path)
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                          {isActivePath(item.path) && (
                            <Badge variant="secondary" className="text-xs">Active</Badge>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </>
              )}

              <Separator />

              {/* User Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Signed in as <span className="font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}

          {!user && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/auth')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Home, Edit, BarChart3, Settings, Palette, X } from 'lucide-react';

interface AdminMobileNavProps {
  blogSlug?: string;
}

export const AdminMobileNav: React.FC<AdminMobileNavProps> = ({ blogSlug }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Blog', href: '/create-blog', icon: Edit },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Themes', href: '/themes', icon: Palette },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const blogNavigation = blogSlug ? [
    { name: 'Manage Posts', href: `/blog/${blogSlug}/manage`, icon: Edit },
    { name: 'Blog Settings', href: `/blog/${blogSlug}/settings`, icon: Settings },
    { name: 'New Post', href: `/blog/${blogSlug}/post/new`, icon: Edit },
  ] : [];

  const navigation = blogSlug ? blogNavigation : mainNavigation;

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 sm:w-96">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {blogSlug && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Main Dashboard</h3>
              <nav className="flex flex-col space-y-2">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

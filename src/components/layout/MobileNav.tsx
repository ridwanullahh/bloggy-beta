
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu, Home, Edit, BarChart3, Palette, Settings, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavProps {
  blogSlug?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ blogSlug }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const dashboardNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Blog', href: '/create-blog', icon: Plus },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Themes', href: '/themes', icon: Palette },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const blogNavigation = blogSlug ? [
    { name: 'Manage Posts', href: `/blog/${blogSlug}/manage`, icon: Edit },
    { name: 'New Post', href: `/blog/${blogSlug}/post/new`, icon: Plus },
    { name: 'Settings', href: `/blog/${blogSlug}/settings`, icon: Settings },
    { name: 'View Blog', href: `/${blogSlug}`, icon: Home },
  ] : [];

  const navigation = blogSlug ? blogNavigation : dashboardNavigation;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BP</span>
            </div>
            <span className="font-bold text-lg">BlogPlatform</span>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

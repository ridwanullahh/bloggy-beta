import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  BarChart3, 
  Mail, 
  Palette, 
  Globe, 
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Home,
  Edit,
  Eye,
  DollarSign,
  Share2,
  Bell,
  Search,
  HelpCircle,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../contexts/AuthContext';

interface ModernSidebarProps {
  blogSlug?: string;
  isBlogManagement?: boolean;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({ blogSlug, isBlogManagement = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const mainNavItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      badge: null
    },
    {
      label: 'My Blogs',
      icon: <Globe className="h-5 w-5" />,
      href: '/dashboard',
      badge: null
    },
    {
      label: 'Create Blog',
      icon: <Plus className="h-5 w-5" />,
      href: '/create-blog',
      badge: 'New'
    },
    {
      label: 'User Dashboard',
      icon: <User className="h-5 w-5" />,
      href: '/user-dashboard',
      badge: null
    }
  ];

  const blogManagementItems = [
    {
      label: 'Overview',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: `/blog/${blogSlug}/manage`,
      badge: null
    },
    {
      label: 'Posts',
      icon: <FileText className="h-5 w-5" />,
      href: `/blog/${blogSlug}/posts`,
      badge: null
    },
    {
      label: 'New Post',
      icon: <Edit className="h-5 w-5" />,
      href: `/blog/${blogSlug}/post/new`,
      badge: null
    },
    {
      label: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      href: `/blog/${blogSlug}/analytics`,
      badge: null
    },
    {
      label: 'Subscribers',
      icon: <Users className="h-5 w-5" />,
      href: `/blog/${blogSlug}/subscribers`,
      badge: '12'
    },
    {
      label: 'Email Marketing',
      icon: <Mail className="h-5 w-5" />,
      href: `/blog/${blogSlug}/email-marketing`,
      badge: null
    },
    {
      label: 'Social Media',
      icon: <Share2 className="h-5 w-5" />,
      href: `/blog/${blogSlug}/social-media`,
      badge: null
    },
    {
      label: 'Monetization',
      icon: <DollarSign className="h-5 w-5" />,
      href: `/blog/${blogSlug}/monetization`,
      badge: null
    },
    {
      label: 'Themes',
      icon: <Palette className="h-5 w-5" />,
      href: `/blog/${blogSlug}/themes`,
      badge: '50+'
    },
    {
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: `/blog/${blogSlug}/settings`,
      badge: null
    }
  ];

  const quickActions = [
    {
      label: 'View Blog',
      icon: <Eye className="h-4 w-4" />,
      href: `/blog/${blogSlug}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'New Post',
      icon: <Plus className="h-4 w-4" />,
      href: `/blog/${blogSlug}/post/new`,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const navItems = isBlogManagement ? blogManagementItems : mainNavItems;

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-lg text-gray-900">Bloggy</span>
                <span className="text-xs text-gray-500 block -mt-1">AI-Powered</span>
              </div>
            </Link>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
              isActive(item.href)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className={`flex-shrink-0 ${isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    className={`text-xs ${
                      isActive(item.href) 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Quick Actions (Blog Management Only) */}
      {isBlogManagement && !isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors ${action.color}`}
              >
                {action.icon}
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed ? (
          <div className="space-y-2">
            <Link
              to="/help"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HelpCircle className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Help & Support</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-3 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full p-2">
              <HelpCircle className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="w-full p-2" onClick={logout}>
              <LogOut className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSidebar;

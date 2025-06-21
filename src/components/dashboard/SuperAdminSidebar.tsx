
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import {
  Shield,
  Home,
  Building2,
  CreditCard,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/superadmin' },
  { icon: Building2, label: 'Companies', path: '/superadmin/companies' },
  { icon: CreditCard, label: 'Billing & Plans', path: '/superadmin/billing' },
  { icon: Settings, label: 'Global Settings', path: '/superadmin/settings' },
  { icon: FileText, label: 'System Logs', path: '/superadmin/logs' },
  { icon: HelpCircle, label: 'Support Tools', path: '/superadmin/support' },
];

interface SuperAdminSidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SuperAdminSidebar({ className, isOpen = true, onClose }: SuperAdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const isActivePath = (path: string) => {
    if (path === '/superadmin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Sidebar Drawer */}
        <div className={cn(
          'fixed left-0 top-0 h-full w-64 bg-black border-r border-red-800 z-50 transform transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}>
          <div className="flex items-center justify-between p-4 border-b border-red-700">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-red-300" />
              <h2 className="text-lg font-semibold text-white">Super Admin</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-red-200 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-3">
            <Badge variant="outline" className="text-xs border-red-300 text-red-200 bg-red-900/30 mb-4">
              Platform Control
            </Badge>
          </div>
          
          <ScrollArea className="h-[calc(100vh-140px)] px-3">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-red-100 hover:bg-red-800/50 hover:text-white border-none',
                    isActivePath(item.path) && 'bg-red-700 text-white shadow-lg'
                  )}
                  onClick={() => handleNavigate(item.path)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-red-700">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-900/30 border-none"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </div>
      </>
    );
  }

  // Desktop and Tablet sidebar
  return (
    <div className={cn(
      'bg-black border-r border-red-800',
      isTablet ? 'w-16' : 'w-64',
      className
    )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2">
            <Shield className="h-6 w-6 mr-2 text-red-300" />
            {!isTablet && (
              <h2 className="text-lg font-semibold tracking-tight text-white">Super Admin</h2>
            )}
          </div>
          {!isTablet && (
            <div className="flex items-center text-sm text-red-200">
              <Badge variant="outline" className="text-xs border-red-300 text-red-200 bg-red-900/30">
                Platform Control
              </Badge>
            </div>
          )}
        </div>
        
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full text-red-100 hover:bg-red-800/50 hover:text-white border-none',
                    isActivePath(item.path) && 'bg-red-700 text-white shadow-lg',
                    isTablet ? 'justify-center px-2' : 'justify-start'
                  )}
                  onClick={() => navigate(item.path)}
                  title={isTablet ? item.label : undefined}
                >
                  <item.icon className={cn('h-4 w-4', !isTablet && 'mr-2')} />
                  {!isTablet && item.label}
                </Button>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-red-700">
              <Button 
                variant="ghost" 
                className={cn(
                  'w-full text-red-300 hover:text-red-200 hover:bg-red-900/30 border-none',
                  isTablet ? 'justify-center px-2' : 'justify-start'
                )}
                onClick={handleLogout}
                title={isTablet ? 'Logout' : undefined}
              >
                <LogOut className={cn('h-4 w-4', !isTablet && 'mr-2')} />
                {!isTablet && 'Logout'}
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

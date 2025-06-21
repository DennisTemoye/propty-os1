
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Home,
  Building2,
  CreditCard,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  Users,
  BarChart3,
  Database,
  Flag,
  Mail,
  Activity
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
}

export function SuperAdminSidebar({ className }: SuperAdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActivePath = (path: string) => {
    if (path === '/superadmin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={cn('pb-12 w-64 bg-black border-r border-red-800', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2">
            <Shield className="h-6 w-6 mr-2 text-red-300" />
            <h2 className="text-lg font-semibold tracking-tight text-white">Super Admin</h2>
          </div>
          <div className="flex items-center text-sm text-red-200">
            <Badge variant="outline" className="text-xs border-red-300 text-red-200 bg-red-900/30">
              Platform Control
            </Badge>
          </div>
        </div>
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-red-100 hover:bg-red-800/50 hover:text-white border-none',
                    isActivePath(item.path) && 'bg-red-700 text-white shadow-lg'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-red-700">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-900/30 border-none"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  FileText,
  Settings,
  BarChart3,
  DollarSign,
  Shield,
  HelpCircle,
  LogOut,
  Home,
  Users2,
  Handshake,
  Calendar,
  FolderOpen,
  Gift,
  TrendingUp,
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/company/dashboard' },
  { icon: Building2, label: 'Project Sites', path: '/company/projects' },
  { icon: Users, label: 'Clients', path: '/company/clients' },
  { icon: Handshake, label: 'Sales & Allocation', path: '/company/sales' },
  { icon: DollarSign, label: 'Accounting', path: '/company/accounting' },
  { icon: Users2, label: 'Team & Roles', path: '/company/team' },
  { icon: BarChart3, label: 'Reports', path: '/company/reports' },
  { icon: TrendingUp, label: 'CRM Pipelines', path: '/company/crm' },
  { icon: FolderOpen, label: 'Document Manager', path: '/company/documents' },
  { icon: Calendar, label: 'Calendar & Scheduling', path: '/company/calendar' },
  { icon: Settings, label: 'Settings', path: '/company/settings' },
  { icon: Gift, label: 'Referral Program', path: '/company/referrals' },
];

interface CompanySidebarProps {
  className?: string;
}

export function CompanySidebar({ className }: CompanySidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActivePath = (path: string) => {
    if (path === '/company/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2">
            <Building2 className="h-6 w-6 mr-2 text-purple-600" />
            <h2 className="text-lg font-semibold tracking-tight">ProptyOS</h2>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              Real Estate CRM
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
                    'w-full justify-start',
                    isActivePath(item.path) && 'bg-purple-100 text-purple-900'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/company/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Support / Help Center
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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

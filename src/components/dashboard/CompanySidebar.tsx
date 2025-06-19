
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
  UserCheck,
  Settings,
  BarChart3,
  DollarSign,
  Shield,
  HelpCircle,
  LogOut,
  Home,
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/company/dashboard' },
  { icon: Building2, label: 'Projects', path: '/company/projects' },
  { icon: Users, label: 'Clients', path: '/company/clients' },
  { icon: UserCheck, label: 'Marketers & Commission', path: '/company/marketers' },
  { icon: BarChart3, label: 'Reports', path: '/company/reports' },
  { icon: DollarSign, label: 'Accounting & Expenses', path: '/company/accounting' },
  { icon: Users, label: 'Staff & Payroll', path: '/company/staff' },
  { icon: Shield, label: 'Roles & Permissions', path: '/company/roles' },
  { icon: FileText, label: 'Documents & Media', path: '/company/documents' },
  { icon: Settings, label: 'Settings', path: '/company/settings' },
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

  return (
    <div className={cn('pb-12 w-72 bg-white/95 backdrop-blur-sm border-r border-slate-200/60', className)}>
      <div className="space-y-4 py-6">
        <div className="px-6 py-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">ProptyOS</h2>
              <Badge variant="outline" className="text-xs font-medium bg-purple-50 text-purple-700 border-purple-200 mt-1">
                Real Estate CRM
              </Badge>
            </div>
          </div>
        </div>
        <div className="px-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start h-12 px-4 rounded-2xl font-medium transition-all duration-200',
                    isActivePath(item.path) 
                      ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-900 shadow-sm border border-purple-200' 
                      : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start h-12 px-4 rounded-2xl font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  <HelpCircle className="mr-3 h-5 w-5" />
                  Help & Support
                </Button>
                <Button variant="ghost" className="w-full justify-start h-12 px-4 rounded-2xl font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  ChevronDown,
  Wrench,
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/company/dashboard' },
  { icon: Building2, label: 'Development', path: '/company/developments' },
  { icon: Users, label: 'Clients', path: '/company/clients' },
  { icon: Handshake, label: 'Sales & Allocation', path: '/company/sales' },
  { icon: DollarSign, label: 'Accounting', path: '/company/accounting' },
  { icon: Users2, label: 'Team & Roles', path: '/company/team' },
  { icon: BarChart3, label: 'Reports', path: '/company/reports' },
];

const advancedToolsItems = [
  { icon: TrendingUp, label: 'CRM Pipelines', path: '/company/crm', description: 'Manage leads across stages: Contacted → Inspection → Offer → Payment → Closed' },
  { icon: FolderOpen, label: 'Document Manager', path: '/company/documents', description: 'Store and manage signed documents, survey plans, allocation letters, and related files' },
  { icon: Calendar, label: 'Calendar & Scheduling', path: '/company/calendar', description: 'Track inspections, scheduled meetings, follow-up deadlines, and important project dates' },
];

interface CompanySidebarProps {
  className?: string;
}

export function CompanySidebar({ className }: CompanySidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdvancedToolsOpen, setIsAdvancedToolsOpen] = useState(false);

  const isActivePath = (path: string) => {
    if (path === '/company/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const isAdvancedToolsActive = () => {
    return advancedToolsItems.some(item => isActivePath(item.path));
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className={cn('pb-12 w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2">
            <Building2 className="h-6 w-6 mr-2 text-blue-300" />
            <h2 className="text-lg font-semibold tracking-tight text-white">ProptyOS</h2>
          </div>
          <div className="flex items-center text-sm text-blue-200">
            <Badge variant="outline" className="text-xs border-blue-300 text-blue-200">
              Built for Africa
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
                    'w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                    isActivePath(item.path) && 'bg-blue-700 text-white shadow-lg'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
              
              {/* Advanced Tools Collapsible Section */}
              <Collapsible 
                open={isAdvancedToolsOpen} 
                onOpenChange={setIsAdvancedToolsOpen}
                className="mt-2"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant={isAdvancedToolsActive() ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-between text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                      isAdvancedToolsActive() && 'bg-blue-700 text-white shadow-lg'
                    )}
                  >
                    <div className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      Advanced Tools
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200 text-blue-200",
                      isAdvancedToolsOpen && "rotate-180"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {advancedToolsItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start pl-8 text-sm text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                        isActivePath(item.path) && 'bg-blue-700 text-white shadow-lg'
                      )}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="mr-2 h-3 w-3" />
                      {item.label}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Button variant="ghost" className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" onClick={() => navigate('/company/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" onClick={() => navigate('/company/referrals')}>
                <Gift className="mr-2 h-4 w-4" />
                Referral Program
              </Button>
            </div>
            <div className="mt-8 pt-4 border-t border-blue-700">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" onClick={() => navigate('/company/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Support / Help Center
                </Button>
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

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResponsive } from '@/hooks/use-responsive';
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
  UserCheck,
  Receipt,
  Send,
  X
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/company/dashboard' },
  { icon: Building2, label: 'Projects', path: '/company/projects' },
  { icon: Users, label: 'Clients', path: '/company/clients' },
  { icon: UserCheck, label: 'Marketers', path: '/company/marketers' },
  { icon: Handshake, label: 'Sales & Allocation', path: '/company/sales' },
  { icon: Receipt, label: 'Fees Collection', path: '/company/fees' },
  { icon: DollarSign, label: 'Accounting', path: '/company/accounting' },
  { icon: Users2, label: 'Team & Roles', path: '/company/team' },
  { icon: BarChart3, label: 'Reports', path: '/company/reports' },
];

const advancedToolsItems = [
  { icon: TrendingUp, label: 'CRM Pipelines', path: '/company/tools/crm-pipelines' },
  { icon: FolderOpen, label: 'Document Manager', path: '/company/tools/document-manager' },
  { icon: Calendar, label: 'Calendar & Scheduling', path: '/company/tools/calendar' },
  { icon: Send, label: 'Send Notice', path: '/company/tools/send-notice' },
];

interface CompanySidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CompanySidebar({ className, isOpen = true, onClose }: CompanySidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useResponsive();
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
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (!isDesktop && onClose) {
      onClose();
    }
  };

  // Mobile sidebar
  if (isMobile) {
    return (
      <div className={cn(
        'fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 z-50 transform transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}>
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 mr-2 text-blue-300" />
            <h2 className="text-lg font-semibold text-white">ProptyOS</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-blue-200 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)] p-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.path}
                variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                  isActivePath(item.path) && 'bg-blue-700 text-white shadow-lg'
                )}
                onClick={() => handleNavigate(item.path)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
            
            {/* Advanced Tools */}
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
                    <Wrench className="mr-3 h-4 w-4" />
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
                      'w-full justify-start pl-10 text-sm text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                      isActivePath(item.path) && 'bg-blue-700 text-white shadow-lg'
                    )}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <item.icon className="mr-3 h-3 w-3" />
                    {item.label}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Button 
              variant="ghost" 
              className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" 
              onClick={() => handleNavigate('/company/settings')}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" 
              onClick={() => handleNavigate('/company/referrals')}
            >
              <Gift className="mr-3 h-4 w-4" />
              Referral Program
            </Button>
          </div>
          
          <div className="mt-8 pt-4 border-t border-blue-700 space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-blue-100 hover:bg-blue-800/50 hover:text-white border-none" 
              onClick={() => handleNavigate('/company/help')}
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              Support / Help Center
            </Button>
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
    );
  }

  // Desktop and Tablet sidebar
  return (
    <div className={cn(
      'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 border-r border-blue-800 h-full',
      isDesktop ? 'w-64' : 'w-16', // Desktop: always expanded, Tablet: collapsed
      className
    )}>
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2">
            <Building2 className="h-6 w-6 mr-2 text-blue-300" />
            {isDesktop && (
              <h2 className="text-lg font-semibold tracking-tight text-white">ProptyOS</h2>
            )}
          </div>
          {isDesktop && (
            <div className="flex items-center text-sm text-blue-200">
              <Badge variant="outline" className="text-xs border-blue-300 text-blue-200">
                Built for Africa
              </Badge>
            </div>
          )}
        </div>
        
        <div className="px-3 flex-1">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                    isActivePath(item.path) && 'bg-blue-700 text-white shadow-lg',
                    isDesktop ? 'justify-start' : 'justify-center px-2'
                  )}
                  onClick={() => navigate(item.path)}
                  title={!isDesktop ? item.label : undefined}
                >
                  <item.icon className={cn('h-4 w-4', isDesktop && 'mr-2')} />
                  {isDesktop && item.label}
                </Button>
              ))}
              
              {isDesktop && (
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
              )}

              <Button 
                variant="ghost" 
                className={cn(
                  'w-full text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                  isDesktop ? 'justify-start' : 'justify-center px-2'
                )}
                onClick={() => navigate('/company/settings')}
                title={!isDesktop ? 'Settings' : undefined}
              >
                <Settings className={cn('h-4 w-4', isDesktop && 'mr-2')} />
                {isDesktop && 'Settings'}
              </Button>
              
              <Button 
                variant="ghost" 
                className={cn(
                  'w-full text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                  isDesktop ? 'justify-start' : 'justify-center px-2'
                )}
                onClick={() => navigate('/company/referrals')}
                title={!isDesktop ? 'Referral Program' : undefined}
              >
                <Gift className={cn('h-4 w-4', isDesktop && 'mr-2')} />
                {isDesktop && 'Referral Program'}
              </Button>
            </div>
            
            <div className="mt-8 pt-4 border-t border-blue-700">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={cn(
                    'w-full text-blue-100 hover:bg-blue-800/50 hover:text-white border-none',
                    isDesktop ? 'justify-start' : 'justify-center px-2'
                  )}
                  onClick={() => navigate('/company/help')}
                  title={!isDesktop ? 'Support / Help Center' : undefined}
                >
                  <HelpCircle className={cn('h-4 w-4', isDesktop && 'mr-2')} />
                  {isDesktop && 'Support / Help Center'}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    'w-full text-red-300 hover:text-red-200 hover:bg-red-900/30 border-none',
                    isDesktop ? 'justify-start' : 'justify-center px-2'
                  )}
                  onClick={handleLogout}
                  title={!isDesktop ? 'Logout' : undefined}
                >
                  <LogOut className={cn('h-4 w-4', isDesktop && 'mr-2')} />
                  {isDesktop && 'Logout'}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

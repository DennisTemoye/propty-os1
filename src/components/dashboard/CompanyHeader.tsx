import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Handshake, Menu, Activity, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  actions?: React.ReactNode;
}

export function CompanyHeader({ title, subtitle, onMenuToggle, actions }: CompanyHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
              {!isMobile && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">{new Date().toLocaleDateString('en-NG', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span className="sm:hidden">{new Date().toLocaleDateString('en-NG')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Custom Actions */}
          {actions}
          
          {/* System Status - Hidden on mobile */}
          {!isMobile && (
            <div className="hidden sm:flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs sm:text-sm">
                <span className="hidden md:inline">System </span>Online
              </Badge>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
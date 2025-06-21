
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Activity, AlertTriangle, Clock, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SuperAdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
}

export function SuperAdminHeader({ title, onMenuToggle }: SuperAdminHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
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
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">{title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
              <span className="text-sm sm:text-base text-slate-600">ProptyOS Platform Administration</span>
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
          {/* Platform Status - Hidden on mobile, simplified on tablet */}
          {!isMobile && (
            <div className="hidden sm:flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs sm:text-sm">
                <span className="hidden md:inline">Platform </span>Online
              </Badge>
            </div>
          )}
          
          {/* System Alerts - Simplified on mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50 text-xs">
              <span className="hidden sm:inline">2 </span>Alerts
            </Badge>
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </Button>
          
          {/* Super Admin Badge - Simplified on mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-red-50 px-2 sm:px-3 py-1 rounded-full border border-red-200">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="text-xs sm:text-sm font-medium text-red-700">
              <span className="hidden sm:inline">Super </span>Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

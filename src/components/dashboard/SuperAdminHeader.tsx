
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Activity, AlertTriangle } from 'lucide-react';

interface SuperAdminHeaderProps {
  title: string;
}

export function SuperAdminHeader({ title }: SuperAdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-600">Platform administration and management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-500" />
            <Badge variant="outline" className="text-green-700 border-green-200">
              System Online
            </Badge>
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          
          {/* Admin Badge */}
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-slate-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}

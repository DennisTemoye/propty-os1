
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Activity, AlertTriangle, Clock } from 'lucide-react';

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
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-slate-600">ProptyOS Platform Administration</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{new Date().toLocaleDateString('en-NG', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Platform Status */}
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-500" />
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              Platform Online
            </Badge>
          </div>
          
          {/* System Alerts */}
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
              2 Alerts
            </Badge>
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </Button>
          
          {/* Super Admin Badge */}
          <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

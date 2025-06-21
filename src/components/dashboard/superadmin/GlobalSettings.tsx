
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export function GlobalSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <span>Global Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Global platform settings and configurations coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

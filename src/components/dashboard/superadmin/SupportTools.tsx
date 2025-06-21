
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export function SupportTools() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>Support Tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Support and help management tools coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

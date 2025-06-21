
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function SystemLogs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-slate-600" />
            <span>System Logs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">System logs and audit trails coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

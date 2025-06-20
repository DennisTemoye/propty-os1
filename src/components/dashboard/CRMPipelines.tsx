
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function CRMPipelines() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Pipelines</h1>
          <p className="text-gray-600 mt-1">Manage leads across stages: Contacted → Inspection → Offer → Payment → Closed</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            CRM Pipeline Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Advanced CRM pipeline functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

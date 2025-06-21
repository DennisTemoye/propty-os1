
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export function BillingSubscriptions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            <span>Billing & Subscriptions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Billing and subscription management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

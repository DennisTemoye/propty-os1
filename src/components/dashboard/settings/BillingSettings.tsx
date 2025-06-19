
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Calendar, DollarSign } from 'lucide-react';

export function BillingSettings() {
  const billingHistory = [
    { id: 1, date: '2024-01-01', amount: '$99.00', status: 'paid', plan: 'Professional' },
    { id: 2, date: '2023-12-01', amount: '$99.00', status: 'paid', plan: 'Professional' },
    { id: 3, date: '2023-11-01', amount: '$99.00', status: 'paid', plan: 'Professional' },
  ];

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Professional Plan</h3>
              <p className="text-gray-600">$99/month • Billed monthly</p>
              <p className="text-sm text-gray-500 mt-1">Next billing date: February 1, 2024</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 mb-2">Active</Badge>
              <div>
                <Button variant="outline" className="mr-2">Change Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold mr-3">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline">Update Card</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.plan} Plan</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

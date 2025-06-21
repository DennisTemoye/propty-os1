
import React from 'react';
import { ReportsGenerator } from './reports/ReportsGenerator';
import { ReportExportActions } from './reports/ReportExportActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, Users, TrendingUp } from 'lucide-react';

export function Reports() {
  // Mock Application Form fee data for reporting
  const applicationFeeData = {
    totalCollected: 450000, // ₦450K
    pendingCount: 8,
    completedCount: 12,
    conversionRate: 60 // 60% of interested clients pay application fee
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="text-sm text-gray-500 mt-1">
            Generate detailed reports for your business including payments, infrastructure fees, service charges, and application form fees
          </div>
        </div>
        <ReportExportActions reportType="general" />
      </div>

      {/* Application Form Fee Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Application Form Fee Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">₦{(applicationFeeData.totalCollected / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-green-700">Total Collected</div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{applicationFeeData.completedCount}</div>
                  <div className="text-sm text-blue-700">Paid Applications</div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{applicationFeeData.pendingCount}</div>
                  <div className="text-sm text-orange-700">Pending Payments</div>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{applicationFeeData.conversionRate}%</div>
                  <div className="text-sm text-purple-700">Payment Rate</div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ReportsGenerator />
    </div>
  );
}

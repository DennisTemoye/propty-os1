
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ReportsGenerator } from './reports/ReportsGenerator';
import { ReportExportActions } from './reports/ReportExportActions';
import { BarChart3, TrendingUp, Users, DollarSign, FileText, Filter } from 'lucide-react';

export function Reports() {
  const [allocationStatusFilter, setAllocationStatusFilter] = useState('all');
  const [includeRevoked, setIncludeRevoked] = useState(true);

  // Mock allocation data with status and revocation info
  const mockAllocationData = [
    {
      id: 1,
      client: 'John Doe',
      unit: 'Block A - Plot 02',
      project: 'Victoria Gardens',
      status: 'allocated',
      amount: '₦25,000,000',
      date: '2024-01-15'
    },
    {
      id: 2,
      client: 'Jane Smith',
      unit: 'Block B - Plot 08',
      project: 'Golden View',
      status: 'offered',
      amount: '₦30,000,000',
      date: '2024-01-10'
    },
    {
      id: 3,
      client: 'Mike Johnson',
      unit: 'Block C - Plot 15',
      project: 'Emerald Heights',
      status: 'revoked',
      amount: '₦22,000,000',
      date: '2024-01-20',
      revocationReason: 'Client payment default',
      refundType: 'Partial Refund (80%)',
      refundAmount: '₦17,600,000'
    }
  ];

  const statusColors = {
    'interested': 'bg-blue-100 text-blue-800',
    'offered': 'bg-orange-100 text-orange-800',
    'allocated': 'bg-green-100 text-green-800',
    'revoked': 'bg-red-100 text-red-800'
  };

  const filteredData = mockAllocationData.filter(allocation => {
    if (allocationStatusFilter === 'all') return true;
    if (allocationStatusFilter === 'revoked' && includeRevoked) return allocation.status === 'revoked';
    return allocation.status === allocationStatusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="text-sm text-gray-500 mt-1">
            Generate detailed reports for your business including payments, infrastructure fees, service charges, and allocation statuses
          </div>
        </div>
        <ReportExportActions reportType="general" />
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-500">Total Allocations</div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-gray-500">Completed Sales</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-500">Pending Offers</div>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-500">Revocations</div>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Allocation Status Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Allocation Status Report</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <Select value={allocationStatusFilter} onValueChange={setAllocationStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="allocated">Allocated</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeRevoked"
                  checked={includeRevoked}
                  onCheckedChange={setIncludeRevoked}
                />
                <Label htmlFor="includeRevoked" className="text-sm">
                  Include revoked allocations
                </Label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((allocation) => (
              <div key={allocation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{allocation.client}</span>
                      <Badge className={statusColors[allocation.status as keyof typeof statusColors]}>
                        {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {allocation.unit} • {allocation.project}
                    </div>
                    <div className="text-xs text-gray-500">
                      {allocation.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-purple-600">{allocation.amount}</div>
                    {allocation.status === 'revoked' && allocation.refundAmount && (
                      <div className="text-sm text-red-600">
                        Refund: {allocation.refundAmount}
                      </div>
                    )}
                  </div>
                </div>
                
                {allocation.status === 'revoked' && (
                  <div className="mt-3 pt-3 border-t bg-red-50 rounded p-2">
                    <div className="text-sm">
                      <span className="font-medium text-red-800">Revocation Details:</span>
                    </div>
                    <div className="text-xs text-red-700 mt-1">
                      <div>Reason: {allocation.revocationReason}</div>
                      <div>Refund Type: {allocation.refundType}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Reports Generator */}
      <ReportsGenerator />
    </div>
  );
}

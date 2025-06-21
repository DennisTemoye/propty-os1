
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReportsGenerator } from './reports/ReportsGenerator';
import { ReportExportActions } from './reports/ReportExportActions';
import { AllocationStatusBadge } from './allocation/AllocationStatusBadge';
import { AllocationStatus } from '@/types/allocation';

export function Reports() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('last_30_days');

  // Mock allocation data for reports
  const mockAllocationReports = [
    {
      id: 1,
      client: 'John Doe',
      project: 'Victoria Gardens',
      unit: 'Block A - Plot 02',
      status: 'allocated' as AllocationStatus,
      assignedDate: '2024-01-10',
      price: '₦25,000,000',
      totalPaid: '₦15,000,000',
      isRevoked: false
    },
    {
      id: 2,
      client: 'Jane Smith',
      project: 'Emerald Heights',
      unit: 'Block B - Plot 12',
      status: 'offered' as AllocationStatus,
      assignedDate: '2024-01-15',
      price: '₦18,000,000',
      totalPaid: '₦2,000,000',
      isRevoked: false
    },
    {
      id: 3,
      client: 'Mike Johnson',
      project: 'Golden View',
      unit: 'Block C - Plot 05',
      status: 'allocated' as AllocationStatus,
      assignedDate: '2023-12-01',
      price: '₦22,000,000',
      totalPaid: '₦22,000,000',
      isRevoked: true,
      revocationReason: 'Client requested refund due to relocation',
      refundAmount: '₦20,000,000'
    }
  ];

  const filteredReports = mockAllocationReports.filter(report => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'revoked') return report.isRevoked;
    return report.status === statusFilter && !report.isRevoked;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="text-sm text-gray-500 mt-1">
            Generate detailed reports for your business including payments, infrastructure fees, and allocation status
          </div>
        </div>
        <ReportExportActions reportType="general" />
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Status Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                  <SelectItem value="last_90_days">Last 90 days</SelectItem>
                  <SelectItem value="this_year">This year</SelectItem>
                  <SelectItem value="all_time">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4">
            <Badge variant="outline" className="text-sm">
              {filteredReports.length} records found
            </Badge>
          </div>

          {/* Results Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.client}</TableCell>
                  <TableCell>{report.project}</TableCell>
                  <TableCell>{report.unit}</TableCell>
                  <TableCell>
                    {report.isRevoked ? (
                      <Badge className="bg-red-100 text-red-800">Revoked</Badge>
                    ) : (
                      <AllocationStatusBadge status={report.status} />
                    )}
                  </TableCell>
                  <TableCell>{report.price}</TableCell>
                  <TableCell>
                    {report.isRevoked && report.refundAmount ? (
                      <div>
                        <div className="line-through text-gray-500">{report.totalPaid}</div>
                        <div className="text-red-600">Refunded: {report.refundAmount}</div>
                      </div>
                    ) : (
                      report.totalPaid
                    )}
                  </TableCell>
                  <TableCell>{report.assignedDate}</TableCell>
                  <TableCell>
                    {report.isRevoked && (
                      <div className="text-sm text-gray-600">
                        {report.revocationReason}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <ReportsGenerator />
    </div>
  );
}

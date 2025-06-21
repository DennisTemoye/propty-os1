
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ban, Download, Search, AlertTriangle, Calendar, User, DollarSign } from 'lucide-react';

const mockRevokedAllocations = [
  {
    id: 1,
    clientName: 'Michael Thompson',
    unit: 'Block A - Plot 18',
    project: 'Victoria Gardens',
    revocationDate: '2024-01-18',
    reason: 'Payment Default',
    refundStatus: 'Partial',
    refundType: 'partial',
    originalAmount: 25000000,
    refundedAmount: 20000000,
    refundPercentage: 80,
    admin: 'Admin User',
    clientPhone: '+234 801 234 5678',
    marketer: 'Jane Smith'
  },
  {
    id: 2,
    clientName: 'Lisa Anderson',
    unit: 'Block C - Plot 22',
    project: 'Emerald Heights',
    revocationDate: '2024-01-12',
    reason: 'Client Request',
    refundStatus: 'Full',
    refundType: 'full',
    originalAmount: 30000000,
    refundedAmount: 30000000,
    refundPercentage: 100,
    admin: 'Super Admin',
    clientPhone: '+234 802 345 6789',
    marketer: 'Mike Davis'
  },
  {
    id: 3,
    clientName: 'Robert Wilson',
    unit: 'Block B - Plot 15',
    project: 'Golden View',
    revocationDate: '2024-01-08',
    reason: 'Contract Breach',
    refundStatus: 'Partial',
    refundType: 'partial',
    originalAmount: 22000000,
    refundedAmount: 15400000,
    refundPercentage: 70,
    admin: 'Admin User',
    clientPhone: '+234 803 456 7890',
    marketer: 'Sarah Johnson'
  },
  {
    id: 4,
    clientName: 'Jennifer Davis',
    unit: 'Block A - Plot 30',
    project: 'Ocean Breeze',
    revocationDate: '2024-01-25',
    reason: 'Force Majeure',
    refundStatus: 'Full',
    refundType: 'full',
    originalAmount: 28000000,
    refundedAmount: 28000000,
    refundPercentage: 100,
    admin: 'Super Admin',
    clientPhone: '+234 804 567 8901',
    marketer: 'Tom Wilson'
  }
];

export function RevokedAllocationsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [refundFilter, setRefundFilter] = useState('all');

  const filteredRevoked = mockRevokedAllocations.filter(revoked => {
    const matchesSearch = revoked.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revoked.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || revoked.project === projectFilter;
    const matchesReason = reasonFilter === 'all' || revoked.reason === reasonFilter;
    const matchesRefund = refundFilter === 'all' || revoked.refundStatus.toLowerCase() === refundFilter;
    
    return matchesSearch && matchesProject && matchesReason && matchesRefund;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Payment Default':
        return 'bg-red-100 text-red-800';
      case 'Client Request':
        return 'bg-blue-100 text-blue-800';
      case 'Contract Breach':
        return 'bg-orange-100 text-orange-800';
      case 'Force Majeure':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case 'Full':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const projects = [...new Set(mockRevokedAllocations.map(r => r.project))];
  const reasons = [...new Set(mockRevokedAllocations.map(r => r.reason))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Ban className="h-5 w-5 text-red-600" />
              <span>Revoked Allocations</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={reasonFilter} onValueChange={setReasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Reasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                {reasons.map(reason => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={refundFilter} onValueChange={setRefundFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Refund Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Refunds</SelectItem>
                <SelectItem value="full">Full Refund</SelectItem>
                <SelectItem value="partial">Partial Refund</SelectItem>
                <SelectItem value="pending">Pending Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Revoked Allocations Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Unit</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Revocation Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Refund Status</TableHead>
                <TableHead>Financial Details</TableHead>
                <TableHead>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRevoked.map((revoked) => (
                <TableRow key={revoked.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center space-x-2">
                        <span>{revoked.clientName}</span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="text-sm text-gray-500">{revoked.unit}</div>
                      <div className="text-xs text-gray-400">{revoked.clientPhone}</div>
                      <div className="text-xs text-gray-400">via {revoked.marketer}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{revoked.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{revoked.revocationDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getReasonColor(revoked.reason)}>
                      {revoked.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRefundStatusColor(revoked.refundStatus)}>
                      {revoked.refundStatus} ({revoked.refundPercentage}%)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Original:</span>
                        <span className="font-medium">{formatCurrency(revoked.originalAmount)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="text-gray-600">Refunded:</span>
                        <span className="font-medium text-green-600">{formatCurrency(revoked.refundedAmount)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <DollarSign className="h-3 w-3 text-red-600" />
                        <span className="text-gray-600">Deducted:</span>
                        <span className="font-medium text-red-600">{formatCurrency(revoked.originalAmount - revoked.refundedAmount)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{revoked.admin}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRevoked.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No revoked allocations found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

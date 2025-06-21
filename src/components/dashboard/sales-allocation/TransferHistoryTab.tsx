
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, Download, Search, User, Calendar } from 'lucide-react';

const mockTransferHistory = [
  {
    id: 1,
    unit: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    oldClient: 'Michael Johnson',
    newClient: 'John Doe',
    transferDate: '2024-01-15',
    reason: 'Client Transfer',
    admin: 'Admin User',
    oldClientPhone: '+234 801 234 5678',
    newClientPhone: '+234 802 345 6789',
    marketer: 'Jane Smith',
    transferFee: 500000
  },
  {
    id: 2,
    unit: 'Block B - Plot 08',
    project: 'Emerald Heights',
    oldClient: 'David Wilson',
    newClient: 'Sarah Johnson',
    transferDate: '2024-01-10',
    reason: 'Unit Resale',
    admin: 'Admin User',
    oldClientPhone: '+234 803 456 7890',
    newClientPhone: '+234 804 567 8901',
    marketer: 'Mike Davis',
    transferFee: 750000
  },
  {
    id: 3,
    unit: 'Block C - Plot 15',
    project: 'Golden View',
    oldClient: 'Emma Thompson',
    newClient: 'Robert Brown',
    transferDate: '2024-01-05',
    reason: 'Payment Default',
    admin: 'Super Admin',
    oldClientPhone: '+234 805 678 9012',
    newClientPhone: '+234 806 789 0123',
    marketer: 'Sarah Johnson',
    transferFee: 600000
  },
  {
    id: 4,
    unit: 'Block A - Plot 25',
    project: 'Ocean Breeze',
    oldClient: 'James Miller',
    newClient: 'Alice Cooper',
    transferDate: '2024-01-20',
    reason: 'Administrative Change',
    admin: 'Admin User',
    oldClientPhone: '+234 807 890 1234',
    newClientPhone: '+234 808 901 2345',
    marketer: 'Tom Wilson',
    transferFee: 400000
  }
];

export function TransferHistoryTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTransfers = mockTransferHistory.filter(transfer => {
    const matchesSearch = transfer.oldClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.newClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || transfer.project === projectFilter;
    const matchesReason = reasonFilter === 'all' || transfer.reason === reasonFilter;
    
    return matchesSearch && matchesProject && matchesReason;
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
      case 'Unit Resale':
        return 'bg-green-100 text-green-800';
      case 'Client Transfer':
        return 'bg-blue-100 text-blue-800';
      case 'Payment Default':
        return 'bg-red-100 text-red-800';
      case 'Administrative Change':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const projects = [...new Set(mockTransferHistory.map(t => t.project))];
  const reasons = [...new Set(mockTransferHistory.map(t => t.reason))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-purple-600" />
              <span>Transfer (Reallocation) History</span>
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
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transfer History Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit & Project</TableHead>
                <TableHead>Transfer Details</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Transfer Date</TableHead>
                <TableHead>Marketer</TableHead>
                <TableHead>Transfer Fee</TableHead>
                <TableHead>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transfer.unit}</div>
                      <div className="text-sm text-gray-500">{transfer.project}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="font-medium text-red-600">{transfer.oldClient}</div>
                        <div className="text-xs text-gray-500">{transfer.oldClientPhone}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="text-center">
                        <div className="font-medium text-green-600">{transfer.newClient}</div>
                        <div className="text-xs text-gray-500">{transfer.newClientPhone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getReasonColor(transfer.reason)}>
                      {transfer.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{transfer.transferDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{transfer.marketer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(transfer.transferFee)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{transfer.admin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTransfers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transfer history found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

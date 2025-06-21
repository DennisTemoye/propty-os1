
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Ban, Download, Filter, Search } from 'lucide-react';

const mockActiveAllocations = [
  {
    id: 1,
    clientName: 'John Doe',
    unit: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    status: 'allocated',
    paymentStatus: 'partial',
    allocationDate: '2024-01-15',
    totalAmount: 25000000,
    paidAmount: 15000000,
    marketer: 'Jane Smith'
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    unit: 'Block B - Plot 08',
    project: 'Emerald Heights',
    status: 'allocated',
    paymentStatus: 'completed',
    allocationDate: '2024-01-10',
    totalAmount: 30000000,
    paidAmount: 30000000,
    marketer: 'Mike Davis'
  },
  {
    id: 3,
    clientName: 'Robert Brown',
    unit: 'Block C - Plot 15',
    project: 'Golden View',
    status: 'offered',
    paymentStatus: 'pending',
    allocationDate: '2024-01-20',
    totalAmount: 22000000,
    paidAmount: 2200000,
    marketer: 'Sarah Johnson'
  },
  {
    id: 4,
    clientName: 'Alice Cooper',
    unit: 'Block A - Plot 12',
    project: 'Ocean Breeze',
    status: 'allocated',
    paymentStatus: 'partial',
    allocationDate: '2024-01-25',
    totalAmount: 28000000,
    paidAmount: 14000000,
    marketer: 'Tom Wilson'
  }
];

interface ActiveAllocationsTabProps {
  onRevoke: (allocation: any) => void;
}

export function ActiveAllocationsTab({ onRevoke }: ActiveAllocationsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredAllocations = mockActiveAllocations.filter(allocation => {
    const matchesSearch = allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || allocation.project === projectFilter;
    const matchesStatus = statusFilter === 'all' || allocation.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || allocation.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesProject && matchesStatus && matchesPayment;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allocated':
        return 'bg-green-100 text-green-800';
      case 'offered':
        return 'bg-yellow-100 text-yellow-800';
      case 'interested':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const projects = [...new Set(mockActiveAllocations.map(a => a.project))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Allocations</CardTitle>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="allocated">Allocated</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Allocation Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">{allocation.clientName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.unit}</div>
                      <div className="text-sm text-gray-500">via {allocation.marketer}</div>
                    </div>
                  </TableCell>
                  <TableCell>{allocation.project}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(allocation.status)}>
                      {allocation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(allocation.paymentStatus)}>
                      {allocation.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{allocation.allocationDate}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(allocation.totalAmount)}</div>
                      <div className="text-sm text-gray-500">
                        Paid: {formatCurrency(allocation.paidAmount)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {allocation.status === 'allocated' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onRevoke(allocation)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAllocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No allocations found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, DollarSign, Calendar, Building, Handshake } from 'lucide-react';

interface PendingAllocationsTabProps {
  onAllocate: (sale: any) => void;
}

const mockPendingSales = [
  {
    id: 1,
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    projectName: 'Victoria Gardens',
    saleAmount: '₦25M',
    initialPayment: '₦8M',
    saleDate: '2024-01-15',
    saleType: 'pre_allocation',
    marketer: 'Jane Smith',
    status: 'payment_verified',
    priority: 'high'
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    projectName: 'Emerald Heights',
    saleAmount: '₦30M',
    initialPayment: '₦10M',
    saleDate: '2024-01-20',
    saleType: 'pre_allocation',
    marketer: 'Mike Davis',
    status: 'documentation_pending',
    priority: 'medium'
  },
  {
    id: 3,
    clientName: 'Robert Brown',
    clientEmail: 'robert@example.com',
    projectName: 'Golden View',
    saleAmount: '₦22M',
    initialPayment: '₦7M',
    saleDate: '2024-01-25',
    saleType: 'pre_allocation',
    marketer: 'Sarah Johnson',
    status: 'ready_for_allocation',
    priority: 'high'
  },
  {
    id: 4,
    clientName: 'Alice Cooper',
    clientEmail: 'alice@example.com',
    projectName: 'Ocean Breeze',
    saleAmount: '₦28M',
    initialPayment: '₦9M',
    saleDate: '2024-01-30',
    saleType: 'pre_allocation',
    marketer: 'Tom Wilson',
    status: 'payment_pending',
    priority: 'low'
  },
  {
    id: 5,
    clientName: 'David Wilson',
    clientEmail: 'david@example.com',
    projectName: 'Victoria Gardens',
    saleAmount: '₦26M',
    initialPayment: '₦8.5M',
    saleDate: '2024-02-01',
    saleType: 'pre_allocation',
    marketer: 'Jane Smith',
    status: 'ready_for_allocation',
    priority: 'high'
  }
];

export function PendingAllocationsTab({ onAllocate }: PendingAllocationsTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_allocation':
        return 'bg-green-100 text-green-800';
      case 'payment_verified':
        return 'bg-blue-100 text-blue-800';
      case 'documentation_pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment_pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready_for_allocation':
        return 'Ready for Allocation';
      case 'payment_verified':
        return 'Payment Verified';
      case 'documentation_pending':
        return 'Documentation Pending';
      case 'payment_pending':
        return 'Payment Pending';
      default:
        return status;
    }
  };

  const canAllocate = (status: string) => {
    return status === 'ready_for_allocation' || status === 'payment_verified';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockPendingSales.length}
                </div>
                <div className="text-sm text-gray-600">Total Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Handshake className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mockPendingSales.filter(s => s.status === 'ready_for_allocation').length}
                </div>
                <div className="text-sm text-gray-600">Ready to Allocate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockPendingSales.filter(s => s.status === 'payment_pending').length}
                </div>
                <div className="text-sm text-gray-600">Payment Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {mockPendingSales.filter(s => s.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span>Sales Awaiting Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Sale Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Sale Date</TableHead>
                <TableHead>Marketer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPendingSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.clientName}</div>
                      <div className="text-sm text-gray-500">{sale.clientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{sale.projectName}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.saleAmount}</div>
                      <div className="text-sm text-gray-500">Paid: {sale.initialPayment}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sale.status)}>
                      {getStatusLabel(sale.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(sale.priority)}>
                      {sale.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.saleDate}</TableCell>
                  <TableCell>{sale.marketer}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onAllocate(sale)}
                        disabled={!canAllocate(sale.status)}
                        className={canAllocate(sale.status) ? 'text-blue-600 hover:text-blue-700' : ''}
                      >
                        <Handshake className="h-3 w-3 mr-1" />
                        Allocate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Building className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Allocation Process Information</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Ready for Allocation:</strong> Sales that have completed all requirements and can be allocated immediately</p>
                <p>• <strong>Payment Verified:</strong> Initial payment confirmed, pending final documentation</p>
                <p>• <strong>Documentation Pending:</strong> Additional client documentation required</p>
                <p>• <strong>Payment Pending:</strong> Awaiting payment verification or completion</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

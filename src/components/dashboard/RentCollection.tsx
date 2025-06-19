
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Search, Download, AlertCircle, CheckCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function RentCollection() {
  const [searchTerm, setSearchTerm] = useState('');

  const rentData = [
    {
      id: 1,
      tenant: 'John Smith',
      unit: '2A',
      amount: 1200,
      dueDate: '2024-12-01',
      status: 'Paid',
      paymentDate: '2024-11-30',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      tenant: 'Sarah Johnson',
      unit: '3B',
      amount: 950,
      dueDate: '2024-12-01',
      status: 'Pending',
      paymentDate: null,
      method: null
    },
    {
      id: 3,
      tenant: 'Mike Davis',
      unit: '1A',
      amount: 1100,
      dueDate: '2024-11-25',
      status: 'Overdue',
      paymentDate: null,
      method: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rent Collection</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">$15,200</div>
                <div className="text-sm text-gray-500">Collected This Month</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">$2,850</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">$1,100</div>
                <div className="text-sm text-gray-500">Overdue</div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-500">Collection Rate</div>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by tenant or unit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Rent Collection Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rent Collection Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentData.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell className="font-medium">{rent.tenant}</TableCell>
                  <TableCell>{rent.unit}</TableCell>
                  <TableCell className="font-medium">${rent.amount}</TableCell>
                  <TableCell>{rent.dueDate}</TableCell>
                  <TableCell>{rent.paymentDate || '-'}</TableCell>
                  <TableCell>{rent.method || '-'}</TableCell>
                  <TableCell>{getStatusBadge(rent.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {rent.status === 'Paid' ? (
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" size="sm">Record</Button>
                          <Button variant="outline" size="sm">Remind</Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

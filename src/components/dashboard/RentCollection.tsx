
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Search, Download, AlertCircle, CheckCircle, Bell, Receipt } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export function RentCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [rentData, setRentData] = useState([
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
    },
    {
      id: 4,
      tenant: 'Lisa Wong',
      unit: '2C',
      amount: 1350,
      dueDate: '2024-12-03',
      status: 'Pending',
      paymentDate: null,
      method: null
    }
  ]);

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

  const handleRecordPayment = (rentItem: any) => {
    setRentData(prev => prev.map(item => 
      item.id === rentItem.id 
        ? { ...item, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0], method: 'Cash' }
        : item
    ));
    
    toast({
      title: "Payment Recorded",
      description: `Payment of $${rentItem.amount} recorded for ${rentItem.tenant}`,
    });
  };

  const handleSendReminder = (rentItem: any) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${rentItem.tenant}`,
    });
    console.log('Sending reminder to:', rentItem);
  };

  const handleDownloadReceipt = (rentItem: any) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for ${rentItem.tenant} downloaded successfully`,
    });
    console.log('Downloading receipt for:', rentItem);
  };

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Rent collection data exported successfully",
    });
    console.log('Exporting rent collection data');
  };

  const handleAddPayment = () => {
    toast({
      title: "Add Payment",
      description: "Opening payment recording form",
    });
    console.log('Opening add payment modal');
  };

  const filteredRentData = rentData.filter(item =>
    item.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = rentData.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0);
  const totalPending = rentData.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0);
  const totalOverdue = rentData.filter(r => r.status === 'Overdue').reduce((sum, r) => sum + r.amount, 0);
  const collectionRate = Math.round((totalCollected / (totalCollected + totalPending + totalOverdue)) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rent Collection</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddPayment}>
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
                <div className="text-2xl font-bold text-green-600">${totalCollected.toLocaleString()}</div>
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
                <div className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</div>
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
                <div className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</div>
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
                <div className="text-2xl font-bold text-blue-600">{collectionRate}%</div>
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
              {filteredRentData.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell className="font-medium">{rent.tenant}</TableCell>
                  <TableCell>{rent.unit}</TableCell>
                  <TableCell className="font-medium">${rent.amount}</TableCell>
                  <TableCell>{rent.dueDate}</TableCell>
                  <TableCell>{rent.paymentDate || '-'}</TableCell>
                  <TableCell>{rent.method || '-'}</TableCell>
                  <TableCell>{getStatusBadge(rent.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {rent.status === 'Paid' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(rent)}
                          >
                            <Receipt className="h-3 w-3 mr-1" />
                            Receipt
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRecordPayment(rent)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Record
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendReminder(rent)}
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Remind
                          </Button>
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

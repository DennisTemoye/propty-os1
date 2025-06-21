
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Settings, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Receipt,
  FileText,
  Users
} from 'lucide-react';
import { FeeSetupModal } from './fees/FeeSetupModal';
import { PaymentCollectionModal } from './fees/PaymentCollectionModal';
import { FeeMonitoringDashboard } from './fees/FeeMonitoringDashboard';

const mockFeeData = [
  {
    id: 1,
    clientName: 'John Doe',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    feeType: 'Infrastructure Fee',
    amount: '₦5,000,000',
    status: 'Partially Paid',
    paid: '₦2,000,000',
    outstanding: '₦3,000,000',
    dueDate: '2024-02-15',
    lastPayment: '2024-01-15'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    project: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    feeType: 'Service Charge',
    amount: '₦50,000',
    status: 'Overdue',
    paid: '₦0',
    outstanding: '₦50,000',
    dueDate: '2024-01-30',
    lastPayment: null
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    project: 'Golden View',
    unit: 'Block C - Plot 05',
    feeType: 'Infrastructure Fee',
    amount: '₦4,500,000',
    status: 'Paid',
    paid: '₦4,500,000',
    outstanding: '₦0',
    dueDate: '2024-01-01',
    lastPayment: '2023-12-28'
  }
];

export function FeesCollection() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partially Paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partially Paid':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredFees = mockFeeData.filter(fee => {
    const matchesSearch = fee.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    const matchesProject = filterProject === 'all' || fee.project === filterProject;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const handleRecordPayment = (fee: any) => {
    setSelectedFee(fee);
    setIsPaymentModalOpen(true);
  };

  const totalOutstanding = mockFeeData.reduce((sum, fee) => {
    return sum + parseInt(fee.outstanding.replace(/[₦,]/g, ''));
  }, 0);

  const totalCollected = mockFeeData.reduce((sum, fee) => {
    return sum + parseInt(fee.paid.replace(/[₦,]/g, ''));
  }, 0);

  const overdueCount = mockFeeData.filter(fee => fee.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Collection</h1>
          <p className="text-gray-600 mt-1">Manage infrastructure fees, service charges, and post-sale financial obligations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isSetupModalOpen} onOpenChange={setIsSetupModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Setup Fee
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">₦{totalCollected.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Collected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">₦{totalOutstanding.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Outstanding</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
                <div className="text-sm text-gray-500">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{mockFeeData.length}</div>
                <div className="text-sm text-gray-500">Active Fees</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collection">Payment Collection</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring Dashboard</TabsTrigger>
          <TabsTrigger value="setup">Fee Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search fees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Victoria Gardens">Victoria Gardens</SelectItem>
                  <SelectItem value="Emerald Heights">Emerald Heights</SelectItem>
                  <SelectItem value="Golden View">Golden View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fees Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <div className="font-medium">{fee.clientName}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{fee.project}</div>
                          <div className="text-xs text-gray-500">{fee.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{fee.feeType}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{fee.amount}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(fee.status)}
                          <Badge className={getStatusColor(fee.status)}>
                            {fee.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={fee.outstanding !== '₦0' ? 'text-red-600 font-medium' : 'text-green-600'}>
                          {fee.outstanding}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={new Date(fee.dueDate) < new Date() && fee.status !== 'Paid' ? 'text-red-600' : ''}>
                          {fee.dueDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {fee.status !== 'Paid' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleRecordPayment(fee)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Record Payment
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <FileText className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collection">
          <PaymentCollectionModal />
        </TabsContent>

        <TabsContent value="monitoring">
          <FeeMonitoringDashboard />
        </TabsContent>

        <TabsContent value="setup">
          <div className="space-y-4">
            <Button 
              onClick={() => setIsSetupModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Setup New Fee Type
            </Button>
            {/* Fee setup content will be handled by the modal */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Fee Setup Modal */}
      <FeeSetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      {/* Payment Collection Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record Payment - {selectedFee?.clientName}</DialogTitle>
            <DialogDescription>
              Record a payment for {selectedFee?.feeType} - {selectedFee?.project}
            </DialogDescription>
          </DialogHeader>
          <PaymentCollectionModal 
            fee={selectedFee}
            onClose={() => setIsPaymentModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

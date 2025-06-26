
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Building, Users, TrendingUp, Plus, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecordSaleModal } from './sales-allocation/RecordSaleModal';
import { AllocateUnitModal } from './sales-allocation/AllocateUnitModal';
import { SystemNotifications } from './notifications/SystemNotifications';

const mockSalesData = [
  {
    id: 1,
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    saleType: 'post-allocation',
    amount: '₦25M',
    date: '2024-01-10',
    status: 'completed'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    projectName: 'Emerald Heights',
    unit: 'Pending Assignment',
    saleType: 'pre-allocation',
    amount: '₦30M',
    date: '2024-01-15',
    status: 'pending'
  }
];

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showRecordSaleModal, setShowRecordSaleModal] = useState(false);
  const [showAllocateUnitModal, setShowAllocateUnitModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowRecordSaleModal(true);
    }
  }, [location.pathname]);

  const handleRecordSale = (data: any) => {
    console.log('Recording sale:', data);
    // Sync with CRM, Clients, and Projects modules
    setShowRecordSaleModal(false);
    navigate('/company/sales');
  };

  const handleAllocateUnit = (data: any) => {
    console.log('Allocating unit:', data);
    // Sync with Projects and Clients modules
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSaleTypeColor = (type: string) => {
    return type === 'pre-allocation' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation</h1>
          <p className="text-gray-600 mt-1">Manage sales pipeline and unit allocations</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowAllocateUnitModal(true)}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Building className="h-4 w-4 mr-2" />
            Allocate Unit
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            onClick={() => setShowRecordSaleModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Sale
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Sales</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-gray-500">Units Allocated</div>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-500">Active Clients</div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">23%</div>
                <div className="text-sm text-gray-500">Growth Rate</div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Sales Overview</TabsTrigger>
          <TabsTrigger value="allocations">Unit Allocations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Sale Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.projectName}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSaleTypeColor(sale.saleType)}>
                          {sale.saleType === 'pre-allocation' ? 'Pre-Allocation' : 'Post-Allocation'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{sale.amount}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Allocation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Allocations</h3>
                <p className="text-gray-500 mb-4">Start by recording a sale or allocating a unit to a client</p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setShowRecordSaleModal(true)}>
                    Record Sale
                  </Button>
                  <Button variant="outline" onClick={() => setShowAllocateUnitModal(true)}>
                    Allocate Unit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <RecordSaleModal 
        isOpen={showRecordSaleModal}
        onClose={() => {
          setShowRecordSaleModal(false);
          navigate('/company/sales');
        }}
        onSubmit={handleRecordSale}
      />

      <AllocateUnitModal 
        isOpen={showAllocateUnitModal}
        onClose={() => setShowAllocateUnitModal(false)}
        onSubmit={handleAllocateUnit}
      />

      <SystemNotifications 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNotificationClick={(notification) => {
          console.log('Notification clicked:', notification);
          setShowNotifications(false);
        }}
      />
    </div>
  );
}

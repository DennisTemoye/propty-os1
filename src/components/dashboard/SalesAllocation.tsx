import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, FileText, Users, TrendingUp, Plus, Eye, Edit, Ban } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UnifiedSalesForm } from './sales/UnifiedSalesForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { UpdateAllocationStatusModal } from './forms/UpdateAllocationStatusModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';

const mockSalesData = [
  {
    id: 1,
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    salesType: 'instant-allocation',
    status: 'allocated',
    price: '₦25M',
    date: '2024-01-10',
    totalPaid: '₦15M'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    projectName: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    salesType: 'sales-offer',
    status: 'offered',
    price: '₦30M',
    date: '2024-01-15',
    totalPaid: '₦5M'
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    projectName: 'Golden View',
    unit: 'Block C - Plot 05',
    salesType: 'reservation',
    status: 'reserved',
    price: '₦20M',
    date: '2024-01-20',
    totalPaid: '₦2M'
  }
];

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewSalesForm, setShowNewSalesForm] = useState(false);
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if we're on the /new route
  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowNewSalesForm(true);
    }
  }, [location.pathname]);

  const handleNewSale = () => {
    navigate('/company/sales/new');
    setShowNewSalesForm(true);
  };

  const handleSalesSubmit = (data: any) => {
    console.log('Processing sale:', data);
    setShowNewSalesForm(false);
    navigate('/company/sales');
  };

  const handleUpdateStatus = (sale: any) => {
    setSelectedSale(sale);
    setShowUpdateStatusModal(true);
  };

  const handleRevokeSale = (sale: any) => {
    setSelectedSale(sale);
    setShowRevokeModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      case 'offered':
        return 'bg-yellow-100 text-yellow-800';
      case 'allocated':
        return 'bg-green-100 text-green-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSalesTypeColor = (type: string) => {
    switch (type) {
      case 'instant-allocation':
        return 'bg-green-100 text-green-800';
      case 'sales-offer':
        return 'bg-purple-100 text-purple-800';
      case 'reservation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showNewSalesForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Record New Sale</h1>
            <p className="text-gray-600 mt-1">Create a unified sales record with smart allocation</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowNewSalesForm(false);
              navigate('/company/sales');
            }}
          >
            Back to Sales
          </Button>
        </div>
        <UnifiedSalesForm 
          onSubmit={handleSalesSubmit}
          onCancel={() => {
            setShowNewSalesForm(false);
            navigate('/company/sales');
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation</h1>
          <p className="text-gray-600 mt-1">Unified sales pipeline with smart allocation management</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleNewSale}>
          <Plus className="h-4 w-4 mr-2" />
          Record Sale
        </Button>
      </div>

      {/* Updated Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockSalesData.filter(s => s.status === 'reserved').length}
                </div>
                <div className="text-sm text-gray-500">Reservations</div>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockSalesData.filter(s => s.status === 'offered').length}
                </div>
                <div className="text-sm text-gray-500">Offers</div>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mockSalesData.filter(s => s.status === 'allocated').length}
                </div>
                <div className="text-sm text-gray-500">Allocated</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">₦75M</div>
                <div className="text-sm text-gray-500">Total Sales Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">All Sales</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="allocations">Allocations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Sales Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Sales Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.projectName}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSalesTypeColor(sale.salesType)}>
                          {sale.salesType.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.price}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(sale)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRevokeSale(sale)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Ban className="h-3 w-3" />
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

        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.filter(s => s.salesType === 'reservation').map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.projectName}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(sale)}
                          >
                            <Edit className="h-3 w-3" />
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

        <TabsContent value="offers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.filter(s => s.salesType === 'sales-offer').map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.projectName}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.price}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(sale)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRevokeSale(sale)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Ban className="h-3 w-3" />
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

        <TabsContent value="allocations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.filter(s => s.salesType === 'instant-allocation').map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.projectName}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.price}</TableCell>
                      <TableCell>{sale.totalPaid}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(sale)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRevokeSale(sale)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Ban className="h-3 w-3" />
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
      </Tabs>

      {/* Modals */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocate={() => {}}
      />

      <UpdateAllocationStatusModal 
        isOpen={showUpdateStatusModal}
        onClose={() => setShowUpdateStatusModal(false)}
        allocation={selectedSale}
        onUpdate={() => {}}
      />

      <RevokeAllocationModal 
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        allocation={selectedSale}
        onRevoke={() => {}}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Handshake, DollarSign, FileText, Users, TrendingUp, ArrowRight, History, Edit, Ban, Clock, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { ReallocationHistory } from './ReallocationHistory';
import { UpdateAllocationStatusModal } from './forms/UpdateAllocationStatusModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { PendingAllocationsTab } from './allocation/PendingAllocationsTab';
import { SystemNotifications } from './notifications/SystemNotifications';

const mockAllocations = [
  {
    id: 1,
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    status: 'allocated',
    allocationType: 'sale',
    price: '₦25M',
    date: '2024-01-10',
    totalPaid: '₦15M'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    projectName: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    status: 'offered',
    allocationType: 'sale',
    price: '₦30M',
    date: '2024-01-15',
    totalPaid: '₦5M'
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    projectName: 'Golden View',
    unit: 'Block C - Plot 05',
    status: 'interested',
    allocationType: 'reservation',
    price: '₦20M',
    date: '2024-01-20',
    totalPaid: '₦2M'
  }
];

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewAllocationForm, setShowNewAllocationForm] = useState(false);
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Check if we're on the /new route
  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowNewAllocationForm(true);
    }
  }, [location.pathname]);

  const handleNewAllocation = () => {
    navigate('/company/sales-allocations/new');
    setShowNewAllocationForm(true);
  };

  const handleReallocation = (data: any) => {
    console.log('Processing reallocation:', data);
  };

  const handleUpdateStatus = (allocation: any) => {
    setSelectedAllocation(allocation);
    setShowUpdateStatusModal(true);
  };

  const handleRevokeAllocation = (allocation: any) => {
    setSelectedAllocation(allocation);
    setShowRevokeModal(true);
  };

  const handleStatusUpdate = (updatedAllocation: any) => {
    console.log('Status updated:', updatedAllocation);
    // Update the allocation in your state/backend
  };

  const handleRevocation = (revocationData: any) => {
    console.log('Processing revocation:', revocationData);
    // Process revocation and refund
  };

  const handlePendingAllocation = (sale: any) => {
    console.log('Processing pending allocation:', sale);
    // Handle the allocation process for pending sales
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested':
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

  if (showNewAllocationForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Allocation</h1>
            <p className="text-gray-600 mt-1">Allocate a unit to a client</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowNewAllocationForm(false);
              navigate('/company/sales');
            }}
          >
            Back to Sales
          </Button>
        </div>
        <NewAllocationForm onClose={() => {
          setShowNewAllocationForm(false);
          navigate('/company/sales');
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation</h1>
          <p className="text-gray-600 mt-1">Manage your sales pipeline, allocations, and reallocations</p>
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
            onClick={() => setShowReallocationModal(true)}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Re-allocate Unit
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleNewAllocation}>
            <Handshake className="h-4 w-4 mr-2" />
            New Allocation
          </Button>
        </div>
      </div>

      {/* Updated Stats Cards with new statuses */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockAllocations.filter(a => a.status === 'interested').length}
                </div>
                <div className="text-sm text-gray-500">Interested</div>
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
                  {mockAllocations.filter(a => a.status === 'offered').length}
                </div>
                <div className="text-sm text-gray-500">Offered</div>
              </div>
              <Handshake className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mockAllocations.filter(a => a.status === 'allocated').length}
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
                <div className="text-2xl font-bold text-orange-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Sales</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-500">Revoked</div>
              </div>
              <Ban className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-500">Pending Approval</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocations">Active Allocations</TabsTrigger>
          <TabsTrigger value="history">Reallocation History</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Approvals
            <Badge className="ml-2 bg-yellow-600 text-white text-xs">3</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Contacted', 'Inspection', 'Offer', 'Payment', 'Closed'].map((stage, index) => (
                  <div key={stage} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 mb-2">
                      <div className="text-2xl font-bold text-gray-800">{12 - index * 2}</div>
                      <div className="text-sm text-gray-600">{stage}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((12 - index * 2) / 45 * 100)}% of total
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity with clickable items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100"
                  onClick={() => navigate('/company/clients/1')}
                >
                  <div>
                    <div className="font-medium">Unit A-15 Allocated</div>
                    <div className="text-sm text-gray-600">Client: John Doe - Victoria Gardens</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div 
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100"
                  onClick={() => navigate('/company/clients/2')}
                >
                  <div>
                    <div className="font-medium">Payment Pending</div>
                    <div className="text-sm text-gray-600">Client: Jane Smith - ₦3.2M due</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
                <div 
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100"
                >
                  <div>
                    <div className="font-medium">Unit Re-allocated</div>
                    <div className="text-sm text-gray-600">Block A - Plot 02 transferred to John Doe</div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Re-allocated</Badge>
                </div>
              </div>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAllocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell>{allocation.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{allocation.projectName}</div>
                          <div className="text-sm text-gray-500">{allocation.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(allocation.status)}>
                          {allocation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{allocation.allocationType}</TableCell>
                      <TableCell>{allocation.price}</TableCell>
                      <TableCell>{allocation.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStatus(allocation)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          {allocation.status === 'allocated' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRevokeAllocation(allocation)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Ban className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <ReallocationHistory />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <PendingAllocationsTab onAllocate={handlePendingAllocation} />
        </TabsContent>
      </Tabs>

      {/* Reallocation Modal */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocate={handleReallocation}
      />

      {/* Update Status Modal */}
      <UpdateAllocationStatusModal 
        isOpen={showUpdateStatusModal}
        onClose={() => setShowUpdateStatusModal(false)}
        allocation={selectedAllocation}
        onUpdate={handleStatusUpdate}
      />

      {/* Revoke Allocation Modal */}
      <RevokeAllocationModal 
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        allocation={selectedAllocation}
        onRevoke={handleRevocation}
      />

      {/* System Notifications */}
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

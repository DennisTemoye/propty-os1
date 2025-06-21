import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Handshake, DollarSign, FileText, Users, TrendingUp, ArrowRight, History, XCircle, Edit } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { UpdateAllocationStatusModal } from './allocation/UpdateAllocationStatusModal';
import { AllocationStatusBadge } from './allocation/AllocationStatusBadge';
import { ReallocationHistory } from './ReallocationHistory';
import { AllocationStatus, RevocationData } from '@/types/allocation';

// Mock data with allocation statuses
const mockAllocations = [
  {
    id: 1,
    client: { name: 'John Doe', id: 1 },
    project: { name: 'Victoria Gardens', id: 1 },
    unit: { plotId: 'Block A - Plot 02', id: 1 },
    status: 'allocated' as AllocationStatus,
    assignedDate: '2024-01-10',
    price: '₦25,000,000',
    totalPaid: '₦15,000,000',
    balance: '₦10,000,000',
    paymentProgress: 60
  },
  {
    id: 2,
    client: { name: 'Jane Smith', id: 2 },
    project: { name: 'Emerald Heights', id: 2 },
    unit: { plotId: 'Block B - Plot 12', id: 2 },
    status: 'offered' as AllocationStatus,
    assignedDate: '2024-01-15',
    price: '₦18,000,000',
    totalPaid: '₦2,000,000',
    balance: '₦16,000,000',
    paymentProgress: 11
  },
  {
    id: 3,
    client: { name: 'Mike Johnson', id: 3 },
    project: { name: 'Golden View', id: 3 },
    unit: { plotId: 'Block C - Plot 05', id: 3 },
    status: 'interested' as AllocationStatus,
    assignedDate: '2024-01-20',
    price: '₦22,000,000',
    totalPaid: '₦0',
    balance: '₦22,000,000',
    paymentProgress: 0
  }
];

export function SalesAllocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewAllocationForm, setShowNewAllocationForm] = useState(false);
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [allocations, setAllocations] = useState(mockAllocations);

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
    // Here you would typically update your backend/state management
    // For now, we'll just log the data
  };

  const handleRevokeAllocation = (allocation: any) => {
    setSelectedAllocation(allocation);
    setShowRevokeModal(true);
  };

  const handleUpdateStatus = (allocation: any) => {
    setSelectedAllocation(allocation);
    setShowStatusUpdateModal(true);
  };

  const handleRevocationSubmit = (data: RevocationData) => {
    console.log('Processing revocation:', data);
    // Update allocation status and create revocation record
    setAllocations(prev => prev.filter(a => a.id !== selectedAllocation.id));
    setShowRevokeModal(false);
    setSelectedAllocation(null);
  };

  const handleStatusUpdate = (newStatus: AllocationStatus, notes?: string) => {
    console.log('Updating status:', { newStatus, notes });
    setAllocations(prev => 
      prev.map(a => 
        a.id === selectedAllocation.id 
          ? { ...a, status: newStatus, lastUpdated: new Date().toISOString() }
          : a
      )
    );
    setShowStatusUpdateModal(false);
    setSelectedAllocation(null);
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

      {/* Stats Cards with Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {allocations.filter(a => a.status === 'interested').length}
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
                <div className="text-2xl font-bold text-orange-600">
                  {allocations.filter(a => a.status === 'offered').length}
                </div>
                <div className="text-sm text-gray-500">Offered</div>
              </div>
              <Handshake className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {allocations.filter(a => a.status === 'allocated').length}
                </div>
                <div className="text-sm text-gray-500">Allocated</div>
              </div>
              <Handshake className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Sales</div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">5</div>
                <div className="text-sm text-gray-500">Revoked</div>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocations">Active Allocations</TabsTrigger>
          <TabsTrigger value="history">History & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['interested', 'offered', 'allocated'].map((status) => {
                  const count = allocations.filter(a => a.status === status).length;
                  return (
                    <div key={status} className="text-center">
                      <div className="bg-gray-100 rounded-lg p-4 mb-2">
                        <div className="text-2xl font-bold text-gray-800">{count}</div>
                        <AllocationStatusBadge status={status as AllocationStatus} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Math.round((count / allocations.length) * 100)}% of total
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocations.slice(0, 3).map((allocation) => (
                  <div 
                    key={allocation.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/company/clients/${allocation.client.id}`)}
                  >
                    <div>
                      <div className="font-medium">{allocation.unit.plotId}</div>
                      <div className="text-sm text-gray-600">
                        Client: {allocation.client.name} - {allocation.project.name}
                      </div>
                    </div>
                    <AllocationStatusBadge status={allocation.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Allocations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.client.name}</TableCell>
                      <TableCell>{allocation.project.name}</TableCell>
                      <TableCell>{allocation.unit.plotId}</TableCell>
                      <TableCell>
                        <AllocationStatusBadge status={allocation.status} />
                      </TableCell>
                      <TableCell>{allocation.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${allocation.paymentProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{allocation.paymentProgress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateStatus(allocation)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Status
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRevokeAllocation(allocation)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Revoke
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

        <TabsContent value="history" className="space-y-6">
          <ReallocationHistory />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocation={() => {}}
      />

      <RevokeAllocationModal
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        allocation={selectedAllocation}
        onRevoke={handleRevocationSubmit}
      />

      <UpdateAllocationStatusModal
        isOpen={showStatusUpdateModal}
        onClose={() => setShowStatusUpdateModal(false)}
        allocation={selectedAllocation}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

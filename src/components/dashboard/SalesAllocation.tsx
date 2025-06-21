
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Handshake, DollarSign, FileText, Users, TrendingUp, ArrowRight, History, Edit, Trash2, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { UpdateAllocationStatusModal } from './forms/UpdateAllocationStatusModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { ReallocationHistory } from './ReallocationHistory';

const statusColors = {
  'interested': 'bg-blue-100 text-blue-800',
  'offered': 'bg-orange-100 text-orange-800',
  'allocated': 'bg-green-100 text-green-800',
  'revoked': 'bg-red-100 text-red-800'
};

// Mock data with status field
const mockAllocations = [
  {
    id: 1,
    clientName: 'John Doe',
    unit: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    amount: '₦25,000,000',
    status: 'allocated',
    date: '2024-01-15',
    lastUpdated: '2024-01-20'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    unit: 'Block B - Plot 08',
    project: 'Golden View Towers',
    amount: '₦30,000,000',
    status: 'offered',
    date: '2024-01-10',
    lastUpdated: '2024-01-18'
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    unit: 'Block C - Plot 15',
    project: 'Emerald Heights',
    amount: '₦22,000,000',
    status: 'interested',
    date: '2024-01-20',
    lastUpdated: '2024-01-22'
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
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleStatusUpdate = (data: any) => {
    console.log('Status updated:', data);
    // Here you would update your state management/backend
  };

  const handleRevocation = (data: any) => {
    console.log('Allocation revoked:', data);
    // Here you would update your state management/backend
  };

  // Filter allocations by status
  const filteredAllocations = mockAllocations.filter(allocation => 
    statusFilter === 'all' || allocation.status === statusFilter
  );

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

      {/* Stats Cards with status breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
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
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-500">Offered</div>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">23</div>
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
                <div className="text-2xl font-bold text-red-600">2</div>
                <div className="text-sm text-gray-500">Revoked</div>
              </div>
              <ArrowRight className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocations">Current Allocations</TabsTrigger>
          <TabsTrigger value="history">Reallocation History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { stage: 'Interested', count: 12, color: 'blue' },
                  { stage: 'Offered', count: 8, color: 'orange' },
                  { stage: 'Allocated', count: 23, color: 'green' },
                  { stage: 'Revoked', count: 2, color: 'red' }
                ].map((stage, index) => (
                  <div key={stage.stage} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 mb-2">
                      <div className={`text-2xl font-bold text-${stage.color}-600`}>{stage.count}</div>
                      <div className="text-sm text-gray-600">{stage.stage}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((stage.count / 45) * 100)}% of total
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
              <div className="flex items-center justify-between">
                <CardTitle>Current Allocations</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="interested">Interested</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                      <SelectItem value="allocated">Allocated</SelectItem>
                      <SelectItem value="revoked">Revoked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.clientName}</TableCell>
                      <TableCell>{allocation.unit}</TableCell>
                      <TableCell>{allocation.project}</TableCell>
                      <TableCell className="font-medium text-purple-600">{allocation.amount}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[allocation.status as keyof typeof statusColors]}>
                          {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{allocation.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(allocation)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                          {allocation.status === 'allocated' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeAllocation(allocation)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
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
      </Tabs>

      {/* Modals */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocation={handleReallocation}
      />

      <UpdateAllocationStatusModal
        isOpen={showUpdateStatusModal}
        onClose={() => setShowUpdateStatusModal(false)}
        allocation={selectedAllocation}
        onStatusUpdate={handleStatusUpdate}
      />

      <RevokeAllocationModal
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        allocation={selectedAllocation}
        onRevoke={handleRevocation}
      />
    </div>
  );
}

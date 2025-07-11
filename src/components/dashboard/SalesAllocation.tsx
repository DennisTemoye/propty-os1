import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Handshake, DollarSign, FileText, Users, TrendingUp, ArrowRight, History, Edit, Ban, Clock, Bell, Plus, Building, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { HistoryTab } from './sales-allocation/HistoryTab';
import { UpdateAllocationStatusModal } from './forms/UpdateAllocationStatusModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { PendingAllocationsTab } from './allocation/PendingAllocationsTab';
import { PendingOffersTab } from './allocation/PendingOffersTab';
import { OverviewTab } from './sales-allocation/OverviewTab';
import { PendingApprovalsTab } from './sales-allocation/PendingApprovalsTab';
import { SystemNotifications } from './notifications/SystemNotifications';
import { RecordSaleModal } from './sales-allocation/RecordSaleModal';
import { SalesPipelineBoard } from './sales-allocation/SalesPipelineBoard';
import { AllocationFlowModal } from './sales-allocation/AllocationFlowModal';
import { toast } from 'sonner';

const mockAllocations = [
  {
    id: 1,
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    plotNumber: 'Block A - Plot 02',
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
    plotNumber: 'Block B - Plot 12',
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
    plotNumber: 'Block C - Plot 05',
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
  const [activeTab, setActiveTab] = useState('history');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRecordSaleModal, setShowRecordSaleModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  
  const { labels } = useProjectTerminology({ terminologyType: 'plots' });

  // Check if we're on the /new route
  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setShowNewAllocationForm(true);
    }
  }, [location.pathname]);

  const handleRecordSale = (data: any) => {
    // Add to sales records with proper validation
    const saleRecord = {
      ...data,
      id: Date.now(),
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      reference: `SALE-${Date.now()}`
    };
    toast.success(`Sale recorded successfully for ${data.clientName || 'client'}`);
    setShowRecordSaleModal(false);
  };

  const handleManageAllocations = () => {
    setShowAllocationModal(true);
  };

  const handleAllocationAction = (data: any) => {
    // Process allocation with proper logic
    const allocation = {
      ...data,
      id: Date.now(),
      status: 'pending_approval',
      date: new Date().toISOString().split('T')[0],
      reference: `ALLOC-${Date.now()}`
    };
    toast.success(`Allocation created successfully for ${data.projectName || 'project'}`);
    setShowAllocationModal(false);
  };

  const handleReallocation = (data: any) => {
    // Process reallocation with validation
    const reallocation = {
      ...data,
      id: Date.now(),
      status: 'reallocated',
      date: new Date().toISOString().split('T')[0],
      reference: `REALLOC-${Date.now()}`
    };
    toast.success(`Unit reallocated successfully`);
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
    // Update allocation status with proper state management
    toast.success(`Status updated to ${updatedAllocation.status}`);
    setShowUpdateStatusModal(false);
    setSelectedAllocation(null);
  };

  const handleRevocation = (revocationData: any) => {
    // Process revocation with refund calculation
    const refundAmount = revocationData.refundAmount || 0;
    toast.success(`Allocation revoked successfully. Refund of ₦${refundAmount.toLocaleString()} processed.`);
    setShowRevokeModal(false);
    setSelectedAllocation(null);
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
            <p className="text-gray-600 mt-1">{labels.allocateUnit.toLowerCase()} to a client</p>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Sales & Allocation</h1>
          <p className="text-muted-foreground mt-1">Manage your sales pipeline, allocations, and reallocations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => setShowRecordSaleModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Sale
          </Button>
          <Button 
            onClick={handleManageAllocations}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Handshake className="h-4 w-4 mr-2" />
            Manage Allocations
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative bg-gradient-to-r from-background to-muted hover:shadow-lg transition-all duration-300"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-destructive to-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center shadow-sm">
              3
            </Badge>
          </Button>
        </div>
      </div>

      {/* Main KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {mockAllocations.filter(a => a.status === 'allocated').length}
                </div>
                <div className="text-sm text-muted-foreground">{labels.allocatedUnits}</div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Growing steadily
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-100 shadow-sm">
                <Building className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-emerald-600">₦2.4B</div>
                <div className="text-sm text-muted-foreground">Total Sales Value</div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Strong performance
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-100 shadow-sm">
                <DollarSign className="h-6 w-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-amber-600">23</div>
                <div className="text-sm text-muted-foreground">Pending Offers</div>
                <div className="text-xs text-red-600 mt-1">5 need attention</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-100 shadow-sm">
                <Clock className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">45</div>
                <div className="text-sm text-muted-foreground">Monthly Completions</div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Above target
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-100 shadow-sm">
                <CheckCircle className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending-offers" className="relative">
            Pending Offers
            <Badge className="ml-2 bg-amber-600 text-white text-xs">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending-allocations" className="relative">
            Pending Allocations
            <Badge className="ml-2 bg-orange-600 text-white text-xs">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending-approvals" className="relative">
            Pending Approvals
            <Badge className="ml-2 bg-yellow-600 text-white text-xs">2</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <SalesPipelineBoard 
            onViewDetails={(entry) => {
              // Navigate to detailed view
              navigate(`/company/clients/${entry.clientId || entry.id}`);
            }}
            onAllocatePlot={(entry) => {
              setShowAllocationModal(true);
              toast.info(`Preparing allocation for ${entry.clientName || 'client'}`);
            }}
            onMoveToStage={(entryId, newStage) => {
              toast.success(`Moved entry to ${newStage} stage`);
            }}
          />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="pending-allocations" className="space-y-6">
          <PendingAllocationsTab />
        </TabsContent>

        <TabsContent value="pending-approvals" className="space-y-6">
          <PendingApprovalsTab 
            onApprove={(allocationId, otpCode) => {
              toast.success(`Allocation ${allocationId} approved successfully`);
            }}
            onDecline={(allocationId, reason) => {
              toast.info(`Allocation ${allocationId} declined. Reason: ${reason}`);
            }}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistoryTab onRevoke={handleRevokeAllocation} />
        </TabsContent>

        <TabsContent value="pending-offers" className="space-y-6">
          <PendingOffersTab />
        </TabsContent>
      </Tabs>

      {/* Record Sale Modal */}
      <RecordSaleModal 
        isOpen={showRecordSaleModal}
        onClose={() => setShowRecordSaleModal(false)}
        onSubmit={handleRecordSale}
      />

      {/* Allocation Flow Modal */}
      <AllocationFlowModal 
        isOpen={showAllocationModal}
        onClose={() => setShowAllocationModal(false)}
        onSubmit={handleAllocationAction}
      />

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
          // Handle notification click with proper navigation
          if (notification.type.includes('allocation')) {
            navigate('/company/sales');
          } else if (notification.type.includes('offer')) {
            navigate('/company/sales');
          } else {
            navigate('/company/accounting');
          }
          setShowNotifications(false);
        }}
      />
    </div>
  );
}

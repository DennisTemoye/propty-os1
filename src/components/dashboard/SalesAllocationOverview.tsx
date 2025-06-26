import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Handshake,
  TrendingUp,
  Building,
  Clock,
  Bell,
  Users,
  CheckCircle
} from 'lucide-react';
import { OverviewTab } from './sales-allocation/OverviewTab';
import { HistoryTab } from './sales-allocation/HistoryTab';
import { SalesFlowModal } from './sales-allocation/SalesFlowModal';
import { AllocationFlowModal } from './sales-allocation/AllocationFlowModal';
import { PendingAllocationsTab } from './allocation/PendingAllocationsTab';
import { PendingApprovalsTab } from './sales-allocation/PendingApprovalsTab';
import { SystemNotifications } from './notifications/SystemNotifications';
import { toast } from 'sonner';

export function SalesAllocationOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Global state for synchronization - no duplicates
  const [pendingAllocationsCount, setPendingAllocationsCount] = useState(3); // Sales awaiting allocation
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(2); // Allocations pending approval

  const handleRecordSale = (data: any) => {
    console.log('Recording sale:', data);
    
    // Only presales go to pending allocations
    if (data.salesType === 'presale') {
      setPendingAllocationsCount(prev => prev + 1);
      toast.success('Presale recorded! Client added to allocation queue.');
    } else {
      // Sales with immediate allocation go directly to pending approvals
      setPendingApprovalsCount(prev => prev + 1);
      toast.success('Sale with allocation recorded and sent for approval!');
    }
  };

  const handleAllocationAction = (data: any) => {
    console.log('Processing allocation action:', data);
    
    // All allocation actions go to pending approval
    setPendingApprovalsCount(prev => prev + 1);
    toast.success('Allocation action submitted for approval!');
  };

  const handlePendingAllocation = (data: any) => {
    console.log('Processing pending allocation:', data);
    
    // Move from pending allocations to pending approvals
    setPendingAllocationsCount(prev => Math.max(0, prev - 1));
    setPendingApprovalsCount(prev => prev + 1);
    
    toast.success('Allocation initiated and sent for approval!');
  };

  const handleApprovalAction = (allocationId: string, action: 'approve' | 'decline') => {
    console.log(`${action} allocation:`, allocationId);
    
    // Decrease pending approvals count
    setPendingApprovalsCount(prev => Math.max(0, prev - 1));
    
    if (action === 'approve') {
      toast.success('Allocation approved successfully!');
    } else {
      toast.success('Allocation declined and team member has been notified.');
    }
  };

  const kpiData = [
    {
      title: 'Total Sales',
      value: '₦4.2B',
      subtitle: 'This year',
      icon: DollarSign,
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Active Allocations',
      value: '156',
      subtitle: 'Current allocations',
      icon: Building,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Pending Sales',
      value: pendingAllocationsCount.toString(),
      subtitle: 'Awaiting allocation',
      icon: Clock,
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Completed This Month',
      value: '45',
      subtitle: 'Sales + Allocations',
      icon: CheckCircle,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocations</h1>
          <p className="text-gray-600 mt-1">Manage sales documentation and unit allocations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            {(pendingApprovalsCount > 0) && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                {pendingApprovalsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500 mb-2">{kpi.subtitle}</div>
                  <Badge 
                    variant="outline" 
                    className={kpi.changeType === 'positive' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                  >
                    {kpi.change} from last period
                  </Badge>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300 bg-green-50">
          <CardContent className="p-6">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowSalesModal(true)}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Record Sale
            </Button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Document property sales with or without unit allocation
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300 bg-blue-50">
          <CardContent className="p-6">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowAllocationModal(true)}
            >
              <Handshake className="h-4 w-4 mr-2" />
              Manage Allocation
            </Button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Handle unit allocations, reallocations, and revocations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Allocations
            {pendingAllocationsCount > 0 && (
              <Badge className="ml-2 bg-orange-600 text-white text-xs">
                {pendingAllocationsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approvals" className="relative">
            Pending Approvals
            {pendingApprovalsCount > 0 && (
              <Badge className="ml-2 bg-yellow-600 text-white text-xs">
                {pendingApprovalsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <PendingAllocationsTab 
            onAllocate={handlePendingAllocation}
          />
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <PendingApprovalsTab 
            onApprove={(allocationId, otpCode) => handleApprovalAction(allocationId, 'approve')}
            onDecline={(allocationId, reason) => handleApprovalAction(allocationId, 'decline')}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <SalesFlowModal 
        isOpen={showSalesModal}
        onClose={() => setShowSalesModal(false)}
        onSubmit={handleRecordSale}
      />

      <AllocationFlowModal 
        isOpen={showAllocationModal}
        onClose={() => setShowAllocationModal(false)}
        onSubmit={handleAllocationAction}
      />

      <SystemNotifications 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNotificationClick={(notification) => {
          console.log('Notification clicked:', notification);
          setShowNotifications(false);
          // Navigate to relevant tab based on notification
          if (notification.type === 'allocation_pending') {
            setActiveTab('approvals');
          }
        }}
      />
    </div>
  );
}

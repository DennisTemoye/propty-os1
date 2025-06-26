
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Handshake,
  ArrowRight, 
  Ban, 
  TrendingUp,
  Bell,
  FileText,
  Clock
} from 'lucide-react';
import { OverviewTab } from './sales-allocation/OverviewTab';
import { SalesPipelineTab } from './sales-allocation/SalesPipelineTab';
import { HistoryTab } from './sales-allocation/HistoryTab';
import { RecordSaleModal } from './sales-allocation/RecordSaleModal';
import { AllocationFlowModal } from './sales-allocation/AllocationFlowModal';
import { PendingAllocationsTab } from './allocation/PendingAllocationsTab';
import { SystemNotifications } from './notifications/SystemNotifications';

export function SalesAllocationOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRecordSaleModal, setShowRecordSaleModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [allocationModalType, setAllocationModalType] = useState<'new' | 'reallocate' | 'revoke'>('new');
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRecordSale = (data: any) => {
    console.log('Recording sale:', data);
    // Sales are now recorded independently of allocations
    // They can be pre-sales or sales with allocation
  };

  const handleAllocationFlow = (type: 'new' | 'reallocate' | 'revoke', allocation?: any) => {
    setAllocationModalType(type);
    setSelectedAllocation(allocation || null);
    setShowAllocationModal(true);
  };

  const handleAllocationAction = (data: any) => {
    console.log(`Processing ${allocationModalType}:`, data);
    // Handle different allocation types
    switch (allocationModalType) {
      case 'new':
        console.log('New allocation created');
        break;
      case 'reallocate':
        console.log('Unit reallocated');
        break;
      case 'revoke':
        console.log('Allocation revoked');
        break;
    }
  };

  const quickActions = [
    {
      title: 'Record Sale',
      description: 'Document a property sale (with or without allocation)',
      icon: DollarSign,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => setShowRecordSaleModal(true)
    },
    {
      title: 'New Allocation',
      description: 'Allocate a unit to a client',
      icon: Handshake,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => handleAllocationFlow('new')
    },
    {
      title: 'Re-allocate Unit',
      description: 'Transfer unit to another client',
      icon: ArrowRight,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => handleAllocationFlow('reallocate')
    },
    {
      title: 'Revoke Allocation',
      description: 'Cancel allocation and process refund',
      icon: Ban,
      color: 'bg-red-600 hover:bg-red-700',
      onClick: () => handleAllocationFlow('revoke')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation Management</h1>
          <p className="text-gray-600 mt-1">Professional sales documentation and allocation management</p>
        </div>
        
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Button 
                className={`w-full ${action.color} text-white`}
                onClick={action.onClick}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.title}
              </Button>
              <p className="text-sm text-gray-600 mt-2 text-center">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Allocations
            <Badge className="ml-2 bg-yellow-600 text-white text-xs">5</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <SalesPipelineTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistoryTab onRevoke={(allocation) => handleAllocationFlow('revoke', allocation)} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <PendingAllocationsTab 
            onAllocate={(sale) => handleAllocationFlow('new', sale)}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <RecordSaleModal 
        isOpen={showRecordSaleModal}
        onClose={() => setShowRecordSaleModal(false)}
        onSubmit={handleRecordSale}
      />

      <AllocationFlowModal 
        isOpen={showAllocationModal}
        onClose={() => setShowAllocationModal(false)}
        type={allocationModalType}
        allocation={selectedAllocation}
        onSubmit={handleAllocationAction}
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

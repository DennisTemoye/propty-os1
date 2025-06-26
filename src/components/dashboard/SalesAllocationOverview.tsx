
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Handshake, 
  DollarSign, 
  ArrowRight, 
  Ban, 
  Plus,
  TrendingUp,
  Building,
  Users,
  Calculator,
  History,
  Clock,
  Bell,
  FileText,
  Target
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
  const [allocationMode, setAllocationMode] = useState<'new' | 'reallocate' | 'revoke'>('new');
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRecordSale = (data: any) => {
    console.log('Recording sale:', data);
    // Sales are now documented separately from allocations
    // This will update sales records and pending allocation lists
  };

  const handleAllocation = (data: any) => {
    console.log('Processing allocation:', data);
    // Handle new allocation, reallocation, or revocation
  };

  const openAllocationModal = (mode: 'new' | 'reallocate' | 'revoke', allocation?: any) => {
    setAllocationMode(mode);
    setSelectedAllocation(allocation);
    setShowAllocationModal(true);
  };

  const quickActions = [
    {
      title: 'Record Sale',
      description: 'Document a property sale transaction',
      icon: DollarSign,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => setShowRecordSaleModal(true)
    },
    {
      title: 'Manage Allocations',
      description: 'New allocation, reallocation, or revocation',
      icon: Handshake,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => openAllocationModal('new')
    },
    {
      title: 'Sales Pipeline',
      description: 'Track and manage sales progress',
      icon: Target,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => setActiveTab('pipeline')
    },
    {
      title: 'Pending Allocations',
      description: 'Process committed sales awaiting allocation',
      icon: Clock,
      color: 'bg-orange-600 hover:bg-orange-700',
      onClick: () => setActiveTab('pending')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive sales documentation and property allocation workflow</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
              5
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
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Allocations
            <Badge className="ml-2 bg-orange-600 text-white text-xs">8</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab onOpenAllocation={openAllocationModal} />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <SalesPipelineTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistoryTab onRevoke={(allocation) => openAllocationModal('revoke', allocation)} />
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <PendingAllocationsTab onAllocate={(sale) => openAllocationModal('new', sale)} />
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
        mode={allocationMode}
        allocation={selectedAllocation}
        onSubmit={handleAllocation}
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

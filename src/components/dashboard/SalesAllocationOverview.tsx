
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Plus,
  TrendingUp,
  Building,
  Users,
  FileText,
  History
} from 'lucide-react';
import { OverviewTab } from './sales-allocation/OverviewTab';
import { SalesPipelineTab } from './sales-allocation/SalesPipelineTab';
import { AllocationHistoryTab } from './sales-allocation/AllocationHistoryTab';
import { TransferHistoryTab } from './sales-allocation/TransferHistoryTab';
import { RevokedAllocationsTab } from './sales-allocation/RevokedAllocationsTab';
import { UnifiedSalesForm } from './sales/UnifiedSalesForm';
import { ReallocationModal } from './forms/ReallocationModal';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';

export function SalesAllocationOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);

  const handleSalesSubmit = (data: any) => {
    console.log('Recording sale:', data);
    setShowSalesForm(false);
  };

  const handleReallocation = (data: any) => {
    console.log('Processing reallocation:', data);
  };

  const handleRevocation = (data: any) => {
    console.log('Processing revocation:', data);
  };

  const quickActions = [
    {
      title: 'Record Sale',
      description: 'Unified sales recording with smart allocation',
      icon: DollarSign,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => setShowSalesForm(true)
    },
    {
      title: 'Instant Allocation',
      description: 'Complete sale with immediate allocation',
      icon: Building,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => setShowSalesForm(true)
    },
    {
      title: 'Sales Offer',
      description: 'Generate offer letter without allocation',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => setShowSalesForm(true)
    },
    {
      title: 'Reservation',
      description: 'Reserve unit for client consideration',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      onClick: () => setShowSalesForm(true)
    }
  ];

  if (showSalesForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Record New Sale</h1>
            <p className="text-gray-600 mt-1">Unified sales recording with smart allocation options</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowSalesForm(false)}
          >
            Back to Overview
          </Button>
        </div>
        <UnifiedSalesForm 
          onSubmit={handleSalesSubmit}
          onCancel={() => setShowSalesForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation Overview</h1>
          <p className="text-gray-600 mt-1">Unified sales pipeline with smart allocation management</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="allocations">Allocation History</TabsTrigger>
          <TabsTrigger value="reallocations">Re-allocation History</TabsTrigger>
          <TabsTrigger value="revoked">Revoked History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <SalesPipelineTab />
        </TabsContent>

        <TabsContent value="allocations" className="space-y-6">
          <AllocationHistoryTab onRevoke={(allocation) => {
            setSelectedAllocation(allocation);
            setShowRevokeModal(true);
          }} />
        </TabsContent>

        <TabsContent value="reallocations" className="space-y-6">
          <TransferHistoryTab />
        </TabsContent>

        <TabsContent value="revoked" className="space-y-6">
          <RevokedAllocationsTab />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ReallocationModal 
        isOpen={showReallocationModal}
        onClose={() => setShowReallocationModal(false)}
        onReallocate={handleReallocation}
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

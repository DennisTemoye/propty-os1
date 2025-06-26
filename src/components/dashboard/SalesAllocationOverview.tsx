
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Building,
  Users,
  TrendingUp,
  Plus,
  Bell
} from 'lucide-react';
import { OverviewTab } from './sales-allocation/OverviewTab';
import { SalesPipelineTab } from './sales-allocation/SalesPipelineTab';
import { RecordSaleModal } from './sales-allocation/RecordSaleModal';
import { AllocateUnitModal } from './sales-allocation/AllocateUnitModal';
import { SystemNotifications } from './notifications/SystemNotifications';

export function SalesAllocationOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRecordSaleModal, setShowRecordSaleModal] = useState(false);
  const [showAllocateUnitModal, setShowAllocateUnitModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRecordSale = (data: any) => {
    console.log('Recording sale:', data);
    // Sync with CRM, Clients, and Projects modules
  };

  const handleAllocateUnit = (data: any) => {
    console.log('Allocating unit:', data);
    // Sync with Projects and Clients modules
  };

  const kpiData = [
    {
      title: 'Total Sales Volume',
      value: '₦4.2B',
      subtitle: 'This year',
      icon: DollarSign,
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      change: '+8%'
    },
    {
      title: 'Units Allocated',
      value: '156',
      subtitle: 'Active allocations',
      icon: Building,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      change: '+12%'
    },
    {
      title: 'Active Clients',
      value: '89',
      subtitle: 'With purchases',
      icon: Users,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      change: '+15%'
    },
    {
      title: 'Growth Rate',
      value: '23%',
      subtitle: 'Monthly growth',
      icon: TrendingUp,
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales & Allocation Overview</h1>
          <p className="text-gray-600 mt-1">Comprehensive sales pipeline and allocation management</p>
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
          
          <Button 
            variant="outline"
            onClick={() => setShowAllocateUnitModal(true)}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Building className="h-4 w-4 mr-2" />
            Allocate Unit
          </Button>
          
          <Button 
            onClick={() => setShowRecordSaleModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Sale
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
                    className="text-green-600 border-green-200"
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

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Sales Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <SalesPipelineTab />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <RecordSaleModal 
        isOpen={showRecordSaleModal}
        onClose={() => setShowRecordSaleModal(false)}
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

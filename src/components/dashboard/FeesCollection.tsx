import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Download, 
  Receipt,
  Mail,
  BarChart3,
  CreditCard,
  Activity
} from 'lucide-react';
import { FeeSetupModal } from './fees/FeeSetupModal';
import { PaymentCollectionModal } from './fees/PaymentCollectionModal';
import { RecordFeeModal } from './fees/RecordFeeModal';
import { FeeDetailsModal } from './fees/FeeDetailsModal';
import { FeesOverviewTab } from './fees/FeesOverviewTab';
import { PaymentCollectionTab } from './fees/PaymentCollectionTab';
import { EnhancedMonitoringDashboard } from './fees/EnhancedMonitoringDashboard';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

const mockFeeData = [
  {
    id: 1,
    clientName: 'John Doe',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    feeType: 'Infrastructure Fee',
    amount: '₦5,000,000',
    status: 'Partially Paid',
    paid: '₦2,000,000',
    outstanding: '₦3,000,000',
    dueDate: '2024-02-15',
    lastPayment: '2024-01-15'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    project: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    feeType: 'Service Charge',
    amount: '₦50,000',
    status: 'Overdue',
    paid: '₦0',
    outstanding: '₦50,000',
    dueDate: '2024-01-30',
    lastPayment: null
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    project: 'Golden View',
    unit: 'Block C - Plot 05',
    feeType: 'Infrastructure Fee',
    amount: '₦4,500,000',
    status: 'Paid',
    paid: '₦4,500,000',
    outstanding: '₦0',
    dueDate: '2024-01-01',
    lastPayment: '2023-12-28'
  }
];

export function FeesCollection() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isRecordFeeModalOpen, setIsRecordFeeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFeeDetailsModalOpen, setIsFeeDetailsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  const handleRecordPayment = (fee: any) => {
    setSelectedFee(fee);
    setIsPaymentModalOpen(true);
  };

  const handleViewDetails = (fee: any) => {
    setSelectedFee(fee);
    setIsFeeDetailsModalOpen(true);
  };

  const handleExportFeeStatement = () => {
    DownloadService.generateFeeStatement(mockFeeData);
    toast.success('Fee statement exported successfully');
  };

  const handleSendBulkReminders = () => {
    const overdueCount = mockFeeData.filter(fee => fee.status === 'Overdue').length;
    console.log('Sending bulk reminders...');
    toast.success(`Sending reminders to ${overdueCount} clients with overdue payments`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Collection</h1>
          <p className="text-gray-600 mt-1">Comprehensive fee management and collection system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportFeeStatement} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Statement
          </Button>
          <Button variant="outline" onClick={handleSendBulkReminders} className="text-orange-600 border-orange-200 hover:bg-orange-50" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
          <Dialog open={isRecordFeeModalOpen} onOpenChange={setIsRecordFeeModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Receipt className="h-4 w-4 mr-2" />
                Record Fee
              </Button>
            </DialogTrigger>
          </Dialog>
          <Dialog open={isSetupModalOpen} onOpenChange={setIsSetupModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Setup Fee
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="collection" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Collection</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Analytics Dashboard</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FeesOverviewTab 
            mockFeeData={mockFeeData}
            onRecordPayment={handleRecordPayment}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>

        <TabsContent value="collection">
          <PaymentCollectionTab 
            mockFeeData={mockFeeData}
            onRecordPayment={handleRecordPayment}
          />
        </TabsContent>

        <TabsContent value="monitoring">
          <EnhancedMonitoringDashboard />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <FeeSetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      <Dialog open={isRecordFeeModalOpen} onOpenChange={setIsRecordFeeModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record New Fee</DialogTitle>
            <DialogDescription>
              Record a new fee for a client
            </DialogDescription>
          </DialogHeader>
          <RecordFeeModal 
            onClose={() => setIsRecordFeeModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record Payment - {selectedFee?.clientName}</DialogTitle>
            <DialogDescription>
              Record a payment for {selectedFee?.feeType} - {selectedFee?.project}
            </DialogDescription>
          </DialogHeader>
          <PaymentCollectionModal 
            fee={selectedFee}
            onClose={() => setIsPaymentModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isFeeDetailsModalOpen} onOpenChange={setIsFeeDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fee Details - {selectedFee?.clientName}</DialogTitle>
            <DialogDescription>
              Complete information for {selectedFee?.feeType}
            </DialogDescription>
          </DialogHeader>
          <FeeDetailsModal 
            fee={selectedFee}
            onClose={() => setIsFeeDetailsModalOpen(false)}
            onRecordPayment={handleRecordPayment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

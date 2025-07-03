
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Download, 
  Receipt,
  Mail,
  DollarSign
} from 'lucide-react';
import { FeeSetupModal } from './fees/FeeSetupModal';
import { SimplePaymentModal } from './fees/SimplePaymentModal';
import { RecordFeeModal } from './fees/RecordFeeModal';
import { FeeDetailsModal } from './fees/FeeDetailsModal';
import { SimplifiedFeesOverview } from './fees/SimplifiedFeesOverview';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Collection</h1>
          <p className="text-gray-600 mt-1">Manage and track fee collections efficiently</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportFeeStatement} size="sm" className="hover:bg-primary/5 hover:border-primary/20 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export Statement
          </Button>
          <Button variant="outline" onClick={handleSendBulkReminders} className="hover:bg-orange-50 hover:border-orange-200 text-orange-600 border-orange-200 transition-all duration-200" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
          <Dialog open={isRecordFeeModalOpen} onOpenChange={setIsRecordFeeModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-success hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0" size="sm">
                <Receipt className="h-4 w-4 mr-2" />
                Record Fee
              </Button>
            </DialogTrigger>
          </Dialog>
          <Dialog open={isSetupModalOpen} onOpenChange={setIsSetupModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Setup Fee
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <SimplifiedFeesOverview 
        mockFeeData={mockFeeData}
        onRecordPayment={handleRecordPayment}
        onViewDetails={handleViewDetails}
      />

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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment for {selectedFee?.feeType}
            </DialogDescription>
          </DialogHeader>
          <SimplePaymentModal 
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Download, 
  Receipt,
  Mail,
  DollarSign,
  FileText,
  AlertTriangle
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
  },
  {
    id: 4,
    clientName: 'Sarah Wilson',
    project: 'Victoria Gardens',
    unit: 'Interested',
    feeType: 'Application Form',
    amount: '₦50,000',
    status: 'Pending',
    paid: '₦0',
    outstanding: '₦50,000',
    dueDate: '2024-02-01',
    lastPayment: null,
    assignedAt: 'Interest Stage'
  },
  {
    id: 5,
    clientName: 'David Brown',
    project: 'Emerald Heights',
    unit: 'Block A - Plot 08',
    feeType: 'Application Form',
    amount: '₦50,000',
    status: 'Paid',
    paid: '₦50,000',
    outstanding: '₦0',
    dueDate: '2024-01-15',
    lastPayment: '2024-01-10'
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
    const pendingApplications = mockFeeData.filter(fee => fee.feeType === 'Application Form' && fee.status === 'Pending').length;
    console.log('Sending bulk reminders...');
    toast.success(`Sending reminders to ${overdueCount + pendingApplications} clients with outstanding payments`);
  };

  const handleSetupApplicationFee = () => {
    setIsSetupModalOpen(true);
    // Pre-select Application Form fee type
    setTimeout(() => {
      // This would ideally be handled through props or state management
      console.log('Pre-selecting Application Form fee type');
    }, 100);
  };

  // Calculate Application Form fee statistics
  const applicationFees = mockFeeData.filter(fee => fee.feeType === 'Application Form');
  const applicationFeesCollected = applicationFees
    .filter(fee => fee.status === 'Paid')
    .reduce((sum, fee) => sum + parseInt(fee.paid.replace(/[₦,]/g, '')), 0);
  const pendingApplicationFees = applicationFees.filter(fee => fee.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Collection</h1>
          <p className="text-gray-600 mt-1">Manage and track fee collections efficiently</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportFeeStatement} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleSendBulkReminders} className="text-orange-600 border-orange-200 hover:bg-orange-50" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
          <Button variant="outline" onClick={handleSetupApplicationFee} className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Setup Application Fee
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
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Setup Fee
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Application Form Fee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">₦{(applicationFeesCollected / 1000).toFixed(0)}K</div>
          <div className="text-sm text-purple-700">Application Fees Collected</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{pendingApplicationFees}</div>
          <div className="text-sm text-orange-700">Pending Applications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{applicationFees.filter(f => f.status === 'Paid').length}</div>
          <div className="text-sm text-green-700">Completed Applications</div>
        </div>
      </div>

      {/* Application Form Alerts */}
      {pendingApplicationFees > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <h4 className="font-medium text-orange-900">Pending Application Fees</h4>
              <p className="text-sm text-orange-700">
                {pendingApplicationFees} clients have unpaid application form fees. Consider sending reminders.
              </p>
            </div>
          </div>
        </div>
      )}

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

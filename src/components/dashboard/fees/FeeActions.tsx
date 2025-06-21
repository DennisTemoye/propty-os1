
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, AlertTriangle, Eye, Receipt } from 'lucide-react';
import { FileActions } from '@/components/common/FileActions';
import { EnhancedDownloadService } from '@/services/enhancedDownloadService';
import { toast } from 'sonner';

interface FeeActionsProps {
  fee: any;
  onRecordPayment: (fee: any) => void;
  onViewDetails: (fee: any) => void;
}

export function FeeActions({ fee, onRecordPayment, onViewDetails }: FeeActionsProps) {
  const handleSendReminder = (fee: any) => {
    console.log('Sending reminder to:', fee.clientName);
    toast.success(`Reminder sent to ${fee.clientName}`);
  };

  const feeFileActions = [
    {
      type: 'receipt',
      label: 'Fee Receipt',
      icon: <Receipt className="h-4 w-4 mr-2" />,
      downloadFn: async () => {
        await EnhancedDownloadService.downloadFeeReceipt(fee);
      }
    },
    {
      type: 'statement',
      label: 'Fee Statement',
      icon: <FileText className="h-4 w-4 mr-2" />,
      downloadFn: async () => {
        await EnhancedDownloadService.downloadClientStatement(
          { name: fee.clientName }, 
          [{ 
            date: new Date(), 
            description: fee.feeType, 
            type: 'fee', 
            amount: fee.amount, 
            balance: fee.outstanding 
          }]
        );
      }
    }
  ];

  return (
    <div className="flex space-x-2">
      {fee.status !== 'Paid' && (
        <Button 
          size="sm" 
          onClick={() => onRecordPayment(fee)}
          className="bg-green-600 hover:bg-green-700"
        >
          <DollarSign className="h-3 w-3 mr-1" />
          Pay
        </Button>
      )}
      
      {fee.status === 'Overdue' && (
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleSendReminder(fee)}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          Remind
        </Button>
      )}
      
      <FileActions actions={feeFileActions} />
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onViewDetails(fee)}
      >
        <Eye className="h-3 w-3" />
      </Button>
    </div>
  );
}

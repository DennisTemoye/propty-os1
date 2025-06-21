
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, AlertTriangle, Eye } from 'lucide-react';
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

  const handleViewStatement = (fee: any) => {
    console.log('Viewing statement for:', fee.clientName);
    toast.info(`Opening statement for ${fee.clientName}`);
  };

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
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleViewStatement(fee)}
      >
        <FileText className="h-3 w-3" />
      </Button>
      
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

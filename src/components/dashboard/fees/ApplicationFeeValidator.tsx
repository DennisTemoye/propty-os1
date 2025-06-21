
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, FileText, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationFeeValidatorProps {
  clientId: number;
  clientName: string;
  currentStage: 'interested' | 'offered' | 'allocated';
  nextStage: 'offered' | 'allocated';
  applicationFeeStatus?: 'paid' | 'pending' | 'none';
  onProceed: () => void;
  onPayApplicationFee: () => void;
}

export function ApplicationFeeValidator({
  clientId,
  clientName,
  currentStage,
  nextStage,
  applicationFeeStatus = 'none',
  onProceed,
  onPayApplicationFee
}: ApplicationFeeValidatorProps) {
  
  const shouldBlockProgression = () => {
    return nextStage === 'allocated' && applicationFeeStatus !== 'paid';
  };

  const handleForceProgressionWarning = () => {
    if (window.confirm(`${clientName} has not paid the Application Form fee. Do you want to proceed anyway? This action will be logged.`)) {
      console.log(`Warning: Progressing ${clientName} to ${nextStage} without Application Form fee payment`);
      toast.warning(`${clientName} progressed to ${nextStage} without Application Form fee payment`);
      onProceed();
    }
  };

  if (applicationFeeStatus === 'paid') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-700">Application Form fee has been paid</span>
        </div>
      </div>
    );
  }

  if (shouldBlockProgression()) {
    return (
      <Alert className="border-red-200 bg-red-50 mb-4">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-700">
          <div className="space-y-3">
            <p>
              <strong>Application Form Fee Required</strong><br />
              {clientName} must pay the Application Form fee before proceeding to allocation stage.
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={onPayApplicationFee}
                className="bg-green-600 hover:bg-green-700"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                Record Payment
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleForceProgressionWarning}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Proceed Anyway
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (applicationFeeStatus === 'pending') {
    return (
      <Alert className="border-orange-200 bg-orange-50 mb-4">
        <FileText className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-700">
          <div className="space-y-2">
            <p>Application Form fee is pending payment for {clientName}</p>
            <Button 
              size="sm" 
              onClick={onPayApplicationFee}
              className="bg-green-600 hover:bg-green-700"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Record Payment
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake, ArrowRight, Ban, Plus } from 'lucide-react';
import { NewAllocationForm } from './NewAllocationForm';
import { ReallocationForm } from './ReallocationForm';
import { RevokeAllocationForm } from './RevokeAllocationForm';

interface AllocationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

type AllocationAction = 'new' | 'reallocation' | 'revoke' | null;

export function AllocationFlowModal({ isOpen, onClose, onSubmit }: AllocationFlowModalProps) {
  const [selectedAction, setSelectedAction] = useState<AllocationAction>(null);

  const allocationActions = [
    {
      id: 'new',
      title: 'New Allocation',
      description: 'Assign a plot to a client',
      icon: Handshake,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'reallocation',
      title: 'Reallocation',
      description: 'Transfer plot to another client',
      icon: ArrowRight,
      color: 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'revoke',
      title: 'Revoke Allocation',
      description: 'Cancel allocation and process refund',
      icon: Ban,
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50'
    }
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId as AllocationAction);
  };

  const handleBack = () => {
    setSelectedAction(null);
  };

  const handleFormSubmit = (data: any) => {
    const submissionData = {
      ...data,
      allocationType: selectedAction,
      status: 'pending_approval',
      submittedAt: new Date().toISOString(),
      submittedBy: 'Current User' // This would come from auth context
    };
    onSubmit(submissionData);
    setSelectedAction(null);
  };

  const handleClose = () => {
    setSelectedAction(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Handshake className="h-5 w-5 text-blue-600" />
            <span>Manage Allocation</span>
          </DialogTitle>
          <DialogDescription>
            {selectedAction 
              ? `Complete the ${selectedAction} process. This action will require approval.`
              : 'Select the type of allocation action you want to perform'
            }
          </DialogDescription>
        </DialogHeader>

        {!selectedAction ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allocationActions.map((action) => (
                <Card 
                  key={action.id}
                  className={`cursor-pointer hover:shadow-md transition-all border-2 hover:border-gray-300 ${action.bgColor}`}
                  onClick={() => handleActionSelect(action.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${action.color.split(' ')[0]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${action.textColor}`}>
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {action.description}
                    </p>
                    <Badge variant="outline" className={`${action.textColor} border-current`}>
                      Requires Approval
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All allocation actions require approval from authorized personnel. 
                An OTP will be sent to the designated admin for verification.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {allocationActions.find(a => a.id === selectedAction)?.title}
              </h3>
              <Button variant="outline" onClick={handleBack}>
                Back to Selection
              </Button>
            </div>

            {selectedAction === 'new' && (
              <NewAllocationForm onSubmit={handleFormSubmit} onCancel={handleBack} />
            )}

            {selectedAction === 'reallocation' && (
              <ReallocationForm onSubmit={handleFormSubmit} onCancel={handleBack} />
            )}

            {selectedAction === 'revoke' && (
              <RevokeAllocationForm onSubmit={handleFormSubmit} onCancel={handleBack} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
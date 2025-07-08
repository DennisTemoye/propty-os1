
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, AlertTriangle } from 'lucide-react';
import { PendingAllocation } from '@/types/allocation';
import { toast } from 'sonner';

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: PendingAllocation | null;
  actionType: 'approve' | 'decline';
  onVerified: (otpCode: string, reason?: string) => void;
}

export function OTPVerificationModal({ 
  isOpen, 
  onClose, 
  allocation, 
  actionType, 
  onVerified 
}: OTPVerificationModalProps) {
  const [otpCode, setOtpCode] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpCode) {
      toast.error('Please enter the OTP code');
      return;
    }

    if (actionType === 'decline' && !declineReason.trim()) {
      toast.error('Please provide a reason for declining');
      return;
    }

    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerified(otpCode, declineReason);
      setOtpCode('');
      setDeclineReason('');
    }, 1000);
  };

  const handleClose = () => {
    setOtpCode('');
    setDeclineReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className={`h-5 w-5 ${actionType === 'approve' ? 'text-green-600' : 'text-red-600'}`} />
            <span>{actionType === 'approve' ? 'Approve' : 'Decline'} Allocation</span>
          </DialogTitle>
          <DialogDescription>
            Enter the OTP code sent to your registered device to {actionType} this allocation.
          </DialogDescription>
        </DialogHeader>

        {allocation && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Client:</span> {allocation.clientName}
              </div>
              <div>
                <span className="font-medium">Plot:</span> {allocation.plotNumber}
              </div>
              <div>
                <span className="font-medium">Project:</span> {allocation.projectName}
              </div>
              <div>
                <span className="font-medium">Amount:</span> {allocation.amount}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="otp">OTP Code *</Label>
            <Input
              id="otp"
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>

          {actionType === 'decline' && (
            <div>
              <Label htmlFor="reason">Reason for Declining *</Label>
              <Textarea
                id="reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Provide a detailed reason for declining this allocation..."
                rows={3}
              />
            </div>
          )}

          <div className={`p-4 rounded-lg border ${
            actionType === 'approve' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start space-x-2">
              <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                actionType === 'approve' ? 'text-green-600' : 'text-red-600'
              }`} />
              <div>
                <p className={`text-sm font-medium ${
                  actionType === 'approve' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {actionType === 'approve' ? 'Approval Confirmation' : 'Decline Confirmation'}
                </p>
                <p className={`text-sm mt-1 ${
                  actionType === 'approve' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {actionType === 'approve' 
                    ? 'This will approve the allocation and update the unit status immediately.'
                    : 'This will decline the allocation and notify the submitting team member.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className={`flex-1 ${
                actionType === 'approve' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : `${actionType === 'approve' ? 'Approve' : 'Decline'} Allocation`}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

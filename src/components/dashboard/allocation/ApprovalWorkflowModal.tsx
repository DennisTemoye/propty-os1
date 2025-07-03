
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AlertTriangle, CheckCircle, XCircle, Shield, Mail, Eye, Send } from 'lucide-react';
import { toast } from 'sonner';
import { PendingAllocation } from '@/types/allocation';


interface ApprovalWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: PendingAllocation | null;
  onApprove: (allocationId: string, otpCode: string) => void;
  onDecline: (allocationId: string, reason: string) => void;
}

export function ApprovalWorkflowModal({ 
  isOpen, 
  onClose, 
  allocation, 
  onApprove, 
  onDecline 
}: ApprovalWorkflowModalProps) {
  const [action, setAction] = useState<'approve' | 'decline' | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLetterPreview, setShowLetterPreview] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
    setIsLoading(false);
    toast.success('OTP sent to your email address');
  };

  const handleApprove = () => {
    if (!allocation || !otpCode || otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP code');
      return;
    }
    onApprove(allocation.id, otpCode);
    handleClose();
  };

  const handleDecline = () => {
    if (!allocation || !declineReason.trim()) {
      toast.error('Please provide a reason for declining');
      return;
    }
    onDecline(allocation.id, declineReason);
    handleClose();
  };

  const handleClose = () => {
    setAction(null);
    setOtpCode('');
    setOtpSent(false);
    setDeclineReason('');
    setIsLoading(false);
    setShowLetterPreview(false);
    onClose();
  };

  // Initialize email content when allocation changes
  React.useEffect(() => {
    if (allocation) {
      setEmailContent(`Dear ${allocation.clientName},

Congratulations! Your unit allocation has been confirmed.

Allocation Details:
- Project: ${allocation.projectName}
- Unit: ${allocation.unit}
- Allocation Date: ${new Date().toLocaleDateString()}
- Amount: ${allocation.amount}

Your allocation letter will be prepared and delivered to you shortly.

Welcome to our community!

Best regards,
Sales Team`);
    }
  }, [allocation]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Allocation Approval Required</span>
            </DialogTitle>
            <DialogDescription>
              Review and approve/decline the pending allocation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Allocation Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Allocation Details</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLetterPreview(true)}
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Email
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Client</Label>
                  <p className="font-medium">{allocation.clientName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Project</Label>
                  <p className="font-medium">{allocation.projectName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Unit</Label>
                  <p className="font-medium">{allocation.unit}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Amount</Label>
                  <p className="font-medium">{allocation.amount}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Sales Type</Label>
                  <Badge variant="outline">{allocation.salesType.replace('_', ' ')}</Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Submitted By</Label>
                  <p className="font-medium">{allocation.submittedBy}</p>
                </div>
              </div>
              {allocation.notes && (
                <div className="mt-4">
                  <Label className="text-sm text-gray-600">Notes</Label>
                  <p className="text-sm">{allocation.notes}</p>
                </div>
              )}
            </div>

            {/* Action Selection */}
            {!action && (
              <div className="flex space-x-4">
                <Button 
                  onClick={() => setAction('approve')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Allocation
                </Button>
                <Button 
                  onClick={() => setAction('decline')}
                  variant="outline"
                  className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline Allocation
                </Button>
              </div>
            )}

            {/* Approve Flow */}
            {action === 'approve' && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Approve Allocation</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    An OTP will be sent to your email for security verification.
                    Upon approval, the allocation letter will be automatically sent to the client.
                  </p>
                </div>

                {!otpSent ? (
                  <Button 
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {isLoading ? 'Sending OTP...' : 'Send OTP to Email'}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Enter 6-digit OTP Code</Label>
                      <div className="flex justify-center mt-2">
                        <InputOTP 
                          maxLength={6} 
                          value={otpCode} 
                          onChange={setOtpCode}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleApprove}
                        disabled={otpCode.length !== 6}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Confirm Approval
                      </Button>
                      <Button 
                        onClick={() => setAction(null)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Decline Flow */}
            {action === 'decline' && (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Decline Allocation</h4>
                  </div>
                  <p className="text-sm text-red-700">
                    Please provide a reason for declining this allocation.
                  </p>
                </div>

                <div>
                  <Label>Decline Reason *</Label>
                  <Textarea 
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Explain why this allocation is being declined..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleDecline}
                    disabled={!declineReason.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Confirm Decline
                  </Button>
                  <Button 
                    onClick={() => setAction(null)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Editable Email Preview Modal */}
      <Dialog open={showLetterPreview} onOpenChange={() => setShowLetterPreview(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Allocation Email</DialogTitle>
            <DialogDescription>
              Customize the allocation confirmation email before sending to the client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input
                id="email-subject"
                value={`Unit Allocation Confirmation - ${allocation?.unit || ''}`}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-content">Email Content</Label>
              <Textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={15}
                className="mt-1 font-mono text-sm"
                placeholder="Enter email content..."
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Available Variables:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
                <span>{`{{clientName}}`}</span>
                <span>{`{{projectName}}`}</span>
                <span>{`{{unit}}`}</span>
                <span>{`{{amount}}`}</span>
                <span>{`{{allocationDate}}`}</span>
                <span>{`{{companyName}}`}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => {
              console.log('Sending customized email:', emailContent);
              setShowLetterPreview(false);
              toast.success('Allocation email sent to client!');
            }} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" onClick={() => setShowLetterPreview(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

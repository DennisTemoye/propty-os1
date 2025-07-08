
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AlertTriangle, CheckCircle, XCircle, Shield, Mail, Eye, Edit2 } from 'lucide-react';
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
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState({
    subject: 'Unit Allocation Confirmation - {{unitNumber}}',
    content: `Dear {{clientName}},

Congratulations! Your unit allocation has been confirmed.

Allocation Details:
- Project: {{projectName}}
- Unit: {{unitNumber}}
- Allocation Date: {{allocationDate}}
- Amount: {{saleAmount}}

Your allocation confirmation has been processed successfully.

Welcome to our community!

Best regards,
Sales Team`
  });

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
    setShowEmailPreview(false);
    setEditingEmail(false);
    onClose();
  };

  const renderEmailContent = (content: string) => {
    if (!allocation) return content;
    
    const data = {
      clientName: allocation.clientName,
      projectName: allocation.projectName,
      plotNumber: allocation.plotNumber,
      saleAmount: allocation.amount,
      allocationDate: new Date().toLocaleDateString()
    };

    let rendered = content;
    Object.entries(data).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return rendered;
  };

  if (!allocation) return null;

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
                  onClick={() => setShowEmailPreview(true)}
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
                  <Label className="text-sm text-gray-600">Plot</Label>
                  <p className="font-medium">{allocation.plotNumber}</p>
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
                    Upon approval, the allocation email will be automatically sent to the client.
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

      {/* Email Preview Modal */}
      <Dialog open={showEmailPreview} onOpenChange={() => setShowEmailPreview(false)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Allocation Email Preview
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEditingEmail(!editingEmail)}
                className="bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {editingEmail ? 'Preview' : 'Edit'}
              </Button>
            </DialogTitle>
            <DialogDescription>
              {editingEmail ? 'Edit the email template' : 'Preview of the allocation confirmation email that will be sent to the client'}
            </DialogDescription>
          </DialogHeader>
          
          {editingEmail ? (
            <div className="space-y-4">
              <div>
                <Label>Email Subject</Label>
                <Input
                  value={emailTemplate.subject}
                  onChange={(e) => setEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject with variables like {{clientName}}"
                />
              </div>
              <div>
                <Label>Email Content</Label>
                <Textarea
                  value={emailTemplate.content}
                  onChange={(e) => setEmailTemplate(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  placeholder="Enter email content with variables like {{projectName}}"
                  className="font-mono text-sm"
                />
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Available Variables:</strong> {`{{clientName}}, {{projectName}}, {{unitNumber}}, {{saleAmount}}, {{allocationDate}}`}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Subject:</div>
                <div className="font-semibold">{renderEmailContent(emailTemplate.subject)}</div>
              </div>
              <div className="bg-white border p-4 rounded-lg">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {renderEmailContent(emailTemplate.content)}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowEmailPreview(false)}>
              Close
            </Button>
            {editingEmail && (
              <Button 
                onClick={() => {
                  setEditingEmail(false);
                  toast.success('Email template updated!');
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Changes
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

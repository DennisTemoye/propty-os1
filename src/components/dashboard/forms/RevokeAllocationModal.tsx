
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertTriangle, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { RefundType, RevocationData } from '@/types/allocation';

interface RevokeAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onRevoke: (data: RevocationData) => void;
}

export function RevokeAllocationModal({ isOpen, onClose, allocation, onRevoke }: RevokeAllocationModalProps) {
  const [reason, setReason] = useState('');
  const [refundType, setRefundType] = useState<RefundType>('full');
  const [refundPercentage, setRefundPercentage] = useState<number>(100);
  const [deductionAmount, setDeductionAmount] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const totalPaid = parseFloat(allocation?.totalPaid?.replace(/[₦,]/g, '') || '0');
  const refundAmount = refundType === 'full' 
    ? totalPaid 
    : totalPaid * (refundPercentage / 100);

  const handleRevoke = () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for revocation');
      return;
    }

    const revocationData: RevocationData = {
      reason: reason.trim(),
      refundType,
      refundAmount: `₦${refundAmount.toLocaleString()}`,
      refundPercentage: refundType === 'partial' ? refundPercentage : 100,
      deductionAmount: refundType === 'partial' ? deductionAmount : '0',
      adminNotes: adminNotes.trim()
    };

    onRevoke(revocationData);
    toast.success('Allocation revoked successfully');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setReason('');
    setRefundType('full');
    setRefundPercentage(100);
    setDeductionAmount('');
    setAdminNotes('');
  };

  if (!allocation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Revoke Allocation
          </DialogTitle>
          <DialogDescription>
            Revoke the allocation for {allocation.client?.name} - {allocation.unit?.plotId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Allocation Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Allocation Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Client:</span> {allocation.client?.name}
              </div>
              <div>
                <span className="text-gray-600">Unit:</span> {allocation.unit?.plotId}
              </div>
              <div>
                <span className="text-gray-600">Total Paid:</span> {allocation.totalPaid}
              </div>
              <div>
                <span className="text-gray-600">Status:</span> {allocation.status}
              </div>
            </div>
          </div>

          {/* Revocation Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Revocation *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for revoking this allocation..."
              rows={3}
            />
          </div>

          {/* Refund Type */}
          <div className="space-y-2">
            <Label>Refund Type *</Label>
            <Select value={refundType} onValueChange={(value: RefundType) => setRefundType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Refund</SelectItem>
                <SelectItem value="partial">Partial Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Partial Refund Settings */}
          {refundType === 'partial' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Partial Refund Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentage">Refund Percentage</Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={refundPercentage}
                    onChange={(e) => setRefundPercentage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deduction">Deduction Amount</Label>
                  <Input
                    id="deduction"
                    value={deductionAmount}
                    onChange={(e) => setDeductionAmount(e.target.value)}
                    placeholder="₦0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Refund Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Refund Summary
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-medium">₦{totalPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Refund Amount:</span>
                <span className="font-medium text-green-600">₦{refundAmount.toLocaleString()}</span>
              </div>
              {refundType === 'partial' && (
                <div className="flex justify-between">
                  <span>Deduction:</span>
                  <span className="font-medium text-red-600">
                    ₦{(totalPaid - refundAmount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-2">
            <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Additional notes for internal records..."
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleRevoke}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Revoke Allocation
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface RevokeAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onRevoke: (data: any) => void;
}

export function RevokeAllocationModal({ isOpen, onClose, allocation, onRevoke }: RevokeAllocationModalProps) {
  const form = useForm({
    defaultValues: {
      reason: '',
      refundType: 'full',
      refundAmount: '',
      refundPercentage: ''
    }
  });

  const refundType = form.watch('refundType');

  const onSubmit = (data: any) => {
    console.log('Revoking allocation:', data);
    
    const revocationData = {
      ...allocation,
      status: 'revoked',
      revocationReason: data.reason,
      refundType: data.refundType,
      refundAmount: data.refundType === 'partial' ? data.refundAmount : allocation.totalPaid,
      refundPercentage: data.refundType === 'partial' ? data.refundPercentage : '100',
      revokedAt: new Date().toISOString(),
      revokedBy: 'Current Admin' // This would come from auth context
    };

    onRevoke(revocationData);
    toast.success('Allocation revoked successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Revoke Allocation
          </DialogTitle>
          <DialogDescription>
            This action will revoke the property allocation and process a refund. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Reason for Revocation *</Label>
            <Textarea 
              {...form.register('reason', { required: true })}
              placeholder="Provide a detailed reason for revoking this allocation..."
            />
          </div>

          <div>
            <Label>Refund Option *</Label>
            <Select onValueChange={(value) => form.setValue('refundType', value)} defaultValue="full">
              <SelectTrigger>
                <SelectValue placeholder="Select refund type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Refund</SelectItem>
                <SelectItem value="partial">Partial Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {refundType === 'partial' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Refund Percentage</Label>
                <Input 
                  type="number"
                  {...form.register('refundPercentage')}
                  placeholder="e.g., 80"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label>Refund Amount</Label>
                <Input 
                  {...form.register('refundAmount')}
                  placeholder="e.g., ₦12,000,000"
                />
              </div>
            </div>
          )}

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This will permanently revoke the allocation and mark the unit as available. 
              A refund transaction will be recorded in the accounting module.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" variant="destructive" className="flex-1">
              Revoke Allocation
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertTriangle, User, Building, DollarSign, Download } from 'lucide-react';

interface RevokeAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onRevoke: (data: any) => void;
}

export function RevokeAllocationModal({ 
  isOpen, 
  onClose, 
  allocation, 
  onRevoke 
}: RevokeAllocationModalProps) {
  const form = useForm({
    defaultValues: {
      reason: '',
      refundType: 'full',
      deductionPercentage: '',
      deductionAmount: '',
      generateReceipt: true,
      notifyClient: true
    }
  });

  const { control, watch } = form;
  const refundType = watch('refundType');

  const calculateRefundAmount = () => {
    if (!allocation?.amount) return '₦0';
    
    const amount = parseFloat(allocation.amount.replace(/[₦,]/g, ''));
    
    if (refundType === 'full') {
      return `₦${amount.toLocaleString()}`;
    }
    
    if (refundType === 'partial') {
      const deductionPercentage = parseFloat(watch('deductionPercentage') || '0');
      const deductionAmount = parseFloat(watch('deductionAmount') || '0');
      
      if (deductionPercentage > 0) {
        const refund = amount - (amount * deductionPercentage / 100);
        return `₦${refund.toLocaleString()}`;
      }
      
      if (deductionAmount > 0) {
        const refund = Math.max(0, amount - deductionAmount);
        return `₦${refund.toLocaleString()}`;
      }
    }
    
    return '₦0';
  };

  const onSubmit = (data: any) => {
    console.log('Revoking allocation:', data);
    
    const revokeData = {
      ...data,
      allocationId: allocation?.id,
      originalAmount: allocation?.amount,
      refundAmount: calculateRefundAmount(),
      timestamp: new Date().toISOString(),
      revokedBy: 'Current User' // Replace with actual user context
    };

    onRevoke(revokeData);
    toast.success('Allocation revoked successfully');
    onClose();
    form.reset();
  };

  if (!allocation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Revoke Allocation</span>
          </DialogTitle>
          <DialogDescription>
            This action will revoke the unit allocation and process any applicable refunds
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Allocation Summary */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-3">Allocation to be Revoked</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-red-600" />
                <span className="font-medium">{allocation.clientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-red-600" />
                <span>{allocation.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-red-600" />
                <span className="font-medium">{allocation.amount}</span>
              </div>
              <div>
                <Badge className="bg-green-100 text-green-800">
                  {allocation.status || 'Allocated'}
                </Badge>
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="reason">Reason for Revocation *</Label>
              <Textarea 
                {...form.register('reason', { required: true })}
                placeholder="Provide detailed reason for this revocation..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Refund Option *</Label>
              <Controller
                name="refundType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full-refund" />
                      <Label htmlFor="full-refund">Full Refund</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="partial-refund" />
                      <Label htmlFor="partial-refund">Partial Refund</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="no-refund" />
                      <Label htmlFor="no-refund">No Refund</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {refundType === 'partial' && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h5 className="font-medium">Deduction Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deductionPercentage">Deduction Percentage (%)</Label>
                    <Input 
                      {...form.register('deductionPercentage')}
                      type="number"
                      placeholder="e.g., 10"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deductionAmount">OR Fixed Deduction Amount</Label>
                    <Input 
                      {...form.register('deductionAmount')}
                      placeholder="e.g., ₦500,000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Refund Calculation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-800 mb-2">Refund Calculation</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Original Amount:</span>
                  <span className="ml-2 font-medium">{allocation.amount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Refund Amount:</span>
                  <span className="ml-2 font-medium text-blue-600">{calculateRefundAmount()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Controller
                  name="generateReceipt"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="generateReceipt"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="generateReceipt" className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Generate revocation receipt
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="notifyClient"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="notifyClient"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="notifyClient">
                  Send notification to client
                </Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button 
                type="submit" 
                variant="destructive" 
                className="flex-1"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Confirm Revocation
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

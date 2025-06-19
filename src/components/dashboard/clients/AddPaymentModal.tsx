
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export function AddPaymentModal({ isOpen, onClose, client }: AddPaymentModalProps) {
  const form = useForm({
    defaultValues: {
      amount: '',
      paymentType: 'milestone',
      paymentMethod: 'bank_transfer',
      reference: '',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = (data: any) => {
    console.log('Adding payment for client:', client.id, data);
    toast.success(`Payment of ${data.amount} recorded successfully!`);
    onClose();
    form.reset();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Payment - {client.name}</DialogTitle>
          <DialogDescription>
            Record a new payment for this client
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Amount *</label>
              <Input 
                {...form.register('amount', { required: true })}
                placeholder="e.g., ₦5,000,000" 
              />
            </div>

            <div>
              <label className="text-sm font-medium">Payment Date *</label>
              <Input 
                type="date"
                {...form.register('date', { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Payment Type *</label>
              <Select onValueChange={(value) => form.setValue('paymentType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Payment</SelectItem>
                  <SelectItem value="milestone">Milestone Payment</SelectItem>
                  <SelectItem value="final">Final Payment</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Payment Method *</label>
              <Select onValueChange={(value) => form.setValue('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="card">Card Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Payment Reference</label>
            <Input 
              {...form.register('reference')}
              placeholder="Transaction reference or receipt number" 
            />
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Additional notes about this payment..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Record Payment
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

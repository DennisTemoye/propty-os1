
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign, Receipt } from 'lucide-react';

interface SimplePaymentModalProps {
  fee: any;
  onClose: () => void;
}

export function SimplePaymentModal({ fee, onClose }: SimplePaymentModalProps) {
  const form = useForm({
    defaultValues: {
      paymentAmount: '',
      paymentMethod: '',
      paymentDate: new Date().toISOString().split('T')[0],
      reference: '',
      notes: ''
    }
  });

  const { control } = form;

  const onSubmit = (data: any) => {
    console.log('Recording payment:', data);
    toast.success('Payment recorded successfully!');
    onClose();
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Fee Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment for {fee.clientName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Fee Type:</span>
              <div className="font-medium">{fee.feeType}</div>
            </div>
            <div>
              <span className="text-gray-500">Project:</span>
              <div className="font-medium">{fee.project}</div>
            </div>
            <div>
              <span className="text-gray-500">Total Amount:</span>
              <div className="font-medium">{fee.amount}</div>
            </div>
            <div>
              <span className="text-gray-500">Outstanding:</span>
              <div className="font-medium text-red-600">{fee.outstanding}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="paymentAmount">Payment Amount *</Label>
            <Input 
              {...form.register('paymentAmount', { required: true })}
              placeholder="Enter amount"
              type="text"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum: {fee.outstanding}
            </p>
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="pos">POS</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="paymentDate">Payment Date *</Label>
            <Input 
              type="date"
              {...form.register('paymentDate', { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="reference">Reference/Transaction ID</Label>
            <Input 
              {...form.register('reference')}
              placeholder="TRX123456789"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea 
            {...form.register('notes')}
            placeholder="Additional notes..."
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

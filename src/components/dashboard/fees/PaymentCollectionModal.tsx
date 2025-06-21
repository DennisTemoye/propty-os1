
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Calendar, DollarSign, Receipt, CreditCard } from 'lucide-react';

interface PaymentCollectionModalProps {
  fee?: any;
  onClose?: () => void;
}

export function PaymentCollectionModal({ fee, onClose }: PaymentCollectionModalProps) {
  const form = useForm({
    defaultValues: {
      paymentAmount: '',
      paymentMethod: '',
      paymentDate: new Date().toISOString().split('T')[0],
      reference: '',
      notes: '',
      generateReceipt: true
    }
  });

  const onSubmit = (data: any) => {
    console.log('Recording payment:', data);
    toast.success('Payment recorded successfully!');
    if (onClose) onClose();
    form.reset();
  };

  // If no fee is passed, render the standalone collection interface
  if (!fee) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₦12.5M</div>
              <div className="text-xs text-gray-500">15 pending payments</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collected Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₦3.2M</div>
              <div className="text-xs text-gray-500">5 payments received</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₦2.8M</div>
              <div className="text-xs text-gray-500">8 overdue fees</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Payment Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a fee from the Overview tab to record a payment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Fee Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Client:</span>
              <div className="font-medium">{fee.clientName}</div>
            </div>
            <div>
              <span className="text-gray-500">Fee Type:</span>
              <div className="font-medium">{fee.feeType}</div>
            </div>
            <div>
              <span className="text-gray-500">Total Amount:</span>
              <div className="font-medium">{fee.amount}</div>
            </div>
            <div>
              <span className="text-gray-500">Outstanding:</span>
              <div className="font-medium text-red-600">{fee.outstanding}</div>
            </div>
            <div>
              <span className="text-gray-500">Project:</span>
              <div className="font-medium">{fee.project}</div>
            </div>
            <div>
              <span className="text-gray-500">Unit:</span>
              <div className="font-medium">{fee.unit}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="paymentAmount">Payment Amount *</Label>
          <Input 
            {...form.register('paymentAmount', { required: true })}
            placeholder="e.g., ₦1,000,000"
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
                  <SelectValue placeholder="Select payment method" />
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
            placeholder="e.g., TRX123456789"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Payment Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Additional notes about this payment..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          {...form.register('generateReceipt')}
          id="generateReceipt"
          className="rounded"
        />
        <Label htmlFor="generateReceipt">Generate receipt automatically</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

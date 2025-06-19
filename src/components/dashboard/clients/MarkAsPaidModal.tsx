
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MarkAsPaidModalProps {
  isOpen: boolean;
  onClose: () => void;
  instalment: any;
  onMarkPaid: (instalmentId: number, paymentData: any) => void;
}

export function MarkAsPaidModal({ isOpen, onClose, instalment, onMarkPaid }: MarkAsPaidModalProps) {
  const [formData, setFormData] = useState({
    paymentMethod: '',
    paymentDate: new Date(),
    referenceId: '',
    receiptFile: null as File | null
  });

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'transfer', label: 'Bank Transfer' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'pos', label: 'POS/Card' },
    { value: 'online', label: 'Online Payment' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    onMarkPaid(instalment.id, {
      paymentMethod: formData.paymentMethod,
      paymentDate: formData.paymentDate.toISOString().split('T')[0],
      referenceId: formData.referenceId,
      receiptFile: formData.receiptFile
    });

    toast.success('Payment marked successfully!');
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, receiptFile: file }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as Paid</DialogTitle>
          <DialogDescription>
            Record payment for {instalment?.stageName}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <div className="text-sm text-gray-600">Payment Stage</div>
          <div className="font-semibold text-lg">{instalment?.stageName}</div>
          <div className="text-sm text-gray-600">Amount: {formatCurrency(instalment?.amount)}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(formData.paymentDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.paymentDate}
                  onSelect={(date) => handleInputChange('paymentDate', date || new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceId">Reference ID (Optional)</Label>
            <Input
              id="referenceId"
              placeholder="Transaction reference"
              value={formData.referenceId}
              onChange={(e) => handleInputChange('referenceId', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="receipt" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700">
                    Click to upload receipt
                  </span>
                  <span className="text-gray-500 block text-sm">
                    PNG, JPG or PDF (max 5MB)
                  </span>
                </label>
                {formData.receiptFile && (
                  <div className="mt-2 text-sm text-green-600">
                    {formData.receiptFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Mark as Paid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

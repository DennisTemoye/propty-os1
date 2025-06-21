
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RecordFeeModalProps {
  onClose: () => void;
}

export function RecordFeeModal({ onClose }: RecordFeeModalProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      feeType: '',
      customFeeType: '',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      description: '',
      project: '',
      unit: '',
      autoPayment: false
    }
  });

  const feeType = form.watch('feeType');

  const onSubmit = (data: any) => {
    console.log('Recording new fee:', data);
    
    // Auto-populate description for Application Form fees
    if (data.feeType === 'application' && !data.description) {
      data.description = 'Payable to initiate your property application process';
    }
    
    toast.success('Fee recorded successfully!');
    onClose();
    form.reset();
  };

  // Auto-populate amount for Application Form fees
  React.useEffect(() => {
    if (feeType === 'application') {
      form.setValue('amount', '₦50,000');
      form.setValue('description', 'Payable to initiate your property application process');
    }
  }, [feeType, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientId">Client *</Label>
          <Select onValueChange={(value) => form.setValue('clientId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client1">John Doe</SelectItem>
              <SelectItem value="client2">Jane Smith</SelectItem>
              <SelectItem value="client3">Sarah Wilson</SelectItem>
              <SelectItem value="client4">David Brown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="feeType">Fee Type *</Label>
          <Select onValueChange={(value) => form.setValue('feeType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select fee type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="application">Application Form Fee</SelectItem>
              <SelectItem value="infrastructure">Infrastructure Development Fee</SelectItem>
              <SelectItem value="service">Service Charge</SelectItem>
              <SelectItem value="maintenance">Maintenance Fee</SelectItem>
              <SelectItem value="custom">Custom Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {feeType === 'custom' && (
        <div>
          <Label htmlFor="customFeeType">Custom Fee Type *</Label>
          <Input 
            {...form.register('customFeeType', { required: feeType === 'custom' })}
            placeholder="e.g., Security Deposit" 
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount *</Label>
          <Input 
            {...form.register('amount', { required: true })}
            placeholder="e.g., ₦50,000" 
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input 
            type="date"
            {...form.register('dueDate', { required: true })}
          />
        </div>
      </div>

      {feeType !== 'application' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="project">Project</Label>
            <Select onValueChange={(value) => form.setValue('project', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="victoria">Victoria Gardens</SelectItem>
                <SelectItem value="emerald">Emerald Heights</SelectItem>
                <SelectItem value="golden">Golden View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input 
              {...form.register('unit')}
              placeholder="e.g., Block A - Plot 02" 
            />
          </div>
        </div>
      )}

      {feeType === 'application' && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Application Form Fee</h4>
          <p className="text-sm text-purple-700">
            This fee is typically assigned when a client shows interest in a property. 
            It covers the cost of processing their application and initial documentation.
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          {...form.register('description')}
          placeholder="Additional details about this fee..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Record Fee
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

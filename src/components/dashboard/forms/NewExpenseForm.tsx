
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewExpenseFormProps {
  onClose: () => void;
}

export function NewExpenseForm({ onClose }: NewExpenseFormProps) {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      vendor: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      reference: '',
      description: '',
      projectId: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new expense:', data);
    toast.success('Expense recorded successfully!');
    onClose();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-left block mb-2">Expense Title *</label>
        <Input 
          {...form.register('title', { required: true })}
          placeholder="Enter expense title" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Amount *</label>
          <Input 
            {...form.register('amount', { required: true })}
            placeholder="e.g., ₦500,000" 
          />
        </div>

        <div>
          <label className="text-sm font-medium text-left block mb-2">Date *</label>
          <Input 
            type="date"
            {...form.register('date', { required: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Category *</label>
          <Select onValueChange={(value) => form.setValue('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="labor">Labor</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="permits">Permits & Licenses</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-left block mb-2">Vendor/Supplier</label>
          <Input 
            {...form.register('vendor')}
            placeholder="Enter vendor name" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Payment Method</label>
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

        <div>
          <label className="text-sm font-medium text-left block mb-2">Project</label>
          <Select onValueChange={(value) => form.setValue('projectId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project1">Victoria Gardens Estate</SelectItem>
              <SelectItem value="project2">Emerald Heights</SelectItem>
              <SelectItem value="project3">Golden View Towers</SelectItem>
              <SelectItem value="general">General/Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Reference Number</label>
        <Input 
          {...form.register('reference')}
          placeholder="Receipt/Invoice number" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Description</label>
        <Textarea 
          {...form.register('description')}
          placeholder="Additional details about the expense..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Record Expense
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

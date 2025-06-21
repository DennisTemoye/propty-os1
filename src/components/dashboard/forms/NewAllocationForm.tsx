
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewAllocationFormProps {
  onClose: () => void;
}

export function NewAllocationForm({ onClose }: NewAllocationFormProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      developmentId: '',
      blockId: '',
      unitId: '',
      allocationType: 'sale',
      allocationDate: new Date().toISOString().split('T')[0],
      price: '',
      paymentPlan: '',
      notes: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new allocation:', data);
    toast.success('Allocation created successfully!');
    onClose();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Client *</label>
          <Select onValueChange={(value) => form.setValue('clientId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client1">John Doe</SelectItem>
              <SelectItem value="client2">Jane Smith</SelectItem>
              <SelectItem value="client3">ABC Corporation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Development *</label>
          <Select onValueChange={(value) => form.setValue('developmentId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select development" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dev1">Victoria Gardens Estate</SelectItem>
              <SelectItem value="dev2">Emerald Heights</SelectItem>
              <SelectItem value="dev3">Golden View Towers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Block</label>
          <Select onValueChange={(value) => form.setValue('blockId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select block" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="block1">Block A</SelectItem>
              <SelectItem value="block2">Block B</SelectItem>
              <SelectItem value="block3">Block C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Unit</label>
          <Select onValueChange={(value) => form.setValue('unitId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit1">Unit 01</SelectItem>
              <SelectItem value="unit2">Unit 02</SelectItem>
              <SelectItem value="unit3">Unit 03</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Allocation Type</label>
          <Select onValueChange={(value) => form.setValue('allocationType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="reservation">Reservation</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Allocation Date</label>
          <Input 
            type="date"
            {...form.register('allocationDate', { required: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Price *</label>
          <Input 
            {...form.register('price', { required: true })}
            placeholder="e.g., ₦15,000,000" 
          />
        </div>

        <div>
          <label className="text-sm font-medium">Payment Plan</label>
          <Select onValueChange={(value) => form.setValue('paymentPlan', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Payment</SelectItem>
              <SelectItem value="installments_6">6 Months Installment</SelectItem>
              <SelectItem value="installments_12">12 Months Installment</SelectItem>
              <SelectItem value="installments_24">24 Months Installment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Notes</label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Additional notes about the allocation..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Create Allocation
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

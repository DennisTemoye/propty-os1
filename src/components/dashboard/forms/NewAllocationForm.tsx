
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      projectId: '',
      blockId: '',
      plotId: '',
      allocationType: 'sale',
      allocationDate: new Date().toISOString().split('T')[0],
      price: '',
      paymentPlan: '',
      status: 'interested',
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
          <label className="text-sm font-medium text-left block mb-2">Client *</label>
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
          <label className="text-sm font-medium text-left block mb-2">Project *</label>
          <Select onValueChange={(value) => form.setValue('projectId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proj1">Victoria Gardens Estate</SelectItem>
              <SelectItem value="proj2">Emerald Heights</SelectItem>
              <SelectItem value="proj3">Golden View Towers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Block</label>
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
          <Label htmlFor="unitId" className="text-sm font-medium text-left block mb-2">Plot</Label>
          <Select onValueChange={(value) => form.setValue('plotId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select plot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plot1">Plot 01</SelectItem>
              <SelectItem value="plot2">Plot 02</SelectItem>
              <SelectItem value="plot3">Plot 03</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Allocation Type</label>
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
          <label className="text-sm font-medium text-left block mb-2">Initial Status</label>
          <Select onValueChange={(value) => form.setValue('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="allocated">Allocated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-left block mb-2">Allocation Date</label>
          <Input 
            type="date"
            {...form.register('allocationDate', { required: true })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-left block mb-2">Price *</label>
          <Input 
            {...form.register('price', { required: true })}
            placeholder="e.g., ₦15,000,000" 
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Payment Plan</label>
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

      <div>
        <label className="text-sm font-medium text-left block mb-2">Notes</label>
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

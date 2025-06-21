
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

interface NewAllocationFormProps {
  onClose: () => void;
}

const statusDescriptions = {
  'interested': 'Client has shown initial interest',
  'offered': 'Offer or reservation made',
  'allocated': 'Unit officially assigned'
};

export function NewAllocationForm({ onClose }: NewAllocationFormProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      blockId: '',
      unitId: '',
      allocationType: 'sale',
      allocationDate: new Date().toISOString().split('T')[0],
      price: '',
      paymentPlan: '',
      status: 'interested',
      notes: ''
    }
  });

  const { control, watch } = form;
  const selectedStatus = watch('status');

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
          <Label className="text-sm font-medium">Client *</Label>
          <Controller
            name="clientId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client1">John Doe</SelectItem>
                  <SelectItem value="client2">Jane Smith</SelectItem>
                  <SelectItem value="client3">ABC Corporation</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Project *</Label>
          <Controller
            name="projectId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proj1">Victoria Gardens Estate</SelectItem>
                  <SelectItem value="proj2">Emerald Heights</SelectItem>
                  <SelectItem value="proj3">Golden View Towers</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Block</Label>
          <Controller
            name="blockId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="block1">Block A</SelectItem>
                  <SelectItem value="block2">Block B</SelectItem>
                  <SelectItem value="block3">Block C</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Unit</Label>
          <Controller
            name="unitId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit1">Unit 01</SelectItem>
                  <SelectItem value="unit2">Unit 02</SelectItem>
                  <SelectItem value="unit3">Unit 03</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Allocation Type</Label>
          <Controller
            name="allocationType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="reservation">Reservation</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Initial Status *</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                  <SelectItem value="allocated">Allocated</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {selectedStatus && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <Badge className={
            selectedStatus === 'interested' ? 'bg-blue-100 text-blue-800' :
            selectedStatus === 'offered' ? 'bg-orange-100 text-orange-800' :
            'bg-green-100 text-green-800'
          }>
            {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
          </Badge>
          <p className="text-sm text-gray-600 mt-1">
            {statusDescriptions[selectedStatus as keyof typeof statusDescriptions]}
          </p>
        </div>
      )}

      <div>
        <Label className="text-sm font-medium">Allocation Date</Label>
        <Input 
          type="date"
          {...form.register('allocationDate', { required: true })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Price *</Label>
          <Input 
            {...form.register('price', { required: true })}
            placeholder="e.g., ₦15,000,000" 
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Payment Plan</Label>
          <Controller
            name="paymentPlan"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
            )}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Notes</Label>
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

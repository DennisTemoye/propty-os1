
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewClientFormProps {
  onClose: () => void;
}

export function NewClientForm({ onClose }: NewClientFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      clientType: 'individual',
      source: '',
      notes: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new client:', data);
    toast.success('Client created successfully!');
    onClose();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name *</label>
          <Input 
            {...form.register('firstName', { required: true })}
            placeholder="Enter first name" 
          />
        </div>

        <div>
          <label className="text-sm font-medium">Last Name *</label>
          <Input 
            {...form.register('lastName', { required: true })}
            placeholder="Enter last name" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Email *</label>
          <Input 
            type="email"
            {...form.register('email', { required: true })}
            placeholder="Enter email address" 
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number *</label>
          <Input 
            {...form.register('phone', { required: true })}
            placeholder="Enter phone number" 
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Address</label>
        <Input 
          {...form.register('address')}
          placeholder="Enter address" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Client Type</label>
          <Select onValueChange={(value) => form.setValue('clientType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Lead Source</label>
          <Select onValueChange={(value) => form.setValue('source', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="advertisement">Advertisement</SelectItem>
              <SelectItem value="walk_in">Walk-in</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Notes</label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Additional notes about the client..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Create Client
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

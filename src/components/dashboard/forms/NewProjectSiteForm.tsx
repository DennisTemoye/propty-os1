
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewProjectSiteFormProps {
  onClose: () => void;
}

export function NewProjectSiteForm({ onClose }: NewProjectSiteFormProps) {
  const form = useForm({
    defaultValues: {
      name: '',
      location: '',
      type: '',
      description: '',
      size: '',
      status: 'planning'
    }
  });

  const onSubmit = (data: any) => {
    console.log('Creating new project site:', data);
    toast.success('Project site created successfully!');
    onClose();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-left block mb-2">Site Name *</label>
        <Input 
          {...form.register('name', { required: true })}
          placeholder="Enter site name" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Location *</label>
        <Input 
          {...form.register('location', { required: true })}
          placeholder="Enter location" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Site Type *</label>
        <Select onValueChange={(value) => form.setValue('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select site type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="mixed">Mixed Use</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Site Size</label>
        <Input 
          {...form.register('size')}
          placeholder="e.g., 50 hectares" 
        />
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Status</label>
        <Select onValueChange={(value) => form.setValue('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-left block mb-2">Description</label>
        <Textarea 
          {...form.register('description')}
          placeholder="Enter site description..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Create Project Site
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

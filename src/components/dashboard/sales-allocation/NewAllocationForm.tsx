
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface NewAllocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockClients = [
  { id: 'client1', name: 'John Doe', email: 'john@example.com', hasSale: true },
  { id: 'client2', name: 'Sarah Johnson', email: 'sarah@example.com', hasSale: false },
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com', hasSale: true },
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com', hasSale: false }
];

const mockProjects = [
  { id: 'project1', name: 'Victoria Gardens' },
  { id: 'project2', name: 'Emerald Heights' },
  { id: 'project3', name: 'Golden View' }
];

export function NewAllocationForm({ onSubmit, onCancel }: NewAllocationFormProps) {
  const form = useForm({
    defaultValues: {
      clientId: '',
      projectId: '',
      unitId: 'Block A - Plot 02',
      allocationDate: new Date().toISOString().split('T')[0],
      notes: ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    toast.success('Allocation submitted for approval!');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Client *</Label>
          <Select onValueChange={(value) => form.setValue('clientId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {mockClients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-gray-500">{client.email}</div>
                    </div>
                    {client.hasSale && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">
                        Has Sale
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Project *</Label>
          <Select onValueChange={(value) => form.setValue('projectId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Plot Number *</Label>
          <Input 
            {...form.register('unitId', { required: true })}
            placeholder="e.g., Block A - Plot 15"
          />
        </div>

        <div>
          <Label>Allocation Date *</Label>
          <Input 
            type="date"
            {...form.register('allocationDate', { required: true })}
          />
        </div>
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Any additional notes about this allocation..."
          rows={3}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This allocation will be submitted for approval. 
          The designated admin will receive an OTP for verification.
        </p>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

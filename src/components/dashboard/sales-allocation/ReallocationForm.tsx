import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface ReallocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockAllocatedPlots = [
  {
    id: 1,
    plotId: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    currentClient: 'John Doe',
    currentClientId: 'client-1',
    saleAmount: '₦25M'
  },
  {
    id: 2,
    plotId: 'Block B - Plot 08',
    project: 'Golden View',
    currentClient: 'Jane Williams',
    currentClientId: 'client-2',
    saleAmount: '₦30M'
  }
];

const mockClients = [
  { id: 'client3', name: 'Robert Brown', email: 'robert@example.com' },
  { id: 'client4', name: 'Sarah Wilson', email: 'sarah@example.com' },
  { id: 'client5', name: 'Michael Davis', email: 'michael@example.com' }
];

export function ReallocationForm({ onSubmit, onCancel }: ReallocationFormProps) {
  const form = useForm({
    defaultValues: {
      currentAllocationId: '',
      newClientId: '',
      reason: '',
      saleAmount: '',
      initialPayment: '',
      notes: ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    toast.success('Reallocation submitted for approval!');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label>Current Allocation *</Label>
        <Select onValueChange={(value) => form.setValue('currentAllocationId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select current allocation" />
          </SelectTrigger>
          <SelectContent>
            {mockAllocatedPlots.map((allocation) => (
              <SelectItem key={allocation.id} value={allocation.id.toString()}>
                <div>
                  <div className="font-medium">{allocation.plotId}</div>
                  <div className="text-xs text-gray-500">
                    {allocation.project} - {allocation.currentClient} - {allocation.saleAmount}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>New Client *</Label>
        <Select onValueChange={(value) => form.setValue('newClientId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select new client" />
          </SelectTrigger>
          <SelectContent>
            {mockClients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                <div>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-gray-500">{client.email}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Reason for Reallocation *</Label>
        <Textarea 
          {...form.register('reason', { required: true })}
          placeholder="Provide a detailed reason for the reallocation..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>New Sale Amount (₦)</Label>
          <Input 
            type="number"
            {...form.register('saleAmount')}
            placeholder="e.g., 25000000"
          />
        </div>

        <div>
          <Label>Initial Payment (₦)</Label>
          <Input 
            type="number"
            {...form.register('initialPayment')}
            placeholder="e.g., 5000000"
          />
        </div>
      </div>

      <div>
        <Label>Additional Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Any additional information about this reallocation..."
          rows={2}
        />
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800 font-medium">Important: Plot Reallocation</p>
            <p className="text-sm text-yellow-700 mt-1">
              This action will transfer the plot from the current client to the new client. 
              This requires approval and may involve refund processing.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
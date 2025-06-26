
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Building } from 'lucide-react';

interface ReallocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockAllocatedUnits = [
  {
    id: 1,
    unitId: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    currentClient: 'John Doe',
    allocationDate: '2024-01-15'
  },
  {
    id: 2,
    unitId: 'Block B - Plot 08',
    project: 'Golden View',
    currentClient: 'Jane Williams',
    allocationDate: '2024-01-10'
  }
];

const mockClients = [
  { id: 'client4', name: 'Alice Cooper', email: 'alice@example.com' },
  { id: 'client5', name: 'David Wilson', email: 'david@example.com' },
  { id: 'client6', name: 'Emma Thompson', email: 'emma@example.com' }
];

export function ReallocationForm({ onSubmit, onCancel }: ReallocationFormProps) {
  const form = useForm({
    defaultValues: {
      allocationId: '',
      newClientId: '',
      reallocationDate: new Date().toISOString().split('T')[0],
      reason: '',
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
        <Label>Select Unit to Reallocate *</Label>
        <Select onValueChange={(value) => form.setValue('allocationId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select allocated unit" />
          </SelectTrigger>
          <SelectContent>
            {mockAllocatedUnits.map((unit) => (
              <SelectItem key={unit.id} value={unit.id.toString()}>
                <div>
                  <div className="font-medium">{unit.unitId}</div>
                  <div className="text-xs text-gray-500">
                    {unit.project} - Currently: {unit.currentClient}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label>Reallocation Date *</Label>
          <Input 
            type="date"
            {...form.register('reallocationDate', { required: true })}
          />
        </div>
      </div>

      <div>
        <Label>Reason for Reallocation</Label>
        <Select onValueChange={(value) => form.setValue('reason', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client_request">Client Request</SelectItem>
            <SelectItem value="payment_default">Payment Default</SelectItem>
            <SelectItem value="unit_swap">Unit Swap</SelectItem>
            <SelectItem value="administrative">Administrative Change</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Additional Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Provide detailed explanation for this reallocation..."
          rows={3}
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-800">
          <strong>Note:</strong> This reallocation will be submitted for approval. 
          The unit will remain with the current client until approved.
        </p>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

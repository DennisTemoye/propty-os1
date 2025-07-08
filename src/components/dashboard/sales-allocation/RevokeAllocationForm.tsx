import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface RevokeAllocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockAllocatedPlots = [
  {
    id: 1,
    plotId: 'Block A - Plot 02',
    project: 'Victoria Gardens',
    currentClient: 'John Doe',
    totalPaid: '₦15M'
  },
  {
    id: 2,
    plotId: 'Block B - Plot 08',
    project: 'Golden View',
    currentClient: 'Jane Williams',
    totalPaid: '₦8M'
  }
];

export function RevokeAllocationForm({ onSubmit, onCancel }: RevokeAllocationFormProps) {
  const form = useForm({
    defaultValues: {
      allocationId: '',
      reason: '',
      refundType: 'full',
      refundAmount: '',
      notes: ''
    }
  });

  const refundType = form.watch('refundType');

  const handleSubmit = (data: any) => {
    onSubmit(data);
    toast.success('Revocation submitted for approval!');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label>Select Allocation to Revoke *</Label>
        <Select onValueChange={(value) => form.setValue('allocationId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select allocation" />
          </SelectTrigger>
          <SelectContent>
            {mockAllocatedPlots.map((plot) => (
              <SelectItem key={plot.id} value={plot.id.toString()}>
                <div>
                  <div className="font-medium">{plot.plotId}</div>
                  <div className="text-xs text-gray-500">
                    {plot.project} - {plot.currentClient} - Paid: {plot.totalPaid}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Reason for Revocation *</Label>
        <Textarea 
          {...form.register('reason', { required: true })}
          placeholder="Provide a detailed reason for revoking this allocation..."
          rows={3}
        />
      </div>

      <div>
        <Label>Refund Option *</Label>
        <Select onValueChange={(value) => form.setValue('refundType', value)} defaultValue="full">
          <SelectTrigger>
            <SelectValue placeholder="Select refund type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Refund</SelectItem>
            <SelectItem value="partial">Partial Refund</SelectItem>
            <SelectItem value="none">No Refund</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {refundType === 'partial' && (
        <div>
          <Label>Refund Amount (₦)</Label>
          <Input 
            type="number"
            {...form.register('refundAmount')}
            placeholder="e.g., 12000000"
          />
        </div>
      )}

      <div>
        <Label>Additional Notes</Label>
        <Textarea 
          {...form.register('notes')}
          placeholder="Any additional information about this revocation..."
          rows={2}
        />
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-sm text-red-800 font-medium">Warning: Allocation Revocation</p>
            <p className="text-sm text-red-700 mt-1">
              This action will permanently revoke the allocation and mark the plot as available. 
              This requires approval and cannot be undone once approved.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
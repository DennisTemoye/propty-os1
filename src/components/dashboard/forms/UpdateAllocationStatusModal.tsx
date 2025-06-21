
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateAllocationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onUpdate: (data: any) => void;
}

export function UpdateAllocationStatusModal({ isOpen, onClose, allocation, onUpdate }: UpdateAllocationStatusModalProps) {
  const form = useForm({
    defaultValues: {
      status: allocation?.status || 'interested',
      notes: ''
    }
  });

  const statusOptions = [
    { value: 'interested', label: 'Interested' },
    { value: 'offered', label: 'Offered' },
    { value: 'allocated', label: 'Allocated' }
  ];

  const onSubmit = (data: any) => {
    console.log('Updating allocation status:', data);
    onUpdate({
      ...allocation,
      status: data.status,
      notes: data.notes,
      updatedAt: new Date().toISOString()
    });
    toast.success('Allocation status updated successfully!');
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Allocation Status</DialogTitle>
          <DialogDescription>
            Change the status of this property allocation
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Current Status</Label>
            <Select onValueChange={(value) => form.setValue('status', value)} defaultValue={allocation?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea 
              {...form.register('notes')}
              placeholder="Add any notes about this status change..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Update Status
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

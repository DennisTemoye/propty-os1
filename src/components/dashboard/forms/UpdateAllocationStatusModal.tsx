
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Calendar, User, Building } from 'lucide-react';

interface UpdateAllocationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onStatusUpdate: (data: any) => void;
}

const statusColors = {
  'interested': 'bg-blue-100 text-blue-800',
  'offered': 'bg-orange-100 text-orange-800',
  'allocated': 'bg-green-100 text-green-800',
  'revoked': 'bg-red-100 text-red-800'
};

export function UpdateAllocationStatusModal({ 
  isOpen, 
  onClose, 
  allocation, 
  onStatusUpdate 
}: UpdateAllocationStatusModalProps) {
  const form = useForm({
    defaultValues: {
      status: allocation?.status || 'interested',
      notes: ''
    }
  });

  const { control, watch } = form;
  const currentStatus = watch('status');

  const onSubmit = (data: any) => {
    console.log('Updating allocation status:', data);
    
    const updateData = {
      ...data,
      allocationId: allocation?.id,
      previousStatus: allocation?.status,
      timestamp: new Date().toISOString(),
      updatedBy: 'Current User' // Replace with actual user context
    };

    onStatusUpdate(updateData);
    toast.success(`Allocation status updated to ${data.status}`);
    onClose();
    form.reset();
  };

  if (!allocation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Allocation Status</DialogTitle>
          <DialogDescription>
            Change the status of this unit allocation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Allocation Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Allocation Details</h4>
              <Badge className={statusColors[allocation.status as keyof typeof statusColors]}>
                {allocation.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>{allocation.clientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-gray-400" />
                <span>{allocation.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{allocation.date}</span>
              </div>
              <div className="text-purple-600 font-medium">
                {allocation.amount}
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="status">New Status *</Label>
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

            {currentStatus && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <Badge className={statusColors[currentStatus as keyof typeof statusColors]}>
                  {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">
                  {currentStatus === 'interested' && 'Client has shown initial interest in this unit'}
                  {currentStatus === 'offered' && 'An offer or reservation has been made to the client'}
                  {currentStatus === 'allocated' && 'Unit is officially assigned to the client'}
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Status Update Notes</Label>
              <Textarea 
                {...form.register('notes')}
                placeholder="Add any notes about this status change..."
                rows={3}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AllocationStatus } from '@/types/allocation';
import { AllocationStatusBadge } from './AllocationStatusBadge';
import { toast } from 'sonner';

interface UpdateAllocationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onStatusUpdate: (newStatus: AllocationStatus, notes?: string) => void;
}

export function UpdateAllocationStatusModal({ 
  isOpen, 
  onClose, 
  allocation, 
  onStatusUpdate 
}: UpdateAllocationStatusModalProps) {
  const [newStatus, setNewStatus] = useState<AllocationStatus>(allocation?.status || 'interested');
  const [notes, setNotes] = useState('');

  const handleUpdate = () => {
    if (newStatus === allocation?.status) {
      toast.error('Please select a different status');
      return;
    }

    onStatusUpdate(newStatus, notes.trim() || undefined);
    toast.success('Allocation status updated successfully');
    onClose();
    setNotes('');
  };

  if (!allocation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Allocation Status</DialogTitle>
          <DialogDescription>
            Change the status for {allocation.client?.name} - {allocation.unit?.plotId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Status */}
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <AllocationStatusBadge status={allocation.status} />
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <Label>New Status *</Label>
            <Select value={newStatus} onValueChange={(value: AllocationStatus) => setNewStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="allocated">Allocated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this status change..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleUpdate} className="flex-1">
              Update Status
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

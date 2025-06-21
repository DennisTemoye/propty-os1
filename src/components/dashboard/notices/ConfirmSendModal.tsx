
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Send } from 'lucide-react';

interface ConfirmSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: any;
  recipientCount: number;
}

export function ConfirmSendModal({ isOpen, onClose, onConfirm, formData, recipientCount }: ConfirmSendModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Confirm Send
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to send this notice?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">Notice Details</h4>
            <div className="text-sm text-amber-700 space-y-1">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Recipients:</strong> {recipientCount} clients</p>
              <p><strong>Channels:</strong> {formData.channels.join(', ')}</p>
              {formData.attachment && (
                <p><strong>Attachment:</strong> {formData.attachment.name}</p>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            This action cannot be undone. The notice will be sent immediately to all selected recipients.
          </p>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            <Send className="h-4 w-4 mr-2" />
            Send Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

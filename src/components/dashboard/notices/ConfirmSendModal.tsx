
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Send, X } from 'lucide-react';

interface ConfirmSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: any;
  onConfirm: () => void;
}

export function ConfirmSendModal({ isOpen, onClose, notice, onConfirm }: ConfirmSendModalProps) {
  const getRecipientCount = () => {
    if (notice.recipientType === 'all') return 'all clients';
    if (notice.recipientType === 'selected') return `${notice.selectedClients.length} selected clients`;
    if (notice.recipientType === 'project') return 'clients under the selected project';
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Confirm Send Notice
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to send this notice?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          <p><strong>Title:</strong> {notice.title}</p>
          <p><strong>Recipients:</strong> {getRecipientCount()}</p>
          <p><strong>Channels:</strong> {notice.channels.join(', ')}</p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This action cannot be undone. The notice will be sent immediately to all specified recipients.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4 mr-2" />
            Confirm & Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

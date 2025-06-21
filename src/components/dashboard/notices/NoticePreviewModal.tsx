
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, X } from 'lucide-react';

interface NoticePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: any;
  onSend: () => void;
}

export function NoticePreviewModal({ isOpen, onClose, notice, onSend }: NoticePreviewModalProps) {
  const getRecipientText = () => {
    if (notice.recipientType === 'all') return 'All Clients';
    if (notice.recipientType === 'selected') return `${notice.selectedClients.length} Selected Clients`;
    if (notice.recipientType === 'project') return 'Clients under Selected Project';
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview Notice</DialogTitle>
          <DialogDescription>
            Review your notice before sending
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{notice.title}</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap">{notice.message}</p>
          </div>
          
          {notice.attachment && (
            <div>
              <p className="text-sm text-gray-600">
                <strong>Attachment:</strong> {notice.attachment.name}
              </p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <strong className="text-sm">Channels:</strong>
            {notice.channels.map((channel: string) => (
              <Badge key={channel} variant="outline">
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
              </Badge>
            ))}
          </div>
          
          <div>
            <strong className="text-sm">Recipients:</strong>
            <span className="ml-2 text-sm text-gray-600">{getRecipientText()}</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Send Notice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

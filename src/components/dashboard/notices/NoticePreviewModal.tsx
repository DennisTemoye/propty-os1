
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Eye, FileText } from 'lucide-react';

interface NoticePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  formData: any;
  recipientCount: number;
}

export function NoticePreviewModal({ isOpen, onClose, onSend, formData, recipientCount }: NoticePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Notice Preview
          </DialogTitle>
          <DialogDescription>
            Review your notice before sending to {recipientCount} recipient(s)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notice Details */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">{formData.title}</h3>
            <div className="whitespace-pre-wrap text-gray-700 mb-4">
              {formData.message}
            </div>
            
            {formData.attachment && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>Attachment: {formData.attachment.name}</span>
              </div>
            )}
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Recipients</h4>
              <p className="text-sm text-gray-600">{recipientCount} clients</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Channels</h4>
              <div className="flex gap-2">
                {formData.channels.map((channel: string) => (
                  <Badge key={channel} variant="outline">
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Send Notice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Send, 
  Mail,
  DollarSign,
  User,
  Building
} from 'lucide-react';
import { toast } from 'sonner';

interface SimpleOfferConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onConfirm: (offer: any, emailContent: string) => void;
}

export function SimpleOfferConfirmationModal({ 
  isOpen, 
  onClose, 
  offer, 
  onConfirm 
}: SimpleOfferConfirmationModalProps) {
  const [emailContent, setEmailContent] = useState(`Dear ${offer?.clientName || 'Client'},

We are pleased to confirm your property offer for ${offer?.projectName || 'our development project'}.

Offer Details:
- Project: ${offer?.projectName || 'N/A'}
- Amount: ${offer?.saleAmount || 'N/A'}
- Type: ${offer?.salesType === 'offer_only' ? 'Property Offer' : 'Property Offer with Unit Allocation'}

Your offer letter will be prepared and delivered to you shortly. Please keep this email for your records.

For any questions, please contact our sales team.

Best regards,
Sales Team`);

  if (!offer) return null;

  const handleConfirm = () => {
    onConfirm(offer, emailContent);
    onClose();
    toast.success('Offer notification sent to client successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-blue-600" />
            <span>Send Offer Email</span>
          </DialogTitle>
          <DialogDescription>
            Review offer details and send email notification to client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Offer Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Offer Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Client</div>
                    <div className="font-semibold">{offer.clientName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Project</div>
                    <div className="font-semibold">{offer.projectName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="font-semibold text-emerald-600">{offer.saleAmount}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <Badge className="bg-blue-600 text-white">
                      {offer.salesType === 'offer_only' ? 'Offer Only' : 'Offer + Allocation'}
                    </Badge>
                  </div>
                </div>
              </div>
              {offer.initialPayment && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-sm text-gray-600">Initial Payment</div>
                  <div className="font-semibold text-emerald-600">{offer.initialPayment}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Notification */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-600" />
              <Label className="text-lg font-semibold">Email Notification to Client</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-content">Email Content</Label>
              <Textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={12}
                className="w-full"
                placeholder="Enter email content..."
              />
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> This email serves as confirmation to the client. 
                The formal offer letter will be prepared separately and delivered through your standard process.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Offer Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
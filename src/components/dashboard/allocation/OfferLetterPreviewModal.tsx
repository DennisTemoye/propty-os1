
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Send, Edit, Download } from 'lucide-react';

interface OfferLetterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onSend: (offer: any) => void;
}

export function OfferLetterPreviewModal({ isOpen, onClose, offer, onSend }: OfferLetterPreviewModalProps) {
  if (!offer) return null;

  const handleSend = () => {
    onSend(offer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Offer Letter Preview</span>
          </DialogTitle>
          <DialogDescription>
            Review the offer letter before sending to client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Offer Details */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Client</div>
                  <div className="font-medium">{offer.clientName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Project</div>
                  <div className="font-medium">{offer.projectName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="font-medium">{offer.saleAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <Badge className="bg-blue-600 text-white">
                    {offer.salesType === 'offer_only' ? 'Offer Only' : 'Offer + Allocation'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Letter Template Preview */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 text-sm">
                <div className="text-center">
                  <h3 className="text-lg font-bold">PROPERTY OFFER LETTER</h3>
                  <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <p><strong>To:</strong> {offer.clientName}</p>
                  <p><strong>Subject:</strong> Property Offer - {offer.projectName}</p>
                </div>

                <div className="space-y-2">
                  <p>Dear {offer.clientName},</p>
                  
                  <p>
                    We are pleased to present you with an exclusive offer for a property in our 
                    prestigious <strong>{offer.projectName}</strong> development.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Offer Details:</h4>
                    <ul className="space-y-1">
                      <li><strong>Project:</strong> {offer.projectName}</li>
                      {offer.unitNumber && <li><strong>Unit:</strong> {offer.unitNumber}</li>}
                      <li><strong>Total Amount:</strong> {offer.saleAmount}</li>
                      {offer.initialPayment && <li><strong>Initial Payment:</strong> {offer.initialPayment}</li>}
                      <li><strong>Offer Type:</strong> {offer.salesType === 'offer_only' ? 'Property Offer (Unit selection pending)' : 'Property Offer with Unit Allocation'}</li>
                    </ul>
                  </div>

                  <p>
                    This offer is valid for 30 days from the date of this letter. To proceed with 
                    this offer, please contact our sales team within the specified timeframe.
                  </p>

                  {offer.salesType === 'offer_only' && (
                    <p className="text-blue-600">
                      <strong>Note:</strong> Unit allocation will be processed upon your acceptance 
                      of this offer and completion of initial payment requirements.
                    </p>
                  )}

                  <p>
                    We look forward to welcoming you to our community.
                  </p>

                  <div className="mt-4">
                    <p>Best regards,</p>
                    <p><strong>Sales Team</strong></p>
                    <p>Property Management Company</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send to Client
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Template
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
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

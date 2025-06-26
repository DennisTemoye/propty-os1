
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Edit } from 'lucide-react';
import { PendingAllocation } from '@/types/allocation';

interface AllocationLetterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: PendingAllocation | null;
}

export function AllocationLetterPreviewModal({ isOpen, onClose, allocation }: AllocationLetterPreviewModalProps) {
  if (!allocation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Allocation Letter Preview</span>
          </DialogTitle>
          <DialogDescription>
            Preview the allocation letter that will be sent to the client upon approval
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Allocation Details */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Client</div>
                  <div className="font-medium">{allocation.clientName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Project</div>
                  <div className="font-medium">{allocation.projectName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Unit</div>
                  <div className="font-medium">{allocation.unit}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <Badge className="bg-blue-600 text-white">
                    {allocation.salesType === 'instant_allocation' ? 'Instant Allocation' : 
                     allocation.salesType === 'sales_offer' ? 'Sales Offer' : 
                     'Reservation'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Letter Template Preview */}
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="text-center border-b pb-4">
                  <h3 className="text-lg font-bold uppercase tracking-wide">
                    UNIT ALLOCATION LETTER
                  </h3>
                  <p className="text-gray-600 mt-2">Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="space-y-2">
                    <p><strong>To:</strong> {allocation.clientName}</p>
                    <p><strong>Subject:</strong> Unit Allocation Confirmation - {allocation.projectName}</p>
                  </div>

                  <div className="space-y-3">
                    <p>Dear {allocation.clientName},</p>
                    
                    <p>
                      We are pleased to confirm the allocation of your unit in our prestigious{' '}
                      <strong>{allocation.projectName}</strong> development.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Allocation Details:</h4>
                      <ul className="space-y-1">
                        <li><strong>Project:</strong> {allocation.projectName}</li>
                        <li><strong>Unit Number:</strong> {allocation.unit}</li>
                        <li><strong>Allocation Amount:</strong> {allocation.amount}</li>
                        <li><strong>Allocation Type:</strong> {allocation.salesType === 'instant_allocation' ? 'Instant Allocation' : 
                                                                    allocation.salesType === 'sales_offer' ? 'Sales Offer Allocation' : 
                                                                    'Reserved Allocation'}</li>
                        <li><strong>Allocation Date:</strong> {new Date().toLocaleDateString()}</li>
                      </ul>
                    </div>

                    <p>
                      This allocation is now confirmed and your unit has been reserved exclusively for you. 
                      Please review the attached documentation and contact our team if you have any questions.
                    </p>

                    {allocation.notes && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800">
                          <strong>Special Notes:</strong> {allocation.notes}
                        </p>
                      </div>
                    )}

                    <p>
                      We look forward to welcoming you to our community and assisting you through 
                      the next steps of your property journey.
                    </p>

                    <div className="mt-6">
                      <p>Best regards,</p>
                      <p><strong>Allocations Department</strong></p>
                      <p>Property Management Company</p>
                      <p>Email: allocations@company.com</p>
                      <p>Phone: +234 123 456 7890</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-8">
                  <p className="text-sm text-gray-600">
                    This letter will be automatically generated and sent upon allocation approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Template
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

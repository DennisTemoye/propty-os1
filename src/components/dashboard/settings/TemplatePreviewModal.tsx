
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Edit } from 'lucide-react';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

export function TemplatePreviewModal({ isOpen, onClose, template }: TemplatePreviewModalProps) {
  if (!template) return null;

  const sampleData = {
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unitNumber: 'Block A - Plot 15',
    saleAmount: '₦25,000,000',
    initialPayment: '₦5,000,000',
    offerDate: new Date().toLocaleDateString(),
    allocationDate: new Date().toLocaleDateString(),
    companyName: 'Property Management Company',
    companyAddress: '123 Business District, Lagos',
    companyPhone: '+234 123 456 7890',
    marketerName: 'Jane Smith'
  };

  const renderTemplateContent = (content: string) => {
    let renderedContent = content;
    Object.entries(sampleData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      renderedContent = renderedContent.replace(new RegExp(placeholder, 'g'), value);
    });
    return renderedContent;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Template Preview - {template.name}</span>
          </DialogTitle>
          <DialogDescription>
            Preview how the template will look with sample data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Template Name</div>
                  <div className="font-medium">{template.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-medium">{template.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge className={template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {template.status}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fields</div>
                  <div className="font-medium">{template.fields?.length || 0} fields</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Preview */}
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="text-center border-b pb-4">
                  <h3 className="text-lg font-bold uppercase tracking-wide">
                    {template.type === 'offer_letter' ? 'Property Offer Letter' :
                     template.type === 'allocation_letter' ? 'Unit Allocation Letter' :
                     template.type === 'payment_notice' ? 'Payment Notice' :
                     'Official Letter'}
                  </h3>
                  <p className="text-gray-600 mt-2">Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed">
                  {template.content ? renderTemplateContent(template.content) : 
                   'No template content available'}
                </div>

                <div className="border-t pt-4 mt-8">
                  <p className="text-sm text-gray-600">
                    This is a preview with sample data. Actual letters will use real client and project information.
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

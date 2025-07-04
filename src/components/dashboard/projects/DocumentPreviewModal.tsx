import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, X } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: number;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: string;
  };
}

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = () => {
    // Simulate download
    toast.success(`Downloading ${document.name}...`);
  };

  const handleOpenExternal = () => {
    // Simulate opening in new tab
    toast.info('Opening document in new tab...');
    window.open('#', '_blank');
  };

  const isPDF = document.name.toLowerCase().endsWith('.pdf');
  const isImage = document.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
  const isDocument = document.name.toLowerCase().match(/\.(doc|docx|xlsx|xls)$/);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {document.name}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(document.status)}>
              {document.status}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenExternal}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open External
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {/* Document Info */}
          <div className="bg-muted p-4 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span> {document.type}
              </div>
              <div>
                <span className="font-medium">Size:</span> {document.size}
              </div>
              <div>
                <span className="font-medium">Uploaded:</span> {document.uploadDate}
              </div>
            </div>
          </div>

          {/* Document Preview Area */}
          <div className="border-2 border-dashed border-muted rounded-lg h-96 flex items-center justify-center">
            {isPDF ? (
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-lg">PDF Document</h3>
                  <p className="text-muted-foreground">PDF preview would be displayed here</p>
                  <div className="mt-4 space-x-2">
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={handleOpenExternal}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>
            ) : isImage ? (
              <div className="text-center space-y-4">
                <div className="w-full h-64 bg-muted rounded flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png" 
                    alt={document.name}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
                <p className="text-muted-foreground text-sm">Image preview</p>
              </div>
            ) : isDocument ? (
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-lg">Office Document</h3>
                  <p className="text-muted-foreground">Document preview would be displayed here</p>
                  <div className="mt-4 space-x-2">
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Document
                    </Button>
                    <Button variant="outline" onClick={handleOpenExternal}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Office Online
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-lg">Document Preview</h3>
                  <p className="text-muted-foreground">Preview not available for this file type</p>
                  <Button onClick={handleDownload} className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download File
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
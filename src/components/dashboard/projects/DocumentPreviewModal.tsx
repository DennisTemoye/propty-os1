import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Eye, Calendar, User, FileType, Maximize2, X } from 'lucide-react';
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
    uploadedBy?: string;
  };
}

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      case 'xlsx':
      case 'xls':
        return '📊';
      default:
        return '📎';
    }
  };

  const handleDownload = () => {
    // Simulate download
    toast.success(`Downloading ${document.name}...`);
    
    // In a real app, you would trigger the actual download here
    const downloadLink = window.document.createElement('a');
    downloadLink.href = '#'; // This would be the actual file URL
    downloadLink.download = document.name;
    downloadLink.click();
  };

  const handlePreview = () => {
    // Simulate opening preview in new tab
    toast.success('Opening document preview...');
    // window.open(document.url, '_blank');
  };

  // Mock preview content based on document type
  const renderPreviewContent = () => {
    const extension = document.name.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return (
        <div className="bg-white border rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
          <div className="space-y-4">
            <div className="text-6xl">📄</div>
            <div>
              <h3 className="font-semibold text-lg">PDF Document Preview</h3>
              <p className="text-muted-foreground">Click "Open Full View" to view the complete document</p>
            </div>
            <Button onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Open Full View
            </Button>
          </div>
        </div>
      );
    }

    if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
      return (
        <div className="bg-white border rounded-lg p-4">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
            alt="Document preview"
            className="w-full h-64 object-cover rounded"
          />
          <p className="text-sm text-muted-foreground mt-2 text-center">Image preview</p>
        </div>
      );
    }

    if (['doc', 'docx'].includes(extension || '')) {
      return (
        <div className="bg-white border rounded-lg p-6 min-h-[400px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Document Preview</span>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <p><strong>Project:</strong> Victoria Gardens Estate</p>
              <p><strong>Document Type:</strong> {document.type}</p>
              <p><strong>Content:</strong> This document contains important project information...</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-sm">
              <p className="font-medium mb-2">Document Summary:</p>
              <p>This is a preview of the document content. The actual document contains detailed information about the project specifications, legal requirements, and compliance documentation.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
        <div className="space-y-4">
          <div className="text-6xl">{getFileIcon(document.name)}</div>
          <div>
            <h3 className="font-semibold text-lg">Document Preview</h3>
            <p className="text-muted-foreground">Preview not available for this file type</p>
          </div>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-left">
              <span className="text-2xl">{getFileIcon(document.name)}</span>
              <div>
                <div>{document.name}</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {document.size} • {document.type}
                </div>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileType className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Type</div>
                <div className="font-medium">{document.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Uploaded</div>
                <div className="font-medium">{document.uploadDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Uploaded By</div>
                <div className="font-medium">{document.uploadedBy || 'Admin User'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <Badge className={getStatusColor(document.status)}>
                  {document.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Document Preview
            </h3>
            {renderPreviewContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
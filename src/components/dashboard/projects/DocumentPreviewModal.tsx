import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  FileType,
  HardDrive,
  Eye,
  ExternalLink
} from 'lucide-react';
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

export function DocumentPreviewModal({ isOpen, onClose, document: doc }: DocumentPreviewModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!doc) return null;

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
        return '📁';
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock download
      const link = window.document.createElement('a');
      link.href = '#'; // In a real app, this would be the actual file URL
      link.download = doc.name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      toast.success(`${doc.name} downloaded successfully!`);
    } catch (error) {
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenInNewTab = () => {
    // In a real app, this would open the actual document URL
    toast.info('Document would open in a new tab');
  };

  const isImage = doc.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
  const isPDF = doc.name.toLowerCase().endsWith('.pdf');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {getFileIcon(doc.name)}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{doc.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileType className="h-4 w-4" />
                        {doc.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <HardDrive className="h-4 w-4" />
                        {doc.size}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {doc.uploadDate}
                      </div>
                      {doc.uploadedBy && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {doc.uploadedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Document Preview Area */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">
                  {getFileIcon(doc.name)}
                </div>
                
                {isImage && (
                  <div className="max-w-2xl mx-auto">
                    <img 
                      src={`https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=${encodeURIComponent(doc.name)}`}
                      alt={doc.name}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}

                {isPDF && (
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">PDF Document</h4>
                    <p className="text-gray-500 mb-4">
                      This is a PDF document. Click the button below to view it in full screen or download it.
                    </p>
                  </div>
                )}

                {!isImage && !isPDF && (
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {doc.type} Document
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Preview not available for this file type. You can download the document to view it.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Document Actions */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            
            <Button 
              onClick={handleOpenInNewTab}
              variant="outline" 
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>

          {/* Document Details */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Document Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">File Name:</span>
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Document Type:</span>
                    <span className="font-medium">{doc.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">File Size:</span>
                    <span className="font-medium">{doc.size}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Upload Date:</span>
                    <span className="font-medium">{doc.uploadDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                  {doc.uploadedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uploaded By:</span>
                      <span className="font-medium">{doc.uploadedBy}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
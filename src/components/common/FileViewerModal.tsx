
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, X, FileText, Image, File, Loader2, AlertCircle, RotateCw } from 'lucide-react';
import { toast } from 'sonner';

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    name: string;
    type: 'pdf' | 'image' | 'document' | 'csv' | 'excel';
    url?: string;
    content?: string;
    size?: string;
    downloadData?: any;
  } | null;
  onDownload?: (file: any) => Promise<void>;
}

export function FileViewerModal({ isOpen, onClose, file, onDownload }: FileViewerModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (!file) return null;

  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-600" />;
      case 'image':
        return <Image className="h-6 w-6 text-green-600" />;
      case 'csv':
      case 'excel':
        return <File className="h-6 w-6 text-blue-600" />;
      default:
        return <File className="h-6 w-6 text-gray-600" />;
    }
  };

  const getFileTypeColor = () => {
    switch (file.type) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'csv':
      case 'excel':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = async () => {
    if (!onDownload) return;
    
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      await onDownload(file);
      toast.success(`${file.name} downloaded successfully`);
    } catch (error) {
      const errorMessage = 'Download failed. Please try again.';
      setDownloadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetry = () => {
    setDownloadError(null);
    handleDownload();
  };

  const renderPreview = () => {
    switch (file.type) {
      case 'pdf':
        return (
          <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <p className="text-gray-600">PDF Preview</p>
              <p className="text-sm text-gray-500 mt-2">
                {file.url ? 'PDF viewer would be integrated here' : 'PDF content ready for download'}
              </p>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            {file.url ? (
              <img 
                src={file.url} 
                alt={file.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center">
                <Image className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Image Preview</p>
              </div>
            )}
          </div>
        );
      
      case 'csv':
      case 'excel':
        return (
          <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <File className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Data Export Preview</p>
              <p className="text-sm text-gray-500 mt-2">
                {file.type === 'csv' ? 'CSV' : 'Excel'} file ready for download
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <File className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600">Document Preview</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon()}
              <div>
                <DialogTitle>{file.name}</DialogTitle>
                <DialogDescription className="flex items-center space-x-2 mt-1">
                  <Badge className={getFileTypeColor()}>
                    {file.type.toUpperCase()}
                  </Badge>
                  {file.size && (
                    <span className="text-sm text-gray-500">{file.size}</span>
                  )}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {renderPreview()}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="flex-1">
            {downloadError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{downloadError}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRetry}
                  className="text-red-600 hover:text-red-700"
                >
                  <RotateCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {onDownload && (
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

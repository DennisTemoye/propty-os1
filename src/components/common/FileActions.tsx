
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Eye, FileText, Receipt, FolderOpen, Loader2 } from 'lucide-react';
import { FileViewerModal } from './FileViewerModal';
import { EnhancedDownloadService } from '@/services/enhancedDownloadService';

interface FileAction {
  type: string;
  label: string;
  icon: React.ReactNode;
  downloadFn: () => Promise<void>;
}

interface FileActionsProps {
  actions: FileAction[];
  size?: 'sm' | 'default';
  variant?: 'default' | 'outline';
  label?: string;
}

export function FileActions({ actions, size = 'sm', variant = 'outline', label = 'Download' }: FileActionsProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [downloadingAction, setDownloadingAction] = useState<string | null>(null);

  const handlePreview = (action: FileAction) => {
    const fileData = EnhancedDownloadService.createFileViewerData(
      action.type,
      action.label
    );
    setSelectedFile({ ...fileData, downloadAction: action });
    setIsFileViewerOpen(true);
  };

  const handleDirectDownload = async (action: FileAction) => {
    setDownloadingAction(action.type);
    try {
      await action.downloadFn();
    } finally {
      setDownloadingAction(null);
    }
  };

  const handleFileViewerDownload = async (file: any) => {
    if (file.downloadAction) {
      await file.downloadAction.downloadFn();
    }
  };

  if (actions.length === 1) {
    const action = actions[0];
    const isDownloading = downloadingAction === action.type;
    
    return (
      <>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size={size}
            onClick={() => handlePreview(action)}
            disabled={isDownloading}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant={variant}
            size={size}
            onClick={() => handleDirectDownload(action)}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-1" />
            )}
            {isDownloading ? 'Downloading...' : label}
          </Button>
        </div>

        <FileViewerModal
          isOpen={isFileViewerOpen}
          onClose={() => setIsFileViewerOpen(false)}
          file={selectedFile}
          onDownload={handleFileViewerDownload}
        />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size}>
            <Download className="h-4 w-4 mr-2" />
            {label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action, index) => {
            const isDownloading = downloadingAction === action.type;
            return (
              <React.Fragment key={action.type}>
                <DropdownMenuItem 
                  onClick={() => handlePreview(action)}
                  disabled={isDownloading}
                  className="cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview {action.label}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDirectDownload(action)}
                  disabled={isDownloading}
                  className="cursor-pointer"
                >
                  {isDownloading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    action.icon
                  )}
                  {isDownloading ? 'Downloading...' : action.label}
                </DropdownMenuItem>
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <FileViewerModal
        isOpen={isFileViewerOpen}
        onClose={() => setIsFileViewerOpen(false)}
        file={selectedFile}
        onDownload={handleFileViewerDownload}
      />
    </>
  );
}

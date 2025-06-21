
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Sheet, File } from 'lucide-react';
import { DownloadService, DownloadOptions } from '@/services/downloadService';

interface DownloadButtonProps {
  data: any;
  filename: string;
  formats?: ('pdf' | 'csv' | 'xlsx')[];
  template?: 'receipt' | 'statement' | 'report' | 'invoice';
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function DownloadButton({ 
  data, 
  filename, 
  formats = ['pdf', 'csv'], 
  template,
  className,
  variant = 'outline',
  size = 'sm'
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (type: 'pdf' | 'csv' | 'xlsx') => {
    setIsLoading(true);
    
    const options: DownloadOptions = {
      filename: `${filename}.${type}`,
      data,
      type,
      template,
      watermark: {
        companyName: 'ProptyOS'
      }
    };

    try {
      switch (type) {
        case 'pdf':
          await DownloadService.generatePDF(options);
          break;
        case 'csv':
          await DownloadService.generateCSV(options);
          break;
        case 'xlsx':
          await DownloadService.generateExcel(options);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-3 w-3 mr-2" />;
      case 'csv':
        return <Sheet className="h-3 w-3 mr-2" />;
      case 'xlsx':
        return <File className="h-3 w-3 mr-2" />;
      default:
        return <Download className="h-3 w-3 mr-2" />;
    }
  };

  if (formats.length === 1) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => handleDownload(formats[0])}
        disabled={isLoading}
        className={className}
      >
        <Download className="h-3 w-3 mr-2" />
        {isLoading ? 'Generating...' : `Download ${formats[0].toUpperCase()}`}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={isLoading} className={className}>
          <Download className="h-3 w-3 mr-2" />
          {isLoading ? 'Generating...' : 'Download'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {formats.map((format) => (
          <DropdownMenuItem key={format} onClick={() => handleDownload(format)}>
            {getIcon(format)}
            Download as {format.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Receipt, FolderOpen } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

interface ClientDownloadActionsProps {
  client: any;
}

export function ClientDownloadActions({ client }: ClientDownloadActionsProps) {
  const handleDownloadReceipt = () => {
    // Mock recent payment data
    const recentPayment = {
      id: 'RCP-001',
      date: new Date(),
      amount: '₦5,000,000',
      type: 'Property Payment',
      method: 'Bank Transfer',
      project: client.projects?.[0]?.name || 'Victoria Gardens'
    };
    
    DownloadService.generateClientReceipt(client, recentPayment);
    toast.success('Receipt downloaded successfully');
  };

  const handleDownloadStatement = () => {
    // Mock transaction data
    const transactions = [
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        description: 'Property Payment - Initial',
        type: 'payment',
        amount: '₦5,000,000',
        balance: '₦5,000,000'
      },
      {
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        description: 'Infrastructure Fee',
        type: 'fee',
        amount: '₦500,000',
        balance: '₦4,500,000'
      }
    ];
    
    DownloadService.generateClientStatement(client, transactions);
    toast.success('Statement downloaded successfully');
  };

  const handleDownloadKYCBundle = () => {
    toast.info('KYC document bundle preparation in progress...');
    setTimeout(() => {
      toast.success('KYC documents downloaded successfully');
    }, 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDownloadReceipt}>
          <Receipt className="h-4 w-4 mr-2" />
          Recent Receipt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadStatement}>
          <FileText className="h-4 w-4 mr-2" />
          Payment Statement
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadKYCBundle}>
          <FolderOpen className="h-4 w-4 mr-2" />
          KYC Documents
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import React from 'react';
import { Receipt, FileText, FolderOpen } from 'lucide-react';
import { FileActions } from '@/components/common/FileActions';
import { EnhancedDownloadService } from '@/services/enhancedDownloadService';

interface ClientDownloadActionsProps {
  client: any;
}

export function ClientDownloadActions({ client }: ClientDownloadActionsProps) {
  const fileActions = [
    {
      type: 'receipt',
      label: 'Recent Receipt',
      icon: <Receipt className="h-4 w-4 mr-2" />,
      downloadFn: async () => {
        const recentPayment = {
          id: 'RCP-001',
          date: new Date(),
          amount: '₦5,000,000',
          type: 'Property Payment',
          method: 'Bank Transfer',
          project: client.projects?.[0]?.name || 'Victoria Gardens'
        };
        await EnhancedDownloadService.downloadClientReceipt(client, recentPayment);
      }
    },
    {
      type: 'statement',
      label: 'Payment Statement',
      icon: <FileText className="h-4 w-4 mr-2" />,
      downloadFn: async () => {
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
        await EnhancedDownloadService.downloadClientStatement(client, transactions);
      }
    },
    {
      type: 'document',
      label: 'KYC Documents',
      icon: <FolderOpen className="h-4 w-4 mr-2" />,
      downloadFn: async () => {
        await EnhancedDownloadService.downloadClientKYC(client);
      }
    }
  ];

  return <FileActions actions={fileActions} label="Download" />;
}

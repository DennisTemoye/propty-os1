
import React from 'react';
import { FileText, Table } from 'lucide-react';
import { FileActions } from '@/components/common/FileActions';
import { EnhancedDownloadService } from '@/services/enhancedDownloadService';

interface ReportExportActionsProps {
  reportType: string;
  reportData?: any;
  filters?: any;
}

export function ReportExportActions({ reportType, reportData, filters }: ReportExportActionsProps) {
  const getReportActions = () => {
    const baseActions = [
      {
        type: 'pdf',
        label: 'PDF Report',
        icon: <FileText className="h-4 w-4 mr-2" />,
        downloadFn: async () => {
          if (reportType === 'sales') {
            const salesData = reportData || [
              { date: '2024-01-15', clientName: 'John Doe', project: 'Victoria Gardens', unit: 'Block A-02', amount: '₦25,000,000', commission: '₦750,000', marketer: 'Jane Smith', status: 'Completed' },
              { date: '2024-01-10', clientName: 'Sarah Wilson', project: 'Emerald Heights', unit: 'Block B-08', amount: '₦30,000,000', commission: '₦900,000', marketer: 'Mike Johnson', status: 'Completed' }
            ];
            await EnhancedDownloadService.downloadSalesReport(salesData);
          } else {
            // Handle other report types
            const mockData = {
              totalRevenue: 125000000,
              totalExpenses: 25000000,
              outstanding: 45000000,
              commissionPaid: 5000000,
              fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              toDate: new Date()
            };
            await EnhancedDownloadService.downloadAccountingReport(mockData);
          }
        }
      },
      {
        type: 'excel',
        label: 'Excel Export',
        icon: <Table className="h-4 w-4 mr-2" />,
        downloadFn: async () => {
          const mockData = reportData || [
            { metric: 'Total Sales', value: '₦125,000,000', change: '+15%' },
            { metric: 'Active Clients', value: '342', change: '+8%' },
            { metric: 'Projects Completed', value: '12', change: '+3%' }
          ];
          
          const { generateExcel } = await import('@/utils/downloadUtils');
          generateExcel(mockData, `${reportType}_Report_${new Date().toISOString().split('T')[0]}`, 'Report Data');
        }
      },
      {
        type: 'csv',
        label: 'CSV Export',
        icon: <FileText className="h-4 w-4 mr-2" />,
        downloadFn: async () => {
          const mockData = reportData || [
            { date: '2024-01-15', category: 'Sales', description: 'Property Sale - Victoria Gardens', amount: '25000000' },
            { date: '2024-01-10', category: 'Commission', description: 'Marketer Commission', amount: '750000' }
          ];
          
          const { generateCSV } = await import('@/utils/downloadUtils');
          generateCSV(mockData, `${reportType}_Report_${new Date().toISOString().split('T')[0]}`);
        }
      }
    ];

    return baseActions;
  };

  return (
    <FileActions 
      actions={getReportActions()} 
      label="Export Report"
      variant="default"
      size="default"
    />
  );
}

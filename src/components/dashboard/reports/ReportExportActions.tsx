
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Table } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

interface ReportExportActionsProps {
  reportType: string;
  reportData?: any;
  filters?: any;
}

export function ReportExportActions({ reportType, reportData, filters }: ReportExportActionsProps) {
  const handleExportPDF = () => {
    toast.info('Generating PDF report...');
    
    setTimeout(() => {
      if (reportType === 'sales') {
        const salesData = reportData || [
          { date: '2024-01-15', clientName: 'John Doe', project: 'Victoria Gardens', unit: 'Block A-02', amount: '₦25,000,000', commission: '₦750,000', marketer: 'Jane Smith', status: 'Completed' },
          { date: '2024-01-10', clientName: 'Sarah Wilson', project: 'Emerald Heights', unit: 'Block B-08', amount: '₦30,000,000', commission: '₦900,000', marketer: 'Mike Johnson', status: 'Completed' }
        ];
        DownloadService.generateSalesReport(salesData);
      }
      toast.success('PDF report downloaded successfully');
    }, 1500);
  };

  const handleExportExcel = () => {
    toast.info('Generating Excel export...');
    
    setTimeout(() => {
      const mockData = reportData || [
        { metric: 'Total Sales', value: '₦125,000,000', change: '+15%' },
        { metric: 'Active Clients', value: '342', change: '+8%' },
        { metric: 'Projects Completed', value: '12', change: '+3%' }
      ];
      
      import('@/utils/downloadUtils').then(({ generateExcel }) => {
        generateExcel(mockData, `${reportType}_Report_${new Date().toISOString().split('T')[0]}`, 'Report Data');
        toast.success('Excel export downloaded successfully');
      });
    }, 1500);
  };

  const handleExportCSV = () => {
    toast.info('Generating CSV export...');
    
    setTimeout(() => {
      const mockData = reportData || [
        { date: '2024-01-15', category: 'Sales', description: 'Property Sale - Victoria Gardens', amount: '25000000' },
        { date: '2024-01-10', category: 'Commission', description: 'Marketer Commission', amount: '750000' }
      ];
      
      import('@/utils/downloadUtils').then(({ generateCSV }) => {
        generateCSV(mockData, `${reportType}_Report_${new Date().toISOString().split('T')[0]}`);
        toast.success('CSV export downloaded successfully');
      });
    }, 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel}>
          <Table className="h-4 w-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileText className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

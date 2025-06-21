
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

export function AccountingDownloadActions() {
  const handleDownloadSummary = () => {
    const summaryData = {
      fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      toDate: new Date(),
      totalRevenue: 125000000,
      totalExpenses: 45000000,
      outstanding: 15000000,
      commissionPaid: 8500000
    };
    
    DownloadService.generateAccountingSummary(summaryData);
    toast.success('Accounting summary downloaded successfully');
  };

  const handleDownloadExpenses = () => {
    const expenseData = [
      { date: '2024-01-15', category: 'Marketing', description: 'Digital Advertising', amount: '₦150,000' },
      { date: '2024-01-10', category: 'Operations', description: 'Office Rent', amount: '₦500,000' },
      { date: '2024-01-05', category: 'Staff', description: 'Salaries', amount: '₦2,800,000' }
    ];
    
    const csvData = expenseData.map(expense => ({
      'Date': expense.date,
      'Category': expense.category,
      'Description': expense.description,
      'Amount': expense.amount
    }));
    
    import('@/utils/downloadUtils').then(({ generateCSV }) => {
      generateCSV(csvData, `Expense_Log_${new Date().toISOString().split('T')[0]}`);
      toast.success('Expense log downloaded successfully');
    });
  };

  const handleDownloadCommissions = () => {
    const commissionData = [
      { marketer: 'Jane Smith', client: 'John Doe', project: 'Victoria Gardens', amount: '₦25,000,000', commission: '₦750,000', rate: '3%', status: 'Paid' },
      { marketer: 'Mike Johnson', client: 'Sarah Wilson', project: 'Emerald Heights', amount: '₦30,000,000', commission: '₦900,000', rate: '3%', status: 'Pending' }
    ];
    
    import('@/utils/downloadUtils').then(({ generateExcel }) => {
      generateExcel(commissionData, `Commission_Records_${new Date().toISOString().split('T')[0]}`, 'Commissions');
      toast.success('Commission records downloaded successfully');
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDownloadSummary}>
          <FileText className="h-4 w-4 mr-2" />
          Accounting Summary (PDF)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadExpenses}>
          <DollarSign className="h-4 w-4 mr-2" />
          Expense Log (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadCommissions}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Commission Records (Excel)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, TrendingUp, TrendingDown, DollarSign, FileText, Download, Filter, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IncomeForm } from './accounting/IncomeForm';
import { ExpenseForm } from './accounting/ExpenseForm';
import { PaymentsManagement } from './accounting/PaymentsManagement';
import { AnalyticsCharts } from './accounting/AnalyticsCharts';
import { AccountingDownloadActions } from './accounting/AccountingDownloadActions';
import { toast } from 'sonner';

export function Accounting() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('this-month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all'); // New filter for marketers

  // Mock data with comprehensive transaction types
  const mockTransactions = [
    {
      id: 1,
      type: 'income',
      category: 'Property Sales',
      description: 'Sale of Block A - Plot 02, Victoria Gardens',
      amount: 25000000,
      date: '2024-01-15',
      status: 'completed',
      reference: 'PS-001',
      client: 'John Doe',
      marketer: 'Jane Smith',
      project: 'Victoria Gardens',
      block: 'Block A'
    },
    {
      id: 2,
      type: 'income',
      category: 'Instalment Payment',
      description: 'Second instalment - Block B - Plot 08, Emerald Heights',
      amount: 5000000,
      date: '2024-01-18',
      status: 'completed',
      reference: 'INS-001',
      client: 'Sarah Johnson',
      marketer: 'Mike Davis',
      project: 'Emerald Heights',
      block: 'Block B'
    },
    {
      id: 3,
      type: 'income',
      category: 'Survey Fee',
      description: 'Survey fee for Block A - Plot 15, Victoria Gardens',
      amount: 750000,
      date: '2024-01-20',
      status: 'completed',
      reference: 'SUR-001',
      client: 'David Wilson',
      marketer: 'Jane Smith',
      project: 'Victoria Gardens',
      block: 'Block A'
    },
    {
      id: 4,
      type: 'income',
      category: 'Legal Fee',
      description: 'Legal documentation fee - Golden View Towers',
      amount: 1200000,
      date: '2024-01-22',
      status: 'completed',
      reference: 'LEG-001',
      client: 'Michael Brown',
      marketer: 'Sarah Johnson',
      project: 'Golden View Towers',
      block: 'Block C'
    },
    {
      id: 5,
      type: 'income',
      category: 'Documentation Fee',
      description: 'Title documentation processing fee',
      amount: 850000,
      date: '2024-01-25',
      status: 'pending',
      reference: 'DOC-001',
      client: 'Lisa Anderson',
      marketer: 'Mike Davis',
      project: 'Emerald Heights',
      block: 'Block A'
    },
    {
      id: 6,
      type: 'expense',
      category: 'Commission',
      description: 'Sales commission for Jane Smith - John Doe allocation',
      amount: 625000,
      date: '2024-01-15',
      status: 'paid',
      reference: 'COM-001',
      client: 'John Doe',
      marketer: 'Jane Smith',
      project: 'Victoria Gardens',
      block: 'Block A'
    },
    {
      id: 7,
      type: 'expense',
      category: 'Office Expenses',
      description: 'Monthly office rent and utilities',
      amount: 850000,
      date: '2024-01-01',
      status: 'paid',
      reference: 'OFF-001',
      project: 'General',
      block: 'N/A'
    },
    {
      id: 8,
      type: 'expense',
      category: 'Staff Salaries',
      description: 'January staff salaries and benefits',
      amount: 4200000,
      date: '2024-01-31',
      status: 'paid',
      reference: 'SAL-001',
      project: 'General',
      block: 'N/A'
    },
    {
      id: 9,
      type: 'expense',
      category: 'Marketing',
      description: 'Digital marketing and advertising campaigns',
      amount: 1500000,
      date: '2024-01-20',
      status: 'paid',
      reference: 'MKT-001',
      project: 'General',
      block: 'N/A'
    },
    {
      id: 10,
      type: 'expense',
      category: 'Refund',
      description: 'Partial refund for allocation revocation - Robert Brown',
      amount: 8800000,
      date: '2024-01-20',
      status: 'completed',
      reference: 'REF-001',
      client: 'Robert Brown',
      marketer: 'Jane Smith',
      project: 'Victoria Gardens',
      block: 'Block B'
    }
  ];

  const marketers = ['Jane Smith', 'Mike Davis', 'Sarah Johnson'];

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    const matchesMarketer = marketerFilter === 'all' || transaction.marketer === marketerFilter;
    // Add date filtering logic here based on dateFilter
    return matchesCategory && matchesMarketer;
  });

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCommissions = filteredTransactions
    .filter(t => t.category === 'Commission')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = filteredTransactions
    .filter(t => t.category === 'Refund')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleIncomeSubmit = (data: any) => {
    console.log('Income submitted:', data);
    toast.success('Income record added successfully');
  };

  const handleExpenseSubmit = (data: any) => {
    console.log('Expense submitted:', data);
    toast.success('Expense record added successfully');
  };

  const kpiData = [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      subtitle: 'This period',
      icon: TrendingUp,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      subtitle: 'This period',
      icon: TrendingDown,
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      cardBg: 'from-red-50 to-red-100',
    },
    {
      title: 'Commission Paid',
      value: formatCurrency(totalCommissions),
      subtitle: 'To marketers',
      icon: DollarSign,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Net Profit',
      value: formatCurrency(netProfit),
      subtitle: 'After expenses',
      icon: FileText,
      color: netProfit >= 0 ? 'text-emerald-700' : 'text-red-700',
      bgColor: netProfit >= 0 ? 'bg-emerald-100' : 'bg-red-100',
      cardBg: netProfit >= 0 ? 'from-emerald-50 to-emerald-100' : 'from-red-50 to-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounting & Finance</h1>
          <p className="text-gray-600 mt-1">Track income, expenses, and financial performance</p>
        </div>
        <div className="flex space-x-2">
          <AccountingDownloadActions />
          <Dialog open={isIncomeModalOpen} onOpenChange={setIsIncomeModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-success hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Income</DialogTitle>
                <DialogDescription>Add a new income transaction</DialogDescription>
              </DialogHeader>
              <IncomeForm 
                isOpen={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                onSubmit={handleIncomeSubmit}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:bg-primary/5 hover:border-primary/20 transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Expense</DialogTitle>
                <DialogDescription>Add a new expense transaction</DialogDescription>
              </DialogHeader>
              <ExpenseForm 
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                onSubmit={handleExpenseSubmit}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="project-summaries">Project Summaries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Transactions with Enhanced Filtering */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex space-x-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Property Sales">Property Sales</SelectItem>
                      <SelectItem value="Instalment Payment">Instalment Payment</SelectItem>
                      <SelectItem value="Survey Fee">Survey Fee</SelectItem>
                      <SelectItem value="Legal Fee">Legal Fee</SelectItem>
                      <SelectItem value="Documentation Fee">Documentation Fee</SelectItem>
                      <SelectItem value="Commission">Commission</SelectItem>
                      <SelectItem value="Office Expenses">Office Expenses</SelectItem>
                      <SelectItem value="Staff Salaries">Staff Salaries</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={marketerFilter} onValueChange={setMarketerFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Marketer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Marketers</SelectItem>
                      {marketers.map(marketer => (
                        <SelectItem key={marketer} value={marketer}>
                          {marketer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Client/Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.slice(0, 10).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{transaction.client}</div>
                          {transaction.marketer && (
                            <div className="text-gray-500">via {transaction.marketer}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Enhanced Transactions View with Marketer Filtering */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Transactions</CardTitle>
                <div className="flex space-x-2">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Property Sales">Property Sales</SelectItem>
                      <SelectItem value="Instalment Payment">Instalment Payment</SelectItem>
                      <SelectItem value="Survey Fee">Survey Fee</SelectItem>
                      <SelectItem value="Legal Fee">Legal Fee</SelectItem>
                      <SelectItem value="Documentation Fee">Documentation Fee</SelectItem>
                      <SelectItem value="Commission">Commission</SelectItem>
                      <SelectItem value="Office Expenses">Office Expenses</SelectItem>
                      <SelectItem value="Staff Salaries">Staff Salaries</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={marketerFilter} onValueChange={setMarketerFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Marketer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Marketers</SelectItem>
                      {marketers.map(marketer => (
                        <SelectItem key={marketer} value={marketer}>
                          {marketer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                      <TableCell>{transaction.client}</TableCell>
                      <TableCell>{transaction.marketer || '-'}</TableCell>
                      <TableCell className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentsManagement />
        </TabsContent>

        <TabsContent value="project-summaries" className="space-y-6">
          {/* Project Financial Summaries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {['Victoria Gardens', 'Emerald Heights', 'Golden View Towers'].map((project) => {
              const projectTransactions = filteredTransactions.filter(t => t.project === project);
              const projectIncome = projectTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
              const projectExpenses = projectTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
              const projectProfit = projectIncome - projectExpenses;
              
              return (
                <Card key={project} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{project}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Income</span>
                        <span className="font-semibold text-green-600">{formatCurrency(projectIncome)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Expenses</span>
                        <span className="font-semibold text-red-600">{formatCurrency(projectExpenses)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Net Profit</span>
                          <span className={`font-bold ${projectProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(projectProfit)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Block-wise breakdown */}
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium mb-2">Block Performance</h4>
                      <div className="space-y-1">
                        {['Block A', 'Block B', 'Block C'].map((block) => {
                          const blockTransactions = projectTransactions.filter(t => t.block === block);
                          const blockIncome = blockTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
                          
                          if (blockIncome === 0) return null;
                          
                          return (
                            <div key={block} className="flex justify-between text-xs">
                              <span className="text-gray-600">{block}</span>
                              <span className="font-medium">{formatCurrency(blockIncome)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

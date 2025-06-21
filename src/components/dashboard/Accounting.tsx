
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

export function Accounting() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('this-month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all'); // New filter for marketers

  // Mock data with marketer commissions integrated
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
      marketer: 'Jane Smith'
    },
    {
      id: 2,
      type: 'expense',
      category: 'Commission',
      description: 'Sales commission for Jane Smith - John Doe allocation',
      amount: 625000,
      date: '2024-01-15',
      status: 'paid',
      reference: 'COM-001',
      client: 'John Doe',
      marketer: 'Jane Smith'
    },
    {
      id: 3,
      type: 'income',
      category: 'Property Sales',
      description: 'Sale of Block B - Plot 08, Emerald Heights',
      amount: 30000000,
      date: '2024-01-10',
      status: 'completed',
      reference: 'PS-002',
      client: 'Sarah Johnson',
      marketer: 'Mike Davis'
    },
    {
      id: 4,
      type: 'expense',
      category: 'Commission',
      description: 'Sales commission for Mike Davis - Sarah Johnson allocation',
      amount: 900000,
      date: '2024-01-10',
      status: 'pending',
      reference: 'COM-002',
      client: 'Sarah Johnson',
      marketer: 'Mike Davis'
    },
    {
      id: 5,
      type: 'expense',
      category: 'Refund',
      description: 'Partial refund for allocation revocation - Robert Brown',
      amount: 8800000,
      date: '2024-01-20',
      status: 'completed',
      reference: 'REF-001',
      client: 'Robert Brown',
      marketer: 'Jane Smith'
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
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Income</DialogTitle>
                <DialogDescription>Add a new income transaction</DialogDescription>
              </DialogHeader>
              <IncomeForm onClose={() => setIsIncomeModalOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Expense</DialogTitle>
                <DialogDescription>Add a new expense transaction</DialogDescription>
              </DialogHeader>
              <ExpenseForm onClose={() => setIsExpenseModalOpen(false)} />
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
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
                      <SelectItem value="Commission">Commission</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                      <SelectItem value="Infrastructure Fee">Infrastructure Fee</SelectItem>
                      <SelectItem value="Service Charge">Service Charge</SelectItem>
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
                      <SelectItem value="Commission">Commission</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                      <SelectItem value="Infrastructure Fee">Infrastructure Fee</SelectItem>
                      <SelectItem value="Service Charge">Service Charge</SelectItem>
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

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

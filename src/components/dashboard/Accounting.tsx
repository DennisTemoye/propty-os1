import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  CreditCard
} from 'lucide-react';
import { ExpenseForm } from './accounting/ExpenseForm';
import { IncomeForm } from './accounting/IncomeForm';
import { AnalyticsCharts } from './accounting/AnalyticsCharts';
import { PaymentsManagement } from './accounting/PaymentsManagement';

// Mock data
const mockExpenses = [
  {
    id: 1,
    title: 'Digital Marketing Campaign',
    vendor: 'AdTech Solutions',
    date: '2024-01-15',
    amount: 2500000,
    category: 'Marketing & Advertising',
    paymentMethod: 'Bank Transfer',
    status: 'verified',
    notes: 'Q1 property marketing campaign'
  },
  {
    id: 2,
    title: 'Legal Documentation',
    vendor: 'Lagos Legal Associates',
    date: '2024-01-10',
    amount: 850000,
    category: 'Legal & Registration',
    paymentMethod: 'Cheque',
    status: 'pending',
    notes: 'Property registration fees'
  }
];

const mockIncome = [
  {
    id: 1,
    title: 'Oceanview Apartment Sale',
    client: 'Mrs. Adaora Okafor',
    project: 'Lekki Gardens Phase II',
    date: '2024-01-20',
    amount: 45000000,
    category: 'Property Sales',
    paymentMethod: 'Bank Transfer',
    status: 'received'
  }
];

export function Accounting() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [income, setIncome] = useState(mockIncome);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Calculate totals
  const totalRevenue = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending').reduce((sum, item) => sum + item.amount, 0);

  const handleAddExpense = (data) => {
    const newExpense = {
      id: expenses.length + 1,
      ...data,
      date: data.date.toISOString().split('T')[0],
      amount: parseFloat(data.amount)
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleAddIncome = (data) => {
    const newIncome = {
      id: income.length + 1,
      ...data,
      date: data.date.toISOString().split('T')[0],
      amount: parseFloat(data.amount)
    };
    setIncome([...income, newIncome]);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleEditIncome = (incomeItem) => {
    setEditingIncome(incomeItem);
    setShowIncomeForm(true);
  };

  const toggleExpenseStatus = (id) => {
    setExpenses(expenses.map(exp => 
      exp.id === id 
        ? { ...exp, status: exp.status === 'pending' ? 'verified' : 'pending' }
        : exp
    ));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Accounting & Expenses</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button 
            onClick={() => setShowIncomeForm(true)}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Income
          </Button>
          <Button 
            onClick={() => setShowExpenseForm(true)}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
                <div className="text-sm text-gray-500">Total Expenses</div>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(netProfit)}</div>
                <div className="text-sm text-gray-500">Net Profit</div>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(pendingExpenses)}</div>
                <div className="text-sm text-gray-500">Pending Approval</div>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {income.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.client}</div>
                      </div>
                      <div className="text-green-600 font-bold">{formatCurrency(item.amount)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.slice(0, 5).map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium">{expense.title}</div>
                        <div className="text-sm text-gray-500">{expense.category}</div>
                      </div>
                      <div className="text-red-600 font-bold">{formatCurrency(expense.amount)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsManagement />
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {income.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-green-600 font-bold">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditIncome(item)}
                          >
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="expenses" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Marketing & Advertising">Marketing & Advertising</SelectItem>
                    <SelectItem value="Legal & Registration">Legal & Registration</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Other Admin Costs">Other Admin Costs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell className="text-red-600 font-bold">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={expense.status === 'verified' ? 'default' : 'secondary'}
                          className={expense.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditExpense(expense)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleExpenseStatus(expense.id)}
                          >
                            {expense.status === 'verified' ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
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

        <TabsContent value="analytics">
          <AnalyticsCharts />
        </TabsContent>
      </Tabs>

      {/* Forms */}
      <ExpenseForm
        isOpen={showExpenseForm}
        onClose={() => {
          setShowExpenseForm(false);
          setEditingExpense(null);
        }}
        onSubmit={handleAddExpense}
        expense={editingExpense}
      />

      <IncomeForm
        isOpen={showIncomeForm}
        onClose={() => {
          setShowIncomeForm(false);
          setEditingIncome(null);
        }}
        onSubmit={handleAddIncome}
        income={editingIncome}
      />
    </div>
  );
}

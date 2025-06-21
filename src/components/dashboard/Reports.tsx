import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  FileText,
  Download,
  Filter,
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react';
import { ReportExportActions } from './reports/ReportExportActions';

export function Reports() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('this-month');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const mockData = [
    {
      id: 1,
      date: '2024-01-15',
      category: 'Sales',
      description: 'Property sale to John Doe',
      amount: 250000,
      status: 'completed',
    },
    {
      id: 2,
      date: '2024-01-10',
      category: 'Expenses',
      description: 'Marketing campaign',
      amount: -50000,
      status: 'pending',
    },
    {
      id: 3,
      date: '2024-01-05',
      category: 'Sales',
      description: 'Property sale to Jane Smith',
      amount: 150000,
      status: 'completed',
    },
    {
      id: 4,
      date: '2023-12-28',
      category: 'Expenses',
      description: 'Office rent',
      amount: -20000,
      status: 'completed',
    },
  ];

  const filteredData = mockData.filter((item) => {
    if (dateRange === 'this-month' && new Date(item.date).getMonth() !== new Date().getMonth()) {
      return false;
    }
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  const totalIncome = filteredData
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = filteredData
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const netProfit = totalIncome + totalExpenses;

  const kpiData = [
    {
      title: 'Total Income',
      value: `$${totalIncome}`,
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      title: 'Total Expenses',
      value: `$${Math.abs(totalExpenses)}`,
      icon: TrendingDown,
      color: 'text-red-500',
    },
    {
      title: 'Net Profit',
      value: `$${netProfit}`,
      icon: BarChart,
      color: netProfit >= 0 ? 'text-green-500' : 'text-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports and insights</p>
        </div>
        <div className="flex space-x-2">
          <ReportExportActions reportType={selectedReport} />
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Expenses">Expenses</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <kpi.icon className={`h-4 w-4 mr-2 ${kpi.color}`} />
                {kpi.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

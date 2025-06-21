import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Filter, Calendar, Users, Building, TrendingUp } from 'lucide-react';
import { ReportExportActions } from './reports/ReportExportActions';

export function Reports() {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('this-month');
  const [projectFilter, setProjectFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all');
  const [statusFilter, setStatusFilter] useState('all');
  const [includeRefunds, setIncludeRefunds] = useState(false);

  // Mock data for sales reports
  const mockSalesData = [
    {
      id: 1,
      date: '2024-01-15',
      project: 'Victoria Gardens',
      property: 'Block A - Plot 02',
      client: 'John Doe',
      marketer: 'Jane Smith',
      amount: 25000000,
      status: 'completed',
      commission: 625000,
      refund: 0,
    },
    {
      id: 2,
      date: '2024-01-10',
      project: 'Emerald Heights',
      property: 'Block B - Plot 08',
      client: 'Sarah Johnson',
      marketer: 'Mike Davis',
      amount: 30000000,
      status: 'completed',
      commission: 900000,
      refund: 0,
    },
    {
      id: 3,
      date: '2024-01-20',
      project: 'Victoria Gardens',
      property: 'Block C - Plot 15',
      client: 'Robert Brown',
      marketer: 'Jane Smith',
      amount: 22000000,
      status: 'pending',
      commission: 550000,
      refund: 8800000,
    },
  ];

  // Mock data for financial reports
  const mockFinancialData = [
    {
      id: 1,
      date: '2024-01-15',
      category: 'Property Sales',
      description: 'Sale of Block A - Plot 02, Victoria Gardens',
      amount: 25000000,
      type: 'income',
    },
    {
      id: 2,
      date: '2024-01-15',
      category: 'Commission',
      description: 'Sales commission for Jane Smith - John Doe allocation',
      amount: 625000,
      type: 'expense',
    },
  ];

  // Mock data for marketer performance reports
  const mockMarketerData = [
    {
      id: 1,
      name: 'Jane Smith',
      sales: 2,
      volume: 47000000,
      commission: 1175000,
    },
    {
      id: 2,
      name: 'Mike Davis',
      sales: 1,
      volume: 30000000,
      commission: 900000,
    },
  ];

  // Filtered sales data based on selected filters
  const filteredSalesData = mockSalesData.filter((sale) => {
    const matchesDateRange =
      dateRange === 'all-time' || sale.date.startsWith('2024-01'); // Simplified date range check
    const matchesProject =
      projectFilter === 'all' || sale.project === projectFilter;
    const matchesMarketer =
      marketerFilter === 'all' || sale.marketer === marketerFilter;
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesDateRange && matchesProject && matchesMarketer && matchesStatus;
  });

  // Calculate total sales, commission, and refunds
  const totalSales = filteredSalesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalCommission = filteredSalesData.reduce((sum, sale) => sum + sale.commission, 0);
  const totalRefunds = filteredSalesData.reduce((sum, sale) => sum + sale.refund, 0);

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    setIncludeRefunds(checked === true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports and insights</p>
        </div>
        <ReportExportActions reportType="sales" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(totalSales)}
                </CardTitle>
                <p className="text-sm text-gray-500">Total Sales</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(totalCommission)}
                </CardTitle>
                <p className="text-sm text-gray-500">Total Commission</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(totalRefunds)}
                </CardTitle>
                <p className="text-sm text-gray-500">Total Refunds</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="marketer">Marketer Performance</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales Performance Report</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-refunds" 
                      checked={includeRefunds}
                      onCheckedChange={handleCheckedChange}
                    />
                    <label htmlFor="include-refunds" className="text-sm">Include Refunds</label>
                  </div>
                  <ReportExportActions reportType="sales" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="Victoria Gardens">Victoria Gardens</SelectItem>
                      <SelectItem value="Emerald Heights">Emerald Heights</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={marketerFilter} onValueChange={setMarketerFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Marketer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Marketers</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Refund</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.project}</TableCell>
                      <TableCell>{sale.property}</TableCell>
                      <TableCell>{sale.client}</TableCell>
                      <TableCell>{sale.marketer}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(sale.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge>{sale.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(sale.commission)}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(sale.refund)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFinancialData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(item.amount)}
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketer Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMarketerData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sales}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(item.volume)}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(item.commission)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This tab will contain custom report generation options.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, TrendingUp, Users, DollarSign, Calendar, Filter, Eye } from 'lucide-react';
import { ReportExportActions } from './reports/ReportExportActions';
import { ReportsGenerator } from './reports/ReportsGenerator';

export function Reports() {
  const [activeTab, setActiveTab] = useState('sales');
  
  // Filter states
  const [dateRange, setDateRange] = useState('this-month');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [marketerFilter, setMarketerFilter] = useState('all'); // New marketer filter
  const [includeRevoked, setIncludeRevoked] = useState(true); // For revoked allocations

  // Mock data for sales reports with enhanced marketer integration
  const salesData = [
    {
      id: 1,
      clientName: 'John Doe',
      project: 'Victoria Gardens',
      unit: 'Block A - Plot 02',
      amount: '₦25M',
      status: 'allocated',
      date: '2024-01-15',
      marketer: 'Jane Smith',
      commission: '₦625K',
      commissionStatus: 'paid'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      project: 'Emerald Heights',
      unit: 'Block B - Plot 08',
      amount: '₦30M',
      status: 'allocated',
      date: '2024-01-10',
      marketer: 'Mike Davis',
      commission: '₦900K',
      commissionStatus: 'pending'
    },
    {
      id: 3,
      clientName: 'Robert Brown',
      project: 'Victoria Gardens',
      unit: 'Block C - Plot 15',
      amount: '₦22M',
      status: 'revoked',
      date: '2024-01-05',
      revokedDate: '2024-01-20',
      revocationReason: 'Client financial constraints',
      refundType: 'partial',
      refundAmount: '₦8.8M',
      marketer: 'Jane Smith',
      commission: '₦0',
      commissionStatus: 'cancelled'
    },
    {
      id: 4,
      clientName: 'Lisa Wilson',
      project: 'Golden View',
      unit: 'Block D - Plot 03',
      amount: '₦35M',
      status: 'interested',
      date: '2024-01-22',
      marketer: 'Sarah Johnson',
      commission: '₦0',
      commissionStatus: 'pending_allocation'
    }
  ];

  const marketers = ['Jane Smith', 'Mike Davis', 'Sarah Johnson'];

  // Filter data based on current filters
  const filteredSalesData = salesData.filter(sale => {
    const matchesProject = projectFilter === 'all' || sale.project === projectFilter;
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    const matchesMarketer = marketerFilter === 'all' || sale.marketer === marketerFilter;
    const shouldInclude = includeRevoked || sale.status !== 'revoked';
    return matchesProject && matchesStatus && matchesMarketer && shouldInclude;
  });

  // Mock commission reports data
  const commissionReports = [
    {
      id: 1,
      marketer: 'Jane Smith',
      totalSales: 3,
      totalVolume: '₦47M',
      totalCommission: '₦625K',
      paidCommission: '₦625K',
      pendingCommission: '₦0',
      period: 'January 2024'
    },
    {
      id: 2,
      marketer: 'Mike Davis',
      totalSales: 2,
      totalVolume: '₦65M',
      totalCommission: '₦1.5M',
      paidCommission: '₦600K',
      pendingCommission: '₦900K',
      period: 'January 2024'
    },
    {
      id: 3,
      marketer: 'Sarah Johnson',
      totalSales: 1,
      totalVolume: '₦35M',
      totalCommission: '₦875K',
      paidCommission: '₦0',
      pendingCommission: '₦875K',
      period: 'January 2024'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allocated':
        return 'bg-green-100 text-green-800';
      case 'interested':
        return 'bg-yellow-100 text-yellow-800';
      case 'offered':
        return 'bg-blue-100 text-blue-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const kpiData = [
    {
      title: 'Total Sales',
      value: filteredSalesData.filter(s => s.status === 'allocated').length.toString(),
      subtitle: 'Allocated units',
      icon: TrendingUp,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Sales Volume',
      value: '₦110M',
      subtitle: 'Total value',
      icon: DollarSign,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      cardBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Active Clients',
      value: filteredSalesData.length.toString(),
      subtitle: 'All statuses',
      icon: Users,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Commission Paid',
      value: '₦1.2M',
      subtitle: 'To marketers',
      icon: FileText,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      cardBg: 'from-amber-50 to-amber-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate detailed reports and insights</p>
        </div>
        <div className="flex space-x-2">
          <ReportExportActions reportType="sales" />
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
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

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="commission">Commission Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* Enhanced Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="Victoria Gardens">Victoria Gardens</SelectItem>
                      <SelectItem value="Emerald Heights">Emerald Heights</SelectItem>
                      <SelectItem value="Golden View">Golden View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="interested">Interested</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                      <SelectItem value="allocated">Allocated</SelectItem>
                      <SelectItem value="revoked">Revoked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Marketer</label>
                  <Select value={marketerFilter} onValueChange={setMarketerFilter}>
                    <SelectTrigger>
                      <SelectValue />
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Options</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-revoked" 
                      checked={includeRevoked}
                      onCheckedChange={(checked) => setIncludeRevoked(checked === true)}
                    />
                    <label htmlFor="include-revoked" className="text-sm">
                      Include Revoked
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales & Allocation Report</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Project/Unit</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.project}</div>
                          <div className="text-sm text-gray-500">{sale.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{sale.amount}</TableCell>
                      <TableCell>{sale.marketer}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.commission}</div>
                          <Badge className={`text-xs ${getStatusColor(sale.commissionStatus)}`}>
                            {sale.commissionStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                        {sale.status === 'revoked' && (
                          <div className="text-xs text-gray-500 mt-1">
                            Revoked: {sale.revokedDate}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {sale.status === 'revoked' && (
                            <Button variant="ghost" size="sm" title="View Revocation Details">
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-6">
          {/* Commission Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Marketer Commission Report</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Commission Summary
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Sales Volume</TableHead>
                    <TableHead>Total Commission</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.marketer}</TableCell>
                      <TableCell>{report.totalSales}</TableCell>
                      <TableCell className="font-medium">{report.totalVolume}</TableCell>
                      <TableCell className="font-medium text-purple-600">{report.totalCommission}</TableCell>
                      <TableCell className="text-green-600">{report.paidCommission}</TableCell>
                      <TableCell className="text-orange-600">{report.pendingCommission}</TableCell>
                      <TableCell>{report.period}</TableCell>
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

        <TabsContent value="financial" className="space-y-6">
          {/* Financial reports content with revocation data */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Revenue Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Sales Revenue:</span>
                      <span className="font-medium">₦110M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Refunds:</span>
                      <span className="font-medium text-red-600">-₦8.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Net Revenue:</span>
                      <span className="font-medium text-green-600">₦101.2M</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Commission Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Commission Earned:</span>
                      <span className="font-medium">₦3M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Commission Paid:</span>
                      <span className="font-medium text-green-600">₦1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Commission Pending:</span>
                      <span className="font-medium text-orange-600">₦1.8M</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Revocation Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Units Revoked:</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Refunds Issued:</span>
                      <span className="font-medium text-red-600">₦8.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revocation Rate:</span>
                      <span className="font-medium">5.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <ReportsGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}

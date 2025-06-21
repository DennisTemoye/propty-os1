
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';
import { FeeActions } from './FeeActions';

interface FeesOverviewTabProps {
  mockFeeData: any[];
  onRecordPayment: (fee: any) => void;
  onViewDetails: (fee: any) => void;
}

export function FeesOverviewTab({ mockFeeData, onRecordPayment, onViewDetails }: FeesOverviewTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Partially Paid':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partially Paid':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredFees = mockFeeData.filter(fee => {
    const matchesSearch = fee.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    const matchesProject = filterProject === 'all' || fee.project === filterProject;
    return matchesSearch && matchesStatus && matchesProject;
  });

  // Calculate metrics
  const totalAmount = mockFeeData.reduce((sum, fee) => sum + parseInt(fee.amount.replace(/[₦,]/g, '')), 0);
  const totalCollected = mockFeeData.reduce((sum, fee) => sum + parseInt(fee.paid.replace(/[₦,]/g, '')), 0);
  const totalOutstanding = mockFeeData.reduce((sum, fee) => sum + parseInt(fee.outstanding.replace(/[₦,]/g, '')), 0);
  const overdueCount = mockFeeData.filter(fee => fee.status === 'Overdue').length;
  const collectionRate = ((totalCollected / totalAmount) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-600">{collectionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+2.5% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Collected</p>
                <p className="text-2xl font-bold text-green-600">₦{(totalCollected / 1000000).toFixed(1)}M</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">₦1.2M this week</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">₦{(totalOutstanding / 1000000).toFixed(1)}M</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-600">{mockFeeData.filter(f => f.status === 'Pending').length} pending</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-600">Requires attention</span>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-lg">Fee Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by client, project, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Victoria Gardens">Victoria Gardens</SelectItem>
                  <SelectItem value="Emerald Heights">Emerald Heights</SelectItem>
                  <SelectItem value="Golden View">Golden View</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">Client & Project</TableHead>
                  <TableHead className="font-semibold">Fee Details</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold">Due Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => {
                  const progressPercentage = (parseInt(fee.paid.replace(/[₦,]/g, '')) / parseInt(fee.amount.replace(/[₦,]/g, ''))) * 100;
                  const isOverdue = new Date(fee.dueDate) < new Date() && fee.status !== 'Paid';
                  
                  return (
                    <TableRow key={fee.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium cursor-pointer hover:text-blue-600" onClick={() => onViewDetails(fee)}>
                            {fee.clientName}
                          </div>
                          <div className="text-sm text-gray-500">{fee.project}</div>
                          <div className="text-xs text-gray-400">{fee.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{fee.feeType}</div>
                          <div className="text-xs text-gray-500">ID: {fee.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-bold">{fee.amount}</div>
                          <div className="text-sm text-gray-500">
                            Paid: <span className="text-green-600">{fee.paid}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Outstanding: <span className="text-red-600">{fee.outstanding}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(fee.status)}
                          <Badge className={`${getStatusColor(fee.status)} border`}>
                            {fee.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${fee.status === 'Paid' ? 'bg-green-500' : fee.status === 'Partially Paid' ? 'bg-yellow-500' : 'bg-gray-300'}`}
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">{progressPercentage.toFixed(0)}% paid</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={isOverdue ? 'text-red-600 font-medium' : ''}>
                          {fee.dueDate}
                          {isOverdue && (
                            <div className="text-xs text-red-500">Overdue</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <FeeActions 
                          fee={fee}
                          onRecordPayment={onRecordPayment}
                          onViewDetails={onViewDetails}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredFees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No fees found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

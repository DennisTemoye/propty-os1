import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Phone, Mail, Building, Users, DollarSign, TrendingUp, Calendar, FileText, Download, Eye, Trophy, Target, Star } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

const MarketerDetailPage = () => {
  const { marketerId } = useParams();
  const navigate = useNavigate();

  // Mock marketer data with enhanced performance metrics
  const marketer = {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@proptyos.com',
    phone: '+234 801 111 2222',
    role: 'Senior Marketer',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-06-15',
    totalLeads: 45,
    conversions: 12,
    totalPropertySales: 8,
    totalSalesVolume: '₦200M',
    totalCommission: '₦2.4M',
    commissionPaid: '₦1.8M',
    commissionPending: '₦600K',
    assignedProjects: ['Victoria Gardens', 'Emerald Heights'],
    commissionStructure: {
      baserate: '2.5%',
      bonusThreshold: '10 units/month',
      bonusRate: '0.5%'
    },
    // New performance metrics
    salesRank: 1,
    totalMarketers: 15,
    bestPerformingProject: {
      name: 'Victoria Gardens',
      unitsold: 5,
      revenue: '₦125M',
      commission: '₦1.5M',
      conversionRate: '78%'
    },
    performanceMetrics: {
      monthlyTarget: 3,
      monthlyAchieved: 4,
      yearlyTarget: 36,
      yearlyAchieved: 28,
      avgDealSize: '₦25M',
      bestMonth: 'January 2024'
    }
  };

  // Mock property sales data
  const propertySales = [
    {
      id: 1,
      clientName: 'John Doe',
      propertyUnit: 'Block A - Plot 02',
      project: 'Victoria Gardens',
      saleAmount: '₦25M',
      saleDate: '2024-01-15',
      status: 'completed',
      commission: '₦625K',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      propertyUnit: 'Block B - Plot 08',
      project: 'Emerald Heights',
      saleAmount: '₦30M',
      saleDate: '2024-01-10',
      status: 'completed',
      commission: '₦750K',
      paymentMethod: 'Cash'
    },
    {
      id: 3,
      clientName: 'Mike Williams',
      propertyUnit: 'Block C - Plot 15',
      project: 'Victoria Gardens',
      saleAmount: '₦22M',
      saleDate: '2024-01-05',
      status: 'pending',
      commission: '₦550K',
      paymentMethod: 'Installment'
    }
  ];

  // Mock commissions data
  const commissions = [
    {
      id: 1,
      clientName: 'John Doe',
      project: 'Victoria Gardens',
      saleAmount: '₦25M',
      commissionAmount: '₦625K',
      rate: '2.5%',
      status: 'paid',
      dateEarned: '2024-01-15',
      datePaid: '2024-02-01'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      project: 'Emerald Heights',
      saleAmount: '₦30M',
      commissionAmount: '₦750K',
      rate: '2.5%',
      status: 'pending',
      dateEarned: '2024-01-10',
      datePaid: null
    }
  ];

  // Mock activity log
  const activityLog = [
    {
      id: 1,
      action: 'Property Sale Completed',
      description: 'Closed sale for John Doe - Block A Plot 02, Victoria Gardens',
      date: '2024-01-15 10:30 AM',
      type: 'sale'
    },
    {
      id: 2,
      action: 'Commission Paid',
      description: 'Commission of ₦625K paid for John Doe property sale',
      date: '2024-02-01 2:15 PM',
      type: 'commission'
    },
    {
      id: 3,
      action: 'Client Consultation',
      description: 'Initial consultation with Mike Williams for property inquiry',
      date: '2024-01-01 9:00 AM',
      type: 'consultation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-blue-100 text-blue-800';
      case 'commission':
        return 'bg-green-100 text-green-800';
      case 'consultation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank <= 3) return 'text-gray-500';
    if (rank <= 5) return 'text-orange-600';
    return 'text-gray-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return Trophy;
    if (rank <= 3) return Star;
    return Target;
  };

  const handleDownloadCommissionReport = () => {
    DownloadService.generateMarketerCommissionReport(marketer, commissions);
    toast.success('Commission report downloaded successfully');
  };

  const handleExportSalesReport = () => {
    toast.success('Sales report export started. Download will begin shortly.');
  };

  const RankIcon = getRankIcon(marketer.salesRank);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/company/marketers')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketers
              </Button>
            </div>

            {/* Marketer Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={marketer.avatar} alt={marketer.name} />
                      <AvatarFallback className="text-lg">
                        {marketer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{marketer.name}</h1>
                        <div className="flex items-center space-x-2">
                          <RankIcon className={`h-6 w-6 ${getRankColor(marketer.salesRank)}`} />
                          <Badge variant="outline" className={`${getRankColor(marketer.salesRank)} border-current`}>
                            Rank #{marketer.salesRank} of {marketer.totalMarketers}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-lg text-gray-600 mb-2">{marketer.role}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {marketer.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {marketer.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined: {marketer.joinDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(marketer.status)}>
                      {marketer.status}
                    </Badge>
                    <Button variant="outline" onClick={handleDownloadCommissionReport}>
                      <FileText className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Best Performing Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{marketer.bestPerformingProject.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Units Sold</p>
                        <p className="text-xl font-bold text-blue-600">{marketer.bestPerformingProject.unitsold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue Generated</p>
                        <p className="text-xl font-bold text-green-600">{marketer.bestPerformingProject.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Commission Earned</p>
                        <p className="text-xl font-bold text-purple-600">{marketer.bestPerformingProject.commission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-xl font-bold text-orange-600">{marketer.bestPerformingProject.conversionRate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Performance Targets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Monthly Target</span>
                      <span className="text-sm text-gray-600">{marketer.performanceMetrics.monthlyAchieved}/{marketer.performanceMetrics.monthlyTarget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((marketer.performanceMetrics.monthlyAchieved / marketer.performanceMetrics.monthlyTarget) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">133% achieved</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Yearly Target</span>
                      <span className="text-sm text-gray-600">{marketer.performanceMetrics.yearlyAchieved}/{marketer.performanceMetrics.yearlyTarget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(marketer.performanceMetrics.yearlyAchieved / marketer.performanceMetrics.yearlyTarget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">78% achieved</p>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Deal Size:</span>
                      <span className="font-medium">{marketer.performanceMetrics.avgDealSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Best Month:</span>
                      <span className="font-medium">{marketer.performanceMetrics.bestMonth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Basic Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Details</h4>
                    <p className="text-sm">{marketer.email}</p>
                    <p className="text-sm">{marketer.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Role</h4>
                    <p className="text-sm">{marketer.role}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned Projects</h4>
                    <div className="flex flex-wrap gap-1">
                      {marketer.assignedProjects.map((project, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Base Rate:</span>
                    <span className="font-medium">{marketer.commissionStructure.baserate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bonus Threshold:</span>
                    <span className="font-medium">{marketer.commissionStructure.bonusThreshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bonus Rate:</span>
                    <span className="font-medium">{marketer.commissionStructure.bonusRate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total Leads Generated</div>
                      <div className="text-2xl font-bold text-blue-600">{marketer.totalLeads}</div>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Properties Sold</div>
                      <div className="text-2xl font-bold text-green-600">{marketer.totalPropertySales}</div>
                    </div>
                    <Building className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total Sales Volume</div>
                      <div className="text-2xl font-bold text-purple-600">{marketer.totalSalesVolume}</div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total Commission Earned</div>
                      <div className="text-2xl font-bold text-orange-600">{marketer.totalCommission}</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="sales" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sales">Property Sales</TabsTrigger>
                <TabsTrigger value="commissions">Commissions</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Property Sales Records</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleExportSalesReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Sales Report
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Property Unit</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Sale Amount</TableHead>
                          <TableHead>Sale Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertySales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.clientName}</TableCell>
                            <TableCell>{sale.propertyUnit}</TableCell>
                            <TableCell>{sale.project}</TableCell>
                            <TableCell className="font-medium">{sale.saleAmount}</TableCell>
                            <TableCell>{sale.saleDate}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sale.status)}>
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">{sale.commission}</TableCell>
                            <TableCell>{sale.paymentMethod}</TableCell>
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

              <TabsContent value="commissions" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Earned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">{marketer.totalCommission}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{marketer.commissionPaid}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">{marketer.commissionPending}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Commission Breakdown</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadCommissionReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Summary
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Sale Amount</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date Earned</TableHead>
                          <TableHead>Date Paid</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commissions.map((commission) => (
                          <TableRow key={commission.id}>
                            <TableCell className="font-medium">{commission.clientName}</TableCell>
                            <TableCell>{commission.project}</TableCell>
                            <TableCell className="font-medium">{commission.saleAmount}</TableCell>
                            <TableCell>{commission.rate}</TableCell>
                            <TableCell className="font-medium text-purple-600">{commission.commissionAmount}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(commission.status)}>
                                {commission.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{commission.dateEarned}</TableCell>
                            <TableCell>{commission.datePaid || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLog.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <Badge className={getActivityTypeColor(activity.type)}>
                            {activity.type}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-gray-600">{activity.description}</div>
                            <div className="text-xs text-gray-400 mt-1">{activity.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MarketerDetailPage;

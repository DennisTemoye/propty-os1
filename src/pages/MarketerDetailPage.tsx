
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
import { ArrowLeft, Phone, Mail, Building, Users, DollarSign, TrendingUp, Calendar, FileText, Download, Eye, Trophy, Target } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

const MarketerDetailPage = () => {
  const { marketerId } = useParams();
  const navigate = useNavigate();

  // Mock data - focused on property sales
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
    totalSales: 8,
    totalSalesVolume: '₦200M',
    totalCommission: '₦2.4M',
    commissionPaid: '₦1.8M',
    commissionPending: '₦600K',
    assignedProjects: ['Victoria Gardens', 'Emerald Heights'],
    salesRank: 2,
    bestPerformingProject: 'Victoria Gardens',
    commissionStructure: {
      baserate: '2.5%',
      bonusThreshold: '10 units/month',
      bonusRate: '0.5%'
    }
  };

  // Property sales data
  const propertySales = [
    {
      id: 1,
      clientName: 'John Doe',
      property: 'Block A - Plot 02',
      project: 'Victoria Gardens',
      saleAmount: '₦25M',
      saleDate: '2024-01-15',
      status: 'completed',
      commission: '₦625K',
      commissionStatus: 'paid'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      property: 'Block B - Plot 08',
      project: 'Emerald Heights',
      saleAmount: '₦30M',
      saleDate: '2024-01-10',
      status: 'completed',
      commission: '₦750K',
      commissionStatus: 'pending'
    },
    {
      id: 3,
      clientName: 'Mike Williams',
      property: 'Block C - Plot 15',
      project: 'Victoria Gardens',
      saleAmount: '₦22M',
      saleDate: '2024-01-05',
      status: 'completed',
      commission: '₦550K',
      commissionStatus: 'paid'
    }
  ];

  // Commission breakdown
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
    },
    {
      id: 3,
      clientName: 'Mike Williams',
      project: 'Victoria Gardens',
      saleAmount: '₦22M',
      commissionAmount: '₦550K',
      rate: '2.5%',
      status: 'paid',
      dateEarned: '2024-01-05',
      datePaid: '2024-01-20'
    }
  ];

  // Performance metrics by project
  const projectPerformance = [
    {
      project: 'Victoria Gardens',
      sales: 5,
      volume: '₦115M',
      commission: '₦1.4M',
      conversionRate: '68%'
    },
    {
      project: 'Emerald Heights',
      sales: 3,
      volume: '₦85M',
      commission: '₦1.0M',
      conversionRate: '55%'
    }
  ];

  // Activity log focused on sales activities
  const activityLog = [
    {
      id: 1,
      action: 'Property Sale Completed',
      description: 'Successfully sold Block A - Plot 02 to John Doe for ₦25M',
      date: '2024-01-15 10:30 AM',
      type: 'sale'
    },
    {
      id: 2,
      action: 'Commission Received',
      description: 'Commission of ₦625K received for John Doe property sale',
      date: '2024-02-01 2:15 PM',
      type: 'commission'
    },
    {
      id: 3,
      action: 'Lead Converted',
      description: 'Successfully converted lead Mike Williams to property purchase',
      date: '2024-01-05 9:45 AM',
      type: 'conversion'
    },
    {
      id: 4,
      action: 'Performance Milestone',
      description: 'Achieved top performer status in Victoria Gardens project',
      date: '2024-01-01 9:00 AM',
      type: 'achievement'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'commission':
        return 'bg-purple-100 text-purple-800';
      case 'conversion':
        return 'bg-blue-100 text-blue-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadSalesReport = () => {
    DownloadService.generateMarketerSalesReport(marketer, propertySales);
    toast.success('Sales report downloaded successfully');
  };

  const handleDownloadCommissionReport = () => {
    DownloadService.generateMarketerCommissionReport(marketer, commissions);
    toast.success('Commission report downloaded successfully');
  };

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
                      <h1 className="text-3xl font-bold text-gray-900">{marketer.name}</h1>
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
                    <Button variant="outline" onClick={handleDownloadSalesReport}>
                      <FileText className="h-4 w-4 mr-2" />
                      Download Sales Report
                    </Button>
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sales Rank:</span>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">#{marketer.salesRank} of 25</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Performing Project:</span>
                    <span className="font-medium">{marketer.bestPerformingProject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Properties Sold:</span>
                    <span className="font-medium">{marketer.totalSales} units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Sales Volume:</span>
                    <span className="font-medium text-green-600">{marketer.totalSalesVolume}</span>
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
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm text-gray-600">Total Earned:</span>
                    <span className="font-medium text-purple-600">{marketer.totalCommission}</span>
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
                      <div className="text-sm text-gray-500 mb-1">Total Leads</div>
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
                      <div className="text-2xl font-bold text-green-600">{marketer.totalSales}</div>
                    </div>
                    <Building className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Sales Volume</div>
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
                      <div className="text-sm text-gray-500 mb-1">Commission Earned</div>
                      <div className="text-2xl font-bold text-orange-600">{marketer.totalCommission}</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="sales" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sales">Property Sales</TabsTrigger>
                <TabsTrigger value="commissions">Commissions</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Property Sales Records</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadSalesReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Sales Report
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Sale Amount</TableHead>
                          <TableHead>Sale Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertySales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.clientName}</TableCell>
                            <TableCell>{sale.property}</TableCell>
                            <TableCell>{sale.project}</TableCell>
                            <TableCell className="font-medium text-green-600">{sale.saleAmount}</TableCell>
                            <TableCell>{sale.saleDate}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sale.status)}>
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-purple-600">{sale.commission}</TableCell>
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
                      Download Commission Report
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

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Sales</TableHead>
                          <TableHead>Volume</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Conversion Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectPerformance.map((project, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{project.project}</TableCell>
                            <TableCell>{project.sales} units</TableCell>
                            <TableCell className="font-medium text-green-600">{project.volume}</TableCell>
                            <TableCell className="font-medium text-purple-600">{project.commission}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{project.conversionRate}</Badge>
                            </TableCell>
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
                    <CardTitle>Sales Activity Log</CardTitle>
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

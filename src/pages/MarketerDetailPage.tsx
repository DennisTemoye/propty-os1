
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
import { ArrowLeft, Phone, Mail, Building, Users, DollarSign, TrendingUp, Calendar, FileText, Download, Eye } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

const MarketerDetailPage = () => {
  const { marketerId } = useParams();
  const navigate = useNavigate();

  // Mock marketer data
  const marketer = {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@proptyos.com',
    phone: '+234 801 111 2222',
    role: 'Senior Marketer',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-06-15',
    totalClients: 45,
    totalSales: 8,
    totalSalesVolume: '₦200M',
    totalCommission: '₦2.4M',
    commissionPaid: '₦1.8M',
    commissionPending: '₦600K',
    assignedProjects: ['Victoria Gardens', 'Emerald Heights'],
    commissionStructure: {
      baserate: '2.5%',
      bonusThreshold: '10 units/month',
      bonusRate: '0.5%'
    }
  };

  // Mock property sales data
  const propertySales = [
    {
      id: 1,
      clientName: 'John Doe',
      propertyType: 'Residential Plot',
      unit: 'Block A - Plot 02',
      project: 'Victoria Gardens',
      salePrice: '₦25M',
      saleDate: '2024-01-15',
      status: 'completed',
      commission: '₦625K',
      paymentStatus: 'fully-paid'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      propertyType: 'Commercial Plot',
      unit: 'Block B - Plot 08',
      project: 'Emerald Heights',
      salePrice: '₦30M',
      saleDate: '2024-01-10',
      status: 'completed',
      commission: '₦750K',
      paymentStatus: 'installment'
    },
    {
      id: 3,
      clientName: 'Mike Williams',
      propertyType: 'Residential Plot',
      unit: 'Block C - Plot 15',
      project: 'Victoria Gardens',
      salePrice: '₦22M',
      saleDate: '2024-01-05',
      status: 'processing',
      commission: '₦550K',
      paymentStatus: 'pending'
    }
  ];

  // Mock commission breakdown
  const commissionBreakdown = [
    {
      id: 1,
      month: 'January 2024',
      totalSales: '₦77M',
      grossCommission: '₦1.925M',
      deductions: '₦0',
      netCommission: '₦1.925M',
      status: 'paid',
      paymentDate: '2024-02-01'
    },
    {
      id: 2,
      month: 'December 2023',
      totalSales: '₦45M',
      grossCommission: '₦1.125M',
      deductions: '₦50K',
      netCommission: '₦1.075M',
      status: 'paid',
      paymentDate: '2024-01-01'
    }
  ];

  // Mock activity log
  const activityLog = [
    {
      id: 1,
      action: 'Property Sale Completed',
      description: 'Completed sale of Block A - Plot 02 to John Doe for ₦25M',
      date: '2024-01-15 10:30 AM',
      type: 'sale'
    },
    {
      id: 2,
      action: 'Commission Processed',
      description: 'Commission of ₦625K processed for John Doe property sale',
      date: '2024-02-01 2:15 PM',
      type: 'commission'
    },
    {
      id: 3,
      action: 'Client Onboarded',
      description: 'Successfully onboarded new client Sarah Johnson',
      date: '2024-01-08 9:00 AM',
      type: 'client'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'fully-paid':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
      case 'installment':
        return 'bg-blue-100 text-blue-800';
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
      case 'client':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadSalesReport = () => {
    toast.success('Sales report downloaded successfully');
  };

  const handleDownloadCommissionReport = () => {
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
                      Download Report
                    </Button>
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total Clients</div>
                      <div className="text-2xl font-bold text-blue-600">{marketer.totalClients}</div>
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
                      <div className="text-sm text-gray-500 mb-1">Total Commission</div>
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
                <TabsTrigger value="commissions">Commission Summary</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Property Sales Records</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadSalesReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Sales Data
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Property Type</TableHead>
                          <TableHead>Unit/Plot</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Sale Price</TableHead>
                          <TableHead>Sale Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead>Commission</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertySales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.clientName}</TableCell>
                            <TableCell>{sale.propertyType}</TableCell>
                            <TableCell>{sale.unit}</TableCell>
                            <TableCell>{sale.project}</TableCell>
                            <TableCell className="font-medium">{sale.salePrice}</TableCell>
                            <TableCell>{sale.saleDate}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sale.status)}>
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sale.paymentStatus)}>
                                {sale.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">{sale.commission}</TableCell>
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
                    <CardTitle>Monthly Commission Breakdown</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadCommissionReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Summary
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Period</TableHead>
                          <TableHead>Total Sales</TableHead>
                          <TableHead>Gross Commission</TableHead>
                          <TableHead>Deductions</TableHead>
                          <TableHead>Net Commission</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commissionBreakdown.map((commission) => (
                          <TableRow key={commission.id}>
                            <TableCell className="font-medium">{commission.month}</TableCell>
                            <TableCell className="font-medium">{commission.totalSales}</TableCell>
                            <TableCell className="font-medium text-purple-600">{commission.grossCommission}</TableCell>
                            <TableCell className="text-red-600">{commission.deductions}</TableCell>
                            <TableCell className="font-medium text-green-600">{commission.netCommission}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(commission.status)}>
                                {commission.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{commission.paymentDate}</TableCell>
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
                    <CardTitle>Recent Activity</CardTitle>
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

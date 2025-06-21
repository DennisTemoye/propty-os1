import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Phone, Mail, Building, Users, DollarSign, TrendingUp, Calendar, FileText } from 'lucide-react';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

const MarketerDetailPage = () => {
  const { marketerId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, this would come from API
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
    totalCommission: '₦2.4M',
    commissionPaid: '₦1.8M',
    commissionPending: '₦600K',
    assignedProjects: ['Victoria Gardens', 'Emerald Heights'],
    assignedClients: [
      { id: 1, name: 'John Doe', project: 'Victoria Gardens', status: 'active' },
      { id: 2, name: 'Jane Williams', project: 'Emerald Heights', status: 'converted' },
    ],
    recentSales: [
      { id: 1, clientName: 'John Doe', project: 'Victoria Gardens', unit: 'Block A - Plot 02', amount: '₦25M', date: '2024-01-15' },
      { id: 2, clientName: 'Sarah Johnson', project: 'Emerald Heights', unit: 'Block B - Plot 08', amount: '₦30M', date: '2024-01-10' },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadCommissionReport = () => {
    const commissions = [
      { date: '2024-01-15', clientName: 'John Doe', project: 'Victoria Gardens', saleAmount: 25000000, rate: 3, commission: 750000, status: 'Paid' },
      { date: '2024-01-10', clientName: 'Sarah Johnson', project: 'Emerald Heights', saleAmount: 30000000, rate: 3, commission: 900000, status: 'Pending' }
    ];
    
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

            {/* KPI Stats */}
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
                      <div className="text-sm text-gray-500 mb-1">Total Sales</div>
                      <div className="text-2xl font-bold text-green-600">{marketer.totalSales}</div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Commission Earned</div>
                      <div className="text-2xl font-bold text-purple-600">{marketer.totalCommission}</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round((marketer.conversions / marketer.totalLeads) * 100)}%
                      </div>
                    </div>
                    <Building className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="clients">Assigned Clients</TabsTrigger>
                <TabsTrigger value="sales">Sales History</TabsTrigger>
                <TabsTrigger value="commission">Commission</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assigned Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {marketer.assignedProjects.map((project, index) => (
                          <Badge key={index} variant="outline" className="mr-2 mb-2">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Commission Paid:</span>
                          <span className="font-medium text-green-600">{marketer.commissionPaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Commission Pending:</span>
                          <span className="font-medium text-orange-600">{marketer.commissionPending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Join Date:</span>
                          <span className="font-medium">{marketer.joinDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="clients" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Clients ({marketer.assignedClients.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketer.assignedClients.map((client) => (
                        <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.project}</div>
                          </div>
                          <Badge className={client.status === 'converted' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {client.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketer.recentSales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{sale.clientName}</div>
                            <div className="text-sm text-gray-500">{sale.project} - {sale.unit}</div>
                            <div className="text-xs text-gray-400">{sale.date}</div>
                          </div>
                          <div className="font-bold text-green-600">{sale.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="commission" className="space-y-6">
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MarketerDetailPage;

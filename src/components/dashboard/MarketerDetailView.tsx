import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Phone, Mail, Users, DollarSign, TrendingUp, Calendar, FileText, Download, Eye, Trophy, Edit, Settings } from 'lucide-react';
import { ProjectCommissionSettings } from './marketers/ProjectCommissionSettings';
import { toast } from 'sonner';

const mockMarketer = {
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
  performanceRank: 3,
  totalMarketers: 15
};

export function MarketerDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  
  // Extract marketerId from URL params - handle both :marketerId and :id patterns
  const marketerId = params.marketerId || params.id;
  
  console.log('MarketerDetailView - ID from params:', marketerId);
  console.log('MarketerDetailView - Found marketer:', mockMarketer);
  
  const [projectFilter, setProjectFilter] = useState('all');

  const salesData = [
    {
      id: 1,
      clientName: 'John Doe',
      unit: 'Block A - Plot 02',
      project: 'Victoria Gardens',
      amount: '₦25M',
      date: '2024-01-15',
      status: 'completed',
      commission: '₦625K'
    }
  ];

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
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditProfile = () => {
    navigate(`/company/marketers/${mockMarketer.id}/edit`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/company/marketers')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketers
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mockMarketer.avatar} alt={mockMarketer.name} />
                <AvatarFallback className="text-lg">
                  {mockMarketer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{mockMarketer.name}</h1>
                <p className="text-lg text-gray-600 mb-2">{mockMarketer.role}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {mockMarketer.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {mockMarketer.email}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined: {mockMarketer.joinDate}
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  Rank #{mockMarketer.performanceRank} of {mockMarketer.totalMarketers}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(mockMarketer.status)}>
                {mockMarketer.status}
              </Badge>
              <Button variant="outline" onClick={() => toast.success('Report downloaded')}>
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={handleEditProfile}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Clients Converted</div>
                <div className="text-2xl font-bold text-blue-600">{mockMarketer.conversions}</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Sales Volume</div>
                <div className="text-2xl font-bold text-purple-600">{mockMarketer.totalSalesVolume}</div>
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
                <div className="text-2xl font-bold text-orange-600">{mockMarketer.totalCommission}</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="commission-settings">Commission Settings</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Plot</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.clientName}</TableCell>
                      <TableCell>{sale.unit}</TableCell>
                      <TableCell>{sale.project}</TableCell>
                      <TableCell className="font-medium">{sale.amount}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">{sale.commission}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commission Breakdown</CardTitle>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission-settings" className="space-y-6">
          <ProjectCommissionSettings 
            marketerId={mockMarketer.id.toString()} 
            marketerName={mockMarketer.name} 
          />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No activity logs available.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

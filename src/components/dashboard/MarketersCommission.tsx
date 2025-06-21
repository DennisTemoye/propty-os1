
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewMarketerForm } from '@/components/dashboard/forms/NewMarketerForm';
import { Plus, Search, Users, DollarSign, TrendingUp, Phone, Mail, Building } from 'lucide-react';

export function MarketersCommission() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewMarketerOpen, setIsNewMarketerOpen] = useState(false);

  // Mock data for marketers
  const marketers = [
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@proptyos.com',
      phone: '+234 801 111 2222',
      role: 'Senior Marketer',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
      totalLeads: 45,
      totalSales: 8,
      totalCommission: '₦2.4M',
      commissionPending: '₦600K',
      assignedProjects: ['Victoria Gardens', 'Emerald Heights']
    },
    {
      id: 2,
      name: 'Michael Johnson',
      email: 'michael@proptyos.com',
      phone: '+234 801 222 3333',
      role: 'External Marketer',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      totalLeads: 32,
      totalSales: 5,
      totalCommission: '₦1.8M',
      commissionPending: '₦400K',
      assignedProjects: ['Golden View']
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah@proptyos.com',
      phone: '+234 801 333 4444',
      role: 'Marketing Team Lead',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      totalLeads: 67,
      totalSales: 12,
      totalCommission: '₦3.2M',
      commissionPending: '₦800K',
      assignedProjects: ['Victoria Gardens', 'Sunset Residences']
    }
  ];

  const filteredMarketers = marketers.filter(marketer =>
    marketer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marketer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marketer.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const totalMarketers = marketers.length;
  const totalCommissionPending = marketers.reduce((sum, marketer) => {
    return sum + parseFloat(marketer.commissionPending.replace('₦', '').replace('K', '')) * 1000;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketers & Commission</h1>
          <p className="text-gray-600">Manage external marketers and internal sales agents</p>
        </div>
        <Dialog open={isNewMarketerOpen} onOpenChange={setIsNewMarketerOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Marketer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Marketer</DialogTitle>
            </DialogHeader>
            <NewMarketerForm onClose={() => setIsNewMarketerOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Marketers</div>
                <div className="text-2xl font-bold text-blue-600">{totalMarketers}</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Leads</div>
                <div className="text-2xl font-bold text-green-600">
                  {marketers.reduce((sum, m) => sum + m.totalLeads, 0)}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Sales</div>
                <div className="text-2xl font-bold text-purple-600">
                  {marketers.reduce((sum, m) => sum + m.totalSales, 0)}
                </div>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Pending Commission</div>
                <div className="text-2xl font-bold text-orange-600">
                  ₦{(totalCommissionPending / 1000).toFixed(0)}K
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search marketers by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMarketers.map((marketer) => (
          <Card key={marketer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={marketer.avatar} alt={marketer.name} />
                    <AvatarFallback>
                      {marketer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{marketer.name}</h3>
                    <p className="text-gray-600 text-sm">{marketer.role}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(marketer.status)}>
                  {marketer.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {marketer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {marketer.email}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Leads:</span>
                  <span className="font-medium">{marketer.totalLeads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Sales:</span>
                  <span className="font-medium text-green-600">{marketer.totalSales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Commission Earned:</span>
                  <span className="font-medium text-purple-600">{marketer.totalCommission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Pending:</span>
                  <span className="font-medium text-orange-600">{marketer.commissionPending}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-500 mb-2">Assigned Projects:</div>
                <div className="flex flex-wrap gap-1">
                  {marketer.assignedProjects.map((project, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMarketers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No marketers found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No marketers match your search criteria.' : 'Get started by adding your first marketer.'}
            </p>
            {!searchTerm && (
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsNewMarketerOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Marketer
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

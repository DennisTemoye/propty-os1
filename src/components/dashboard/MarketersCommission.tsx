import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Users, TrendingUp, DollarSign, Building, Filter, Eye, MoreHorizontal, Edit, Trash2, Download } from 'lucide-react';
import { NewMarketerForm } from './forms/NewMarketerForm';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function MarketersCommission() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const [mockMarketers, setMockMarketers] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@proptyos.com',
      phone: '+234 801 111 2222',
      role: 'Senior Marketer',
      leads: 45,
      conversions: 12,
      sales: 8,
      totalSalesVolume: '₦200M',
      commission: '₦2.4M',
      commissionPaid: '₦1.8M',
      commissionPending: '₦600K',
      status: 'active',
      projects: ['Victoria Gardens', 'Emerald Heights'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike@proptyos.com',
      phone: '+234 902 222 3333',
      role: 'Marketer',
      leads: 30,
      conversions: 8,
      sales: 5,
      totalSalesVolume: '₦125M',
      commission: '₦1.5M',
      commissionPaid: '₦1.0M',
      commissionPending: '₦500K',
      status: 'active',
      projects: ['Victoria Gardens'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@proptyos.com',
      phone: '+234 703 333 4444',
      role: 'Team Lead',
      leads: 60,
      conversions: 15,
      sales: 10,
      totalSalesVolume: '₦250M',
      commission: '₦3.0M',
      commissionPaid: '₦2.5M',
      commissionPending: '₦500K',
      status: 'inactive',
      projects: ['Emerald Heights', 'The Grand Residences'],
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e79?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@proptyos.com',
      phone: '+234 814 444 5555',
      role: 'Marketer',
      leads: 25,
      conversions: 5,
      sales: 3,
      totalSalesVolume: '₦75M',
      commission: '₦900K',
      commissionPaid: '₦700K',
      commissionPending: '₦200K',
      status: 'active',
      projects: ['The Grand Residences'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd8a72f9e?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const handleAddMarketer = (formData: any) => {
    const newMarketer = {
      id: mockMarketers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      leads: 0,
      conversions: 0,
      sales: 0,
      totalSalesVolume: '₦0',
      commission: '₦0',
      commissionPaid: '₦0',
      commissionPending: '₦0',
      status: 'active',
      projects: formData.projects || [],
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000}?w=150&h=150&fit=crop&crop=face`
    };

    setMockMarketers(prev => [...prev, newMarketer]);
    setIsModalOpen(false);
  };

  const filteredMarketers = mockMarketers.filter(marketer => {
    const searchMatch = marketer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketer.phone.includes(searchTerm);

    const statusMatch = statusFilter === 'all' || marketer.status === statusFilter;
    const roleMatch = roleFilter === 'all' || marketer.role === roleFilter;

    return searchMatch && statusMatch && roleMatch;
  });

  const totalMarketers = mockMarketers.length;
  const activeMarketers = mockMarketers.filter(m => m.status === 'active').length;
  const inactiveMarketers = mockMarketers.filter(m => m.status === 'inactive').length;
  const totalCommissionPending = mockMarketers.reduce((sum, m) => sum + parseFloat(m.commissionPending.replace('₦', '').replace('K', '')) * 1000, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketers & Commissions</h1>
          <p className="text-gray-600 mt-1">Manage marketers, track performance, and process commissions</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Marketer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Marketer</DialogTitle>
              <DialogDescription>Create a new marketer profile</DialogDescription>
            </DialogHeader>
            <NewMarketerForm onSubmit={handleAddMarketer} onClose={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Marketers</div>
                <div className="text-2xl font-bold text-gray-900">{totalMarketers}</div>
              </div>
              <Users className="h-6 w-6 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Active Marketers</div>
                <div className="text-2xl font-bold text-green-600">{activeMarketers}</div>
              </div>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Inactive Marketers</div>
                <div className="text-2xl font-bold text-red-600">{inactiveMarketers}</div>
              </div>
              <Building className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Commission Pending</div>
                <div className="text-2xl font-bold text-orange-600">₦{totalCommissionPending / 1000}K</div>
              </div>
              <DollarSign className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search marketers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Marketer">Marketer</SelectItem>
              <SelectItem value="Senior Marketer">Senior Marketer</SelectItem>
              <SelectItem value="Team Lead">Team Lead</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Marketers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarketers.map((marketer) => (
          <Card key={marketer.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex items-center space-x-4 pt-4 pl-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={marketer.avatar} alt={marketer.name} />
                <AvatarFallback>{marketer.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold">{marketer.name}</CardTitle>
                <p className="text-sm text-gray-500">{marketer.role}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{marketer.leads} Leads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span>{marketer.sales} Sales</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{marketer.commission}</span>
                </div>
              </div>
              <Badge className={marketer.status === 'active' ? 'bg-green-100 text-green-800 mt-2' : 'bg-red-100 text-red-800 mt-2'}>
                {marketer.status}
              </Badge>
            </CardContent>
            <div className="flex justify-between items-center p-4">
              <Button variant="secondary" size="sm" onClick={() => navigate(`/company/marketers/${marketer.id}`)}>
                View Details
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log('Edit marketer', marketer.id)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Delete marketer', marketer.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Download report', marketer.id)}>
                    <Download className="h-4 w-4 mr-2" /> Download Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Search, 
  Eye, 
  UserPlus, 
  Pause, 
  Play, 
  Trash2, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  BarChart3,
  Users,
  HomeIcon,
  DollarSign,
  RefreshCw
} from 'lucide-react';

const mockCompanies = [
  {
    id: 1,
    name: 'Global Real Estate Inc',
    email: 'admin@globalre.com',
    type: 'Developer',
    plan: 'Enterprise',
    status: 'Active',
    createdDate: '2024-01-15',
    projects: 12,
    clients: 245,
    revenue: 2500000,
    lastActive: '2 mins ago',
    phone: '+234 801 234 5678',
    address: 'Lagos, Nigeria'
  },
  {
    id: 2,
    name: 'ABC Properties Ltd',
    email: 'contact@abcproperties.ng',
    type: 'Land Marketer',
    plan: 'Pro',
    status: 'Active',
    createdDate: '2024-02-20',
    projects: 8,
    clients: 156,
    revenue: 1200000,
    lastActive: '5 mins ago',
    phone: '+234 802 345 6789',
    address: 'Abuja, Nigeria'
  },
  {
    id: 3,
    name: 'Metro Housing Co',
    email: 'info@metrohousing.com',
    type: 'Mixed',
    plan: 'Pro',
    status: 'Inactive',
    createdDate: '2024-03-10',
    projects: 5,
    clients: 89,
    revenue: 850000,
    lastActive: '2 days ago',
    phone: '+234 803 456 7890',
    address: 'Port Harcourt, Nigeria'
  },
  {
    id: 4,
    name: 'Prime Properties',
    email: 'hello@primeproperties.ng',
    type: 'Developer',
    plan: 'Starter',
    status: 'Trial',
    createdDate: '2024-03-25',
    projects: 2,
    clients: 34,
    revenue: 180000,
    lastActive: '1 hour ago',
    phone: '+234 804 567 8901',
    address: 'Kano, Nigeria'
  }
];

export function CompanyManagementTab() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status.toLowerCase() === statusFilter;
    const matchesPlan = planFilter === 'all' || company.plan.toLowerCase() === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Trial': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (companyId: number, newStatus: string) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId ? { ...company, status: newStatus } : company
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Company Management</h3>
          <p className="text-slate-600">Manage all registered companies on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(company.plan)}>
                      {company.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(company.status)}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(company.createdDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {company.lastActive}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Company Details</DialogTitle>
                          </DialogHeader>
                          {selectedCompany && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Company Info */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Company Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Company Name</label>
                                      <p className="font-medium">{selectedCompany.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Type</label>
                                      <p className="font-medium">{selectedCompany.type}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Email</label>
                                      <p className="font-medium">{selectedCompany.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Phone</label>
                                      <p className="font-medium">{selectedCompany.phone}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-gray-500">Address</label>
                                      <p className="font-medium">{selectedCompany.address}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Analytics */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Analytics Overview
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                      <HomeIcon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                      <div className="text-2xl font-bold text-blue-600">{selectedCompany.projects}</div>
                                      <div className="text-sm text-gray-600">Projects</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                      <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                      <div className="text-2xl font-bold text-green-600">{selectedCompany.clients}</div>
                                      <div className="text-sm text-gray-600">Clients</div>
                                    </div>
                                    <div className="col-span-2 text-center p-4 bg-purple-50 rounded-lg">
                                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                                      <div className="text-2xl font-bold text-purple-600">
                                        {formatCurrency(selectedCompany.revenue)}
                                      </div>
                                      <div className="text-sm text-gray-600">Total Revenue</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {company.status === 'Active' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleStatusChange(company.id, 'Inactive')}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleStatusChange(company.id, 'Active')}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
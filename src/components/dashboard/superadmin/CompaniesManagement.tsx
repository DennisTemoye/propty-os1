
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, Ban, UserCheck, Download, Search, Building2, Edit, Trash2, BarChart3, Users, Home } from 'lucide-react';

const mockCompanies = [
  {
    id: 1,
    name: 'ABC Properties Ltd',
    email: 'admin@abcproperties.com',
    contactPerson: 'John Adebayo',
    plan: 'Growth',
    status: 'active',
    signupDate: '2024-01-15',
    lastActive: '2024-01-20',
    usage: {
      users: 8,
      projects: 12,
      clients: 45,
      totalSalesVolume: '₦25M'
    },
    modulesEnabled: ['Projects', 'Clients', 'Sales', 'Accounting'],
    revenue: '₦250,000'
  },
  {
    id: 2,
    name: 'Global Real Estate Inc',
    email: 'contact@globalre.com',
    contactPerson: 'Sarah Okafor',
    plan: 'Enterprise',
    status: 'active',
    signupDate: '2024-01-10',
    lastActive: '2024-01-20',
    usage: {
      users: 25,
      projects: 35,
      clients: 128,
      totalSalesVolume: '₦89M'
    },
    modulesEnabled: ['Projects', 'Clients', 'Sales', 'Accounting', 'CRM', 'Fees'],
    revenue: '₦750,000'
  },
  {
    id: 3,
    name: 'Metro Housing Co',
    email: 'info@metrohousing.com',
    contactPerson: 'Ahmed Ibrahim',
    plan: 'Trial',
    status: 'trial',
    signupDate: '2024-01-18',
    lastActive: '2024-01-19',
    usage: {
      users: 3,
      projects: 2,
      clients: 8,
      totalSalesVolume: '₦2.5M'
    },
    modulesEnabled: ['Projects', 'Clients'],
    revenue: '₦0'
  },
  {
    id: 4,
    name: 'Sunset Developments',
    email: 'admin@sunsetdev.com',
    contactPerson: 'Grace Nwosu',
    plan: 'Starter',
    status: 'suspended',
    signupDate: '2023-12-20',
    lastActive: '2024-01-15',
    usage: {
      users: 12,
      projects: 8,
      clients: 32,
      totalSalesVolume: '₦18M'
    },
    modulesEnabled: ['Projects', 'Clients', 'Sales'],
    revenue: '₦125,000'
  },
  {
    id: 5,
    name: 'Prime Properties',
    email: 'contact@primeprops.com',
    contactPerson: 'Emeka Okoro',
    plan: 'Growth',
    status: 'expired',
    signupDate: '2023-11-05',
    lastActive: '2024-01-10',
    usage: {
      users: 6,
      projects: 4,
      clients: 28,
      totalSalesVolume: '₦12M'
    },
    modulesEnabled: ['Projects', 'Clients', 'Sales'],
    revenue: '₦180,000'
  }
];

export function CompaniesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesPlan = planFilter === 'all' || company.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'trial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Growth':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Starter':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Trial':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewProfile = (company: any) => {
    setSelectedCompany(company);
  };

  const handleImpersonate = (company: any) => {
    console.log('Opening company dashboard for:', company.name);
    // This would redirect to /dashboard with company context
  };

  const handleSuspend = (company: any) => {
    console.log('Suspending company:', company.name);
  };

  const handleReactivate = (company: any) => {
    console.log('Reactivating company:', company.name);
  };

  return (
    <div className="space-y-6">
      {selectedCompany ? (
        // Company Profile View
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={() => setSelectedCompany(null)} className="mb-2">
                ← Back to Companies
              </Button>
              <h2 className="text-3xl font-bold">{selectedCompany.name}</h2>
              <p className="text-slate-600">Company profile and usage overview</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handleImpersonate(selectedCompany)} className="bg-blue-600 hover:bg-blue-700">
                <UserCheck className="h-4 w-4 mr-2" />
                Login as Company
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span>Company Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Name</label>
                  <div className="font-medium">{selectedCompany.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <div className="font-medium">{selectedCompany.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <div className="font-medium">{selectedCompany.contactPerson}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Plan</label>
                  <div>
                    <Badge variant="outline" className={getPlanColor(selectedCompany.plan)}>
                      {selectedCompany.plan}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div>
                    <Badge variant="outline" className={getStatusColor(selectedCompany.status)}>
                      {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Signup Date</label>
                  <div className="font-medium">{selectedCompany.signupDate}</div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Usage Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Team Members</span>
                  </div>
                  <span className="font-bold text-lg">{selectedCompany.usage.users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Projects</span>
                  </div>
                  <span className="font-bold text-lg">{selectedCompany.usage.projects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Clients</span>
                  </div>
                  <span className="font-bold text-lg">{selectedCompany.usage.clients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Sales Volume</span>
                  </div>
                  <span className="font-bold text-lg">{selectedCompany.usage.totalSalesVolume}</span>
                </div>
              </CardContent>
            </Card>

            {/* Enabled Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Enabled Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.modulesEnabled.map((module: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {module}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Companies List View
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span>Companies Management</span>
                </CardTitle>
                <p className="text-slate-600 mt-1">Manage all registered ProptyOS companies</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="text-2xl font-bold text-blue-600">{mockCompanies.length}</div>
                <div className="text-sm text-gray-600">Total Companies</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {mockCompanies.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active Companies</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {mockCompanies.filter(c => c.status === 'trial').length}
                </div>
                <div className="text-sm text-gray-600">Trial Companies</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {mockCompanies.filter(c => c.status === 'suspended').length}
                </div>
                <div className="text-sm text-gray-600">Suspended</div>
              </Card>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search companies, contact person..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Trial">Trial</SelectItem>
                  <SelectItem value="Starter">Starter</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Companies Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Details</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Revenue</TableHead>
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
                          <div className="text-sm text-gray-500">{company.contactPerson}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPlanColor(company.plan)}>
                          {company.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(company.status)}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{company.usage.users} users • {company.usage.projects} projects</div>
                          <div className="text-gray-500">{company.usage.clients} clients</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{company.revenue}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewProfile(company)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleImpersonate(company)}>
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          {company.status === 'suspended' ? (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReactivate(company)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Reactivate
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSuspend(company)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No companies found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

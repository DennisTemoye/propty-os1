
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, Ban, UserCheck, Download, Search, Building2, Edit, Trash2 } from 'lucide-react';

const mockCompanies = [
  {
    id: 1,
    name: 'ABC Properties Ltd',
    email: 'admin@abcproperties.com',
    plan: 'Growth',
    status: 'active',
    signupDate: '2024-01-15',
    lastActive: '2024-01-20',
    users: 8,
    projects: 12,
    revenue: '₦250,000'
  },
  {
    id: 2,
    name: 'Global Real Estate Inc',
    email: 'contact@globalre.com',
    plan: 'Enterprise',
    status: 'active',
    signupDate: '2024-01-10',
    lastActive: '2024-01-20',
    users: 25,
    projects: 35,
    revenue: '₦750,000'
  },
  {
    id: 3,
    name: 'Metro Housing Co',
    email: 'info@metrohousing.com',
    plan: 'Trial',
    status: 'trial',
    signupDate: '2024-01-18',
    lastActive: '2024-01-19',
    users: 3,
    projects: 2,
    revenue: '₦0'
  },
  {
    id: 4,
    name: 'Sunset Developments',
    email: 'admin@sunsetdev.com',
    plan: 'Starter',
    status: 'suspended',
    signupDate: '2023-12-20',
    lastActive: '2024-01-15',
    users: 12,
    projects: 8,
    revenue: '₦125,000'
  },
  {
    id: 5,
    name: 'Prime Properties',
    email: 'contact@primeprops.com',
    plan: 'Growth',
    status: 'expired',
    signupDate: '2023-11-05',
    lastActive: '2024-01-10',
    users: 6,
    projects: 4,
    revenue: '₦180,000'
  }
];

export function CompaniesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
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
    console.log('Viewing profile for:', company.name);
  };

  const handleEditCompany = (company: any) => {
    console.log('Editing company:', company.name);
  };

  const handleImpersonate = (company: any) => {
    console.log('Impersonating company:', company.name);
  };

  const handleSuspend = (company: any) => {
    console.log('Suspending company:', company.name);
  };

  const handleReactivate = (company: any) => {
    console.log('Reactivating company:', company.name);
  };

  const handleDelete = (company: any) => {
    console.log('Deleting company:', company.name);
  };

  const handleExport = () => {
    console.log('Exporting companies data');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span>Companies Management</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
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
              <div className="text-sm text-gray-600">Active</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {mockCompanies.filter(c => c.status === 'trial').length}
              </div>
              <div className="text-sm text-gray-600">Trial</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {mockCompanies.filter(c => c.status === 'suspended').length}
              </div>
              <div className="text-sm text-gray-600">Suspended</div>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies..."
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
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Users/Projects</TableHead>
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
                    <TableCell>{company.signupDate}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{company.users} users</div>
                        <div className="text-gray-500">{company.projects} projects</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{company.revenue}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewProfile(company)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditCompany(company)}>
                          <Edit className="h-4 w-4" />
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Company</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {company.name}? This action cannot be undone and will permanently remove all company data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(company)} className="bg-red-600 hover:bg-red-700">
                                Delete Company
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
    </div>
  );
}

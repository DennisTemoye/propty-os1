
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Ban, UserCheck, Download, Filter, Search, Building2 } from 'lucide-react';

const mockCompanies = [
  {
    id: 1,
    name: 'ABC Properties Ltd',
    email: 'admin@abcproperties.com',
    plan: 'Professional',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    users: 8,
    projects: 12
  },
  {
    id: 2,
    name: 'Global Real Estate Inc',
    email: 'contact@globalre.com',
    plan: 'Enterprise',
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-01-20',
    users: 25,
    projects: 35
  },
  {
    id: 3,
    name: 'Metro Housing Co',
    email: 'info@metrohousing.com',
    plan: 'Basic',
    status: 'trial',
    joinDate: '2024-01-18',
    lastActive: '2024-01-19',
    users: 3,
    projects: 2
  },
  {
    id: 4,
    name: 'Sunset Developments',
    email: 'admin@sunsetdev.com',
    plan: 'Professional',
    status: 'suspended',
    joinDate: '2023-12-20',
    lastActive: '2024-01-15',
    users: 12,
    projects: 8
  }
];

export function CompaniesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

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
        return 'bg-green-100 text-green-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'Professional':
        return 'bg-blue-100 text-blue-800';
      case 'Basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleImpersonate = (company: any) => {
    console.log('Impersonating company:', company.name);
    // In a real app, this would redirect to the company's dashboard
  };

  const handleSuspend = (company: any) => {
    console.log('Suspending company:', company.name);
  };

  const handleReactivate = (company: any) => {
    console.log('Reactivating company:', company.name);
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
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Users/Projects</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
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
                    <Badge className={getPlanColor(company.plan)}>
                      {company.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(company.status)}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.joinDate}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{company.users} users</div>
                      <div className="text-gray-500">{company.projects} projects</div>
                    </div>
                  </TableCell>
                  <TableCell>{company.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleImpersonate(company)}>
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

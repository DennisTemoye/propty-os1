import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Phone, Mail, Eye, Edit, Trash2, FileText, CreditCard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddTenantModal } from './forms/AddTenantModal';
import { useToast } from '@/hooks/use-toast';

export function Tenants() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [tenants, setTenants] = useState([
    {
      id: 1,
      tenantId: 'TEN001',
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1234567890',
      unit: '2A',
      rentAmount: 1200,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      status: 'Active',
      lastPayment: '2024-11-30'
    },
    {
      id: 2,
      tenantId: 'TEN002',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1234567891',
      unit: '3B',
      rentAmount: 950,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      status: 'Active',
      lastPayment: '2024-11-25'
    },
    {
      id: 3,
      tenantId: 'TEN003',
      fullName: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1234567892',
      unit: '1A',
      rentAmount: 1100,
      leaseStart: '2023-06-01',
      leaseEnd: '2024-05-31',
      status: 'Lease Expired',
      lastPayment: '2024-10-30'
    },
    {
      id: 4,
      tenantId: 'TEN004',
      fullName: 'Lisa Wong',
      email: 'lisa.wong@email.com',
      phone: '+1234567893',
      unit: '2C',
      rentAmount: 1350,
      leaseStart: '2024-02-15',
      leaseEnd: '2025-02-14',
      status: 'Active',
      lastPayment: '2024-11-15'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Lease Expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'Notice Given':
        return <Badge className="bg-yellow-100 text-yellow-800">Notice</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewTenant = (tenant: any) => {
    toast({
      title: "Viewing Tenant",
      description: `Opening profile for ${tenant.fullName}`,
    });
    console.log('Viewing tenant:', tenant);
  };

  const handleEditTenant = (tenant: any) => {
    toast({
      title: "Edit Tenant",
      description: `Opening edit form for ${tenant.fullName}`,
    });
    console.log('Editing tenant:', tenant);
  };

  const handleDeleteTenant = (tenant: any) => {
    if (window.confirm(`Are you sure you want to remove ${tenant.fullName}?`)) {
      setTenants(prev => prev.filter(t => t.id !== tenant.id));
      toast({
        title: "Tenant Removed",
        description: `${tenant.fullName} has been removed from the system.`,
      });
    }
  };

  const handleViewPayments = (tenant: any) => {
    toast({
      title: "Payment History",
      description: `Viewing payment history for ${tenant.fullName}`,
    });
    console.log('Viewing payments for:', tenant);
  };

  const handleViewLease = (tenant: any) => {
    toast({
      title: "Lease Document",
      description: `Opening lease agreement for ${tenant.fullName}`,
    });
    console.log('Viewing lease for:', tenant);
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.tenantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  const totalRevenue = tenants.filter(t => t.status === 'Active').reduce((sum, t) => sum + t.rentAmount, 0);
  const inactiveTenants = tenants.length - activeTenants;

  const kpiData = [
    {
      title: 'Total Tenants',
      value: tenants.length.toString(),
      subtitle: 'All registered',
      icon: Users,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      cardBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Active Tenants',
      value: activeTenants.toString(),
      subtitle: 'Current leases',
      icon: Users,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      subtitle: 'Active rent income',
      icon: CreditCard,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Inactive/Expired',
      value: inactiveTenants.toString(),
      subtitle: 'Needs attention',
      icon: Users,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      cardBg: 'from-amber-50 to-amber-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
        <AddTenantModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tenants by name, email, unit, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Lease Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tenant.fullName}</div>
                      <div className="text-sm text-gray-500">ID: {tenant.tenantId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{tenant.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{tenant.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{tenant.unit}</TableCell>
                  <TableCell className="font-medium">${tenant.rentAmount}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{tenant.leaseStart}</div>
                      <div className="text-gray-500">to {tenant.leaseEnd}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewTenant(tenant)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTenant(tenant)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewPayments(tenant)}
                      >
                        <CreditCard className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewLease(tenant)}
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTenant(tenant)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
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

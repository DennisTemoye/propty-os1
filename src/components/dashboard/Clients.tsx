import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye, FileText, DollarSign, User, Building, Search } from 'lucide-react';
import { ClientForm } from './clients/ClientForm';
import { ClientDetailView } from './clients/ClientDetailView';
import { AssignPropertyModal } from './clients/AssignPropertyModal';
import { useNavigate } from 'react-router-dom';

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    nationalId: 'ABC123456789',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    status: 'active',
    kycStatus: 'approved',
    totalPaid: '₦15M',
    balance: '₦10M',
    nextPayment: '2024-02-15',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule'],
    paymentProgress: 60,
    assignedDate: '2024-01-10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 802 345 6789',
    address: '456 Ikoyi, Lagos',
    nationalId: 'DEF987654321',
    project: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    status: 'pending',
    kycStatus: 'pending',
    totalPaid: '₦8M',
    balance: '₦17M',
    nextPayment: '2024-01-30',
    documents: ['Application Form'],
    paymentProgress: 32,
    assignedDate: '2024-01-15'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 803 456 7890',
    address: '789 Lekki, Lagos',
    nationalId: 'GHI456789123',
    project: 'Golden View',
    unit: 'Block C - Plot 05',
    status: 'completed',
    kycStatus: 'approved',
    totalPaid: '₦25M',
    balance: '₦0',
    nextPayment: null,
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Certificate of Occupancy'],
    paymentProgress: 100,
    assignedDate: '2023-12-01'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+234 804 567 8901',
    address: '321 Ajah, Lagos',
    nationalId: 'JKL789123456',
    project: null,
    unit: null,
    status: 'unassigned',
    kycStatus: 'approved',
    totalPaid: '₦0',
    balance: '₦0',
    nextPayment: null,
    documents: ['KYC Documents'],
    paymentProgress: 0,
    assignedDate: null
  }
];

export function Clients() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards'); // Default to cards
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'unassigned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleClientClick = (clientId: number) => {
    navigate(`/company/clients/${clientId}`);
  };

  const handleAssignProperty = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsAssignPropertyOpen(true);
  };

  const handleAddPayment = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    navigate(`/company/clients/${client.id}`, { state: { openPayment: true } });
  };

  const handleViewDocuments = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    navigate('/company/documents');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage client profiles, KYC, and property assignments</p>
        </div>
        <Dialog open={isNewClientOpen} onOpenChange={setIsNewClientOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Create a new client profile and manage their information
              </DialogDescription>
            </DialogHeader>
            <ClientForm onClose={() => setIsNewClientOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{mockClients.length}</div>
            <div className="text-sm text-gray-500">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockClients.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {mockClients.filter(c => c.kycStatus === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending KYC</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {mockClients.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {mockClients.filter(c => c.status === 'unassigned').length}
            </div>
            <div className="text-sm text-gray-500">Unassigned</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Card View
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
        </div>
      </div>

      {/* Clients Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleClientClick(client.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <Badge className={getKycStatusColor(client.kycStatus)}>
                      {client.kycStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {client.project ? (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium">{client.project}</div>
                      <div className="text-sm text-gray-500">{client.unit}</div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Payment Progress</span>
                        <span>{client.paymentProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${client.paymentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Paid:</span>
                      <span className="font-medium text-green-600">{client.totalPaid}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Balance:</span>
                      <span className="font-medium">{client.balance}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center py-4 text-gray-500">
                      <Building className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No property assigned</p>
                    </div>
                    <Button 
                      onClick={(e) => handleAssignProperty(e, client)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Assign Property
                    </Button>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4 pt-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClientClick(client.id);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => handleViewDocuments(e, client)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Docs
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => handleAddPayment(e, client)}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Project/Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Payment Progress</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-gray-50"
                           onClick={() => handleClientClick(client.id)}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {client.project ? (
                        <div>
                          <div className="font-medium">{client.project}</div>
                          <div className="text-sm text-gray-500">{client.unit}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getKycStatusColor(client.kycStatus)}>
                        {client.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {client.project ? (
                        <div>
                          <div className="font-medium text-green-600">{client.totalPaid}</div>
                          <div className="text-sm text-gray-500">
                            {client.paymentProgress}% complete
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-green-600 h-1 rounded-full"
                              style={{ width: `${client.paymentProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {client.nextPayment ? (
                        <span className="text-sm">{client.nextPayment}</span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          {client.status === 'completed' ? 'Complete' : 'Not set'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleClientClick(client.id);
                        }}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        {!client.project && (
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignProperty(e, client);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Building className="h-3 w-3 mr-1" />
                            Assign
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={(e) => handleViewDocuments(e, client)}>
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={(e) => handleAddPayment(e, client)}>
                          <DollarSign className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Client Detail Modal */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Details - {selectedClient?.name}</DialogTitle>
            <DialogDescription>
              Comprehensive client profile and property information
            </DialogDescription>
          </DialogHeader>
          {selectedClient && <ClientDetailView client={selectedClient} />}
        </DialogContent>
      </Dialog>

      {/* Assign Property Modal */}
      <AssignPropertyModal 
        isOpen={isAssignPropertyOpen}
        onClose={() => setIsAssignPropertyOpen(false)}
        client={selectedClient}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText, DollarSign, User, Building, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ClientDetailView } from './clients/ClientDetailView';
import { AssignPropertyModal } from './clients/AssignPropertyModal';
import { AddPaymentModal } from './clients/AddPaymentModal';
import { ClientDocumentsView } from './clients/ClientDocumentsView';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { UpdateAllocationStatusModal } from './allocation/UpdateAllocationStatusModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AllocationStatus, RevocationData } from '@/types/allocation';

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    nationalId: 'ABC123456789',
    passportPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Victoria Gardens',
        unit: 'Block A - Plot 02',
        assignedDate: '2024-01-10'
      }
    ],
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
    passportPhoto: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Emerald Heights',
        unit: 'Block B - Plot 12',
        assignedDate: '2024-01-15'
      },
      {
        name: 'Victoria Gardens',
        unit: 'Block A - Plot 05',
        assignedDate: '2024-01-20'
      },
      {
        name: 'Golden View',
        unit: 'Block C - Plot 03',
        assignedDate: '2024-01-25'
      },
      {
        name: 'Sunset Heights',
        unit: 'Block D - Plot 07',
        assignedDate: '2024-02-01'
      },
      {
        name: 'Marina Heights',
        unit: 'Block E - Plot 10',
        assignedDate: '2024-02-05'
      },
      {
        name: 'Palm Grove Estate',
        unit: 'Block F - Plot 15',
        assignedDate: '2024-02-10'
      },
      {
        name: 'Royal Gardens',
        unit: 'Block G - Plot 08',
        assignedDate: '2024-02-15'
      },
      {
        name: 'Crystal Bay',
        unit: 'Block H - Plot 12',
        assignedDate: '2024-02-20'
      },
      {
        name: 'Metro Heights',
        unit: 'Block I - Plot 18',
        assignedDate: '2024-02-25'
      },
      {
        name: 'Paradise Gardens',
        unit: 'Block J - Plot 22',
        assignedDate: '2024-03-01'
      },
      {
        name: 'Golden View Towers',
        unit: 'Block K - Plot 30',
        assignedDate: '2024-03-05'
      },
      {
        name: 'Emerald Heights Phase 2',
        unit: 'Block L - Plot 25',
        assignedDate: '2024-03-10'
      }
    ],
    status: 'active',
    kycStatus: 'approved',
    totalPaid: '₦285M',
    balance: '₦415M',
    nextPayment: '2024-02-20',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Investment Agreement'],
    paymentProgress: 41,
    assignedDate: '2024-01-15'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 803 456 7890',
    address: '789 Lekki, Lagos',
    nationalId: 'GHI456789123',
    passportPhoto: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=150&h=150&fit=crop&crop=face',
    projects: [
      {
        name: 'Golden View',
        unit: 'Block C - Plot 05',
        assignedDate: '2023-12-01'
      },
      {
        name: 'Victoria Gardens',
        unit: 'Block D - Plot 08',
        assignedDate: '2023-11-15'
      }
    ],
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
    passportPhoto: null,
    projects: [],
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
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
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
    setSelectedClient(client);
    setIsAddPaymentOpen(true);
  };

  const handleViewDocuments = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsDocumentsOpen(true);
  };

  const handleRevokeAllocation = (allocation: any) => {
    setSelectedAllocation(allocation);
    setIsRevokeOpen(true);
  };

  const handleUpdateStatus = (allocation: any) => {
    setSelectedAllocation(allocation);
    setIsStatusUpdateOpen(true);
  };

  const handleRevocationSubmit = (data: RevocationData) => {
    console.log('Processing revocation:', data);
    toast.success('Allocation revoked successfully');
    setIsRevokeOpen(false);
    setSelectedAllocation(null);
  };

  const handleStatusUpdate = (newStatus: AllocationStatus, notes?: string) => {
    console.log('Updating status:', { newStatus, notes });
    toast.success('Allocation status updated successfully');
    setIsStatusUpdateOpen(false);
    setSelectedAllocation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage client profiles, KYC, and property assignments</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate('/company/clients/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
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
            <div className="text-2xl font-bold text-orange-600">
              {mockClients.filter(c => c.nextPayment && new Date(c.nextPayment) < new Date()).length}
            </div>
            <div className="text-sm text-gray-500">Pending Payments</div>
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
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.passportPhoto || ''} alt={client.name} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
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
                {client.projects && client.projects.length > 0 ? (
                  <div className="space-y-3">
                    {/* Show only first property with "+X more" indicator */}
                    <div className="border-b pb-2">
                      <div className="font-medium">{client.projects[0].name}</div>
                      <div className="text-sm text-gray-500">{client.projects[0].unit}</div>
                      <div className="text-xs text-gray-400">Assigned: {client.projects[0].assignedDate}</div>
                      {client.projects.length > 1 && (
                        <div className="text-xs text-blue-600 mt-1">
                          +{client.projects.length - 1} more
                        </div>
                      )}
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
                
                {/* Updated action buttons - removed View button */}
                <div className="flex space-x-2 mt-4 pt-3 border-t">
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
                  <TableHead>Projects/Units</TableHead>
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
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={client.passportPhoto || ''} alt={client.name} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                          <div className="text-sm text-gray-500">{client.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {client.projects && client.projects.length > 0 ? (
                        <div className="space-y-1">
                          <div>
                            <div className="font-medium text-sm">{client.projects[0].name}</div>
                            <div className="text-xs text-gray-500">{client.projects[0].unit}</div>
                          </div>
                          {client.projects.length > 1 && (
                            <div className="text-xs text-blue-600">
                              +{client.projects.length - 1} more
                            </div>
                          )}
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
                      {client.projects && client.projects.length > 0 ? (
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
                        {(!client.projects || client.projects.length === 0) && (
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

      {/* Assign Property Modal */}
      <AssignPropertyModal 
        isOpen={isAssignPropertyOpen}
        onClose={() => setIsAssignPropertyOpen(false)}
        client={selectedClient}
      />

      {/* Add Payment Modal */}
      <AddPaymentModal 
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        client={selectedClient}
      />

      {/* Documents Modal */}
      <Dialog open={isDocumentsOpen} onOpenChange={setIsDocumentsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Documents - {selectedClient?.name}</DialogTitle>
            <DialogDescription>
              Manage documents for this client
            </DialogDescription>
          </DialogHeader>
          {selectedClient && <ClientDocumentsView client={selectedClient} />}
        </DialogContent>
      </Dialog>

      {/* Revoke Allocation Modal */}
      <RevokeAllocationModal
        isOpen={isRevokeOpen}
        onClose={() => setIsRevokeOpen(false)}
        allocation={selectedAllocation}
        onRevoke={handleRevocationSubmit}
      />

      {/* Update Status Modal */}
      <UpdateAllocationStatusModal
        isOpen={isStatusUpdateOpen}
        onClose={() => setIsStatusUpdateOpen(false)}
        allocation={selectedAllocation}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

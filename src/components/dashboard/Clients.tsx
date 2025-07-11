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
import { SendNoticeForm } from './notices/SendNoticeForm';
import { useNavigate } from 'react-router-dom';

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
    kycStatus: 'verified',
    totalPaid: '₦15M',
    balance: '₦10M',
    nextPayment: '2024-02-15',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule'],
    paymentProgress: 60,
    assignedDate: '2024-01-10',
    status: 'Allocated'
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
    kycStatus: 'verified',
    totalPaid: '₦285M',
    balance: '₦415M',
    nextPayment: '2024-02-20',
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Investment Agreement'],
    paymentProgress: 41,
    assignedDate: '2024-01-15',
    status: 'Allocated'
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
    kycStatus: 'verified',
    totalPaid: '₦25M',
    balance: '₦0',
    nextPayment: null,
    documents: ['Allocation Letter', 'MoU', 'Payment Schedule', 'Certificate of Occupancy'],
    paymentProgress: 100,
    assignedDate: '2023-12-01',
    status: 'Paid'
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
    kycStatus: 'unverified',
    totalPaid: '₦0',
    balance: '₦0',
    nextPayment: null,
    documents: ['KYC Documents'],
    paymentProgress: 0,
    assignedDate: null,
    status: 'New'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+234 805 678 9012',
    address: '654 Surulere, Lagos',
    nationalId: 'MNO123789456',
    passportPhoto: null,
    projects: [
      {
        name: 'Sunset Heights',
        unit: 'Block A - Plot 15',
        assignedDate: '2024-01-05'
      }
    ],
    kycStatus: 'verified',
    totalPaid: '₦5M',
    balance: '₦20M',
    nextPayment: '2024-03-01',
    documents: ['Allocation Letter', 'MoU'],
    paymentProgress: 20,
    assignedDate: '2024-01-05',
    status: 'Reserved'
  }
];

export function Clients() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isSendNoticeOpen, setIsSendNoticeOpen] = useState(false);
  const [filterKyc, setFilterKyc] = useState<string>('all');
  const [filterAllocation, setFilterAllocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const navigate = useNavigate();

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'unverified':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-gray-100 text-gray-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Allocated':
        return 'bg-blue-100 text-blue-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyc = filterKyc === 'all' || client.kycStatus === filterKyc;
    const matchesStatus = filterAllocation === 'all' || client.status === filterAllocation;
    return matchesSearch && matchesKyc && matchesStatus;
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

  const handleSendNotice = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsSendNoticeOpen(true);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{mockClients.length}</div>
            <div className="text-sm text-gray-500">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockClients.filter(c => c.projects && c.projects.length > 0).length}
            </div>
            <div className="text-sm text-gray-500">With Properties</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {mockClients.filter(c => c.kycStatus === 'verified').length}
            </div>
            <div className="text-sm text-gray-500">KYC Verified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {mockClients.filter(c => !c.projects || c.projects.length === 0).length}
            </div>
            <div className="text-sm text-gray-500">Unassigned</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={filterKyc} onValueChange={setFilterKyc}>
            <SelectTrigger className="w-40 bg-background border-border z-10">
              <SelectValue placeholder="Filter by KYC" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All KYC</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAllocation} onValueChange={setFilterAllocation}>
            <SelectTrigger className="w-40 bg-background border-border z-10">
              <SelectValue placeholder="Client Status" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Allocated">Allocated</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
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
            List View
          </Button>
        </div>
      </div>

      {/* Clients Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className="hover:shadow-md cursor-pointer bg-white border border-border hover:border-primary/20 rounded-xl"
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
                      <div className="flex gap-2 mt-2">
                        <Badge className={getKycStatusColor(client.kycStatus)}>
                          KYC {client.kycStatus}
                        </Badge>
                        <Badge className={getClientStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
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
                    <div className="flex gap-2 justify-center">
                      <Badge className={getKycStatusColor(client.kycStatus)}>
                        KYC {client.kycStatus}
                      </Badge>
                      <Badge className={getClientStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <Button 
                      onClick={(e) => handleAssignProperty(e, client)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Assign Property
                    </Button>
                  </div>
                )}
                
                {/* Updated action buttons */}
                <div className="flex space-x-2 mt-4 pt-3 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                    onClick={(e) => handleSendNotice(e, client)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Notice
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-accent hover:border-primary/20 transition-all duration-200"
                    onClick={(e) => handleAddPayment(e, client)}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    Payment
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
                  <TableHead>Projects/Plots</TableHead>
                  <TableHead>Status</TableHead>
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
                          <div className="flex gap-2 mt-1">
                            <Badge className={getKycStatusColor(client.kycStatus)}>
                              KYC {client.kycStatus}
                            </Badge>
                            <Badge className={getClientStatusColor(client.status)}>
                              {client.status}
                            </Badge>
                          </div>
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
                      <Badge className={getClientStatusColor(client.status)}>
                        {client.status}
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
                          {client.paymentProgress === 100 ? 'Complete' : 'Not set'}
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
                        <Button variant="outline" size="sm" onClick={(e) => handleSendNotice(e, client)}>
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

      {/* Send Notice Modal */}
      <Dialog open={isSendNoticeOpen} onOpenChange={setIsSendNoticeOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Notice to {selectedClient?.name}</DialogTitle>
            <DialogDescription>
              Send a notice to this client via email or WhatsApp
            </DialogDescription>
          </DialogHeader>
          <SendNoticeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

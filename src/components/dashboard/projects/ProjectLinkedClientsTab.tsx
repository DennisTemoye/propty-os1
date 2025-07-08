import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  Eye, 
  Upload, 
  CreditCard, 
  Phone, 
  Mail, 
  Calendar, 
  Search,
  Filter,
  Building,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectLinkedClientsTabProps {
  project: {
    id: number;
    name: string;
  };
  userPermissions?: {
    canManage?: boolean;
    canViewFinancials?: boolean;
    canEdit?: boolean;
    canViewKYC?: boolean;
  };
}

const mockLinkedClients = [
  {
    id: 'CLIENT-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+234 801 234 5678',
    kycStatus: 'verified',
    assignedPlot: 'A-001',
    blockId: 'Block A',
    paymentPlanStatus: 'active',
    onboardingDate: '2024-01-15',
    totalPayments: '₦25,000,000',
    outstandingBalance: '₦0',
    lastPaymentDate: '2024-01-20',
    paymentStatus: 'completed',
    allocationStatus: 'approved',
    documents: ['ID Card', 'Passport', 'Proof of Address'],
    notes: 'Premium client with full payment',
    marketer: 'Alice Johnson'
  },
  {
    id: 'CLIENT-002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+234 802 345 6789',
    kycStatus: 'pending',
    assignedPlot: 'B-002',
    blockId: 'Block B',
    paymentPlanStatus: 'active',
    onboardingDate: '2024-01-10',
    totalPayments: '₦4,500,000',
    outstandingBalance: '₦13,500,000',
    lastPaymentDate: '2024-01-12',
    paymentStatus: 'partial',
    allocationStatus: 'pending',
    documents: ['ID Card'],
    notes: 'Requires KYC completion',
    marketer: 'Bob Williams'
  },
  {
    id: 'CLIENT-003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+234 803 456 7890',
    kycStatus: 'verified',
    assignedPlot: 'C-001',
    blockId: 'Block C',
    paymentPlanStatus: 'active',
    onboardingDate: '2024-01-08',
    totalPayments: '₦7,000,000',
    outstandingBalance: '₦28,000,000',
    lastPaymentDate: '2024-01-10',
    paymentStatus: 'initial',
    allocationStatus: 'approved',
    documents: ['ID Card', 'Passport', 'Proof of Address', 'Bank Statement'],
    notes: 'Corporate client - commercial plot',
    marketer: 'Carol Davis'
  },
  {
    id: 'CLIENT-004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+234 804 567 8901',
    kycStatus: 'rejected',
    assignedPlot: 'A-005',
    blockId: 'Block A',
    paymentPlanStatus: 'inactive',
    onboardingDate: '2024-01-12',
    totalPayments: '₦0',
    outstandingBalance: '₦25,000,000',
    lastPaymentDate: null,
    paymentStatus: 'pending',
    allocationStatus: 'rejected',
    documents: ['ID Card'],
    notes: 'KYC documents need verification',
    marketer: 'Alice Johnson'
  },
  {
    id: 'CLIENT-005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+234 805 678 9012',
    kycStatus: 'in_review',
    assignedPlot: 'B-003',
    blockId: 'Block B',
    paymentPlanStatus: 'active',
    onboardingDate: '2024-01-14',
    totalPayments: '₦9,000,000',
    outstandingBalance: '₦9,000,000',
    lastPaymentDate: '2024-01-15',
    paymentStatus: 'partial',
    allocationStatus: 'approved',
    documents: ['ID Card', 'Passport'],
    notes: 'Investment client - multiple plots interest',
    marketer: 'Bob Williams'
  }
];

export function ProjectLinkedClientsTab({ project, userPermissions = {} }: ProjectLinkedClientsTabProps) {
  const [clients, setClients] = useState(mockLinkedClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKYC, setFilterKYC] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterAllocation, setFilterAllocation] = useState('all');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const navigate = useNavigate();

  const getKYCStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'initial':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAllocationStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.assignedPlot.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKYC = filterKYC === 'all' || client.kycStatus === filterKYC;
    const matchesPayment = filterPayment === 'all' || client.paymentStatus === filterPayment;
    const matchesAllocation = filterAllocation === 'all' || client.allocationStatus === filterAllocation;
    
    return matchesSearch && matchesKYC && matchesPayment && matchesAllocation;
  });

  const handleViewProfile = (clientId: string) => {
    navigate(`/company/clients/${clientId}`);
  };

  const handleUploadKYC = (clientId: string) => {
    console.log('Upload KYC for client:', clientId);
    toast.info('KYC upload dialog would open');
  };

  const handleViewPaymentHistory = (clientId: string) => {
    console.log('View payment history for client:', clientId);
    toast.info('Payment history modal would open');
  };

  const handleReassignClient = (clientId: string) => {
    console.log('Reassign client:', clientId);
    setSelectedClient(clients.find(c => c.id === clientId));
    setIsReassignOpen(true);
  };

  const handleAddClient = () => {
    navigate('/company/clients/new');
  };

  // Calculate statistics
  const totalClients = clients.length;
  const verifiedKYC = clients.filter(c => c.kycStatus === 'verified').length;
  const activePaymentPlans = clients.filter(c => c.paymentPlanStatus === 'active').length;
  const completedPayments = clients.filter(c => c.paymentStatus === 'completed').length;
  const totalRevenue = clients.reduce((sum, c) => sum + parseFloat(c.totalPayments.replace(/[₦,]/g, '')), 0);
  const totalOutstanding = clients.reduce((sum, c) => sum + parseFloat(c.outstandingBalance.replace(/[₦,]/g, '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Linked Clients</h2>
        {userPermissions.canManage && (
          <Button onClick={handleAddClient}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalClients}</div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{verifiedKYC}</div>
              <div className="text-sm text-muted-foreground">KYC Verified</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activePaymentPlans}</div>
              <div className="text-sm text-muted-foreground">Active Plans</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completedPayments}</div>
              <div className="text-sm text-muted-foreground">Fully Paid</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              {userPermissions.canViewFinancials ? (
                <div className="text-2xl font-bold text-green-600">₦{totalRevenue.toLocaleString()}</div>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">***</div>
              )}
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              {userPermissions.canViewFinancials ? (
                <div className="text-2xl font-bold text-orange-600">₦{totalOutstanding.toLocaleString()}</div>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">***</div>
              )}
              <div className="text-sm text-muted-foreground">Outstanding</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
        
        <Select value={filterKYC} onValueChange={setFilterKYC}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="KYC Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All KYC</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterPayment} onValueChange={setFilterPayment}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="initial">Initial</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterAllocation} onValueChange={setFilterAllocation}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Allocation Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Allocations</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Assigned Plot</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Onboarding Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getKYCStatusColor(client.kycStatus)}>
                      {client.kycStatus.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.assignedPlot}</div>
                      <div className="text-sm text-muted-foreground">{client.blockId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(client.paymentStatus)}>
                      {client.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {userPermissions.canViewFinancials ? (
                      <div>
                        <div className="font-medium">{client.outstandingBalance}</div>
                        <div className="text-sm text-muted-foreground">of {client.totalPayments}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Restricted</span>
                    )}
                  </TableCell>
                  <TableCell>{client.onboardingDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(client.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      
                      {client.kycStatus !== 'verified' && userPermissions.canViewKYC && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUploadKYC(client.id)}
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {userPermissions.canViewFinancials && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPaymentHistory(client.id)}
                        >
                          <CreditCard className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {userPermissions.canManage && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReassignClient(client.id)}
                        >
                          <Building className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reassign Client Dialog */}
      <Dialog open={isReassignOpen} onOpenChange={setIsReassignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Client</label>
              <p className="text-sm text-muted-foreground">{selectedClient?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Current Plot</label>
              <p className="text-sm text-muted-foreground">{selectedClient?.assignedPlot}</p>
            </div>
            <div>
              <label className="text-sm font-medium">New Plot</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select new plot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A-006">A-006 (Block A)</SelectItem>
                  <SelectItem value="B-004">B-004 (Block B)</SelectItem>
                  <SelectItem value="C-003">C-003 (Block C)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                toast.success('Client reassigned successfully!');
                setIsReassignOpen(false);
              }}>
                Reassign
              </Button>
              <Button variant="outline" onClick={() => setIsReassignOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
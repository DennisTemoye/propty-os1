import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  CreditCard,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectAllocationsTabProps {
  project: {
    id: number;
    name: string;
  };
  userPermissions?: {
    canApprove?: boolean;
    canEdit?: boolean;
    canViewFinancials?: boolean;
    canManage?: boolean;
  };
}

const mockAllocations = [
  {
    id: 1,
    clientName: 'John Doe',
    clientId: 'CLIENT-001',
    blockId: 'A',
    plotNumber: 'A-001',
    allocationDate: '2024-01-15',
    purpose: 'Residential',
    allocationStatus: 'approved',
    paymentProgress: 'complete',
    saleAmount: '₦25,000,000',
    initialPayment: '₦5,000,000',
    balancePayment: '₦20,000,000',
    marketer: 'Alice Johnson',
    approvedBy: 'John Smith',
    approvedDate: '2024-01-16',
    contractGenerated: true,
    lastPaymentDate: '2024-01-20'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    clientId: 'CLIENT-002',
    blockId: 'B',
    plotNumber: 'B-002',
    allocationDate: '2024-01-10',
    purpose: 'Investment',
    allocationStatus: 'pending',
    paymentProgress: 'partial',
    saleAmount: '₦18,000,000',
    initialPayment: '₦4,500,000',
    balancePayment: '₦13,500,000',
    marketer: 'Bob Williams',
    approvedBy: null,
    approvedDate: null,
    contractGenerated: false,
    lastPaymentDate: '2024-01-12'
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    clientId: 'CLIENT-003',
    blockId: 'C',
    plotNumber: 'C-001',
    allocationDate: '2024-01-08',
    purpose: 'Commercial',
    allocationStatus: 'approved',
    paymentProgress: 'initial',
    saleAmount: '₦35,000,000',
    initialPayment: '₦7,000,000',
    balancePayment: '₦28,000,000',
    marketer: 'Carol Davis',
    approvedBy: 'Jane Wilson',
    approvedDate: '2024-01-09',
    contractGenerated: true,
    lastPaymentDate: '2024-01-10'
  },
  {
    id: 4,
    clientName: 'Sarah Wilson',
    clientId: 'CLIENT-004',
    blockId: 'A',
    plotNumber: 'A-005',
    allocationDate: '2024-01-12',
    purpose: 'Residential',
    allocationStatus: 'rejected',
    paymentProgress: 'pending',
    saleAmount: '₦25,000,000',
    initialPayment: '₦0',
    balancePayment: '₦25,000,000',
    marketer: 'Alice Johnson',
    approvedBy: null,
    approvedDate: null,
    contractGenerated: false,
    lastPaymentDate: null
  }
];

export function ProjectAllocationsTab({ project, userPermissions = {} }: ProjectAllocationsTabProps) {
  const [allocations, setAllocations] = useState(mockAllocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClient, setFilterClient] = useState('all');
  const [filterMarketer, setFilterMarketer] = useState('all');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
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

  const getPaymentColor = (progress: string) => {
    switch (progress?.toLowerCase()) {
      case 'complete':
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

  const filteredAllocations = allocations.filter(allocation => {
    const matchesSearch = allocation.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         allocation.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         allocation.marketer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || allocation.allocationStatus === filterStatus;
    const matchesClient = filterClient === 'all' || allocation.clientName === filterClient;
    const matchesMarketer = filterMarketer === 'all' || allocation.marketer === filterMarketer;
    
    return matchesSearch && matchesStatus && matchesClient && matchesMarketer;
  });

  const handleViewDetails = (allocationId: number) => {
    console.log('View allocation details:', allocationId);
    toast.info('Opening allocation details...');
  };

  const handleViewClient = (clientId: string) => {
    navigate(`/company/clients/${clientId}`);
  };

  const handleApprove = (allocationId: number) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === allocationId 
        ? { ...allocation, allocationStatus: 'approved', approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0] }
        : allocation
    ));
    toast.success('Allocation approved successfully!');
  };

  const handleReject = (allocationId: number) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === allocationId 
        ? { ...allocation, allocationStatus: 'rejected' }
        : allocation
    ));
    toast.success('Allocation rejected successfully!');
  };

  const handleMarkAsPaid = (allocationId: number) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === allocationId 
        ? { ...allocation, paymentProgress: 'complete', lastPaymentDate: new Date().toISOString().split('T')[0] }
        : allocation
    ));
    toast.success('Payment status updated!');
  };

  const handleDownloadContract = (allocationId: number) => {
    console.log('Download contract:', allocationId);
    toast.success('Contract download started');
  };

  const handleDownloadOfferLetter = (allocationId: number) => {
    console.log('Download offer letter:', allocationId);
    toast.success('Offer letter download started');
  };

  // Calculate statistics
  const totalAllocations = allocations.length;
  const approvedAllocations = allocations.filter(a => a.allocationStatus === 'approved').length;
  const pendingAllocations = allocations.filter(a => a.allocationStatus === 'pending').length;
  const totalValue = allocations.reduce((sum, a) => sum + parseFloat(a.saleAmount.replace(/[₦,]/g, '')), 0);
  const completedPayments = allocations.filter(a => a.paymentProgress === 'complete').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Plot Allocations</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{totalAllocations}</div>
                <div className="text-sm text-muted-foreground">Total Allocations</div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{approvedAllocations}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{pendingAllocations}</div>
                <div className="text-sm text-muted-foreground">Pending Approval</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">₦{totalValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{completedPayments}</div>
                <div className="text-sm text-muted-foreground">Fully Paid</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search allocations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterClient} onValueChange={setFilterClient}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {Array.from(new Set(allocations.map(a => a.clientName))).map(client => (
              <SelectItem key={client} value={client}>{client}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterMarketer} onValueChange={setFilterMarketer}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by marketer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Marketers</SelectItem>
            {Array.from(new Set(allocations.map(a => a.marketer))).map(marketer => (
              <SelectItem key={marketer} value={marketer}>{marketer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Allocations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Plot</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Marketer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.clientName}</div>
                      <div className="text-sm text-muted-foreground">{allocation.clientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.plotNumber}</div>
                      <div className="text-sm text-muted-foreground">Block {allocation.blockId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{allocation.allocationDate}</TableCell>
                  <TableCell>{allocation.purpose}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(allocation.allocationStatus)}>
                      {allocation.allocationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentColor(allocation.paymentProgress)}>
                      {allocation.paymentProgress}
                    </Badge>
                  </TableCell>
                  <TableCell>{allocation.marketer}</TableCell>
                  <TableCell className="font-medium">{allocation.saleAmount}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(allocation.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewClient(allocation.clientId)}
                      >
                        <Users className="h-3 w-3" />
                      </Button>
                      
                      {allocation.allocationStatus === 'pending' && userPermissions.canApprove && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(allocation.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(allocation.id)}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      
                      {allocation.paymentProgress !== 'complete' && userPermissions.canEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsPaid(allocation.id)}
                        >
                          <CreditCard className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {allocation.contractGenerated && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadContract(allocation.id)}
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadOfferLetter(allocation.id)}
                      >
                        <Download className="h-3 w-3" />
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
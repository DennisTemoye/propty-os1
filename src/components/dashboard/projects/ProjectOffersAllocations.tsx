import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  AlertTriangle,
  User,
  Calendar,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectOffersAllocationsProps {
  projectId: number;
  onApprove?: (id: number) => void;
  onDecline?: (id: number, reason: string) => void;
}

const mockOffersData = [
  {
    id: 1,
    clientName: 'Sarah Wilson',
    clientPhone: '+234 804 567 8901',
    unitOffered: 'A-301',
    block: 'Block A',
    offerAmount: 15600000,
    dateOffered: '2024-01-20',
    expiryDate: '2024-02-20',
    status: 'pending',
    marketer: 'Alice Johnson',
    notes: 'Client interested in payment plan',
    type: 'offer'
  },
  {
    id: 2,
    clientName: 'David Brown',
    clientPhone: '+234 805 678 9012',
    unitOffered: 'B-205',
    block: 'Block B',
    offerAmount: 18200000,
    dateOffered: '2024-01-18',
    expiryDate: '2024-02-18',
    status: 'accepted',
    marketer: 'Bob Williams',
    notes: 'Ready for allocation',
    type: 'offer'
  }
];

const mockAllocationsData = [
  {
    id: 3,
    clientName: 'Emma Davis',
    clientPhone: '+234 806 789 0123',
    unitId: 'C-102',
    block: 'Block C',
    allocationAmount: 22000000,
    dateRequested: '2024-01-22',
    status: 'pending',
    marketer: 'Carol Davis',
    notes: 'Unit ready for immediate allocation',
    type: 'allocation'
  },
  {
    id: 4,
    clientName: 'James Miller',
    clientPhone: '+234 807 890 1234',
    unitId: 'A-405',
    block: 'Block A',
    allocationAmount: 19500000,
    dateRequested: '2024-01-25',
    status: 'processing',
    marketer: 'Alice Johnson',
    notes: 'Payment verification in progress',
    type: 'allocation'
  }
];

const mockApprovalsData = [
  {
    id: 5,
    clientName: 'Michael Johnson',
    clientPhone: '+234 808 901 2345',
    unitId: 'B-308',
    block: 'Block B',
    amount: 17800000,
    dateSubmitted: '2024-01-26',
    status: 'awaiting_approval',
    marketer: 'Bob Williams',
    submittedBy: 'Sales Manager',
    notes: 'High-value client, priority allocation',
    type: 'approval'
  },
  {
    id: 6,
    clientName: 'Lisa Anderson',
    clientPhone: '+234 809 012 3456',
    unitId: 'C-501',
    block: 'Block C',
    amount: 25000000,
    dateSubmitted: '2024-01-24',
    status: 'awaiting_approval',
    marketer: 'Carol Davis',
    submittedBy: 'Project Manager',
    notes: 'Premium unit allocation request',
    type: 'approval'
  }
];

export function ProjectOffersAllocations({ projectId, onApprove, onDecline }: ProjectOffersAllocationsProps) {
  const [activeTab, setActiveTab] = useState('offers');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string, type: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'awaiting_approval':
        return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-3 w-3 mr-1" />Awaiting Approval</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    onApprove?.(id);
    toast.success('Request approved successfully');
  };

  const handleDecline = (id: number) => {
    onDecline?.(id, 'Declined by user');
    toast.success('Request declined');
  };

  const filterData = (data: any[]) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unitId && item.unitId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.unitOffered && item.unitOffered.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Offers & Allocations</h2>
          <p className="text-muted-foreground">Manage pending offers, allocations and approvals</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="offers" className="relative">
            Pending Offers
            <Badge className="ml-2 bg-yellow-600 text-white text-xs">
              {mockOffersData.filter(o => o.status === 'pending').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="allocations" className="relative">
            Pending Allocations
            <Badge className="ml-2 bg-blue-600 text-white text-xs">
              {mockAllocationsData.filter(a => a.status === 'pending' || a.status === 'processing').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approvals" className="relative">
            Pending Approvals
            <Badge className="ml-2 bg-orange-600 text-white text-xs">
              {mockApprovalsData.filter(a => a.status === 'awaiting_approval').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="offers" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Pending Offers ({filterData(mockOffersData).length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit Offered</TableHead>
                    <TableHead>Offer Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterData(mockOffersData).map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{offer.clientName}</div>
                          <div className="text-sm text-gray-500">{offer.clientPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{offer.unitOffered}</div>
                          <div className="text-sm text-gray-500">{offer.block}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(offer.offerAmount)}</TableCell>
                      <TableCell>{getStatusBadge(offer.status, 'offer')}</TableCell>
                      <TableCell>
                        <div className="text-sm">{offer.expiryDate}</div>
                      </TableCell>
                      <TableCell>{offer.marketer}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {offer.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleApprove(offer.id)}
                                title="Accept Offer"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDecline(offer.id)}
                                title="Decline Offer"
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Pending Allocations ({filterData(mockAllocationsData).length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterData(mockAllocationsData).map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{allocation.clientName}</div>
                          <div className="text-sm text-gray-500">{allocation.clientPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{allocation.unitId}</div>
                          <div className="text-sm text-gray-500">{allocation.block}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(allocation.allocationAmount)}</TableCell>
                      <TableCell>{getStatusBadge(allocation.status, 'allocation')}</TableCell>
                      <TableCell>
                        <div className="text-sm">{allocation.dateRequested}</div>
                      </TableCell>
                      <TableCell>{allocation.marketer}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {allocation.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleApprove(allocation.id)}
                                title="Process Allocation"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDecline(allocation.id)}
                                title="Decline Allocation"
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Pending Approvals ({filterData(mockApprovalsData).length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterData(mockApprovalsData).map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.clientName}</div>
                          <div className="text-sm text-gray-500">{approval.clientPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.unitId}</div>
                          <div className="text-sm text-gray-500">{approval.block}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(approval.amount)}</TableCell>
                      <TableCell>{getStatusBadge(approval.status, 'approval')}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{approval.submittedBy}</div>
                          <div className="text-sm text-gray-500">{approval.marketer}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{approval.dateSubmitted}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {approval.status === 'awaiting_approval' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleApprove(approval.id)}
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDecline(approval.id)}
                                title="Decline"
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
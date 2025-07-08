import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Eye, 
  RotateCcw, 
  X, 
  Search, 
  Filter,
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ReallocationModal } from '../forms/ReallocationModal';

interface ProjectSalesOverviewProps {
  project: {
    id: number;
    name: string;
    totalUnits: number;
    allocatedUnits: number;
    availableUnits: number;
    reservedUnits: number;
  };
  onReallocate?: (unitId: string, clientName: string) => void;
  onRevoke?: (allocation: any) => void;
}

const mockSalesData = [
  {
    id: 1,
    unitId: 'A-101',
    block: 'Block A',
    clientName: 'John Doe',
    clientPhone: '+234 801 234 5678',
    dateAllocated: '2024-01-15',
    saleStatus: 'completed',
    paymentStatus: 'fully_paid',
    marketer: 'Alice Johnson',
    totalAmount: 15600000,
    paidAmount: 15600000,
    outstandingAmount: 0,
    paymentMethod: 'Bank Transfer',
    clientId: 1
  },
  {
    id: 2,
    unitId: 'B-205',
    block: 'Block B',
    clientName: 'Jane Smith',
    clientPhone: '+234 802 345 6789',
    dateAllocated: '2024-01-10',
    saleStatus: 'active',
    paymentStatus: 'partial',
    marketer: 'Bob Williams',
    totalAmount: 18200000,
    paidAmount: 9100000,
    outstandingAmount: 9100000,
    paymentMethod: 'Installment',
    clientId: 2
  },
  {
    id: 3,
    unitId: 'C-301',
    block: 'Block C',
    clientName: 'Mike Johnson',
    clientPhone: '+234 803 456 7890',
    dateAllocated: '2024-01-08',
    saleStatus: 'active',
    paymentStatus: 'installment',
    marketer: 'Carol Davis',
    totalAmount: 22000000,
    paidAmount: 4400000,
    outstandingAmount: 17600000,
    paymentMethod: 'Monthly Plan',
    clientId: 3
  },
  {
    id: 4,
    unitId: 'A-205',
    block: 'Block A',
    clientName: 'Sarah Wilson',
    clientPhone: '+234 804 567 8901',
    dateOffered: '2024-01-20',
    saleStatus: 'pending',
    paymentStatus: 'not_started',
    marketer: 'Alice Johnson',
    totalAmount: 15600000,
    paidAmount: 0,
    outstandingAmount: 15600000,
    expiryDate: '2024-02-20',
    clientId: 4
  },
  {
    id: 5,
    unitId: 'B-301',
    block: 'Block B',
    clientName: 'David Brown',
    clientPhone: '+234 805 678 9012',
    dateOffered: '2024-01-18',
    saleStatus: 'negotiation',
    paymentStatus: 'not_started',
    marketer: 'Bob Williams',
    totalAmount: 18200000,
    paidAmount: 0,
    outstandingAmount: 18200000,
    expiryDate: '2024-02-18',
    clientId: 5
  }
];

export function ProjectSalesOverview({ project, onReallocate, onRevoke }: ProjectSalesOverviewProps) {
  const [filterTab, setFilterTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reallocationModalOpen, setReallocationModalOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const navigate = useNavigate();

  // Filter sales data based on allocation status
  const getFilteredSales = () => {
    let filtered = mockSalesData;
    
    if (filterTab === 'allocated') {
      filtered = mockSalesData.filter(sale => sale.saleStatus === 'completed' || sale.saleStatus === 'active');
    } else if (filterTab === 'unallocated') {
      filtered = mockSalesData.filter(sale => sale.saleStatus === 'pending' || sale.saleStatus === 'negotiation');
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.unitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.marketer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredSales = getFilteredSales();

  const handleViewClient = (clientId: number) => {
    navigate(`/company/clients/${clientId}`);
  };

  const handleReallocateClick = (sale: any) => {
    setSelectedAllocation(sale);
    setReallocationModalOpen(true);
  };

  const handleRevokeClick = (sale: any) => {
    if (onRevoke) {
      onRevoke(sale);
    } else {
      toast.success(`Sale revoked for ${sale.unitId}`);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSaleStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'negotiation':
        return <Badge className="bg-purple-100 text-purple-800"><Clock className="h-3 w-3 mr-1" />Negotiating</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string, paidAmount: number, totalAmount: number) => {
    switch (status) {
      case 'fully_paid':
        return <Badge className="bg-green-100 text-green-800">Fully Paid</Badge>;
      case 'partial':
        const percentage = ((paidAmount / totalAmount) * 100).toFixed(0);
        return <Badge className="bg-yellow-100 text-yellow-800">{percentage}% Paid</Badge>;
      case 'installment':
        const instPercentage = ((paidAmount / totalAmount) * 100).toFixed(0);
        return <Badge className="bg-blue-100 text-blue-800">Installment ({instPercentage}%)</Badge>;
      case 'not_started':
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sales Overview</h2>
          <p className="text-muted-foreground">Track unit sales and allocations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filterTab} onValueChange={setFilterTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="allocated">Allocated</TabsTrigger>
          <TabsTrigger value="unallocated">Unallocated</TabsTrigger>
        </TabsList>

        {/* Search Bar */}
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients, units, or marketers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sales Table */}
        <TabsContent value={filterTab} className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>
                {filterTab === 'all' && 'All Sales'}
                {filterTab === 'allocated' && 'Allocated Units'}
                {filterTab === 'unallocated' && 'Unallocated Units'}
                {filteredSales.length > 0 && ` (${filteredSales.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Sale Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Marketer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.unitId}</div>
                      <div className="text-sm text-gray-500">{sale.block}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.clientName}</div>
                      <div className="text-sm text-gray-500">{sale.clientPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSaleStatusBadge(sale.saleStatus)}
                  </TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(sale.paymentStatus, sale.paidAmount, sale.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(sale.totalAmount)}</div>
                      <div className="text-sm text-green-600">Paid: {formatCurrency(sale.paidAmount)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-orange-600">
                      {formatCurrency(sale.outstandingAmount)}
                    </div>
                  </TableCell>
                  <TableCell>{sale.marketer}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewClient(sale.clientId)}
                        title="View Client"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {(sale.saleStatus === 'completed' || sale.saleStatus === 'active') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReallocateClick(sale)}
                          title="Reallocate Unit"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" title="Revoke Sale">
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke Sale</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to revoke the sale of {sale.unitId} to {sale.clientName}? 
                              This will cancel the transaction and make the unit available again.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleRevokeClick(sale)}
                            >
                              Revoke Sale
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
          
              {filteredSales.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No {filterTab === 'all' ? 'sales' : filterTab} units found{searchTerm && ' matching your search'}.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reallocation Modal */}
      <ReallocationModal
        isOpen={reallocationModalOpen}
        onClose={() => {
          setReallocationModalOpen(false);
          setSelectedAllocation(null);
        }}
        allocation={selectedAllocation}
        onReallocate={(data) => {
          if (onReallocate) {
            onReallocate(data.selectedUnit?.unitId, data.selectedUnit?.clientName);
          }
          setReallocationModalOpen(false);
          setSelectedAllocation(null);
        }}
      />
    </div>
  );
}
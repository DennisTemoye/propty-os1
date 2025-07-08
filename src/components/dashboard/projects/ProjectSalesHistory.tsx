import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  RotateCcw, 
  X, 
  Search, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectSalesHistoryProps {
  projectId: number;
  onReallocate?: (unitId: string, clientName: string) => void;
  onRevoke?: (allocation: any) => void;
}

const mockSalesHistoryData = [
  {
    id: 1,
    unitId: 'A-101',
    block: 'Block A',
    clientName: 'John Doe',
    clientPhone: '+234 801 234 5678',
    marketer: 'Alice Johnson',
    dateRecorded: '2024-01-15',
    dateAllocated: '2024-01-20',
    saleStatus: 'completed',
    allocationStatus: 'allocated',
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
    marketer: 'Bob Williams',
    dateRecorded: '2024-01-10',
    dateAllocated: '2024-01-15',
    saleStatus: 'active',
    allocationStatus: 'allocated',
    totalAmount: 18200000,
    paidAmount: 9100000,
    outstandingAmount: 9100000,
    paymentMethod: 'Installment',
    clientId: 2
  },
  {
    id: 3,
    unitId: null,
    block: null,
    clientName: 'Mike Johnson',
    clientPhone: '+234 803 456 7890',
    marketer: 'Carol Davis',
    dateRecorded: '2024-01-08',
    dateAllocated: null,
    saleStatus: 'confirmed',
    allocationStatus: 'unallocated',
    totalAmount: 22000000,
    paidAmount: 4400000,
    outstandingAmount: 17600000,
    paymentMethod: 'Monthly Plan',
    clientId: 3
  },
  {
    id: 4,
    unitId: null,
    block: null,
    clientName: 'Sarah Wilson',
    clientPhone: '+234 804 567 8901',
    marketer: 'Alice Johnson',
    dateRecorded: '2024-01-20',
    dateAllocated: null,
    saleStatus: 'confirmed',
    allocationStatus: 'unallocated',
    totalAmount: 15600000,
    paidAmount: 0,
    outstandingAmount: 15600000,
    paymentMethod: 'Pending',
    clientId: 4
  }
];

export function ProjectSalesHistory({ projectId, onReallocate, onRevoke }: ProjectSalesHistoryProps) {
  const [filterTab, setFilterTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getFilteredSales = () => {
    let filtered = mockSalesHistoryData;
    
    if (filterTab === 'allocated') {
      filtered = mockSalesHistoryData.filter(sale => sale.allocationStatus === 'allocated');
    } else if (filterTab === 'unallocated') {
      filtered = mockSalesHistoryData.filter(sale => sale.allocationStatus === 'unallocated');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sale.unitId && sale.unitId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        sale.marketer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredSales = getFilteredSales();

  const handleViewClient = (clientId: number) => {
    navigate(`/company/clients/${clientId}`);
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
      case 'confirmed':
        return <Badge className="bg-emerald-100 text-emerald-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAllocationStatusBadge = (status: string) => {
    switch (status) {
      case 'allocated':
        return <Badge className="bg-green-100 text-green-800">Allocated</Badge>;
      case 'unallocated':
        return <Badge className="bg-orange-100 text-orange-800">Unallocated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sales History</h2>
          <p className="text-muted-foreground">Track all sales and their allocation status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Record New Sale
          </Button>
        </div>
      </div>

      <Tabs value={filterTab} onValueChange={setFilterTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All Sales</TabsTrigger>
          <TabsTrigger value="allocated">With Allocations</TabsTrigger>
          <TabsTrigger value="unallocated">Without Allocations</TabsTrigger>
        </TabsList>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value={filterTab} className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>
                Sales History ({filteredSales.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Sale Status</TableHead>
                    <TableHead>Allocation Status</TableHead>
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
                          <div className="font-medium">{sale.unitId || 'Unallocated'}</div>
                          <div className="text-sm text-gray-500">{sale.block || 'Nil'}</div>
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
                        {getAllocationStatusBadge(sale.allocationStatus)}
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
                          
                          {sale.allocationStatus === 'allocated' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onReallocate?.(sale.unitId!, sale.clientName)}
                              title="Reallocate Unit"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSales.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No sales found{searchTerm && ' matching your search'}.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
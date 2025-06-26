
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectSalesHistoryTabProps {
  project: {
    id: number;
    name: string;
    totalUnits: number;
    allocatedUnits: number;
    availableUnits: number;
    reservedUnits: number;
  };
}

const mockAllocatedUnits = [
  {
    id: 1,
    clientName: 'John Doe',
    unitId: 'A-101',
    block: 'Block A',
    dateAllocated: '2024-01-15',
    status: 'Fully Paid',
    marketer: 'Alice Johnson',
    amount: '₦15,600,000',
    paymentStatus: 'completed',
    allocationStatus: 'allocated',
    clientId: 1
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    unitId: 'B-205',
    block: 'Block B',
    dateAllocated: '2024-01-10',
    status: 'Initial Payment',
    marketer: 'Bob Williams',
    amount: '₦18,200,000',
    paymentStatus: 'partial',
    allocationStatus: 'allocated',
    clientId: 2
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    unitId: 'C-301',
    block: 'Block C',
    dateAllocated: '2024-01-08',
    status: 'Installment Plan',
    marketer: 'Carol Davis',
    amount: '₦22,000,000',
    paymentStatus: 'installment',
    allocationStatus: 'allocated',
    clientId: 3
  }
];

const mockOfferedUnits = [
  {
    id: 4,
    clientName: 'Sarah Wilson',
    unitId: 'A-205',
    block: 'Block A',
    dateOffered: '2024-01-20',
    status: 'Pending Response',
    marketer: 'Alice Johnson',
    amount: '₦15,600,000',
    expiryDate: '2024-02-20',
    offerStatus: 'offered',
    clientId: 4
  },
  {
    id: 5,
    clientName: 'David Brown',
    unitId: 'B-301',
    block: 'Block B',
    dateOffered: '2024-01-18',
    status: 'Under Negotiation',
    marketer: 'Bob Williams',
    amount: '₦18,200,000',
    expiryDate: '2024-02-18',
    offerStatus: 'offered',
    clientId: 5
  }
];

export function ProjectSalesHistoryTab({ project }: ProjectSalesHistoryTabProps) {
  const [activeTab, setActiveTab] = useState('allocated');
  const navigate = useNavigate();

  const handleViewClient = (clientId: number) => {
    navigate(`/company/clients/${clientId}`);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'installment':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOfferStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending response':
        return 'bg-yellow-100 text-yellow-800';
      case 'under negotiation':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter units based on allocation/offer status
  const fullAllocationSales = mockAllocatedUnits.filter(unit => unit.allocationStatus === 'allocated');
  const unallocatedSales = mockOfferedUnits.filter(unit => unit.offerStatus === 'offered');

  const allocatedStats = {
    totalAllocated: fullAllocationSales.length,
    totalValue: '₦55,800,000',
    fullyPaid: fullAllocationSales.filter(u => u.paymentStatus === 'completed').length,
    conversionRate: ((fullAllocationSales.length / (fullAllocationSales.length + unallocatedSales.length)) * 100).toFixed(1)
  };

  const offeredStats = {
    totalOffered: unallocatedSales.length,
    totalValue: '₦33,800,000',
    pending: unallocatedSales.filter(u => u.status === 'Pending Response').length,
    underNegotiation: unallocatedSales.filter(u => u.status === 'Under Negotiation').length
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="allocated">Full Allocation Sales</TabsTrigger>
          <TabsTrigger value="offered">Offered Units</TabsTrigger>
        </TabsList>

        <TabsContent value="allocated" className="space-y-6">
          {/* Full Allocation Sales Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{allocatedStats.totalAllocated}</div>
                    <div className="text-sm text-gray-500">Total Allocated</div>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{allocatedStats.totalValue}</div>
                    <div className="text-sm text-gray-500">Total Value</div>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{allocatedStats.fullyPaid}</div>
                    <div className="text-sm text-gray-500">Fully Paid</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{allocatedStats.conversionRate}%</div>
                    <div className="text-sm text-gray-500">Conversion Rate</div>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full Allocation Sales Table */}
          <Card>
            <CardHeader>
              <CardTitle>Full Allocation Sales Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Date Allocated</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fullAllocationSales.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{unit.unitId}</div>
                          <div className="text-sm text-gray-500">{unit.block}</div>
                        </div>
                      </TableCell>
                      <TableCell>{unit.dateAllocated}</TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(unit.paymentStatus)}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{unit.marketer}</TableCell>
                      <TableCell className="font-medium">{unit.amount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewClient(unit.clientId)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Client
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offered" className="space-y-6">
          {/* Offered Units Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{offeredStats.totalOffered}</div>
                    <div className="text-sm text-gray-500">Total Offered</div>
                  </div>
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{offeredStats.totalValue}</div>
                    <div className="text-sm text-gray-500">Total Value</div>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{offeredStats.pending}</div>
                    <div className="text-sm text-gray-500">Pending Response</div>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{offeredStats.underNegotiation}</div>
                    <div className="text-sm text-gray-500">Under Negotiation</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offered Units Table */}
          <Card>
            <CardHeader>
              <CardTitle>Offered Units Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Date Offered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unallocatedSales.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.clientName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{unit.unitId}</div>
                          <div className="text-sm text-gray-500">{unit.block}</div>
                        </div>
                      </TableCell>
                      <TableCell>{unit.dateOffered}</TableCell>
                      <TableCell>
                        <Badge className={getOfferStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{unit.marketer}</TableCell>
                      <TableCell className="font-medium">{unit.amount}</TableCell>
                      <TableCell>{unit.expiryDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewClient(unit.clientId)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Client
                        </Button>
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

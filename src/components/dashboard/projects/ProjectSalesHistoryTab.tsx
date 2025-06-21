
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Eye, RotateCcw, X, User, Calendar, DollarSign } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';
import { toast } from 'sonner';

interface ProjectSalesHistoryTabProps {
  project: {
    id: number;
    name: string;
  };
}

const mockAllocatedUnits = [
  {
    id: 1,
    clientName: 'John Smith',
    unitId: 'A-15',
    blockId: 'A',
    dateAllocated: '2024-01-15',
    status: 'Allocated',
    marketer: 'Sarah Wilson',
    amount: '₦15,600,000',
    paymentStatus: 'Partial',
    clientId: 'CL001'
  },
  {
    id: 2,
    clientName: 'Jane Doe',
    unitId: 'B-08',
    blockId: 'B',
    dateAllocated: '2024-01-12',
    status: 'Allocated',
    marketer: 'Mike Johnson',
    amount: '₦15,600,000',
    paymentStatus: 'Completed',
    clientId: 'CL002'
  },
  {
    id: 3,
    clientName: 'Robert Brown',
    unitId: 'C-22',
    blockId: 'C',
    dateAllocated: '2024-01-10',
    status: 'Allocated',
    marketer: 'David Chen',
    amount: '₦15,600,000',
    paymentStatus: 'Pending',
    clientId: 'CL003'
  }
];

const mockOfferedUnits = [
  {
    id: 4,
    clientName: 'Mary Johnson',
    unitId: 'A-20',
    blockId: 'A',
    dateOffered: '2024-01-14',
    status: 'Offered',
    marketer: 'Sarah Wilson',
    amount: '₦15,600,000',
    expiryDate: '2024-01-21',
    clientId: 'CL004'
  },
  {
    id: 5,
    clientName: 'Ahmed Hassan',
    unitId: 'B-12',
    blockId: 'B',
    dateOffered: '2024-01-13',
    status: 'Offered',
    marketer: 'Lisa Thompson',
    amount: '₦15,600,000',
    expiryDate: '2024-01-20',
    clientId: 'CL005'
  }
];

export function ProjectSalesHistoryTab({ project }: ProjectSalesHistoryTabProps) {
  const [activeTab, setActiveTab] = useState('allocated');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { isMobile } = useResponsive();

  const handleReallocate = (unitId: string, clientName: string) => {
    toast.success(`Reallocation process started for Unit ${unitId} from ${clientName}`);
    // In real app, this would open a reallocation modal/form
  };

  const handleRevoke = (unitId: string, clientName: string) => {
    toast.success(`Unit ${unitId} revoked from ${clientName} successfully`);
    // In real app, this would make an API call to revoke the allocation
  };

  const handleViewClient = (clientId: string) => {
    // In real app, this would navigate to client detail page
    console.log(`Viewing client ${clientId}`);
  };

  const filteredAllocated = mockAllocatedUnits.filter(unit => 
    unit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.unitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.marketer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOffered = mockOfferedUnits.filter(unit => 
    unit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.unitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.marketer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sales History</h2>
          <p className="text-gray-600">Track allocations and offers for {project.name}</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by client, unit, or marketer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{mockAllocatedUnits.length}</div>
                <div className="text-sm text-gray-500">Total Allocated</div>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{mockOfferedUnits.length}</div>
                <div className="text-sm text-gray-500">Active Offers</div>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">₦46.8M</div>
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
                <div className="text-2xl font-bold text-purple-600">75%</div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales History Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger 
                  value="allocated"
                  className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
                >
                  Allocated Units ({mockAllocatedUnits.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="offered"
                  className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-600"
                >
                  Offered Units ({mockOfferedUnits.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="allocated" className="p-6 pt-4">
              {isMobile ? (
                <div className="space-y-4">
                  {filteredAllocated.map((unit) => (
                    <Card key={unit.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold">{unit.clientName}</div>
                              <div className="text-sm text-gray-500">Unit {unit.unitId} • Block {unit.blockId}</div>
                            </div>
                            <Badge className={getPaymentStatusColor(unit.paymentStatus)}>
                              {unit.paymentStatus}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <div className="font-medium">{unit.dateAllocated}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Amount:</span>
                              <div className="font-medium text-green-600">{unit.amount}</div>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <span className="text-gray-500">Marketer:</span>
                            <div className="font-medium">{unit.marketer}</div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewClient(unit.clientId)}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleReallocate(unit.unitId, unit.clientName)}>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Reallocate
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600">
                                  <X className="h-3 w-3 mr-1" />
                                  Revoke
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke Allocation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to revoke Unit {unit.unitId} from {unit.clientName}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => handleRevoke(unit.unitId, unit.clientName)}
                                  >
                                    Revoke Allocation
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Unit / Block</TableHead>
                        <TableHead>Date Allocated</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Marketer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAllocated.map((unit) => (
                        <TableRow key={unit.id}>
                          <TableCell className="font-medium">{unit.clientName}</TableCell>
                          <TableCell>{unit.unitId} / Block {unit.blockId}</TableCell>
                          <TableCell>{unit.dateAllocated}</TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(unit.paymentStatus)}>
                              {unit.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{unit.marketer}</TableCell>
                          <TableCell className="font-medium text-green-600">{unit.amount}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewClient(unit.clientId)}>
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleReallocate(unit.unitId, unit.clientName)}>
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-red-600">
                                    <X className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Revoke Allocation</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to revoke Unit {unit.unitId} from {unit.clientName}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() => handleRevoke(unit.unitId, unit.clientName)}
                                    >
                                      Revoke Allocation
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
                </div>
              )}
            </TabsContent>

            <TabsContent value="offered" className="p-6 pt-4">
              {isMobile ? (
                <div className="space-y-4">
                  {filteredOffered.map((unit) => (
                    <Card key={unit.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold">{unit.clientName}</div>
                              <div className="text-sm text-gray-500">Unit {unit.unitId} • Block {unit.blockId}</div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">Offered</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Offered:</span>
                              <div className="font-medium">{unit.dateOffered}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Expires:</span>
                              <div className="font-medium text-red-600">{unit.expiryDate}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Amount:</span>
                              <div className="font-medium text-green-600">{unit.amount}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Marketer:</span>
                              <div className="font-medium">{unit.marketer}</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewClient(unit.clientId)}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <X className="h-3 w-3 mr-1" />
                              Withdraw
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Unit / Block</TableHead>
                        <TableHead>Date Offered</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Marketer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOffered.map((unit) => (
                        <TableRow key={unit.id}>
                          <TableCell className="font-medium">{unit.clientName}</TableCell>
                          <TableCell>{unit.unitId} / Block {unit.blockId}</TableCell>
                          <TableCell>{unit.dateOffered}</TableCell>
                          <TableCell className="text-red-600 font-medium">{unit.expiryDate}</TableCell>
                          <TableCell>{unit.marketer}</TableCell>
                          <TableCell className="font-medium text-green-600">{unit.amount}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewClient(unit.clientId)}>
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

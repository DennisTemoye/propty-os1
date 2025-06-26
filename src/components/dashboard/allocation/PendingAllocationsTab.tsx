
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Search, Handshake } from 'lucide-react';
import { AllocationFlowModal } from '../sales-allocation/AllocationFlowModal';
import { toast } from 'sonner';

interface PendingAllocationsTabProps {
  onAllocate?: (data: any) => void;
}

const mockPendingSales = [
  {
    id: 'pending-1',
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    salesType: 'presale',
    saleAmount: '₦25,000,000',
    saleDate: '2024-01-15',
    status: 'awaiting_allocation',
    notes: 'Client ready for unit assignment'
  },
  {
    id: 'pending-2',
    clientName: 'Sarah Johnson',
    projectName: 'Emerald Heights',
    salesType: 'presale',
    saleAmount: '₦30,000,000',
    saleDate: '2024-01-12',
    status: 'awaiting_allocation'
  },
  {
    id: 'pending-3',
    clientName: 'Robert Brown',
    projectName: 'Golden View',
    salesType: 'presale',
    saleAmount: '₦22,000,000',
    saleDate: '2024-01-10',
    status: 'awaiting_allocation',
    notes: 'Priority client - fast track requested'
  }
];

export function PendingAllocationsTab({ onAllocate }: PendingAllocationsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);

  const filteredSales = mockPendingSales.filter(sale => {
    const matchesSearch = sale.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || sale.projectName === projectFilter;
    return matchesSearch && matchesProject;
  });

  const handleAllocateUnit = (sale: any) => {
    setSelectedSale(sale);
    setShowAllocationModal(true);
  };

  const handleAllocationSubmit = (data: any) => {
    const allocationData = {
      ...data,
      clientId: selectedSale.id,
      clientName: selectedSale.clientName,
      projectName: selectedSale.projectName,
      saleAmount: selectedSale.saleAmount,
      status: 'pending_approval'
    };
    
    if (onAllocate) {
      onAllocate(allocationData);
    }
    
    setShowAllocationModal(false);
    setSelectedSale(null);
    toast.success('Allocation initiated and sent for approval!');
  };

  const projects = [...new Set(mockPendingSales.map(s => s.projectName))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <CardTitle>Sales Awaiting Allocation</CardTitle>
            </div>
            <Badge className="bg-orange-600 text-white">
              {filteredSales.length} pending
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Clients with completed sales who need unit allocation
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sales Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Project</TableHead>
                <TableHead>Sale Amount</TableHead>
                <TableHead>Sale Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.clientName}</div>
                      <div className="text-sm text-gray-500">{sale.projectName}</div>
                      {sale.notes && (
                        <div className="text-xs text-blue-600 mt-1">{sale.notes}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{sale.saleAmount}</TableCell>
                  <TableCell>
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-orange-100 text-orange-800">
                      Awaiting Allocation
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm"
                      onClick={() => handleAllocateUnit(sale)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Handshake className="h-4 w-4 mr-1" />
                      Allocate Unit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No sales awaiting allocation found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AllocationFlowModal 
        isOpen={showAllocationModal}
        onClose={() => {
          setShowAllocationModal(false);
          setSelectedSale(null);
        }}
        onSubmit={handleAllocationSubmit}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Search, Filter, Eye, CheckCircle, XCircle, Handshake } from 'lucide-react';
import { PendingAllocation } from '@/types/allocation';
import { ApprovalWorkflowModal } from './ApprovalWorkflowModal';
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

const mockPendingApprovals: PendingAllocation[] = [
  {
    id: 'approval-1',
    clientName: 'Alice Cooper',
    projectName: 'Ocean Breeze',
    unit: 'Block B - Plot 8',
    salesType: 'instant_allocation',
    submittedBy: 'Mike Davis',
    submittedAt: '2024-01-15T09:15:00Z',
    status: 'pending',
    amount: '₦28,000,000'
  },
  {
    id: 'approval-2',
    clientName: 'David Wilson',
    projectName: 'Royal Estate',
    unit: 'Block C - Plot 22',
    salesType: 'sales_offer',
    submittedBy: 'Sarah Wilson',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'pending',
    amount: '₦35,000,000'
  }
];

export function PendingAllocationsTab({ onAllocate }: PendingAllocationsTabProps) {
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedAllocation, setSelectedAllocation] = useState<PendingAllocation | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'awaiting_allocation' | 'pending_approval'>('awaiting_allocation');

  const filteredSales = mockPendingSales.filter(sale => {
    const matchesSearch = sale.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || sale.projectName === projectFilter;
    return matchesSearch && matchesProject;
  });

  const filteredApprovals = pendingApprovals.filter(allocation => {
    const matchesSearch = allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (allocation.unit && allocation.unit.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = projectFilter === 'all' || allocation.projectName === projectFilter;
    
    return matchesSearch && matchesProject && allocation.status === 'pending';
  });

  const handleAllocateUnit = (sale: any) => {
    const allocationData = {
      clientId: sale.id,
      clientName: sale.clientName,
      projectName: sale.projectName,
      saleAmount: sale.saleAmount,
      allocationType: 'new_allocation',
      status: 'pending_approval'
    };
    
    if (onAllocate) {
      onAllocate(allocationData);
    }
    toast.success('Allocation initiated and sent for approval!');
  };

  const handleApprove = (allocationId: string, otpCode: string) => {
    console.log('Approving allocation:', allocationId, 'with OTP:', otpCode);
    setPendingApprovals(prev => 
      prev.map(allocation => 
        allocation.id === allocationId 
          ? { ...allocation, status: 'approved' as const }
          : allocation
      )
    );
    toast.success('Allocation approved successfully!');
  };

  const handleDecline = (allocationId: string, reason: string) => {
    console.log('Declining allocation:', allocationId, 'reason:', reason);
    setPendingApprovals(prev => 
      prev.map(allocation => 
        allocation.id === allocationId 
          ? { ...allocation, status: 'declined' as const }
          : allocation
      )
    );
    toast.success('Allocation declined and team member has been notified.');
  };

  const openApprovalModal = (allocation: PendingAllocation) => {
    setSelectedAllocation(allocation);
    setShowApprovalModal(true);
  };

  const projects = [...new Set([...mockPendingSales.map(s => s.projectName), ...mockPendingApprovals.map(a => a.projectName)])];

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="flex space-x-2">
        <Button 
          variant={activeSection === 'awaiting_allocation' ? 'default' : 'outline'}
          onClick={() => setActiveSection('awaiting_allocation')}
          className="relative"
        >
          Awaiting Allocation
          <Badge className="ml-2 bg-orange-600 text-white text-xs">
            {mockPendingSales.length}
          </Badge>
        </Button>
        <Button 
          variant={activeSection === 'pending_approval' ? 'default' : 'outline'}
          onClick={() => setActiveSection('pending_approval')}
          className="relative"
        >
          Pending Approvals
          <Badge className="ml-2 bg-yellow-600 text-white text-xs">
            {filteredApprovals.length}
          </Badge>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {activeSection === 'awaiting_allocation' ? (
                <>
                  <Clock className="h-5 w-5 text-orange-600" />
                  <CardTitle>Sales Awaiting Allocation</CardTitle>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <CardTitle>Allocations Pending Approval</CardTitle>
                </>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {activeSection === 'awaiting_allocation' 
              ? 'Clients with completed sales who need unit allocation'
              : 'Allocation actions submitted and awaiting administrative approval'
            }
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or units..."
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

          {/* Content based on active section */}
          {activeSection === 'awaiting_allocation' ? (
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
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client & Unit</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{allocation.clientName}</div>
                        <div className="text-sm text-gray-500">{allocation.unit}</div>
                      </div>
                    </TableCell>
                    <TableCell>{allocation.projectName}</TableCell>
                    <TableCell className="font-medium">{allocation.amount}</TableCell>
                    <TableCell>{allocation.submittedBy}</TableCell>
                    <TableCell>
                      {new Date(allocation.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openApprovalModal(allocation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openApprovalModal(allocation)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openApprovalModal(allocation)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {((activeSection === 'awaiting_allocation' && filteredSales.length === 0) || 
            (activeSection === 'pending_approval' && filteredApprovals.length === 0)) && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>
                {activeSection === 'awaiting_allocation' 
                  ? 'No sales awaiting allocation found'
                  : 'No pending approvals found'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ApprovalWorkflowModal 
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        allocation={selectedAllocation}
        onApprove={handleApprove}
        onDecline={handleDecline}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Search, Eye, CheckCircle, UserPlus } from 'lucide-react';
import { PendingAllocation } from '@/types/allocation';
import { ApprovalWorkflowModal } from './ApprovalWorkflowModal';
import { toast } from 'sonner';

interface PendingAllocationsTabProps {
  onAllocate: (allocation: PendingAllocation) => void;
}

const mockPendingAllocations: PendingAllocation[] = [
  {
    id: 'pending-1',
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    unit: 'Awaiting allocation',
    salesType: 'pre_allocation',
    submittedBy: 'Jane Smith',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending',
    amount: '₦25,000,000',
    notes: 'Client has completed payment, ready for allocation'
  },
  {
    id: 'pending-2',
    clientName: 'Sarah Johnson',
    projectName: 'Emerald Heights',
    unit: 'Block B - Plot 8',
    salesType: 'with_allocation',
    submittedBy: 'Mike Davis',
    submittedAt: '2024-01-15T09:15:00Z',
    status: 'pending',
    amount: '₦30,000,000'
  },
  {
    id: 'pending-3',
    clientName: 'Robert Brown',
    projectName: 'Golden View',
    unit: 'Awaiting allocation',
    salesType: 'pre_allocation',
    submittedBy: 'Sarah Wilson',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'pending',
    amount: '₦22,000,000',
    notes: 'Priority client - expedite allocation'
  }
];

export function PendingAllocationsTab({ onAllocate }: PendingAllocationsTabProps) {
  const [pendingAllocations, setPendingAllocations] = useState(mockPendingAllocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [salesTypeFilter, setSalesTypeFilter] = useState('all');
  const [selectedAllocation, setSelectedAllocation] = useState<PendingAllocation | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const filteredAllocations = pendingAllocations.filter(allocation => {
    const matchesSearch = allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || allocation.projectName === projectFilter;
    const matchesSalesType = salesTypeFilter === 'all' || allocation.salesType === salesTypeFilter;
    
    return matchesSearch && matchesProject && matchesSalesType && allocation.status === 'pending';
  });

  const handleApprove = (allocationId: string, otpCode: string) => {
    console.log('Approving allocation:', allocationId, 'with OTP:', otpCode);
    setPendingAllocations(prev => 
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
    setPendingAllocations(prev => 
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

  const getSalesTypeColor = (type: string) => {
    switch (type) {
      case 'with_allocation':
        return 'bg-blue-100 text-blue-800';
      case 'pre_allocation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSalesTypeLabel = (type: string) => {
    switch (type) {
      case 'with_allocation':
        return 'With Allocation';
      case 'pre_allocation':
        return 'Pre-Allocation';
      default:
        return type;
    }
  };

  const projects = [...new Set(mockPendingAllocations.map(a => a.projectName))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle>Pending Allocations</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800">
                {filteredAllocations.length} Awaiting Action
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Clients with recorded sales awaiting unit allocation by the allocation team
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or projects..."
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
            <Select value={salesTypeFilter} onValueChange={setSalesTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Sales Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sales Types</SelectItem>
                <SelectItem value="pre_allocation">Pre-Allocation</SelectItem>
                <SelectItem value="with_allocation">With Allocation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Project</TableHead>
                <TableHead>Unit Status</TableHead>
                <TableHead>Sales Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Sales Rep</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.clientName}</div>
                      <div className="text-sm text-gray-500">{allocation.projectName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={allocation.unit === 'Awaiting allocation' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                      {allocation.unit}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSalesTypeColor(allocation.salesType)}>
                      {getSalesTypeLabel(allocation.salesType)}
                    </Badge>
                  </TableCell>
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
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onAllocate(allocation)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Allocate Unit"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openApprovalModal(allocation)}
                        className="text-green-600 hover:text-green-700"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAllocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No pending allocations found</p>
              <p className="text-sm">Clients with sales will appear here for allocation processing</p>
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Search, Eye, Clock } from 'lucide-react';
import { PendingAllocation } from '@/types/allocation';
import { ApprovalWorkflowModal } from '../allocation/ApprovalWorkflowModal';
import { toast } from 'sonner';

interface PendingApprovalsTabProps {
  onApprove?: (allocationId: string, otpCode: string) => void;
  onDecline?: (allocationId: string, reason: string) => void;
}

const mockPendingApprovals: PendingAllocation[] = [
  {
    id: 'approval-1',
    clientName: 'Alice Cooper',
    projectName: 'Ocean Breeze',
    plotNumber: 'Block B - Plot 8',
    salesType: 'instant_allocation',
    submittedBy: 'Mike Davis',
    submittedAt: '2024-01-15T09:15:00Z',
    status: 'pending',
    amount: '₦28,000,000',
    notes: 'Urgent allocation request',
    actionHistory: []
  },
  {
    id: 'approval-2',
    clientName: 'David Wilson',
    projectName: 'Royal Estate',
    plotNumber: 'Block C - Plot 22',
    salesType: 'sales_offer',
    submittedBy: 'Sarah Wilson',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'pending',
    amount: '₦35,000,000',
    actionHistory: []
  },
  {
    id: 'approval-3',
    clientName: 'Emma Thompson',
    projectName: 'Victoria Gardens',
    plotNumber: 'Block A - Plot 5',
    salesType: 'reservation',
    submittedBy: 'Tom Johnson',
    submittedAt: '2024-01-13T11:30:00Z',
    status: 'pending',
    amount: '₦42,000,000',
    notes: 'VIP client - priority processing',
    actionHistory: []
  }
];

export function PendingApprovalsTab({ onApprove, onDecline }: PendingApprovalsTabProps) {
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedAllocation, setSelectedAllocation] = useState<PendingAllocation | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const filteredApprovals = pendingApprovals.filter(allocation => {
    const matchesSearch = allocation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (allocation.plotNumber && allocation.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = projectFilter === 'all' || allocation.projectName === projectFilter;
    
    return matchesSearch && matchesProject && allocation.status === 'pending';
  });

  const projects = [...new Set(mockPendingApprovals.map(a => a.projectName))];

  const handleApprovalAction = (allocation: PendingAllocation) => {
    setSelectedAllocation(allocation);
    setShowApprovalModal(true);
  };

  const handleApproveAllocation = (allocationId: string, otpCode: string) => {
    setPendingApprovals(prev => 
      prev.map(allocation => 
        allocation.id === allocationId 
          ? { ...allocation, status: 'approved' as const }
          : allocation
      )
    );
    onApprove?.(allocationId, otpCode);
    toast.success('Allocation approved successfully! Letter sent to client.');
  };

  const handleDeclineAllocation = (allocationId: string, reason: string) => {
    setPendingApprovals(prev => 
      prev.map(allocation => 
        allocation.id === allocationId 
          ? { ...allocation, status: 'declined' as const }
          : allocation
      )
    );
    onDecline?.(allocationId, reason);
    toast.success('Allocation declined and team member has been notified.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle>Pending Approvals</CardTitle>
            </div>
            <Badge className="bg-yellow-600 text-white">
              {filteredApprovals.length} pending
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Allocation actions submitted by team members requiring administrative approval with letter preview
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or plots..."
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

          {/* Approvals Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Plot</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
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
                      <div className="text-sm text-gray-500">{allocation.plotNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{allocation.projectName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {allocation.salesType.replace('_', ' ')}
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
                        onClick={() => handleApprovalAction(allocation)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredApprovals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No pending approvals found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ApprovalWorkflowModal 
        isOpen={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setSelectedAllocation(null);
        }}
        allocation={selectedAllocation}
        onApprove={handleApproveAllocation}
        onDecline={handleDeclineAllocation}
      />
    </div>
  );
}

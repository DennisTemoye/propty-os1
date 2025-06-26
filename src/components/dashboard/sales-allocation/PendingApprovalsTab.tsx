
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Eye, Search, Clock, User, Building } from 'lucide-react';
import { OTPVerificationModal } from '../allocation/OTPVerificationModal';
import { toast } from 'sonner';

interface PendingApproval {
  id: string;
  type: 'allocation' | 'reallocation' | 'revocation';
  clientName: string;
  projectName: string;
  unit?: string;
  amount: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  priority: 'high' | 'medium' | 'low';
  reason?: string;
}

const mockPendingApprovals: PendingApproval[] = [
  {
    id: 'app-1',
    type: 'allocation',
    clientName: 'Alice Cooper',
    projectName: 'Victoria Gardens',
    unit: 'Block A - Plot 15',
    amount: '₦28,000,000',
    submittedBy: 'John Sales',
    submittedAt: '2024-01-15T09:30:00Z',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'app-2',
    type: 'reallocation',
    clientName: 'David Wilson',
    projectName: 'Emerald Heights',
    unit: 'Block B - Plot 8 → Block C - Plot 12',
    amount: '₦35,000,000',
    submittedBy: 'Sarah Manager',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'app-3',
    type: 'revocation',
    clientName: 'Emma Thompson',
    projectName: 'Golden View',
    unit: 'Block A - Plot 22',
    amount: '₦22,000,000',
    submittedBy: 'Mike Admin',
    submittedAt: '2024-01-13T11:20:00Z',
    status: 'pending',
    priority: 'high',
    reason: 'Payment default after 90 days'
  }
];

export function PendingApprovalsTab() {
  const [approvals, setApprovals] = useState(mockPendingApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'decline'>('approve');

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = 
      approval.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (approval.unit && approval.unit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || approval.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || approval.priority === priorityFilter;
    const isPending = approval.status === 'pending';
    
    return matchesSearch && matchesType && matchesPriority && isPending;
  });

  const handleApprovalAction = (approval: PendingApproval, action: 'approve' | 'decline') => {
    setSelectedApproval(approval);
    setActionType(action);
    setShowOTPModal(true);
  };

  const handleOTPVerification = (otpCode: string, reason?: string) => {
    if (!selectedApproval) return;

    setApprovals(prev => 
      prev.map(approval => 
        approval.id === selectedApproval.id 
          ? { 
              ...approval, 
              status: actionType === 'approve' ? 'approved' : 'declined',
              reason: reason 
            }
          : approval
      )
    );

    toast.success(
      actionType === 'approve' 
        ? `${selectedApproval.type} approved successfully!`
        : `${selectedApproval.type} declined successfully!`
    );

    setShowOTPModal(false);
    setSelectedApproval(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'allocation': return 'bg-blue-100 text-blue-800';
      case 'reallocation': return 'bg-purple-100 text-purple-800';
      case 'revocation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle>Pending Approvals</CardTitle>
              <Badge className="bg-yellow-600 text-white">
                {filteredApprovals.length}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Allocation actions requiring administrative approval with OTP verification
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search client, project, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="allocation">New Allocation</SelectItem>
                <SelectItem value="reallocation">Reallocation</SelectItem>
                <SelectItem value="revocation">Revocation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Approvals Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type & Priority</TableHead>
                <TableHead>Client & Unit</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getTypeColor(approval.type)}>
                        {approval.type.charAt(0).toUpperCase() + approval.type.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(approval.priority)}>
                        {approval.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{approval.clientName}</div>
                      <div className="text-sm text-gray-500">{approval.unit}</div>
                    </div>
                  </TableCell>
                  <TableCell>{approval.projectName}</TableCell>
                  <TableCell className="font-medium">{approval.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{approval.submittedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(approval.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          // View details functionality
                          console.log('View details:', approval);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleApprovalAction(approval, 'approve')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Decline Approval</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to decline this {approval.type}? This action will require OTP verification.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleApprovalAction(approval, 'decline')}
                            >
                              Proceed to Decline
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

          {filteredApprovals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No pending approvals found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <OTPVerificationModal 
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerification}
        actionType={actionType}
        approval={selectedApproval}
      />
    </div>
  );
}

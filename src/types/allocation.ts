
export interface AllocationApproval {
  id: string;
  allocationId: string;
  status: 'pending' | 'approved' | 'declined';
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  declineReason?: string;
  otpRequired?: boolean;
  otpVerified?: boolean;
}

export interface PendingAllocation {
  id: string;
  clientName: string;
  projectName: string;
  unit: string;
  salesType: 'instant_allocation' | 'sales_offer' | 'reservation';
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  amount: string;
  notes?: string;
}

export interface SystemNotification {
  id: string;
  type: 'allocation_pending' | 'allocation_approved' | 'allocation_declined' | 'otp_required';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedAllocationId?: string;
}

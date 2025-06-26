
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
  salesType: 'instant_allocation' | 'sales_offer' | 'reservation' | 'offer_only' | 'offer_allocation';
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  amount: string;
  notes?: string;
}

export interface PendingOffer {
  id: string;
  clientName: string;
  projectName: string;
  salesType: 'offer_only' | 'offer_allocation';
  saleAmount: string;
  initialPayment?: string;
  saleDate: string;
  status: 'pending_offer' | 'offer_sent' | 'client_responded';
  marketer?: string;
  unitNumber?: string;
  notes?: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  type: 'offer_letter' | 'allocation_letter' | 'payment_notice' | 'completion_letter' | 'termination_letter';
  content: string;
  status: 'active' | 'draft' | 'archived';
  fields: string[];
  lastModified: string;
  createdBy?: string;
}

export interface SystemNotification {
  id: string;
  type: 'allocation_pending' | 'allocation_approved' | 'allocation_declined' | 'otp_required' | 'offer_pending' | 'offer_sent';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedAllocationId?: string;
  relatedOfferId?: string;
}

export interface SalesRecord {
  id: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  salesType: 'offer_only' | 'offer_allocation';
  unitNumber?: string;
  saleAmount: string;
  initialPayment?: string;
  marketerId?: string;
  marketerName?: string;
  saleDate: string;
  paymentMethod?: string;
  notes?: string;
  status: 'pending_offer' | 'pending_allocation' | 'completed';
  createdAt: string;
  updatedAt: string;
}

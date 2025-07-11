
// Sales Pipeline Stages: Lead → Inspection → Offer → Allocation → Paid
export type SalesPipelineStage = 'lead' | 'inspection' | 'offer' | 'allocation' | 'paid';

export interface SalesPipelineEntry {
  id: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  plotNumber: string;
  stage: SalesPipelineStage;
  marketerId?: string;
  marketerName?: string;
  saleAmount: string;
  initialPayment?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

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
  actionHistory?: ActionHistoryEntry[];
}

export interface ActionHistoryEntry {
  id: string;
  action: string;
  performedBy: string;
  performedAt: string;
  details?: string;
}

export interface PendingAllocation {
  id: string;
  clientName: string;
  projectName: string;
  plotNumber: string;
  salesType: 'instant_allocation' | 'sales_offer' | 'reservation' | 'offer_only' | 'offer_allocation';
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  amount: string;
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface PendingOffer {
  id: string;
  clientName: string;
  projectName: string;
  plotNumber?: string;
  salesType: 'offer_only' | 'offer_allocation';
  saleAmount: string;
  initialPayment?: string;
  saleDate: string;
  status: 'sent' | 'pending_acceptance' | 'accepted' | 'expired';
  marketer?: string;
  notes?: string;
  expiryDate?: string;
  sentAt?: string;
  acceptedAt?: string;
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
  plotNumber?: string;
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
  paymentStatus?: 'pending' | 'partial' | 'paid';
  allocationStatus?: 'pending' | 'approved' | 'active' | 'cancelled';
}

export interface PlotAllocationTimeline {
  id: string;
  plotNumber: string;
  projectName: string;
  events: AllocationTimelineEvent[];
}

export interface AllocationTimelineEvent {
  id: string;
  eventType: 'allocated' | 'payment' | 'cancelled' | 'reallocated' | 'completed';
  clientName: string;
  amount?: string;
  performedBy: string;
  timestamp: string;
  notes?: string;
}

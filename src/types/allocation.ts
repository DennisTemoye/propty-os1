
// Sales Pipeline Stage Types
export type PipelineStage = 'lead' | 'inspection' | 'offer' | 'allocation' | 'paid';
export type OfferStatus = 'sent' | 'pending_acceptance' | 'accepted' | 'expired';
export type AllocationStatus = 'pending' | 'approved' | 'declined' | 'allocated' | 'paid';

export interface SalesPipelineItem {
  id: string;
  stage: PipelineStage;
  clientId: string;
  clientName: string;
  clientEmail: string;
  projectId: string;
  projectName: string;
  plotNumber?: string;
  saleAmount?: string;
  initialPayment?: string;
  marketerId?: string;
  marketerName?: string;
  assignedAt: string;
  lastUpdated: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
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
  roleRequired: 'director' | 'admin' | 'manager';
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
  actionHistory: AllocationActionHistory[];
}

export interface PendingOffer {
  id: string;
  clientName: string;
  projectName: string;
  salesType: 'offer_only' | 'offer_allocation';
  saleAmount: string;
  initialPayment?: string;
  saleDate: string;
  status: OfferStatus;
  marketer?: string;
  plotNumber?: string;
  notes?: string;
  expiryDate?: string;
  letterGenerated?: boolean;
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
  type: 'allocation_pending' | 'allocation_approved' | 'allocation_declined' | 'otp_required' | 'offer_pending' | 'offer_sent' | 'pipeline_stage_changed';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedAllocationId?: string;
  relatedOfferId?: string;
  relatedPipelineId?: string;
  priority: 'low' | 'medium' | 'high';
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
  status: AllocationStatus;
  createdAt: string;
  updatedAt: string;
  pipelineStage: PipelineStage;
}

export interface AllocationActionHistory {
  id: string;
  action: 'created' | 'approved' | 'declined' | 'modified' | 'cancelled' | 'payment_received';
  performedBy: string;
  performedAt: string;
  notes?: string;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
}

export interface PlotTimelineEntry {
  id: string;
  plotNumber: string;
  projectName: string;
  timestamp: string;
  event: 'allocated' | 'payment_received' | 'status_changed' | 'reallocated' | 'cancelled';
  description: string;
  clientName?: string;
  amount?: string;
  performedBy: string;
}

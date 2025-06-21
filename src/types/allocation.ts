
export type AllocationStatus = 'interested' | 'offered' | 'allocated';

export type RefundType = 'full' | 'partial';

export interface AllocationStage {
  id: string;
  clientId: string;
  projectId: string;
  unitId: string;
  status: AllocationStatus;
  assignedDate: string;
  updatedDate: string;
  price: string;
  paymentPlan?: string;
  notes?: string;
}

export interface RevocationData {
  reason: string;
  refundType: RefundType;
  refundAmount?: string;
  refundPercentage?: number;
  deductionAmount?: string;
  adminNotes?: string;
}

export interface AllocationActivity {
  id: string;
  allocationId: string;
  type: 'status_change' | 'revocation' | 'assignment';
  fromStatus?: AllocationStatus;
  toStatus?: AllocationStatus;
  timestamp: string;
  adminId: string;
  notes?: string;
  revocationData?: RevocationData;
}

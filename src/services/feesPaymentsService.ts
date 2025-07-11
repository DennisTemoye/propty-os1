// Shared service for synchronizing fees and payments data between modules
export interface FeeData {
  id: number;
  clientName: string;
  project: string;
  unit: string;
  feeType: 'Infrastructure Fee' | 'Service Charge' | 'Survey Fee' | 'Legal Fee' | 'Documentation Fee';
  amount: string;
  status: 'Paid' | 'Partially Paid' | 'Overdue' | 'Pending';
  paid: string;
  outstanding: string;
  dueDate: string;
  lastPayment: string | null;
}

export interface PaymentRecord {
  id: number;
  type: string;
  client: string;
  project: string;
  marketer: string;
  amount: number;
  status: string;
  date: string;
  reference: string;
  feeId?: number; // Link to fee record if applicable
}

// Mock data that can be shared between modules
export const mockFeesData: FeeData[] = [
  {
    id: 1,
    clientName: 'John Doe',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 02',
    feeType: 'Infrastructure Fee',
    amount: '₦5,000,000',
    status: 'Partially Paid',
    paid: '₦2,000,000',
    outstanding: '₦3,000,000',
    dueDate: '2024-02-15',
    lastPayment: '2024-01-15'
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    project: 'Emerald Heights',
    unit: 'Block B - Plot 12',
    feeType: 'Service Charge',
    amount: '₦50,000',
    status: 'Overdue',
    paid: '₦0',
    outstanding: '₦50,000',
    dueDate: '2024-01-30',
    lastPayment: null
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    project: 'Golden View',
    unit: 'Block C - Plot 05',
    feeType: 'Infrastructure Fee',
    amount: '₦4,500,000',
    status: 'Paid',
    paid: '₦4,500,000',
    outstanding: '₦0',
    dueDate: '2024-01-01',
    lastPayment: '2023-12-28'
  },
  {
    id: 4,
    clientName: 'Sarah Williams',
    project: 'Victoria Gardens',
    unit: 'Block A - Plot 15',
    feeType: 'Survey Fee',
    amount: '₦250,000',
    status: 'Pending',
    paid: '₦0',
    outstanding: '₦250,000',
    dueDate: '2024-02-28',
    lastPayment: null
  }
];

export const mockPaymentsData: PaymentRecord[] = [
  {
    id: 1,
    type: 'Property Sale - Allocation Payment',
    client: 'John Doe',
    project: 'Victoria Gardens',
    marketer: 'Jane Smith',
    amount: 25000000,
    status: 'completed',
    date: '2024-01-15',
    reference: 'PAY-001'
  },
  {
    id: 2,
    type: 'Infrastructure Fee',
    client: 'John Doe',
    project: 'Victoria Gardens',
    marketer: 'Jane Smith',
    amount: 2000000,
    status: 'completed',
    date: '2024-01-15',
    reference: 'INF-002',
    feeId: 1
  },
  {
    id: 3,
    type: 'Service Charge',
    client: 'Jane Smith',
    project: 'Emerald Heights',
    marketer: 'Mike Davis',
    amount: 0,
    status: 'overdue',
    date: '2024-01-01',
    reference: 'SVC-003',
    feeId: 2
  },
  {
    id: 4,
    type: 'Infrastructure Fee',
    client: 'Mike Johnson',
    project: 'Golden View',
    marketer: 'Sarah Johnson',
    amount: 4500000,
    status: 'completed',
    date: '2023-12-28',
    reference: 'INF-004',
    feeId: 3
  },
  {
    id: 5,
    type: 'Property Sale - Full Payment',
    client: 'Emma Davis',
    project: 'Emerald Heights',
    marketer: 'Mike Davis',
    amount: 18000000,
    status: 'completed',
    date: '2024-01-10',
    reference: 'PAY-005'
  },
  {
    id: 6,
    type: 'Instalment Payment',
    client: 'Robert Brown',
    project: 'Golden View',
    marketer: 'Sarah Johnson',
    amount: 5000000,
    status: 'completed',
    date: '2024-01-08',
    reference: 'INST-006'
  }
];

// Service functions
export class FeesPaymentsService {
  static getFees(): FeeData[] {
    return mockFeesData;
  }

  static getPayments(): PaymentRecord[] {
    return mockPaymentsData;
  }

  static getPaymentsByFeeId(feeId: number): PaymentRecord[] {
    return mockPaymentsData.filter(payment => payment.feeId === feeId);
  }

  static getFeesByStatus(status: string): FeeData[] {
    return mockFeesData.filter(fee => fee.status === status);
  }

  static getPaymentsByType(type: string): PaymentRecord[] {
    return mockPaymentsData.filter(payment => 
      payment.type.toLowerCase().includes(type.toLowerCase())
    );
  }

  static getTotalFeesCollected(): number {
    return mockFeesData.reduce((total, fee) => {
      const paidAmount = parseFloat(fee.paid.replace(/[₦,]/g, ''));
      return total + (isNaN(paidAmount) ? 0 : paidAmount);
    }, 0);
  }

  static getTotalOutstanding(): number {
    return mockFeesData.reduce((total, fee) => {
      const outstandingAmount = parseFloat(fee.outstanding.replace(/[₦,]/g, ''));
      return total + (isNaN(outstandingAmount) ? 0 : outstandingAmount);
    }, 0);
  }
}
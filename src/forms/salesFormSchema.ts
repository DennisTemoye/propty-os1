
import { z } from 'zod';

export const salesFormSchema = z.object({
  clientId: z.string().min(1, 'Client selection is required'),
  projectId: z.string().min(1, 'Project selection is required'),
  unitIds: z.array(z.string()).min(1, 'At least one unit must be selected'),
  salesType: z.enum(['instant-allocation', 'sales-offer', 'reservation'], {
    required_error: 'Sales type is required'
  }),
  salesDate: z.string().min(1, 'Sales date is required'),
  totalAmount: z.string().optional(),
  initialPayment: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
  
  // Allocation-specific fields (shown only for instant-allocation)
  allocationDate: z.string().optional(),
  contractDetails: z.string().optional(),
  documents: z.array(z.any()).optional(),
  
  // Offer-specific fields
  offerExpiryDate: z.string().optional(),
  offerTerms: z.string().optional()
});

export type SalesFormData = z.infer<typeof salesFormSchema>;

export const salesTypeOptions = [
  { 
    value: 'instant-allocation', 
    label: 'Instant Allocation',
    description: 'Complete sale with immediate unit allocation'
  },
  { 
    value: 'sales-offer', 
    label: 'Sales Offer',
    description: 'Generate offer letter without allocation'
  },
  { 
    value: 'reservation', 
    label: 'Reservation',
    description: 'Reserve unit for client consideration'
  }
];

export const paymentMethodOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank-transfer', label: 'Bank Transfer' },
  { value: 'check', label: 'Check' },
  { value: 'card', label: 'Card Payment' },
  { value: 'installment', label: 'Installment Plan' }
];

// Mock data for dropdowns
export const mockClients = [
  { value: '1', label: 'John Doe' },
  { value: '2', label: 'Jane Smith' },
  { value: '3', label: 'Robert Brown' },
  { value: '4', label: 'Sarah Wilson' }
];

export const mockProjects = [
  { value: '1', label: 'Victoria Gardens' },
  { value: '2', label: 'Emerald Heights' },
  { value: '3', label: 'Golden View' },
  { value: '4', label: 'Ocean Breeze' }
];

export const mockUnits = [
  { value: '1', label: 'Block A - Plot 01', project: '1', status: 'available' },
  { value: '2', label: 'Block A - Plot 02', project: '1', status: 'available' },
  { value: '3', label: 'Block B - Plot 05', project: '2', status: 'available' },
  { value: '4', label: 'Block B - Plot 06', project: '2', status: 'reserved' },
  { value: '5', label: 'Block C - Plot 10', project: '3', status: 'available' }
];

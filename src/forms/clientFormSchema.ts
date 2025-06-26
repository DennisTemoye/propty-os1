
import { z } from 'zod';

export const clientFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  nationalId: z.string().optional(),
  occupation: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  referralSource: z.string().optional(),
  notes: z.string().optional()
});

export type ClientFormData = z.infer<typeof clientFormSchema>;

export const referralSourceOptions = [
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Website', label: 'Website' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Advertisement', label: 'Advertisement' },
  { value: 'Walk-in', label: 'Walk-in' },
  { value: 'Other', label: 'Other' }
];

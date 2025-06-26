
import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  documentTitle: z.string().optional(),
  type: z.string().min(1, 'Project type is required'),
  status: z.string().default('active'),
  projectSize: z.string().optional(),
  developmentStage: z.string().optional(),
  startDate: z.string().optional(),
  expectedCompletion: z.string().optional(),
  totalBudget: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email('Invalid email format').optional().or(z.literal(''))
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const projectTypeOptions = [
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Mixed-Use', label: 'Mixed-Use' }
];

export const projectStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'sold out', label: 'Sold Out' }
];

export const developmentStageOptions = [
  { value: 'Land Acquisition', label: 'Land Acquisition' },
  { value: 'Planning & Approvals', label: 'Planning & Approvals' },
  { value: 'Subdivision', label: 'Subdivision' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Handover', label: 'Handover' }
];

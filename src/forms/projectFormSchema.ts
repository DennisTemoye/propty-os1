
import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Project category is required'),
  description: z.string().optional(),
  status: z.string().min(1, 'Project status is required'),
  projectSize: z.string().optional(),
  documentTitle: z.string().optional(),
  projectManager: z.string().optional(),
  tags: z.string().optional(),
  startDate: z.string().optional(),
  expectedCompletion: z.string().optional(),
  totalBudget: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
  terminologyType: z.enum(['plots', 'units']).default('plots')
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const projectCategoryOptions = [
  { value: 'Land', label: 'Land' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Mixed', label: 'Mixed' }
];

export const projectStatusOptions = [
  { value: 'Acquisition', label: 'Acquisition' },
  { value: 'Documentation', label: 'Documentation' },
  { value: 'Planning', label: 'Planning' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Presale', label: 'Presale' },
  { value: 'Selling', label: 'Selling' },
  { value: 'Pause Sales', label: 'Pause Sales' },
  { value: 'Sold Out', label: 'Sold Out' }
];

// Legacy mapping for backward compatibility
export const legacyDevelopmentStageToStatus = {
  'Land Acquisition': 'Acquisition',
  'Planning & Approvals': 'Planning',
  'Subdivision': 'Planning',
  'Infrastructure': 'Construction',
  'Construction': 'Construction',
  'Marketing': 'Presale',
  'Pre-Launch': 'Presale',
  'Sales': 'Selling',
  'Handover': 'Selling'
};

// Terminology options for Project Configuration
export const terminologyOptions = [
  { value: 'plots', label: 'Plots (for Land/Plot-based projects)' },
  { value: 'units', label: 'Units (for Building/Apartment-based projects)' }
];

// Mock team members for Project Manager assignment
export const teamMemberOptions = [
  { value: 'alice-johnson', label: 'Alice Johnson' },
  { value: 'john-smith', label: 'John Smith' },
  { value: 'sarah-wilson', label: 'Sarah Wilson' },
  { value: 'mike-brown', label: 'Mike Brown' },
  { value: 'emily-davis', label: 'Emily Davis' }
];

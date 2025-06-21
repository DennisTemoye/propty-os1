
import { Lead, PipelineStage } from './types';

export const defaultStages: PipelineStage[] = [
  {
    id: 'new-lead',
    name: 'New Lead',
    color: 'bg-slate-50 text-slate-700 border-slate-200',
    order: 1,
    icon: 'user-plus'
  },
  {
    id: 'contacted',
    name: 'Contacted',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    order: 2,
    icon: 'phone'
  },
  {
    id: 'inspection',
    name: 'Inspection Scheduled',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    order: 3,
    icon: 'calendar'
  },
  {
    id: 'offer',
    name: 'Offer Sent',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    order: 4,
    icon: 'file-text'
  },
  {
    id: 'payment',
    name: 'Payment Initiated',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    order: 5,
    icon: 'credit-card'
  },
  {
    id: 'closed-won',
    name: 'Closed Won',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    order: 6,
    icon: 'check-circle',
    isClosedStage: true
  },
  {
    id: 'closed-lost',
    name: 'Closed Lost',
    color: 'bg-red-50 text-red-700 border-red-200',
    order: 7,
    icon: 'x-circle',
    isClosedStage: true
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+234-801-111-2222',
    stage: 'new-lead',
    projectInterest: 'Victoria Gardens',
    source: 'Website',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    dealValue: 25000000,
    notes: [
      {
        id: '1',
        text: 'Interested in 3-bedroom unit with garden view',
        timestamp: '2024-01-15T10:30:00Z',
        author: 'Sarah Wilson',
        type: 'note'
      }
    ],
    tags: ['hot-lead', 'first-time-buyer'],
    createdAt: '2024-01-15T10:30:00Z',
    lastActivity: '2024-01-15T10:30:00Z',
    nextFollowUp: '2024-01-17T10:00:00Z'
  },
  {
    id: '2',
    clientName: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '+234-802-222-3333',
    stage: 'contacted',
    projectInterest: 'Lagos Estate',
    source: 'Referral',
    assignedTo: 'Mike Johnson',
    priority: 'medium',
    dealValue: 35000000,
    notes: [
      {
        id: '2',
        text: 'Called and spoke with client. Very interested.',
        timestamp: '2024-01-16T14:00:00Z',
        author: 'Mike Johnson',
        type: 'call'
      }
    ],
    tags: ['referral'],
    createdAt: '2024-01-14T09:15:00Z',
    lastActivity: '2024-01-16T14:00:00Z',
    nextFollowUp: '2024-01-18T11:00:00Z'
  },
  {
    id: '3',
    clientName: 'Robert Brown',
    email: 'robert.brown@email.com',
    phone: '+234-803-333-4444',
    stage: 'inspection',
    projectInterest: 'Abuja Heights',
    source: 'Social Media',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    dealValue: 42000000,
    notes: [
      {
        id: '3',
        text: 'Inspection scheduled for tomorrow 2PM',
        timestamp: '2024-01-16T16:30:00Z',
        author: 'Sarah Wilson',
        type: 'meeting'
      }
    ],
    tags: ['inspection-ready'],
    createdAt: '2024-01-12T11:00:00Z',
    lastActivity: '2024-01-16T16:30:00Z',
    nextFollowUp: '2024-01-17T14:00:00Z'
  },
  {
    id: '4',
    clientName: 'Mary Johnson',
    email: 'mary.johnson@email.com',
    phone: '+234-804-444-5555',
    stage: 'offer',
    projectInterest: 'Victoria Gardens',
    source: 'Advertisement',
    assignedTo: 'David Brown',
    priority: 'high',
    dealValue: 28000000,
    notes: [
      {
        id: '4',
        text: 'Sent formal offer document via email',
        timestamp: '2024-01-15T09:00:00Z',
        author: 'David Brown',
        type: 'email'
      }
    ],
    tags: ['offer-sent'],
    createdAt: '2024-01-08T14:20:00Z',
    lastActivity: '2024-01-15T09:00:00Z',
    nextFollowUp: '2024-01-18T09:00:00Z'
  },
  {
    id: '5',
    clientName: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+234-805-555-6666',
    stage: 'payment',
    projectInterest: 'Lagos Estate',
    source: 'Walk-in',
    assignedTo: 'Mike Johnson',
    priority: 'high',
    dealValue: 38000000,
    notes: [
      {
        id: '5',
        text: 'Payment documents submitted to bank',
        timestamp: '2024-01-16T15:45:00Z',
        author: 'Mike Johnson',
        type: 'task'
      }
    ],
    tags: ['payment-processing'],
    createdAt: '2024-01-01T10:00:00Z',
    lastActivity: '2024-01-16T15:45:00Z',
    nextFollowUp: '2024-01-19T10:00:00Z'
  },
  {
    id: '6',
    clientName: 'Linda Davis',
    email: 'linda.davis@email.com',
    phone: '+234-806-666-7777',
    stage: 'closed-won',
    projectInterest: 'Emerald Park',
    source: 'Referral',
    assignedTo: 'Sarah Wilson',
    priority: 'medium',
    dealValue: 45000000,
    notes: [
      {
        id: '6',
        text: 'Deal closed successfully. Payment completed.',
        timestamp: '2024-01-14T12:00:00Z',
        author: 'Sarah Wilson',
        type: 'note'
      }
    ],
    tags: ['closed-won', 'repeat-customer'],
    createdAt: '2024-01-05T13:20:00Z',
    lastActivity: '2024-01-14T12:00:00Z',
    nextFollowUp: null
  }
];

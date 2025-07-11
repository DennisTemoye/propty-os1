import { Lead, PipelineStage } from './types';

export const mockStages: PipelineStage[] = [
  { 
    id: 'new_lead', 
    name: 'New Lead', 
    color: '#3b82f6', 
    order: 1, 
    icon: 'user-plus',
    description: 'Fresh leads that need initial contact'
  },
  { 
    id: 'contacted', 
    name: 'Contacted', 
    color: '#8b5cf6', 
    order: 2, 
    icon: 'phone',
    description: 'Leads that have been contacted and responded'
  },
  { 
    id: 'qualified', 
    name: 'Qualified', 
    color: '#06b6d4', 
    order: 3, 
    icon: 'check-circle',
    description: 'Qualified prospects ready for property viewing'
  },
  { 
    id: 'inspection_scheduled', 
    name: 'Inspection Scheduled', 
    color: '#eab308', 
    order: 4, 
    icon: 'calendar',
    description: 'Property inspection appointment scheduled'
  },
  { 
    id: 'offer_made', 
    name: 'Offer Made', 
    color: '#f59e0b', 
    order: 5, 
    icon: 'document-text',
    description: 'Official offer has been presented to client'
  },
  { 
    id: 'negotiation', 
    name: 'Negotiation', 
    color: '#d97706', 
    order: 6, 
    icon: 'chat-bubble-left-right',
    description: 'Actively negotiating terms and pricing'
  },
  { 
    id: 'won_deal', 
    name: 'Won Deal', 
    color: '#22c55e', 
    order: 7, 
    icon: 'trophy',
    isClosedStage: true,
    description: 'Successfully closed deal'
  },
  { 
    id: 'lost_deal', 
    name: 'Lost Deal', 
    color: '#ef4444', 
    order: 8, 
    icon: 'x-circle',
    isClosedStage: true,
    description: 'Deal lost or client not interested'
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'Aisha Bello',
    email: 'aisha.bello@email.com',
    phone: '+234-813-123-4567',
    stage: 'new_lead',
    projectInterest: 'Victoria Gardens',
    source: 'Website',
    assignedTo: 'Sarah Wilson',
    priority: 'high',
    dealValue: 25000000,
    notes: [
      {
        id: '1',
        text: 'Initial inquiry about 3-bedroom apartment',
        timestamp: '2024-01-15T10:00:00Z',
        author: 'Sarah Wilson',
        type: 'note'
      }
    ],
    tags: ['first_time_buyer', 'mortgage_needed'],
    createdAt: '2024-01-15T09:00:00Z',
    lastActivity: '2024-01-15T10:00:00Z',
    nextFollowUp: '2024-01-22T10:00:00Z',
    status: 'active',
    location: 'Lagos',
    budget: { min: 20000000, max: 30000000 },
    preferences: ['3_bedroom', 'parking', 'swimming_pool']
  },
  {
    id: '2',
    clientName: 'Ibrahim Musa',
    email: 'ibrahim.musa@email.com',
    phone: '+234-802-234-5678',
    stage: 'contacted',
    projectInterest: 'Harmony Gardens',
    source: 'Referral',
    assignedTo: 'Mike Johnson',
    priority: 'medium',
    dealValue: 30000000,
    notes: [
      {
        id: '2',
        text: 'Interested in land purchase for development',
        timestamp: '2024-01-10T14:30:00Z',
        author: 'Mike Johnson',
        type: 'call'
      }
    ],
    tags: ['investor', 'land_purchase'],
    createdAt: '2024-01-10T09:00:00Z',
    lastActivity: '2024-01-18T14:30:00Z',
    nextFollowUp: '2024-01-25T14:00:00Z',
    status: 'active',
    location: 'Abuja',
    budget: { min: 25000000, max: 35000000 },
    preferences: ['commercial_land', 'main_road_access']
  },
  {
    id: '3',
    clientName: 'Fatima Sanni',
    email: 'fatima.sanni@email.com',
    phone: '+234-809-345-6789',
    stage: 'qualified',
    projectInterest: 'Emerald Heights',
    source: 'Social Media',
    assignedTo: 'David Brown',
    priority: 'high',
    dealValue: 18000000,
    notes: [
      {
        id: '3',
        text: 'Qualified buyer, ready to make purchase decision',
        timestamp: '2024-01-12T11:00:00Z',
        author: 'David Brown',
        type: 'meeting'
      }
    ],
    tags: ['ready_buyer', 'cash_payment'],
    createdAt: '2024-01-12T09:00:00Z',
    lastActivity: '2024-01-20T11:00:00Z',
    nextFollowUp: '2024-01-24T10:00:00Z',
    status: 'active',
    location: 'Port Harcourt',
    budget: { min: 15000000, max: 20000000 },
    preferences: ['2_bedroom', 'security', 'generator']
  },
  {
    id: '4',
    clientName: 'Chidi Okafor',
    email: 'chidi.okafor@email.com',
    phone: '+234-801-456-7890',
    stage: 'inspection_scheduled',
    projectInterest: 'Royal Gardens',
    source: 'Walk-in',
    assignedTo: 'Lisa Chen',
    priority: 'medium',
    dealValue: 35000000,
    notes: [
      {
        id: '4',
        text: 'Property viewing scheduled for next week',
        timestamp: '2024-01-14T16:00:00Z',
        author: 'Lisa Chen',
        type: 'call'
      }
    ],
    tags: ['scheduled_viewing', 'premium_unit'],
    createdAt: '2024-01-14T09:00:00Z',
    lastActivity: '2024-01-19T16:00:00Z',
    nextFollowUp: '2024-01-26T14:00:00Z',
    status: 'active',
    location: 'Lagos',
    budget: { min: 30000000, max: 40000000 },
    preferences: ['4_bedroom', 'penthouse', 'ocean_view']
  },
  {
    id: '5',
    clientName: 'Amina Hassan',
    email: 'amina.hassan@email.com',
    phone: '+234-807-567-8901',
    stage: 'offer_made',
    projectInterest: 'Sunset Villas',
    source: 'Advertisement',
    assignedTo: 'Tom Wilson',
    priority: 'high',
    dealValue: 42000000,
    notes: [
      {
        id: '5',
        text: 'Formal offer presented, awaiting response',
        timestamp: '2024-01-16T13:30:00Z',
        author: 'Tom Wilson',
        type: 'email'
      }
    ],
    tags: ['offer_pending', 'luxury_unit'],
    createdAt: '2024-01-16T09:00:00Z',
    lastActivity: '2024-01-21T13:30:00Z',
    nextFollowUp: '2024-01-28T10:00:00Z',
    status: 'active',
    location: 'Abuja',
    budget: { min: 40000000, max: 50000000 },
    preferences: ['villa', 'private_garden', 'staff_quarters']
  },
  {
    id: '6',
    clientName: 'Kemi Adebayo',
    email: 'kemi.adebayo@email.com',
    phone: '+234-803-678-9012',
    stage: 'won_deal',
    projectInterest: 'Green Park Estate',
    source: 'Referral',
    assignedTo: 'Sarah Wilson',
    priority: 'low',
    dealValue: 28000000,
    notes: [
      {
        id: '6',
        text: 'Deal successfully closed, payment completed',
        timestamp: '2024-01-08T15:00:00Z',
        author: 'Sarah Wilson',
        type: 'note'
      }
    ],
    tags: ['closed_won', 'referral_bonus'],
    createdAt: '2024-01-08T09:00:00Z',
    lastActivity: '2024-01-22T15:00:00Z',
    nextFollowUp: null,
    status: 'closed_won',
    location: 'Lagos',
    budget: { min: 25000000, max: 30000000 },
    preferences: ['3_bedroom', 'family_friendly']
  }
];
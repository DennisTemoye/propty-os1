export interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  stage: string;
  projectInterest?: string;
  source: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dealValue: number;
  notes: LeadNote[];
  tags: string[];
  createdAt: string;
  lastActivity: string;
  nextFollowUp: string | null;
  status: 'active' | 'closed_won' | 'closed_lost';
  location?: string;
  budget?: {
    min: number;
    max: number;
  };
  preferences?: string[];
}

export interface LeadNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
  type: 'note' | 'call' | 'email' | 'meeting' | 'task' | 'sms' | 'whatsapp';
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  icon: string;
  isClosedStage?: boolean;
  description?: string;
}

export interface PipelineSettings {
  stages: PipelineStage[];
  defaultAssignee?: string;
  autoFollowUpDays?: number;
  requiredFields?: string[];
}

export interface PipelineMetrics {
  totalLeads: number;
  conversionRate: number;
  averageDealSize: number;
  totalValue: number;
  wonDeals: number;
  lostDeals: number;
  activeLeads: number;
}

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
}

export interface LeadNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
  type: 'note' | 'call' | 'email' | 'meeting' | 'task';
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  icon: string;
  isClosedStage?: boolean;
}

export interface PipelineSettings {
  stages: PipelineStage[];
  defaultAssignee?: string;
  autoFollowUpDays?: number;
  requiredFields?: string[];
}

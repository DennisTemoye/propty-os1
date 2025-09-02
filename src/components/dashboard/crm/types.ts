import { Lead } from "@/types";

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  probability: number;
  isActive: boolean;
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
  totalPipelineValue: number;
  stageBreakdown: Array<{
    stage: string;
    count: number;
    value: number;
  }>;
}

import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import {
  Lead,
  LeadCreate,
  LeadUpdate,
  PipelineStage,
  PipelineMetrics,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export class CRMService {
  // ===== Lead Management =====

  /**
   * Fetch leads with optional filters
   */
  static async getLeads(filters?: {
    stage?: string;
    assignedTo?: string;
    priority?: string;
    source?: string;
    projectInterest?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Lead>> {
    try {
      const response = await apiService.get(API_ENDPOINTS.CRM.LEADS.BASE, {
        params: filters,
      });
      console.log("response leads", response.data);
      return response.data; // Extract from nested structure
    } catch (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
  }

  /**
   * Create a new lead
   */
  static async createLead(leadData: LeadCreate): Promise<Lead> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.CRM.LEADS.BASE,
        leadData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create lead: ${error}`);
    }
  }

  /**
   * Update an existing lead
   */
  static async updateLead(leadId: string, updates: LeadUpdate): Promise<Lead> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.CRM.LEADS.BY_ID(leadId),
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update lead: ${error}`);
    }
  }

  /**
   * Delete a lead
   */
  static async deleteLead(leadId: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.CRM.LEADS.BY_ID(leadId));
    } catch (error) {
      throw new Error(`Failed to delete lead: ${error}`);
    }
  }

  /**
   * Convert a lead to a client
   */
  static async convertLeadToClient(
    leadId: string,
    clientData: {
      fullName: string;
      email: string;
      phone: string;
      address: string;
    },
    allocationData: {
      projectId: string;
      unitId: string;
      amount: number;
    }
  ): Promise<any> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.CRM.LEADS.CONVERT(leadId),
        {
          clientData,
          allocationData,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to convert lead: ${error}`);
    }
  }

  // ===== Pipeline Management =====

  /**
   * Fetch all pipeline stages
   */
  static async getPipelineStages(): Promise<PipelineStage[]> {
    try {
      const response = await apiService.get(API_ENDPOINTS.CRM.PIPELINE.STAGES);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch pipeline stages: ${error}`);
    }
  }

  /**
   * Update a pipeline stage
   */
  static async updatePipelineStage(
    stageId: string,
    updates: Partial<PipelineStage>
  ): Promise<PipelineStage> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.CRM.PIPELINE.STAGE_BY_ID(stageId),
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update pipeline stage: ${error}`);
    }
  }

  /**
   * Reorder pipeline stages
   */
  static async reorderPipelineStages(
    stages: Array<{ id: string; order: number }>
  ): Promise<void> {
    try {
      await apiService.put(API_ENDPOINTS.CRM.PIPELINE.REORDER, { stages });
    } catch (error) {
      throw new Error(`Failed to reorder pipeline stages: ${error}`);
    }
  }

  /**
   * Get pipeline metrics
   */
  static async getPipelineMetrics(
    dateRange?: string
  ): Promise<PipelineMetrics> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.CRM.PIPELINE.METRICS,
        {
          params: { dateRange },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch pipeline metrics: ${error}`);
    }
  }

  // ===== Lead Analytics =====

  /**
   * Get lead conversion analytics
   */
  static async getLeadConversionAnalytics(dateRange?: string): Promise<{
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    averageTimeToConvert: number;
    conversionByStage: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
  }> {
    try {
      const metrics = await this.getPipelineMetrics(dateRange);
      const stages = await this.getPipelineStages();

      // Calculate conversion analytics from pipeline data
      const totalLeads = metrics.totalLeads;
      const convertedLeads =
        metrics.stageBreakdown.find((stage) => stage.stage === "won_deal")
          ?.count || 0;
      const conversionRate =
        totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

      return {
        totalLeads,
        convertedLeads,
        conversionRate,
        averageTimeToConvert: 0, // This would need additional API endpoint
        conversionByStage: metrics.stageBreakdown.map((stage) => ({
          stage: stage.stage,
          count: stage.count,
          percentage: totalLeads > 0 ? (stage.count / totalLeads) * 100 : 0,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch lead conversion analytics: ${error}`);
    }
  }

  /**
   * Get lead performance by marketer
   */
  static async getLeadPerformanceByMarketer(dateRange?: string): Promise<
    Array<{
      marketer: string;
      totalLeads: number;
      convertedLeads: number;
      conversionRate: number;
      totalValue: number;
      averageDealSize: number;
    }>
  > {
    try {
      const leads = await this.getLeads({ limit: 1000 }); // Get all leads for analysis

      // Group leads by marketer and calculate performance metrics
      const marketerPerformance = new Map<
        string,
        {
          marketer: string;
          totalLeads: number;
          convertedLeads: number;
          totalValue: number;
          deals: number[];
        }
      >();

      leads.data.forEach((lead) => {
        const assigned = lead.assignedTo as any;
        const key =
          typeof assigned === "string"
            ? assigned
            : assigned?._id ?? "unassigned";
        const label =
          typeof assigned === "string" ? assigned : assigned?.name ?? key;
        const current = marketerPerformance.get(key) || {
          marketer: label,
          totalLeads: 0,
          convertedLeads: 0,
          totalValue: 0,
          deals: [],
        };

        current.totalLeads++;
        if (lead.status === "closed_won") {
          current.convertedLeads++;
          current.totalValue += lead.dealValue;
          current.deals.push(lead.dealValue);
        }

        marketerPerformance.set(key, current);
      });

      return Array.from(marketerPerformance.values()).map((perf) => ({
        marketer: perf.marketer,
        totalLeads: perf.totalLeads,
        convertedLeads: perf.convertedLeads,
        conversionRate:
          perf.totalLeads > 0
            ? (perf.convertedLeads / perf.totalLeads) * 100
            : 0,
        totalValue: perf.totalValue,
        averageDealSize:
          perf.deals.length > 0 ? perf.totalValue / perf.deals.length : 0,
      }));
    } catch (error) {
      throw new Error(`Failed to fetch lead performance by marketer: ${error}`);
    }
  }
}

export default CRMService;

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Lead,
  LeadCreate,
  LeadUpdate,
  PipelineStage,
  PipelineMetrics,
  PaginatedResponse,
} from "@/types";
import CRMService from "@/services/crmService";

export interface UseCRMReturn {
  // State
  loading: boolean;
  error: string | null;

  // Data
  leads: Lead[];
  stages: PipelineStage[];
  metrics: PipelineMetrics | null;
  leadConversionAnalytics: {
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    averageTimeToConvert: number;
    conversionByStage: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
  } | null;
  marketerPerformance: Array<{
    marketer: string;
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    totalValue: number;
    averageDealSize: number;
  }> | null;

  // Filters
  filters: {
    stage?: string;
    assignedTo?: string;
    priority?: string;
    source?: string;
    projectInterest?: string;
  };
  setFilters: (filters: Partial<UseCRMReturn["filters"]>) => void;

  // Actions
  fetchLeads: (filters?: any) => Promise<void>;
  createLead: (leadData: LeadCreate) => Promise<Lead>;
  updateLead: (leadId: string, updates: LeadUpdate) => Promise<Lead>;
  deleteLead: (leadId: string) => Promise<void>;
  convertLeadToClient: (
    leadId: string,
    clientData: any,
    allocationData: any
  ) => Promise<any>;

  // Pipeline Management
  fetchPipelineStages: () => Promise<void>;
  updatePipelineStage: (
    stageId: string,
    updates: Partial<PipelineStage>
  ) => Promise<PipelineStage>;
  reorderPipelineStages: (
    newOrder: Array<{ id: string; order: number }>
  ) => Promise<void>;

  // Analytics
  fetchPipelineMetrics: (dateRange?: string) => Promise<void>;
  fetchLeadConversionAnalytics: (dateRange?: string) => Promise<void>;
  fetchMarketerPerformance: (dateRange?: string) => Promise<void>;

  // Utilities
  clearError: () => void;
  resetFilters: () => void;
}

export function useCRM(): UseCRMReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics | null>(null);
  const [leadConversionAnalytics, setLeadConversionAnalytics] =
    useState<UseCRMReturn["leadConversionAnalytics"]>(null);
  const [marketerPerformance, setMarketerPerformance] =
    useState<UseCRMReturn["marketerPerformance"]>(null);

  const [filters, setFilters] = useState<UseCRMReturn["filters"]>({});

  // ===== Lead Management =====

  const fetchLeads = useCallback(
    async (additionalFilters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const allFilters = { ...filters, ...additionalFilters };
        const response = await CRMService.getLeads();
        console.log("response leads", response.data);
        setLeads(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch leads";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const createLead = useCallback(
    async (leadData: LeadCreate): Promise<Lead> => {
      try {
        setLoading(true);
        const newLead = await CRMService.createLead(leadData);
        setLeads((prev) => [newLead, ...prev]);
        return newLead;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create lead";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateLead = useCallback(
    async (leadId: string, updates: LeadUpdate): Promise<Lead> => {
      try {
        setLoading(true);
        const updatedLead = await CRMService.updateLead(leadId, updates);
        setLeads((prev) =>
          prev.map((lead) => (lead._id === leadId ? updatedLead : lead))
        );
        return updatedLead;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update lead";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteLead = useCallback(async (leadId: string): Promise<void> => {
    try {
      setLoading(true);
      await CRMService.deleteLead(leadId);
      setLeads((prev) => prev.filter((lead) => lead._id !== leadId));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete lead";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const convertLeadToClient = useCallback(
    async (
      leadId: string,
      clientData: any,
      allocationData: any
    ): Promise<any> => {
      try {
        setLoading(true);
        setError(null);

        const result = await CRMService.convertLeadToClient(
          leadId,
          clientData,
          allocationData
        );

        // Remove the lead from the list since it's now converted
        setLeads((prev) => prev.filter((lead) => lead._id !== leadId));

        toast.success("Lead converted to client successfully");
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to convert lead";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Pipeline Management =====

  const fetchPipelineStages = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const pipelineStages = await CRMService.getPipelineStages();
      setStages(pipelineStages);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch pipeline stages";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePipelineStage = useCallback(
    async (
      stageId: string,
      updates: Partial<PipelineStage>
    ): Promise<PipelineStage> => {
      try {
        setLoading(true);
        setError(null);

        const updatedStage = await CRMService.updatePipelineStage(
          stageId,
          updates
        );
        setStages((prev) =>
          prev.map((stage) => (stage.id === stageId ? updatedStage : stage))
        );
        toast.success("Pipeline stage updated successfully");
        return updatedStage;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to update pipeline stage";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reorderPipelineStages = useCallback(
    async (newOrder: Array<{ id: string; order: number }>): Promise<void> => {
      try {
        setLoading(true);
        await CRMService.reorderPipelineStages(newOrder);
        // Refresh stages to get updated order
        await fetchPipelineStages();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to reorder stages";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchPipelineStages]
  );

  // ===== Analytics =====

  const fetchPipelineMetrics = useCallback(
    async (dateRange?: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const pipelineMetrics = await CRMService.getPipelineMetrics(dateRange);
        setMetrics(pipelineMetrics);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch pipeline metrics";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchLeadConversionAnalytics = useCallback(
    async (dateRange?: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const analytics = await CRMService.getLeadConversionAnalytics(
          dateRange
        );
        setLeadConversionAnalytics(analytics);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch lead conversion analytics";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchMarketerPerformance = useCallback(
    async (dateRange?: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const performance = await CRMService.getLeadPerformanceByMarketer(
          dateRange
        );
        setMarketerPerformance(performance);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch marketer performance";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Utilities =====

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // ===== Effects =====

  useEffect(() => {
    fetchLeads();
    fetchPipelineStages();
    fetchPipelineMetrics();
  }, [fetchLeads, fetchPipelineStages, fetchPipelineMetrics]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchLeads();
    }
  }, [filters, fetchLeads]);

  return {
    // State
    loading,
    error,

    // Data
    leads,
    stages,
    metrics,
    leadConversionAnalytics,
    marketerPerformance,

    // Filters
    filters,
    setFilters,

    // Actions
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    convertLeadToClient,

    // Pipeline Management
    fetchPipelineStages,
    updatePipelineStage,
    reorderPipelineStages,

    // Analytics
    fetchPipelineMetrics,
    fetchLeadConversionAnalytics,
    fetchMarketerPerformance,

    // Utilities
    clearError,
    resetFilters,
  };
}

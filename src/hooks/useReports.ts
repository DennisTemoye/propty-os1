import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  ReportService,
  ReportFilters,
  SalesReportData,
  CommissionReportData,
  FinancialReportData,
  ProjectReportData,
  ClientReportData,
} from "@/services/reportService";

export interface UseReportsReturn {
  // State
  loading: boolean;
  error: string | null;

  // Data
  salesData: SalesReportData[];
  commissionData: CommissionReportData[];
  financialData: FinancialReportData | null;
  projectData: ProjectReportData[];
  clientData: ClientReportData[];

  // Filters
  filters: ReportFilters;
  setFilters: (filters: ReportFilters) => void;

  // Actions
  generateSalesReport: () => Promise<void>;
  generateCommissionReport: () => Promise<void>;
  generateFinancialReport: () => Promise<void>;
  generateProjectReport: () => Promise<void>;
  generateClientReport: () => Promise<void>;
  exportReport: (
    type: string,
    format: "pdf" | "excel" | "csv"
  ) => Promise<void>;
  exportReportNew: (
    type: string,
    format: "pdf" | "excel" | "csv"
  ) => Promise<void>;

  // Templates
  templates: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    filters: ReportFilters;
    isDefault: boolean;
  }>;
  loadTemplates: () => Promise<void>;
  saveTemplate: (template: {
    name: string;
    description: string;
    type: string;
    filters: ReportFilters;
  }) => Promise<boolean>;
  deleteTemplate: (templateId: string) => Promise<boolean>;

  // Insights
  insights: {
    trends: Array<{
      period: string;
      value: number;
      change: number;
      trend: "up" | "down" | "stable";
    }>;
    topPerformers: Array<{ name: string; value: number; rank: number }>;
    alerts: Array<{
      type: "warning" | "info" | "success";
      message: string;
      value?: number;
    }>;
  };
  loadInsights: () => Promise<void>;

  // Utilities
  clearError: () => void;
  resetFilters: () => void;
}

export function useReports(
  initialFilters: ReportFilters = {}
): UseReportsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [salesData, setSalesData] = useState<SalesReportData[]>([]);
  const [commissionData, setCommissionData] = useState<CommissionReportData[]>(
    []
  );
  const [financialData, setFinancialData] =
    useState<FinancialReportData | null>(null);
  const [projectData, setProjectData] = useState<ProjectReportData[]>([]);
  const [clientData, setClientData] = useState<ClientReportData[]>([]);

  const [filters, setFilters] = useState<ReportFilters>({
    dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
    includeRevoked: true,
    includePending: true,
    ...initialFilters,
  });

  const [templates, setTemplates] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      type: string;
      filters: ReportFilters;
      isDefault: boolean;
    }>
  >([]);

  const [insights, setInsights] = useState<{
    trends: Array<{
      period: string;
      value: number;
      change: number;
      trend: "up" | "down" | "stable";
    }>;
    topPerformers: Array<{ name: string; value: number; rank: number }>;
    alerts: Array<{
      type: "warning" | "info" | "success";
      message: string;
      value?: number;
    }>;
  }>({
    trends: [],
    topPerformers: [],
    alerts: [],
  });

  const clearError = useCallback(() => setError(null), []);

  const resetFilters = useCallback(() => {
    setFilters({
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      dateTo: new Date().toISOString().split("T")[0],
      includeRevoked: true,
      includePending: true,
    });
  }, []);

  const generateSalesReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ReportService.generateSalesReport(filters);
      setSalesData(result.data);

      toast.success("Sales report generated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate sales report";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const generateCommissionReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ReportService.generateCommissionReport(filters);
      setCommissionData(result.data);

      toast.success("Commission report generated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate commission report";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const generateFinancialReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ReportService.generateFinancialReport(filters);
      setFinancialData(result.data);

      toast.success("Financial report generated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate financial report";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const generateProjectReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ReportService.generateProjectReport(filters);
      setProjectData(result.data);

      toast.success("Project report generated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate project report";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const generateClientReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ReportService.generateClientReport(filters);
      setClientData(result.data);

      toast.success("Client report generated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate client report";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const exportReport = useCallback(
    async (type: string, format: "pdf" | "excel" | "csv") => {
      try {
        setLoading(true);
        setError(null);

        let data: any;
        switch (type) {
          case "sales":
            data = salesData;
            break;
          case "commission":
            data = commissionData;
            break;
          case "financial":
            data = financialData;
            break;
          case "project":
            data = projectData;
            break;
          case "client":
            data = clientData;
            break;
          default:
            throw new Error(`Unknown report type: ${type}`);
        }

        if (!data || (Array.isArray(data) && data.length === 0)) {
          toast.error(
            "No data available to export. Please generate a report first."
          );
          return;
        }

        await ReportService.exportReport(type, data, format);
        toast.success(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } report exported successfully`
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to export report";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [salesData, commissionData, financialData, projectData, clientData]
  );

  const exportReportNew = useCallback(
    async (type: string, format: "pdf" | "excel" | "csv") => {
      try {
        setLoading(true);
        setError(null);

        if (!filters) {
          toast.error(
            "No filters available for export. Please set report filters first."
          );
          return;
        }

        const result = await ReportService.exportReportNew(
          type,
          format,
          filters
        );

        // Create a download link for the exported file
        const link = document.createElement("a");
        link.href = result.downloadUrl;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } report exported successfully`
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to export report";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const loadTemplates = useCallback(async () => {
    try {
      const result = await ReportService.getReportTemplates();
      setTemplates(result);
    } catch (err) {
      console.error("Failed to load report templates:", err);
    }
  }, []);

  const deleteTemplate = useCallback(
    async (templateId: string) => {
      try {
        const success = await ReportService.deleteReportTemplate(templateId);
        if (success) {
          toast.success("Template deleted successfully");
          await loadTemplates(); // Refresh templates
        } else {
          toast.error("Failed to delete template");
        }
        return success;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete template";
        toast.error(errorMessage);
        return false;
      }
    },
    [loadTemplates]
  );

  const saveTemplate = useCallback(
    async (template: {
      name: string;
      description: string;
      type: string;
      filters: ReportFilters;
    }) => {
      try {
        const success = await ReportService.saveReportTemplate(template);
        if (success) {
          toast.success("Template saved successfully");
          await loadTemplates(); // Refresh templates
        } else {
          toast.error("Failed to save template");
        }
        return success;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to save template";
        toast.error(errorMessage);
        return false;
      }
    },
    [loadTemplates]
  );

  const loadInsights = useCallback(async () => {
    try {
      const result = await ReportService.getReportInsights(filters);
      setInsights(result);
    } catch (err) {
      console.error("Failed to load insights:", err);
    }
  }, [filters]);

  // Load templates and insights on mount
  useEffect(() => {
    loadTemplates();
    loadInsights();
  }, [loadTemplates, loadInsights]);

  return {
    // State
    loading,
    error,

    // Data
    salesData,
    commissionData,
    financialData,
    projectData,
    clientData,

    // Filters
    filters,
    setFilters,

    // Actions
    generateSalesReport,
    generateCommissionReport,
    generateFinancialReport,
    generateProjectReport,
    generateClientReport,
    exportReport,
    exportReportNew,

    // Templates
    templates,
    loadTemplates,
    saveTemplate,
    deleteTemplate,

    // Insights
    insights,
    loadInsights,

    // Utilities
    clearError,
    resetFilters,
  };
}

import { apiService } from "./api";
import { EnhancedDownloadService } from "./enhancedDownloadService";
import { API_ENDPOINTS } from "@/constants/api";

export interface ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  projectId?: string;
  marketerId?: string;
  status?: string;
  clientId?: string;
  reportType?: string;
  includeRevoked?: boolean;
  includePending?: boolean;
}

export interface SalesReportData {
  id: string;
  clientName: string;
  project: string;
  unit: string;
  amount: number;
  status: string;
  date: string;
  marketer: string;
  commission: number;
  commissionStatus: string;
  paymentStatus: string;
  revokedDate?: string;
  revocationReason?: string;
  refundAmount?: number;
}

export interface CommissionReportData {
  id: string;
  marketer: string;
  marketerId: string;
  totalSales: number;
  totalVolume: number;
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
  period: string;
  performance: number;
  averageCommission: number;
}

export interface FinancialReportData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  outstandingAmount: number;
  commissionPaid: number;
  commissionPending: number;
  refundsIssued: number;
  period: string;
  revenueByProject: Array<{
    project: string;
    revenue: number;
    percentage: number;
  }>;
  expensesByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface ProjectReportData {
  id: string;
  name: string;
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  reservedUnits: number;
  totalRevenue: number;
  completionPercentage: number;
  status: string;
  startDate: string;
  expectedCompletion: string;
}

export interface ClientReportData {
  id: string;
  name: string;
  totalInvestments: number;
  activeInvestments: number;
  completedInvestments: number;
  totalSpent: number;
  lastActivity: string;
  status: string;
  preferredProjects: string[];
}

export interface ReportSummary {
  totalRecords: number;
  totalValue: number;
  averageValue: number;
  topPerformers: string[];
  trends: Array<{
    period: string;
    value: number;
    change: number;
  }>;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  filters: ReportFilters;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ReportExportRequest {
  reportType: string;
  format: "pdf" | "excel" | "csv";
  filters: ReportFilters;
  filename?: string;
}

export interface ReportExportResponse {
  downloadUrl: string;
  filename: string;
}

export class ReportService {
  /**
   * Generate sales report with filters
   */
  static async generateSalesReport(filters: ReportFilters = {}): Promise<{
    data: SalesReportData[];
    summary: ReportSummary;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);
      if (filters.marketerId)
        queryParams.append("marketerId", filters.marketerId);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.includeRevoked) queryParams.append("includeRevoked", "true");
      if (filters.includePending) queryParams.append("includePending", "true");

      const endpoint = `${
        API_ENDPOINTS.REPORTS.SALES.GENERATE
      }?${queryParams.toString()}`;
      const response = await apiService.get<{
        data: SalesReportData[];
        summary: ReportSummary;
      }>(endpoint);

      if (!response.success) {
        throw new Error(response.message || "Failed to generate sales report");
      }

      return response.data;
    } catch (error) {
      console.error("Error generating sales report:", error);
      throw new Error("Failed to generate sales report. Please try again.");
    }
  }

  /**
   * Generate commission report for marketers
   */
  static async generateCommissionReport(filters: ReportFilters = {}): Promise<{
    data: CommissionReportData[];
    summary: ReportSummary;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
      if (filters.marketerId)
        queryParams.append("marketerId", filters.marketerId);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);

      const endpoint = `${
        API_ENDPOINTS.REPORTS.COMMISSION.GENERATE
      }?${queryParams.toString()}`;
      const response = await apiService.get<{
        data: CommissionReportData[];
        summary: ReportSummary;
      }>(endpoint);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to generate commission report"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error generating commission report:", error);
      throw new Error(
        "Failed to generate commission report. Please try again."
      );
    }
  }

  /**
   * Generate financial summary report
   */
  static async generateFinancialReport(filters: ReportFilters = {}): Promise<{
    data: FinancialReportData;
    summary: ReportSummary;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);

      const endpoint = `${
        API_ENDPOINTS.REPORTS.FINANCIAL.GENERATE
      }?${queryParams.toString()}`;
      const response = await apiService.get<{
        data: FinancialReportData;
        summary: ReportSummary;
      }>(endpoint);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to generate financial report"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error generating financial report:", error);
      throw new Error("Failed to generate financial report. Please try again.");
    }
  }

  /**
   * Generate project status report
   */
  static async generateProjectReport(filters: ReportFilters = {}): Promise<{
    data: ProjectReportData[];
    summary: ReportSummary;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.projectId) queryParams.append("projectId", filters.projectId);
      if (filters.status) queryParams.append("status", filters.status);

      const endpoint = `${
        API_ENDPOINTS.REPORTS.PROJECTS
      }?${queryParams.toString()}`;
      const response = await apiService.get<{
        data: ProjectReportData[];
        summary: ReportSummary;
      }>(endpoint);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to generate project report"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error generating project report:", error);
      throw new Error("Failed to generate project report. Please try again.");
    }
  }

  /**
   * Generate client investment report
   */
  static async generateClientReport(filters: ReportFilters = {}): Promise<{
    data: ClientReportData[];
    summary: ReportSummary;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
      if (filters.clientId) queryParams.append("clientId", filters.clientId);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);

      const endpoint = `${
        API_ENDPOINTS.REPORTS.CLIENTS
      }?${queryParams.toString()}`;
      const response = await apiService.get<{
        data: ClientReportData[];
        summary: ReportSummary;
      }>(endpoint);

      if (!response.success) {
        throw new Error(response.message || "Failed to generate client report");
      }

      return response.data;
    } catch (error) {
      console.error("Error generating client report:", error);
      throw new Error("Failed to generate client report. Please try again.");
    }
  }

  /**
   * Export report to different formats
   */
  static async exportReport(
    reportType: string,
    data: any,
    format: "pdf" | "excel" | "csv",
    filename?: string
  ): Promise<void> {
    try {
      switch (format) {
        case "pdf":
          if (reportType === "sales") {
            await EnhancedDownloadService.downloadSalesReport(data);
          } else if (reportType === "commission") {
            await EnhancedDownloadService.downloadMarketerReport(
              data.marketer,
              data.commissions
            );
          } else if (reportType === "financial") {
            await EnhancedDownloadService.downloadAccountingReport(data);
          } else if (reportType === "project") {
            await EnhancedDownloadService.downloadProjectReport(
              data,
              "Project Status"
            );
          } else {
            await EnhancedDownloadService.downloadCRMReport(data);
          }
          break;

        case "excel":
          const { generateExcel } = await import("@/utils/downloadUtils");
          const excelFilename =
            filename ||
            `${reportType}_Report_${new Date().toISOString().split("T")[0]}`;
          generateExcel(
            data,
            excelFilename,
            `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`
          );
          break;

        case "csv":
          const { generateCSV } = await import("@/utils/downloadUtils");
          const csvFilename =
            filename ||
            `${reportType}_Report_${new Date().toISOString().split("T")[0]}`;
          generateCSV(data, csvFilename);
          break;

        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } catch (error) {
      console.error(
        `Error exporting ${reportType} report to ${format}:`,
        error
      );
      throw new Error(
        `Failed to export report to ${format}. Please try again.`
      );
    }
  }

  /**
   * Export report to different formats using the new API endpoint
   */
  static async exportReportNew(
    reportType: string,
    format: "pdf" | "excel" | "csv",
    filters: ReportFilters,
    filename?: string
  ): Promise<{ downloadUrl: string; filename: string }> {
    try {
      const exportData = {
        reportType,
        format,
        filters,
        filename:
          filename ||
          `${reportType}_report_${new Date().toISOString().split("T")[0]}`,
      };

      const response = await apiService.post<{
        downloadUrl: string;
        filename: string;
      }>(API_ENDPOINTS.REPORTS.EXPORT, exportData);

      if (!response.success) {
        throw new Error(response.message || "Failed to export report");
      }

      return response.data;
    } catch (error) {
      console.error(
        `Error exporting ${reportType} report to ${format}:`,
        error
      );
      throw new Error(
        `Failed to export report to ${format}. Please try again.`
      );
    }
  }

  /**
   * Download exported report file
   */
  static async downloadExportedReport(exportId: string): Promise<Blob> {
    try {
      const response = await apiService.get<Blob>(
        API_ENDPOINTS.REPORTS.DOWNLOAD(exportId),
        { responseType: "blob" }
      );

      if (!response.success) {
        throw new Error(
          response.message || "Failed to download exported report"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error downloading exported report:", error);
      throw new Error("Failed to download exported report. Please try again.");
    }
  }

  /**
   * Get available report templates
   */
  static async getReportTemplates(): Promise<
    Array<{
      id: string;
      name: string;
      description: string;
      type: string;
      filters: ReportFilters;
      isDefault: boolean;
    }>
  > {
    try {
      const response = await apiService.get<
        Array<{
          id: string;
          name: string;
          description: string;
          type: string;
          filters: ReportFilters;
          isDefault: boolean;
        }>
      >(API_ENDPOINTS.REPORTS.TEMPLATES.BASE);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch report templates");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching report templates:", error);
      return [];
    }
  }

  /**
   * Save report template
   */
  static async saveReportTemplate(template: {
    name: string;
    description: string;
    type: string;
    filters: ReportFilters;
  }): Promise<boolean> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.REPORTS.TEMPLATES.BASE,
        template
      );
      return response.success;
    } catch (error) {
      console.error("Error saving report template:", error);
      return false;
    }
  }

  /**
   * Delete report template
   */
  static async deleteReportTemplate(templateId: string): Promise<boolean> {
    try {
      const response = await apiService.delete(
        API_ENDPOINTS.REPORTS.TEMPLATES.BY_ID(templateId)
      );
      return response.success;
    } catch (error) {
      console.error("Error deleting report template:", error);
      return false;
    }
  }

  /**
   * Get report analytics and insights
   */
  static async getReportInsights(filters: ReportFilters = {}): Promise<{
    trends: Array<{
      period: string;
      value: number;
      change: number;
      trend: "up" | "down" | "stable";
    }>;
    topPerformers: Array<{
      name: string;
      value: number;
      rank: number;
    }>;
    alerts: Array<{
      type: "warning" | "info" | "success";
      message: string;
      value?: number;
    }>;
  }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
      if (filters.projectId) queryParams.append("projectId", filters.projectId);

      const endpoint = `${
        API_ENDPOINTS.REPORTS.INSIGHTS
      }?${queryParams.toString()}`;
      const response = await apiService.get(endpoint);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch report insights");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching report insights:", error);
      return {
        trends: [],
        topPerformers: [],
        alerts: [],
      };
    }
  }
}

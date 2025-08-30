// Activity Logs Service for Teams and Roles Management

import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ActivityLog,
  ActivityLogWithMetadata,
  ActivityLogFilter,
  ActivityLogSearchResult,
  ActivityLogSummary,
  RiskIndicator,
  ActivityLogExportData,
  ActivityLogAnalytics,
  ActivityLogAlert,
  RetentionPolicy,
  ActivityLogSearchSuggestion,
  ActivityLogBatchOperation,
  ActivityLogReviewStatus,
} from "@/types/activityLogs";

export class ActivityLogsService {
  /**
   * Get activity logs for a company
   */
  static async getActivityLogs(
    companyId: string,
    filter?: ActivityLogFilter
  ): Promise<ActivityLog[]> {
    try {
      const queryParams = new URLSearchParams();

      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) => queryParams.append(key, v));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}?${queryParams.toString()}`;
      const response = await apiService.get<ActivityLog[]>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch activity logs");
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      throw error;
    }
  }

  /**
   * Get activity log summary for a company
   */
  static async getActivityLogSummary(
    companyId: string
  ): Promise<ActivityLogSummary> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITY_LOGS.SUMMARY(companyId);
      const response = await apiService.get<ActivityLogSummary>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to fetch activity log summary"
      );
    } catch (error) {
      console.error("Error fetching activity log summary:", error);
      throw error;
    }
  }

  /**
   * Get activity log analytics for a company
   */
  static async getActivityLogAnalytics(
    companyId: string,
    startDate: string,
    endDate: string
  ): Promise<ActivityLogAnalytics> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("startDate", startDate);
      queryParams.append("endDate", endDate);

      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.ANALYTICS(
        companyId
      )}?${queryParams.toString()}`;
      const response = await apiService.get<ActivityLogAnalytics>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to fetch activity log analytics"
      );
    } catch (error) {
      console.error("Error fetching activity log analytics:", error);
      throw error;
    }
  }

  /**
   * Search activity logs with advanced filtering
   */
  static async searchActivityLogs(
    filter: ActivityLogFilter
  ): Promise<ActivityLogSearchResult> {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        filter.companyId
      )}/search?${queryParams.toString()}`;
      const response = await apiService.get<ActivityLogSearchResult>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to search activity logs");
    } catch (error) {
      console.error("Error searching activity logs:", error);
      throw error;
    }
  }

  /**
   * Export activity logs
   */
  static async exportActivityLogs(
    companyId: string,
    format: "json" | "csv" | "pdf" = "json",
    filters?: ActivityLogFilter
  ): Promise<ActivityLogExportData> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("format", format);

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.EXPORT(
        companyId
      )}?${queryParams.toString()}`;
      const response = await apiService.get<ActivityLogExportData>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to export activity logs");
    } catch (error) {
      console.error("Error exporting activity logs:", error);
      throw error;
    }
  }

  /**
   * Get activity log alerts for a company
   */
  static async getActivityLogAlerts(
    companyId: string
  ): Promise<ActivityLogAlert[]> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITY_LOGS.ALERTS(companyId);
      const response = await apiService.get<ActivityLogAlert[]>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to fetch activity log alerts"
      );
    } catch (error) {
      console.error("Error fetching activity log alerts:", error);
      throw error;
    }
  }

  /**
   * Create or update an activity log alert
   */
  static async upsertActivityLogAlert(
    alert: Partial<ActivityLogAlert>,
    companyId: string
  ): Promise<ActivityLogAlert> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITY_LOGS.ALERTS(companyId);
      const method = alert.id ? "put" : "post";
      const finalEndpoint = alert.id ? `${endpoint}/${alert.id}` : endpoint;

      const response = await apiService[method]<ActivityLogAlert>(
        finalEndpoint,
        alert
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to upsert activity log alert"
      );
    } catch (error) {
      console.error("Error upserting activity log alert:", error);
      throw error;
    }
  }

  /**
   * Get retention policies for a company
   */
  static async getRetentionPolicies(
    companyId: string
  ): Promise<RetentionPolicy[]> {
    try {
      const endpoint =
        API_ENDPOINTS.ACTIVITY_LOGS.RETENTION_POLICIES(companyId);
      const response = await apiService.get<RetentionPolicy[]>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch retention policies");
    } catch (error) {
      console.error("Error fetching retention policies:", error);
      throw error;
    }
  }

  /**
   * Create or update a retention policy
   */
  static async upsertRetentionPolicy(
    policy: Partial<RetentionPolicy>,
    companyId: string
  ): Promise<RetentionPolicy> {
    try {
      const endpoint =
        API_ENDPOINTS.ACTIVITY_LOGS.RETENTION_POLICIES(companyId);
      const method = policy.id ? "put" : "post";
      const finalEndpoint = policy.id ? `${endpoint}/${policy.id}` : endpoint;

      const response = await apiService[method]<RetentionPolicy>(
        finalEndpoint,
        policy
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to upsert retention policy");
    } catch (error) {
      console.error("Error upserting retention policy:", error);
      throw error;
    }
  }

  /**
   * Perform batch operations on activity logs
   */
  static async batchOperation(
    operation: ActivityLogBatchOperation,
    companyId: string
  ): Promise<{ success: boolean; results: any[] }> {
    try {
      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/batch-operations`;
      const response = await apiService.post(endpoint, operation);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to perform batch operation");
    } catch (error) {
      console.error("Error performing batch operation:", error);
      throw error;
    }
  }

  /**
   * Update activity log review status
   */
  static async updateReviewStatus(
    logId: string,
    reviewStatus: Partial<ActivityLogReviewStatus>,
    companyId: string
  ): Promise<ActivityLogReviewStatus> {
    try {
      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/${logId}/review-status`;
      const response = await apiService.put<ActivityLogReviewStatus>(
        endpoint,
        reviewStatus
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to update review status");
    } catch (error) {
      console.error("Error updating review status:", error);
      throw error;
    }
  }

  /**
   * Get activity log search suggestions
   */
  static async getSearchSuggestions(
    companyId: string,
    query: string
  ): Promise<ActivityLogSearchSuggestion[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("q", query);

      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/suggestions?${queryParams.toString()}`;
      const response = await apiService.get<ActivityLogSearchSuggestion[]>(
        endpoint
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch search suggestions");
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      throw error;
    }
  }

  /**
   * Log an activity (for internal use)
   */
  static async logActivity(
    activityData: Omit<ActivityLog, "id" | "timestamp">,
    companyId: string
  ): Promise<void> {
    try {
      const endpoint = API_ENDPOINTS.ACTIVITY_LOGS.BASE(companyId);
      const activity: Partial<ActivityLog> = {
        ...activityData,
        timestamp: new Date().toISOString(),
      };

      const response = await apiService.post(endpoint, activity);

      if (!response.success) {
        throw new Error(response.message || "Failed to log activity");
      }
    } catch (error) {
      console.error("Error logging activity:", error);
      // Don't throw error for logging failures to avoid breaking main functionality
    }
  }

  /**
   * Get risk indicators for a company
   */
  static async getRiskIndicators(companyId: string): Promise<RiskIndicator[]> {
    try {
      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/risk-indicators`;
      const response = await apiService.get<RiskIndicator[]>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch risk indicators");
    } catch (error) {
      console.error("Error fetching risk indicators:", error);
      throw error;
    }
  }

  /**
   * Acknowledge a risk indicator
   */
  static async acknowledgeRiskIndicator(
    indicatorId: string,
    companyId: string,
    acknowledgedBy: string,
    notes?: string
  ): Promise<void> {
    try {
      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/risk-indicators/${indicatorId}/acknowledge`;
      const response = await apiService.post(endpoint, {
        acknowledgedBy,
        notes,
        acknowledgedAt: new Date().toISOString(),
      });

      if (!response.success) {
        throw new Error(
          response.message || "Failed to acknowledge risk indicator"
        );
      }
    } catch (error) {
      console.error("Error acknowledging risk indicator:", error);
      throw error;
    }
  }

  /**
   * Get activity log statistics for dashboard
   */
  static async getDashboardStats(companyId: string): Promise<{
    totalLogs: number;
    recentActivity: number;
    riskLevel: "low" | "medium" | "high";
    topActions: { action: string; count: number }[];
    topUsers: { userId: string; userName: string; count: number }[];
  }> {
    try {
      const endpoint = `${API_ENDPOINTS.ACTIVITY_LOGS.BASE(
        companyId
      )}/dashboard-stats`;
      const response = await apiService.get(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch dashboard stats");
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }
}

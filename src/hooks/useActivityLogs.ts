// Activity Logs Hook for Teams and Roles Management

import { useState, useEffect, useCallback, useMemo } from "react";
import { ActivityLogsService } from "../services/activityLogsService";
import type {
  ActivityLog,
  ActivityLogFilter,
  ActivityLogSearchResult,
  ActivityLogSummary,
  ActivityLogAnalytics,
  ActivityLogExportData,
  ActivityLogSearchSuggestion,
  ActivityLogAlert,
  RetentionPolicy,
  RiskIndicator,
} from "../types/activityLogs";

interface UseActivityLogsOptions {
  companyId: string;
  autoFetch?: boolean;
  refreshInterval?: number;
}

interface UseActivityLogsReturn {
  // State
  activityLogs: ActivityLog[];
  selectedLog: ActivityLog | null;
  isLoading: boolean;
  error: string | null;

  // Pagination and filtering
  totalLogs: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;

  // Actions
  createActivityLog: (
    logData: Omit<ActivityLog, "id" | "timestamp">
  ) => Promise<ActivityLog>;
  updateActivityLog: (
    logId: string,
    updates: Partial<ActivityLog>
  ) => Promise<ActivityLog>;
  deleteActivityLog: (logId: string) => Promise<void>;

  // Selection and navigation
  selectLog: (log: ActivityLog | null) => void;
  selectLogById: (logId: string) => void;
  clearSelection: () => void;

  // Fetching and filtering
  fetchActivityLogs: (filters?: ActivityLogFilter) => Promise<void>;
  searchActivityLogs: (
    query: string,
    filters?: ActivityLogFilter
  ) => Promise<ActivityLogSearchResult>;
  refreshActivityLogs: () => Promise<void>;

  // Utility methods
  getLogById: (logId: string) => ActivityLog | undefined;
  getActivityLogSummary: () => Promise<ActivityLogSummary>;
  getActivityLogAnalytics: (
    startDate: string,
    endDate: string
  ) => Promise<ActivityLogAnalytics>;
  exportActivityLogs: (
    format?: "json" | "csv" | "pdf",
    filters?: ActivityLogFilter
  ) => Promise<ActivityLogExportData>;
  getSearchSuggestions: (
    query: string
  ) => Promise<ActivityLogSearchSuggestion[]>;
  logActivity: (
    activityData: Omit<ActivityLog, "id" | "timestamp">
  ) => Promise<void>;

  // Error handling
  clearError: () => void;
}

export function useActivityLogs(
  options: UseActivityLogsOptions
): UseActivityLogsReturn {
  const {
    companyId,
    autoFetch = true,
    refreshInterval = 300000, // 5 minutes
  } = options;

  // State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [totalLogs, setTotalLogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  // Fetch activity logs from the server
  const fetchActivityLogs = useCallback(
    async (filters?: ActivityLogFilter) => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedLogs = await ActivityLogsService.getActivityLogs(
          companyId,
          filters
        );
        setActivityLogs(fetchedLogs);
        setTotalLogs(fetchedLogs.length);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch activity logs";
        setError(errorMessage);
        console.error("Error fetching activity logs:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [companyId]
  );

  // Search activity logs
  const searchActivityLogs = useCallback(
    async (
      query: string,
      filters?: ActivityLogFilter
    ): Promise<ActivityLogSearchResult> => {
      try {
        setError(null);

        const searchResult = await ActivityLogsService.searchActivityLogs({
          search: query,
          companyId,
          ...filters,
        });

        return searchResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search activity logs";
        setError(errorMessage);
        console.error("Error searching activity logs:", err);
        throw err;
      }
    },
    [companyId]
  );

  // Create a new activity log
  const createActivityLog = useCallback(
    async (
      logData: Omit<ActivityLog, "id" | "timestamp">
    ): Promise<ActivityLog> => {
      try {
        setError(null);

        const newLog = await ActivityLogsService.createActivityLog(
          logData,
          companyId
        );
        setActivityLogs((prev) => [newLog, ...prev]);
        setSelectedLog(newLog);
        setTotalLogs((prev) => prev + 1);

        return newLog;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create activity log";
        setError(errorMessage);
        console.error("Error creating activity log:", err);
        throw err;
      }
    },
    [companyId]
  );

  // Update an existing activity log
  const updateActivityLog = useCallback(
    async (
      logId: string,
      updates: Partial<ActivityLog>
    ): Promise<ActivityLog> => {
      try {
        setError(null);

        const updatedLog = await ActivityLogsService.updateActivityLog(
          logId,
          updates,
          companyId
        );
        setActivityLogs((prev) =>
          prev.map((log) => (log.id === logId ? updatedLog : log))
        );

        if (selectedLog?.id === logId) {
          setSelectedLog(updatedLog);
        }

        return updatedLog;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update activity log";
        setError(errorMessage);
        console.error("Error updating activity log:", err);
        throw err;
      }
    },
    [companyId, selectedLog]
  );

  // Delete an activity log
  const deleteActivityLog = useCallback(
    async (logId: string): Promise<void> => {
      try {
        setError(null);

        await ActivityLogsService.deleteActivityLog(logId, companyId);
        setActivityLogs((prev) => prev.filter((log) => log.id !== logId));
        setTotalLogs((prev) => prev - 1);

        if (selectedLog?.id === logId) {
          setSelectedLog(null);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete activity log";
        setError(errorMessage);
        console.error("Error deleting activity log:", err);
        throw err;
      }
    },
    [companyId, selectedLog]
  );

  // Select a log
  const selectLog = useCallback((log: ActivityLog | null) => {
    setSelectedLog(log);
  }, []);

  // Select a log by ID
  const selectLogById = useCallback(
    (logId: string) => {
      const log = activityLogs.find((l) => l.id === logId);
      setSelectedLog(log || null);
    },
    [activityLogs]
  );

  // Clear log selection
  const clearSelection = useCallback(() => {
    setSelectedLog(null);
  }, []);

  // Get log by ID
  const getLogById = useCallback(
    (logId: string): ActivityLog | undefined => {
      return activityLogs.find((log) => log.id === logId);
    },
    [activityLogs]
  );

  // Get activity log summary
  const getActivityLogSummary =
    useCallback(async (): Promise<ActivityLogSummary> => {
      try {
        return await ActivityLogsService.getActivityLogSummary(companyId);
      } catch (err) {
        console.error("Error fetching activity log summary:", err);
        throw err;
      }
    }, [companyId]);

  // Get activity log analytics
  const getActivityLogAnalytics = useCallback(
    async (
      startDate: string,
      endDate: string
    ): Promise<ActivityLogAnalytics> => {
      try {
        return await ActivityLogsService.getActivityLogAnalytics(
          companyId,
          startDate,
          endDate
        );
      } catch (err) {
        console.error("Error fetching activity log analytics:", err);
        throw err;
      }
    },
    [companyId]
  );

  // Export activity logs
  const exportActivityLogs = useCallback(
    async (
      format: "json" | "csv" | "pdf" = "json",
      filters?: ActivityLogFilter
    ): Promise<ActivityLogExportData> => {
      try {
        return await ActivityLogsService.exportActivityLogs(
          companyId,
          format,
          filters
        );
      } catch (err) {
        console.error("Error exporting activity logs:", err);
        throw err;
      }
    },
    [companyId]
  );

  // Get search suggestions
  const getSearchSuggestions = useCallback(
    async (query: string): Promise<ActivityLogSearchSuggestion[]> => {
      try {
        return await ActivityLogsService.getSearchSuggestions(query, companyId);
      } catch (err) {
        console.error("Error fetching search suggestions:", err);
        throw err;
      }
    },
    [companyId]
  );

  // Log activity (convenience method)
  const logActivity = useCallback(
    async (
      activityData: Omit<ActivityLog, "id" | "timestamp">
    ): Promise<void> => {
      try {
        await ActivityLogsService.logActivity(activityData, companyId);
      } catch (err) {
        console.error("Error logging activity:", err);
        // Don't throw error for logging failures to avoid breaking main functionality
      }
    },
    [companyId]
  );

  // Refresh activity logs
  const refreshActivityLogs = useCallback(async () => {
    await fetchActivityLogs();
  }, [fetchActivityLogs]);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized values
  const recentLogs = useMemo(() => activityLogs.slice(0, 10), [activityLogs]);
  const highSeverityLogs = useMemo(
    () =>
      activityLogs.filter(
        (log) => log.severity === "high" || log.severity === "critical"
      ),
    [activityLogs]
  );

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && companyId) {
      fetchActivityLogs();
    }
  }, [autoFetch, companyId, fetchActivityLogs]);

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval && autoFetch) {
      const interval = setInterval(() => {
        fetchActivityLogs();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, autoFetch, fetchActivityLogs]);

  return {
    activityLogs,
    selectedLog,
    isLoading,
    error,
    totalLogs,
    currentPage,
    pageSize,
    hasMore,
    createActivityLog,
    updateActivityLog,
    deleteActivityLog,
    selectLog,
    selectLogById,
    clearSelection,
    fetchActivityLogs,
    searchActivityLogs,
    refreshActivityLogs,
    getLogById,
    getActivityLogSummary,
    getActivityLogAnalytics,
    exportActivityLogs,
    getSearchSuggestions,
    logActivity,
    clearError,
  };
}

/**
 * Hook for managing a single activity log
 */
export function useActivityLog(logId: string, companyId: string) {
  const [log, setLog] = useState<ActivityLog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLog = useCallback(async () => {
    if (!logId || !companyId) return;

    try {
      setIsLoading(true);
      setError(null);

      const fetchedLog = await ActivityLogsService.getActivityLogById(
        logId,
        companyId
      );
      setLog(fetchedLog);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch activity log";
      setError(errorMessage);
      console.error("Error fetching activity log:", err);
    } finally {
      setIsLoading(false);
    }
  }, [logId, companyId]);

  const updateLog = useCallback(
    async (updates: Partial<ActivityLog>) => {
      if (!logId || !companyId)
        throw new Error("Log ID and Company ID are required");

      try {
        setError(null);

        const updatedLog = await ActivityLogsService.updateActivityLog(
          logId,
          updates,
          companyId
        );
        setLog(updatedLog);

        return updatedLog;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update activity log";
        setError(errorMessage);
        console.error("Error updating activity log:", err);
        throw err;
      }
    },
    [logId, companyId]
  );

  const deleteLog = useCallback(async () => {
    if (!logId || !companyId)
      throw new Error("Log ID and Company ID are required");

    try {
      setError(null);

      await ActivityLogsService.deleteActivityLog(logId, companyId);
      setLog(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete activity log";
      setError(errorMessage);
      console.error("Error deleting activity log:", err);
      throw err;
    }
  }, [logId, companyId]);

  useEffect(() => {
    fetchLog();
  }, [fetchLog]);

  return {
    log,
    isLoading,
    error,
    fetchLog,
    updateLog,
    deleteLog,
  };
}

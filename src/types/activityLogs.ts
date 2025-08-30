// Activity Logging Types for Teams and Roles Management

import { ModuleName } from './permissions';

// Activity action types
export type ActivityAction = 
  | 'user_invited'
  | 'user_accepted'
  | 'user_declined'
  | 'role_created'
  | 'role_updated'
  | 'role_deleted'
  | 'permissions_changed'
  | 'user_role_changed'
  | 'user_deactivated'
  | 'user_reactivated'
  | 'login_success'
  | 'login_failed'
  | 'permission_denied'
  | 'data_accessed'
  | 'data_modified'
  | 'data_deleted'
  | 'export_requested'
  | 'import_requested'
  | 'bulk_operation'
  | 'system_event';

// Entity types for activity logging
export type EntityType = 
  | 'user'
  | 'role'
  | 'permission'
  | 'teamMember'
  | 'company'
  | 'project'
  | 'client'
  | 'document'
  | 'report'
  | 'system';

// Activity severity levels
export type ActivitySeverity = 'low' | 'medium' | 'high' | 'critical';

// Base activity log interface
export interface ActivityLog {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId?: string;
  entityName?: string;
  companyId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  severity: ActivitySeverity;
  timestamp: string;
  sessionId?: string;
  requestId?: string;
}

// Activity log with additional metadata
export interface ActivityLogWithMetadata extends ActivityLog {
  userRole?: string;
  userRoleLevel?: string;
  companyName?: string;
  timeAgo: string;
  relatedLogs?: string[];
  riskScore?: number;
}

// Activity log filter criteria
export interface ActivityLogFilter {
  companyId: string;
  userId?: string;
  action?: ActivityAction;
  entityType?: EntityType;
  entityId?: string;
  severity?: ActivitySeverity;
  startDate?: string;
  endDate?: string;
  ipAddress?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Activity log search result
export interface ActivityLogSearchResult {
  logs: ActivityLogWithMetadata[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  summary: ActivityLogSummary;
}

// Activity log summary
export interface ActivityLogSummary {
  totalLogs: number;
  byAction: {
    [action in ActivityAction]?: number;
  };
  byEntityType: {
    [entityType in EntityType]?: number;
  };
  bySeverity: {
    [severity in ActivitySeverity]?: number;
  };
  byUser: {
    [userId: string]: {
      userName: string;
      count: number;
      lastActivity: string;
    };
  };
  byDate: {
    [date: string]: number;
  };
  riskIndicators: RiskIndicator[];
}

// Risk indicator for security monitoring
export interface RiskIndicator {
  type: 'unusual_activity' | 'permission_escalation' | 'failed_access' | 'bulk_operations' | 'sensitive_data_access';
  severity: ActivitySeverity;
  description: string;
  affectedUsers: string[];
  affectedEntities: string[];
  timestamp: string;
  riskScore: number;
}

// Activity log export data
export interface ActivityLogExportData {
  logs: ActivityLogWithMetadata[];
  metadata: {
    exportedAt: string;
    exportedBy: string;
    companyId: string;
    filters: ActivityLogFilter;
    format: 'csv' | 'json' | 'pdf';
    version: string;
  };
}

// Activity log analytics
export interface ActivityLogAnalytics {
  period: {
    start: string;
    end: string;
  };
  metrics: {
    totalActivities: number;
    uniqueUsers: number;
    uniqueEntities: number;
    averageDailyActivities: number;
    peakActivityHour: number;
    mostActiveUser: {
      userId: string;
      userName: string;
      activityCount: number;
    };
    mostAccessedEntity: {
      entityType: EntityType;
      entityId: string;
      entityName: string;
      accessCount: number;
    };
  };
  trends: {
    daily: { [date: string]: number };
    hourly: { [hour: string]: number };
    byAction: { [action in ActivityAction]?: number };
    byEntityType: { [entityType in EntityType]?: number };
  };
}

// Activity log alert
export interface ActivityLogAlert {
  id: string;
  type: 'security' | 'performance' | 'business' | 'system';
  severity: ActivitySeverity;
  title: string;
  description: string;
  conditions: {
    action?: ActivityAction;
    entityType?: EntityType;
    userId?: string;
    threshold: number;
    timeWindow: number; // minutes
  };
  triggered: boolean;
  triggeredAt?: string;
  triggeredCount: number;
  recipients: string[];
  createdAt: string;
  updatedAt: string;
}

// Activity log retention policy
export interface RetentionPolicy {
  id: string;
  companyId: string;
  entityType: EntityType;
  retentionPeriod: number; // days
  archiveAfter: number; // days
  deleteAfter: number; // days
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Activity log search suggestions
export interface ActivityLogSearchSuggestion {
  id: string;
  action: ActivityAction;
  entityType: EntityType;
  entityName?: string;
  userName?: string;
  timestamp: string;
  matchType: 'exact' | 'partial' | 'fuzzy';
}

// Activity log batch operation
export interface ActivityLogBatchOperation {
  logIds: string[];
  operation: 'archive' | 'delete' | 'export' | 'mark_reviewed';
  metadata?: Record<string, any>;
}

// Activity log review status
export interface ActivityLogReviewStatus {
  logId: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'pending' | 'reviewed' | 'flagged' | 'resolved';
  notes?: string;
  tags?: string[];
}

// Export all activity log-related types
export type {
  ActivityAction,
  EntityType,
  ActivitySeverity,
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
};


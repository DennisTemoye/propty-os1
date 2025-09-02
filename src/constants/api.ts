// API Configuration Constants
export const API_CONFIG = {
  // Base URL - change this to your actual API endpoint
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.proptyos.com",

  // API Version
  VERSION: "v1",

  // Timeout settings
  TIMEOUT: 30000, // 30 seconds

  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    ME: "/auth/me",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Dashboard
  DASHBOARD: {
    OVERVIEW: "/dashboard",
  },

  // Users
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
  },

  // Companies
  COMPANIES: {
    BASE: "/companies",
    PROFILE: "/companies/profile",
    SETTINGS: "/companies/settings",
    BILLING: "/companies/billing",
  },

  // Plots
  PLOTS: {
    BASE: "/plots",
    DETAILS: (id: string) => `/plots/${id}`,
    // get plots by project id
    PROJECT: (id: string) => `/plots/project/${id}`,
  },

  // Projects
  PROJECTS: {
    BASE: "/projects",
    DETAILS: (id: string) => `/projects/${id}`,
    UNITS: (id: string) => `/projects/${id}/units`,
    DOCUMENTS: (id: string) => `/projects/${id}/documents`,
    SALES: (id: string) => `/projects/${id}/sales`,
    BLOCKS: (id: string) => `/projects/${id}/blocks`,
  },

  // Clients
  CLIENTS: {
    BASE: "/clients",
    DETAILS: (id: string) => `/clients/${id}`,
    DOCUMENTS: (id: string) => `/clients/${id}/documents`,
    PAYMENTS: (id: string) => `/clients/${id}/payments`,
    ALLOCATIONS: (id: string) => `/clients/${id}/allocations`,
  },

  // Marketers
  MARKETERS: {
    BASE: "/marketers",
    DETAILS: (id: string) => `/marketers/${id}`,
    COMMISSIONS: (id: string) => `/marketers/${id}/commissions`,
    ALLOCATIONS: (id: string) => `/marketers/${id}/allocations`,
  },

  // Sales & Allocations
  SALES: {
    BASE: "/sales",
    ALLOCATIONS: "/sales/allocations",
    ALLOCATION_DETAILS: (id: string) => `/sales/allocations/${id}`,
    PENDING_APPROVALS: "/sales/allocations/pending",
    APPROVE_ALLOCATION: (id: string) => `/sales/allocations/${id}/approve`,
    REJECT_ALLOCATION: (id: string) => `/sales/allocations/${id}/reject`,
    RECORD_SALE: (id: string) => `/sales/allocations/${id}/record-sale`,
  },

  // Fees & Payments
  FEES: {
    BASE: "/fees",
    COLLECTIONS: "/fees/collections",
    PAYMENTS: "/fees/payments",
    SETUP: "/fees/setup",
    MONITORING: "/fees/monitoring",
  },

  // Accounting Analytics
  ACCOUNTING: {
    BASE: "/accounting",
    INCOME: "/accounting/income",
    EXPENSES: "/accounting/expenses",
    ANALYTICS: {
      INCOME_EXPENSES: "/accounting/analytics/income-expenses",
      EXPENSE_BREAKDOWN: "/accounting/analytics/expense-breakdown",
      CASH_FLOW: "/accounting/analytics/cash-flow",
    },
    REPORTS: {
      SUMMARY: "/accounting/reports/summary",
      EXPORT: "/accounting/reports/export",
    },
  },

  // Document Management
  DOCUMENTS: {
    BASE: "/documents",
    BY_ID: (id: string) => `/documents/${id}`,
    UPLOAD: "/documents/upload",
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
    METADATA: (id: string) => `/documents/${id}/metadata`,
    SEARCH: "/documents/search",
    CATEGORIES: {
      BASE: "/documents/categories",
      BY_ID: (id: string) => `/documents/categories/${id}`,
    },
  },

  // Reports & Analytics
  REPORTS: {
    BASE: "/reports",
    SALES: {
      GENERATE: "/reports/sales",
      EXPORT: "/reports/sales/export",
    },
    COMMISSION: {
      GENERATE: "/reports/commission",
      EXPORT: "/reports/commission/export",
    },
    FINANCIAL: {
      GENERATE: "/reports/financial",
      EXPORT: "/reports/financial/export",
    },
    PROJECTS: "/reports/projects",
    CLIENTS: "/reports/clients",
    TEMPLATES: {
      BASE: "/reports/templates",
      BY_TYPE: (type: string) => `/reports/templates?type=${type}`,
      BY_ID: (id: string) => `/reports/templates/${id}`,
    },
    INSIGHTS: "/reports/insights",
    EXPORT: "/reports/export",
    DOWNLOAD: (exportId: string) => `/reports/download/${exportId}`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: "/notifications",
    SEND: "/notifications/send",
    HISTORY: "/notifications/history",
    TEMPLATES: "/notifications/templates",
  },

  // CRM Pipeline
  CRM: {
    BASE: "/crm",
    LEADS: {
      BASE: "/crm/leads",
      BY_ID: (id: string) => `/crm/leads/${id}`,
      CONVERT: (id: string) => `/crm/leads/${id}/convert`,
    },
    PIPELINE: {
      STAGES: "/crm/pipeline/stages",
      STAGE_BY_ID: (id: string) => `/crm/pipeline/stages/${id}`,
      REORDER: "/crm/pipeline/stages/reorder",
      METRICS: "/crm/pipeline/metrics",
    },
  },

  // Super Admin
  SUPER_ADMIN: {
    BASE: "/super-admin",
    COMPANIES: "/super-admin/companies",
    USERS: "/super-admin/users",
    BILLING: "/super-admin/billing",
    SYSTEM_LOGS: "/super-admin/logs",
    GLOBAL_SETTINGS: "/super-admin/settings",
  },

  // Calendar & Scheduling
  CALENDAR: {
    EVENTS: {
      BASE: "/calendar/events",
      BY_ID: (id: string) => `/calendar/events/${id}`,
      STATUS: (id: string) => `/calendar/events/${id}/status`,
    },
    VIEW: "/calendar/view",
    REMINDERS: {
      BASE: "/calendar/reminders",
      SENT: (id: string) => `/calendar/reminders/${id}/sent`,
    },
  },

  // Commissions
  COMMISSIONS: {
    BASE: "/commissions",
  },

  // Geographic Mapping
  MAPS: {
    UNITS: {
      BASE: "/maps/units",
      BY_ID: (id: string) => `/maps/units/${id}`,
      COORDINATES: (id: string) => `/maps/units/${id}/coordinates`,
      BULK_COORDINATES: "/maps/units/bulk-coordinates",
      BY_LOCATION: "/maps/units",
    },
    LAYERS: {
      BASE: "/maps/layers",
      BY_ID: (id: string) => `/maps/layers/${id}`,
    },
    ANALYTICS: {
      UNITS_BY_AREA: "/maps/analytics/units-by-area",
    },
  },

  // Allocations
  PLOT_ALLOCATIONS: {
    BASE: "/plots/allocation",
    REALLOCATE: (id: string) => `/plots/reallocate/${id}`,
  },

  // Roles Management
  ROLES: {
    BASE: (businessName: string) => `/companies/${businessName}/roles`,
    DETAILS: (businessName: string, roleId: string) =>
      `/companies/${businessName}/roles/${roleId}`,
    DEFAULT: (businessName: string) =>
      `/companies/${businessName}/roles/default`,
    TEMPLATES: (businessName: string) =>
      `/companies/${businessName}/roles/templates`,
    DUPLICATE: (businessName: string, roleId: string) =>
      `/companies/${businessName}/roles/${roleId}/duplicate`,
    PERMISSIONS: (businessName: string, roleId: string) =>
      `/companies/${businessName}/roles/${roleId}/permissions`,
    USAGE_STATS: (businessName: string) =>
      `/companies/${businessName}/roles/usage-stats`,
  },

  // Team Members Management
  TEAM_MEMBERS: {
    BASE: (businessName: string) => `/companies/${businessName}/team-members`,
    DETAILS: (businessName: string, memberId: string) =>
      `/companies/${businessName}/team-members/${memberId}`,
    INVITE: (businessName: string) =>
      `/companies/${businessName}/team-members/invite`,
    CHANGE_ROLE: (businessName: string, memberId: string) =>
      `/companies/${businessName}/team-members/${memberId}/change-role`,
    ACTIVATE: (businessName: string, memberId: string) =>
      `/companies/${businessName}/team-members/${memberId}/activate`,
    DEACTIVATE: (businessName: string, memberId: string) =>
      `/companies/${businessName}/team-members/${memberId}/deactivate`,
    RESEND_INVITATION: (businessName: string, memberId: string) =>
      `/companies/${businessName}/team-members/${memberId}/resend-invitation`,
    BULK_OPERATIONS: (businessName: string) =>
      `/companies/${businessName}/team-members/bulk-operations`,
    STATS: (businessName: string) =>
      `/companies/${businessName}/team-members/stats`,
    EXPORT: (businessName: string) =>
      `/companies/${businessName}/team-members/export`,
  },

  // Activity Logs
  ACTIVITY_LOGS: {
    BASE: (companyId: string) => `/companies/${companyId}/activity-logs`,
    SUMMARY: (companyId: string) =>
      `/companies/${companyId}/activity-logs/summary`,
    ANALYTICS: (companyId: string) =>
      `/companies/${companyId}/activity-logs/analytics`,
    EXPORT: (companyId: string) =>
      `/companies/${companyId}/activity-logs/export`,
    ALERTS: (companyId: string) =>
      `/companies/${companyId}/activity-logs/alerts`,
    RETENTION_POLICIES: (companyId: string) =>
      `/companies/${companyId}/activity-logs/retention-policies`,
  },

  // Permission Validation
  PERMISSIONS: {
    VALIDATE: "/auth/validate-permissions",
    USER_PERMISSIONS: "/auth/user-permissions",
    MODULE_ACCESS: (module: string) => `/auth/module-access/${module}`,
    BULK_VALIDATE: "/auth/bulk-validate-permissions",
    PERMISSION_SUMMARY: "/auth/permission-summary",
  },

  // Role Assignment History
  ROLE_ASSIGNMENTS: {
    BASE: (companyId: string) => `/companies/${companyId}/role-assignments`,
    HISTORY: (companyId: string, userId: string) =>
      `/companies/${companyId}/role-assignments/${userId}/history`,
    BULK_ASSIGN: (companyId: string) =>
      `/companies/${companyId}/role-assignments/bulk-assign`,
  },

  // Export & Download
  EXPORT: {
    BASE: "/export",
    REPORTS: "/export/reports",
    DOCUMENTS: "/export/documents",
    MAPS: "/export/maps",
    ACCOUNTING: "/export/accounting",
  },

  // Webhooks
  WEBHOOKS: {
    BASE: "/webhooks",
    LEAD_CREATED: "/webhooks/lead.created",
    LEAD_STAGE_CHANGED: "/webhooks/lead.stage_changed",
    EVENT_REMINDER: "/webhooks/event.reminder",
    DOCUMENT_UPLOADED: "/webhooks/document.uploaded",
    UNIT_COORDINATES_UPDATED: "/webhooks/unit.coordinates_updated",
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

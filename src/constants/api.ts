// API Configuration Constants
export const API_CONFIG = {
  // Base URL - change this to your actual API endpoint
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",

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

  //plots
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

  // Accounting
  ACCOUNTING: {
    BASE: "/accounting",
    INCOME: "/accounting/income",
    EXPENSES: "/accounting/expenses",
    REPORTS: "/accounting/reports",
    ANALYTICS: "/accounting/analytics",
  },

  // Documents
  DOCUMENTS: {
    BASE: "/documents",
    UPLOAD: "/documents/upload",
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
    DELETE: (id: string) => `/documents/${id}`,
  },

  // Reports
  REPORTS: {
    BASE: "/reports",
    SALES: "/reports/sales",
    FINANCIAL: "/reports/financial",
    CLIENT: "/reports/client",
    MARKETER: "/reports/marketer",
    EXPORT: (type: string) => `/reports/${type}/export`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: "/notifications",
    SEND: "/notifications/send",
    HISTORY: "/notifications/history",
    TEMPLATES: "/notifications/templates",
  },

  // CRM
  CRM: {
    BASE: "/crm",
    PIPELINES: "/crm/pipelines",
    LEADS: "/crm/leads",
    DEALS: "/crm/deals",
    CONTACTS: "/crm/contacts",
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

  // Commissions
  COMMISSIONS: {
    BASE: "/commissions",
  },

  // Allocations
  PLOT_ALLOCATIONS: {
    BASE: "/plots/allocations",
    REALLOCATE: (id: string) => `/plots/allocations/${id}/reallocate`,
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

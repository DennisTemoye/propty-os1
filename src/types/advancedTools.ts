// Advanced Tools Types

// ===== Reports & Analytics Types =====
export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
  };
  projectId?: string;
  marketerId?: string;
  status?: string[];
  minAmount?: number;
  maxAmount?: number;
  includeDetails?: boolean;
  groupBy?: string;
}

export interface SalesReport {
  summary: {
    totalSales: number;
    totalVolume: number;
    activeClients: number;
    averageDealSize: number;
  };
  sales: Array<{
    id: string;
    clientName: string;
    project: string;
    unit: string;
    amount: number;
    marketer: string;
    commission: number;
    commissionStatus: string;
    status: string;
    date: string;
    revokedDate?: string;
  }>;
  generatedAt: string;
}

export interface CommissionReport {
  summary: {
    totalMarketers: number;
    totalCommission: number;
    paidCommission: number;
    pendingCommission: number;
  };
  commissions: Array<{
    id: string;
    marketer: string;
    totalSales: number;
    totalVolume: number;
    totalCommission: number;
    paidCommission: number;
    pendingCommission: number;
    period: string;
  }>;
}

export interface FinancialReport {
  revenue: {
    totalRevenue: number;
    salesRevenue: number;
    otherRevenue: number;
  };
  expenses: {
    totalExpenses: number;
    operationalExpenses: number;
    marketingExpenses: number;
  };
  commissions: {
    commissionPaid: number;
    commissionPending: number;
  };
  netProfit: number;
  outstandingAmount: number;
  refundsIssued: number;
  period: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  filters: ReportFilters;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== CRM Pipeline Types =====
export interface Lead {
  _id: string; // API uses _id instead of id
  clientName: string;
  email: string;
  phone: string;
  stage: string;
  projectInterest?: string; // Optional since not in current API response
  source: string;
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
  priority: "low" | "medium" | "high";
  dealValue?: number; // Optional since not in current API response
  preferences: string[];
  tags: string[];
  status: "active" | "closed_won" | "closed_lost";
  notes: string[];
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for creating a new lead (API expects different structure)
export interface LeadCreate {
  clientName: string;
  email: string;
  phone: string;
  stage: string;
  source: string;
  assignedTo: string; // API expects just the ID when creating
  priority: "low" | "medium" | "high";
  preferences: string[];
  tags: string[];
  status: "active" | "closed_won" | "closed_lost";
  notes: string[];
}

// Interface for updating a lead
export interface LeadUpdate {
  clientName?: string;
  email?: string;
  phone?: string;
  stage?: string;
  source?: string;
  assignedTo?: string; // API expects just the ID when updating
  priority?: "low" | "medium" | "high";
  preferences?: string[];
  tags?: string[];
  status?: "active" | "closed_won" | "closed_lost";
  notes?: string[];
  lastActivity?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  probability: number;
  isActive: boolean;
}

export interface PipelineMetrics {
  totalLeads: number;
  conversionRate: number;
  averageDealSize: number;
  totalPipelineValue: number;
  stageBreakdown: Array<{
    stage: string;
    count: number;
    value?: number; // Optional since dealValue is not available
  }>;
}

// ===== Calendar & Scheduling Types =====
export interface CalendarEvent {
  id: string;
  title: string;
  type: "inspection" | "followup" | "task" | "meeting" | "call" | "site_visit";
  date: string;
  time: string;
  duration: number;
  clientId?: string;
  clientName?: string;
  clientPhone?: string;
  developmentId?: string;
  developmentName?: string;
  location?: string;
  description: string;
  reminder: boolean;
  reminderMinutes: number;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  assignedTo: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  createdAt: string;
  lastModified: string;
}

export interface CalendarView {
  view: string;
  date: string;
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    type: string;
    status: string;
  }>;
}

export interface Reminder {
  id: string;
  eventId: string;
  eventTitle: string;
  reminderTime: string;
  isSent: boolean;
  sentAt?: string;
}

// ===== Document Management Types =====
export interface Document {
  id: string;
  title: string;
  fileName: string;
  category: string;
  linkedTo: "client" | "project";
  linkedId: string;
  linkedName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  url?: string;
  tags: string[];
  description?: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface DocumentSearchQuery {
  query: string;
  filters?: {
    category?: string;
    linkedTo?: string;
    dateRange?: {
      start: string;
      end: string;
    };
    fileType?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ===== Geographic Mapping Types =====
export interface MapUnit {
  id: string;
  name: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: string;
  projectId: string;
  blockId: string;
  floor: number;
  unitNumber: string;
  createdAt: string;
}

export interface MapLayer {
  id: string;
  name: string;
  type: string;
  filter: any;
  style: {
    color: string;
    icon: string;
  };
}

export interface UnitsByArea {
  areas: Array<{
    area: string;
    totalUnits: number;
    availableUnits: number;
    soldUnits: number;
    reservedUnits: number;
  }>;
}

// ===== Accounting Analytics Types =====
export interface IncomeExpensesData {
  period: string;
  chartData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  };
}

export interface ExpenseBreakdown {
  categories: Array<{
    name: string;
    value: number;
    color: string;
    percentage: number;
  }>;
  total: number;
}

export interface CashFlowData {
  period: string;
  chartData: Array<{
    date: string;
    inflow: number;
    outflow: number;
    netFlow: number;
  }>;
  summary: {
    totalInflow: number;
    totalOutflow: number;
    netCashFlow: number;
    openingBalance: number;
    closingBalance: number;
  };
}

export interface FinancialSummary {
  dateRange: {
    start: string;
    end: string;
  };
  revenue: {
    total: number;
    byProject: Array<{
      project: string;
      amount: number;
      percentage: number;
    }>;
  };
  expenses: {
    total: number;
    byCategory: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
  profitability: {
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
  };
  cashFlow: {
    operating: number;
    investing: number;
    financing: number;
    netChange: number;
  };
}

// ===== Common Types =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ExportResponse {
  downloadUrl: string;
  expiresAt: string;
}

export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: any;
}

import { apiClient } from "./api";

// Types based on the API specification
export interface FeeType {
  id: string;
  name: string;
  code: string;
  description?: string;
  defaultAmount: number;
  currency: string;
  frequency: "one-time" | "recurring" | "milestone-based";
  recurringInterval?: "monthly" | "quarterly" | "yearly";
  isActive: boolean;
  autoAssign: boolean;
  linkedToMilestones: boolean;
  applicableProjects: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Fee {
  id: string;
  feeTypeId: string;
  clientId: string;
  projectId: string;
  unitId?: string;
  amount: number;
  currency: string;
  status: "pending" | "partially_paid" | "paid" | "overdue" | "cancelled";
  dueDate: string;
  assignedDate: string;
  description?: string;
  totalPaid: number;
  outstandingBalance: number;
  paymentProgress: number;
  daysOverdue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  feeId: string;
  clientId: string;
  amount: number;
  currency: string;
  paymentMethod: "bank_transfer" | "pos" | "online" | "cash" | "check";
  reference: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  notes?: string;
  receiptUrl?: string;
  collectedBy: string;
  collectedAt: string;
  processingFee: number;
  netAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionSummary {
  totalFees: number;
  totalCollected: number;
  totalOutstanding: number;
  overdueAmount: number;
  overdueCount: number;
  collectionRate: number;
  currency: string;
}

export interface ProjectPerformance {
  projectId: string;
  projectName: string;
  totalFees: number;
  totalCollected: number;
  outstandingAmount: number;
  collectionRate: number;
  overdueAmount: number;
  overdueCount: number;
}

export interface OverdueReport {
  fees: Fee[];
  totalOverdue: number;
  totalAmount: number;
  averageDaysOverdue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Mock data for development/testing
const mockFeeTypes: FeeType[] = [
  {
    id: "ft_001",
    name: "Infrastructure Development Fee",
    code: "INFRA_FEE",
    description: "Fee for infrastructure development",
    defaultAmount: 5000000,
    currency: "NGN",
    frequency: "one-time",
    isActive: true,
    autoAssign: true,
    linkedToMilestones: false,
    applicableProjects: ["proj_001", "proj_002"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ft_002",
    name: "Service Charge",
    code: "SERVICE_CHARGE",
    description: "Monthly service charge",
    defaultAmount: 50000,
    currency: "NGN",
    frequency: "recurring",
    recurringInterval: "monthly",
    isActive: true,
    autoAssign: true,
    linkedToMilestones: false,
    applicableProjects: ["proj_001", "proj_002", "proj_003"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ft_003",
    name: "Survey Fee",
    code: "SURVEY_FEE",
    description: "One-time survey fee",
    defaultAmount: 250000,
    currency: "NGN",
    frequency: "one-time",
    isActive: true,
    autoAssign: false,
    linkedToMilestones: false,
    applicableProjects: ["proj_001"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const mockFees: Fee[] = [
  {
    id: "fee_001",
    feeTypeId: "ft_001",
    clientId: "client_001",
    projectId: "proj_001",
    unitId: "unit_001",
    amount: 5000000,
    currency: "NGN",
    status: "partially_paid",
    dueDate: "2024-02-15",
    assignedDate: "2024-01-01",
    description: "Infrastructure fee for Block A Plot 02",
    totalPaid: 2000000,
    outstandingBalance: 3000000,
    paymentProgress: 40,
    daysOverdue: 0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "fee_002",
    feeTypeId: "ft_002",
    clientId: "client_002",
    projectId: "proj_002",
    unitId: "unit_002",
    amount: 50000,
    currency: "NGN",
    status: "overdue",
    dueDate: "2024-01-30",
    assignedDate: "2024-01-01",
    description: "Monthly service charge for Block B Plot 12",
    totalPaid: 0,
    outstandingBalance: 50000,
    paymentProgress: 0,
    daysOverdue: 15,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "fee_003",
    feeTypeId: "ft_001",
    clientId: "client_003",
    projectId: "proj_003",
    unitId: "unit_003",
    amount: 4500000,
    currency: "NGN",
    status: "paid",
    dueDate: "2024-01-01",
    assignedDate: "2024-01-01",
    description: "Infrastructure fee for Block C Plot 05",
    totalPaid: 4500000,
    outstandingBalance: 0,
    paymentProgress: 100,
    daysOverdue: 0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const mockPayments: Payment[] = [
  {
    id: "pay_001",
    feeId: "fee_001",
    clientId: "client_001",
    amount: 2000000,
    currency: "NGN",
    paymentMethod: "bank_transfer",
    reference: "BANK_REF_001",
    transactionId: "TXN_12345",
    status: "completed",
    notes: "Partial payment for infrastructure fee",
    receiptUrl: "/receipts/pay_001.pdf",
    collectedBy: "admin_user",
    collectedAt: "2024-01-15T00:00:00Z",
    processingFee: 1000,
    netAmount: 1999000,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

// Configuration for development mode
const USE_MOCK_DATA = process.env.NODE_ENV === "development"; // Only use mock data in development

// Mock service implementations
const mockFeeTypesService = {
  async create(feeTypeData: Partial<FeeType>): Promise<ApiResponse<FeeType>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const newFeeType: FeeType = {
      id: `ft_${Date.now()}`,
      name: feeTypeData.name || "",
      code: feeTypeData.code || "",
      description: feeTypeData.description,
      defaultAmount: feeTypeData.defaultAmount || 0,
      currency: feeTypeData.currency || "NGN",
      frequency: feeTypeData.frequency || "one-time",
      recurringInterval: feeTypeData.recurringInterval,
      isActive: feeTypeData.isActive ?? true,
      autoAssign: feeTypeData.autoAssign ?? false,
      linkedToMilestones: feeTypeData.linkedToMilestones ?? false,
      applicableProjects: feeTypeData.applicableProjects || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockFeeTypes.push(newFeeType);

    return {
      success: true,
      message: "Fee type created successfully",
      data: newFeeType,
    };
  },

  async getAll(
    filters: any = {}
  ): Promise<ApiResponse<PaginatedResponse<FeeType>>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    let filteredData = [...mockFeeTypes];

    if (filters.isActive !== undefined) {
      filteredData = filteredData.filter(
        (ft) => ft.isActive === filters.isActive
      );
    }

    if (filters.search) {
      filteredData = filteredData.filter(
        (ft) =>
          ft.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          ft.code.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    const totalItems = filteredData.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      success: true,
      message: "Fee types retrieved successfully",
      data: {
        data: paginatedData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: limit,
        },
      },
    };
  },

  async getById(id: string): Promise<ApiResponse<FeeType>> {
    const feeType = mockFeeTypes.find((ft) => ft.id === id);
    if (!feeType) {
      return {
        success: false,
        message: "Fee type not found",
        data: null as any,
      };
    }

    return {
      success: true,
      message: "Fee type retrieved successfully",
      data: feeType,
    };
  },

  async update(
    id: string,
    updateData: Partial<FeeType>
  ): Promise<ApiResponse<FeeType>> {
    const index = mockFeeTypes.findIndex((ft) => ft.id === id);
    if (index === -1) {
      return {
        success: false,
        message: "Fee type not found",
        data: null as any,
      };
    }

    mockFeeTypes[index] = {
      ...mockFeeTypes[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Fee type updated successfully",
      data: mockFeeTypes[index],
    };
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const index = mockFeeTypes.findIndex((ft) => ft.id === id);
    if (index === -1) {
      return {
        success: false,
        message: "Fee type not found",
        data: null as any,
      };
    }

    mockFeeTypes.splice(index, 1);

    return {
      success: true,
      message: "Fee type deleted successfully",
      data: undefined,
    };
  },
};

const mockFeesService = {
  async create(feeData: Partial<Fee>): Promise<ApiResponse<Fee>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const newFee: Fee = {
      id: `fee_${Date.now()}`,
      feeTypeId: feeData.feeTypeId || "",
      clientId: feeData.clientId || "",
      projectId: feeData.projectId || "",
      unitId: feeData.unitId,
      amount: feeData.amount || 0,
      currency: feeData.currency || "NGN",
      status: feeData.status || "pending",
      dueDate: feeData.dueDate || new Date().toISOString().split("T")[0],
      assignedDate:
        feeData.assignedDate || new Date().toISOString().split("T")[0],
      description: feeData.description,
      totalPaid: feeData.totalPaid || 0,
      outstandingBalance: feeData.amount || 0,
      paymentProgress: 0,
      daysOverdue: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockFees.push(newFee);

    return {
      success: true,
      message: "Fee created successfully",
      data: newFee,
    };
  },

  async getAll(
    filters: any = {}
  ): Promise<ApiResponse<PaginatedResponse<Fee>>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    let filteredData = [...mockFees];

    if (filters.status) {
      filteredData = filteredData.filter(
        (fee) => fee.status === filters.status
      );
    }

    if (filters.search) {
      filteredData = filteredData.filter(
        (fee) =>
          fee.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          fee.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    const totalItems = filteredData.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      success: true,
      message: "Fees retrieved successfully",
      data: {
        data: paginatedData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: limit,
        },
      },
    };
  },

  async getById(id: string): Promise<ApiResponse<Fee>> {
    const fee = mockFees.find((f) => f.id === id);
    if (!fee) {
      return {
        success: false,
        message: "Fee not found",
        data: null as any,
      };
    }

    return {
      success: true,
      message: "Fee retrieved successfully",
      data: fee,
    };
  },

  async update(
    id: string,
    updateData: Partial<Fee>
  ): Promise<ApiResponse<Fee>> {
    const index = mockFees.findIndex((f) => f.id === id);
    if (index === -1) {
      return {
        success: false,
        message: "Fee not found",
        data: null as any,
      };
    }

    mockFees[index] = {
      ...mockFees[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Fee updated successfully",
      data: mockFees[index],
    };
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const index = mockFees.findIndex((f) => f.id === id);
    if (index === -1) {
      return {
        success: false,
        message: "Fee not found",
        data: null as any,
      };
    }

    mockFees.splice(index, 1);

    return {
      success: true,
      message: "Fee deleted successfully",
      data: undefined,
    };
  },

  async getClientFees(
    clientId: string,
    filters: {
      status?: string;
      projectId?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<PaginatedResponse<Fee>>> {
    let filteredData = mockFees.filter((fee) => fee.clientId === clientId);

    if (filters.status) {
      filteredData = filteredData.filter(
        (fee) => fee.status === filters.status
      );
    }

    const totalItems = filteredData.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      success: true,
      message: "Client fees retrieved successfully",
      data: {
        data: paginatedData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: limit,
        },
      },
    };
  },
};

const mockPaymentsService = {
  async record(paymentData: Partial<Payment>): Promise<ApiResponse<Payment>> {
    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      feeId: paymentData.feeId || "",
      clientId: paymentData.clientId || "",
      amount: paymentData.amount || 0,
      currency: paymentData.currency || "NGN",
      paymentMethod: paymentData.paymentMethod || "bank_transfer",
      reference: paymentData.reference || "",
      transactionId: paymentData.transactionId,
      status: paymentData.status || "pending",
      notes: paymentData.notes,
      receiptUrl: paymentData.receiptUrl,
      collectedBy: paymentData.collectedBy || "admin_user",
      collectedAt: paymentData.collectedAt || new Date().toISOString(),
      processingFee: paymentData.processingFee || 0,
      netAmount: (paymentData.amount || 0) - (paymentData.processingFee || 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPayments.push(newPayment);

    // Update the fee's payment status
    const feeIndex = mockFees.findIndex((f) => f.id === paymentData.feeId);
    if (feeIndex !== -1) {
      const fee = mockFees[feeIndex];
      const newTotalPaid = fee.totalPaid + (paymentData.amount || 0);
      const newOutstandingBalance = Math.max(0, fee.amount - newTotalPaid);
      const newStatus = newOutstandingBalance === 0 ? "paid" : "partially_paid";

      mockFees[feeIndex] = {
        ...fee,
        totalPaid: newTotalPaid,
        outstandingBalance: newOutstandingBalance,
        status: newStatus,
        paymentProgress: Math.round((newTotalPaid / fee.amount) * 100),
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      success: true,
      message: "Payment recorded successfully",
      data: newPayment,
    };
  },

  async updateStatus(
    paymentId: string,
    status: string,
    notes?: string
  ): Promise<ApiResponse<Payment>> {
    const index = mockPayments.findIndex((p) => p.id === paymentId);
    if (index === -1) {
      return {
        success: false,
        message: "Payment not found",
        data: null as any,
      };
    }

    mockPayments[index] = {
      ...mockPayments[index],
      status: status as any,
      notes: notes || mockPayments[index].notes,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Payment status updated successfully",
      data: mockPayments[index],
    };
  },

  async refund(
    paymentId: string,
    notes?: string
  ): Promise<ApiResponse<Payment>> {
    const index = mockPayments.findIndex((p) => p.id === paymentId);
    if (index === -1) {
      return {
        success: false,
        message: "Payment not found",
        data: null as any,
      };
    }

    mockPayments[index] = {
      ...mockPayments[index],
      status: "refunded",
      notes: notes || mockPayments[index].notes,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Payment refunded successfully",
      data: mockPayments[index],
    };
  },

  async getById(id: string): Promise<ApiResponse<Payment>> {
    const payment = mockPayments.find((p) => p.id === id);
    if (!payment) {
      return {
        success: false,
        message: "Payment not found",
        data: null as any,
      };
    }

    return {
      success: true,
      message: "Payment retrieved successfully",
      data: payment,
    };
  },

  async getAll(
    filters: any = {}
  ): Promise<ApiResponse<PaginatedResponse<Payment>>> {
    let filteredData = [...mockPayments];

    if (filters.status) {
      filteredData = filteredData.filter((p) => p.status === filters.status);
    }

    if (filters.feeId) {
      filteredData = filteredData.filter((p) => p.feeId === filters.feeId);
    }

    const totalItems = filteredData.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      success: true,
      message: "Payments retrieved successfully",
      data: {
        data: paginatedData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: limit,
        },
      },
    };
  },
};

const mockAnalyticsService = {
  async getCollectionSummary(
    filters: any = {}
  ): Promise<ApiResponse<CollectionSummary>> {
    const totalFees = mockFees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalCollected = mockFees.reduce(
      (sum, fee) => sum + fee.totalPaid,
      0
    );
    const totalOutstanding = mockFees.reduce(
      (sum, fee) => sum + fee.outstandingBalance,
      0
    );
    const overdueFees = mockFees.filter((fee) => fee.status === "overdue");
    const overdueAmount = overdueFees.reduce(
      (sum, fee) => sum + fee.outstandingBalance,
      0
    );
    const collectionRate =
      totalFees > 0 ? Math.round((totalCollected / totalFees) * 100) : 0;

    return {
      success: true,
      message: "Collection summary retrieved successfully",
      data: {
        totalFees,
        totalCollected,
        totalOutstanding,
        overdueAmount,
        overdueCount: overdueFees.length,
        collectionRate,
        currency: "NGN",
      },
    };
  },

  async getProjectPerformance(
    projectId: string,
    period: string = "monthly"
  ): Promise<ApiResponse<ProjectPerformance>> {
    const projectFees = mockFees.filter((fee) => fee.projectId === projectId);
    const totalFees = projectFees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalCollected = projectFees.reduce(
      (sum, fee) => sum + fee.totalPaid,
      0
    );
    const outstandingAmount = projectFees.reduce(
      (sum, fee) => sum + fee.outstandingBalance,
      0
    );
    const collectionRate =
      totalFees > 0 ? Math.round((totalCollected / totalFees) * 100) : 0;
    const overdueFees = projectFees.filter((fee) => fee.status === "overdue");
    const overdueAmount = overdueFees.reduce(
      (sum, fee) => sum + fee.outstandingBalance,
      0
    );

    return {
      success: true,
      message: "Project performance retrieved successfully",
      data: {
        projectId,
        projectName: `Project ${projectId}`,
        totalFees,
        totalCollected,
        outstandingAmount,
        collectionRate,
        overdueAmount,
        overdueCount: overdueFees.length,
      },
    };
  },

  async getOverdueReport(
    filters: any = {}
  ): Promise<ApiResponse<OverdueReport>> {
    let overdueFees = mockFees.filter((fee) => fee.status === "overdue");

    if (filters.projectId) {
      overdueFees = overdueFees.filter(
        (fee) => fee.projectId === filters.projectId
      );
    }

    if (filters.clientId) {
      overdueFees = overdueFees.filter(
        (fee) => fee.clientId === filters.clientId
      );
    }

    const totalAmount = overdueFees.reduce(
      (sum, fee) => sum + fee.outstandingBalance,
      0
    );
    const totalDaysOverdue = overdueFees.reduce(
      (sum, fee) => sum + fee.daysOverdue,
      0
    );
    const averageDaysOverdue =
      overdueFees.length > 0
        ? Math.round(totalDaysOverdue / overdueFees.length)
        : 0;

    return {
      success: true,
      message: "Overdue report retrieved successfully",
      data: {
        fees: overdueFees,
        totalOverdue: overdueFees.length,
        totalAmount,
        averageDaysOverdue,
      },
    };
  },
};

// Fee Types Management
export const feeTypesService = {
  async create(feeTypeData: Partial<FeeType>): Promise<ApiResponse<FeeType>> {
    const response = await apiClient.post(
      "/fee-collection/fee-types",
      feeTypeData
    );
    return response.data;
  },

  async getAll(
    filters: {
      isActive?: boolean;
      projectId?: string;
      frequency?: string;
      page?: number;
      limit?: number;
      search?: string;
    } = {}
  ): Promise<ApiResponse<PaginatedResponse<FeeType>>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(
      `/fee-collection/fee-types?${queryParams}`
    );
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<FeeType>> {
    const response = await apiClient.get(`/fee-collection/fee-types/${id}`);
    return response.data;
  },

  async update(
    id: string,
    updateData: Partial<FeeType>
  ): Promise<ApiResponse<FeeType>> {
    const response = await apiClient.put(
      `/fee-collection/fee-types/${id}`,
      updateData
    );
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/fee-collection/fee-types/${id}`);
    return response.data;
  },
};

// Fee Management
export const feesService = {
  async create(feeData: Partial<Fee>): Promise<ApiResponse<Fee>> {
    const response = await apiClient.post("/fee-collection/fees", feeData);
    return response.data;
  },

  async getAll(
    filters: {
      status?: string;
      projectId?: string;
      clientId?: string;
      dueDateFrom?: string;
      dueDateTo?: string;
      amountMin?: number;
      amountMax?: number;
      page?: number;
      limit?: number;
      search?: string;
    } = {}
  ): Promise<ApiResponse<PaginatedResponse<Fee>>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(`/fee-collection/fees?${queryParams}`);
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Fee>> {
    const response = await apiClient.get(`/fee-collection/fees/${id}`);
    return response.data;
  },

  async update(
    id: string,
    updateData: Partial<Fee>
  ): Promise<ApiResponse<Fee>> {
    const response = await apiClient.put(
      `/fee-collection/fees/${id}`,
      updateData
    );
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/fee-collection/fees/${id}`);
    return response.data;
  },

  async getClientFees(
    clientId: string,
    filters: {
      status?: string;
      projectId?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<PaginatedResponse<Fee>>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(
      `/fee-collection/clients/${clientId}/fees?${queryParams}`
    );
    return response.data;
  },
};

// Payment Management
export const paymentsService = {
  async record(paymentData: Partial<Payment>): Promise<ApiResponse<Payment>> {
    const response = await apiClient.post(
      "/fee-collection/payments",
      paymentData
    );
    return response.data;
  },

  async updateStatus(
    paymentId: string,
    status: string,
    notes?: string
  ): Promise<ApiResponse<Payment>> {
    const response = await apiClient.patch(
      `/fee-collection/payments/${paymentId}/status`,
      { status, notes }
    );
    return response.data;
  },

  async refund(
    paymentId: string,
    notes?: string
  ): Promise<ApiResponse<Payment>> {
    const response = await apiClient.post(
      `/fee-collection/payments/${paymentId}/refund`,
      { notes }
    );
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<Payment>> {
    const response = await apiClient.get(`/fee-collection/payments/${id}`);
    return response.data;
  },

  async getAll(
    filters: {
      status?: string;
      feeId?: string;
      clientId?: string;
      paymentMethod?: string;
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<PaginatedResponse<Payment>>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(
      `/fee-collection/payments?${queryParams}`
    );
    return response.data;
  },
};

// Analytics & Reporting
export const analyticsService = {
  async getCollectionSummary(
    filters: {
      dateFrom?: string;
      dateTo?: string;
      projectId?: string;
      clientId?: string;
    } = {}
  ): Promise<ApiResponse<CollectionSummary>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(
      `/fee-collection/analytics/collection-summary?${queryParams}`
    );
    return response.data;
  },

  async getProjectPerformance(
    projectId: string,
    period: "daily" | "weekly" | "monthly" | "yearly" = "monthly"
  ): Promise<ApiResponse<ProjectPerformance>> {
    const response = await apiClient.get(
      `/fee-collection/analytics/projects/${projectId}/performance?period=${period}`
    );
    return response.data;
  },

  async getOverdueReport(
    filters: {
      daysOverdue?: number;
      projectId?: string;
      clientId?: string;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<OverdueReport>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await apiClient.get(
      `/fee-collection/analytics/overdue-report?${queryParams}`
    );
    return response.data;
  },
};

// Enhanced error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    const apiError = error.response.data.error;
    switch (apiError.code) {
      case "VALIDATION_ERROR":
        return `Validation Error: ${apiError.message}`;
      case "NOT_FOUND":
        return `Resource not found: ${apiError.message}`;
      case "UNAUTHORIZED":
        return "Authentication required. Please log in again.";
      case "FORBIDDEN":
        return "You do not have permission to perform this action.";
      case "CONFLICT":
        return `Conflict: ${apiError.message}`;
      case "BUSINESS_RULE_VIOLATION":
        return `Business Rule Violation: ${apiError.message}`;
      default:
        return apiError.message || "An unexpected error occurred.";
    }
  }

  if (error.code === "NETWORK_ERROR") {
    return "Network error. Please check your connection and try again.";
  }

  return error.message || "An unexpected error occurred.";
};

// Main service export with fallback to mock data
export const feeCollectionService = {
  feeTypes: USE_MOCK_DATA ? mockFeeTypesService : feeTypesService,
  fees: USE_MOCK_DATA ? mockFeesService : feesService,
  payments: USE_MOCK_DATA ? mockPaymentsService : paymentsService,
  analytics: USE_MOCK_DATA ? mockAnalyticsService : analyticsService,
  handleError: handleApiError,
};

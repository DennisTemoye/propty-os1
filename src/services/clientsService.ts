import { apiService } from "./api";
import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";

// Types for clients
export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  idNumber?: string;
  passportNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  employment: {
    employer: string;
    position: string;
    salary: number;
    employmentType: "full-time" | "part-time" | "self-employed" | "unemployed";
  };
  status: "active" | "inactive" | "prospect" | "lead";
  source:
    | "website"
    | "referral"
    | "social-media"
    | "advertisement"
    | "walk-in"
    | "other";
  assignedMarketerId?: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  nationalId?: string;
  address: string;
  city: string;
  state: string;
  occupation?: string;
  employerBusiness?: string;
  referralSource: string;
  // Additional fields from the form
  gender?: string;
  maritalStatus?: string;
  idType?: string;
  nextOfKinName?: string;
  nextOfKinRelationship?: string;
  nextOfKinAddress?: string;
  nextOfKinEmail?: string;
  nextOfKinPhone?: string;
  clientType?: string;
  notes?: string;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  status?: "active" | "inactive" | "prospect" | "lead";
}

export interface ClientPayment {
  id: string;
  clientId: string;
  projectId: string;
  unitId?: string;
  amount: number;
  paymentMethod: "bank-transfer" | "cash" | "check" | "card" | "mobile-money";
  paymentType: "deposit" | "instalment" | "full-payment" | "fee";
  reference: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  dueDate?: string;
  paidDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientAllocation {
  id: string;
  clientId: string;
  projectId: string;
  unitId: string;
  marketerId: string;
  status: "pending" | "approved" | "rejected" | "expired";
  allocationDate: string;
  expiryDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientDocument {
  id: string;
  clientId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

export interface ClientFilters {
  status?: string;
  source?: string;
  assignedMarketerId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Clients service class
export class ClientsService {
  // Get all clients with pagination and filters
  static async getClients(filters?: ClientFilters) {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `${API_ENDPOINTS.CLIENTS.BASE}?${queryString}`
      : API_ENDPOINTS.CLIENTS.BASE;

    return await apiService.get<PaginatedResponse<Client>>(url);
  }

  // Get client by ID
  static async getClient(id: string) {
    return await apiService.get<Client>(API_ENDPOINTS.CLIENTS.DETAILS(id));
  }

  // Create new client
  static async createClient(data: CreateClientData) {
    return await apiService.post<Client>(API_ENDPOINTS.CLIENTS.BASE, data);
  }

  // Update client
  static async updateClient(id: string, data: UpdateClientData) {
    return await apiService.put<Client>(
      API_ENDPOINTS.CLIENTS.DETAILS(id),
      data
    );
  }

  // Delete client
  static async deleteClient(id: string) {
    return await apiService.delete(API_ENDPOINTS.CLIENTS.DETAILS(id));
  }

  // Get client payments
  static async getClientPayments(clientId: string) {
    return await apiService.get<ClientPayment[]>(
      API_ENDPOINTS.CLIENTS.PAYMENTS(clientId)
    );
  }

  // Add client payment
  static async addClientPayment(
    clientId: string,
    paymentData: Omit<
      ClientPayment,
      "id" | "clientId" | "createdAt" | "updatedAt"
    >
  ) {
    return await apiService.post<ClientPayment>(
      API_ENDPOINTS.CLIENTS.PAYMENTS(clientId),
      paymentData
    );
  }

  // Update client payment
  static async updateClientPayment(
    clientId: string,
    paymentId: string,
    paymentData: Partial<ClientPayment>
  ) {
    return await apiService.put<ClientPayment>(
      `${API_ENDPOINTS.CLIENTS.PAYMENTS(clientId)}/${paymentId}`,
      paymentData
    );
  }

  // Delete client payment
  static async deleteClientPayment(clientId: string, paymentId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.CLIENTS.PAYMENTS(clientId)}/${paymentId}`
    );
  }

  // Get client allocations
  static async getClientAllocations(clientId: string) {
    return await apiService.get<ClientAllocation[]>(
      API_ENDPOINTS.CLIENTS.ALLOCATIONS(clientId)
    );
  }

  // Add client allocation
  static async addClientAllocation(
    clientId: string,
    allocationData: Omit<
      ClientAllocation,
      "id" | "clientId" | "createdAt" | "updatedAt"
    >
  ) {
    return await apiService.post<ClientAllocation>(
      API_ENDPOINTS.CLIENTS.ALLOCATIONS(clientId),
      allocationData
    );
  }

  // Update client allocation
  static async updateClientAllocation(
    clientId: string,
    allocationId: string,
    allocationData: Partial<ClientAllocation>
  ) {
    return await apiService.put<ClientAllocation>(
      `${API_ENDPOINTS.CLIENTS.ALLOCATIONS(clientId)}/${allocationId}`,
      allocationData
    );
  }

  // Delete client allocation
  static async deleteClientAllocation(clientId: string, allocationId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.CLIENTS.ALLOCATIONS(clientId)}/${allocationId}`
    );
  }

  // Get client documents
  static async getClientDocuments(clientId: string) {
    return await apiService.get<ClientDocument[]>(
      API_ENDPOINTS.CLIENTS.DOCUMENTS(clientId)
    );
  }

  // Upload client document
  static async uploadClientDocument(
    clientId: string,
    file: File,
    onProgress?: (progress: number) => void
  ) {
    return await apiService.upload<ClientDocument>(
      `${API_ENDPOINTS.CLIENTS.DOCUMENTS(clientId)}/upload`,
      file,
      onProgress
    );
  }

  // Delete client document
  static async deleteClientDocument(clientId: string, documentId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.CLIENTS.DOCUMENTS(clientId)}/${documentId}`
    );
  }

  // Download client document
  static async downloadClientDocument(
    clientId: string,
    documentId: string,
    filename?: string
  ) {
    return await apiService.download(
      `${API_ENDPOINTS.CLIENTS.DOCUMENTS(clientId)}/${documentId}/download`,
      filename
    );
  }

  // Get client statement
  static async getClientStatement(
    clientId: string,
    fromDate?: string,
    toDate?: string
  ) {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    const queryString = params.toString();
    const url = queryString
      ? `${API_ENDPOINTS.CLIENTS.DETAILS(clientId)}/statement?${queryString}`
      : `${API_ENDPOINTS.CLIENTS.DETAILS(clientId)}/statement`;

    return await apiService.get(url);
  }

  // Export client statement
  static async exportClientStatement(
    clientId: string,
    format: "pdf" | "excel" | "csv" = "pdf",
    fromDate?: string,
    toDate?: string
  ) {
    const params = new URLSearchParams();
    params.append("format", format);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    return await apiService.download(
      `${API_ENDPOINTS.CLIENTS.DETAILS(
        clientId
      )}/statement/export?${params.toString()}`,
      `client-statement-${clientId}.${format}`
    );
  }

  // Get client statistics
  static async getClientStats(clientId: string) {
    return await apiService.get(
      `${API_ENDPOINTS.CLIENTS.DETAILS(clientId)}/stats`
    );
  }

  // Assign marketer to client
  static async assignMarketer(clientId: string, marketerId: string) {
    return await apiService.put(
      `${API_ENDPOINTS.CLIENTS.DETAILS(clientId)}/assign-marketer`,
      { marketerId }
    );
  }

  // Remove marketer assignment from client
  static async removeMarketerAssignment(clientId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.CLIENTS.DETAILS(clientId)}/assign-marketer`
    );
  }

  // Bulk import clients
  static async bulkImportClients(
    file: File,
    onProgress?: (progress: number) => void
  ) {
    return await apiService.upload(
      `${API_ENDPOINTS.CLIENTS.BASE}/bulk-import`,
      file,
      onProgress
    );
  }

  // Export clients
  static async exportClients(
    format: "pdf" | "excel" | "csv" = "excel",
    filters?: ClientFilters
  ) {
    const params = new URLSearchParams();
    params.append("format", format);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    return await apiService.download(
      `${API_ENDPOINTS.CLIENTS.BASE}/export?${params.toString()}`,
      `clients-export.${format}`
    );
  }
}

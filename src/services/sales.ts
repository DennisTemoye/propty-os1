import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";
import { apiService } from "./api";

export interface Sale {
  id: string;
  clientId: string;
  projectId: string;
  unitId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// New interfaces based on the actual API response
export interface SalesApiResponse {
  data: {
    sales: SaleRecord[];
    totalSalesValue: number;
    allocatedPlots: number;
  };
  message: string;
  success: boolean;
  statusCode: number;
}

export interface SaleRecord {
  _id: string;
  projectId: {
    _id: string;
    projectName: string;
    location: string;
  };
  clientId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  marketerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  unitNumber: string;
  saleAmount: number;
  initialPayment: number;
  saleDate: string;
  paymentMethod: string;
  notes: string;
  __v: number;
}

export class SalesService {
  // Record a sale
  static async recordSale(data: Sale) {
    return await apiService.post<Sale>(API_ENDPOINTS.SALES.BASE, data);
  }

  // Get all sales with pagination and filters
  static async getSales(filters?: SaleFilters) {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (typeof value === "object") {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined && subValue !== null) {
                params.append(`${key}[${subKey}]`, subValue.toString());
              }
            });
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `${API_ENDPOINTS.SALES.BASE}?${queryString}`
      : API_ENDPOINTS.SALES.BASE;

    return await apiService.get<SalesApiResponse>(url);
  }

  // Get a sale by ID
  static async getSale(id: string) {
    return await apiService.get<Sale>(API_ENDPOINTS.SALES.RECORD_SALE(id));
  }

  // New method to fetch sales data with the actual API structure
  static async getSalesData() {
    return await apiService.get<SalesApiResponse["data"]>(
      API_ENDPOINTS.SALES.BASE
    );
  }
}

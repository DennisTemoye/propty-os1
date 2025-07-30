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

    return await apiService.get<PaginatedResponse<Sale>>(url);
  }

  // Get a sale by ID
  static async getSale(id: string) {
    return await apiService.get<Sale>(API_ENDPOINTS.SALES.RECORD_SALE(id));
  }
}

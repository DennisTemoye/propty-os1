import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";
import { apiService } from "./api";

export interface Commission {
  id: string;
  clientId: string;
  projectId: string;
  unitId: string;
  marketerId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class CommissionService {
  // Get all clients with pagination and filters
  static async getCommissions(filters?: any) {
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
      ? `${API_ENDPOINTS.COMMISSIONS.BASE}?${queryString}`
      : API_ENDPOINTS.COMMISSIONS.BASE;

    return await apiService.get<PaginatedResponse<Commission>>(url);
  }
}

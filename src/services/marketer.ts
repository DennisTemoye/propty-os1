import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";
import { apiService } from "./api";

export interface Sale {
  _id: string;
  projectId: string | null;
  clientId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  marketerId: string;
  unitNumber: string;
  saleAmount: number;
  initialPayment: number;
  saleDate: string;
  paymentMethod: string;
  notes: string;
  __v: number;
}

export interface SalesData {
  totalSales: number;
  totalAmount: number;
  commission: number;
  recentSales: Sale[];
}

export interface Marketer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  projects: string[];
  commissionType: string;
  commissionRate: number;
  startDate: string;
  notes: string;
  paid: boolean;
  status: string;
  __v: number;
  salesData: SalesData;
}

export interface MarketerFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface MarketerResponse {
  data: {
    data: Marketer;
    message: string;
  };
  success: boolean;
  statusCode: number;
}

export class MarketerService {
  // Get all clients with pagination and filters
  static async getMarketers(filters?: MarketerFilters) {
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
      ? `${API_ENDPOINTS.MARKETERS.BASE}?${queryString}`
      : API_ENDPOINTS.MARKETERS.BASE;

    return await apiService.get<PaginatedResponse<Marketer>>(url);
  }

  static async getMarketer(marketerId: string) {
    return await apiService.get<MarketerResponse>(
      `${API_ENDPOINTS.MARKETERS.DETAILS(marketerId)}`
    );
  }

  static async createMarketer(data: any) {
    return await apiService.post<any>(API_ENDPOINTS.MARKETERS.BASE, data);
  }
}

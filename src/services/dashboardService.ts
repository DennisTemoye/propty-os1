import { API_ENDPOINTS } from "@/constants/api";
import { apiService } from "./api";

export class DashboardService {
  static async getDashboardOverview() {
    return await apiService.get(API_ENDPOINTS.DASHBOARD.OVERVIEW);
  }
}

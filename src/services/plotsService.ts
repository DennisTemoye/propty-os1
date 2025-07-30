import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";
import { apiService } from "./api";
import { Plot } from "@/types/plot";

export class PlotsService {
  static async getPlots() {
    return await apiService.get<PaginatedResponse<Plot>>(
      API_ENDPOINTS.PLOTS.BASE
    );
  }

  static async getPlotsByProjectId(projectId: string) {
    return await apiService.get<PaginatedResponse<Plot>>(
      API_ENDPOINTS.PLOTS.PROJECT(projectId)
    );
  }
}

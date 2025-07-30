import { API_ENDPOINTS } from "@/constants/api";
import { apiService } from "./api";

export class AllocationService {
  static async createAllocation(data: any) {
    const response = await apiService.post<any>(
      API_ENDPOINTS.PLOT_ALLOCATIONS.BASE,
      data
    );
    return response.data;
  }
  //get all allocations
  static async getAllAllocations() {
    const response = await apiService.get<any>(
      API_ENDPOINTS.PLOT_ALLOCATIONS.BASE
    );
    return response.data;
  }
  //reallocate plot
  static async reallocatePlot(data: any) {
    const response = await apiService.put<any>(
      API_ENDPOINTS.PLOT_ALLOCATIONS.REALLOCATE(data.currentAllocationId),
      data
    );
    return response.data;
  }
}

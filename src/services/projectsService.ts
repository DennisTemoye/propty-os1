import { apiService } from "./api";
import { API_ENDPOINTS, PaginatedResponse } from "@/constants/api";
import {
  CreateProjectData,
  Project,
  ProjectResponse,
  ProjectSearchParams,
  UpdateProjectData,
  ProjectDocument,
  Block,
  Unit,
  ProjectUnit,
  ProjectBlock,
} from "../types/project";

export interface ProjectFilters {
  status?: string;
  type?: string;
  location?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  search?: string;
  page?: number;
  limit?: number;
}

// Projects service class
export class ProjectsService {
  // Get all projects with pagination and filters
  static async getProjects(filters?: ProjectFilters) {
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
      ? `${API_ENDPOINTS.PROJECTS.BASE}?${queryString}`
      : API_ENDPOINTS.PROJECTS.BASE;

    return await apiService.get<PaginatedResponse<Project>>(url);
  }

  // Get project by ID
  static async getProject(id: string) {
    return await apiService.get<Project>(API_ENDPOINTS.PROJECTS.DETAILS(id));
  }

  // Create new project
  static async createProject(data: CreateProjectData) {
    return await apiService.post<Project>(API_ENDPOINTS.PROJECTS.BASE, data);
  }

  // Update project
  static async updateProject(id: string, data: UpdateProjectData) {
    return await apiService.put<Project>(
      API_ENDPOINTS.PROJECTS.DETAILS(id),
      data
    );
  }

  // Delete project
  static async deleteProject(id: string) {
    return await apiService.delete(API_ENDPOINTS.PROJECTS.DETAILS(id));
  }

  // Get project units
  static async getProjectUnits(projectId: string) {
    return await apiService.get<ProjectUnit[]>(
      API_ENDPOINTS.PROJECTS.UNITS(projectId)
    );
  }

  // Add unit to project
  static async addProjectUnit(
    projectId: string,
    unitData: Omit<ProjectUnit, "id" | "projectId" | "createdAt" | "updatedAt">
  ) {
    return await apiService.post<ProjectUnit>(
      API_ENDPOINTS.PROJECTS.UNITS(projectId),
      unitData
    );
  }

  // Update project unit
  static async updateProjectUnit(
    projectId: string,
    unitId: string,
    unitData: Partial<ProjectUnit>
  ) {
    return await apiService.put<ProjectUnit>(
      `${API_ENDPOINTS.PROJECTS.UNITS(projectId)}/${unitId}`,
      unitData
    );
  }

  // Delete project unit
  static async deleteProjectUnit(projectId: string, unitId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.PROJECTS.UNITS(projectId)}/${unitId}`
    );
  }

  // Get project blocks
  static async getProjectBlocks(projectId: string) {
    return await apiService.get<ProjectBlock[]>(
      API_ENDPOINTS.PROJECTS.BLOCKS(projectId)
    );
  }

  // Add block to project
  static async addProjectBlock(
    projectId: string,
    blockData: Omit<
      ProjectBlock,
      "id" | "projectId" | "createdAt" | "updatedAt"
    >
  ) {
    return await apiService.post<ProjectBlock>(
      API_ENDPOINTS.PROJECTS.BLOCKS(projectId),
      blockData
    );
  }

  // Update project block
  static async updateProjectBlock(
    projectId: string,
    blockId: string,
    blockData: Partial<ProjectBlock>
  ) {
    return await apiService.put<ProjectBlock>(
      `${API_ENDPOINTS.PROJECTS.BLOCKS(projectId)}/${blockId}`,
      blockData
    );
  }

  // Delete project block
  static async deleteProjectBlock(projectId: string, blockId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.PROJECTS.BLOCKS(projectId)}/${blockId}`
    );
  }

  // Get project documents
  static async getProjectDocuments(projectId: string) {
    return await apiService.get<ProjectDocument[]>(
      API_ENDPOINTS.PROJECTS.DOCUMENTS(projectId)
    );
  }

  // Upload project document
  static async uploadProjectDocument(
    projectId: string,
    file: File,
    onProgress?: (progress: number) => void
  ) {
    return await apiService.upload<ProjectDocument>(
      `${API_ENDPOINTS.PROJECTS.DOCUMENTS(projectId)}/upload`,
      file,
      onProgress
    );
  }

  // Delete project document
  static async deleteProjectDocument(projectId: string, documentId: string) {
    return await apiService.delete(
      `${API_ENDPOINTS.PROJECTS.DOCUMENTS(projectId)}/${documentId}`
    );
  }

  // Download project document
  static async downloadProjectDocument(
    projectId: string,
    documentId: string,
    filename?: string
  ) {
    return await apiService.download(
      `${API_ENDPOINTS.PROJECTS.DOCUMENTS(projectId)}/${documentId}/download`,
      filename
    );
  }

  // Get project sales history
  static async getProjectSales(projectId: string) {
    return await apiService.get(API_ENDPOINTS.PROJECTS.SALES(projectId));
  }

  // Get project statistics
  static async getProjectsStats() {
    return await apiService.get(API_ENDPOINTS.PROJECTS.BASE + "/stats");
  }

  // Get project statistics by ID
  static async getProjectStats(projectId: string) {
    return await apiService.get(
      `${API_ENDPOINTS.PROJECTS.DETAILS(projectId)}/stats`
    );
  }

  // Bulk update project units
  static async bulkUpdateUnits(
    projectId: string,
    units: Array<{ id: string; data: Partial<ProjectUnit> }>
  ) {
    return await apiService.put(
      `${API_ENDPOINTS.PROJECTS.UNITS(projectId)}/bulk`,
      { units }
    );
  }

  // Export project data
  static async exportProject(
    projectId: string,
    format: "pdf" | "excel" | "csv" = "excel"
  ) {
    return await apiService.download(
      `${API_ENDPOINTS.PROJECTS.DETAILS(projectId)}/export?format=${format}`,
      `project-${projectId}.${format}`
    );
  }
}

// Roles Service for Teams and Roles Management

import { apiService } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  Role,
  CreateRoleData,
  UpdateRoleData,
  RoleWithMetadata,
  GetRolesOptions,
  RoleFilter,
  RoleSearchResult,
  RoleTemplate,
  DuplicateRoleData,
  RoleComparison,
  RoleHierarchy,
  RoleUsageStats,
  RoleValidationResult,
  RoleExportData,
  RoleImportValidation,
  DefaultRoleConfig,
  RolePermissionSummary,
} from '@/types/roles';

export class RolesService {
  /**
   * Get all roles for a company
   */
  static async getRoles(
    companyId: string,
    options?: GetRolesOptions
  ): Promise<Role[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (options?.includeInactive !== undefined) {
        queryParams.append('includeInactive', options.includeInactive.toString());
      }
      if (options?.includeDefault !== undefined) {
        queryParams.append('includeDefault', options.includeDefault.toString());
      }
      if (options?.level) {
        queryParams.append('level', options.level);
      }
      if (options?.search) {
        queryParams.append('search', options.search);
      }
      if (options?.page) {
        queryParams.append('page', options.page.toString());
      }
      if (options?.limit) {
        queryParams.append('limit', options.limit.toString());
      }
      if (options?.sortBy) {
        queryParams.append('sortBy', options.sortBy);
      }
      if (options?.sortOrder) {
        queryParams.append('sortOrder', options.sortOrder);
      }

      const endpoint = `${API_ENDPOINTS.ROLES.BASE(companyId)}?${queryParams.toString()}`;
      const response = await apiService.get<Role[]>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch roles');
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  /**
   * Get a specific role by ID
   */
  static async getRoleById(
    roleId: string,
    companyId: string
  ): Promise<Role | null> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.DETAILS(companyId, roleId);
      const response = await apiService.get<Role>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      if (response.success === false && response.message?.includes('not found')) {
        return null;
      }
      
      throw new Error(response.message || 'Failed to fetch role');
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }

  /**
   * Create a new role
   */
  static async createRole(
    roleData: CreateRoleData,
    companyId: string
  ): Promise<Role> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.BASE(companyId);
      const response = await apiService.post<Role>(endpoint, roleData);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to create role');
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  /**
   * Update an existing role
   */
  static async updateRole(
    roleId: string,
    updates: UpdateRoleData,
    companyId: string
  ): Promise<Role> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.DETAILS(companyId, roleId);
      const response = await apiService.put<Role>(endpoint, updates);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update role');
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  /**
   * Delete a role
   */
  static async deleteRole(
    roleId: string,
    companyId: string
  ): Promise<void> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.DETAILS(companyId, roleId);
      const response = await apiService.delete(endpoint);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }

  /**
   * Get default roles for a company
   */
  static async getDefaultRoles(companyId: string): Promise<Role[]> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.DEFAULT(companyId);
      const response = await apiService.get<Role[]>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch default roles');
    } catch (error) {
      console.error('Error fetching default roles:', error);
      throw error;
    }
  }

  /**
   * Get role templates
   */
  static async getRoleTemplates(companyId: string): Promise<RoleTemplate[]> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.TEMPLATES(companyId);
      const response = await apiService.get<RoleTemplate[]>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch role templates');
    } catch (error) {
      console.error('Error fetching role templates:', error);
      throw error;
    }
  }

  /**
   * Duplicate an existing role
   */
  static async duplicateRole(
    duplicateData: DuplicateRoleData,
    companyId: string
  ): Promise<Role> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.DUPLICATE(companyId, duplicateData.sourceRoleId);
      const response = await apiService.post<Role>(endpoint, duplicateData);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to duplicate role');
    } catch (error) {
      console.error('Error duplicating role:', error);
      throw error;
    }
  }

  /**
   * Update role permissions
   */
  static async updateRolePermissions(
    roleId: string,
    permissions: any,
    companyId: string
  ): Promise<Role> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.PERMISSIONS(companyId, roleId);
      const response = await apiService.put<Role>(endpoint, { permissions });
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update role permissions');
    } catch (error) {
      console.error('Error updating role permissions:', error);
      throw error;
    }
  }

  /**
   * Get role usage statistics
   */
  static async getRoleUsageStats(
    roleId: string,
    companyId: string
  ): Promise<RoleUsageStats> {
    try {
      const endpoint = API_ENDPOINTS.ROLES.USAGE_STATS(companyId, roleId);
      const response = await apiService.get<RoleUsageStats>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch role usage stats');
    } catch (error) {
      console.error('Error fetching role usage stats:', error);
      throw error;
    }
  }

  /**
   * Search roles with advanced filtering
   */
  static async searchRoles(
    filter: RoleFilter,
    options?: GetRolesOptions
  ): Promise<RoleSearchResult> {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filter parameters
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
      
      // Add options parameters
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `${API_ENDPOINTS.ROLES.BASE(filter.companyId)}/search?${queryParams.toString()}`;
      const response = await apiService.get<RoleSearchResult>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to search roles');
    } catch (error) {
      console.error('Error searching roles:', error);
      throw error;
    }
  }

  /**
   * Validate role data
   */
  static async validateRole(roleData: CreateRoleData | UpdateRoleData): Promise<RoleValidationResult> {
    try {
      // Basic validation logic
      const errors: string[] = [];
      const warnings: string[] = [];
      const suggestions: string[] = [];

      if ('name' in roleData && (!roleData.name || roleData.name.trim().length === 0)) {
        errors.push('Role name is required');
      }

      if ('name' in roleData && roleData.name && roleData.name.length > 100) {
        errors.push('Role name must be less than 100 characters');
      }

      if ('description' in roleData && roleData.description && roleData.description.length > 500) {
        warnings.push('Role description is quite long');
      }

      if ('level' in roleData && roleData.level === 'admin') {
        suggestions.push('Admin roles should have comprehensive permissions');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions,
      };
    } catch (error) {
      console.error('Error validating role:', error);
      return {
        isValid: false,
        errors: ['Validation failed due to system error'],
        warnings: [],
        suggestions: [],
      };
    }
  }

  /**
   * Export roles data
   */
  static async exportRoles(
    companyId: string,
    format: 'json' | 'csv' = 'json'
  ): Promise<RoleExportData> {
    try {
      const endpoint = `${API_ENDPOINTS.ROLES.BASE(companyId)}/export?format=${format}`;
      const response = await apiService.get<RoleExportData>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to export roles');
    } catch (error) {
      console.error('Error exporting roles:', error);
      throw error;
    }
  }

  /**
   * Initialize default roles for a company
   */
  static async initializeDefaultRoles(companyId: string): Promise<Role[]> {
    try {
      const endpoint = `${API_ENDPOINTS.ROLES.BASE(companyId)}/initialize-defaults`;
      const response = await apiService.post<Role[]>(endpoint);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to initialize default roles');
    } catch (error) {
      console.error('Error initializing default roles:', error);
      throw error;
    }
  }
}


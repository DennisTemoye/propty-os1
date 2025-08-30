// Permissions Service for Teams and Roles Management

import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  PermissionValidationRequest,
  PermissionValidationResponse,
  UserPermissions,
  ModuleAccessCheck,
  PermissionSummary,
  PermissionChangeRequest,
  BulkPermissionUpdate,
  PermissionTemplate,
  PermissionInheritance,
  PermissionAuditLog,
} from "@/types/permissions";

export class PermissionsService {
  /**
   * Validate if a user has permission for a specific action
   */
  static async validatePermission(
    request: PermissionValidationRequest
  ): Promise<PermissionValidationResponse> {
    try {
      const endpoint = API_ENDPOINTS.PERMISSIONS.VALIDATE;
      const response = await apiService.post<PermissionValidationResponse>(
        endpoint,
        request
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to validate permission");
    } catch (error) {
      console.error("Error validating permission:", error);
      throw error;
    }
  }

  /**
   * Get user permissions for all modules
   */
  static async getUserPermissions(): Promise<UserPermissions> {
    try {
      const endpoint = API_ENDPOINTS.PERMISSIONS.USER_PERMISSIONS;
      const response = await apiService.get<UserPermissions>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch user permissions");
    } catch (error) {
      console.error("Error fetching user permissions:", error);
      throw error;
    }
  }

  /**
   * Check if user has access to a specific module
   */
  static async checkModuleAccess(module: string): Promise<ModuleAccessCheck> {
    try {
      const endpoint = API_ENDPOINTS.PERMISSIONS.MODULE_ACCESS(module);
      const response = await apiService.get<ModuleAccessCheck>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to check module access");
    } catch (error) {
      console.error("Error checking module access:", error);
      throw error;
    }
  }

  /**
   * Bulk validate permissions for multiple requests
   */
  static async bulkValidatePermissions(
    requests: PermissionValidationRequest[]
  ): Promise<PermissionValidationResponse[]> {
    try {
      const endpoint = API_ENDPOINTS.PERMISSIONS.BULK_VALIDATE;
      const response = await apiService.post<PermissionValidationResponse[]>(
        endpoint,
        { requests }
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to bulk validate permissions"
      );
    } catch (error) {
      console.error("Error bulk validating permissions:", error);
      throw error;
    }
  }

  /**
   * Get permission summary for the current user
   */
  static async getPermissionSummary(): Promise<PermissionSummary> {
    try {
      const endpoint = API_ENDPOINTS.PERMISSIONS.PERMISSION_SUMMARY;
      const response = await apiService.get<PermissionSummary>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch permission summary");
    } catch (error) {
      console.error("Error fetching permission summary:", error);
      throw error;
    }
  }

  /**
   * Check if user can perform a specific action (convenience method)
   */
  static async can(
    module: string,
    action: "view" | "create" | "edit" | "delete",
    entityId?: string
  ): Promise<boolean> {
    try {
      const companyId = this.getCurrentCompanyId();
      if (!companyId) {
        return false;
      }

      const request: PermissionValidationRequest = {
        module: module as any,
        action,
        entityId,
        companyId,
      };

      const response = await this.validatePermission(request);
      return response.hasPermission;
    } catch (error) {
      console.error("Error checking permission:", error);
      return false;
    }
  }

  /**
   * Check if user can view a module
   */
  static async canView(module: string): Promise<boolean> {
    return this.can(module, "view");
  }

  /**
   * Check if user can create in a module
   */
  static async canCreate(module: string): Promise<boolean> {
    return this.can(module, "create");
  }

  /**
   * Check if user can edit in a module
   */
  static async canEdit(module: string): Promise<boolean> {
    return this.can(module, "edit");
  }

  /**
   * Check if user can delete in a module
   */
  static async canDelete(module: string): Promise<boolean> {
    return this.can(module, "delete");
  }

  /**
   * Get current user's company ID from context
   */
  private static getCurrentCompanyId(): string | null {
    try {
      // Try to get from localStorage or context
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.companyId || user.businessName || null;
    } catch (error) {
      console.error("Error getting company ID:", error);
      return null;
    }
  }

  /**
   * Check if user has any permissions for a module
   */
  static async hasAnyPermission(module: string): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      const modulePermissions =
        permissions.permissions[module as keyof typeof permissions.permissions];

      if (!modulePermissions) {
        return false;
      }

      return (
        modulePermissions.view ||
        modulePermissions.create ||
        modulePermissions.edit ||
        modulePermissions.delete
      );
    } catch (error) {
      console.error("Error checking module permissions:", error);
      return false;
    }
  }

  /**
   * Get all accessible modules for the current user
   */
  static async getAccessibleModules(): Promise<string[]> {
    try {
      const permissions = await this.getUserPermissions();
      const accessibleModules: string[] = [];

      Object.entries(permissions.permissions).forEach(
        ([module, modulePermissions]) => {
          if (
            modulePermissions.view ||
            modulePermissions.create ||
            modulePermissions.edit ||
            modulePermissions.delete
          ) {
            accessibleModules.push(module);
          }
        }
      );

      return accessibleModules;
    } catch (error) {
      console.error("Error getting accessible modules:", error);
      return [];
    }
  }

  /**
   * Check if user has admin-level permissions
   */
  static async isAdmin(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      return permissions.roleLevel === "admin";
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  /**
   * Check if user has manager-level permissions
   */
  static async isManager(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();
      return (
        permissions.roleLevel === "manager" || permissions.roleLevel === "admin"
      );
    } catch (error) {
      console.error("Error checking manager status:", error);
      return false;
    }
  }

  /**
   * Get permission level for a specific module
   */
  static async getModulePermissionLevel(module: string): Promise<{
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  } | null> {
    try {
      const permissions = await this.getUserPermissions();
      const modulePermissions =
        permissions.permissions[module as keyof typeof permissions.permissions];

      if (!modulePermissions) {
        return null;
      }

      return modulePermissions;
    } catch (error) {
      console.error("Error getting module permission level:", error);
      return null;
    }
  }

  /**
   * Check if user has elevated permissions for sensitive operations
   */
  static async hasElevatedPermissions(): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions();

      // Check if user has admin or manager role
      if (
        permissions.roleLevel === "admin" ||
        permissions.roleLevel === "manager"
      ) {
        return true;
      }

      // Check if user has create/edit/delete permissions in sensitive modules
      const sensitiveModules = ["settings", "accounting", "reports", "users"];
      for (const module of sensitiveModules) {
        const modulePermissions =
          permissions.permissions[
            module as keyof typeof permissions.permissions
          ];
        if (
          modulePermissions &&
          (modulePermissions.create ||
            modulePermissions.edit ||
            modulePermissions.delete)
        ) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error checking elevated permissions:", error);
      return false;
    }
  }

  /**
   * Validate permissions for a specific company context
   */
  static async validateCompanyPermissions(
    companyId: string,
    module: string,
    action: "view" | "create" | "edit" | "delete"
  ): Promise<boolean> {
    try {
      const request: PermissionValidationRequest = {
        module: module as any,
        action,
        companyId,
      };

      const response = await this.validatePermission(request);
      return response.hasPermission;
    } catch (error) {
      console.error("Error validating company permissions:", error);
      return false;
    }
  }

  /**
   * Get permission audit log for the current user
   */
  static async getPermissionAuditLog(): Promise<PermissionAuditLog[]> {
    try {
      const companyId = this.getCurrentCompanyId();
      if (!companyId) {
        return [];
      }

      const endpoint = `${API_ENDPOINTS.ROLE_ASSIGNMENTS.BASE(
        companyId
      )}/permission-audit`;
      const response = await apiService.get<PermissionAuditLog[]>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error("Error fetching permission audit log:", error);
      return [];
    }
  }
}

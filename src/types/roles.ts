// Role Management Types for Teams and Roles Management

import { ModulePermissions } from "./permissions";

// Role level hierarchy
export type RoleLevel = "admin" | "manager" | "user" | "custom";

// Role status
export type RoleStatus = "active" | "inactive" | "archived";

// Base role interface
export interface Role {
  id: string;
  name: string;
  description: string;
  level: RoleLevel;
  permissions: ModulePermissions;
  businessName: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

// Role creation data
export interface CreateRoleData {
  name: string;
  description: string;
  level: RoleLevel;
  permissions: ModulePermissions;
  isDefault?: boolean;
}

// Role update data
export interface UpdateRoleData {
  name?: string;
  description?: string;
  level?: RoleLevel;
  permissions?: Partial<ModulePermissions>;
  isActive?: boolean;
}

// Role with additional metadata
export interface RoleWithMetadata extends Role {
  userCount: number;
  lastModified: string;
  modifiedBy: string;
  permissionCount: number;
}

// Role list options
export interface GetRolesOptions {
  includeInactive?: boolean;
  includeDefault?: boolean;
  level?: RoleLevel;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "level" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

// Role filter criteria
export interface RoleFilter {
  businessName: string;
  isActive?: boolean;
  isDefault?: boolean;
  level?: RoleLevel;
  search?: string;
  hasPermissions?: string[];
  createdAfter?: string;
  createdBefore?: string;
}

// Role search result
export interface RoleSearchResult {
  roles: RoleWithMetadata[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Role template for quick creation
export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  level: RoleLevel;
  permissions: ModulePermissions;
  isDefault: boolean;
  category: "business" | "technical" | "custom";
  companyId?: string; // undefined for global templates
}

// Role duplication data
export interface DuplicateRoleData {
  sourceRoleId: string;
  newName: string;
  newDescription?: string;
  modifyPermissions?: Partial<ModulePermissions>;
}

// Role comparison
export interface RoleComparison {
  role1: Role;
  role2: Role;
  differences: {
    module: string;
    permission: string;
    role1Value: boolean;
    role2Value: boolean;
  }[];
}

// Role hierarchy
export interface RoleHierarchy {
  level: RoleLevel;
  roles: Role[];
  permissions: ModulePermissions;
  canManageLowerLevels: boolean;
}

// Role assignment history
export interface RoleAssignmentHistory {
  id: string;
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: string;
  revokedAt?: string;
  revokedBy?: string;
  reason?: string;
  companyId: string;
}

// Role usage statistics
export interface RoleUsageStats {
  roleId: string;
  roleName: string;
  totalUsers: number;
  activeUsers: number;
  lastUsed: string;
  permissionUsage: {
    [key: string]: number; // module -> usage count
  };
}

// Role validation result
export interface RoleValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// Role import/export data
export interface RoleExportData {
  roles: Role[];
  templates: RoleTemplate[];
  metadata: {
    exportedAt: string;
    exportedBy: string;
    companyId: string;
    version: string;
  };
}

// Role import validation
export interface RoleImportValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  rolesToCreate: number;
  rolesToUpdate: number;
  rolesToSkip: number;
}

// Default role configuration
export interface DefaultRoleConfig {
  companyId: string;
  roles: {
    superAdmin: Partial<Role>;
    projectManager: Partial<Role>;
    salesAgent: Partial<Role>;
    accountant: Partial<Role>;
    viewer: Partial<Role>;
  };
}

// Role permission summary
export interface RolePermissionSummary {
  roleId: string;
  roleName: string;
  totalPermissions: number;
  grantedPermissions: number;
  moduleBreakdown: {
    [key: string]: {
      total: number;
      granted: number;
      permissions: string[];
    };
  };
}

// Export all role-related types
export type {
  RoleLevel,
  RoleStatus,
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
  RoleAssignmentHistory,
  RoleUsageStats,
  RoleValidationResult,
  RoleExportData,
  RoleImportValidation,
  DefaultRoleConfig,
  RolePermissionSummary,
};

// Permission System Types for Teams and Roles Management

// Basic permission level for each module
export type PermissionLevel = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

// All available modules in the system
export type ModuleName = 
  | 'dashboard'
  | 'projects'
  | 'clients'
  | 'salesAllocation'
  | 'feesCollection'
  | 'accounting'
  | 'reports'
  | 'marketers'
  | 'sendNotice'
  | 'crmPipelines'
  | 'documentManager'
  | 'calendarScheduling'
  | 'settings'
  | 'referralProgram';

// Complete permissions for all modules
export interface ModulePermissions {
  dashboard: PermissionLevel;
  projects: PermissionLevel;
  clients: PermissionLevel;
  salesAllocation: PermissionLevel;
  feesCollection: PermissionLevel;
  accounting: PermissionLevel;
  reports: PermissionLevel;
  marketers: PermissionLevel;
  sendNotice: PermissionLevel;
  crmPipelines: PermissionLevel;
  documentManager: PermissionLevel;
  calendarScheduling: PermissionLevel;
  settings: PermissionLevel;
  referralProgram: PermissionLevel;
}

// Permission validation request
export interface PermissionValidationRequest {
  module: ModuleName;
  action: keyof PermissionLevel;
  entityId?: string;
  companyId: string;
}

// Permission validation response
export interface PermissionValidationResponse {
  hasPermission: boolean;
  requiredPermissions: {
    module: ModuleName;
    action: keyof PermissionLevel;
  };
  userPermissions: ModulePermissions;
  message?: string;
}

// User permissions summary
export interface UserPermissions {
  userId: string;
  companyId: string;
  roleId: string;
  roleName: string;
  roleLevel: RoleLevel;
  permissions: ModulePermissions;
  lastUpdated: string;
}

// Permission change request
export interface PermissionChangeRequest {
  roleId: string;
  module: ModuleName;
  permissions: Partial<PermissionLevel>;
  companyId: string;
}

// Bulk permission update
export interface BulkPermissionUpdate {
  roleIds: string[];
  module: ModuleName;
  permissions: Partial<PermissionLevel>;
  companyId: string;
}

// Permission template
export interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  permissions: ModulePermissions;
  isDefault: boolean;
  companyId?: string; // undefined for global templates
}

// Permission inheritance rules
export interface PermissionInheritance {
  fromRole: string;
  toRole: string;
  modules: ModuleName[];
  companyId: string;
}

// Permission audit log
export interface PermissionAuditLog {
  id: string;
  userId: string;
  action: 'granted' | 'revoked' | 'modified';
  roleId: string;
  module: ModuleName;
  oldPermissions?: Partial<PermissionLevel>;
  newPermissions?: Partial<PermissionLevel>;
  companyId: string;
  timestamp: string;
  reason?: string;
}

// Module access check
export interface ModuleAccessCheck {
  module: ModuleName;
  hasAccess: boolean;
  requiredPermissions: PermissionLevel;
  userPermissions: PermissionLevel;
  message?: string;
}

// Permission summary for dashboard
export interface PermissionSummary {
  totalModules: number;
  accessibleModules: number;
  restrictedModules: number;
  moduleBreakdown: {
    [key in ModuleName]: {
      hasAccess: boolean;
      permissions: PermissionLevel;
    };
  };
}

// Export all permission-related types
export type {
  PermissionLevel,
  ModuleName,
  ModulePermissions,
  PermissionValidationRequest,
  PermissionValidationResponse,
  UserPermissions,
  PermissionChangeRequest,
  BulkPermissionUpdate,
  PermissionTemplate,
  PermissionInheritance,
  PermissionAuditLog,
  ModuleAccessCheck,
  PermissionSummary,
};



// Permissions Hook for Teams and Roles Management

import { useState, useEffect, useCallback, useMemo } from "react";
import { PermissionsService } from "@/services/permissionsService";
import type {
  UserPermissions,
  ModuleName,
  PermissionLevel,
} from "@/types/permissions";

interface UsePermissionsOptions {
  autoFetch?: boolean;
  refreshInterval?: number;
}

interface UsePermissionsReturn {
  // Permission state
  permissions: UserPermissions | null;
  isLoading: boolean;
  error: string | null;

  // Permission checking methods
  can: (
    module: ModuleName,
    action: "view" | "create" | "edit" | "delete"
  ) => boolean;
  canView: (module: ModuleName) => boolean;
  canCreate: (module: ModuleName) => boolean;
  canEdit: (module: ModuleName) => boolean;
  canDelete: (module: ModuleName) => boolean;

  // Role and access methods
  isAdmin: () => boolean;
  isManager: () => boolean;
  hasElevatedPermissions: () => boolean;

  // Utility methods
  getModulePermissions: (module: ModuleName) => PermissionLevel | null;
  getAccessibleModules: () => ModuleName[];
  hasAnyPermission: (module: ModuleName) => boolean;

  // Actions
  refreshPermissions: () => Promise<void>;
  clearError: () => void;
}

/**
 * React hook for managing user permissions and access control
 */
export function usePermissions(
  options: UsePermissionsOptions = {}
): UsePermissionsReturn {
  const {
    autoFetch = true,
    refreshInterval = 300000, // 5 minutes
  } = options;

  // State
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch permissions from the server
  const fetchPermissions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userPermissions = await PermissionsService.getUserPermissions();
      setPermissions(userPermissions);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch permissions";
      setError(errorMessage);
      console.error("Error fetching permissions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if user can perform a specific action
  const can = useCallback(
    (
      module: ModuleName,
      action: "view" | "create" | "edit" | "delete"
    ): boolean => {
      if (!permissions) return false;

      const modulePermissions = permissions.permissions[module];
      if (!modulePermissions) return false;

      return modulePermissions[action] === true;
    },
    [permissions]
  );

  // Convenience methods for common permission checks
  const canView = useCallback(
    (module: ModuleName): boolean => {
      return can(module, "view");
    },
    [can]
  );

  const canCreate = useCallback(
    (module: ModuleName): boolean => {
      return can(module, "create");
    },
    [can]
  );

  const canEdit = useCallback(
    (module: ModuleName): boolean => {
      return can(module, "edit");
    },
    [can]
  );

  const canDelete = useCallback(
    (module: ModuleName): boolean => {
      return can(module, "delete");
    },
    [can]
  );

  // Role checking methods
  const isAdmin = useCallback((): boolean => {
    return permissions?.roleLevel === "admin" || false;
  }, [permissions]);

  const isManager = useCallback((): boolean => {
    return (
      permissions?.roleLevel === "manager" ||
      permissions?.roleLevel === "admin" ||
      false
    );
  }, [permissions]);

  const hasElevatedPermissions = useCallback((): boolean => {
    if (isAdmin() || isManager()) return true;

    // Check if user has elevated permissions in sensitive modules
    const sensitiveModules: ModuleName[] = [
      "settings",
      "accounting",
      "reports",
      "users",
    ];
    return sensitiveModules.some(
      (module) => canCreate(module) || canEdit(module) || canDelete(module)
    );
  }, [isAdmin, isManager, canCreate, canEdit, canDelete]);

  // Get permissions for a specific module
  const getModulePermissions = useCallback(
    (module: ModuleName): PermissionLevel | null => {
      if (!permissions) return null;

      const modulePermissions = permissions.permissions[module];
      return modulePermissions || null;
    },
    [permissions]
  );

  // Get all modules the user has access to
  const getAccessibleModules = useCallback((): ModuleName[] => {
    if (!permissions) return [];

    const accessibleModules: ModuleName[] = [];

    Object.entries(permissions.permissions).forEach(
      ([module, modulePermissions]) => {
        if (
          modulePermissions.view ||
          modulePermissions.create ||
          modulePermissions.edit ||
          modulePermissions.delete
        ) {
          accessibleModules.push(module as ModuleName);
        }
      }
    );

    return accessibleModules;
  }, [permissions]);

  // Check if user has any permissions for a module
  const hasAnyPermission = useCallback(
    (module: ModuleName): boolean => {
      if (!permissions) return false;

      const modulePermissions = permissions.permissions[module];
      if (!modulePermissions) return false;

      return (
        modulePermissions.view ||
        modulePermissions.create ||
        modulePermissions.edit ||
        modulePermissions.delete
      );
    },
    [permissions]
  );

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized accessible modules
  const accessibleModules = useMemo(
    () => getAccessibleModules(),
    [getAccessibleModules]
  );

  // Auto-fetch permissions on mount
  useEffect(() => {
    if (autoFetch) {
      fetchPermissions();
    }
  }, [autoFetch, fetchPermissions]);

  // Set up refresh interval
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchPermissions, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, fetchPermissions]);

  return {
    // State
    permissions,
    isLoading,
    error,

    // Permission checking methods
    can,
    canView,
    canCreate,
    canEdit,
    canDelete,

    // Role and access methods
    isAdmin,
    isManager,
    hasElevatedPermissions,

    // Utility methods
    getModulePermissions,
    getAccessibleModules: () => accessibleModules,
    hasAnyPermission,

    // Actions
    refreshPermissions: fetchPermissions,
    clearError,
  };
}

/**
 * Hook for checking a specific permission
 */
export function usePermission(
  module: ModuleName,
  action: "view" | "create" | "edit" | "delete"
) {
  const { can, isLoading, error } = usePermissions();

  const hasPermission = useMemo(
    () => can(module, action),
    [can, module, action]
  );

  return {
    hasPermission,
    isLoading,
    error,
  };
}

/**
 * Hook for checking module access
 */
export function useModuleAccess(module: ModuleName) {
  const { canView, canCreate, canEdit, canDelete, isLoading, error } =
    usePermissions();

  const moduleAccess = useMemo(
    () => ({
      canView: canView(module),
      canCreate: canCreate(module),
      canEdit: canEdit(module),
      canDelete: canDelete(module),
      hasAnyAccess:
        canView(module) ||
        canCreate(module) ||
        canEdit(module) ||
        canDelete(module),
    }),
    [module, canView, canCreate, canEdit, canDelete]
  );

  return {
    ...moduleAccess,
    isLoading,
    error,
  };
}

/**
 * Hook for role-based access control
 */
export function useRoleAccess() {
  const { isAdmin, isManager, hasElevatedPermissions, isLoading, error } =
    usePermissions();

  const roleAccess = useMemo(
    () => ({
      isAdmin: isAdmin(),
      isManager: isManager(),
      hasElevatedPermissions: hasElevatedPermissions(),
      isUser: !isAdmin() && !isManager(),
    }),
    [isAdmin, isManager, hasElevatedPermissions]
  );

  return {
    ...roleAccess,
    isLoading,
    error,
  };
}

/**
 * Hook for permission-based component rendering
 */
export function usePermissionRender(
  module: ModuleName,
  action: "view" | "create" | "edit" | "delete",
  fallback?: React.ReactNode
) {
  const { hasPermission, isLoading } = usePermission(module, action);

  const render = useCallback(
    (children: React.ReactNode) => {
      if (isLoading) {
        return null; // or a loading spinner
      }

      if (!hasPermission) {
        return fallback || null;
      }

      return children;
    },
    [hasPermission, isLoading, fallback]
  );

  return {
    render,
    hasPermission,
    isLoading,
  };
}

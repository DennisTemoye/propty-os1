// Roles Hook for Teams and Roles Management

import { useState, useEffect, useCallback, useMemo } from "react";
import { RolesService } from "@/services/rolesService";
import type {
  Role,
  CreateRoleData,
  UpdateRoleData,
  RoleFilter,
  RoleSearchResult,
  RoleTemplate,
  RoleUsageStats,
  RoleValidationResult,
} from "@/types/roles";

interface UseRolesOptions {
  businessName: string;
  autoFetch?: boolean;
  refreshInterval?: number;
}

interface UseRolesReturn {
  // Roles state
  roles: Role[];
  selectedRole: Role | null;
  isLoading: boolean;
  error: string | null;

  // Pagination and filtering
  totalRoles: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;

  // Actions
  createRole: (roleData: CreateRoleData) => Promise<Role>;
  updateRole: (roleId: string, updates: UpdateRoleData) => Promise<Role>;
  deleteRole: (roleId: string) => Promise<void>;
  duplicateRole: (roleId: string, newName: string) => Promise<Role>;

  // Selection and navigation
  selectRole: (role: Role | null) => void;
  selectRoleById: (roleId: string) => void;
  clearSelection: () => void;

  // Fetching and filtering
  fetchRoles: (page?: number, filters?: RoleFilter) => Promise<void>;
  searchRoles: (
    query: string,
    filters?: RoleFilter
  ) => Promise<RoleSearchResult>;
  refreshRoles: () => Promise<void>;

  // Utility methods
  getRoleById: (roleId: string) => Role | undefined;
  getDefaultRoles: () => Promise<Role[]>;
  getRoleTemplates: () => Promise<RoleTemplate[]>;
  getRoleUsageStats: (roleId: string) => Promise<RoleUsageStats>;
  validateRole: (
    roleData: CreateRoleData | UpdateRoleData
  ) => Promise<RoleValidationResult>;

  // Error handling
  clearError: () => void;
}

/**
 * React hook for managing roles and role-based operations
 */
export function useRoles(options: UseRolesOptions): UseRolesReturn {
  const {
    businessName,
    autoFetch = true,
    refreshInterval = 300000, // 5 minutes
  } = options;

  // State
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [totalRoles, setTotalRoles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  // Fetch roles from the server
  const fetchRoles = useCallback(
    async (page: number = 1, filters?: RoleFilter) => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedRoles = await RolesService.getRoles(businessName, {
          page,
          limit: pageSize,
          ...filters,
        });

        if (page === 1) {
          setRoles(fetchedRoles);
        } else {
          setRoles((prev) => [...prev, ...fetchedRoles]);
        }

        setCurrentPage(page);
        setHasMore(fetchedRoles.length === pageSize);
        setTotalRoles((prev) =>
          page === 1 ? fetchedRoles.length : prev + fetchedRoles.length
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch roles";
        setError(errorMessage);
        console.error("Error fetching roles:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [businessName, pageSize]
  );

  // Search roles
  const searchRoles = useCallback(
    async (query: string, filters?: RoleFilter): Promise<RoleSearchResult> => {
      try {
        setError(null);

        const searchResult = await RolesService.searchRoles(
          { ...filters, businessName },
          { search: query }
        );

        return searchResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search roles";
        setError(errorMessage);
        console.error("Error searching roles:", err);
        throw err;
      }
    },
    [businessName]
  );

  // Create a new role
  const createRole = useCallback(
    async (roleData: CreateRoleData): Promise<Role> => {
      try {
        setError(null);

        const newRole = await RolesService.createRole(roleData, businessName);

        // Add the new role to the list
        setRoles((prev) => [newRole, ...prev]);
        setTotalRoles((prev) => prev + 1);

        // Select the newly created role
        setSelectedRole(newRole);

        return newRole;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create role";
        setError(errorMessage);
        console.error("Error creating role:", err);
        throw err;
      }
    },
    [businessName]
  );

  // Update an existing role
  const updateRole = useCallback(
    async (roleId: string, updates: UpdateRoleData): Promise<Role> => {
      try {
        setError(null);

        const updatedRole = await RolesService.updateRole(
          roleId,
          updates,
          businessName
        );

        // Update the role in the list
        setRoles((prev) =>
          prev.map((role) => (role.id === roleId ? updatedRole : role))
        );

        // Update selected role if it's the one being updated
        if (selectedRole?.id === roleId) {
          setSelectedRole(updatedRole);
        }

        return updatedRole;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update role";
        setError(errorMessage);
        console.error("Error updating role:", err);
        throw err;
      }
    },
    [businessName, selectedRole]
  );

  // Delete a role
  const deleteRole = useCallback(
    async (roleId: string): Promise<void> => {
      try {
        setError(null);

        await RolesService.deleteRole(roleId, businessName);

        // Remove the role from the list
        setRoles((prev) => prev.filter((role) => role.id !== roleId));
        setTotalRoles((prev) => prev - 1);

        // Clear selection if the deleted role was selected
        if (selectedRole?.id === roleId) {
          setSelectedRole(null);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete role";
        setError(errorMessage);
        console.error("Error deleting role:", err);
        throw err;
      }
    },
    [businessName, selectedRole]
  );

  // Duplicate a role
  const duplicateRole = useCallback(
    async (roleId: string, newName: string): Promise<Role> => {
      try {
        setError(null);

        const duplicatedRole = await RolesService.duplicateRole(
          { sourceRoleId: roleId, newName },
          businessName
        );

        // Add the duplicated role to the list
        setRoles((prev) => [duplicatedRole, ...prev]);
        setTotalRoles((prev) => prev + 1);

        // Select the newly duplicated role
        setSelectedRole(duplicatedRole);

        return duplicatedRole;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to duplicate role";
        setError(errorMessage);
        console.error("Error duplicating role:", err);
        throw err;
      }
    },
    [businessName]
  );

  // Select a role
  const selectRole = useCallback((role: Role | null) => {
    setSelectedRole(role);
  }, []);

  // Select a role by ID
  const selectRoleById = useCallback(
    (roleId: string) => {
      const role = roles.find((r) => r.id === roleId);
      setSelectedRole(role || null);
    },
    [roles]
  );

  // Clear role selection
  const clearSelection = useCallback(() => {
    setSelectedRole(null);
  }, []);

  // Get role by ID
  const getRoleById = useCallback(
    (roleId: string): Role | undefined => {
      return roles.find((role) => role.id === roleId);
    },
    [roles]
  );

  // Get default roles
  const getDefaultRoles = useCallback(async (): Promise<Role[]> => {
    try {
      return await RolesService.getDefaultRoles(businessName);
    } catch (err) {
      console.error("Error fetching default roles:", err);
      return [];
    }
  }, [businessName]);

  // Get role templates
  const getRoleTemplates = useCallback(async (): Promise<RoleTemplate[]> => {
    try {
      return await RolesService.getRoleTemplates(businessName);
    } catch (err) {
      console.error("Error fetching role templates:", err);
      return [];
    }
  }, [businessName]);

  // Get role usage stats
  const getRoleUsageStats = useCallback(
    async (roleId: string): Promise<RoleUsageStats> => {
      try {
        return await RolesService.getRoleUsageStats(roleId, businessName);
      } catch (err) {
        console.error("Error fetching role usage stats:", err);
        throw err;
      }
    },
    [businessName]
  );

  // Validate role data
  const validateRole = useCallback(
    async (
      roleData: CreateRoleData | UpdateRoleData
    ): Promise<RoleValidationResult> => {
      try {
        return await RolesService.validateRole(roleData);
      } catch (err) {
        console.error("Error validating role:", err);
        throw err;
      }
    },
    [businessName]
  );

  // Refresh roles
  const refreshRoles = useCallback(async () => {
    await fetchRoles(1);
  }, [fetchRoles]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized values
  const defaultRoles = useMemo(
    () => roles.filter((role) => role.isDefault),
    [roles]
  );
  const customRoles = useMemo(
    () => roles.filter((role) => !role.isDefault),
    [roles]
  );
  const activeRoles = useMemo(
    () => roles.filter((role) => role.isActive),
    [roles]
  );

  // Auto-fetch roles on mount
  useEffect(() => {
    if (autoFetch && businessName) {
      fetchRoles(1);
    }
  }, [autoFetch, businessName, fetchRoles]);

  // Set up refresh interval
  useEffect(() => {
    if (refreshInterval > 0 && businessName) {
      const interval = setInterval(() => {
        refreshRoles();
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, businessName, refreshRoles]);

  return {
    // State
    roles,
    selectedRole,
    isLoading,
    error,

    // Pagination and filtering
    totalRoles,
    currentPage,
    pageSize,
    hasMore,

    // Actions
    createRole,
    updateRole,
    deleteRole,
    duplicateRole,

    // Selection and navigation
    selectRole,
    selectRoleById,
    clearSelection,

    // Fetching and filtering
    fetchRoles,
    searchRoles,
    refreshRoles,

    // Utility methods
    getRoleById,
    getDefaultRoles,
    getRoleTemplates,
    getRoleUsageStats,
    validateRole,

    // Error handling
    clearError,
  };
}

/**
 * Hook for managing a single role
 */
export function useRole(roleId: string, businessName: string) {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRole = useCallback(async () => {
    if (!roleId || !businessName) return;

    try {
      setIsLoading(true);
      setError(null);

      const fetchedRole = await RolesService.getRoleById(roleId, businessName);
      setRole(fetchedRole);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch role";
      setError(errorMessage);
      console.error("Error fetching role:", err);
    } finally {
      setIsLoading(false);
    }
  }, [roleId, businessName]);

  const updateRole = useCallback(
    async (updates: UpdateRoleData) => {
      if (!roleId || !businessName)
        throw new Error("Role ID and Company ID are required");

      try {
        setError(null);

        const updatedRole = await RolesService.updateRole(
          roleId,
          updates,
          businessName
        );
        setRole(updatedRole);

        return updatedRole;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update role";
        setError(errorMessage);
        console.error("Error updating role:", err);
        throw err;
      }
    },
    [roleId, businessName]
  );

  const deleteRole = useCallback(async () => {
    if (!roleId || !businessName)
      throw new Error("Role ID and Company ID are required");

    try {
      setError(null);

      await RolesService.deleteRole(roleId, businessName);
      setRole(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete role";
      setError(errorMessage);
      console.error("Error deleting role:", err);
      throw err;
    }
  }, [roleId, businessName]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  return {
    role,
    isLoading,
    error,
    fetchRole,
    updateRole,
    deleteRole,
  };
}

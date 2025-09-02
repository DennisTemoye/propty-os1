// Team Members Service for Teams and Roles Management

import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  TeamMember,
  InviteTeamMemberData,
  UpdateTeamMemberData,
  TeamMemberWithMetadata,
  GetTeamMembersOptions,
  TeamMemberFilter,
  TeamMemberSearchResult,
  TeamMemberInvitation,
  ChangeRoleData,
  RoleChangeHistory,
  BulkTeamMemberOperation,
  TeamMemberStats,
  TeamMemberActivity,
  TeamMemberPermissionsSummary,
  OnboardingStatus,
  AccessReport,
  TeamMemberExportData,
  TeamMemberImportValidation,
  TeamMemberSearchSuggestion,
} from "@/types/teamMembers";

export class TeamMembersService {
  /**
   * Check authentication status and debug info
   */
  static checkAuthStatus(): {
    isAuthenticated: boolean;
    hasToken: boolean;
    tokenInfo?: {
      length: number;
      preview: string;
    };
    companyId?: string;
  } {
    const token = localStorage.getItem("accessToken");
    const companyId =
      localStorage.getItem("companyId") || localStorage.getItem("businessName");

    const result: {
      isAuthenticated: boolean;
      hasToken: boolean;
      tokenInfo?: {
        length: number;
        preview: string;
      };
      companyId?: string;
    } = {
      isAuthenticated: !!token,
      hasToken: !!token,
      companyId,
    };

    if (token) {
      result.tokenInfo = {
        length: token.length,
        preview: token.substring(0, 20) + "...",
      };
    }

    console.log("🔍 Auth Status Check:", result);
    return result;
  }

  /**
   * Get all team members for a company
   */
  static async getTeamMembers(
    companyId: string,
    options?: GetTeamMembersOptions
  ): Promise<TeamMember[]> {
    try {
      // Check authentication status
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please log in to continue.");
      }

      console.log("🔐 Auth check:", {
        hasToken: !!token,
        tokenLength: token.length,
        companyId,
        endpoint: `${API_ENDPOINTS.TEAM_MEMBERS.BASE(companyId)}`,
      });

      const queryParams = new URLSearchParams();

      if (options?.status) {
        queryParams.append("status", options.status);
      }
      if (options?.roleId) {
        queryParams.append("roleId", options.roleId);
      }
      if (options?.search) {
        queryParams.append("search", options.search);
      }
      if (options?.page) {
        queryParams.append("page", options.page.toString());
      }
      if (options?.limit) {
        queryParams.append("limit", options.limit.toString());
      }
      if (options?.sortBy) {
        queryParams.append("sortBy", options.sortBy);
      }
      if (options?.sortOrder) {
        queryParams.append("sortOrder", options.sortOrder);
      }
      if (options?.includeInactive !== undefined) {
        queryParams.append(
          "includeInactive",
          options.includeInactive.toString()
        );
      }

      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.BASE(
        companyId
      )}?${queryParams.toString()}`;

      console.log("🚀 Making request to:", endpoint);

      const response = await apiService.get<TeamMember[]>(endpoint);
      console.log("✅ Response received:", response);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch team members");
    } catch (error: any) {
      console.error("❌ Error fetching team members:", {
        error: error.message,
        status: error.status,
        errors: error.errors,
        companyId,
        options,
      });

      // Provide more specific error messages
      if (error.status === 403) {
        throw new Error(
          "Access denied. You don't have permission to view team members for this company."
        );
      } else if (error.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      } else if (error.message?.includes("Authentication required")) {
        throw error; // Re-throw our custom auth error
      }

      throw error;
    }
  }

  /**
   * Get a specific team member by ID
   */
  static async getTeamMemberById(
    memberId: string,
    companyId: string
  ): Promise<TeamMember | null> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.DETAILS(companyId, memberId);
      const response = await apiService.get<TeamMember>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      if (
        response.success === false &&
        response.message?.includes("not found")
      ) {
        return null;
      }

      throw new Error(response.message || "Failed to fetch team member");
    } catch (error) {
      console.error("Error fetching team member:", error);
      throw error;
    }
  }

  /**
   * Invite a new team member
   */
  static async inviteTeamMember(
    inviteData: InviteTeamMemberData,
    companyId: string
  ): Promise<TeamMember> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.INVITE(companyId);
      const response = await apiService.post<TeamMember>(endpoint, inviteData);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to invite team member");
    } catch (error) {
      console.error("Error inviting team member:", error);
      throw error;
    }
  }

  /**
   * Update an existing team member
   */
  static async updateTeamMember(
    memberId: string,
    updates: UpdateTeamMemberData,
    companyId: string
  ): Promise<TeamMember> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.DETAILS(companyId, memberId);
      const response = await apiService.put<TeamMember>(endpoint, updates);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to update team member");
    } catch (error) {
      console.error("Error updating team member:", error);
      throw error;
    }
  }

  /**
   * Change a team member's role
   */
  static async changeRole(
    memberId: string,
    roleId: string,
    companyId: string,
    reason?: string
  ): Promise<TeamMember> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.CHANGE_ROLE(
        companyId,
        memberId
      );
      const changeData: ChangeRoleData = {
        memberId,
        roleId,
        reason,
      };

      const response = await apiService.post<TeamMember>(endpoint, changeData);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to change team member role");
    } catch (error) {
      console.error("Error changing team member role:", error);
      throw error;
    }
  }

  /**
   * Activate a team member
   */
  static async activateMember(
    memberId: string,
    companyId: string
  ): Promise<TeamMember> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.ACTIVATE(companyId, memberId);
      const response = await apiService.post<TeamMember>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to activate team member");
    } catch (error) {
      console.error("Error activating team member:", error);
      throw error;
    }
  }

  /**
   * Deactivate a team member
   */
  static async deactivateMember(
    memberId: string,
    companyId: string,
    reason?: string
  ): Promise<TeamMember> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.DEACTIVATE(
        companyId,
        memberId
      );
      const response = await apiService.post(endpoint, { reason });

      if (!response.success) {
        throw new Error(response.message || "Failed to deactivate team member");
      }

      // Return the updated member data
      return (
        response.data || ({ id: memberId, status: "inactive" } as TeamMember)
      );
    } catch (error) {
      console.error("Error deactivating team member:", error);
      throw error;
    }
  }

  /**
   * Resend invitation to a team member
   */
  static async resendInvitation(
    memberId: string,
    companyId: string,
    message?: string
  ): Promise<void> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.RESEND_INVITATION(
        companyId,
        memberId
      );
      const response = await apiService.post(endpoint, { message });

      if (!response.success) {
        throw new Error(response.message || "Failed to resend invitation");
      }
    } catch (error) {
      console.error("Error resending invitation:", error);
      throw error;
    }
  }

  /**
   * Perform bulk operations on team members
   */
  static async bulkOperation(
    operation: BulkTeamMemberOperation,
    companyId: string
  ): Promise<{ success: boolean; results: any[] }> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.BULK_OPERATIONS(companyId);
      const response = await apiService.post(endpoint, operation);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to perform bulk operation");
    } catch (error) {
      console.error("Error performing bulk operation:", error);
      throw error;
    }
  }

  /**
   * Get team member statistics
   */
  static async getTeamMemberStats(companyId: string): Promise<TeamMemberStats> {
    try {
      const endpoint = API_ENDPOINTS.TEAM_MEMBERS.STATS(companyId);
      const response = await apiService.get<TeamMemberStats>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch team member stats");
    } catch (error) {
      console.error("Error fetching team member stats:", error);
      throw error;
    }
  }

  /**
   * Export team members data
   */
  static async exportTeamMembers(
    companyId: string,
    format: "json" | "csv" = "json",
    filters?: TeamMemberFilter
  ): Promise<TeamMemberExportData> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("format", format);

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.EXPORT(
        companyId
      )}?${queryParams.toString()}`;
      const response = await apiService.get<TeamMemberExportData>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to export team members");
    } catch (error) {
      console.error("Error exporting team members:", error);
      throw error;
    }
  }

  /**
   * Search team members with advanced filtering
   */
  static async searchTeamMembers(
    filter: TeamMemberFilter,
    options?: GetTeamMembersOptions
  ): Promise<TeamMemberSearchResult> {
    try {
      const queryParams = new URLSearchParams();

      // Add filter parameters
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
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

      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.BASE(
        filter.businessName
      )}/search?${queryParams.toString()}`;
      const response = await apiService.get<TeamMemberSearchResult>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to search team members");
    } catch (error) {
      console.error("Error searching team members:", error);
      throw error;
    }
  }

  /**
   * Get team member permissions summary
   */
  static async getPermissionsSummary(
    memberId: string,
    companyId: string
  ): Promise<TeamMemberPermissionsSummary> {
    try {
      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.DETAILS(
        companyId,
        memberId
      )}/permissions-summary`;
      const response = await apiService.get<TeamMemberPermissionsSummary>(
        endpoint
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(
        response.message || "Failed to fetch permissions summary"
      );
    } catch (error) {
      console.error("Error fetching permissions summary:", error);
      throw error;
    }
  }

  /**
   * Get team member onboarding status
   */
  static async getOnboardingStatus(
    memberId: string,
    companyId: string
  ): Promise<OnboardingStatus> {
    try {
      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.DETAILS(
        companyId,
        memberId
      )}/onboarding-status`;
      const response = await apiService.get<OnboardingStatus>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch onboarding status");
    } catch (error) {
      console.error("Error fetching onboarding status:", error);
      throw error;
    }
  }

  /**
   * Get team member access report
   */
  static async getAccessReport(
    memberId: string,
    companyId: string
  ): Promise<AccessReport> {
    try {
      const endpoint = `${API_ENDPOINTS.TEAM_MEMBERS.DETAILS(
        companyId,
        memberId
      )}/access-report`;
      const response = await apiService.get<AccessReport>(endpoint);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch access report");
    } catch (error) {
      console.error("Error fetching access report:", error);
      throw error;
    }
  }

  /**
   * Validate team member data
   */
  static async validateTeamMember(
    memberData: InviteTeamMemberData | UpdateTeamMemberData
  ): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> {
    try {
      const errors: string[] = [];
      const warnings: string[] = [];

      if (
        "firstName" in memberData &&
        (!memberData.firstName || memberData.firstName.trim().length === 0)
      ) {
        errors.push("First name is required");
      }

      if (
        "lastName" in memberData &&
        (!memberData.lastName || memberData.lastName.trim().length === 0)
      ) {
        errors.push("Last name is required");
      }

      if ("email" in memberData) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberData.email)) {
          errors.push("Valid email address is required");
        }
      }

      if ("phone" in memberData && memberData.phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(memberData.phone.replace(/\s/g, ""))) {
          warnings.push("Phone number format may be invalid");
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    } catch (error) {
      console.error("Error validating team member:", error);
      return {
        isValid: false,
        errors: ["Validation failed due to system error"],
        warnings: [],
      };
    }
  }
}

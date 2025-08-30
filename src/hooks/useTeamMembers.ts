// Team Members Hook for Teams and Roles Management

import { useState, useEffect, useCallback, useMemo } from "react";
import { TeamMembersService } from "../services/teamMembersService";
import type {
  TeamMember,
  InviteTeamMemberData,
  UpdateTeamMemberData,
  TeamMemberFilter,
  TeamMemberSearchResult,
} from "../types/teamMembers";

interface UseTeamMembersOptions {
  companyId: string;
  autoFetch?: boolean;
}

interface UseTeamMembersReturn {
  // State
  teamMembers: TeamMember[];
  selectedMember: TeamMember | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  inviteMember: (inviteData: InviteTeamMemberData) => Promise<TeamMember>;
  updateMember: (
    memberId: string,
    updates: UpdateTeamMemberData
  ) => Promise<TeamMember>;
  changeRole: (
    memberId: string,
    roleId: string,
    reason?: string
  ) => Promise<TeamMember>;
  activateMember: (memberId: string) => Promise<TeamMember>;
  deactivateMember: (memberId: string) => Promise<TeamMember>;
  resendInvitation: (memberId: string) => Promise<void>;

  // Selection
  selectMember: (member: TeamMember | null) => void;
  selectMemberById: (memberId: string) => void;
  clearSelection: () => void;

  // Fetching
  fetchTeamMembers: (filters?: TeamMemberFilter) => Promise<void>;
  searchTeamMembers: (
    query: string,
    filters?: TeamMemberFilter
  ) => Promise<TeamMemberSearchResult>;
  refreshTeamMembers: () => Promise<void>;

  // Utility
  getMemberById: (memberId: string) => TeamMember | undefined;
  clearError: () => void;
}

export function useTeamMembers(
  options: UseTeamMembersOptions
): UseTeamMembersReturn {
  const { companyId, autoFetch = true } = options;

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = useCallback(
    async (filters?: TeamMemberFilter) => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedMembers = await TeamMembersService.getTeamMembers(
          companyId,
          filters
        );
        setTeamMembers(fetchedMembers);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch team members";
        setError(errorMessage);
        console.error("Error fetching team members:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [companyId]
  );

  const searchTeamMembers = useCallback(
    async (
      query: string,
      filters?: TeamMemberFilter
    ): Promise<TeamMemberSearchResult> => {
      try {
        setError(null);

        const searchResult = await TeamMembersService.searchTeamMembers({
          search: query,
          companyId,
          ...filters,
        });

        return searchResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search team members";
        setError(errorMessage);
        console.error("Error searching team members:", err);
        throw err;
      }
    },
    [companyId]
  );

  const inviteMember = useCallback(
    async (inviteData: InviteTeamMemberData): Promise<TeamMember> => {
      try {
        setError(null);

        const newMember = await TeamMembersService.inviteTeamMember(
          inviteData,
          companyId
        );
        setTeamMembers((prev) => [newMember, ...prev]);
        setSelectedMember(newMember);

        return newMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to invite team member";
        setError(errorMessage);
        console.error("Error inviting team member:", err);
        throw err;
      }
    },
    [companyId]
  );

  const updateMember = useCallback(
    async (
      memberId: string,
      updates: UpdateTeamMemberData
    ): Promise<TeamMember> => {
      try {
        setError(null);

        const updatedMember = await TeamMembersService.updateTeamMember(
          memberId,
          updates,
          companyId
        );
        setTeamMembers((prev) =>
          prev.map((member) =>
            member.id === memberId ? updatedMember : member
          )
        );

        if (selectedMember?.id === memberId) {
          setSelectedMember(updatedMember);
        }

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update team member";
        setError(errorMessage);
        console.error("Error updating team member:", err);
        throw err;
      }
    },
    [companyId, selectedMember]
  );

  const changeRole = useCallback(
    async (
      memberId: string,
      roleId: string,
      reason?: string
    ): Promise<TeamMember> => {
      try {
        setError(null);

        const updatedMember = await TeamMembersService.changeRole(
          memberId,
          roleId,
          companyId,
          reason
        );
        setTeamMembers((prev) =>
          prev.map((member) =>
            member.id === memberId ? updatedMember : member
          )
        );

        if (selectedMember?.id === memberId) {
          setSelectedMember(updatedMember);
        }

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to change member role";
        setError(errorMessage);
        console.error("Error changing member role:", err);
        throw err;
      }
    },
    [companyId, selectedMember]
  );

  const activateMember = useCallback(
    async (memberId: string): Promise<TeamMember> => {
      try {
        setError(null);

        const updatedMember = await TeamMembersService.activateMember(
          memberId,
          companyId
        );
        setTeamMembers((prev) =>
          prev.map((member) =>
            member.id === memberId ? updatedMember : member
          )
        );

        if (selectedMember?.id === memberId) {
          setSelectedMember(updatedMember);
        }

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to activate member";
        setError(errorMessage);
        console.error("Error activating member:", err);
        throw err;
      }
    },
    [companyId, selectedMember]
  );

  const deactivateMember = useCallback(
    async (memberId: string): Promise<TeamMember> => {
      try {
        setError(null);

        const updatedMember = await TeamMembersService.deactivateMember(
          memberId,
          companyId
        );
        setTeamMembers((prev) =>
          prev.map((member) =>
            member.id === memberId ? updatedMember : member
          )
        );

        if (selectedMember?.id === memberId) {
          setSelectedMember(updatedMember);
        }

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to deactivate member";
        setError(errorMessage);
        console.error("Error deactivating member:", err);
        throw err;
      }
    },
    [companyId, selectedMember]
  );

  const resendInvitation = useCallback(
    async (memberId: string): Promise<void> => {
      try {
        setError(null);
        await TeamMembersService.resendInvitation(memberId, companyId);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to resend invitation";
        setError(errorMessage);
        console.error("Error resending invitation:", err);
        throw err;
      }
    },
    [companyId]
  );

  const selectMember = useCallback((member: TeamMember | null) => {
    setSelectedMember(member);
  }, []);

  const selectMemberById = useCallback(
    (memberId: string) => {
      const member = teamMembers.find((m) => m.id === memberId);
      setSelectedMember(member || null);
    },
    [teamMembers]
  );

  const clearSelection = useCallback(() => {
    setSelectedMember(null);
  }, []);

  const getMemberById = useCallback(
    (memberId: string): TeamMember | undefined => {
      return teamMembers.find((member) => member.id === memberId);
    },
    [teamMembers]
  );

  const refreshTeamMembers = useCallback(async () => {
    await fetchTeamMembers();
  }, [fetchTeamMembers]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized values
  const activeMembers = useMemo(
    () => teamMembers.filter((member) => member.status === "active"),
    [teamMembers]
  );
  const invitedMembers = useMemo(
    () => teamMembers.filter((member) => member.status === "invited"),
    [teamMembers]
  );
  const pendingMembers = useMemo(
    () => teamMembers.filter((member) => member.status === "pending"),
    [teamMembers]
  );

  useEffect(() => {
    if (autoFetch && companyId) {
      fetchTeamMembers();
    }
  }, [autoFetch, companyId, fetchTeamMembers]);

  return {
    teamMembers,
    selectedMember,
    isLoading,
    error,
    inviteMember,
    updateMember,
    changeRole,
    activateMember,
    deactivateMember,
    resendInvitation,
    selectMember,
    selectMemberById,
    clearSelection,
    fetchTeamMembers,
    searchTeamMembers,
    refreshTeamMembers,
    getMemberById,
    clearError,
  };
}

/**
 * Hook for managing a single team member
 */
export function useTeamMember(memberId: string, companyId: string) {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMember = useCallback(async () => {
    if (!memberId || !companyId) return;

    try {
      setIsLoading(true);
      setError(null);

      const fetchedMember = await TeamMembersService.getTeamMemberById(
        memberId,
        companyId
      );
      setMember(fetchedMember);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch team member";
      setError(errorMessage);
      console.error("Error fetching team member:", err);
    } finally {
      setIsLoading(false);
    }
  }, [memberId, companyId]);

  const updateMember = useCallback(
    async (updates: UpdateTeamMemberData) => {
      if (!memberId || !companyId)
        throw new Error("Member ID and Company ID are required");

      try {
        setError(null);

        const updatedMember = await TeamMembersService.updateTeamMember(
          memberId,
          updates,
          companyId
        );
        setMember(updatedMember);

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update team member";
        setError(errorMessage);
        console.error("Error updating team member:", err);
        throw err;
      }
    },
    [memberId, companyId]
  );

  const changeRole = useCallback(
    async (roleId: string, reason?: string) => {
      if (!memberId || !companyId)
        throw new Error("Member ID and Company ID are required");

      try {
        setError(null);

        const updatedMember = await TeamMembersService.changeRole(
          memberId,
          roleId,
          companyId,
          reason
        );
        setMember(updatedMember);

        return updatedMember;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to change member role";
        setError(errorMessage);
        console.error("Error changing member role:", err);
        throw err;
      }
    },
    [memberId, companyId]
  );

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  return {
    member,
    isLoading,
    error,
    fetchMember,
    updateMember,
    changeRole,
  };
}

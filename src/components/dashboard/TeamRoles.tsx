import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Shield,
  Plus,
  Activity,
  Edit,
  Trash2,
  UserPlus,
  Loader2,
} from "lucide-react";
import { CreateRoleModal } from "./roles/CreateRoleModal";
import { EditRoleModal } from "./roles/EditRoleModal";
import { InviteUserModal } from "./roles/InviteUserModal";
import { ActivityLogs } from "./roles/ActivityLogs";
import { toast } from "sonner";
import { useRoles } from "@/hooks/useRoles";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePermissions } from "@/hooks/usePermissions";
import type { Role, TeamMember } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";

export function TeamRoles() {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthService.getMe(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get business name from user data (fallback to localStorage if needed)
  const businessName =
    user?.data?.companyId ||
    (() => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        return storedUser.companyId || storedUser.businessName;
      } catch {
        return null;
      }
    })();

  console.log("businessName", businessName);
  console.log("user", user?.data);

  // Use real hooks with business name (only when businessName is available)
  const {
    roles,
    selectedRole,
    isLoading: rolesLoading,
    error: rolesError,
    createRole,
    updateRole,
    deleteRole,
    selectRole,
    clearSelection,
    refreshRoles,
  } = useRoles({ businessName: businessName || "" });
  console.log("roles", roles);
  const {
    teamMembers,
    selectedMember,
    isLoading: membersLoading,
    error: membersError,
    inviteMember,
    updateMember,
    changeRole,
    activateMember,
    deactivateMember,
    refreshTeamMembers,
  } = useTeamMembers({ businessName: businessName || "" });

  // Use real permissions hook
  const { can, canCreate, canEdit, canDelete, isAdmin, isManager } =
    usePermissions();

  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Handle role creation
  const handleRoleCreated = async (roleData: any) => {
    try {
      await createRole(roleData);
      toast.success("Role created successfully");
    } catch (error) {
      toast.error("Failed to create role");
    }
  };

  // Handle role updates
  const handleRoleUpdated = async (updatedRole: any) => {
    try {
      await updateRole(editingRole!.id, updatedRole);
      setEditingRole(null);
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // Handle role deletion
  const handleDeleteRole = async (roleId: string) => {
    try {
      // Check if role has assigned users
      const roleWithUsers = roles.find((r) => r.id === roleId);
      if (
        roleWithUsers &&
        teamMembers.some((member) => member.roleId === roleId)
      ) {
        toast.error("Cannot delete role with assigned users");
        return;
      }

      await deleteRole(roleId);
      toast.success("Role deleted successfully");
    } catch (error) {
      toast.error("Failed to delete role");
    }
  };

  // Handle role editing
  const handleEditRole = (role: Role) => {
    setEditingRole(role);
  };

  // Handle user invitation
  const handleUserInvited = async (userData: any) => {
    try {
      await inviteMember(userData);
      toast.success("User invited successfully");
    } catch (error) {
      toast.error("Failed to invite user");
    }
  };

  // Handle role change for team member
  const handleRoleChange = async (memberId: string, newRoleId: string) => {
    try {
      await changeRole(memberId, newRoleId);
      toast.success("Role changed successfully");
    } catch (error) {
      toast.error("Failed to change role");
    }
  };

  // Handle member activation/deactivation
  const handleMemberStatusChange = async (
    memberId: string,
    activate: boolean
  ) => {
    try {
      if (activate) {
        await activateMember(memberId);
        toast.success("Member activated successfully");
      } else {
        await deactivateMember(memberId);
        toast.success("Member deactivated successfully");
      }
    } catch (error) {
      toast.error(`Failed to ${activate ? "activate" : "deactivate"} member`);
    }
  };

  // Error handling
  useEffect(() => {
    if (userError) {
      toast.error(
        `Authentication error: ${
          userError.message || "Failed to get user data"
        }`
      );
    }
  }, [userError]);

  useEffect(() => {
    if (rolesError) {
      toast.error(`Roles error: ${rolesError}`);
    }
  }, [rolesError]);

  useEffect(() => {
    if (membersError) {
      toast.error(`Team members error: ${membersError}`);
    }
  }, [membersError]);

  // Loading states
  const isLoading =
    userLoading || rolesLoading || membersLoading || !businessName;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading team and roles...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team & Roles</h1>
          <p className="text-muted-foreground">
            Manage your team members and their access permissions
          </p>
        </div>
        <div className="flex gap-2">
          {canCreate("settings") && (
            <CreateRoleModal onRoleCreated={handleRoleCreated} />
          )}
          {canCreate("settings") && (
            <InviteUserModal roles={roles} onUserInvited={handleUserInvited} />
          )}
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles ({roles.length})
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members ({teamMembers.length})
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge
                      variant={
                        role.level === "admin"
                          ? "destructive"
                          : role.level === "manager"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {role.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {
                        teamMembers.filter(
                          (member) => member.roleId === role.id
                        ).length
                      }{" "}
                      users
                    </span>
                    <div className="flex gap-1">
                      {canEdit("settings") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRole(role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete("settings") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={teamMembers.some(
                            (member) => member.roleId === role.id
                          )}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* <TabsContent value="members" className="space-y-4">
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              member.status === "active"
                                ? "default"
                                : member.status === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {member.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {roles.find((r) => r.id === member.roleId)?.name ||
                              "No role"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {canEdit("settings") && member.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleMemberStatusChange(member.id, true)
                          }
                        >
                          Activate
                        </Button>
                      )}
                      {canEdit("settings") && member.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleMemberStatusChange(member.id, false)
                          }
                        >
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent> */}

        {/* <TabsContent value="activity" className="space-y-4">
          <ActivityLogs />
        </TabsContent> */}
      </Tabs>

      {/* Edit Role Modal */}
      {editingRole && (
        <EditRoleModal
          role={editingRole}
          open={!!editingRole}
          onOpenChange={(open) => !open && setEditingRole(null)}
          onRoleUpdated={handleRoleUpdated}
        />
      )}
    </div>
  );
}

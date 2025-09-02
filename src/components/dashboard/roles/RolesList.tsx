import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Edit, Trash2, Settings, Loader2 } from "lucide-react";
import { useRoles } from "@/hooks/useRoles";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePermissions } from "@/hooks/usePermissions";
import type { Role } from "@/types";

interface RolesListProps {
  businessName: string;
  onEditRole?: (role: Role) => void;
  onDeleteRole?: (roleId: string) => void;
}

export function RolesList({
  businessName,
  onEditRole,
  onDeleteRole,
}: RolesListProps) {
  const { roles, isLoading, error } = useRoles({ businessName });

  const { teamMembers } = useTeamMembers({ businessName });

  const { canEdit, canDelete } = usePermissions();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelVariant = (level: string) => {
    switch (level) {
      case "admin":
        return "destructive";
      case "manager":
        return "default";
      case "user":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading roles...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading roles: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!roles || roles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No roles found</p>
            <p className="text-sm">Create your first role to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles ({roles.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => {
            // Count users assigned to this role
            const userCount =
              teamMembers?.filter((member) => member.roleId === role.id)
                .length || 0;

            return (
              <div
                key={role.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
                      {role.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {role.description}
                    </p>
                    {role.isDefault && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Default Role
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getLevelVariant(role.level)}>
                      {role.level}
                    </Badge>
                    <div className="flex gap-1">
                      {canEdit("settings") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditRole?.(role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete("settings") && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={userCount > 0}
                          onClick={() => onDeleteRole?.(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {userCount} user{userCount !== 1 ? "s" : ""} assigned
                  </div>
                  <div className="flex gap-1">
                    {role.permissions &&
                      Object.keys(role.permissions)
                        .slice(0, 3)
                        .map((module, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {module}
                          </Badge>
                        ))}
                    {role.permissions &&
                      Object.keys(role.permissions).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.keys(role.permissions).length - 3} more
                        </Badge>
                      )}
                  </div>
                </div>
                {role.isActive === false && (
                  <div className="mt-2">
                    <Badge variant="destructive" className="text-xs">
                      Inactive
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

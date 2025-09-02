// Team Member Management Types for Teams and Roles Management

import { RoleLevel } from "./roles";

// Team member status
export type MemberStatus =
  | "invited"
  | "pending"
  | "active"
  | "inactive"
  | "suspended";

// Team member invitation status
export type InvitationStatus =
  | "sent"
  | "accepted"
  | "expired"
  | "cancelled"
  | "declined";

// Base team member interface
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  roleName?: string;
  roleLevel?: RoleLevel;
  status: MemberStatus;
  businessName: string;
  invitedAt: string;
  acceptedAt?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  invitedBy?: string;
  updatedBy?: string;
}

// Team member creation/invitation data
export interface InviteTeamMemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  message?: string;
  expiresIn?: number; // days
}

// Team member update data
export interface UpdateTeamMemberData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: MemberStatus;
}

// Team member with additional metadata
export interface TeamMemberWithMetadata extends TeamMember {
  roleName: string;
  roleLevel: RoleLevel;
  invitationStatus: InvitationStatus;
  daysSinceInvitation: number;
  lastActivity: string;
  permissions: string[];
}

// Team member list options
export interface GetTeamMembersOptions {
  status?: MemberStatus;
  roleId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | "firstName"
    | "lastName"
    | "email"
    | "status"
    | "lastLogin"
    | "createdAt";
  sortOrder?: "asc" | "desc";
  includeInactive?: boolean;
}

// Team member filter criteria
export interface TeamMemberFilter {
  businessName: string;
  status?: MemberStatus;
  roleId?: string;
  search?: string;
  invitedAfter?: string;
  invitedBefore?: string;
  lastLoginAfter?: string;
  lastLoginBefore?: string;
}

// Team member search result
export interface TeamMemberSearchResult {
  members: TeamMemberWithMetadata[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Team member invitation
export interface TeamMemberInvitation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  companyId: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: InvitationStatus;
  token: string;
  message?: string;
}

// Team member role change
export interface ChangeRoleData {
  memberId: string;
  roleId: string;
  reason?: string;
  effectiveDate?: string;
}

// Team member role change history
export interface RoleChangeHistory {
  id: string;
  memberId: string;
  oldRoleId: string;
  newRoleId: string;
  changedBy: string;
  changedAt: string;
  reason?: string;
  companyId: string;
}

// Team member bulk operations
export interface BulkTeamMemberOperation {
  memberIds: string[];
  operation:
    | "activate"
    | "deactivate"
    | "changeRole"
    | "resendInvitation"
    | "delete";
  data?: {
    roleId?: string;
    reason?: string;
  };
}

// Team member statistics
export interface TeamMemberStats {
  total: number;
  active: number;
  invited: number;
  pending: number;
  inactive: number;
  suspended: number;
  byRole: {
    [roleId: string]: {
      roleName: string;
      count: number;
    };
  };
  byStatus: {
    [status in MemberStatus]: number;
  };
}

// Team member activity
export interface TeamMemberActivity {
  id: string;
  memberId: string;
  action: string;
  entityType?: string;
  entityId?: string;
  details?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Team member permissions summary
export interface TeamMemberPermissionsSummary {
  memberId: string;
  memberName: string;
  roleName: string;
  roleLevel: RoleLevel;
  totalPermissions: number;
  accessibleModules: number;
  restrictedModules: number;
  lastPermissionUpdate: string;
}

// Team member onboarding status
export interface OnboardingStatus {
  memberId: string;
  step:
    | "invited"
    | "accepted"
    | "profile_completed"
    | "training_completed"
    | "fully_onboarded";
  completedAt?: string;
  nextStep?: string;
  progress: number; // 0-100
}

// Team member access report
export interface AccessReport {
  memberId: string;
  memberName: string;
  roleName: string;
  accessLevel: "full" | "limited" | "restricted";
  sensitiveModules: string[];
  lastAccess: string;
  accessCount: number;
  riskLevel: "low" | "medium" | "high";
}

// Team member export data
export interface TeamMemberExportData {
  members: TeamMemberWithMetadata[];
  metadata: {
    exportedAt: string;
    exportedBy: string;
    companyId: string;
    filters: TeamMemberFilter;
    version: string;
  };
}

// Team member import validation
export interface TeamMemberImportValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  membersToCreate: number;
  membersToUpdate: number;
  membersToSkip: number;
  duplicateEmails: string[];
}

// Team member search suggestions
export interface TeamMemberSearchSuggestion {
  id: string;
  name: string;
  email: string;
  role: string;
  status: MemberStatus;
  matchType: "exact" | "partial" | "fuzzy";
}

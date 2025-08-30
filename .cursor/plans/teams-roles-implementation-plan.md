# Teams and Roles Management System Implementation Plan

## Overview
This plan outlines the step-by-step implementation of the comprehensive role-based access control (RBAC) solution for ProptyOS, following the specification in `README-teams-roles.md`.

## Implementation Phases

### Phase 1: Foundation (Current - Target: Today)
**Goal**: Establish core infrastructure and types

#### 1.1 Core Type Definitions
- [ ] Create `src/types/roles.ts` with role-related interfaces
- [ ] Create `src/types/teamMembers.ts` with team member interfaces
- [ ] Create `src/types/activityLogs.ts` with activity logging interfaces
- [ ] Create `src/types/permissions.ts` with permission system interfaces
- [ ] Update `src/types/index.ts` to export new types

**Files to Create/Modify**:
- `src/types/roles.ts`
- `src/types/teamMembers.ts`
- `src/types/activityLogs.ts`
- `src/types/permissions.ts`
- `src/types/index.ts`

#### 1.2 API Endpoints Configuration
- [ ] Extend `src/constants/api.ts` with new RBAC endpoints
- [ ] Add roles management endpoints
- [ ] Add team members management endpoints
- [ ] Add activity logs endpoints
- [ ] Add permission validation endpoints

**Files to Modify**:
- `src/constants/api.ts`

#### 1.3 Core Services Implementation
- [ ] Create `src/services/rolesService.ts`
- [ ] Create `src/services/teamMembersService.ts`
- [ ] Create `src/services/activityLogsService.ts`
- [ ] Create `src/services/permissionsService.ts`

**Files to Create**:
- `src/services/rolesService.ts`
- `src/services/teamMembersService.ts`
- `src/services/activityLogsService.ts`
- `src/services/permissionsService.ts`

#### 1.4 Permission Middleware
- [ ] Create `src/services/permissionMiddleware.ts`
- [ ] Implement permission validation logic
- [ ] Add company context validation
- [ ] Integrate with existing middleware chain

**Files to Create**:
- `src/services/permissionMiddleware.ts`

**Success Criteria for Phase 1**:
- [ ] TypeScript compilation successful
- [ ] All new types properly defined
- [ ] API endpoints configured
- [ ] Core services can perform basic operations
- [ ] Permission middleware functional

### Phase 2: Integration (Target: Tomorrow)
**Goal**: Integrate new services with existing components

#### 2.1 Enhanced Role Components
- [ ] Update `src/components/dashboard/roles/RolesList.tsx`
- [ ] Update `src/components/dashboard/roles/CreateRoleModal.tsx`
- [ ] Update `src/components/dashboard/roles/EditRoleModal.tsx`
- [ ] Add permission management interface
- [ ] Integrate with new services

**Files to Modify**:
- `src/components/dashboard/roles/RolesList.tsx`
- `src/components/dashboard/roles/CreateRoleModal.tsx`
- `src/components/dashboard/roles/EditRoleModal.tsx`

#### 2.2 Enhanced Team Management
- [ ] Update `src/components/dashboard/TeamRoles.tsx`
- [ ] Enhance team member management
- [ ] Add role assignment functionality
- [ ] Integrate invitation system

**Files to Modify**:
- `src/components/dashboard/TeamRoles.tsx`

#### 2.3 Permission Management UI
- [ ] Create `src/components/dashboard/roles/PermissionManager.tsx`
- [ ] Implement module permission toggles
- [ ] Add permission level selection
- [ ] Create permission templates

**Files to Create**:
- `src/components/dashboard/roles/PermissionManager.tsx`

#### 2.4 Service Integration
- [ ] Update existing components to use new services
- [ ] Replace mock data with real API calls
- [ ] Add error handling and loading states
- [ ] Implement optimistic updates

**Success Criteria for Phase 2**:
- [ ] Enhanced role components working
- [ ] Permission management UI functional
- [ ] Team management enhanced
- [ ] Services integrated with components
- [ ] No breaking changes to existing functionality

### Phase 3: Enhancement (Target: This Week)
**Goal**: Add advanced features and activity logging

#### 3.1 Activity Logging System
- [ ] Create `src/components/dashboard/roles/ActivityLogs.tsx`
- [ ] Implement activity tracking
- [ ] Add filtering and search capabilities
- [ ] Create activity summary dashboard

**Files to Create**:
- `src/components/dashboard/roles/ActivityLogs.tsx`

#### 3.2 Permission Templates
- [ ] Create predefined role templates
- [ ] Add bulk permission operations
- [ ] Implement permission inheritance
- [ ] Add role duplication functionality

#### 3.3 Advanced Team Management
- [ ] Add bulk user operations
- [ ] Implement user status management
- [ ] Add role change history
- [ ] Create user permission reports

#### 3.4 Performance Optimization
- [ ] Implement permission caching
- [ ] Add pagination for large datasets
- [ ] Optimize database queries
- [ ] Add lazy loading for components

**Success Criteria for Phase 3**:
- [ ] Activity logging system operational
- [ ] Permission templates available
- [ ] Advanced team management features working
- [ ] Performance targets met
- [ ] Security requirements satisfied

### Phase 4: Testing & Polish (Target: Next Week)
**Goal**: Comprehensive testing and user experience polish

#### 4.1 Testing Implementation
- [ ] Unit tests for services
- [ ] Component testing
- [ ] Integration testing
- [ ] Performance testing

#### 4.2 Security Hardening
- [ ] Additional validation
- [ ] Security testing
- [ ] Permission boundary testing
- [ ] Company isolation verification

#### 4.3 User Experience Polish
- [ ] UI/UX improvements
- [ ] Accessibility enhancements
- [ ] Mobile responsiveness
- [ ] User feedback integration

#### 4.4 Documentation
- [ ] API documentation
- [ ] User guides
- [ ] Developer documentation
- [ ] Deployment guides

**Success Criteria for Phase 4**:
- [ ] All tests passing
- [ ] Security requirements met
- [ ] User experience polished
- [ ] Documentation complete
- [ ] Production ready

## Technical Implementation Details

### Type Definitions Structure

#### Roles Types
```typescript
// src/types/roles.ts
export interface Role {
  id: string;
  name: string;
  description: string;
  level: RoleLevel;
  permissions: ModulePermissions;
  companyId: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RoleLevel = 'admin' | 'manager' | 'user' | 'custom';

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

export type PermissionLevel = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};
```

#### Team Members Types
```typescript
// src/types/teamMembers.ts
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  status: MemberStatus;
  companyId: string;
  invitedAt: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type MemberStatus = 'invited' | 'pending' | 'active' | 'inactive';

export interface InviteTeamMemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
}
```

#### Activity Logs Types
```typescript
// src/types/activityLogs.ts
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  companyId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface ActivityLogFilter {
  userId?: string;
  action?: string;
  entityType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
```

### Service Implementation Structure

#### Roles Service
```typescript
// src/services/rolesService.ts
export class RolesService {
  static async getRoles(companyId: string, options?: GetRolesOptions): Promise<Role[]>
  static async getRoleById(roleId: string, companyId: string): Promise<Role | null>
  static async createRole(roleData: CreateRoleData, companyId: string): Promise<Role>
  static async updateRole(roleId: string, updates: Partial<Role>, companyId: string): Promise<Role>
  static async deleteRole(roleId: string, companyId: string): Promise<void>
  static async getDefaultRoles(companyId: string): Promise<Role[]>
}
```

#### Team Members Service
```typescript
// src/services/teamMembersService.ts
export class TeamMembersService {
  static async getTeamMembers(companyId: string, options?: GetTeamMembersOptions): Promise<TeamMember[]>
  static async getTeamMemberById(memberId: string, companyId: string): Promise<TeamMember | null>
  static async inviteTeamMember(inviteData: InviteTeamMemberData, companyId: string): Promise<TeamMember>
  static async updateTeamMember(memberId: string, updates: Partial<TeamMember>, companyId: string): Promise<TeamMember>
  static async changeRole(memberId: string, roleId: string, companyId: string): Promise<TeamMember>
  static async deactivateMember(memberId: string, companyId: string): Promise<void>
}
```

### API Endpoints Structure

#### Extended API Constants
```typescript
// src/constants/api.ts - Extended
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  // Roles Management
  ROLES: {
    BASE: "/companies/{companyId}/roles",
    DETAILS: (companyId: string, roleId: string) => `/companies/${companyId}/roles/${roleId}`,
    DEFAULT: (companyId: string) => `/companies/${companyId}/roles/default`,
  },
  
  // Team Members
  TEAM_MEMBERS: {
    BASE: "/companies/{companyId}/team-members",
    DETAILS: (companyId: string, memberId: string) => `/companies/${companyId}/team-members/${memberId}`,
    CHANGE_ROLE: (companyId: string, memberId: string) => `/companies/${companyId}/team-members/${memberId}/change-role`,
  },
  
  // Activity Logs
  ACTIVITY_LOGS: {
    BASE: "/companies/{companyId}/activity-logs",
    SUMMARY: (companyId: string) => `/companies/${companyId}/activity-logs/summary`,
  },
  
  // Permission Validation
  PERMISSIONS: {
    VALIDATE: "/auth/validate-permissions",
    USER_PERMISSIONS: "/auth/user-permissions",
    MODULE_ACCESS: (module: string) => `/auth/module-access/${module}`,
  },
};
```

## Integration Points

### Existing Components to Update
1. **RolesList.tsx**: Integrate with new services and add permission management
2. **CreateRoleModal.tsx**: Add permission configuration interface
3. **EditRoleModal.tsx**: Add permission editing capabilities
4. **TeamRoles.tsx**: Enhance with full team management functionality
5. **UserManagement.tsx**: Update to use new team member services

### New Components to Create
1. **PermissionManager.tsx**: Core permission management interface
2. **EnhancedActivityLogs.tsx**: Advanced activity logging dashboard
3. **RoleTemplates.tsx**: Predefined role templates
4. **BulkOperations.tsx**: Bulk user and permission operations

## Testing Strategy

### Unit Testing
- Service layer methods
- Permission validation logic
- Type definitions
- Utility functions

### Integration Testing
- API endpoint integration
- Service integration
- Component integration
- Permission flow testing

### End-to-End Testing
- User workflow testing
- Permission enforcement
- Company isolation
- Performance testing

## Risk Mitigation

### Technical Risks
- **Breaking Changes**: Incremental implementation and thorough testing
- **Performance Issues**: Early performance testing and optimization
- **Integration Problems**: Clear integration points and backward compatibility

### User Experience Risks
- **Complexity**: Intuitive UI design and progressive disclosure
- **Learning Curve**: Comprehensive documentation and user guides
- **Adoption**: Gradual rollout and user feedback integration

## Success Metrics

### Phase 1 Metrics
- [ ] TypeScript compilation: 0 errors, 0 warnings
- [ ] API endpoints: 100% accessible
- [ ] Core services: 100% functional
- [ ] Permission middleware: 100% working

### Overall Metrics
- **Functionality**: 100% of 14 modules with proper permissions
- **Security**: 100% company isolation and permission validation
- **Performance**: < 200ms permission checks, < 1s page loads
- **User Experience**: < 2 min role creation, < 3 min team invitation

## Timeline Summary

| Phase | Duration | Focus | Deliverables |
|-------|----------|-------|--------------|
| Phase 1 | 2-3 hours | Foundation | Types, services, middleware |
| Phase 2 | 1-2 days | Integration | Enhanced components, UI |
| Phase 3 | 2-3 days | Enhancement | Activity logging, templates |
| Phase 4 | 1-2 days | Testing | Testing, security, polish |

**Total Estimated Time**: 5-8 days

## Next Steps

### Immediate Actions (Next 2-3 hours)
1. Start implementing core types in `src/types/`
2. Extend API constants with new endpoints
3. Begin implementing core services
4. Create permission middleware foundation

### Success Validation
- [ ] Phase 1 quality gate passed
- [ ] No breaking changes introduced
- [ ] All new functionality working
- [ ] Performance targets met



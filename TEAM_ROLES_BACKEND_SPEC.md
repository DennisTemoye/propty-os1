# Team & Roles Backend API Specification

## Overview

This document provides the backend development team with comprehensive specifications for implementing the Team & Roles management system in ProptyOS. The system handles user roles, permissions, team member management, and activity logging.

## System Architecture

The Team & Roles system consists of three main components:

1. **Roles Management** - Define and manage user roles with granular permissions
2. **Team Members** - Manage team members, their roles, and status
3. **Activity Logs** - Track all system activities and changes

## Data Models

### 1. Role Model

```typescript
interface Role {
  _id: string; // MongoDB ObjectId
  name: string; // Role name (e.g., "Super Admin", "Project Manager")
  description: string; // Role description
  level: "admin" | "manager" | "user" | "custom"; // Role hierarchy level
  permissions: RolePermissions; // Granular permissions for each module
  userCount: number; // Number of users assigned to this role
  companyId: string; // Company this role belongs to
  isDefault: boolean; // Whether this is a default company role
  isActive: boolean; // Whether the role is active
  createdBy: string; // User ID who created the role
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}

interface RolePermissions {
  [module: string]: Permission; // Module name as key
}

interface Permission {
  view: boolean; // Can view module data
  create: boolean; // Can create new records
  edit: boolean; // Can edit existing records
  delete: boolean; // Can delete records
}
```

**Available Modules:**

- Dashboard
- Projects
- Clients
- Sales & Allocation
- Fees Collection
- Accounting
- Reports
- Marketers
- Send Notice
- CRM Pipelines
- Document Manager
- Calendar & Scheduling
- Settings
- Referral Program

### 2. Team Member Model

```typescript
interface TeamMember {
  _id: string; // MongoDB ObjectId
  firstName: string; // First name
  lastName: string; // Last name
  email: string; // Email address (unique per company)
  phone?: string; // Phone number
  roleId: string; // Reference to Role._id
  roleName: string; // Cached role name for quick access
  status: "active" | "pending" | "inactive" | "invited";
  companyId: string; // Company this member belongs to
  avatar?: string; // Profile picture URL
  lastLogin?: Date; // Last login timestamp
  invitedAt?: Date; // When invitation was sent
  invitedBy?: string; // User ID who sent invitation
  acceptedAt?: Date; // When invitation was accepted
  isEmailVerified: boolean; // Email verification status
  createdAt: Date; // Account creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

### 3. Activity Log Model

```typescript
interface ActivityLog {
  _id: string; // MongoDB ObjectId
  userId: string; // User who performed the action
  userName: string; // Cached user name
  action: string; // Action performed (e.g., "role_created", "user_invited")
  entityType: string; // Type of entity affected (e.g., "role", "user")
  entityId: string; // ID of affected entity
  entityName: string; // Name of affected entity
  details: any; // Additional action details
  companyId: string; // Company context
  ipAddress?: string; // IP address of the action
  userAgent?: string; // User agent string
  timestamp: Date; // When the action occurred
}
```

## API Endpoints

### 1. Roles Management

#### GET /api/companies/:companyId/roles

**Description:** Retrieve all roles for a company
**Query Parameters:**

- `includeInactive` (boolean, optional): Include inactive roles
- `includeDefault` (boolean, optional): Include default company roles

**Response:**

```typescript
{
  success: boolean;
  data: Role[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### GET /api/companies/:companyId/roles/:roleId

**Description:** Retrieve a specific role by ID
**Response:**

```typescript
{
  success: boolean;
  data: Role;
}
```

#### POST /api/companies/:companyId/roles

**Description:** Create a new role
**Request Body:**

```typescript
{
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'user' | 'custom';
  permissions: RolePermissions;
  isDefault?: boolean;
}
```

**Response:**

```typescript
{
  success: boolean;
  data: Role;
  message: string;
}
```

#### PUT /api/companies/:companyId/roles/:roleId

**Description:** Update an existing role
**Request Body:** Same as POST, but all fields are optional
**Response:** Same as POST

#### DELETE /api/companies/:companyId/roles/:roleId

**Description:** Delete a role (only if no users are assigned)
**Response:**

```typescript
{
  success: boolean;
  message: string;
}
```

#### GET /api/companies/:companyId/roles/default

**Description:** Get default roles template for new companies
**Response:**

```typescript
{
  success: boolean;
  data: Role[];
}
```

### 2. Team Members Management

#### GET /api/companies/:companyId/team-members

**Description:** Retrieve all team members for a company
**Query Parameters:**

- `status` (string, optional): Filter by status
- `roleId` (string, optional): Filter by role
- `search` (string, optional): Search by name or email
- `page` (number, optional): Page number for pagination
- `limit` (number, optional): Items per page

**Response:**

```typescript
{
  success: boolean;
  data: TeamMember[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### GET /api/companies/:companyId/team-members/:memberId

**Description:** Retrieve a specific team member by ID
**Response:**

```typescript
{
  success: boolean;
  data: TeamMember;
}
```

#### POST /api/companies/:companyId/team-members

**Description:** Create a new team member (invite user)
**Request Body:**

```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  data: TeamMember;
  message: string;
}
```

#### PUT /api/companies/:companyId/team-members/:memberId

**Description:** Update team member information
**Request Body:** Same as POST, but all fields are optional
**Response:** Same as POST

#### DELETE /api/companies/:companyId/team-members/:memberId

**Description:** Remove team member from company
**Response:**

```typescript
{
  success: boolean;
  message: string;
}
```

#### POST /api/companies/:companyId/team-members/:memberId/resend-invitation

**Description:** Resend invitation email to pending team member
**Response:**

```typescript
{
  success: boolean;
  message: string;
}
```

#### POST /api/companies/:companyId/team-members/:memberId/change-role

**Description:** Change team member's role
**Request Body:**

```typescript
{
  roleId: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  data: TeamMember;
  message: string;
}
```

### 3. Activity Logs

#### GET /api/companies/:companyId/activity-logs

**Description:** Retrieve activity logs for a company
**Query Parameters:**

- `userId` (string, optional): Filter by specific user
- `action` (string, optional): Filter by action type
- `entityType` (string, optional): Filter by entity type
- `startDate` (string, optional): Filter from date (ISO string)
- `endDate` (string, optional): Filter to date (ISO string)
- `page` (number, optional): Page number for pagination
- `limit` (number, optional): Items per page

**Response:**

```typescript
{
  success: boolean;
  data: ActivityLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### 4. Permission Validation

#### POST /api/auth/validate-permissions

**Description:** Validate user permissions for specific actions
**Request Body:**

```typescript
{
  module: string;
  action: 'view' | 'create' | 'edit' | 'delete';
  entityId?: string;              // Optional, for entity-specific permissions
}
```

**Response:**

```typescript
{
  success: boolean;
  allowed: boolean;
  message?: string;
}
```

## Business Logic & Validation Rules

### 1. Role Management Rules

- **Role Deletion**: Cannot delete a role that has assigned users
- **Default Roles**: Cannot modify or delete default company roles
- **Permission Inheritance**: Higher-level roles inherit permissions from lower levels
- **Role Assignment**: Users can only be assigned to roles within their permission level

### 2. Team Member Rules

- **Email Uniqueness**: Email must be unique within a company
- **Role Assignment**: Can only assign roles that the current user has permission to manage
- **Invitation Flow**: New members start with 'invited' status until they accept
- **Status Transitions**:
  - `invited` → `pending` (after invitation sent)
  - `pending` → `active` (after user accepts and verifies email)
  - `active` → `inactive` (when deactivated)

### 3. Permission System Rules

- **Admin Level**: Full access to all modules and actions
- **Manager Level**: Can manage projects, clients, and team members within their scope
- **User Level**: Limited access based on assigned permissions
- **Module Access**: Users can only access modules they have at least 'view' permission for

## Security Considerations

### 1. Authentication & Authorization

- All endpoints require valid JWT token
- Token must include company context
- Role-based access control (RBAC) for all operations

### 2. Data Isolation

- Company data must be completely isolated
- Users can only access data within their company
- Role permissions are company-specific

### 3. Audit Trail

- All role and permission changes are logged
- User invitation and acceptance events are tracked
- Failed permission attempts are logged

## Email Notifications

### 1. User Invitation

- Send invitation email with company details
- Include role information and permissions
- Provide secure invitation link

### 2. Role Changes

- Notify users when their role is modified
- Include new permissions and restrictions
- Provide contact information for questions

### 3. Account Status Changes

- Notify users when account is activated/deactivated
- Include reason and next steps

## Error Handling

### 1. Common Error Responses

**Validation Error (400):**

```typescript
{
  success: false;
  error: "VALIDATION_ERROR";
  message: string;
  details: {
    field: string;
    message: string;
  }
  [];
}
```

**Permission Denied (403):**

```typescript
{
  success: false;
  error: 'PERMISSION_DENIED';
  message: string;
  requiredPermissions?: {
    module: string;
    action: string;
  };
}
```

**Not Found (404):**

```typescript
{
  success: false;
  error: 'NOT_FOUND';
  message: string;
  entityType?: string;
  entityId?: string;
}
```

**Conflict (409):**

```typescript
{
  success: false;
  error: "CONFLICT";
  message: string;
  conflictType: "ROLE_IN_USE" | "EMAIL_EXISTS" | "INVALID_ROLE_CHANGE";
}
```

## Database Indexes

### 1. Performance Indexes

```javascript
// Roles collection
db.roles.createIndex({ companyId: 1, isActive: 1 });
db.roles.createIndex({ companyId: 1, level: 1 });
db.roles.createIndex({ companyId: 1, isDefault: 1 });

// Team members collection
db.teamMembers.createIndex({ companyId: 1, email: 1 }, { unique: true });
db.teamMembers.createIndex({ companyId: 1, status: 1 });
db.teamMembers.createIndex({ companyId: 1, roleId: 1 });
db.teamMembers.createIndex({ companyId: 1, invitedAt: 1 });

// Activity logs collection
db.activityLogs.createIndex({ companyId: 1, timestamp: -1 });
db.activityLogs.createIndex({ companyId: 1, userId: 1, timestamp: -1 });
db.activityLogs.createIndex({ companyId: 1, action: 1, timestamp: -1 });
```

## Testing Requirements

### 1. Unit Tests

- Role CRUD operations
- Permission validation logic
- Team member invitation flow
- Activity logging

### 2. Integration Tests

- End-to-end role creation and assignment
- Permission inheritance and validation
- Company data isolation
- Email notification delivery

### 3. Performance Tests

- Large company data handling (1000+ users)
- Permission validation response time
- Activity log query performance

## Implementation Notes

### 1. Middleware Requirements

- JWT authentication middleware
- Company context middleware
- Permission validation middleware
- Request logging middleware

### 2. Dependencies

- JWT library for token handling
- Email service for notifications
- Validation library (Joi, Yup, or similar)
- Logging service for activity tracking

### 3. Configuration

- Email templates for notifications
- Default role templates per company type
- Permission matrix configuration
- Activity log retention policies

## API Rate Limiting

### 1. General Limits

- 100 requests per minute per user
- 1000 requests per hour per company

### 2. Specific Endpoints

- User invitation: 10 per hour per company
- Role creation: 20 per hour per company
- Permission validation: 1000 per minute per user

## Monitoring & Analytics

### 1. Metrics to Track

- Role creation and modification rates
- User invitation acceptance rates
- Permission validation frequency
- API response times
- Error rates by endpoint

### 2. Alerts

- High error rates on permission endpoints
- Unusual role modification patterns
- Failed user invitations
- Performance degradation

This specification provides the foundation for implementing a robust, secure, and scalable team & roles management system. The backend team should implement these endpoints following RESTful principles and ensure proper error handling, validation, and security measures are in place.

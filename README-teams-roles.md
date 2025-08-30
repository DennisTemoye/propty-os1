# Teams and Roles Management System

## Overview

The Teams and Roles Management System is a comprehensive role-based access control (RBAC) solution integrated into ProptyOS. It provides granular permissions management, team member administration, and comprehensive activity logging for enhanced security and user management.

## Features

### 🔐 Role-Based Access Control

- **Granular Permissions**: 14 modules with 4 permission levels (view, create, edit, delete)
- **Role Hierarchy**: Admin, Manager, User, and Custom role levels
- **Default Roles**: Pre-configured roles for new companies
- **Permission Inheritance**: Higher-level roles inherit permissions from lower levels

### 👥 Team Member Management

- **User Invitations**: Secure invitation system for new team members
- **Role Assignment**: Easy role assignment and modification
- **Status Tracking**: Track invitation, pending, active, and inactive states
- **Company Isolation**: Complete data separation between companies

### 📝 Activity Logging

- **Comprehensive Tracking**: Log all system activities and changes
- **Audit Trail**: Complete history of user actions
- **Filtering & Search**: Advanced querying capabilities
- **Performance Optimized**: Indexed for fast retrieval

### 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Company Context**: Automatic data isolation
- **Permission Validation**: Middleware for endpoint protection
- **Input Validation**: Comprehensive request validation

## System Architecture

### Data Models

#### Role Model

```javascript
{
  name: "Project Manager",
  description: "Can manage projects and clients",
  level: "manager",
  permissions: {
    projects: { view: true, create: true, edit: true, delete: false },
    clients: { view: true, create: true, edit: true, delete: false }
    // ... other modules
  },
  companyId: "company123",
  isDefault: true,
  isActive: true
}
```

#### Team Member Model

```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@company.com",
  roleId: "role123",
  status: "active",
  companyId: "company123",
  invitedAt: "2024-01-01T00:00:00Z"
}
```

#### Activity Log Model

```javascript
{
  userId: "user123",
  action: "user_invited",
  entityType: "teamMember",
  entityId: "member123",
  companyId: "company123",
  timestamp: "2024-01-01T00:00:00Z"
}
```

### Available Modules

The system supports 14 core modules:

1. **Dashboard** - Main dashboard access
2. **Projects** - Project management
3. **Clients** - Client management
4. **Sales & Allocation** - Sales and plot allocation
5. **Fees Collection** - Fee management
6. **Accounting** - Financial records
7. **Reports** - Reporting and analytics
8. **Marketers** - Marketing team management
9. **Send Notice** - Communication tools
10. **CRM Pipelines** - Customer relationship management
11. **Document Manager** - File and document management
12. **Calendar & Scheduling** - Calendar and scheduling tools
13. **Settings** - System configuration
14. **Referral Program** - Referral management

## API Endpoints

### Roles Management

#### Get All Roles

```http
GET /api/v1/companies/{companyId}/roles
Authorization: Bearer {token}
```

**Query Parameters:**

- `includeInactive` (boolean): Include inactive roles
- `includeDefault` (boolean): Include default company roles

#### Create Role

```http
POST /api/v1/companies/{companyId}/roles
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Custom Role",
  "description": "Role description",
  "level": "manager",
  "permissions": {
    "projects": { "view": true, "create": true, "edit": false, "delete": false }
  }
}
```

#### Update Role

```http
PUT /api/v1/companies/{companyId}/roles/{roleId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Updated description"
}
```

#### Delete Role

```http
DELETE /api/v1/companies/{companyId}/roles/{roleId}
Authorization: Bearer {token}
```

### Team Members Management

#### Get All Team Members

```http
GET /api/v1/companies/{companyId}/team-members
Authorization: Bearer {token}
```

**Query Parameters:**

- `status` (string): Filter by status
- `roleId` (string): Filter by role
- `search` (string): Search by name or email
- `page` (number): Page number
- `limit` (number): Items per page

#### Invite Team Member

```http
POST /api/v1/companies/{companyId}/team-members
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "phone": "+1234567890",
  "roleId": "role123"
}
```

#### Update Team Member

```http
PUT /api/v1/companies/{companyId}/team-members/{memberId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+1234567891"
}
```

#### Change Role

```http
POST /api/v1/companies/{companyId}/team-members/{memberId}/change-role
Authorization: Bearer {token}
Content-Type: application/json

{
  "roleId": "newRole123"
}
```

### Activity Logs

#### Get Activity Logs

```http
GET /api/v1/companies/{companyId}/activity-logs
Authorization: Bearer {token}
```

**Query Parameters:**

- `userId` (string): Filter by user
- `action` (string): Filter by action type
- `entityType` (string): Filter by entity type
- `startDate` (string): Filter from date (ISO)
- `endDate` (string): Filter to date (ISO)
- `page` (number): Page number
- `limit` (number): Items per page

#### Get Activity Summary

```http
GET /api/v1/companies/{companyId}/activity-logs/summary
Authorization: Bearer {token}
```

### Permission Validation

#### Validate Permissions

```http
POST /api/v1/auth/validate-permissions
Authorization: Bearer {token}
Content-Type: application/json

{
  "module": "projects",
  "action": "create",
  "entityId": "project123"
}
```

#### Get User Permissions

```http
GET /api/v1/auth/user-permissions
Authorization: Bearer {token}
```

#### Check Module Access

```http
GET /api/v1/auth/module-access/{module}
Authorization: Bearer {token}
```

## Middleware Usage

### Permission Validation Middleware

```javascript
const { validatePermission } = require("../middleware/permissions");

// Protect route with specific permission
router.get(
  "/projects",
  validatePermission("projects", "view"),
  projectController.getProjects
);

// Protect route with module access
router.get(
  "/dashboard",
  hasModuleAccess("dashboard"),
  dashboardController.getDashboard
);
```

### Authentication Middleware

```javascript
const authenticateToken = require("../middleware/auth");

// Protect route with authentication
router.get("/protected", authenticateToken, (req, res) => {
  // Route logic here
});
```

## Default Roles

The system automatically creates 5 default roles for each company:

1. **Super Admin** - Full system access
2. **Project Manager** - Project and client management
3. **Sales Agent** - Sales and client interactions
4. **Accountant** - Financial records and reports
5. **Viewer** - Read-only access to most modules

## Setup and Installation

### 1. Initialize Default Roles

Run the initialization script to create default roles for existing companies:

```bash
node scripts/initialize-default-roles.js
```

### 2. Update Existing Routes

Add permission middleware to existing routes:

```javascript
// Before
router.get("/clients", clientController.getClients);

// After
router.get(
  "/clients",
  validatePermission("clients", "view"),
  clientController.getClients
);
```

### 3. Test the System

Run the comprehensive test suite:

```bash
node test-teams-roles.js
```

## Integration with Existing System

### User Context

The system integrates with your existing user authentication:

```javascript
// Existing user model
{
  name: "User Name",
  email: "user@company.com",
  businessName: "CompanyName", // Used as companyId
  role: "admin" // Legacy role field
}
```

### Company Context

All endpoints use the company context from the authenticated user:

```javascript
// Automatically extracted from user context
const companyId = req.user.companyId || req.user.businessName;
```

### Permission Inheritance

Super admin users automatically bypass permission checks:

```javascript
if (req.user.role === "super_admin") {
  return next(); // Bypass permission check
}
```

## Error Handling

### Standard Error Responses

```javascript
// Validation Error (400)
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": [
    { "field": "email", "message": "Email is required" }
  ]
}

// Permission Denied (403)
{
  "success": false,
  "error": "PERMISSION_DENIED",
  "message": "Action not permitted",
  "requiredPermissions": {
    "module": "projects",
    "action": "create"
  }
}

// Not Found (404)
{
  "success": false,
  "error": "NOT_FOUND",
  "message": "Resource not found",
  "entityType": "role",
  "entityId": "role123"
}
```

## Performance Considerations

### Database Indexes

The system includes optimized indexes for:

- Company-based queries
- User lookups
- Activity log filtering
- Role assignments

### Caching Strategy

Consider implementing Redis caching for:

- User permissions
- Role definitions
- Frequently accessed data

## Security Best Practices

### 1. Input Validation

- All inputs are validated and sanitized
- SQL injection protection through Mongoose
- XSS protection through proper escaping

### 2. Authentication

- JWT tokens with expiration
- Secure token storage
- Automatic token refresh

### 3. Authorization

- Role-based access control
- Company data isolation
- Permission validation on every request

### 4. Audit Trail

- Complete activity logging
- IP address tracking
- User agent logging

## Monitoring and Analytics

### Key Metrics

- Role creation and modification rates
- User invitation acceptance rates
- Permission validation frequency
- API response times
- Error rates by endpoint

### Alerts

- High error rates on permission endpoints
- Unusual role modification patterns
- Failed user invitations
- Performance degradation

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**

   - Check user role assignment
   - Verify role permissions
   - Ensure company context is correct

2. **Company Context Issues**

   - Verify user authentication
   - Check businessName field
   - Ensure proper JWT token

3. **Role Assignment Problems**
   - Verify role exists and is active
   - Check role permissions
   - Ensure proper company isolation

### Debug Mode

Enable debug logging by setting environment variable:

```bash
DEBUG=teams-roles:* node index.js
```

## Future Enhancements

### Planned Features

1. **Advanced Permissions**

   - Time-based permissions
   - Location-based access
   - Conditional permissions

2. **Team Management**

   - Team hierarchies
   - Department-based roles
   - Cross-team collaboration

3. **Integration Features**

   - SSO integration
   - LDAP support
   - API key management

4. **Analytics Dashboard**
   - Permission usage analytics
   - User activity insights
   - Security audit reports

## Support and Documentation

For additional support:

1. Check the test files for usage examples
2. Review the API specification in `TEAM_ROLES_BACKEND_SPEC.md`
3. Run the test suite to verify functionality
4. Check error logs for debugging information

## License

This system is part of ProptyOS and follows the same licensing terms.

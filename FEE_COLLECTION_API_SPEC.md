# Fee Collection Module - API Specification

## Overview

The Fee Collection Module is a comprehensive system for managing property development fees, tracking payments, and monitoring collection performance. This document provides the complete API specification for backend implementation.

## System Architecture

### Core Entities

1. **Fee Types** - Configurable fee categories (Infrastructure, Service, Survey, Legal, Documentation)
2. **Fees** - Individual fee records assigned to clients
3. **Payments** - Payment transactions against fees
4. **Fee Assignments** - Links between fees and clients/projects
5. **Payment Methods** - Supported payment channels

### Data Flow

```
Fee Type Setup → Fee Assignment → Payment Collection → Status Updates → Reporting
```

## Data Models

### 1. Fee Type Model

```typescript
interface FeeType {
  id: string;
  name: string; // e.g., "Infrastructure Development Fee"
  code: string; // e.g., "INFRA_FEE"
  description: string;
  defaultAmount: number;
  currency: string; // Default: "NGN"
  frequency: "one-time" | "recurring" | "milestone-based";
  recurringInterval?: "monthly" | "quarterly" | "yearly";
  isActive: boolean;
  autoAssign: boolean;
  linkedToMilestones: boolean;
  applicableProjects: string[]; // Project IDs
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Fee Model

```typescript
interface Fee {
  id: string;
  feeTypeId: string;
  clientId: string;
  projectId: string;
  unitId?: string; // Optional for project-level fees
  amount: number;
  currency: string;
  status: "pending" | "partially_paid" | "paid" | "overdue" | "cancelled";
  dueDate: Date;
  assignedDate: Date;
  description?: string;
  milestoneId?: string; // If linked to project milestone
  isRecurring: boolean;
  nextDueDate?: Date; // For recurring fees
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Payment Model

```typescript
interface Payment {
  id: string;
  feeId: string;
  clientId: string;
  amount: number;
  currency: string;
  paymentMethod: "bank_transfer" | "pos" | "online" | "cash" | "check";
  reference: string; // External payment reference
  transactionId?: string; // Bank/processor transaction ID
  status: "pending" | "completed" | "failed" | "refunded";
  notes?: string;
  receiptUrl?: string;
  collectedBy: string; // Staff ID
  collectedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. Fee Assignment Model

```typescript
interface FeeAssignment {
  id: string;
  feeTypeId: string;
  projectId: string;
  clientId: string;
  unitId?: string;
  amount: number;
  dueDate: Date;
  isActive: boolean;
  assignedBy: string; // Staff ID
  assignedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5. Payment Method Model

```typescript
interface PaymentMethod {
  id: string;
  name: string; // e.g., "Bank Transfer", "POS", "Online"
  code: string; // e.g., "BANK_TRANSFER"
  isActive: boolean;
  requiresReference: boolean;
  processingTime: number; // Hours
  fees?: number; // Processing fees
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Fee Types Management

#### 1. Create Fee Type

```http
POST /api/v1/fee-types
Content-Type: application/json

{
  "name": "Infrastructure Development Fee",
  "code": "INFRA_FEE",
  "description": "Fee for infrastructure development",
  "defaultAmount": 5000000,
  "currency": "NGN",
  "frequency": "one-time",
  "autoAssign": true,
  "linkedToMilestones": false,
  "applicableProjects": ["proj_001", "proj_002"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "ft_001",
    "name": "Infrastructure Development Fee",
    "code": "INFRA_FEE",
    "defaultAmount": 5000000,
    "currency": "NGN",
    "frequency": "one-time",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### 2. Get Fee Types

```http
GET /api/v1/fee-types?isActive=true&projectId=proj_001
```

#### 3. Update Fee Type

```http
PUT /api/v1/fee-types/{id}
```

#### 4. Delete Fee Type

```http
DELETE /api/v1/fee-types/{id}
```

### Fee Management

#### 1. Create Fee

```http
POST /api/v1/fees
Content-Type: application/json

{
  "feeTypeId": "ft_001",
  "clientId": "client_001",
  "projectId": "proj_001",
  "unitId": "unit_001",
  "amount": 5000000,
  "currency": "NGN",
  "dueDate": "2024-03-15",
  "description": "Infrastructure fee for Block A Plot 02",
  "milestoneId": "milestone_001"
}
```

#### 2. Get Fees

```http
GET /api/v1/fees?status=overdue&projectId=proj_001&clientId=client_001
```

**Query Parameters:**

- `status`: Filter by fee status
- `projectId`: Filter by project
- `clientId`: Filter by client
- `dueDateFrom`: Filter by due date range
- `dueDateTo`: Filter by due date range
- `amountMin`: Filter by minimum amount
- `amountMax`: Filter by maximum amount

#### 3. Update Fee

```http
PUT /api/v1/fees/{id}
```

#### 4. Delete Fee

```http
DELETE /api/v1/fees/{id}
```

### Payment Management

#### 1. Record Payment

```http
POST /api/v1/payments
Content-Type: application/json

{
  "feeId": "fee_001",
  "clientId": "client_001",
  "amount": 2000000,
  "currency": "NGN",
  "paymentMethod": "bank_transfer",
  "reference": "BANK_REF_001",
  "transactionId": "TXN_12345",
  "notes": "Partial payment for infrastructure fee",
  "collectedBy": "staff_001"
}
```

#### 2. Get Payments

```http
GET /api/v1/payments?feeId=fee_001&status=completed&dateFrom=2024-01-01
```

#### 3. Update Payment Status

```http
PATCH /api/v1/payments/{id}/status
Content-Type: application/json

{
  "status": "completed",
  "notes": "Payment confirmed by bank"
}
```

### Fee Assignment Management

#### 1. Assign Fee to Client

```http
POST /api/v1/fee-assignments
Content-Type: application/json

{
  "feeTypeId": "ft_001",
  "projectId": "proj_001",
  "clientId": "client_001",
  "unitId": "unit_001",
  "amount": 5000000,
  "dueDate": "2024-03-15",
  "assignedBy": "staff_001"
}
```

#### 2. Bulk Fee Assignment

```http
POST /api/v1/fee-assignments/bulk
Content-Type: application/json

{
  "feeTypeId": "ft_001",
  "projectId": "proj_001",
  "assignments": [
    {
      "clientId": "client_001",
      "unitId": "unit_001",
      "amount": 5000000,
      "dueDate": "2024-03-15"
    },
    {
      "clientId": "client_002",
      "unitId": "unit_002",
      "amount": 4500000,
      "dueDate": "2024-03-20"
    }
  ],
  "assignedBy": "staff_001"
}
```

### Analytics & Reporting

#### 1. Collection Summary

```http
GET /api/v1/analytics/collection-summary?dateFrom=2024-01-01&dateTo=2024-01-31
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalCollected": 25000000,
    "totalOutstanding": 15000000,
    "totalOverdue": 5000000,
    "collectionRate": 62.5,
    "overdueCount": 15,
    "paymentCount": 45
  }
}
```

#### 2. Project Performance

```http
GET /api/v1/analytics/project-performance?projectId=proj_001&period=monthly
```

#### 3. Fee Type Analysis

```http
GET /api/v1/analytics/fee-type-analysis?dateFrom=2024-01-01&dateTo=2024-01-31
```

#### 4. Overdue Report

```http
GET /api/v1/analytics/overdue-report?daysOverdue=30&projectId=proj_001
```

## Business Logic Rules

### 1. Fee Status Updates

- **Pending**: Fee created, due date not reached
- **Overdue**: Due date passed, no full payment
- **Partially Paid**: Some payment received, balance outstanding
- **Paid**: Full payment received
- **Cancelled**: Fee voided (requires approval)

### 2. Payment Processing

- Payments can be partial or full
- Multiple payments can be recorded against a single fee
- Payment status affects fee status automatically
- Reference numbers must be unique per payment method

### 3. Fee Assignment Rules

- One fee type per client per project (unless recurring)
- Unit-specific fees override project-level fees
- Milestone-linked fees are assigned when milestones are reached
- Auto-assignment creates fees for new clients in active projects

### 4. Validation Rules

- Fee amounts must be positive
- Due dates must be in the future for new fees
- Payment amounts cannot exceed outstanding balance
- Client must exist and be active
- Project must exist and be active

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid fee amount",
    "details": {
      "field": "amount",
      "value": -1000,
      "constraint": "must be positive"
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `CONFLICT`: Resource conflict (e.g., duplicate assignment)
- `BUSINESS_RULE_VIOLATION`: Violates business logic

## Authentication & Authorization

### Required Headers

```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### Permission Levels

- **View**: Read access to fees and payments
- **Create**: Create new fees and record payments
- **Update**: Modify existing fees and payment statuses
- **Delete**: Remove fees and payments (soft delete)
- **Admin**: Full access to fee types and assignments

## Rate Limiting

- **Standard**: 100 requests per minute
- **Bulk Operations**: 10 requests per minute
- **Analytics**: 30 requests per minute

## Webhooks (Optional)

```http
POST /webhook/fee-status-changed
POST /webhook/payment-received
POST /webhook/fee-overdue
```

## Testing Endpoints

```http
GET /api/v1/health
GET /api/v1/test/mock-data
POST /api/v1/test/seed-data
```

## Implementation Notes

1. **Database Design**: Use separate tables for fees, payments, and assignments with proper foreign key relationships
2. **Caching**: Cache frequently accessed data like fee types and project assignments
3. **Audit Trail**: Log all fee and payment changes for compliance
4. **Batch Processing**: Implement background jobs for bulk operations and status updates
5. **Notifications**: Send automated reminders for overdue fees
6. **Reporting**: Generate PDF/Excel reports for financial analysis
7. **Integration**: Connect with accounting systems and payment gateways

This specification provides a complete foundation for implementing the fee collection module backend services.

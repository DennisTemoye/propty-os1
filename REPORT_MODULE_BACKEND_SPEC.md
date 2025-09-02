# Report Module Backend API Specification

## Overview

This document outlines the backend API endpoints required to support the comprehensive report module frontend. The API provides endpoints for generating various types of reports, managing report templates, and retrieving insights and analytics.

## Base URL

```
/api/v1/reports
```

## Authentication

All endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Data Models

### ReportFilters

```typescript
interface ReportFilters {
  dateFrom?: string; // ISO date string (YYYY-MM-DD)
  dateTo?: string; // ISO date string (YYYY-MM-DD)
  projectId?: string; // UUID of project
  marketerId?: string; // UUID of marketer
  status?: string; // Status filter value
  clientId?: string; // UUID of client
  reportType?: string; // Type of report
  includeRevoked?: boolean; // Include revoked allocations
  includePending?: boolean; // Include pending items
}
```

### SalesReportData

```typescript
interface SalesReportData {
  id: string;
  clientName: string;
  project: string;
  unit: string;
  amount: number;
  status: string;
  date: string;
  marketer: string;
  commission: number;
  commissionStatus: string;
  paymentStatus: string;
  revokedDate?: string;
  revocationReason?: string;
  refundAmount?: number;
}
```

### CommissionReportData

```typescript
interface CommissionReportData {
  id: string;
  marketer: string;
  marketerId: string;
  totalSales: number;
  totalVolume: number;
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
  period: string;
  performance: number;
  averageCommission: number;
}
```

### FinancialReportData

```typescript
interface FinancialReportData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  outstandingAmount: number;
  commissionPaid: number;
  commissionPending: number;
  refundsIssued: number;
  period: string;
  revenueByProject: Array<{
    project: string;
    revenue: number;
    percentage: number;
  }>;
  expensesByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}
```

### ProjectReportData

```typescript
interface ProjectReportData {
  id: string;
  name: string;
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  reservedUnits: number;
  totalRevenue: number;
  completionPercentage: number;
  status: string;
  startDate: string;
  expectedCompletion: string;
}
```

### ClientReportData

```typescript
interface ClientReportData {
  id: string;
  name: string;
  totalInvestments: number;
  activeInvestments: number;
  completedInvestments: number;
  totalSpent: number;
  lastActivity: string;
  status: string;
  preferredProjects: string[];
}
```

### ReportSummary

```typescript
interface ReportSummary {
  totalRecords: number;
  totalValue: number;
  averageValue: number;
  topPerformers: string[];
  trends: Array<{
    period: string;
    value: number;
    change: number;
  }>;
}
```

### ReportTemplate

```typescript
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  filters: ReportFilters;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
```

### ReportInsights

```typescript
interface ReportInsights {
  trends: Array<{
    period: string;
    value: number;
    change: number;
    trend: "up" | "down" | "stable";
  }>;
  topPerformers: Array<{
    name: string;
    value: number;
    rank: number;
  }>;
  alerts: Array<{
    type: "warning" | "info" | "success";
    message: string;
    value?: number;
  }>;
}
```

## API Endpoints

### 1. Sales Reports

#### Generate Sales Report

```
GET /api/v1/reports/sales
```

**Query Parameters:**

- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `projectId` (optional): Filter by project
- `marketerId` (optional): Filter by marketer
- `status` (optional): Filter by status
- `includeRevoked` (optional): Include revoked allocations (default: false)
- `includePending` (optional): Include pending items (default: true)

**Response:**

```json
{
  "success": true,
  "message": "Sales report generated successfully",
  "data": {
    "data": [SalesReportData[]],
    "summary": ReportSummary
  }
}
```

### 2. Commission Reports

#### Generate Commission Report

```
GET /api/v1/reports/commission
```

**Query Parameters:**

- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `marketerId` (optional): Filter by marketer
- `projectId` (optional): Filter by project

**Response:**

```json
{
  "success": true,
  "message": "Commission report generated successfully",
  "data": {
    "data": [CommissionReportData[]],
    "summary": ReportSummary
  }
}
```

### 3. Financial Reports

#### Generate Financial Report

```
GET /api/v1/reports/financial
```

**Query Parameters:**

- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `projectId` (optional): Filter by project

**Response:**

```json
{
  "success": true,
  "message": "Financial report generated successfully",
  "data": {
    "data": FinancialReportData,
    "summary": ReportSummary
  }
}
```

### 4. Project Reports

#### Generate Project Report

```
GET /api/v1/reports/projects
```

**Query Parameters:**

- `projectId` (optional): Filter by specific project
- `status` (optional): Filter by project status

**Response:**

```json
{
  "success": true,
  "message": "Project report generated successfully",
  "data": {
    "data": [ProjectReportData[]],
    "summary": ReportSummary
  }
}
```

### 5. Client Reports

#### Generate Client Report

```
GET /api/v1/reports/clients
```

**Query Parameters:**

- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `clientId` (optional): Filter by specific client
- `projectId` (optional): Filter by project

**Response:**

```json
{
  "success": true,
  "message": "Client report generated successfully",
  "data": {
    "data": [ClientReportData[]],
    "summary": ReportSummary
  }
}
```

### 6. Report Templates

#### Get Report Templates

```
GET /api/v1/reports/templates
```

**Response:**

```json
{
  "success": true,
  "message": "Templates retrieved successfully",
  "data": [ReportTemplate[]]
}
```

#### Save Report Template

```
POST /api/v1/reports/templates
```

**Request Body:**

```json
{
  "name": "Monthly Sales Report",
  "description": "Standard monthly sales report with default filters",
  "type": "sales",
  "filters": {
    "dateFrom": "2024-01-01",
    "dateTo": "2024-01-31",
    "includeRevoked": false,
    "includePending": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Template saved successfully",
  "data": {
    "id": "template_uuid",
    "name": "Monthly Sales Report",
    "description": "Standard monthly sales report with default filters",
    "type": "sales",
    "filters": {...},
    "isDefault": false,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "createdBy": "user_uuid"
  }
}
```

#### Delete Report Template

```
DELETE /api/v1/reports/templates/{templateId}
```

**Response:**

```json
{
  "success": true,
  "message": "Template deleted successfully"
}
```

### 7. Report Insights

#### Get Report Insights

```
GET /api/v1/reports/insights
```

**Query Parameters:**

- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `projectId` (optional): Filter by project

**Response:**

```json
{
  "success": true,
  "message": "Insights retrieved successfully",
  "data": ReportInsights
}
```

### 8. Report Export

#### Export Report

```
POST /api/v1/reports/export
```

**Request Body:**

```json
{
  "reportType": "sales",
  "format": "pdf",
  "filters": ReportFilters,
  "filename": "sales_report_january_2024"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Report exported successfully",
  "data": {
    "downloadUrl": "/api/v1/reports/download/export_uuid",
    "filename": "sales_report_january_2024.pdf"
  }
}
```

#### Download Exported Report

```
GET /api/v1/reports/download/{exportId}
```

**Response:** File download (PDF, Excel, or CSV)

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes

- `INVALID_FILTERS`: Invalid filter parameters
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `REPORT_GENERATION_FAILED`: Failed to generate report
- `TEMPLATE_NOT_FOUND`: Template not found
- `INVALID_EXPORT_FORMAT`: Unsupported export format
- `RATE_LIMIT_EXCEEDED`: Too many requests

## Rate Limiting

- Report generation: 10 requests per minute per user
- Template operations: 30 requests per minute per user
- Export operations: 5 requests per minute per user

## Caching

- Report data: 5 minutes for real-time data, 1 hour for historical data
- Templates: 1 hour
- Insights: 15 minutes

## Database Schema

### reports Table

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  filters JSONB NOT NULL,
  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_summary JSONB,
  status VARCHAR(20) DEFAULT 'completed'
);
```

### report_templates Table

```sql
CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  filters JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### report_exports Table

```sql
CREATE TABLE report_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type VARCHAR(50) NOT NULL,
  format VARCHAR(10) NOT NULL,
  filters JSONB NOT NULL,
  file_path VARCHAR(500),
  file_size BIGINT,
  status VARCHAR(20) DEFAULT 'processing',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);
```

## Implementation Notes

### 1. Data Aggregation

- Use database views or materialized views for complex aggregations
- Implement incremental updates for large datasets
- Consider using Redis for caching frequently accessed data

### 2. Performance Optimization

- Implement pagination for large result sets
- Use database indexes on frequently filtered fields
- Consider async processing for complex reports

### 3. Security

- Validate all filter parameters
- Implement row-level security for multi-tenant data
- Audit all report generation and access

### 4. File Handling

- Store exported files in cloud storage (S3, GCS)
- Implement automatic cleanup for expired exports
- Support streaming for large file downloads

### 5. Monitoring

- Track report generation times
- Monitor export success rates
- Alert on failed report generations

## Testing Requirements

### Unit Tests

- Filter validation
- Data aggregation logic
- Export format generation

### Integration Tests

- Database query performance
- File export functionality
- Template management

### Load Tests

- Concurrent report generation
- Large dataset handling
- Export performance

## Deployment Considerations

### Environment Variables

```bash
REPORT_CACHE_TTL=300
REPORT_EXPORT_PATH=/tmp/exports
REPORT_MAX_FILE_SIZE=100MB
REPORT_RATE_LIMIT=10
```

### Dependencies

- Database: PostgreSQL 13+
- Cache: Redis 6+
- File Storage: AWS S3 or similar
- Queue System: Redis Queue or Celery

### Health Checks

- Database connectivity
- Cache availability
- File storage access
- Export service status

This specification provides a comprehensive foundation for implementing the backend API that will support all the frontend report module functionality.

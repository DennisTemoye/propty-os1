# Report Module API Usage Guide

This guide demonstrates how to consume the report module API endpoints in your React application.

## Overview

The report module provides comprehensive reporting capabilities for:

- Sales reports
- Commission reports
- Financial reports
- Project reports
- Client reports
- Report templates
- Report insights
- Report export functionality

## Quick Start

### 1. Import the Hook

```typescript
import { useReports } from "@/hooks/useReports";
```

### 2. Use the Hook in Your Component

```typescript
function MyReportComponent() {
  const {
    loading,
    error,
    salesData,
    commissionData,
    financialData,
    projectData,
    clientData,
    filters,
    setFilters,
    generateSalesReport,
    generateCommissionReport,
    generateFinancialReport,
    generateProjectReport,
    generateClientReport,
    exportReport,
    exportReportNew,
    templates,
    loadTemplates,
    saveTemplate,
    deleteTemplate,
    insights,
    loadInsights,
    clearError,
    resetFilters,
  } = useReports();

  // Your component logic here
}
```

## API Endpoints

### Base URL

All report endpoints are prefixed with `/api/v1/reports`

### Available Endpoints

| Endpoint                       | Method | Description                |
| ------------------------------ | ------ | -------------------------- |
| `/reports/sales`               | GET    | Generate sales report      |
| `/reports/commission`          | GET    | Generate commission report |
| `/reports/financial`           | GET    | Generate financial report  |
| `/reports/projects`            | GET    | Generate project report    |
| `/reports/clients`             | GET    | Generate client report     |
| `/reports/templates`           | GET    | Get report templates       |
| `/reports/templates`           | POST   | Save report template       |
| `/reports/templates/{id}`      | DELETE | Delete report template     |
| `/reports/insights`            | GET    | Get report insights        |
| `/reports/export`              | POST   | Export report              |
| `/reports/download/{exportId}` | GET    | Download exported report   |

## Usage Examples

### 1. Generate a Sales Report

```typescript
const handleGenerateSalesReport = async () => {
  try {
    // Set filters if needed
    setFilters({
      dateFrom: "2024-01-01",
      dateTo: "2024-01-31",
      projectId: "project-uuid",
      includeRevoked: false,
      includePending: true,
    });

    // Generate the report
    await generateSalesReport();

    // Access the data
    console.log("Sales data:", salesData);
  } catch (error) {
    console.error("Failed to generate sales report:", error);
  }
};
```

### 2. Export a Report

```typescript
const handleExportReport = async () => {
  try {
    // Export using the new API-based method
    const result = await exportReportNew("sales", "pdf");

    // The result contains downloadUrl and filename
    console.log("Export result:", result);

    // Create download link
    const link = document.createElement("a");
    link.href = result.downloadUrl;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to export report:", error);
  }
};
```

### 3. Manage Report Templates

```typescript
const handleSaveTemplate = async () => {
  try {
    const template = {
      name: "Monthly Sales Report",
      description: "Standard monthly sales report template",
      type: "sales",
      filters: {
        dateFrom: "2024-01-01",
        dateTo: "2024-01-31",
        includeRevoked: false,
      },
    };

    const success = await saveTemplate(template);
    if (success) {
      console.log("Template saved successfully");
      // Refresh templates list
      await loadTemplates();
    }
  } catch (error) {
    console.error("Failed to save template:", error);
  }
};

const handleDeleteTemplate = async (templateId: string) => {
  try {
    const success = await deleteTemplate(templateId);
    if (success) {
      console.log("Template deleted successfully");
      // Refresh templates list
      await loadTemplates();
    }
  } catch (error) {
    console.error("Failed to delete template:", error);
  }
};
```

### 4. Load Report Insights

```typescript
const handleLoadInsights = async () => {
  try {
    await loadInsights();

    // Access insights data
    console.log("Trends:", insights.trends);
    console.log("Top performers:", insights.topPerformers);
    console.log("Alerts:", insights.alerts);
  } catch (error) {
    console.error("Failed to load insights:", error);
  }
};
```

## Filter Options

### ReportFilters Interface

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

### Example Filters

```typescript
// Date range filter
const dateFilters = {
  dateFrom: "2024-01-01",
  dateTo: "2024-01-31",
};

// Project-specific filter
const projectFilters = {
  projectId: "project-uuid",
  includeRevoked: false,
};

// Marketer-specific filter
const marketerFilters = {
  marketerId: "marketer-uuid",
  dateFrom: "2024-01-01",
  dateTo: "2024-01-31",
};
```

## Data Models

### Sales Report Data

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

### Commission Report Data

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

### Financial Report Data

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

## Error Handling

The hook provides error handling through the `error` state and `clearError` function:

```typescript
function MyComponent() {
  const { error, clearError } = useReports();

  return (
    <div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={clearError}>Clear Error</button>
        </div>
      )}
    </div>
  );
}
```

## Loading States

Use the `loading` state to show loading indicators:

```typescript
function MyComponent() {
  const { loading, generateSalesReport } = useReports();

  return (
    <button onClick={generateSalesReport} disabled={loading}>
      {loading ? "Generating..." : "Generate Report"}
    </button>
  );
}
```

## Demo Component

A complete demo component is available at `src/components/dashboard/reports/ReportAPIDemo.tsx` that demonstrates all the functionality.

To use it:

```typescript
import { ReportAPIDemo } from "@/components/dashboard/reports/ReportAPIDemo";

function ReportsPage() {
  return (
    <div>
      <h1>Reports</h1>
      <ReportAPIDemo />
    </div>
  );
}
```

## Best Practices

1. **Always handle errors**: Use try-catch blocks and the error state
2. **Show loading states**: Use the loading state to provide user feedback
3. **Validate filters**: Ensure required filters are set before generating reports
4. **Cache data**: Consider caching report data to avoid unnecessary API calls
5. **Handle empty states**: Show appropriate messages when no data is available
6. **Use templates**: Save commonly used filter combinations as templates

## Troubleshooting

### Common Issues

1. **No data returned**: Check if filters are properly set
2. **Export fails**: Ensure the backend supports the requested format
3. **Template not saved**: Verify all required template fields are provided
4. **API errors**: Check network connectivity and API endpoint configuration

### Debug Mode

Enable debug logging by checking the browser console for detailed error messages and API responses.

## API Configuration

The API endpoints are configured in `src/constants/api.ts`. Ensure the base URL and version are correctly set for your environment.

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  VERSION: "v1",
  TIMEOUT: 30000,
};
```

## Rate Limiting

The API implements rate limiting:

- Report generation: 10 requests per minute per user
- Template operations: 30 requests per minute per user
- Export operations: 5 requests per minute per user

Handle rate limit errors gracefully by implementing exponential backoff or user notification.

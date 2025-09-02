# ProptyOS Advanced Tools API Specification

## Overview

This document outlines the backend API endpoints required for ProptyOS advanced tools modules, including Reports & Analytics, CRM Pipelines, Calendar Scheduling, Document Management, Geographic Mapping, and Accounting Analytics.

## Base URL

```
https://api.proptyos.com/v1
```

## Authentication

All endpoints require Bearer token authentication:

```
Authorization: Bearer <jwt_token>
```

---

## 1. Reports & Analytics API

### 1.1 Sales Reports

#### Generate Sales Report

```http
POST /reports/sales/generate
```

**Request Body:**

```json
{
  "filters": {
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "projectId": "string",
    "marketerId": "string",
    "status": ["allocated", "interested", "offered"],
    "minAmount": 0,
    "maxAmount": 1000000
  },
  "includeDetails": true,
  "groupBy": "month"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalSales": 150,
      "totalVolume": 45000000,
      "activeClients": 89,
      "averageDealSize": 300000
    },
    "sales": [
      {
        "id": "string",
        "clientName": "string",
        "project": "string",
        "unit": "string",
        "amount": 300000,
        "marketer": "string",
        "commission": 15000,
        "commissionStatus": "paid",
        "status": "allocated",
        "date": "2024-01-15",
        "revokedDate": null
      }
    ],
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Export Sales Report

```http
POST /reports/sales/export
```

**Request Body:**

```json
{
  "format": "csv|pdf|excel",
  "filters": {
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://api.proptyos.com/downloads/reports/sales_2024_01_15.csv",
    "expiresAt": "2024-01-16T10:30:00Z"
  }
}
```

### 1.2 Commission Reports

#### Generate Commission Report

```http
POST /reports/commission/generate
```

**Request Body:**

```json
{
  "filters": {
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "marketerId": "string",
    "projectId": "string",
    "status": ["paid", "pending"]
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalMarketers": 25,
      "totalCommission": 4500000,
      "paidCommission": 3200000,
      "pendingCommission": 1300000
    },
    "commissions": [
      {
        "id": "string",
        "marketer": "string",
        "totalSales": 12,
        "totalVolume": 3600000,
        "totalCommission": 180000,
        "paidCommission": 150000,
        "pendingCommission": 30000,
        "period": "January 2024"
      }
    ]
  }
}
```

### 1.3 Financial Reports

#### Generate Financial Report

```http
POST /reports/financial/generate
```

**Request Body:**

```json
{
  "filters": {
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "includeExpenses": true,
    "includeCommissions": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "revenue": {
      "totalRevenue": 85000000,
      "salesRevenue": 75000000,
      "otherRevenue": 10000000
    },
    "expenses": {
      "totalExpenses": 25000000,
      "operationalExpenses": 18000000,
      "marketingExpenses": 7000000
    },
    "commissions": {
      "commissionPaid": 4500000,
      "commissionPending": 1300000
    },
    "netProfit": 55000000,
    "outstandingAmount": 15000000,
    "refundsIssued": 500000,
    "period": "January 2024"
  }
}
```

### 1.4 Report Templates

#### Save Report Template

```http
POST /reports/templates
```

**Request Body:**

```json
{
  "name": "Monthly Sales Summary",
  "type": "sales",
  "filters": {
    "dateRange": "last_month",
    "groupBy": "week"
  },
  "isDefault": false
}
```

#### Get Report Templates

```http
GET /reports/templates?type=sales
```

#### Delete Report Template

```http
DELETE /reports/templates/{templateId}
```

---

## 2. CRM Pipeline Management API

### 2.1 Lead Management

#### Create Lead

```http
POST /crm/leads
```

**Request Body:**

```json
{
  "clientName": "string",
  "email": "string",
  "phone": "string",
  "stage": "new_lead",
  "projectInterest": "string",
  "source": "website",
  "assignedTo": "string",
  "priority": "medium",
  "dealValue": 300000,
  "location": "string",
  "budget": 350000,
  "preferences": ["3-bedroom", "garden"],
  "notes": "string",
  "tags": ["hot_lead", "ready_buyer"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "clientName": "string",
    "email": "string",
    "phone": "string",
    "stage": "new_lead",
    "projectInterest": "string",
    "source": "website",
    "assignedTo": "string",
    "priority": "medium",
    "dealValue": 300000,
    "location": "string",
    "budget": 350000,
    "preferences": ["3-bedroom", "garden"],
    "notes": [],
    "tags": ["hot_lead", "ready_buyer"],
    "createdAt": "2024-01-15T10:30:00Z",
    "lastActivity": "2024-01-15T10:30:00Z",
    "nextFollowUp": null,
    "status": "active"
  }
}
```

#### Update Lead

```http
PUT /crm/leads/{leadId}
```

#### Get Leads

```http
GET /crm/leads?stage=new_lead&assignedTo=string&priority=high
```

#### Delete Lead

```http
DELETE /crm/leads/{leadId}
```

#### Convert Lead to Client

```http
POST /crm/leads/{leadId}/convert
```

**Request Body:**

```json
{
  "clientData": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "allocationData": {
    "projectId": "string",
    "unitId": "string",
    "amount": 300000
  }
}
```

### 2.2 Pipeline Stages

#### Get Pipeline Stages

```http
GET /crm/pipeline/stages
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "new_lead",
      "name": "New Lead",
      "order": 1,
      "color": "#3b82f6",
      "probability": 10,
      "isActive": true
    }
  ]
}
```

#### Update Pipeline Stage

```http
PUT /crm/pipeline/stages/{stageId}
```

#### Reorder Pipeline Stages

```http
PUT /crm/pipeline/stages/reorder
```

**Request Body:**

```json
{
  "stages": [
    { "id": "new_lead", "order": 1 },
    { "id": "contacted", "order": 2 }
  ]
}
```

### 2.3 Pipeline Analytics

#### Get Pipeline Metrics

```http
GET /crm/pipeline/metrics?dateRange=last_month
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalLeads": 150,
    "conversionRate": 0.25,
    "averageDealSize": 320000,
    "totalPipelineValue": 48000000,
    "stageBreakdown": [
      {
        "stage": "new_lead",
        "count": 45,
        "value": 13500000
      }
    ]
  }
}
```

---

## 3. Calendar & Scheduling API

### 3.1 Event Management

#### Create Calendar Event

```http
POST /calendar/events
```

**Request Body:**

```json
{
  "title": "Site Inspection - Victoria Gardens Unit A-15",
  "type": "inspection",
  "date": "2024-01-20",
  "time": "10:00",
  "duration": 60,
  "clientId": "string",
  "developmentId": "string",
  "location": "Victoria Gardens Sales Office, Lekki",
  "description": "Property inspection for Unit A-15 with potential buyer",
  "reminder": true,
  "reminderMinutes": 30,
  "assignedTo": "string",
  "priority": "high",
  "tags": ["hot_lead", "ready_buyer"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "type": "inspection",
    "date": "2024-01-20",
    "time": "10:00",
    "duration": 60,
    "clientId": "string",
    "clientName": "string",
    "clientPhone": "string",
    "developmentId": "string",
    "developmentName": "string",
    "location": "string",
    "description": "string",
    "reminder": true,
    "reminderMinutes": 30,
    "status": "scheduled",
    "assignedTo": "string",
    "priority": "high",
    "createdBy": "string",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastModified": "2024-01-15T10:30:00Z",
    "tags": ["hot_lead", "ready_buyer"]
  }
}
```

#### Update Event

```http
PUT /calendar/events/{eventId}
```

#### Get Events

```http
GET /calendar/events?date=2024-01-20&type=inspection&assignedTo=string
```

#### Delete Event

```http
DELETE /calendar/events/{eventId}
```

#### Update Event Status

```http
PATCH /calendar/events/{eventId}/status
```

**Request Body:**

```json
{
  "status": "completed",
  "notes": "Inspection completed successfully"
}
```

### 3.2 Calendar Views

#### Get Calendar View

```http
GET /calendar/view?view=month&date=2024-01&userId=string
```

**Response:**

```json
{
  "success": true,
  "data": {
    "view": "month",
    "date": "2024-01",
    "events": [
      {
        "id": "string",
        "title": "string",
        "date": "2024-01-20",
        "time": "10:00",
        "type": "inspection",
        "status": "scheduled"
      }
    ]
  }
}
```

### 3.3 Reminders & Notifications

#### Get Upcoming Reminders

```http
GET /calendar/reminders?userId=string&upcoming=true
```

#### Mark Reminder as Sent

```http
POST /calendar/reminders/{reminderId}/sent
```

---

## 4. Document Management API

### 4.1 Document Operations

#### Upload Document

```http
POST /documents/upload
```

**Request Body (multipart/form-data):**

```
file: [binary file]
title: string
category: string
linkedTo: client|project
linkedId: string
linkedName: string
tags: string[]
description: string
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "fileName": "string",
    "category": "string",
    "linkedTo": "client",
    "linkedId": "string",
    "linkedName": "string",
    "fileSize": "2.5 MB",
    "fileType": "PDF",
    "uploadDate": "2024-01-15",
    "uploadedBy": "string",
    "url": "https://api.proptyos.com/documents/123/download",
    "tags": ["allocation", "legal"]
  }
}
```

#### Get Documents

```http
GET /documents?category=Survey&linkedTo=project&search=string
```

#### Download Document

```http
GET /documents/{documentId}/download
```

#### Delete Document

```http
DELETE /documents/{documentId}
```

#### Update Document Metadata

```http
PUT /documents/{documentId}/metadata
```

### 4.2 Document Categories

#### Get Document Categories

```http
GET /documents/categories
```

#### Create Document Category

```http
POST /documents/categories
```

### 4.3 Document Search

#### Search Documents

```http
POST /documents/search
```

**Request Body:**

```json
{
  "query": "string",
  "filters": {
    "category": "string",
    "linkedTo": "string",
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "fileType": "PDF"
  },
  "sortBy": "uploadDate",
  "sortOrder": "desc"
}
```

---

## 5. Geographic Mapping API

### 5.1 Unit Management

#### Create Unit with Coordinates

```http
POST /maps/units
```

**Request Body:**

```json
{
  "name": "Unit A1",
  "type": "apartment",
  "coordinates": {
    "lat": 6.5244,
    "lng": 3.3792
  },
  "status": "available",
  "projectId": "string",
  "blockId": "string",
  "floor": 1,
  "unitNumber": "A1"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "Unit A1",
    "type": "apartment",
    "coordinates": {
      "lat": 6.5244,
      "lng": 3.3792
    },
    "status": "available",
    "projectId": "string",
    "blockId": "string",
    "floor": 1,
    "unitNumber": "A1",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Unit Coordinates

```http
PUT /maps/units/{unitId}/coordinates
```

**Request Body:**

```json
{
  "coordinates": {
    "lat": 6.5245,
    "lng": 3.3793
  }
}
```

#### Get Units by Location

```http
GET /maps/units?bounds=6.5244,3.3792,6.5246,3.3794&status=available
```

#### Bulk Update Unit Coordinates

```http
PUT /maps/units/bulk-coordinates
```

**Request Body:**

```json
{
  "updates": [
    {
      "unitId": "string",
      "coordinates": {
        "lat": 6.5244,
        "lng": 3.3792
      }
    }
  ]
}
```

### 5.2 Map Layers

#### Get Map Layers

```http
GET /maps/layers
```

#### Create Map Layer

```http
POST /maps/layers
```

**Request Body:**

```json
{
  "name": "Available Units",
  "type": "markers",
  "filter": {
    "status": "available"
  },
  "style": {
    "color": "#10b981",
    "icon": "home"
  }
}
```

### 5.3 Geographic Analytics

#### Get Units by Area

```http
GET /maps/analytics/units-by-area?projectId=string
```

**Response:**

```json
{
  "success": true,
  "data": {
    "areas": [
      {
        "area": "Block A",
        "totalUnits": 24,
        "availableUnits": 8,
        "soldUnits": 12,
        "reservedUnits": 4
      }
    ]
  }
}
```

---

## 6. Accounting Analytics API

### 6.1 Financial Analytics

#### Get Income vs Expenses Chart

```http
GET /accounting/analytics/income-expenses?period=monthly&dateRange=last_6_months
```

**Response:**

```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "chartData": [
      {
        "month": "Jan",
        "income": 15200000,
        "expenses": 3400000
      }
    ],
    "summary": {
      "totalIncome": 85000000,
      "totalExpenses": 25000000,
      "netProfit": 60000000
    }
  }
}
```

#### Get Expense Breakdown

```http
GET /accounting/analytics/expense-breakdown?period=monthly&date=2024-01
```

**Response:**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "Marketing & Advertising",
        "value": 8500000,
        "color": "#8b5cf6",
        "percentage": 34
      }
    ],
    "total": 25000000
  }
}
```

#### Get Cash Flow Analysis

```http
GET /accounting/analytics/cash-flow?period=weekly&dateRange=last_month
```

### 6.2 Financial Reports

#### Generate Financial Summary

```http
POST /accounting/reports/summary
```

**Request Body:**

```json
{
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "includeCharts": true,
  "includeProjections": true
}
```

#### Export Financial Data

```http
POST /accounting/reports/export
```

**Request Body:**

```json
{
  "format": "csv|pdf|excel",
  "reportType": "income_expenses|cash_flow|balance_sheet",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

---

## 7. Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Invalid request parameters
- `AUTHENTICATION_ERROR`: Invalid or expired token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `INTERNAL_ERROR`: Server error

---

## 8. Rate Limiting

- **Standard endpoints**: 1000 requests per hour
- **Report generation**: 100 requests per hour
- **File uploads**: 50 requests per hour
- **Bulk operations**: 20 requests per hour

---

## 9. Webhooks

### Available Webhooks

- `lead.created`: When a new lead is created
- `lead.stage_changed`: When lead stage changes
- `event.reminder`: Before event reminder
- `document.uploaded`: When document is uploaded
- `unit.coordinates_updated`: When unit coordinates change

### Webhook Payload Example

```json
{
  "event": "lead.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "leadId": "string",
    "clientName": "string",
    "stage": "new_lead"
  }
}
```

---

## 10. Implementation Notes

### Database Requirements

- **Reports**: Store generated reports with metadata and filters
- **CRM**: Lead tracking with stage history and activity logs
- **Calendar**: Event scheduling with reminders and notifications
- **Documents**: File storage with metadata and versioning
- **Maps**: Geographic coordinates with spatial indexing
- **Accounting**: Financial data with audit trails

### Performance Considerations

- Implement caching for frequently accessed data
- Use pagination for large datasets
- Optimize database queries with proper indexing
- Implement background jobs for report generation
- Use CDN for document downloads

### Security Requirements

- Validate all input parameters
- Implement proper access control
- Sanitize file uploads
- Log all API access
- Implement rate limiting
- Use HTTPS for all communications


---

## 11. Frontend Implementation Guide

### 11.1 Reports & Analytics Frontend Integration

#### React Hook for Reports
```typescript
// hooks/useAdvancedReports.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface ReportFilters {
  dateRange: { start: string; end: string };
  projectId?: string;
  marketerId?: string;
  status?: string[];
  minAmount?: number;
  maxAmount?: number;
}

interface SalesReport {
  summary: {
    totalSales: number;
    totalVolume: number;
    activeClients: number;
    averageDealSize: number;
  };
  sales: Array<{
    id: string;
    clientName: string;
    project: string;
    unit: string;
    amount: number;
    marketer: string;
    commission: number;
    commissionStatus: string;
    status: string;
    date: string;
  }>;
}

export const useAdvancedReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [salesReport, setSalesReport] = useState<SalesReport | null>(null);

  const generateSalesReport = async (filters: ReportFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/reports/sales/generate', { filters });
      setSalesReport(response.data.data);
      
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to generate report';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: 'csv' | 'pdf' | 'excel', filters: ReportFilters) => {
    try {
      const response = await api.post('/reports/sales/export', { format, filters });
      return response.data.data.downloadUrl;
    } catch (err) {
      throw new Error('Failed to export report');
    }
  };

  return {
    loading,
    error,
    salesReport,
    generateSalesReport,
    exportReport,
    clearError: () => setError(null)
  };
};
```

#### Reports Component with API Integration
```typescript
// components/AdvancedReports.tsx
import React, { useState } from 'react';
import { useAdvancedReports } from '@/hooks/useAdvancedReports';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Select } from '@/components/ui/select';

export const AdvancedReports: React.FC = () => {
  const {
    loading,
    error,
    salesReport,
    generateSalesReport,
    exportReport,
    clearError
  } = useAdvancedReports();

  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    projectId: '',
    marketerId: '',
    status: []
  });

  const handleGenerateReport = async () => {
    try {
      await generateSalesReport(filters);
    } catch (err) {
      console.error('Report generation failed:', err);
    }
  };

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    try {
      const downloadUrl = await exportReport(format, filters);
      window.open(downloadUrl, '_blank');
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <DatePicker
              label="Start Date"
              value={filters.dateRange.start}
              onChange={(date) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: date }
              }))}
            />
            <DatePicker
              label="End Date"
              value={filters.dateRange.end}
              onChange={(date) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: date }
              }))}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleGenerateReport} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
            <Button onClick={() => handleExport('csv')} variant="outline">
              Export CSV
            </Button>
            <Button onClick={() => handleExport('pdf')} variant="outline">
              Export PDF
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800">{error}</p>
              <Button onClick={clearError} variant="ghost" size="sm">
                Clear Error
              </Button>
            </div>
          )}

          {/* Report Results */}
          {salesReport && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Report Summary</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded">
                  <p className="text-sm text-blue-600">Total Sales</p>
                  <p className="text-2xl font-bold">{salesReport.summary.totalSales}</p>
                </div>
                <div className="p-4 bg-green-50 rounded">
                  <p className="text-sm text-green-600">Total Volume</p>
                  <p className="text-2xl font-bold">₦{salesReport.summary.totalVolume.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <p className="text-sm text-purple-600">Active Clients</p>
                  <p className="text-2xl font-bold">{salesReport.summary.activeClients}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded">
                  <p className="text-sm text-orange-600">Avg Deal Size</p>
                  <p className="text-2xl font-bold">₦{salesReport.summary.averageDealSize.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
```

### 11.2 CRM Pipeline Frontend Integration

#### CRM Service Hook
```typescript
// hooks/useCRMPipeline.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  stage: string;
  projectInterest: string;
  source: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  dealValue: number;
  location?: string;
  budget?: number;
  preferences: string[];
  notes: string[];
  tags: string[];
  createdAt: string;
  lastActivity: string;
  nextFollowUp?: string;
  status: 'active' | 'closed_won' | 'closed_lost';
}

interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  probability: number;
  isActive: boolean;
}

export const useCRMPipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await api.get('/crm/leads', { params: filters });
      setLeads(response.data.data);
    } catch (err) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const response = await api.post('/crm/leads', leadData);
      const newLead = response.data.data;
      setLeads(prev => [...prev, newLead]);
      return newLead;
    } catch (err) {
      throw new Error('Failed to create lead');
    }
  };

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const response = await api.put(`/crm/leads/${leadId}`, updates);
      const updatedLead = response.data.data;
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? updatedLead : lead
      ));
      return updatedLead;
    } catch (err) {
      throw new Error('Failed to update lead');
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      await api.delete(`/crm/leads/${leadId}`);
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
    } catch (err) {
      throw new Error('Failed to delete lead');
    }
  };

  const convertLeadToClient = async (leadId: string, clientData: any) => {
    try {
      const response = await api.post(`/crm/leads/${leadId}/convert`, clientData);
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to convert lead');
    }
  };

  const fetchPipelineStages = async () => {
    try {
      const response = await api.get('/crm/pipeline/stages');
      setStages(response.data.data);
    } catch (err) {
      setError('Failed to fetch pipeline stages');
    }
  };

  const updatePipelineStage = async (stageId: string, updates: Partial<PipelineStage>) => {
    try {
      const response = await api.put(`/crm/pipeline/stages/${stageId}`, updates);
      const updatedStage = response.data.data;
      setStages(prev => prev.map(stage => 
        stage.id === stageId ? updatedStage : stage
      ));
      return updatedStage;
    } catch (err) {
      throw new Error('Failed to update pipeline stage');
    }
  };

  const reorderPipelineStages = async (newOrder: Array<{id: string; order: number}>) => {
    try {
      await api.put('/crm/pipeline/stages/reorder', { stages: newOrder });
      await fetchPipelineStages(); // Refresh stages
    } catch (err) {
      throw new Error('Failed to reorder pipeline stages');
    }
  };

  const getPipelineMetrics = async (dateRange?: string) => {
    try {
      const response = await api.get('/crm/pipeline/metrics', {
        params: { dateRange }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch pipeline metrics');
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchPipelineStages();
  }, []);

  return {
    leads,
    stages,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    convertLeadToClient,
    updatePipelineStage,
    reorderPipelineStages,
    getPipelineMetrics,
    clearError: () => setError(null)
  };
};
```

### 11.3 Calendar & Scheduling Frontend Integration

#### Calendar Service Hook
```typescript
// hooks/useCalendarScheduling.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'inspection' | 'followup' | 'task' | 'meeting' | 'call' | 'site_visit';
  date: string;
  time: string;
  duration: number;
  clientId?: string;
  clientName?: string;
  clientPhone?: string;
  developmentId?: string;
  developmentName?: string;
  location?: string;
  description: string;
  reminder: boolean;
  reminderMinutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export const useCalendarScheduling = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await api.get('/calendar/events', { params: filters });
      setEvents(response.data.data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      const response = await api.post('/calendar/events', eventData);
      const newEvent = response.data.data;
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      throw new Error('Failed to create event');
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      const response = await api.put(`/calendar/events/${eventId}`, updates);
      const updatedEvent = response.data.data;
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      throw new Error('Failed to update event');
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await api.delete(`/calendar/events/${eventId}`);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      throw new Error('Failed to delete event');
    }
  };

  const updateEventStatus = async (eventId: string, status: string, notes?: string) => {
    try {
      const response = await api.patch(`/calendar/events/${eventId}/status`, { status, notes });
      const updatedEvent = response.data.data;
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      throw new Error('Failed to update event status');
    }
  };

  const getCalendarView = async (view: string, date: string, userId?: string) => {
    try {
      const response = await api.get('/calendar/view', {
        params: { view, date, userId }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch calendar view');
    }
  };

  const getUpcomingReminders = async (userId?: string) => {
    try {
      const response = await api.get('/calendar/reminders', {
        params: { userId, upcoming: true }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch reminders');
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
    getCalendarView,
    getUpcomingReminders,
    clearError: () => setError(null)
  };
};
```

### 11.4 Document Management Frontend Integration

#### Document Service Hook
```typescript
// hooks/useDocumentManagement.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Document {
  id: string;
  title: string;
  fileName: string;
  category: string;
  linkedTo: 'client' | 'project';
  linkedId: string;
  linkedName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  url?: string;
  tags: string[];
}

export const useDocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await api.get('/documents', { params: filters });
      setDocuments(response.data.data);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, metadata: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });

      const response = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newDocument = response.data.data;
      setDocuments(prev => [...prev, newDocument]);
      return newDocument;
    } catch (err) {
      throw new Error('Failed to upload document');
    }
  };

  const downloadDocument = async (documentId: string) => {
    try {
      const response = await api.get(`/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      throw new Error('Failed to download document');
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      await api.delete(`/documents/${documentId}`);
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (err) {
      throw new Error('Failed to delete document');
    }
  };

  const searchDocuments = async (query: string, filters?: any) => {
    try {
      const response = await api.post('/documents/search', { query, filters });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to search documents');
    }
  };

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    searchDocuments,
    clearError: () => setError(null)
  };
};
```

### 11.5 Geographic Mapping Frontend Integration

#### Map Service Hook
```typescript
// hooks/useGeographicMapping.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Unit {
  id: string;
  name: string;
  type: string;
  coordinates: { lat: number; lng: number };
  status: string;
  projectId: string;
  blockId: string;
  floor: number;
  unitNumber: string;
}

interface MapLayer {
  id: string;
  name: string;
  type: string;
  filter: any;
  style: {
    color: string;
    icon: string;
  };
}

export const useGeographicMapping = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [layers, setLayers] = useState<MapLayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUnits = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await api.get('/maps/units', { params: filters });
      setUnits(response.data.data);
    } catch (err) {
      setError('Failed to fetch units');
    } finally {
      setLoading(false);
    }
  };

  const createUnit = async (unitData: Partial<Unit>) => {
    try {
      const response = await api.post('/maps/units', unitData);
      const newUnit = response.data.data;
      setUnits(prev => [...prev, newUnit]);
      return newUnit;
    } catch (err) {
      throw new Error('Failed to create unit');
    }
  };

  const updateUnitCoordinates = async (unitId: string, coordinates: { lat: number; lng: number }) => {
    try {
      const response = await api.put(`/maps/units/${unitId}/coordinates`, { coordinates });
      const updatedUnit = response.data.data;
      setUnits(prev => prev.map(unit => 
        unit.id === unitId ? updatedUnit : unit
      ));
      return updatedUnit;
    } catch (err) {
      throw new Error('Failed to update unit coordinates');
    }
  };

  const bulkUpdateCoordinates = async (updates: Array<{unitId: string; coordinates: {lat: number; lng: number}}>) => {
    try {
      const response = await api.put('/maps/units/bulk-coordinates', { updates });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to bulk update coordinates');
    }
  };

  const getUnitsByLocation = async (bounds: string, status?: string) => {
    try {
      const response = await api.get('/maps/units', {
        params: { bounds, status }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch units by location');
    }
  };

  const fetchMapLayers = async () => {
    try {
      const response = await api.get('/maps/layers');
      setLayers(response.data.data);
    } catch (err) {
      setError('Failed to fetch map layers');
    }
  };

  const createMapLayer = async (layerData: Partial<MapLayer>) => {
    try {
      const response = await api.post('/maps/layers', layerData);
      const newLayer = response.data.data;
      setLayers(prev => [...prev, newLayer]);
      return newLayer;
    } catch (err) {
      throw new Error('Failed to create map layer');
    }
  };

  const getUnitsByArea = async (projectId?: string) => {
    try {
      const response = await api.get('/maps/analytics/units-by-area', {
        params: { projectId }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch units by area');
    }
  };

  return {
    units,
    layers,
    loading,
    error,
    fetchUnits,
    createUnit,
    updateUnitCoordinates,
    bulkUpdateCoordinates,
    getUnitsByLocation,
    fetchMapLayers,
    createMapLayer,
    getUnitsByArea,
    clearError: () => setError(null)
  };
};
```

### 11.6 Accounting Analytics Frontend Integration

#### Accounting Service Hook
```typescript
// hooks/useAccountingAnalytics.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface IncomeExpensesData {
  period: string;
  chartData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  };
}

interface ExpenseBreakdown {
  categories: Array<{
    name: string;
    value: number;
    color: string;
    percentage: number;
  }>;
  total: number;
}

export const useAccountingAnalytics = () => {
  const [incomeExpenses, setIncomeExpenses] = useState<IncomeExpensesData | null>(null);
  const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIncomeExpenses = async (period: string, dateRange: string) => {
    try {
      setLoading(true);
      const response = await api.get('/accounting/analytics/income-expenses', {
        params: { period, dateRange }
      });
      setIncomeExpenses(response.data.data);
      return response.data.data;
    } catch (err) {
      setError('Failed to fetch income vs expenses data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseBreakdown = async (period: string, date: string) => {
    try {
      const response = await api.get('/accounting/analytics/expense-breakdown', {
        params: { period, date }
      });
      setExpenseBreakdown(response.data.data);
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch expense breakdown');
    }
  };

  const fetchCashFlow = async (period: string, dateRange: string) => {
    try {
      const response = await api.get('/accounting/analytics/cash-flow', {
        params: { period, dateRange }
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to fetch cash flow data');
    }
  };

  const generateFinancialSummary = async (dateRange: any, options?: any) => {
    try {
      const response = await api.post('/accounting/reports/summary', {
        dateRange,
        ...options
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Failed to generate financial summary');
    }
  };

  const exportFinancialData = async (format: string, reportType: string, dateRange: any) => {
    try {
      const response = await api.post('/accounting/reports/export', {
        format,
        reportType,
        dateRange
      });
      return response.data.data.downloadUrl;
    } catch (err) {
      throw new Error('Failed to export financial data');
    }
  };

  return {
    incomeExpenses,
    expenseBreakdown,
    loading,
    error,
    fetchIncomeExpenses,
    fetchExpenseBreakdown,
    fetchCashFlow,
    generateFinancialSummary,
    exportFinancialData,
    clearError: () => setError(null)
  };
};
```

### 11.7 API Service Configuration

#### Base API Service
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.proptyos.com/v1',
  timeout: 30000,
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };
```

### 11.8 Error Handling & Toast Notifications

#### Toast Service
```typescript
// services/toastService.ts
import { toast } from 'sonner';

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showInfo = (message: string) => {
  toast.info(message);
};

export const showWarning = (message: string) => {
  toast.warning(message);
};

export const handleApiError = (error: any, defaultMessage: string = 'An error occurred') => {
  const message = error.response?.data?.error?.message || error.message || defaultMessage;
  showError(message);
  return message;
};
```

### 11.9 Usage Examples

#### Complete Integration Example
```typescript
// pages/AdvancedTools.tsx
import React from 'react';
import { AdvancedReports } from '@/components/AdvancedReports';
import { CRMPipeline } from '@/components/CRMPipeline';
import { CalendarScheduling } from '@/components/CalendarScheduling';
import { DocumentManager } from '@/components/DocumentManager';
import { GeographicMapping } from '@/components/GeographicMapping';
import { AccountingAnalytics } from '@/components/AccountingAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AdvancedTools: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Advanced Tools</h1>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="maps">Maps</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <AdvancedReports />
        </TabsContent>

        <TabsContent value="crm">
          <CRMPipeline />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarScheduling />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentManager />
        </TabsContent>

        <TabsContent value="maps">
          <GeographicMapping />
        </TabsContent>

        <TabsContent value="accounting">
          <AccountingAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

This comprehensive guide provides:

1. **Complete API specifications** for all advanced tools modules
2. **React hooks** for each service with proper error handling
3. **Component implementations** showing how to consume the APIs
4. **Service configuration** with authentication and interceptors
5. **Error handling** and toast notifications
6. **Usage examples** for complete integration

The implementation follows React best practices with:
- Custom hooks for API calls
- Proper state management
- Error handling and loading states
- TypeScript interfaces for type safety
- Responsive UI components
- Toast notifications for user feedback

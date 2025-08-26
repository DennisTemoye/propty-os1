# Fee Collection API - Frontend Integration Manual

## Overview

This manual provides comprehensive guidance for frontend developers to integrate with the Fee Collection API. The API is designed to handle all aspects of property development fee management, from fee types and assignments to payment collection and reporting.

## Base URL

```
https://your-domain.com/api/v1/fee-collection
```

## Authentication

All API endpoints require authentication. Include the JWT token in the Authorization header:

```javascript
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## API Endpoints

### 1. Fee Types Management

#### Create Fee Type
```javascript
const createFeeType = async (feeTypeData) => {
  try {
    const response = await fetch('/api/v1/fee-collection/fee-types', {
      method: 'POST',
      headers,
      body: JSON.stringify(feeTypeData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating fee type:', error);
    throw error;
  }
};

// Usage
const newFeeType = await createFeeType({
  name: "Infrastructure Development Fee",
  code: "INFRA_FEE",
  description: "Fee for infrastructure development",
  defaultAmount: 5000000,
  currency: "NGN",
  frequency: "one-time",
  autoAssign: true,
  linkedToMilestones: false,
  applicableProjects: ["proj_001", "proj_002"]
});
```

#### Get Fee Types
```javascript
const getFeeTypes = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/fee-collection/fee-types?${queryParams}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching fee types:', error);
    throw error;
  }
};

// Usage with filters
const feeTypes = await getFeeTypes({
  isActive: true,
  projectId: 'proj_001',
  frequency: 'one-time',
  page: 1,
  limit: 10,
  search: 'infrastructure'
});
```

#### Update Fee Type
```javascript
const updateFeeType = async (id, updateData) => {
  try {
    const response = await fetch(`/api/v1/fee-collection/fee-types/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating fee type:', error);
    throw error;
  }
};
```

### 2. Fee Management

#### Create Fee
```javascript
const createFee = async (feeData) => {
  try {
    const response = await fetch('/api/v1/fee-collection/fees', {
      method: 'POST',
      headers,
      body: JSON.stringify(feeData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating fee:', error);
    throw error;
  }
};

// Usage
const newFee = await createFee({
  feeTypeId: "ft_001",
  clientId: "client_001",
  projectId: "proj_001",
  unitId: "unit_001",
  amount: 5000000,
  currency: "NGN",
  dueDate: "2024-03-15",
  description: "Infrastructure fee for Block A Plot 02"
});
```

#### Get Fees with Advanced Filtering
```javascript
const getFees = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/fee-collection/fees?${queryParams}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching fees:', error);
    throw error;
  }
};

// Usage with comprehensive filters
const fees = await getFees({
  status: 'overdue',
  projectId: 'proj_001',
  clientId: 'client_001',
  dueDateFrom: '2024-01-01',
  dueDateTo: '2024-12-31',
  amountMin: 1000000,
  amountMax: 10000000,
  page: 1,
  limit: 20,
  search: 'infrastructure'
});
```

#### Get Client Fees
```javascript
const getClientFees = async (clientId, filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/fee-collection/clients/${clientId}/fees?${queryParams}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching client fees:', error);
    throw error;
  }
};
```

### 3. Payment Management

#### Record Payment
```javascript
const recordPayment = async (paymentData) => {
  try {
    const response = await fetch('/api/v1/fee-collection/payments', {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error recording payment:', error);
    throw error;
  }
};

// Usage
const newPayment = await recordPayment({
  feeId: "fee_001",
  clientId: "client_001",
  amount: 2000000,
  currency: "NGN",
  paymentMethod: "bank_transfer",
  reference: "BANK_REF_001",
  transactionId: "TXN_12345",
  notes: "Partial payment for infrastructure fee",
  processingFee: 1000
});
```

#### Update Payment Status
```javascript
const updatePaymentStatus = async (paymentId, status, notes) => {
  try {
    const response = await fetch(`/api/v1/fee-collection/payments/${paymentId}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status, notes })
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
```

#### Refund Payment
```javascript
const refundPayment = async (paymentId, notes) => {
  try {
    const response = await fetch(`/api/v1/fee-collection/payments/${paymentId}/refund`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ notes })
    });
    return await response.json();
  } catch (error) {
    console.error('Error refunding payment:', error);
    throw error;
  }
};
```

### 4. Analytics & Reporting

#### Collection Summary
```javascript
const getCollectionSummary = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/fee-collection/analytics/collection-summary?${queryParams}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching collection summary:', error);
    throw error;
  }
};

// Usage
const summary = await getCollectionSummary({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  projectId: 'proj_001'
});
```

#### Project Performance
```javascript
const getProjectPerformance = async (projectId, period = 'monthly') => {
  try {
    const response = await fetch(`/api/v1/fee-collection/analytics/projects/${projectId}/performance?period=${period}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching project performance:', error);
    throw error;
  }
};
```

#### Overdue Report
```javascript
const getOverdueReport = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/fee-collection/analytics/overdue-report?${queryParams}`, {
      method: 'GET',
      headers
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching overdue report:', error);
    throw error;
  }
};

// Usage
const overdueReport = await getOverdueReport({
  daysOverdue: 30,
  projectId: 'proj_001',
  limit: 100
});
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
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

## Pagination

List endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes pagination metadata:
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

## Error Handling

### Common Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `CONFLICT`: Resource conflict
- `BUSINESS_RULE_VIOLATION`: Violates business logic

### Frontend Error Handling Example
```javascript
const handleApiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    
    if (response.success) {
      return response.data;
    } else {
      // Handle business logic errors
      const error = response.error;
      switch (error.code) {
        case 'VALIDATION_ERROR':
          showValidationError(error.message, error.details);
          break;
        case 'NOT_FOUND':
          showNotFoundError(error.message);
          break;
        case 'CONFLICT':
          showConflictError(error.message);
          break;
        default:
          showGenericError(error.message);
      }
      throw new Error(error.message);
    }
  } catch (error) {
    // Handle network/technical errors
    console.error('API call failed:', error);
    showNetworkError();
    throw error;
  }
};
```

## Data Models

### Fee Type
```typescript
interface FeeType {
  id: string;
  name: string;
  code: string;
  description?: string;
  defaultAmount: number;
  currency: string;
  frequency: "one-time" | "recurring" | "milestone-based";
  recurringInterval?: "monthly" | "quarterly" | "yearly";
  isActive: boolean;
  autoAssign: boolean;
  linkedToMilestones: boolean;
  applicableProjects: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Fee
```typescript
interface Fee {
  id: string;
  feeTypeId: string;
  clientId: string;
  projectId: string;
  unitId?: string;
  amount: number;
  currency: string;
  status: "pending" | "partially_paid" | "paid" | "overdue" | "cancelled";
  dueDate: string;
  assignedDate: string;
  description?: string;
  totalPaid: number;
  outstandingBalance: number;
  paymentProgress: number;
  daysOverdue: number;
  createdAt: string;
  updatedAt: string;
}
```

### Payment
```typescript
interface Payment {
  id: string;
  feeId: string;
  clientId: string;
  amount: number;
  currency: string;
  paymentMethod: "bank_transfer" | "pos" | "online" | "cash" | "check";
  reference: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  notes?: string;
  receiptUrl?: string;
  collectedBy: string;
  collectedAt: string;
  processingFee: number;
  netAmount: number;
  createdAt: string;
  updatedAt: string;
}
```

## Frontend Implementation Examples

### React Hook for Fee Management
```javascript
import { useState, useEffect } from 'react';

const useFees = (filters = {}) => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchFees = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getFees({ ...filters, ...newFilters });
      
      if (response.success) {
        setFees(response.data.fees);
        setPagination(response.data.pagination);
      } else {
        setError(response.error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return {
    fees,
    loading,
    error,
    pagination,
    refetch: fetchFees
  };
};
```

### Vue.js Composition API Example
```javascript
import { ref, reactive, onMounted } from 'vue';

export function useFeeCollection() {
  const fees = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filters = reactive({
    status: '',
    projectId: '',
    clientId: '',
    page: 1,
    limit: 10
  });

  const fetchFees = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await getFees(filters);
      
      if (response.success) {
        fees.value = response.data.fees;
      } else {
        error.value = response.error.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchFees);

  return {
    fees,
    loading,
    error,
    filters,
    fetchFees
  };
}
```

### Angular Service Example
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionService {
  private baseUrl = '/api/v1/fee-collection';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  constructor(private http: HttpClient) {}

  getFees(filters: any = {}): Observable<any> {
    const params = new URLSearchParams(filters);
    return this.http.get(`${this.baseUrl}/fees?${params}`, { headers: this.headers })
      .pipe(
        map((response: any) => response.data)
      );
  }

  createFee(feeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/fees`, feeData, { headers: this.headers })
      .pipe(
        map((response: any) => response.data)
      );
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
```

## Best Practices

### 1. Error Handling
- Always check `response.success` before processing data
- Implement proper error boundaries in React/Vue components
- Show user-friendly error messages
- Log technical errors for debugging

### 2. Loading States
- Show loading indicators during API calls
- Implement skeleton screens for better UX
- Disable forms during submission

### 3. Data Validation
- Validate data before sending to API
- Implement client-side validation rules
- Show validation errors immediately

### 4. Caching
- Cache frequently accessed data (fee types, projects)
- Implement optimistic updates for better UX
- Use React Query, SWR, or similar libraries

### 5. Real-time Updates
- Implement WebSocket connections for payment status updates
- Use polling for critical data (overdue fees)
- Show real-time collection summaries

## Testing

### API Testing with Jest
```javascript
import { getFees, createFee } from '../api/feeCollection';

describe('Fee Collection API', () => {
  test('should fetch fees with filters', async () => {
    const mockResponse = {
      success: true,
      data: {
        fees: [],
        pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
      }
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });

    const result = await getFees({ status: 'pending' });
    expect(result.success).toBe(true);
    expect(result.data.fees).toEqual([]);
  });
});
```

### Component Testing
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import { FeeList } from '../components/FeeList';

test('should display fees list', async () => {
  render(<FeeList />);
  
  await waitFor(() => {
    expect(screen.getByText('Loading...')).not.toBeInTheDocument();
  });
  
  expect(screen.getByText('Fees')).toBeInTheDocument();
});
```

## Deployment Considerations

### Environment Variables
```javascript
// .env
REACT_APP_API_BASE_URL=https://api.production.com/api/v1
REACT_APP_ENVIRONMENT=production

// .env.development
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
REACT_APP_ENVIRONMENT=development
```

### API Configuration
```javascript
const config = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  retries: 3
};
```

### Monitoring
- Implement API call logging
- Monitor response times
- Track error rates
- Set up alerts for critical failures

This manual provides a comprehensive guide for frontend developers to integrate with the Fee Collection API. For additional support or questions, refer to the API documentation or contact the backend development team.

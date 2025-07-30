# API Setup with Axios - ProptyOS

This document explains how to use the axios-based API service setup in the ProptyOS project.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [API Services](#api-services)
5. [Usage Examples](#usage-examples)
6. [React Query Integration](#react-query-integration)
7. [Error Handling](#error-handling)
8. [File Upload](#file-upload)
9. [Authentication](#authentication)
10. [Best Practices](#best-practices)

## Overview

The API setup provides a comprehensive solution for making HTTP requests to your backend API. It includes:

- **Base API Service**: Configured axios instance with interceptors
- **Authentication Service**: Login, register, token management
- **Module-specific Services**: Projects, Clients, Sales, etc.
- **React Query Hooks**: For state management and caching
- **Error Handling**: Centralized error handling and user feedback
- **File Upload/Download**: Built-in file handling capabilities

## Installation

Axios is already installed in the project. If you need to install it manually:

```bash
npm install axios
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Configuration

The API configuration is defined in `src/constants/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  VERSION: "v1",
  TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};
```

## API Services

### Base API Service (`src/services/api.ts`)

The base service provides common HTTP methods and error handling:

```typescript
import { apiService } from "@/services/api";

// GET request
const response = await apiService.get("/endpoint");

// POST request
const response = await apiService.post("/endpoint", data);

// PUT request
const response = await apiService.put("/endpoint", data);

// DELETE request
const response = await apiService.delete("/endpoint");

// File upload
const response = await apiService.upload("/upload", file, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});

// File download
await apiService.download("/download", "filename.pdf");
```

### Authentication Service (`src/services/authService.ts`)

Handles user authentication and token management:

```typescript
import { AuthService } from "@/services/authService";

// Login
const response = await AuthService.login({
  email: "user@example.com",
  password: "password",
});

// Register
const response = await AuthService.register({
  email: "user@example.com",
  password: "password",
  confirmPassword: "password",
  firstName: "John",
  lastName: "Doe",
});

// Logout
await AuthService.logout();

// Check if user is authenticated
const isAuth = AuthService.isAuthenticated();

// Get current token
const token = AuthService.getToken();
```

### Projects Service (`src/services/projectsService.ts`)

Manages project-related API calls:

```typescript
import { ProjectsService } from "@/services/projectsService";

// Get all projects with filters
const response = await ProjectsService.getProjects({
  status: "active",
  type: "residential",
  page: 1,
  limit: 10,
});

// Get specific project
const project = await ProjectsService.getProject("project-id");

// Create new project
const newProject = await ProjectsService.createProject({
  name: "New Project",
  location: "Lagos, Nigeria",
  type: "residential",
  totalUnits: 50,
  priceRange: { min: 50000000, max: 200000000 },
});

// Update project
await ProjectsService.updateProject("project-id", {
  name: "Updated Project Name",
});

// Delete project
await ProjectsService.deleteProject("project-id");

// Upload project document
await ProjectsService.uploadProjectDocument("project-id", file, (progress) => {
  console.log(`Upload: ${progress}%`);
});

// Export project data
await ProjectsService.exportProject("project-id", "excel");
```

### Clients Service (`src/services/clientsService.ts`)

Manages client-related API calls:

```typescript
import { ClientsService } from "@/services/clientsService";

// Get all clients
const response = await ClientsService.getClients({
  status: "active",
  search: "john",
});

// Get specific client
const client = await ClientsService.getClient("client-id");

// Create new client
const newClient = await ClientsService.createClient({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+2348012345678",
  address: {
    street: "123 Main St",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "100001",
  },
  employment: {
    employer: "Tech Company",
    position: "Software Engineer",
    salary: 5000000,
    employmentType: "full-time",
  },
  source: "website",
});

// Get client payments
const payments = await ClientsService.getClientPayments("client-id");

// Get client statement
const statement = await ClientsService.getClientStatement(
  "client-id",
  "2024-01-01",
  "2024-12-31"
);

// Export client statement
await ClientsService.exportClientStatement(
  "client-id",
  "pdf",
  "2024-01-01",
  "2024-12-31"
);
```

## Usage Examples

### Basic Component Example

```typescript
import React, { useState, useEffect } from "react";
import { ProjectsService } from "@/services/projectsService";
import { toast } from "sonner";

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await ProjectsService.getProjects({ status: "active" });
      if (response.success) {
        setProjects(response.data);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.location}</p>
          </div>
        ))
      )}
    </div>
  );
};
```

### Form Submission Example

```typescript
import React, { useState } from "react";
import { ProjectsService } from "@/services/projectsService";
import { toast } from "sonner";

const CreateProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "residential",
    totalUnits: 0,
    priceRange: { min: 0, max: 0 },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ProjectsService.createProject(formData);
      if (response.success) {
        toast.success("Project created successfully!");
        // Reset form or redirect
      } else {
        toast.error(response.message || "Failed to create project");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Project Name"
        required
      />
      {/* Other form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};
```

## React Query Integration

For better state management and caching, use the provided React Query hooks:

### Setup React Query

First, ensure React Query is set up in your app:

```typescript
// In your main App component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

### Using React Query Hooks

```typescript
import React from "react";
import { useProjects, useProject } from "@/hooks/useApi";

// List projects with caching
const ProjectsList: React.FC = () => {
  const { projects, isLoading, isError, refetch } = useProjects({
    status: "active",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading projects</div>;

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
};

// Single project with related data
const ProjectDetail: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { project, units, blocks, documents, isLoading } =
    useProject(projectId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>Units: {units.length}</p>
      <p>Blocks: {blocks.length}</p>
      <p>Documents: {documents.length}</p>
    </div>
  );
};

// Mutations with automatic cache updates
const CreateProjectForm: React.FC = () => {
  const { createProject, isCreating } = useProjects();

  const handleSubmit = async (formData: any) => {
    await createProject(formData);
    // Cache is automatically updated
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};
```

## Error Handling

The API services include comprehensive error handling:

### Error Types

```typescript
interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
```

### Error Handling Example

```typescript
try {
  const response = await ProjectsService.createProject(data);
  if (response.success) {
    // Handle success
  } else {
    // Handle API error
    console.error(response.message);
    if (response.errors) {
      // Handle validation errors
      Object.entries(response.errors).forEach(([field, errors]) => {
        console.error(`${field}: ${errors.join(", ")}`);
      });
    }
  }
} catch (error: any) {
  // Handle network or other errors
  console.error(error.message);
  console.error(error.status);
}
```

## File Upload

### Upload with Progress

```typescript
const handleFileUpload = async (file: File) => {
  try {
    await ProjectsService.uploadProjectDocument(
      "project-id",
      file,
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
        // Update UI with progress
      }
    );
    toast.success("File uploaded successfully!");
  } catch (error) {
    toast.error("Upload failed");
  }
};
```

### Download Files

```typescript
const handleDownload = async () => {
  try {
    await ProjectsService.exportProject("project-id", "excel");
    toast.success("Download completed!");
  } catch (error) {
    toast.error("Download failed");
  }
};
```

## Authentication

### Login Flow

```typescript
import { AuthService } from "@/services/authService";

const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await AuthService.login(credentials);
    if (response.success) {
      // User is now logged in
      // Token is automatically stored and set in headers
      // Redirect to dashboard
    }
  } catch (error) {
    // Handle login error
  }
};
```

### Protected Routes

```typescript
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
```

### Token Refresh

The API service automatically handles token refresh when a 401 error is received. The refresh token is used to get a new access token, and the original request is retried.

## Best Practices

### 1. Use React Query for State Management

```typescript
// ✅ Good - Uses React Query for caching and state management
const { projects, isLoading } = useProjects();

// ❌ Avoid - Manual state management
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(false);
```

### 2. Handle Loading and Error States

```typescript
const MyComponent = () => {
  const { data, isLoading, isError, error } = useProjects();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return <ProjectsList projects={data} />;
};
```

### 3. Use Toast Notifications

```typescript
import { toast } from "sonner";

const handleAction = async () => {
  try {
    await someApiCall();
    toast.success("Action completed successfully!");
  } catch (error) {
    toast.error("Action failed");
  }
};
```

### 4. Type Your API Responses

```typescript
// ✅ Good - Typed response
const response = await apiService.get<Project>("/projects/123");

// ❌ Avoid - Untyped response
const response = await apiService.get("/projects/123");
```

### 5. Use Environment Variables

```typescript
// ✅ Good - Uses environment variable
VITE_API_BASE_URL=https://api.proptyos.com

// ❌ Avoid - Hardcoded URL
BASE_URL: 'https://api.proptyos.com'
```

### 6. Handle File Uploads Properly

```typescript
const handleUpload = async (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    // 10MB limit
    toast.error("File too large");
    return;
  }

  try {
    await uploadFile(file, (progress) => {
      // Update progress bar
    });
  } catch (error) {
    toast.error("Upload failed");
  }
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **401 Unauthorized**: Check if the token is valid and being sent correctly
3. **Network Errors**: Verify the API base URL is correct
4. **File Upload Issues**: Check file size limits and supported formats

### Debug Mode

Enable debug logging by setting the environment variable:

```env
VITE_DEBUG_API=true
```

This will log all API requests and responses to the console.

## API Endpoints Reference

See `src/constants/api.ts` for a complete list of available endpoints and their configurations.

## Contributing

When adding new API services:

1. Add endpoints to `src/constants/api.ts`
2. Create service file in `src/services/`
3. Add React Query hooks in `src/hooks/useApi.ts`
4. Update this documentation
5. Add TypeScript types for request/response data

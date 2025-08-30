# Tech Context: Teams and Roles Management System

## Technology Stack

### Frontend Technologies

#### Core Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Strong typing for better development experience
- **Vite 5.4.1**: Fast build tool and development server

#### UI Components & Styling
- **Shadcn/ui**: Modern, accessible UI component library
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives for complex components
- **Lucide React**: Beautiful, customizable icons

#### State Management & Data Fetching
- **React Query (TanStack Query) 5.56.2**: Server state management
- **React Hook Form 7.53.0**: Form handling and validation
- **Zod 3.23.8**: Schema validation library

#### Routing & Navigation
- **React Router DOM 6.26.2**: Client-side routing
- **React Beautiful DnD 13.1.1**: Drag and drop functionality

### Backend Integration

#### API Communication
- **Axios 1.11.0**: HTTP client for API requests
- **Custom API Service**: Centralized API management
- **Middleware Chain**: Request/response processing

#### Authentication
- **JWT Tokens**: Stateless authentication
- **Local Storage**: Token persistence
- **Refresh Token**: Automatic token renewal

### Development Tools

#### Code Quality
- **ESLint 9.9.0**: Code linting and formatting
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Prettier**: Code formatting (via ESLint)

#### Build & Development
- **Vite**: Fast development server and build tool
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Dependencies Analysis

### Core Dependencies

#### UI Components
```json
{
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1"
}
```

#### Form Handling
```json
{
  "@hookform/resolvers": "^3.9.0",
  "react-hook-form": "^7.53.0",
  "zod": "^3.23.8"
}
```

#### Data Management
```json
{
  "@tanstack/react-query": "^5.56.2",
  "axios": "^1.11.0"
}
```

### Development Dependencies

#### TypeScript & Linting
```json
{
  "typescript": "^5.5.3",
  "typescript-eslint": "^8.0.1",
  "eslint": "^9.9.0"
}
```

#### Build Tools
```json
{
  "vite": "^5.4.1",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "tailwindcss": "^3.4.11"
}
```

## Project Structure

### Directory Organization
```
src/
├── components/           # React components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── roles/       # Role management components
│   │   └── ...
│   ├── ui/              # Reusable UI components
│   └── common/          # Common utility components
├── services/            # API services and business logic
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── constants/           # Application constants
├── utils/               # Utility functions
└── pages/               # Page components
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `RolesList.tsx`)
- **Services**: camelCase (e.g., `rolesService.ts`)
- **Types**: camelCase (e.g., `roleTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

## API Integration

### Current API Structure
```typescript
// Base API configuration
const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  VERSION: "v1",
  TIMEOUT: 30000
};

// Endpoint organization
const API_ENDPOINTS = {
  AUTH: { /* authentication endpoints */ },
  COMPANIES: { /* company management */ },
  PROJECTS: { /* project management */ },
  CLIENTS: { /* client management */ }
  // ... other endpoints
};
```

### API Service Pattern
```typescript
export class ApiService {
  static async get<T>(endpoint: string): Promise<ApiResponse<T>>
  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>>
  static async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>>
  static async delete<T>(endpoint: string): Promise<ApiResponse<T>>
}
```

## Middleware Architecture

### Current Middleware Chain
```typescript
const defaultMiddlewareChain = new MiddlewareChain([
  new AuthMiddleware(),
  new CompanyContextMiddleware(),
  new LoggingMiddleware(),
  new ErrorHandlingMiddleware()
]);
```

### Middleware Execution Order
1. **Request Processing**: Authentication, company context extraction
2. **Business Logic**: Permission validation, data processing
3. **Response Processing**: Data transformation, logging
4. **Error Handling**: Error capture, user-friendly messages

## Type System

### Current Type Definitions
```typescript
// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;
}

// Error types
interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
```

### Type Extensions Needed
```typescript
// Role management types
interface Role {
  id: string;
  name: string;
  description: string;
  level: RoleLevel;
  permissions: ModulePermissions;
  companyId: string;
  isDefault: boolean;
  isActive: boolean;
}

// Team member types
interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  status: MemberStatus;
  companyId: string;
  invitedAt: string;
}
```

## Performance Considerations

### Current Optimizations
- **React Query**: Automatic caching and background updates
- **Vite**: Fast hot module replacement
- **Tailwind**: Optimized CSS generation
- **Code Splitting**: Route-based code splitting

### Planned Optimizations
- **Permission Caching**: In-memory permission storage
- **Lazy Loading**: Component and data lazy loading
- **Indexed Queries**: Database query optimization
- **Bundle Analysis**: Webpack bundle optimization

## Security Implementation

### Current Security Features
- **JWT Authentication**: Secure token-based auth
- **HTTPS Only**: Secure communication
- **Input Validation**: Request data validation
- **Error Handling**: Secure error messages

### Planned Security Features
- **Permission Validation**: Role-based access control
- **Company Isolation**: Data boundary enforcement
- **Activity Logging**: Comprehensive audit trail
- **Rate Limiting**: API abuse prevention

## Testing Strategy

### Current Testing Setup
- **ESLint**: Code quality enforcement
- **TypeScript**: Compile-time error checking
- **React DevTools**: Development debugging

### Planned Testing Implementation
- **Unit Tests**: Component and service testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing

## Deployment & Environment

### Development Environment
- **Local Development**: Vite dev server
- **API Backend**: Localhost:3000
- **Database**: Local development database
- **Environment Variables**: `.env.local`

### Production Considerations
- **Build Optimization**: Vite production build
- **CDN Integration**: Static asset delivery
- **Environment Variables**: Production configuration
- **Monitoring**: Performance and error tracking

## Integration Points

### Existing Systems
- **Authentication Service**: JWT token management
- **API Service**: HTTP request handling
- **Dashboard Components**: Existing role components
- **Routing System**: React Router setup

### New Integrations
- **Permission Middleware**: Role validation
- **Activity Logger**: System event tracking
- **Role Service**: Role management API
- **Team Service**: Team member management

## Migration Strategy

### Phase 1: Foundation
- Create new type definitions
- Implement core services
- Add permission middleware

### Phase 2: Integration
- Update existing components
- Add new role management UI
- Implement activity logging

### Phase 3: Enhancement
- Add advanced features
- Performance optimization
- Comprehensive testing

### Phase 4: Deployment
- Production deployment
- Monitoring setup
- User training and documentation



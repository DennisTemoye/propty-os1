// Permission Middleware for Teams and Roles Management

import { PermissionsService } from './permissionsService';
import type { ModuleName } from '@/types/permissions';

/**
 * Middleware factory for permission validation
 * @param module - The module to check permissions for
 * @param action - The action to validate (view, create, edit, delete)
 * @returns Middleware function that validates permissions
 */
export function validatePermission(
  module: ModuleName,
  action: 'view' | 'create' | 'edit' | 'delete'
) {
  return async (req: any, res: any, next: any) => {
    try {
      // Extract company context from request
      const companyId = req.user?.companyId || req.user?.businessName;
      
      if (!companyId) {
        return res.status(401).json({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Company context not found',
        });
      }

      // Check if user has permission for the requested action
      const hasPermission = await PermissionsService.validateCompanyPermissions(
        companyId,
        module,
        action
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          error: 'PERMISSION_DENIED',
          message: `Access denied: ${action} permission required for ${module}`,
          requiredPermissions: {
            module,
            action,
          },
        });
      }

      // Permission granted, proceed to next middleware
      next();
    } catch (error) {
      console.error('Permission validation error:', error);
      
      // On error, deny access for security
      return res.status(500).json({
        success: false,
        error: 'PERMISSION_VALIDATION_ERROR',
        message: 'Error validating permissions',
      });
    }
  };
}

/**
 * Middleware factory for module access validation
 * @param module - The module to check access for
 * @returns Middleware function that validates module access
 */
export function hasModuleAccess(module: ModuleName) {
  return async (req: any, res: any, next: any) => {
    try {
      // Extract company context from request
      const companyId = req.user?.companyId || req.user?.businessName;
      
      if (!companyId) {
        return res.status(401).json({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Company context not found',
        });
      }

      // Check if user has any access to the module
      const hasAccess = await PermissionsService.validateCompanyPermissions(
        companyId,
        module,
        'view'
      );

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          error: 'MODULE_ACCESS_DENIED',
          message: `Access denied: No permissions for ${module}`,
          requiredAccess: {
            module,
            minimumPermission: 'view',
          },
        });
      }

      // Module access granted, proceed to next middleware
      next();
    } catch (error) {
      console.error('Module access validation error:', error);
      
      // On error, deny access for security
      return res.status(500).json({
        success: false,
        error: 'MODULE_ACCESS_VALIDATION_ERROR',
        message: 'Error validating module access',
      });
    }
  };
}

/**
 * Middleware for elevated permissions (admin/manager level)
 * @returns Middleware function that validates elevated permissions
 */
export function requireElevatedPermissions() {
  return async (req: any, res: any, next: any) => {
    try {
      // Check if user has elevated permissions
      const hasElevated = await PermissionsService.hasElevatedPermissions();

      if (!hasElevated) {
        return res.status(403).json({
          success: false,
          error: 'ELEVATED_PERMISSIONS_REQUIRED',
          message: 'Elevated permissions required for this operation',
          requiredLevel: 'manager_or_admin',
        });
      }

      // Elevated permissions confirmed, proceed to next middleware
      next();
    } catch (error) {
      console.error('Elevated permissions validation error:', error);
      
      // On error, deny access for security
      return res.status(500).json({
        success: false,
        error: 'ELEVATED_PERMISSIONS_VALIDATION_ERROR',
        message: 'Error validating elevated permissions',
      });
    }
  };
}

/**
 * Middleware for admin-level permissions only
 * @returns Middleware function that validates admin permissions
 */
export function requireAdminPermissions() {
  return async (req: any, res: any, next: any) => {
    try {
      // Check if user has admin permissions
      const isAdmin = await PermissionsService.isAdmin();

      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          error: 'ADMIN_PERMISSIONS_REQUIRED',
          message: 'Admin permissions required for this operation',
          requiredLevel: 'admin',
        });
      }

      // Admin permissions confirmed, proceed to next middleware
      next();
    } catch (error) {
      console.error('Admin permissions validation error:', error);
      
      // On error, deny access for security
      return res.status(500).json({
        success: false,
        error: 'ADMIN_PERMISSIONS_VALIDATION_ERROR',
        message: 'Error validating admin permissions',
      });
    }
  };
}

/**
 * Middleware for company context validation
 * @returns Middleware function that validates company context
 */
export function validateCompanyContext() {
  return async (req: any, res: any, next: any) => {
    try {
      // Extract company context from request
      const companyId = req.user?.companyId || req.user?.businessName;
      
      if (!companyId) {
        return res.status(401).json({
          success: false,
          error: 'COMPANY_CONTEXT_MISSING',
          message: 'Company context not found in request',
        });
      }

      // Add company context to request for downstream middleware
      req.companyId = companyId;
      
      // Company context validated, proceed to next middleware
      next();
    } catch (error) {
      console.error('Company context validation error:', error);
      
      return res.status(500).json({
        success: false,
        error: 'COMPANY_CONTEXT_VALIDATION_ERROR',
        message: 'Error validating company context',
      });
    }
  };
}

/**
 * Middleware for permission-based route protection
 * @param permissions - Array of required permissions
 * @returns Middleware function that validates multiple permissions
 */
export function requirePermissions(
  permissions: Array<{ module: ModuleName; action: 'view' | 'create' | 'edit' | 'delete' }>
) {
  return async (req: any, res: any, next: any) => {
    try {
      // Extract company context from request
      const companyId = req.user?.companyId || req.user?.businessName;
      
      if (!companyId) {
        return res.status(401).json({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Company context not found',
        });
      }

      // Validate all required permissions
      const validationResults = await Promise.all(
        permissions.map(async (permission) => {
          const hasPermission = await PermissionsService.validateCompanyPermissions(
            companyId,
            permission.module,
            permission.action
          );
          
          return {
            ...permission,
            granted: hasPermission,
          };
        })
      );

      // Check if all permissions are granted
      const allGranted = validationResults.every(result => result.granted);
      
      if (!allGranted) {
        const deniedPermissions = validationResults
          .filter(result => !result.granted)
          .map(result => `${result.action} on ${result.module}`);

        return res.status(403).json({
          success: false,
          error: 'MULTIPLE_PERMISSIONS_REQUIRED',
          message: 'Multiple permissions required for this operation',
          requiredPermissions: permissions,
          deniedPermissions,
        });
      }

      // All permissions granted, proceed to next middleware
      next();
    } catch (error) {
      console.error('Multiple permissions validation error:', error);
      
      // On error, deny access for security
      return res.status(500).json({
        success: false,
        error: 'MULTIPLE_PERMISSIONS_VALIDATION_ERROR',
        message: 'Error validating multiple permissions',
      });
    }
  };
}

/**
 * Middleware for conditional permission validation
 * @param permissionCheck - Function that determines required permissions based on request
 * @returns Middleware function that validates conditional permissions
 */
export function conditionalPermissionValidation(
  permissionCheck: (req: any) => Array<{ module: ModuleName; action: 'view' | 'create' | 'edit' | 'delete' }>
) {
  return async (req: any, res: any, next: any) => {
    try {
      // Determine required permissions based on request
      const requiredPermissions = permissionCheck(req);
      
      if (requiredPermissions.length === 0) {
        // No permissions required, proceed
        return next();
      }

      // Use the multiple permissions middleware
      return requirePermissions(requiredPermissions)(req, res, next);
    } catch (error) {
      console.error('Conditional permission validation error:', error);
      
      return res.status(500).json({
        success: false,
        error: 'CONDITIONAL_PERMISSION_VALIDATION_ERROR',
        message: 'Error determining required permissions',
      });
    }
  };
}

/**
 * Middleware for audit logging of permission checks
 * @param operation - Description of the operation being performed
 * @returns Middleware function that logs permission checks
 */
export function auditPermissionCheck(operation: string) {
  return async (req: any, res: any, next: any) => {
    try {
      // Log the permission check attempt
      const userId = req.user?.id || 'unknown';
      const companyId = req.user?.companyId || req.user?.businessName || 'unknown';
      
      console.log(`Permission check: User ${userId} attempting ${operation} in company ${companyId}`);
      
      // Proceed to next middleware
      next();
    } catch (error) {
      console.error('Audit logging error:', error);
      
      // Don't block the request for audit logging failures
      next();
    }
  };
}

/**
 * Middleware for rate limiting permission checks
 * @param maxChecks - Maximum permission checks per minute
 * @returns Middleware function that limits permission check frequency
 */
export function rateLimitPermissionChecks(maxChecks: number = 100) {
  const checkCounts = new Map<string, { count: number; resetTime: number }>();
  
  return async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.id || 'anonymous';
      const now = Date.now();
      const minute = Math.floor(now / 60000);
      
      const userChecks = checkCounts.get(userId);
      
      if (!userChecks || userChecks.resetTime !== minute) {
        // Reset counter for new minute
        checkCounts.set(userId, { count: 1, resetTime: minute });
      } else if (userChecks.count >= maxChecks) {
        // Rate limit exceeded
        return res.status(429).json({
          success: false,
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many permission checks, please try again later',
          retryAfter: 60, // seconds
        });
      } else {
        // Increment counter
        userChecks.count++;
      }
      
      // Rate limit check passed, proceed to next middleware
      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      
      // On error, allow the request to proceed
      next();
    }
  };
}

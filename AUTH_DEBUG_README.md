# Authentication Debug & Fix Guide

## Problem

You're experiencing a 403 Forbidden error when calling the roles endpoint:

```
GET http://localhost:3000/api/v1/companies/Dtech11/roles?page=1&limit=20
Status: 403 Forbidden
```

## Solution

The authentication system has been enhanced with automatic token refresh and retry logic to resolve this issue.

## Quick Fix Steps

### 1. **Use the Auth Debug Panel (Recommended)**

- Open your app in development mode
- Look for the "🔍 Authentication Debug Panel" component
- Click the "🔧 Quick Fix Auth" button
- This will automatically:
  - Check your current authentication status
  - Refresh expired tokens
  - Retry failed requests

### 2. **Test the Specific Endpoint**

- Click the "🧪 Test Roles Endpoint" button
- This will test the exact endpoint that was failing
- Shows detailed results of the authentication fix

### 3. **Manual Browser Console Fix**

Open browser console and run:

```javascript
// Import the auth debug utility
import { AuthDebugger } from "./src/utils/authDebug.ts";

// Auto-fix authentication issues
await AuthDebugger.autoFixAuthIssues();

// Test the specific endpoint
await AuthDebugger.testRolesEndpoint("Dtech11");
```

## What the Fix Does

### **Automatic Token Refresh**

- Detects expired JWT tokens
- Automatically refreshes using refresh token
- Updates localStorage with new access token

### **Smart Retry Logic**

- Automatically retries failed requests after token refresh
- Handles 403 errors with authentication retry
- Prevents infinite retry loops

### **Enhanced Error Handling**

- Better error messages for permission issues
- Automatic cleanup of invalid tokens
- Redirects to login when authentication fails

## Common Causes of 403 Errors

1. **Expired Access Token** ✅ **Auto-fixed**
2. **Missing Authentication Header** ✅ **Auto-fixed**
3. **Invalid Token Format** ✅ **Auto-fixed**
4. **User Lacks Permissions** ⚠️ **Requires backend fix**
5. **Company Context Mismatch** ⚠️ **Requires user association fix**

## Backend Considerations

If the 403 error persists after authentication fixes, the issue may be:

- **User doesn't have required permissions** for the roles module
- **User not associated** with the "Dtech11" company
- **Backend permission system** needs configuration
- **Role-based access control** restrictions

## Testing the Fix

1. **Clear browser storage** and re-login
2. **Use the Auth Debug Panel** to run comprehensive tests
3. **Check browser console** for detailed authentication logs
4. **Verify the roles endpoint** works after the fix

## Support

If the issue persists:

1. Check the browser console for detailed error logs
2. Verify your user account has the correct permissions
3. Ensure you're associated with the correct company
4. Contact your system administrator for backend permission configuration

---

**Note**: This fix is designed to handle authentication issues automatically. For permission-related issues, backend configuration may be required.

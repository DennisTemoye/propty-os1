import { useState, useCallback } from "react";
import { AuthDebugger } from "@/utils/authDebug";
import { TeamMembersService } from "@/services/teamMembersService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Hook for debugging authentication issues
 * Useful for development and troubleshooting
 */
export const useAuthDebug = () => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugResults, setDebugResults] = useState<string[]>([]);

  const addDebugLog = useCallback((message: string) => {
    setDebugResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  }, []);

  const runAuthCheck = useCallback(async () => {
    setIsDebugging(true);
    setDebugResults([]);

    try {
      addDebugLog("🔍 Starting authentication debug...");

      // Check auth status
      const authStatus = TeamMembersService.checkAuthStatus();
      addDebugLog(
        `Auth Status: ${
          authStatus.isAuthenticated
            ? "✅ Authenticated"
            : "❌ Not authenticated"
        }`
      );

      if (authStatus.tokenInfo) {
        addDebugLog(
          `Token: ${authStatus.tokenInfo.preview} (${authStatus.tokenInfo.length} chars)`
        );
      }

      if (authStatus.companyId) {
        addDebugLog(`Company ID: ${authStatus.companyId}`);
      }

      // Run comprehensive health check
      addDebugLog("🏥 Running comprehensive health check...");
      await AuthDebugger.runHealthCheck();
      addDebugLog("✅ Health check completed");

      // Test team members endpoint if we have company ID
      if (authStatus.companyId) {
        addDebugLog(
          `🧪 Testing team members endpoint for company: ${authStatus.companyId}`
        );
        try {
          await TeamMembersService.getTeamMembers(authStatus.companyId);
          addDebugLog("✅ Team members endpoint test successful");
        } catch (error: any) {
          addDebugLog(`❌ Team members endpoint test failed: ${error.message}`);
        }
      }
    } catch (error: any) {
      addDebugLog(`💥 Debug error: ${error.message}`);
    } finally {
      setIsDebugging(false);
    }
  }, [addDebugLog]);

  const clearAuthData = useCallback(() => {
    AuthDebugger.clearAuthData();
    addDebugLog("🧹 Authentication data cleared");
  }, [addDebugLog]);

  const clearDebugLogs = useCallback(() => {
    setDebugResults([]);
  }, []);

  const quickFixAuth = useCallback(async () => {
    setIsDebugging(true);
    setDebugResults([]);

    try {
      addDebugLog("🔧 Attempting quick authentication fix...");
      const fixed = await AuthDebugger.autoFixAuthIssues();

      if (fixed) {
        addDebugLog("✅ Authentication issues fixed automatically!");
        // Run a quick test
        addDebugLog("🧪 Testing authentication...");
        const authStatus = TeamMembersService.checkAuthStatus();
        addDebugLog(
          `Auth Status: ${
            authStatus.isAuthenticated
              ? "✅ Authenticated"
              : "❌ Not authenticated"
          }`
        );
      } else {
        addDebugLog("❌ Could not fix authentication issues automatically");
        addDebugLog("💡 Please try logging in again");
      }
    } catch (error: any) {
      addDebugLog(`💥 Quick fix error: ${error.message}`);
    } finally {
      setIsDebugging(false);
    }
  }, [addDebugLog]);

  const testRolesEndpoint = useCallback(async () => {
    setIsDebugging(true);
    setDebugResults([]);

    try {
      addDebugLog("🧪 Testing the specific roles endpoint that was failing...");
      addDebugLog("Testing: /api/v1/companies/Dtech11/roles?page=1&limit=20");

      const success = await AuthDebugger.comprehensiveAuthTest("Dtech11");

      if (success) {
        addDebugLog(
          "✅ Roles endpoint test successful! The 403 error should be resolved."
        );
      } else {
        addDebugLog(
          "❌ Roles endpoint test failed. The issue may be backend-related."
        );
        addDebugLog(
          "💡 Check if your user has the required permissions for the Dtech11 company."
        );
      }
    } catch (error: any) {
      addDebugLog(`💥 Test error: ${error.message}`);
    } finally {
      setIsDebugging(false);
    }
  }, [addDebugLog]);

  return {
    isDebugging,
    debugResults,
    runAuthCheck,
    clearAuthData,
    clearDebugLogs,
    addDebugLog,
    quickFixAuth,
    testRolesEndpoint,
  };
};

/**
 * Authentication Debug Panel Component
 * Useful for development and troubleshooting authentication issues
 */
export const AuthDebugPanel = () => {
  const {
    isDebugging,
    debugResults,
    runAuthCheck,
    clearAuthData,
    clearDebugLogs,
    quickFixAuth,
    testRolesEndpoint,
  } = useAuthDebug();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Authentication Debug Panel
          <Badge variant="secondary">Dev Only</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={runAuthCheck}
            disabled={isDebugging}
            variant="outline"
            size="sm"
          >
            {isDebugging ? "🔍 Running..." : "🔍 Run Auth Check"}
          </Button>

          <Button
            onClick={quickFixAuth}
            disabled={isDebugging}
            variant="default"
            size="sm"
          >
            {isDebugging ? "🔧 Fixing..." : "🔧 Quick Fix Auth"}
          </Button>

          <Button
            onClick={testRolesEndpoint}
            disabled={isDebugging}
            variant="secondary"
            size="sm"
          >
            {isDebugging ? "🧪 Testing..." : "🧪 Test Roles Endpoint"}
          </Button>

          <Button onClick={clearAuthData} variant="destructive" size="sm">
            🧹 Clear Auth Data
          </Button>

          <Button onClick={clearDebugLogs} variant="outline" size="sm">
            📝 Clear Logs
          </Button>
        </div>

        {debugResults.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Debug Results:</h4>
            <div className="bg-gray-100 p-3 rounded-md max-h-64 overflow-y-auto">
              {debugResults.map((log, index) => (
                <div key={index} className="text-sm font-mono mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

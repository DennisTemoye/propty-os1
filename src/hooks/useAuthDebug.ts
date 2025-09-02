import { useState, useCallback } from "react";
import { AuthDebugger } from "@/utils/authDebug";
import { TeamMembersService } from "@/services/teamMembersService";

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

  return {
    isDebugging,
    debugResults,
    runAuthCheck,
    clearAuthData,
    clearDebugLogs,
    addDebugLog,
  };
};



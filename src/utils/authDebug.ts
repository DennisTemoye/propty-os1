/**
 * Authentication Debug Utilities
 * Helps diagnose and fix common authentication issues
 */

export class AuthDebugger {
  /**
   * Check all authentication-related localStorage items
   */
  static checkLocalStorage(): void {
    console.group("🔍 Authentication Debug - LocalStorage");

    const authItems = [
      "accessToken",
      "refreshToken",
      "companyId",
      "businessName",
      "userId",
      "userRole",
    ];

    authItems.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        console.log(`✅ ${key}:`, {
          exists: true,
          length: value.length,
          preview: value.substring(0, 30) + (value.length > 30 ? "..." : ""),
          isJWT: this.isJWT(value),
        });
      } else {
        console.log(`❌ ${key}:`, { exists: false });
      }
    });

    console.groupEnd();
  }

  /**
   * Check if a string looks like a JWT token
   */
  private static isJWT(token: string): boolean {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split(".");
    return (
      parts.length === 3 &&
      parts.every((part) => part.length > 0) &&
      /^[A-Za-z0-9+/=]+$/.test(token)
    ); // Base64 characters
  }

  /**
   * Check current authentication headers
   */
  static checkAuthHeaders(): void {
    console.group("🔍 Authentication Debug - Headers");

    // Check if we can access the API service
    try {
      // This is a bit of a hack, but it helps debug
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("✅ Access Token found:", {
          length: token.length,
          isJWT: this.isJWT(token),
          headerValue: `Bearer ${token.substring(0, 20)}...`,
        });
      } else {
        console.log("❌ No access token found");
      }
    } catch (error) {
      console.error("❌ Error checking auth headers:", error);
    }

    console.groupEnd();
  }

  /**
   * Test API endpoint accessibility
   */
  static async testEndpoint(endpoint: string): Promise<void> {
    console.group(`🔍 Testing Endpoint: ${endpoint}`);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("❌ No access token available");
        console.groupEnd();
        return;
      }

      // Make a test request
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Success - Data preview:", data);
      } else {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);
      }
    } catch (error) {
      console.error("💥 Request failed:", error);
    }

    console.groupEnd();
  }

  /**
   * Clear all authentication data (use with caution)
   */
  static clearAuthData(): void {
    console.warn("🧹 Clearing all authentication data...");

    const authKeys = [
      "accessToken",
      "refreshToken",
      "companyId",
      "businessName",
      "userId",
      "userRole",
    ];

    authKeys.forEach((key) => {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    });

    console.log(
      "✅ Authentication data cleared. User will need to log in again."
    );
  }

  /**
   * Comprehensive authentication health check
   */
  static async runHealthCheck(): Promise<void> {
    console.group("🏥 Authentication Health Check");

    this.checkLocalStorage();
    this.checkAuthHeaders();

    // Test a simple endpoint if we have a token
    const token = localStorage.getItem("accessToken");
    if (token) {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      const testEndpoint = `${baseUrl}/v1/auth/me`;
      await this.testEndpoint(testEndpoint);
    }

    console.groupEnd();
  }

  /**
   * Automatically fix common authentication issues
   */
  static async autoFixAuthIssues(): Promise<boolean> {
    console.group("🔧 Auto-fixing authentication issues...");

    try {
      // Check if we have valid tokens
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken && !refreshToken) {
        console.log("❌ No tokens found - redirecting to login");
        window.location.href = "/login";
        return false;
      }

      if (accessToken) {
        // Check if access token is expired
        try {
          const payload = JSON.parse(atob(accessToken.split(".")[1]));
          const isExpired = payload.exp * 1000 < Date.now();

          if (isExpired) {
            console.log("🔐 Access token expired, attempting refresh...");
            if (refreshToken) {
              const newToken = await this.refreshAccessToken(refreshToken);
              if (newToken) {
                console.log("✅ Token refreshed successfully");
                return true;
              }
            }
          } else {
            console.log("✅ Access token is valid");
            return true;
          }
        } catch (error) {
          console.warn("🔐 Error parsing token, attempting refresh...");
          if (refreshToken) {
            const newToken = await this.refreshAccessToken(refreshToken);
            if (newToken) {
              console.log("✅ Token refreshed successfully");
              return true;
            }
          }
        }
      }

      // If we have refresh token but no access token, try to refresh
      if (refreshToken && !accessToken) {
        console.log("🔄 No access token, attempting refresh...");
        const newToken = await this.refreshAccessToken(refreshToken);
        if (newToken) {
          console.log("✅ Token refreshed successfully");
          return true;
        }
      }

      console.log("❌ Could not fix authentication issues");
      return false;
    } catch (error) {
      console.error("💥 Error during auto-fix:", error);
      return false;
    } finally {
      console.groupEnd();
    }
  }

  /**
   * Refresh access token using refresh token
   */
  private static async refreshAccessToken(
    refreshToken: string
  ): Promise<string | null> {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
        }/v1/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          return newAccessToken;
        }
      }
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
    }

    // Clear invalid tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }

  /**
   * Test the roles endpoint to verify authentication is working
   */
  static async testRolesEndpoint(businessName: string): Promise<boolean> {
    try {
      console.log(`🧪 Testing roles endpoint for company: ${businessName}`);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
        }/v1/companies/${businessName}/roles?page=1&limit=20`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("✅ Roles endpoint test successful");
        return true;
      } else {
        console.error(
          `❌ Roles endpoint test failed: ${response.status} ${response.statusText}`
        );
        return false;
      }
    } catch (error) {
      console.error("❌ Roles endpoint test error:", error);
      return false;
    }
  }

  /**
   * Comprehensive authentication test and fix
   */
  static async comprehensiveAuthTest(businessName: string): Promise<boolean> {
    console.group("🔧 Comprehensive Authentication Test & Fix");

    try {
      // First, try to fix any auth issues
      const authFixed = await this.autoFixAuthIssues();

      if (authFixed) {
        // Test the roles endpoint
        const endpointWorks = await this.testRolesEndpoint(businessName);

        if (endpointWorks) {
          console.log("✅ All authentication issues resolved!");
          console.groupEnd();
          return true;
        } else {
          console.log("❌ Authentication fixed but endpoint still fails");
          console.groupEnd();
          return false;
        }
      } else {
        console.log("❌ Could not fix authentication issues");
        console.groupEnd();
        return false;
      }
    } catch (error) {
      console.error("💥 Comprehensive test error:", error);
      console.groupEnd();
      return false;
    }
  }
}

// Export a convenience function
export const debugAuth = () => AuthDebugger.runHealthCheck();

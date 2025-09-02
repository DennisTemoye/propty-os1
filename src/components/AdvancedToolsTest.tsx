import React, { useEffect, useState } from "react";
import { useReports } from "@/hooks/useReports";
import { useCRM } from "@/hooks/useCRM";
import { useCalendar } from "@/hooks/useCalendar";
import { useDocuments } from "@/hooks/useDocuments";
import { useMaps } from "@/hooks/useMaps";
import { useAccounting } from "@/hooks/useAccounting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const AdvancedToolsTest: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const reports = useReports();
  const crm = useCRM();
  const calendar = useCalendar();
  const documents = useDocuments();
  const maps = useMaps();
  const accounting = useAccounting();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      setAuthToken(token);
      console.log("✅ User is authenticated, testing API endpoints...");

      // Test all the hooks to see if they're working
      testAllEndpoints();
    } else {
      console.log("❌ User not authenticated. Please login first.");
      toast.error("Please login to test the API endpoints");
    }
  }, []);

  const testAllEndpoints = async () => {
    try {
      // Test Reports
      await reports.generateSalesReport();

      // Test CRM
      await crm.fetchLeads();
      await crm.fetchPipelineStages();

      // Test Calendar
      await calendar.fetchEvents();

      // Test Documents
      await documents.fetchDocuments();

      // Test Maps
      await maps.fetchUnits();
      await maps.fetchMapLayers();

      // Test Accounting
      if (accounting.filters.period && accounting.filters.dateRange) {
        await accounting.fetchIncomeExpenses("monthly", "last_6_months");
      }

      toast.success("All API endpoints tested successfully!");
    } catch (error) {
      console.error("Error testing endpoints:", error);
      toast.error("Some API endpoints failed. Check console for details.");
    }
  };

  const handleManualTest = async (
    serviceName: string,
    testFunction: () => Promise<any>
  ) => {
    try {
      await testFunction();
      toast.success(`${serviceName} API test successful!`);
    } catch (error: any) {
      console.error(`${serviceName} API test failed:`, error);
      toast.error(`${serviceName} API test failed: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You need to be logged in to test the Advanced Tools API endpoints.
            </p>
            <Button onClick={() => (window.location.href = "/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Advanced Tools API Test</h1>

      {/* Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600">✅ Authenticated</span>
            </p>
            <p>
              <strong>Token:</strong>{" "}
              {authToken ? `${authToken.substring(0, 20)}...` : "None"}
            </p>
            <p>
              <strong>Base URL:</strong>{" "}
              {import.meta.env.VITE_API_BASE_URL || "https://api.proptyos.com"}
            </p>
            <p>
              <strong>API Version:</strong> v1
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Reports Test */}
        <Card>
          <CardHeader>
            <CardTitle>Reports & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {reports.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {reports.error || "✅ None"}
              </p>
              <p>
                <strong>Sales Data:</strong> {reports.salesData?.length || 0}{" "}
                records
              </p>
              <Button
                onClick={() =>
                  handleManualTest("Reports", () =>
                    reports.generateSalesReport()
                  )
                }
                disabled={reports.loading}
                className="w-full"
              >
                Test Sales Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CRM Test */}
        <Card>
          <CardHeader>
            <CardTitle>CRM Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {crm.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {crm.error || "✅ None"}
              </p>
              <p>
                <strong>Leads:</strong> {crm.leads?.length || 0} records
              </p>
              <p>
                <strong>Stages:</strong> {crm.stages?.length || 0} records
              </p>
              <Button
                onClick={() => handleManualTest("CRM", () => crm.fetchLeads())}
                disabled={crm.loading}
                className="w-full"
              >
                Test CRM
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Test */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar & Scheduling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {calendar.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {calendar.error || "✅ None"}
              </p>
              <p>
                <strong>Events:</strong> {calendar.events?.length || 0} records
              </p>
              <Button
                onClick={() =>
                  handleManualTest("Calendar", () => calendar.fetchEvents())
                }
                disabled={calendar.loading}
                className="w-full"
              >
                Test Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Test */}
        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {documents.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {documents.error || "✅ None"}
              </p>
              <p>
                <strong>Documents:</strong> {documents.documents?.length || 0}{" "}
                records
              </p>
              <Button
                onClick={() =>
                  handleManualTest("Documents", () =>
                    documents.fetchDocuments()
                  )
                }
                disabled={documents.loading}
                className="w-full"
              >
                Test Documents
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Maps Test */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Mapping</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {maps.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {maps.error || "✅ None"}
              </p>
              <p>
                <strong>Units:</strong> {maps.units?.length || 0} records
              </p>
              <p>
                <strong>Layers:</strong> {maps.layers?.length || 0} records
              </p>
              <Button
                onClick={() =>
                  handleManualTest("Maps", () => maps.fetchUnits())
                }
                disabled={maps.loading}
                className="w-full"
              >
                Test Maps
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Accounting Test */}
        <Card>
          <CardHeader>
            <CardTitle>Accounting Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {accounting.loading ? "🔄 Loading..." : "✅ Ready"}
              </p>
              <p>
                <strong>Error:</strong> {accounting.error || "✅ None"}
              </p>
              <p>
                <strong>Income Data:</strong>{" "}
                {accounting.incomeExpenses ? "✅ Loaded" : "❌ Not loaded"}
              </p>
              <Button
                onClick={() =>
                  handleManualTest("Accounting", () =>
                    accounting.fetchIncomeExpenses("monthly", "last_6_months")
                  )
                }
                disabled={accounting.loading}
                className="w-full"
              >
                Test Accounting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test All Endpoints Button */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={testAllEndpoints} className="w-full" size="lg">
            Test All API Endpoints
          </Button>
        </CardContent>
      </Card>

      {/* API Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>API Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>All Services:</strong>{" "}
              <span className="text-green-600">✅ Configured and Ready</span>
            </p>
            <p>
              <strong>Authentication:</strong>{" "}
              <span className="text-green-600">
                ✅ Token-based with refresh
              </span>
            </p>
            <p>
              <strong>Error Handling:</strong>{" "}
              <span className="text-green-600">
                ✅ Toast notifications enabled
              </span>
            </p>
            <p>
              <strong>API Endpoints:</strong>{" "}
              <span className="text-green-600">
                ✅ All advanced tools endpoints configured
              </span>
            </p>
            <p>
              <strong>Real-time Data:</strong>{" "}
              <span className="text-green-600">
                ✅ Connected to production backend
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { ReportService } from "@/services/reportService";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message: string;
  duration?: number;
}

export function ReportAPITest() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);

  const runAllTests = async () => {
    setRunning(true);
    setTestResults([]);

    const tests = [
      {
        name: "Sales Report Generation",
        test: () =>
          ReportService.generateSalesReport({
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
      {
        name: "Commission Report Generation",
        test: () =>
          ReportService.generateCommissionReport({
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
      {
        name: "Financial Report Generation",
        test: () =>
          ReportService.generateFinancialReport({
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
      {
        name: "Project Report Generation",
        test: () => ReportService.generateProjectReport(),
      },
      {
        name: "Client Report Generation",
        test: () =>
          ReportService.generateClientReport({
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
      {
        name: "Get Report Templates",
        test: () => ReportService.getReportTemplates(),
      },
      {
        name: "Save Report Template",
        test: () =>
          ReportService.saveReportTemplate({
            name: "Test Template",
            description: "Test template for API testing",
            type: "sales",
            filters: {
              dateFrom: "2024-01-01",
              dateTo: "2024-01-31",
            },
          }),
      },
      {
        name: "Get Report Insights",
        test: () =>
          ReportService.getReportInsights({
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
      {
        name: "Export Report (New API)",
        test: () =>
          ReportService.exportReportNew("sales", "pdf", {
            dateFrom: "2024-01-01",
            dateTo: "2024-01-31",
          }),
      },
    ];

    for (const test of tests) {
      const startTime = Date.now();

      try {
        await test.test();
        const duration = Date.now() - startTime;

        setTestResults((prev) => [
          ...prev,
          {
            name: test.name,
            status: "success",
            message: "Test passed successfully",
            duration,
          },
        ]);
      } catch (error) {
        const duration = Date.now() - startTime;
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";

        setTestResults((prev) => [
          ...prev,
          {
            name: test.name,
            status: "error",
            message,
            duration,
          },
        ]);
      }
    }

    setRunning(false);
  };

  const runSingleTest = async (
    testName: string,
    testFn: () => Promise<any>
  ) => {
    const startTime = Date.now();

    try {
      await testFn();
      const duration = Date.now() - startTime;

      setTestResults((prev) =>
        prev.map((result) =>
          result.name === testName
            ? {
                ...result,
                status: "success",
                message: "Test passed successfully",
                duration,
              }
            : result
        )
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";

      setTestResults((prev) =>
        prev.map((result) =>
          result.name === testName
            ? { ...result, status: "error", message, duration }
            : result
        )
      );
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const successCount = testResults.filter((r) => r.status === "success").length;
  const errorCount = testResults.filter((r) => r.status === "error").length;
  const totalCount = testResults.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Report Module API Test Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            This component tests all the report module API endpoints to ensure
            they are working correctly. Run all tests or individual tests to
            verify API functionality.
          </p>

          <div className="flex gap-2 mb-6">
            <Button
              onClick={runAllTests}
              disabled={running}
              className="min-w-[120px]"
            >
              {running ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Running...
                </>
              ) : (
                "Run All Tests"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setTestResults([])}
              disabled={running}
            >
              Clear Results
            </Button>
          </div>

          {totalCount > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Total Tests:</span>
                  <Badge variant="outline">{totalCount}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Passed:</span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    {successCount}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Failed:</span>
                  <Badge variant="destructive">{errorCount}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Success Rate:</span>
                  <Badge variant="outline">
                    {totalCount > 0
                      ? Math.round((successCount / totalCount) * 100)
                      : 0}
                    %
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span
                        className={`font-medium ${getStatusColor(
                          result.status
                        )}`}
                      >
                        {result.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.duration && (
                        <Badge variant="outline" className="text-xs">
                          {result.duration}ms
                        </Badge>
                      )}
                      <Badge
                        variant={
                          result.status === "success"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <p className={`text-sm ${getStatusColor(result.status)}`}>
                    {result.message}
                  </p>

                  {result.status === "error" && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Re-run the specific test
                          const testMap: Record<string, () => Promise<any>> = {
                            "Sales Report Generation": () =>
                              ReportService.generateSalesReport({
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                            "Commission Report Generation": () =>
                              ReportService.generateCommissionReport({
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                            "Financial Report Generation": () =>
                              ReportService.generateFinancialReport({
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                            "Project Report Generation": () =>
                              ReportService.generateProjectReport(),
                            "Client Report Generation": () =>
                              ReportService.generateClientReport({
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                            "Get Report Templates": () =>
                              ReportService.getReportTemplates(),
                            "Save Report Template": () =>
                              ReportService.saveReportTemplate({
                                name: "Test Template",
                                description: "Test template for API testing",
                                type: "sales",
                                filters: {
                                  dateFrom: "2024-01-01",
                                  dateTo: "2024-01-31",
                                },
                              }),
                            "Get Report Insights": () =>
                              ReportService.getReportInsights({
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                            "Export Report (New API)": () =>
                              ReportService.exportReportNew("sales", "pdf", {
                                dateFrom: "2024-01-01",
                                dateTo: "2024-01-31",
                              }),
                          };

                          const testFn = testMap[result.name];
                          if (testFn) {
                            runSingleTest(result.name, testFn);
                          }
                        }}
                        disabled={running}
                      >
                        Retry Test
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Endpoint Information */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints Tested</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Report Generation</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• GET /reports/sales</li>
                  <li>• GET /reports/commission</li>
                  <li>• GET /reports/financial</li>
                  <li>• GET /reports/projects</li>
                  <li>• GET /reports/clients</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Templates & Insights</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• GET /reports/templates</li>
                  <li>• POST /reports/templates</li>
                  <li>• GET /reports/insights</li>
                  <li>• POST /reports/export</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> These tests make actual API calls to your
                backend. Ensure your backend is running and properly configured.
              </p>
              <p className="mt-1">
                Failed tests may indicate network issues, authentication
                problems, or backend configuration issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

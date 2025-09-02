import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  TrendingDown,
  Minus,
  Trash2,
} from "lucide-react";
import { useReports } from "@/hooks/useReports";
import { ReportFilters } from "@/services/reportService";

export function ReportAPIDemo() {
  const [activeTab, setActiveTab] = useState("sales");
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );

  const {
    loading,
    error,
    salesData,
    commissionData,
    financialData,
    projectData,
    clientData,
    filters,
    setFilters,
    generateSalesReport,
    generateCommissionReport,
    generateFinancialReport,
    generateProjectReport,
    generateClientReport,
    exportReport,
    exportReportNew,
    templates,
    loadTemplates,
    saveTemplate,
    deleteTemplate,
    insights,
    loadInsights,
    clearError,
    resetFilters,
  } = useReports();

  const handleGenerateReport = async () => {
    try {
      switch (activeTab) {
        case "sales":
          await generateSalesReport();
          break;
        case "commission":
          await generateCommissionReport();
          break;
        case "financial":
          await generateFinancialReport();
          break;
        case "project":
          await generateProjectReport();
          break;
        case "client":
          await generateClientReport();
          break;
      }
    } catch (err) {
      console.error("Failed to generate report:", err);
    }
  };

  const handleExportReport = async () => {
    try {
      // Use the new API-based export method
      await exportReportNew(activeTab, selectedFormat);
    } catch (err) {
      console.error("Failed to export report:", err);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      const template = {
        name: `${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        } Report Template`,
        description: `Template for ${activeTab} reports with current filters`,
        type: activeTab,
        filters: filters,
      };

      const success = await saveTemplate(template);
      if (success) {
        console.log("Template saved successfully");
      }
    } catch (err) {
      console.error("Failed to save template:", err);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const success = await deleteTemplate(templateId);
      if (success) {
        console.log("Template deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete template:", err);
    }
  };

  const renderDataTable = () => {
    let data: any[] = [];
    let columns: string[] = [];

    switch (activeTab) {
      case "sales":
        data = salesData;
        columns = [
          "Client",
          "Project",
          "Unit",
          "Amount",
          "Status",
          "Date",
          "Marketer",
          "Commission",
        ];
        break;
      case "commission":
        data = commissionData;
        columns = [
          "Marketer",
          "Total Sales",
          "Total Volume",
          "Total Commission",
          "Paid",
          "Pending",
        ];
        break;
      case "project":
        data = projectData;
        columns = [
          "Name",
          "Total Units",
          "Sold Units",
          "Available",
          "Revenue",
          "Completion %",
          "Status",
        ];
        break;
      case "client":
        data = clientData;
        columns = [
          "Name",
          "Total Investments",
          "Active",
          "Completed",
          "Total Spent",
          "Status",
        ];
        break;
      default:
        return <div>Select a report type to view data</div>;
    }

    if (!data || data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data available. Generate a report first.
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 10).map((item, index) => (
            <TableRow key={index}>
              {Object.values(item)
                .slice(0, columns.length)
                .map((value, colIndex) => (
                  <TableCell key={colIndex}>
                    {typeof value === "string" && value.includes("₦")
                      ? value
                      : typeof value === "number"
                      ? value.toLocaleString()
                      : String(value)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderFinancialData = () => {
    if (!financialData) {
      return (
        <div className="text-center py-8 text-gray-500">
          Generate financial report to view data
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Revenue by Project</CardTitle>
          </CardHeader>
          <CardContent>
            {financialData.revenueByProject?.map((project, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span className="text-sm">{project.project}</span>
                <span className="font-medium">
                  ₦{project.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {financialData.expensesByCategory?.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span className="text-sm">{category.category}</span>
                <span className="font-medium">
                  ₦{category.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Report Module API Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            This component demonstrates how to consume all the report module API
            endpoints. Use the tabs below to test different report types and
            their associated operations.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-sm text-red-800">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearError}
                className="mt-2"
              >
                Clear Error
              </Button>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="commission">Commission</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="project">Projects</TabsTrigger>
              <TabsTrigger value="client">Clients</TabsTrigger>
            </TabsList>

            <TabsContent value="sales" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} disabled={loading}>
                  Generate Sales Report
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={loading}
                >
                  Export {selectedFormat.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={loading}
                >
                  Save Template
                </Button>
              </div>
              {renderDataTable()}
            </TabsContent>

            <TabsContent value="commission" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} disabled={loading}>
                  Generate Commission Report
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={loading}
                >
                  Export {selectedFormat.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={loading}
                >
                  Save Template
                </Button>
              </div>
              {renderDataTable()}
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} disabled={loading}>
                  Generate Financial Report
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={loading}
                >
                  Export {selectedFormat.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={loading}
                >
                  Save Template
                </Button>
              </div>
              {renderFinancialData()}
            </TabsContent>

            <TabsContent value="project" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} disabled={loading}>
                  Generate Project Report
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={loading}
                >
                  Export {selectedFormat.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={loading}
                >
                  Save Template
                </Button>
              </div>
              {renderDataTable()}
            </TabsContent>

            <TabsContent value="client" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} disabled={loading}>
                  Generate Client Report
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={loading}
                >
                  Export {selectedFormat.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={loading}
                >
                  Save Template
                </Button>
              </div>
              {renderDataTable()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Export Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Export Format:</label>
            <div className="flex gap-2">
              {(["pdf", "excel", "csv"] as const).map((format) => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFormat(format)}
                >
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              onClick={loadTemplates}
              disabled={loading}
            >
              Load Templates
            </Button>
          </div>

          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">{template.type}</Badge>
                    {template.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button variant="outline" onClick={loadInsights} disabled={loading}>
              Load Insights
            </Button>
          </div>

          {insights.trends.length > 0 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Trends</h4>
                <div className="space-y-2">
                  {insights.trends.map((trend, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm">{trend.period}</span>
                      <span className="font-medium">
                        ₦{trend.value.toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          trend.change > 0
                            ? "default"
                            : trend.change < 0
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {trend.change > 0 ? "+" : ""}
                        {trend.change}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Top Performers</h4>
                <div className="space-y-2">
                  {insights.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline">#{performer.rank}</Badge>
                      <span className="font-medium">{performer.name}</span>
                      <span className="text-sm text-gray-600">
                        ₦{performer.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

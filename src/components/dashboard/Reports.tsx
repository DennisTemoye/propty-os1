import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { ReportExportActions } from "./reports/ReportExportActions";
import { ReportsGenerator } from "./reports/ReportsGenerator";
import { ReportFilters } from "./reports/ReportFilters";
import { ReportInsights } from "./reports/ReportInsights";
import { ReportTemplates } from "./reports/ReportTemplates";
import { useReports } from "@/hooks/useReports";
import { ReportService } from "@/services/reportService";
import {
  formatCurrencyKPI,
  formatCurrencyDisplay,
  formatCurrencyCompact,
} from "@/utils/formatCurrency";

export function Reports() {
  const [activeTab, setActiveTab] = useState("sales");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Use the reports hook
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
    saveTemplate,
    deleteTemplate,
    insights,
    loadInsights,
    loadTemplates,
    clearError,
    resetFilters,
  } = useReports();

  // Generate initial reports when component mounts
  useEffect(() => {
    const initializeReports = async () => {
      try {
        // Generate sales report by default
        await generateSalesReport();
        // Load insights
        await loadInsights();
        // Load templates
        await loadTemplates();
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Failed to initialize reports:", error);
      }
    };

    // Only initialize if the functions are available
    if (generateSalesReport && loadInsights && loadTemplates) {
      initializeReports();
    }
  }, [generateSalesReport, loadInsights, loadTemplates]);

  // Calculate KPI data from real data
  const calculateKPIs = () => {
    // Ensure data is always treated as arrays
    const salesArray = Array.isArray(salesData) ? salesData : [];
    const commissionArray = Array.isArray(commissionData) ? commissionData : [];

    const totalSales = salesArray.filter(
      (s) => s.status === "allocated"
    ).length;
    const totalVolume = salesArray.reduce(
      (sum, sale) => sum + (sale.amount || 0),
      0
    );
    const activeClients = salesArray.length;
    const totalCommission = commissionArray.reduce(
      (sum, comm) => sum + (comm.totalCommission || 0),
      0
    );
    const paidCommission = commissionArray.reduce(
      (sum, comm) => sum + (comm.paidCommission || 0),
      0
    );

    return {
      totalSales,
      totalVolume,
      activeClients,
      totalCommission,
      paidCommission,
    };
  };

  const kpiValues = calculateKPIs();

  // Ensure kpiValues has default values to prevent undefined errors
  const safeKpiValues = {
    totalSales: kpiValues?.totalSales || 0,
    totalVolume: kpiValues?.totalVolume || 0,
    activeClients: kpiValues?.activeClients || 0,
    totalCommission: kpiValues?.totalCommission || 0,
    paidCommission: kpiValues?.paidCommission || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "allocated":
        return "bg-green-100 text-green-800";
      case "interested":
        return "bg-yellow-100 text-yellow-800";
      case "offered":
        return "bg-blue-100 text-blue-800";
      case "revoked":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const kpiData = [
    {
      title: "Total Sales",
      value: safeKpiValues.totalSales.toString(),
      subtitle: "Allocated plots",
      icon: TrendingUp,
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
      cardBg: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Sales Volume",
      value: formatCurrencyKPI(safeKpiValues.totalVolume),
      subtitle: "Total value",
      icon: DollarSign,
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      cardBg: "from-blue-50 to-blue-100",
    },
    {
      title: "Active Clients",
      value: safeKpiValues.activeClients.toString(),
      subtitle: "All statuses",
      icon: Users,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      cardBg: "from-purple-50 to-purple-100",
    },
    {
      title: "Commission Paid",
      value: formatCurrencyKPI(safeKpiValues.paidCommission),
      subtitle: "To marketers",
      icon: FileText,
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      cardBg: "from-amber-50 to-amber-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Generate detailed reports and insights
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <ReportExportActions reportType="sales" />
          <Button
            onClick={() =>
              generateSalesReport().then(() => setLastUpdated(new Date()))
            }
            disabled={loading}
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            {loading ? "Generating..." : "Generate Sales Report"}
          </Button>
          <Button
            onClick={() =>
              generateCommissionReport().then(() => setLastUpdated(new Date()))
            }
            disabled={loading}
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            {loading ? "Generating..." : "Generate Commission Report"}
          </Button>
          <Button
            onClick={() =>
              generateFinancialReport().then(() => setLastUpdated(new Date()))
            }
            disabled={loading}
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            {loading ? "Generating..." : "Generate Financial Report"}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-800 font-medium">Error</span>
                <span className="text-red-700">{error}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearError}
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card
            key={index}
            className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          // Generate report for the selected tab
          switch (value) {
            case "sales":
              if (!Array.isArray(salesData) || salesData.length === 0) {
                generateSalesReport().then(() => setLastUpdated(new Date()));
              }
              break;
            case "commission":
              if (
                !Array.isArray(commissionData) ||
                commissionData.length === 0
              ) {
                generateCommissionReport().then(() =>
                  setLastUpdated(new Date())
                );
              }
              break;
            case "financial":
              if (!financialData) {
                generateFinancialReport().then(() =>
                  setLastUpdated(new Date())
                );
              }
              break;
          }
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="commission">Commission Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Total Records</div>
                <div className="text-2xl font-bold">
                  {Array.isArray(salesData) ? salesData.length : 0}
                </div>
                <div className="text-xs text-gray-500">Sales entries</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Total Volume</div>
                <div className="text-2xl font-bold">
                  {formatCurrencyKPI(safeKpiValues.totalVolume)}
                </div>
                <div className="text-xs text-gray-500">Combined value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Allocated Plots</div>
                <div className="text-2xl font-bold">
                  {safeKpiValues.totalSales}
                </div>
                <div className="text-xs text-gray-500">Confirmed sales</div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters */}
          <ReportFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            reportType="sales"
            projects={[]}
            marketers={[]}
            clients={[]}
            loading={loading}
          />

          {/* Sales Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales & Allocation Report</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => exportReportNew("sales", "csv")}
                  disabled={
                    loading ||
                    !Array.isArray(salesData) ||
                    salesData.length === 0
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">
                    Generating report...
                  </span>
                </div>
              ) : !Array.isArray(salesData) || salesData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No sales data available.</p>
                  <p className="text-sm mt-1">
                    Click "Generate Report" to fetch data.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Project/Plot</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Marketer</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(salesData) &&
                      salesData.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell className="font-medium">
                            {sale.clientName}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{sale.project}</div>
                              <div className="text-sm text-gray-500">
                                {sale.unit}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrencyDisplay(sale.amount || 0)}
                          </TableCell>
                          <TableCell>{sale.marketer}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {formatCurrencyDisplay(sale.commission || 0)}
                              </div>
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  sale.commissionStatus
                                )}`}
                              >
                                {sale.commissionStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(sale.status)}>
                              {sale.status}
                            </Badge>
                            {sale.status === "revoked" && sale.revokedDate && (
                              <div className="text-xs text-gray-500 mt-1">
                                Revoked: {sale.revokedDate}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {sale.status === "revoked" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="View Revocation Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-6">
          {/* Commission Reports */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Commission Reports</h3>
            <Button
              onClick={() =>
                generateCommissionReport().then(() =>
                  setLastUpdated(new Date())
                )
              }
              disabled={loading}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {loading ? "Generating..." : "Generate Commission Report"}
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Total Marketers</div>
                <div className="text-2xl font-bold">
                  {Array.isArray(commissionData) ? commissionData.length : 0}
                </div>
                <div className="text-xs text-gray-500">Active marketers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Total Commission</div>
                <div className="text-2xl font-bold">
                  {formatCurrencyKPI(safeKpiValues.totalCommission)}
                </div>
                <div className="text-xs text-gray-500">Combined earnings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">Commission Paid</div>
                <div className="text-2xl font-bold">
                  {formatCurrencyKPI(safeKpiValues.paidCommission)}
                </div>
                <div className="text-xs text-gray-500">Settled amounts</div>
              </CardContent>
            </Card>
          </div>

          <ReportFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            reportType="commission"
            projects={[]}
            marketers={[]}
            clients={[]}
            loading={loading}
          />

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Marketer Commission Report</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => exportReportNew("commission", "csv")}
                  disabled={
                    loading ||
                    !Array.isArray(commissionData) ||
                    commissionData.length === 0
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Commission Summary
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">
                    Generating report...
                  </span>
                </div>
              ) : !Array.isArray(commissionData) ||
                commissionData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No commission data available.</p>
                  <p className="text-sm mt-1">
                    Click "Generate Commission Report" to fetch data.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Marketer</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Sales Volume</TableHead>
                      <TableHead>Total Commission</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(commissionData) &&
                      commissionData.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.marketer}
                          </TableCell>
                          <TableCell>{report.totalSales}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrencyDisplay(report.totalVolume || 0)}
                          </TableCell>
                          <TableCell className="font-medium text-purple-600">
                            {formatCurrencyDisplay(report.totalCommission || 0)}
                          </TableCell>
                          <TableCell className="text-green-600">
                            {formatCurrencyDisplay(report.paidCommission || 0)}
                          </TableCell>
                          <TableCell className="text-orange-600">
                            {formatCurrencyDisplay(
                              report.pendingCommission || 0
                            )}
                          </TableCell>
                          <TableCell>{report.period}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial reports content with real data */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Financial Reports</h3>
            <Button
              onClick={() =>
                generateFinancialReport().then(() => setLastUpdated(new Date()))
              }
              disabled={loading}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {loading ? "Generating..." : "Generate Financial Report"}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">
                    Generating financial report...
                  </span>
                </div>
              ) : !financialData ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No financial data available.</p>
                  <p className="text-sm mt-1">
                    Click "Generate Financial Report" to fetch data.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Revenue Overview</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Revenue:
                        </span>
                        <span className="font-medium">
                          {formatCurrencyDisplay(
                            financialData.totalRevenue || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Expenses:
                        </span>
                        <span className="font-medium text-red-600">
                          -
                          {formatCurrencyDisplay(
                            financialData.totalExpenses || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Net Profit:
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrencyDisplay(financialData.netProfit || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Commission Overview</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Commission:
                        </span>
                        <span className="font-medium">
                          {formatCurrencyDisplay(
                            (financialData.commissionPaid || 0) +
                              (financialData.commissionPending || 0)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Commission Paid:
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrencyDisplay(
                            financialData.commissionPaid || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Commission Pending:
                        </span>
                        <span className="text-orange-600">
                          {formatCurrencyDisplay(
                            financialData.commissionPending || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Additional Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Outstanding Amount:
                        </span>
                        <span className="font-medium">
                          {formatCurrencyDisplay(
                            financialData.outstandingAmount || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Refunds Issued:
                        </span>
                        <span className="font-medium text-red-600">
                          -
                          {formatCurrencyDisplay(
                            financialData.refundsIssued || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Period:</span>
                        <span className="font-medium">
                          {financialData.period || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <ReportsGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}

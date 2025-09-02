import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building,
  Users,
  DollarSign,
  FileText,
  UserCheck,
  Calculator,
  TrendingUp,
  Plus,
  MapPin,
  Calendar,
  CheckCircle,
  X,
  Bell,
  CreditCard,
  Send,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { GradientKpiCard } from "@/components/ui/gradient-kpi-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AddPaymentModal } from "@/components/dashboard/clients/AddPaymentModal";
import { NewAllocationForm } from "@/components/dashboard/forms/NewAllocationForm";
import { NewExpenseForm } from "@/components/dashboard/forms/NewExpenseForm";
import { SendNoticeForm } from "@/components/dashboard/notices/SendNoticeForm";
import { NewClientForm } from "@/components/dashboard/forms/NewClientForm";
import { useResponsive } from "@/hooks/use-responsive";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DashboardService } from "@/services/dashboardService";
import { formatCurrencyKPI } from "@/utils/formatCurrency";

// Types for dashboard data
interface DashboardData {
  totalProjects: number;
  totalMarketer: number;
  totalSales: number;
  activeClients: number;
  totalRevenue: number;
  availablePlots: number;
  pendingAllocations: number;
  totalPlots: number;
  performance: {
    salesChartData: Array<{
      month: string;
      sales: number;
      revenue: number;
      allocations: number;
    }>;
    financialChartData: Array<{
      month: string;
      income: number;
      expenses: number;
      profit: number;
    }>;
    projectStatusData: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    projectPerformance: Array<{
      _id: string;
      projectName: string;
      location: string;
      totalPlots: number;
      allocatedPlots: number;
      totalSales: number;
      salesCount: number;
      allocationRate: number;
    }>;
    marketerPerformance: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      totalSales: number;
      salesCount: number;
      averageSaleValue: number | null;
    }>;
    monthlySales: any[];
    monthlyAllocations: Array<{
      _id: { year: number; month: number };
      totalAllocations: number;
      totalValue: number;
    }>;
  };
}

export function DashboardOverview() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isSmallScreen, isLargeDesktop } = useResponsive();
  const [showNotification, setShowNotification] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await DashboardService.getDashboardOverview();
        if (response.data?.data) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format currency helper
  const formatCurrency = formatCurrencyKPI;

  // KPI data with real data integration
  const kpiData = [
    {
      title: "Total Projects",
      value: dashboardData ? dashboardData.totalProjects.toString() : "0",
      subtitle: "Active Projects",
      icon: Building,
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/projects"),
    },
    {
      title: "Active Clients",
      value: dashboardData ? dashboardData.activeClients.toString() : "0",
      subtitle: "Active Clients",
      icon: Users,
      gradientFrom: "from-emerald-500",
      gradientTo: "to-teal-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/clients"),
    },
    {
      title: "Total Sales Revenue",
      value: dashboardData ? formatCurrency(dashboardData.totalRevenue) : "₦0",
      subtitle: `${dashboardData?.totalSales || 0} Sales`,
      icon: DollarSign,
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/accounting"),
    },
    {
      title: "Pending Allocations",
      value: dashboardData ? dashboardData.pendingAllocations.toString() : "0",
      subtitle: "Awaiting Processing",
      icon: FileText,
      gradientFrom: "from-orange-500",
      gradientTo: "to-amber-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/sales"),
    },
    {
      title: "Available Plots",
      value: dashboardData ? dashboardData.availablePlots.toString() : "0",
      subtitle: "Ready for Allocation",
      icon: MapPin,
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/projects"),
    },
    {
      title: "Total Plots",
      value: dashboardData ? dashboardData.totalPlots.toString() : "0",
      subtitle: "All Plots",
      icon: Calculator,
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/projects"),
    },
    {
      title: "Total Sales",
      value: dashboardData ? dashboardData.totalSales.toString() : "0",
      subtitle: "Completed Sales",
      icon: CheckCircle,
      gradientFrom: "from-teal-500",
      gradientTo: "to-cyan-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/sales"),
    },
    {
      title: "Total Marketers",
      value: dashboardData ? dashboardData.totalMarketer.toString() : "0",
      subtitle: "Active Marketers",
      icon: UserCheck,
      gradientFrom: "from-rose-500",
      gradientTo: "to-pink-400",
      iconBgColor: "bg-white/20",
      iconColor: "text-white",
      onClick: () => navigate("/company/agents-marketers"),
    },
  ];

  const handleNewAction = (action: string) => {
    // Navigate to the appropriate page for creating new items
    const routes = {
      client: "/company/clients/new",
      project: "/company/projects/new",
      marketer: "/company/agents-marketers",
      allocation: "/company/sales",
    };
    const route = routes[action as keyof typeof routes];
    if (route) {
      navigate(route);
      toast.success(`Navigating to create new ${action}`);
    } else {
      toast.error(`Unknown action: ${action}`);
    }
    if (action === "payment") {
      setShowPaymentModal(true);
    } else if (action === "client") {
      navigate("/company/clients/new");
    } else if (action === "development") {
      navigate("/company/projects/new");
    } else {
      setActiveModal(action);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Mock client data for payment modal (in real app, this would come from props or context)
  const mockClient = {
    id: "1",
    name: "General Payment Entry",
    email: "payment@company.com",
  };

  const getModalTitle = (action: string) => {
    switch (action) {
      case "project_site":
        return "Create New Project Site";
      case "client":
        return "Create New Client";
      case "allocation":
        return "Create New Allocation";
      case "expense":
        return "Record New Expense";
      case "notice":
        return "Send New Notice";
      default:
        return "Create New";
    }
  };

  const getModalDescription = (action: string) => {
    switch (action) {
      case "project_site":
        return "Add a new project site to track development progress";
      case "client":
        return "Add a new client to your database";
      case "allocation":
        return "Allocate a plot to a client";
      case "expense":
        return "Record a new business expense";
      case "notice":
        return "Send a notice to clients or staff members";
      default:
        return "";
    }
  };

  const renderModalContent = (action: string) => {
    switch (action) {
      case "project_site":
        return <div>Project Site Form - To be implemented</div>;
      case "client":
        return <NewClientForm onClose={closeModal} />;
      case "allocation":
        return <NewAllocationForm onClose={closeModal} />;
      case "expense":
        return <NewExpenseForm onClose={closeModal} />;
      case "notice":
        return <SendNoticeForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Notification Bar */}
      {showNotification && (
        <div className="bg-blue-600 dark:bg-blue-700 text-white px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between rounded-lg mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span
              className={`font-medium ${isMobile ? "text-sm" : ""} truncate`}
            >
              {isMobile
                ? "Referral program live! Earn rewards."
                : "🎉 Referral program is now live! Earn rewards for every successful referral."}
            </span>
          </div>
          <Button
            variant="ghost"
            size={isMobile ? "sm" : "icon"}
            onClick={() => setShowNotification(false)}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-600 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 sm:px-6 py-4 sm:py-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1
              className={`font-bold text-gray-900 dark:text-white ${
                isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl"
              }`}
            >
              Dashboard
            </h1>
            <p
              className={`text-gray-600 dark:text-gray-300 mt-1 ${
                isMobile ? "text-sm" : ""
              }`}
            >
              Real Estate Sales & Project Management Overview
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {!isMobile && <ThemeToggle />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg ${
                    isMobile ? "flex-1 text-sm py-2" : "px-6 py-3"
                  }`}
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  {isMobile ? "New" : "New"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 sm:w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl z-50"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => handleNewAction("development")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Building className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  <span className="font-medium text-sm">New Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNewAction("client")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">New Client</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNewAction("allocation")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-medium">New Allocation</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNewAction("expense")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <span className="font-medium">New Expense</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNewAction("payment")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">New Payment</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNewAction("notice")}
                  className="flex items-center space-x-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Send className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">New Notice</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error loading dashboard data
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6 sm:space-y-8">
        {/* KPI Cards - Responsive Grid */}
        <div
          className={`grid gap-3 sm:gap-4 lg:gap-6 ${
            isMobile
              ? "grid-cols-2"
              : isTablet
              ? "grid-cols-2 lg:grid-cols-3"
              : isLargeDesktop
              ? "grid-cols-4"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {loading
            ? // Loading skeleton for KPI cards
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              ))
            : kpiData.map((kpi, index) => (
                <div
                  key={index}
                  onClick={kpi.onClick}
                  className="cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Navigate to ${kpi.title}`}
                >
                  <GradientKpiCard
                    title={kpi.title}
                    value={kpi.value}
                    subtitle={isMobile ? "" : kpi.subtitle}
                    icon={kpi.icon}
                    gradientFrom={kpi.gradientFrom}
                    gradientTo={kpi.gradientTo}
                    iconBgColor={kpi.iconBgColor}
                    iconColor={kpi.iconColor}
                  />
                </div>
              ))}
        </div>

        {/* Main Analytics Charts - Responsive Layout */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            isMobile || isTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle
                className={`font-semibold text-gray-800 dark:text-white ${
                  isMobile ? "text-base" : "text-lg"
                }`}
              >
                Sales & Allocations Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : dashboardData?.performance.salesChartData?.length ? (
                <ResponsiveContainer
                  width="100%"
                  height={isMobile ? 200 : isTablet ? 250 : 300}
                >
                  <BarChart data={dashboardData.performance.salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      fontSize={isMobile ? 10 : 12}
                    />
                    <YAxis stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                    <Tooltip
                      formatter={(value, name) => [
                        value,
                        name === "sales"
                          ? "Plots Sold"
                          : name === "allocations"
                          ? "Allocations"
                          : "Revenue (₦M)",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                    />
                    <Bar dataKey="sales" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                    <Bar
                      dataKey="allocations"
                      fill="#06b6d4"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  No sales data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle
                className={`font-semibold text-gray-800 dark:text-white ${
                  isMobile ? "text-base" : "text-lg"
                }`}
              >
                Financial Overview (₦M)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : dashboardData?.performance.financialChartData?.length ? (
                <ResponsiveContainer
                  width="100%"
                  height={isMobile ? 200 : isTablet ? 250 : 300}
                >
                  <AreaChart
                    data={dashboardData.performance.financialChartData}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      fontSize={isMobile ? 10 : 12}
                    />
                    <YAxis stroke="#64748b" fontSize={isMobile ? 10 : 12} />
                    <Tooltip
                      formatter={(value, name) => [
                        `₦${value}M`,
                        name === "income"
                          ? "Income"
                          : name === "expenses"
                          ? "Expenses"
                          : "Profit",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stackId="3"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  No financial data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Secondary Analytics - Responsive Grid */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            isMobile
              ? "grid-cols-1"
              : isTablet
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle
                className={`font-semibold text-gray-800 dark:text-white ${
                  isMobile ? "text-base" : "text-lg"
                }`}
              >
                Project Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : dashboardData?.performance.projectStatusData?.length ? (
                <ResponsiveContainer
                  width="100%"
                  height={isMobile ? 180 : isTablet ? 200 : 250}
                >
                  <PieChart>
                    <Pie
                      data={dashboardData.performance.projectStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={isMobile ? 60 : isTablet ? 80 : 100}
                      fill="#8884d8"
                      dataKey="value"
                      label={
                        isMobile
                          ? false
                          : ({ name, value }) => `${name}: ${value}`
                      }
                    >
                      {dashboardData.performance.projectStatusData.map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  No project status data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl ${
              isMobile ? "" : "lg:col-span-2"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={`font-semibold text-gray-800 dark:text-white ${
                  isMobile ? "text-base" : "text-lg"
                }`}
              >
                Recent Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      New client allocation completed
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      John Doe - Victoria Gardens Block A, Plot 12
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">
                    5 min ago
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Payment received
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      ₦2.5M initial payment - Lagos Estate Project
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">
                    1 hour ago
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Site inspection scheduled
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Sunrise Estate - Tomorrow 10:00 AM
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">
                    2 hours ago
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Document uploaded
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Survey plan - Greenfield Heights
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">
                    4 hours ago
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Performance Metrics */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            isMobile
              ? "grid-cols-1"
              : isTablet
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                Top Performing Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : dashboardData?.performance.projectPerformance?.length ? (
                <div className="space-y-4">
                  {dashboardData.performance.projectPerformance.map(
                    (project, index) => {
                      const colors = [
                        "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
                        "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                        "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                        "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
                      ];
                      const borderColors = [
                        "border-green-100 dark:border-green-800",
                        "border-blue-100 dark:border-blue-800",
                        "border-purple-100 dark:border-purple-800",
                        "border-orange-100 dark:border-orange-800",
                      ];
                      const hoverColors = [
                        "hover:bg-green-100 dark:hover:bg-green-900/30",
                        "hover:bg-blue-100 dark:hover:bg-blue-900/30",
                        "hover:bg-purple-100 dark:hover:bg-purple-900/30",
                        "hover:bg-orange-100 dark:hover:bg-orange-900/30",
                      ];
                      const textColors = [
                        "text-green-600",
                        "text-blue-600",
                        "text-purple-600",
                        "text-orange-600",
                      ];
                      const bgColors = [
                        "from-green-400 to-green-600",
                        "from-blue-400 to-blue-600",
                        "from-purple-400 to-purple-600",
                        "from-orange-400 to-orange-600",
                      ];

                      return (
                        <div
                          key={project._id}
                          className={`flex items-center justify-between p-4 bg-gradient-to-r ${
                            colors[index % colors.length]
                          } rounded-xl border ${
                            borderColors[index % borderColors.length]
                          } cursor-pointer ${
                            hoverColors[index % hoverColors.length]
                          }`}
                          onClick={() =>
                            navigate(`/company/projects/${project._id}`)
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${
                                bgColors[index % bgColors.length]
                              } rounded-xl flex items-center justify-center shadow-sm`}
                            >
                              <Building className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                {project.projectName}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">
                                {project.location} • {project.allocationRate}%
                                allocation rate
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-lg font-bold ${
                                textColors[index % textColors.length]
                              }`}
                            >
                              {formatCurrency(project.totalSales)}
                            </span>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {project.allocatedPlots}/{project.totalPlots}{" "}
                              plots
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  No project performance data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                Client Allocation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Plots
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {dashboardData?.totalPlots || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Available Plots
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {dashboardData?.availablePlots || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Pending Allocations
                    </span>
                    <span className="text-xl font-bold text-orange-600">
                      {dashboardData?.pendingAllocations || 0}
                    </span>
                  </div>
                  <div className="pt-4 border-t dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Allocation Rate
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {dashboardData?.totalPlots
                          ? Math.round(
                              ((dashboardData.totalPlots -
                                dashboardData.availablePlots) /
                                dashboardData.totalPlots) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <AddPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        client={mockClient}
      />

      {/* Centered Modal for Forms */}
      <Dialog open={!!activeModal} onOpenChange={closeModal}>
        <DialogContent
          className={`${
            isMobile
              ? "max-w-[95vw] max-h-[90vh] m-2"
              : "max-w-2xl max-h-[90vh]"
          } overflow-y-auto`}
        >
          <DialogHeader>
            <DialogTitle className={isMobile ? "text-lg" : "text-xl"}>
              {activeModal ? getModalTitle(activeModal) : ""}
            </DialogTitle>
            <DialogDescription className={isMobile ? "text-sm" : ""}>
              {activeModal ? getModalDescription(activeModal) : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6">
            {activeModal && renderModalContent(activeModal)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

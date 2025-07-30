import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Filter,
  Edit,
  Trash2,
  Grid,
  List,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NewMarketerForm } from "./forms/NewMarketerForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MarketerService } from "@/services/marketer";
import { CommissionService } from "@/services/CommissionService";

const mockMarketers = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@proptyos.com",
    phone: "+234 801 111 2222",
    leads: 45,
    conversions: 12,
    sales: 8,
    totalSalesVolume: "₦200M", // New field
    commission: "₦2.4M",
    commissionPaid: "₦1.8M",
    commissionPending: "₦600K",
    status: "active",
    role: "External Marketer",
    projects: ["Victoria Gardens", "Emerald Heights"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mike Davis",
    email: "mike@proptyos.com",
    phone: "+234 802 333 4444",
    leads: 38,
    conversions: 15,
    sales: 10,
    totalSalesVolume: "₦310M", // New field
    commission: "₦3.1M",
    commissionPaid: "₦2.5M",
    commissionPending: "₦600K",
    status: "active",
    role: "Senior Marketer",
    projects: ["Golden View", "Victoria Gardens"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@proptyos.com",
    phone: "+234 803 555 6666",
    leads: 29,
    conversions: 8,
    sales: 6,
    totalSalesVolume: "₦150M", // New field
    commission: "₦1.8M",
    commissionPaid: "₦1.8M",
    commissionPending: "₦0",
    status: "inactive",
    role: "Internal Sales Agent",
    projects: ["Emerald Heights"],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const mockCommissions = [
  {
    id: 1,
    marketerId: 1,
    marketerName: "Jane Smith",
    clientName: "John Doe",
    project: "Victoria Gardens",
    unit: "Block A - Plot 02",
    saleAmount: "₦25M",
    commissionRate: "2.5%",
    commissionAmount: "₦625K",
    status: "pending",
    saleDate: "2024-01-15",
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    marketerId: 2,
    marketerName: "Mike Davis",
    clientName: "Jane Williams",
    project: "Golden View",
    unit: "Block B - Plot 08",
    saleAmount: "₦30M",
    commissionRate: "3%",
    commissionAmount: "₦900K",
    status: "paid",
    saleDate: "2024-01-10",
    dueDate: "2024-02-10",
    paidDate: "2024-02-08",
  },
  {
    id: 3,
    marketerId: 1,
    marketerName: "Jane Smith",
    clientName: "Robert Brown",
    project: "Emerald Heights",
    unit: "Block C - Plot 15",
    saleAmount: "₦22M",
    commissionRate: "2.5%",
    commissionAmount: "₦550K",
    status: "approved",
    saleDate: "2024-01-20",
    dueDate: "2024-02-20",
  },
];

export function MarketersCommission() {
  const [selectedMarketer, setSelectedMarketer] = useState<any>(null);
  const [isNewMarketerOpen, setIsNewMarketerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("marketers");
  const [commissions, setCommissions] = useState<any[]>(mockCommissions);
  const [marketers, setMarketers] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Commission filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [marketerFilter, setMarketerFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  // Marketer filters
  const [marketerStatusFilter, setMarketerStatusFilter] = useState("all");
  const [marketerRoleFilter, setMarketerRoleFilter] = useState("all");
  const [marketerSearchTerm, setMarketerSearchTerm] = useState("");
  const [performanceDateFilter, setPerformanceDateFilter] = useState("all");
  const [performanceProjectFilter, setPerformanceProjectFilter] =
    useState("all");

  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchMarketer = async () => {
    const response = await MarketerService.getMarketers();
    console.log(response);

    setMarketers(response.data.data);
  };

  const fetchCommissions = async () => {
    const response = await CommissionService.getCommissions();
    console.log(response);
    setCommissions(response.data.data);
  };

  useEffect(() => {
    fetchMarketer();
    fetchCommissions();
  }, []);

  // Filter commissions based on filters
  const filteredCommissions = commissions.filter((commission) => {
    const matchesStatus =
      statusFilter === "all" || commission.status === statusFilter;
    const matchesMarketer =
      marketerFilter === "all" ||
      `${commission.marketerId?.firstName} ${commission.marketerId?.lastName}` ===
        marketerFilter;
    const matchesSearch =
      commission?.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission?.marketerId?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      commission?.marketerId?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "this-month" &&
        new Date(commission.period?.startDate).getMonth() ===
          new Date().getMonth()) ||
      (dateFilter === "last-month" &&
        new Date(commission.period?.startDate).getMonth() ===
          new Date().getMonth() - 1) ||
      (dateFilter === "this-year" &&
        new Date(commission.period?.startDate).getFullYear() ===
          new Date().getFullYear());
    const matchesProject =
      projectFilter === "all" || commission.project === projectFilter;
    return (
      matchesStatus &&
      matchesMarketer &&
      matchesSearch &&
      matchesDate &&
      matchesProject
    );
  });

  // Filter marketers based on filters
  const filteredMarketers = marketers?.filter((marketer) => {
    const matchesStatus =
      marketerStatusFilter === "all" ||
      marketer.status === marketerStatusFilter;
    const matchesRole =
      marketerRoleFilter === "all" || marketer.role === marketerRoleFilter;
    const matchesSearch =
      marketer.firstName
        .toLowerCase()
        .includes(marketerSearchTerm.toLowerCase()) ||
      marketer.lastName
        .toLowerCase()
        .includes(marketerSearchTerm.toLowerCase()) ||
      marketer.email.toLowerCase().includes(marketerSearchTerm.toLowerCase());
    const matchesPerformanceProject =
      performanceProjectFilter === "all" ||
      (marketer.projects &&
        marketer.projects.includes(performanceProjectFilter));
    return (
      matchesStatus && matchesRole && matchesSearch && matchesPerformanceProject
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCommissionStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeMarketers = marketers.filter(
    (marketer) => marketer.status === "active"
  ).length;

  // Calculate total sales from commissions data
  const totalSales = commissions.reduce(
    (sum, commission) => sum + (commission.totalSales || 0),
    0
  );

  // Calculate total sales volume from commissions data
  const totalSalesVolume = commissions.reduce(
    (sum, commission) => sum + (commission.totalAmount || 0),
    0
  );

  // Calculate total commission paid
  const totalCommissionPaid = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => {
      const amount = Number(c.commissionAmount) || 0;
      return sum + amount;
    }, 0);

  // Calculate total commission pending
  const totalCommissionPending = commissions
    .filter((c) => c.status === "pending" || c.status === "approved")
    .reduce((sum, c) => {
      const amount = Number(c.commissionAmount) || 0;
      return sum + amount;
    }, 0);

  const kpiData = [
    {
      title: "Active Marketers",
      value: activeMarketers.toString(),
      subtitle: "Currently working",
      icon: Users,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      cardBg: "from-purple-50 to-purple-100",
    },
    {
      title: "Total Sales",
      value: totalSales.toString(),
      subtitle: "Units sold",
      icon: TrendingUp,
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
      cardBg: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Total Sales Volume",
      value: `₦${(totalSalesVolume / 1000000).toFixed(1)}M`,
      subtitle: "Total revenue",
      icon: DollarSign,
      color: "text-green-700",
      bgColor: "bg-green-100",
      cardBg: "from-green-50 to-green-100",
    },
    {
      title: "Commission Paid",
      value: `₦${(totalCommissionPaid / 1000).toFixed(0)}K`,
      subtitle: "This period",
      icon: CheckCircle,
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      cardBg: "from-blue-50 to-blue-100",
    },
    {
      title: "Commission Pending",
      value: `₦${(totalCommissionPending / 1000).toFixed(0)}K`,
      subtitle: "Awaiting payment",
      icon: Clock,
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      cardBg: "from-amber-50 to-amber-100",
    },
  ];

  const handleMarkAsPaid = (commissionId: string) => {
    setCommissions((prev) =>
      prev.map((commission) =>
        commission._id === commissionId
          ? {
              ...commission,
              status: "paid",
              paidDate: new Date().toISOString().split("T")[0],
            }
          : commission
      )
    );

    toast({
      title: "Commission Marked as Paid",
      description: "The commission has been successfully marked as paid.",
    });
  };

  const handleProcessPayments = () => {
    const approvedCommissions = commissions.filter(
      (c) => c.status === "approved"
    );

    if (approvedCommissions.length === 0) {
      toast({
        title: "No Payments to Process",
        description: "There are no approved commissions ready for payment.",
        variant: "destructive",
      });
      return;
    }

    setCommissions((prev) =>
      prev.map((commission) =>
        commission.status === "approved"
          ? {
              ...commission,
              status: "paid",
              paidDate: new Date().toISOString().split("T")[0],
            }
          : commission
      )
    );

    toast({
      title: "Payments Processed",
      description: `Successfully processed ${approvedCommissions.length} commission payments.`,
    });
  };

  const handleNewMarketerSubmit = (marketerData: any) => {
    const newMarketer = {
      _id: `temp_${Date.now()}`,
      firstName: marketerData.firstName,
      lastName: marketerData.lastName,
      email: marketerData.email,
      phone: marketerData.phone,
      role: marketerData.role,
      leads: 0,
      conversions: 0,
      sales: 0,
      commissionRate: marketerData.commissionRate || 0,
      commissionType: marketerData.commissionType || "percentage",
      status: "active",
      projects: marketerData.projects || [],
      startDate: new Date().toISOString(),
      notes: marketerData.notes || "",
      paid: false,
    };

    setMarketers((prev) => [...prev, newMarketer]);
    setIsNewMarketerOpen(false);

    toast({
      title: "Marketer Added",
      description: "New marketer has been successfully added to the system.",
    });
  };

  const handleEditMarketer = (marketerId: string) => {
    toast({
      title: "Edit Marketer",
      description: "Edit marketer functionality coming soon.",
    });
  };

  const handleDeleteMarketer = (marketerId: string) => {
    setMarketers((prev) => prev.filter((m) => m._id !== marketerId));
    toast({
      title: "Marketer Removed",
      description: "Marketer has been successfully removed from the system.",
    });
  };

  const handleViewDetails = (marketerId: string) => {
    navigate(`/company/marketers/${marketerId}`);
  };

  const handleExportReport = (marketerId?: string) => {
    const marketerName = marketerId
      ? marketers.find((m) => m._id === marketerId)?.firstName
      : "All";
    toast({
      title: "Export Started",
      description: `Exporting report for ${marketerName}. Download will begin shortly.`,
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Commission CSV export will begin shortly.",
    });
  };

  const handleMarketerCardClick = (marketerId: string) => {
    navigate(`/company/marketers/${marketerId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Marketers & Commission
          </h1>
          <p className="text-gray-600 mt-1">
            Manage sales team and track commission payments
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsNewMarketerOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Marketer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

      {/* Tabs for Marketers and Commissions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketers">Marketers</TabsTrigger>
          <TabsTrigger value="commissions">Commission Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="marketers" className="space-y-6">
          {/* Marketer Filters */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search marketer..."
                    value={marketerSearchTerm}
                    onChange={(e) => setMarketerSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={marketerStatusFilter}
                    onValueChange={setMarketerStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select
                    value={marketerRoleFilter}
                    onValueChange={setMarketerRoleFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="External Marketer">
                        External Marketer
                      </SelectItem>
                      <SelectItem value="Internal Sales Agent">
                        Internal Sales Agent
                      </SelectItem>
                      <SelectItem value="Senior Marketer">
                        Senior Marketer
                      </SelectItem>
                      <SelectItem value="Marketing Team Lead">
                        Marketing Team Lead
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select
                    value={performanceProjectFilter}
                    onValueChange={setPerformanceProjectFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="Victoria Gardens">
                        Victoria Gardens
                      </SelectItem>
                      <SelectItem value="Emerald Heights">
                        Emerald Heights
                      </SelectItem>
                      <SelectItem value="Golden View">Golden View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Performance Period
                  </label>
                  <Select
                    value={performanceDateFilter}
                    onValueChange={setPerformanceDateFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">View</label>
                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) =>
                      value && setViewMode(value as "grid" | "list")
                    }
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMarketerStatusFilter("all");
                    setMarketerRoleFilter("all");
                    setMarketerSearchTerm("");
                    setPerformanceDateFilter("all");
                    setPerformanceProjectFilter("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMarketers.map((marketer) => (
                <Card
                  key={marketer._id}
                  className="hover:shadow-xl transition-all duration-300 bg-white cursor-pointer border border-border hover:border-primary/20 rounded-xl transform hover:scale-[1.02] hover:shadow-glow animate-fade-in"
                  onClick={() => handleMarketerCardClick(marketer._id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={marketer.avatar}
                            alt={marketer.firstName}
                          />
                          <AvatarFallback>
                            {marketer.firstName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {marketer.firstName} {marketer.lastName}
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            {marketer.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            {marketer.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(marketer.status)}>
                          {marketer.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditMarketer(marketer._id);
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMarketer(marketer._id);
                            }}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {marketer.leads || 0}
                          </div>
                          <div className="text-xs text-gray-500">Leads</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">
                            {marketer.conversions || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            Conversions
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {marketer.sales || 0}
                          </div>
                          <div className="text-xs text-gray-500">Sales</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Sales Volume:
                          </span>
                          <span className="font-bold text-purple-600">
                            {marketer.totalSalesVolume}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Total Commission:
                          </span>
                          <span className="font-bold text-purple-600">
                            {marketer.commission}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Paid:</span>
                          <span className="font-medium text-green-600">
                            {marketer.commissionPaid}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Pending:
                          </span>
                          <span className="font-medium text-orange-600">
                            {marketer.commissionPending}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Assigned Projects:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {marketer?.projects?.map(
                            (project: any, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {project}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(marketer._id);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportReport(marketer._id);
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Marketer</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMarketers.map((marketer) => (
                      <TableRow
                        key={marketer._id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleMarketerCardClick(marketer._id)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={marketer.avatar}
                                alt={marketer.firstName}
                              />
                              <AvatarFallback>
                                {marketer.firstName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {marketer.firstName} {marketer.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {marketer.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{marketer.role}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-4 text-sm">
                            <span className="text-blue-600">
                              {marketer.leads || 0} leads
                            </span>
                            <span className="text-yellow-600">
                              {marketer.conversions || 0} conv
                            </span>
                            <span className="text-green-600">
                              {marketer.sales || 0} sales
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-purple-600">
                              {marketer.commissionRate || 0}%
                            </div>
                            <div className="text-xs text-gray-500">
                              Type: {marketer.commissionType || "percentage"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(marketer.status)}>
                            {marketer.status || "inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(marketer._id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditMarketer(marketer._id);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMarketer(marketer._id);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredMarketers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No marketers found matching the current filters.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {filteredMarketers.length === 0 && viewMode === "grid" && (
            <div className="text-center py-8 text-gray-500">
              No marketers found matching the current filters.
            </div>
          )}
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Commission Tracking
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
                onClick={handleProcessPayments}
              >
                Process Payments
              </Button>
            </div>
          </div>

          {/* Commission Filters */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search client or project..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Marketer</label>
                  <Select
                    value={marketerFilter}
                    onValueChange={setMarketerFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Marketers</SelectItem>
                      {marketers.map((marketer) => (
                        <SelectItem
                          key={marketer._id}
                          value={`${marketer.firstName} ${marketer.lastName}`}
                        >
                          {marketer.firstName} {marketer.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select
                    value={projectFilter}
                    onValueChange={setProjectFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="Victoria Gardens">
                        Victoria Gardens
                      </SelectItem>
                      <SelectItem value="Emerald Heights">
                        Emerald Heights
                      </SelectItem>
                      <SelectItem value="Golden View">Golden View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Period</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Actions</label>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setStatusFilter("all");
                        setMarketerFilter("all");
                        setProjectFilter("all");
                        setDateFilter("all");
                        setSearchTerm("");
                      }}
                    >
                      Clear Filters
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleExportCSV}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marketer</TableHead>
                    <TableHead>Sales Details</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommissions.map((commission) => (
                    <TableRow key={commission._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {commission.marketerId?.firstName}{" "}
                            {commission.marketerId?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {commission.marketerId?.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {commission.salesIds?.length || 0} Sales
                          </div>
                          <div className="text-sm text-gray-500">
                            {commission.notes}
                          </div>
                          <div className="text-xs text-gray-400">
                            {commission.salesIds?.[0]?.unitNumber &&
                              `Unit: ${commission.salesIds[0].unitNumber}`}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ₦{commission.totalAmount?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-purple-600">
                            ₦{commission.commissionAmount?.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {commission.commissionRate}% (
                            {commission.commissionType})
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getCommissionStatusColor(
                            commission.status
                          )}
                        >
                          {commission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(
                            commission.period?.endDate
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Period:{" "}
                          {new Date(
                            commission.period?.startDate
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            commission.period?.endDate
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {commission.status === "approved" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleMarkAsPaid(commission._id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Paid
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({
                                title: "View Commission",
                                description: `Viewing commission details for ${commission.marketerId?.firstName} ${commission.marketerId?.lastName}`,
                              })
                            }
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredCommissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No commissions found matching the current filters.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Marketer Modal */}
      <Dialog open={isNewMarketerOpen} onOpenChange={setIsNewMarketerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Marketer</DialogTitle>
            <DialogDescription>
              Add a new sales marketer to your team
            </DialogDescription>
          </DialogHeader>
          <NewMarketerForm
            onClose={() => setIsNewMarketerOpen(false)}
            onSubmit={handleNewMarketerSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Ban,
  Download,
  Search,
  History,
  ArrowRight,
  AlertTriangle,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import { SalesService, SaleRecord } from "@/services/sales";
import { ProjectsService } from "@/services/projectsService";
import { ClientsService } from "@/services/clientsService";
import { formatDate } from "@/utils/formatDate";

const mockAllocationHistory = [
  {
    id: 1,
    type: "allocation",
    clientName: "John Doe",
    unit: "Block A - Plot 02",
    project: "Victoria Gardens",
    status: "allocated",
    paymentStatus: "partial",
    date: "2024-01-15",
    totalAmount: 25000000,
    paidAmount: 15000000,
    marketer: "Jane Smith",
    admin: "Admin User",
  },
  {
    id: 2,
    type: "reallocation",
    unit: "Block B - Plot 08",
    project: "Emerald Heights",
    oldClient: "David Wilson",
    newClient: "Sarah Johnson",
    date: "2024-01-10",
    reason: "Unit Resale",
    admin: "Admin User",
    oldClientPhone: "+234 803 456 7890",
    newClientPhone: "+234 804 567 8901",
    marketer: "Mike Davis",
    transferFee: 750000,
  },
  {
    id: 3,
    type: "revoked",
    clientName: "Michael Thompson",
    unit: "Block A - Plot 18",
    project: "Victoria Gardens",
    date: "2024-01-18",
    reason: "Payment Default",
    refundStatus: "Partial",
    refundType: "partial",
    originalAmount: 25000000,
    refundedAmount: 20000000,
    refundPercentage: 80,
    admin: "Admin User",
    clientPhone: "+234 801 234 5678",
    marketer: "Jane Smith",
  },
];

interface HistoryTabProps {
  onRevoke?: (allocation: any) => void;
}

export function HistoryTab({ onRevoke }: HistoryTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [history, setHistory] = useState<SaleRecord[]>([]);
  const [projects, setProjects] = useState<{ [key: string]: any }>({});
  const [clients, setClients] = useState<{ [key: string]: any }>({});

  // Helper functions moved to top to avoid initialization order issues
  const getClientFullName = (client: any) => {
    if (!client) return "Unknown Client";
    const firstName = client.firstName || "";
    const lastName = client.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Unknown Client";
  };

  const getMarketerFullName = (marketer: any) => {
    if (!marketer) return "Unknown Marketer";
    const firstName = marketer.firstName || "";
    const lastName = marketer.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Unknown Marketer";
  };

  const getProjectName = (project: any) => {
    if (!project) return "Unknown Project";
    return project.projectName || "Unknown Project";
  };

  const getPaymentStatus = (saleAmount: number, initialPayment: number) => {
    if (initialPayment >= saleAmount) return "Fully Paid";
    if (initialPayment > 0) return "Partially Paid";
    return "Not Paid";
  };

  const getPaymentStatusColor = (
    saleAmount: number,
    initialPayment: number
  ) => {
    if (initialPayment >= saleAmount) return "bg-green-100 text-green-800";
    if (initialPayment > 0) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "No Phone";
    // Format Nigerian phone numbers
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(
        4,
        7
      )} ${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10 && cleaned.startsWith("234")) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8)}`;
    }
    return phone;
  };

  const getEmailDisplay = (email: string) => {
    return email || null;
  };

  const getLocationDisplay = (project: any) => {
    return project?.location || null;
  };

  const getPaymentMethodDisplay = (method: string) => {
    if (!method) return "Not specified";
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  const getNotesDisplay = (notes: string) => {
    return notes || null;
  };

  const getRemainingBalance = (saleAmount: number, initialPayment: number) => {
    return Math.max(0, saleAmount - initialPayment);
  };

  const fetchHistory = async () => {
    try {
      const response = await SalesService.getSales();
      console.log("history", response);
      const historyData = response?.data?.data?.sales || [];
      setHistory(historyData);

      // Fetch related data if we have history items
    } catch (error) {
      console.error("Error fetching history data:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []); // Only run once on component mount

  const filteredHistory = history.filter((item) => {
    if (!item || !item.clientId || !item.projectId) {
      return false;
    }

    const clientName = getClientFullName(item.clientId);
    const projectName = getProjectName(item.projectId);

    const matchesSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unitNumber &&
        item.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    // Since the API only returns sales data, we'll treat all items as allocations
    const matchesType = typeFilter === "all" || typeFilter === "allocation";
    const matchesProject =
      projectFilter === "all" || projectName === projectFilter;

    // Date filtering
    let matchesDate = true;
    if (dateFilter !== "all" && item.saleDate) {
      const saleDate = new Date(item.saleDate);
      const now = new Date();

      switch (dateFilter) {
        case "this-month":
          matchesDate =
            saleDate.getMonth() === now.getMonth() &&
            saleDate.getFullYear() === now.getFullYear();
          break;
        case "last-month":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          matchesDate =
            saleDate.getMonth() === lastMonth.getMonth() &&
            saleDate.getFullYear() === lastMonth.getFullYear();
          break;
        case "this-quarter":
          const quarter = Math.floor(now.getMonth() / 3);
          const saleQuarter = Math.floor(saleDate.getMonth() / 3);
          matchesDate =
            saleQuarter === quarter &&
            saleDate.getFullYear() === now.getFullYear();
          break;
        case "this-year":
          matchesDate = saleDate.getFullYear() === now.getFullYear();
          break;
      }
    }

    return matchesSearch && matchesType && matchesProject && matchesDate;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "allocated":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Unit Resale":
        return "bg-green-100 text-green-800";
      case "Client Transfer":
        return "bg-blue-100 text-blue-800";
      case "Payment Default":
        return "bg-red-100 text-red-800";
      case "Administrative Change":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case "Full":
        return "bg-green-100 text-green-800";
      case "Partial":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const projectNames = [
    ...new Set(
      history
        .map((h) => getProjectName(h.projectId))
        .filter((name) => name !== "Unknown Project")
    ),
  ];

  // Get unique client names for search suggestions
  const clientNames = [
    ...new Set(
      history
        .map((h) => getClientFullName(h.clientId))
        .filter((name) => name !== "Unknown Client")
    ),
  ];

  const renderTableHeaders = () => {
    if (typeFilter === "allocation" || typeFilter === "all") {
      return (
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    } else if (typeFilter === "reallocation") {
      return (
        <TableRow>
          <TableHead>Unit & Project</TableHead>
          <TableHead>Transfer Details</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Transfer Date</TableHead>
          <TableHead>Marketer</TableHead>
          <TableHead>Transfer Fee</TableHead>
          <TableHead>Admin</TableHead>
        </TableRow>
      );
    } else if (typeFilter === "revoked") {
      return (
        <TableRow>
          <TableHead>Client & Unit</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Revocation Date</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Refund Status</TableHead>
          <TableHead>Financial Details</TableHead>
          <TableHead>Admin</TableHead>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount/Fee</TableHead>
          <TableHead>Status/Reason</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    }
  };

  const renderTableRow = (item: any) => {
    if (typeFilter === "allocation" || typeFilter === "all") {
      console.log("item", item);

      const clientName = getClientFullName(item.clientId);
      const projectName = getProjectName(item.projectId);

      return (
        <TableRow key={item._id}>
          <TableCell>
            <div>
              <div className="font-medium">{clientName}</div>
              {getEmailDisplay(item.clientId?.email) && (
                <div className="text-sm text-gray-500">
                  {getEmailDisplay(item.clientId?.email)}
                </div>
              )}
              {formatPhoneNumber(item.clientId?.phone) && (
                <div className="text-xs text-gray-400">
                  {formatPhoneNumber(item.clientId?.phone)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{item.unitNumber}</div>
              <div className="text-sm text-gray-500">
                via {getMarketerFullName(item.marketerId)}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{projectName}</div>
              {getLocationDisplay(item.projectId) && (
                <div className="text-sm text-gray-500">
                  {getLocationDisplay(item.projectId)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <Badge
              className={getPaymentStatusColor(
                item.saleAmount,
                item.initialPayment
              )}
            >
              {getPaymentStatus(item.saleAmount, item.initialPayment)}
            </Badge>
          </TableCell>
          <TableCell>{formatDate(item.saleDate)}</TableCell>
          <TableCell>
            <div>
              <div className="font-medium">
                {formatCurrency(item.saleAmount)}
              </div>
              <div className="text-sm text-gray-500">
                Paid: {formatCurrency(item.initialPayment)}
              </div>
              {getRemainingBalance(item.saleAmount, item.initialPayment) >
                0 && (
                <div className="text-sm text-red-600">
                  Remaining:{" "}
                  {formatCurrency(
                    getRemainingBalance(item.saleAmount, item.initialPayment)
                  )}
                </div>
              )}
              <div className="text-xs text-gray-400">
                {getPaymentMethodDisplay(item.paymentMethod)}
              </div>
              {getNotesDisplay(item.notes) && (
                <div className="text-xs text-blue-600 mt-1">
                  Note: {getNotesDisplay(item.notes)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              {(item.status === "allocated" || !item.status) && onRevoke && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRevoke(item)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Ban className="h-4 w-4" />
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>
      );
    } else if (typeFilter === "reallocation" && item.type === "reallocation") {
      const projectName = getProjectName(item.projectId);

      return (
        <TableRow key={item._id}>
          <TableCell>
            <div>
              <div className="font-medium">{item.unitNumber}</div>
              <div className="text-sm text-gray-500">{projectName}</div>
              {getLocationDisplay(item.projectId) && (
                <div className="text-xs text-gray-400">
                  {getLocationDisplay(item.projectId)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <div className="text-center">
                <div className="font-medium text-red-600">{item.oldClient}</div>
                <div className="text-xs text-gray-500">
                  {item.oldClientPhone}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="text-center">
                <div className="font-medium text-green-600">
                  {item.newClient}
                </div>
                <div className="text-xs text-gray-500">
                  {item.newClientPhone}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge className={getReasonColor(item.reason)}>{item.reason}</Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{formatDate(item.saleDate)}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 text-gray-400" />
              <span>{getMarketerFullName(item.marketerId)}</span>
            </div>
          </TableCell>
          <TableCell className="font-medium text-green-600">
            {formatCurrency(item.transferFee)}
          </TableCell>
          <TableCell className="text-sm text-gray-600">{item.admin}</TableCell>
        </TableRow>
      );
    } else if (typeFilter === "revoked" && item.type === "revoked") {
      const clientName = getClientFullName(item.clientId);
      const projectName = getProjectName(item.projectId);

      return (
        <TableRow key={item._id}>
          <TableCell>
            <div>
              <div className="font-medium flex items-center space-x-2">
                <span>{clientName}</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-sm text-gray-500">{item.unitNumber}</div>
              <div className="text-xs text-gray-400">
                {formatPhoneNumber(item.clientId?.phone)}
              </div>
              <div className="text-xs text-gray-400">
                via {getMarketerFullName(item.marketerId)}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{projectName}</div>
              {getLocationDisplay(item.projectId) && (
                <div className="text-sm text-gray-500">
                  {getLocationDisplay(item.projectId)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{formatDate(item.saleDate)}</span>
            </div>
          </TableCell>
          <TableCell>
            <Badge className={getReasonColor(item.reason)}>{item.reason}</Badge>
          </TableCell>
          <TableCell>
            <Badge className={getRefundStatusColor(item.refundStatus)}>
              {item.refundStatus} ({item.refundPercentage}%)
            </Badge>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-sm">
                <DollarSign className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600">Original:</span>
                <span className="font-medium">
                  {formatCurrency(item.originalAmount)}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <DollarSign className="h-3 w-3 text-green-600" />
                <span className="text-gray-600">Refunded:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(item.refundedAmount)}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{item.admin}</span>
            </div>
          </TableCell>
        </TableRow>
      );
    } else if (typeFilter === "all") {
      console.log("item", item);
      const clientName = getClientFullName(item.clientId);
      const projectName = getProjectName(item.projectId);

      return (
        <TableRow key={item._id}>
          <TableCell>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              Sale
            </Badge>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{clientName}</div>
              {getEmailDisplay(item.clientId?.email) && (
                <div className="text-sm text-gray-500">
                  {getEmailDisplay(item.clientId?.email)}
                </div>
              )}
              {formatPhoneNumber(item.clientId?.phone) && (
                <div className="text-xs text-gray-400">
                  {formatPhoneNumber(item.clientId?.phone)}
                </div>
              )}
              <div className="text-sm text-gray-500">{item.unitNumber}</div>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{projectName}</div>
              {getLocationDisplay(item.projectId) && (
                <div className="text-sm text-gray-500">
                  {getLocationDisplay(item.projectId)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>{formatDate(item.saleDate)}</TableCell>
          <TableCell>
            <div>
              <div className="font-medium">
                {item.saleAmount && formatCurrency(item.saleAmount)}
              </div>
              <div className="text-sm text-gray-500">
                Paid:{" "}
                {item.initialPayment && formatCurrency(item.initialPayment)}
              </div>
              {getRemainingBalance(item.saleAmount, item.initialPayment) >
                0 && (
                <div className="text-sm text-red-600">
                  Remaining:{" "}
                  {formatCurrency(
                    getRemainingBalance(item.saleAmount, item.initialPayment)
                  )}
                </div>
              )}
              <div className="text-xs text-gray-400">
                {getPaymentMethodDisplay(item.paymentMethod)}
              </div>
              {getNotesDisplay(item.notes) && (
                <div className="text-xs text-blue-600 mt-1">
                  Note: {getNotesDisplay(item.notes)}
                </div>
              )}
            </div>
          </TableCell>
          <TableCell>
            <Badge
              className={getPaymentStatusColor(
                item.saleAmount,
                item.initialPayment
              )}
            >
              {getPaymentStatus(item.saleAmount, item.initialPayment)}
            </Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5 text-blue-600" />
              <span>History</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="allocation">Allocations</SelectItem>
                <SelectItem value="reallocation">Re-allocations</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectNames.map((projectName) => (
                  <SelectItem key={projectName} value={projectName}>
                    {projectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
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

          {/* Table */}
          <Table>
            <TableHeader>{renderTableHeaders()}</TableHeader>
            <TableBody>
              {filteredHistory.map((item) => {
                console.log("item", item);
                return renderTableRow(item);
              })}
            </TableBody>
          </Table>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No history found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

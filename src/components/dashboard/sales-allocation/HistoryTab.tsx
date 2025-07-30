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
import { SalesService } from "@/services/sales";
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
  const [history, setHistory] = useState<any[]>([]);
  const [projects, setProjects] = useState<{ [key: string]: any }>({});
  const [clients, setClients] = useState<{ [key: string]: any }>({});

  const fetchHistory = async () => {
    try {
      const response = await SalesService.getSales();
      console.log("history", response);
      const historyData = response.data.data;
      setHistory(historyData);

      // Fetch related data if we have history items
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []); // Only run once on component mount

  const filteredHistory = history.filter((item) => {
    const clientName = item.clientId?.firstName || item.client?.name || "";
    const projectName = item.projectId?.projectName || "";

    const matchesSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unit && item.unit.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesProject =
      projectFilter === "all" || projectName === projectFilter;

    return matchesSearch && matchesType && matchesProject;
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
    ...new Set(history.map((h) => h.projectId?.projectName).filter(Boolean)),
  ];

  const renderTableHeaders = () => {
    if (typeFilter === "allocation") {
      return (
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
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
    if (typeFilter === "allocation" && item.type === "allocation") {
      console.log("item", item);

      const clientName =
        item.client?.firstName || item.client?.name || "Unknown Client";
      const projectName = item.project?.projectName || "Unknown Project";

      return (
        <TableRow key={item.id}>
          <TableCell className="font-medium">{clientName}</TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{item.unit}</div>
              <div className="text-sm text-gray-500">via {item.marketer}</div>
            </div>
          </TableCell>
          <TableCell>{projectName}</TableCell>
          <TableCell>
            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
          </TableCell>
          <TableCell>{item.date}</TableCell>
          <TableCell>
            <div>
              <div className="font-medium">
                {formatCurrency(item.totalAmount)}
              </div>
              <div className="text-sm text-gray-500">
                Paid: {formatCurrency(item.paidAmount)}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              {item.status === "allocated" && onRevoke && (
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
      const projectName = item.projectId?.projectName || "Unknown Project";

      return (
        <TableRow key={item.id}>
          <TableCell>
            <div>
              <div className="font-medium">{item.unit}</div>
              <div className="text-sm text-gray-500">{projectName}</div>
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
              <span>{item.date}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 text-gray-400" />
              <span>{item.marketer}</span>
            </div>
          </TableCell>
          <TableCell className="font-medium text-green-600">
            {formatCurrency(item.transferFee)}
          </TableCell>
          <TableCell className="text-sm text-gray-600">{item.admin}</TableCell>
        </TableRow>
      );
    } else if (typeFilter === "revoked" && item.type === "revoked") {
      const clientName =
        item.client?.firstName || item.client?.name || "Unknown Client";
      const projectName = item.project?.projectName || "Unknown Project";

      return (
        <TableRow key={item.id}>
          <TableCell>
            <div>
              <div className="font-medium flex items-center space-x-2">
                <span>{clientName}</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-sm text-gray-500">{item.unit}</div>
              <div className="text-xs text-gray-400">{item.clientPhone}</div>
              <div className="text-xs text-gray-400">via {item.marketer}</div>
            </div>
          </TableCell>
          <TableCell className="font-medium">{projectName}</TableCell>
          <TableCell>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{item.date}</span>
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
      const clientName =
        item.clientId?.firstName || item.clientId?.name || "Unknown Client";
      const projectName = item.projectId?.projectName || "Unknown Project";

      return (
        <TableRow key={item.id}>
          <TableCell>
            <Badge
              variant="outline"
              className={
                item.type === "allocation"
                  ? "bg-blue-100 text-blue-800"
                  : item.type === "reallocation"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {item.type}
            </Badge>
          </TableCell>
          <TableCell>
            <div>
              <div className="font-medium">{clientName}</div>
              <div className="text-sm text-gray-500">{item.unit}</div>
            </div>
          </TableCell>
          <TableCell>{projectName}</TableCell>
          <TableCell>{formatDate(item.saleDate)}</TableCell>
          <TableCell>
            {item.saleAmount && formatCurrency(item.saleAmount)}
            {/* {item.transferFee && formatCurrency(item.transferFee)}
            {item.originalAmount && formatCurrency(item.originalAmount)} */}
          </TableCell>
          <TableCell>
            {item.status && (
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            )}
            {item.reason && (
              <Badge className={getReasonColor(item.reason)}>
                {item.reason}
              </Badge>
            )}
            {item.refundStatus && (
              <Badge className={getRefundStatusColor(item.refundStatus)}>
                {item.refundStatus}
              </Badge>
            )}
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

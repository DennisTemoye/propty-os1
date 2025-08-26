import React, { useState, useEffect } from "react";
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
  Search,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Receipt,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Fee } from "@/services/feeCollectionService";
import { formatCurrency } from "@/utils/formatCurrency";

interface SimplifiedFeesOverviewProps {
  fees: Fee[];
  loading?: boolean;
  error?: string | null;
  onRecordPayment: (fee: Fee) => void;
  onViewDetails: (fee: Fee) => void;
  onRefresh?: () => void;
}

export function SimplifiedFeesOverview({
  fees,
  loading,
  error,
  onRecordPayment,
  onViewDetails,
  onRefresh,
}: SimplifiedFeesOverviewProps) {
  // Debug logging to help identify hanging issues
  useEffect(() => {
    console.log("SimplifiedFeesOverview render:", {
      loading,
      error,
      feesCount: fees?.length,
    });
  }, [loading, error, fees]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partially_paid":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "partially_paid":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "cancelled":
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredFees = fees.filter((fee) => {
    // Note: We'll need to fetch client and project names separately or include them in the fee data
    const matchesSearch =
      fee.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || fee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = fees.reduce((sum, fee) => sum + fee.totalPaid, 0);
  const totalOutstanding = fees.reduce(
    (sum, fee) => sum + fee.outstandingBalance,
    0
  );
  const overdueCount = fees.filter((fee) => fee.status === "overdue").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Collected
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalCollected)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(totalOutstanding)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {overdueCount}
                </p>
                <p className="text-sm text-gray-500">Fees overdue</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading fees...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-600">Error: {error}</span>
              </div>
              {onRefresh && (
                <Button onClick={onRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Fees Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by client or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partially_paid">Partially Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fees List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-blue-600 mr-2" />
                <span className="text-gray-600">Loading fees...</span>
              </div>
            ) : (
              filteredFees.map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(fee.status)}
                    <div>
                      <div className="font-medium">Fee #{fee.id}</div>
                      <div className="text-sm text-gray-600">
                        {fee.description || "No description"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Due: {new Date(fee.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold">
                        {formatCurrency(fee.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Outstanding:{" "}
                        <span className="text-red-600">
                          {formatCurrency(fee.outstandingBalance)}
                        </span>
                      </div>
                    </div>

                    <Badge className={getStatusColor(fee.status)}>
                      {fee.status}
                    </Badge>

                    <div className="flex space-x-2">
                      {fee.status !== "paid" && (
                        <Button
                          size="sm"
                          onClick={() => onRecordPayment(fee)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Pay
                        </Button>
                      )}

                      {fee.status === "overdue" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Remind
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(fee)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && filteredFees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No fees found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

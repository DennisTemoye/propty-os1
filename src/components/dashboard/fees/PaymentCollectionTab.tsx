import React, { useState } from "react";
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
  Receipt,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
import { PaymentCollectionModal } from "./PaymentCollectionModal";
import { formatCurrencyKPI } from "@/utils/formatCurrency";

interface PaymentCollectionTabProps {
  mockFeeData: any[];
  onRecordPayment: (fee: any) => void;
}

export function PaymentCollectionTab({
  mockFeeData,
  onRecordPayment,
}: PaymentCollectionTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [selectedFee, setSelectedFee] = useState<any>(null);

  // Calculate metrics
  const todayPayments = 3200000; // Mock data
  const weeklyTarget = 10000000; // Mock data
  const monthlyCollected = mockFeeData.reduce(
    (sum, fee) => sum + parseInt(fee.paid.replace(/[₦,]/g, "")),
    0
  );
  const pendingAmount = mockFeeData
    .filter(
      (fee) => fee.status === "Pending" || fee.status === "Partially Paid"
    )
    .reduce(
      (sum, fee) => sum + parseInt(fee.outstanding.replace(/[₦,]/g, "")),
      0
    );

  const overdueAmount = mockFeeData
    .filter((fee) => fee.status === "Overdue")
    .reduce(
      (sum, fee) => sum + parseInt(fee.outstanding.replace(/[₦,]/g, "")),
      0
    );

  const priorityFees = mockFeeData
    .filter(
      (fee) =>
        fee.status === "Overdue" ||
        (fee.status === "Partially Paid" &&
          parseInt(fee.outstanding.replace(/[₦,]/g, "")) > 1000000)
    )
    .sort(
      (a, b) =>
        parseInt(b.outstanding.replace(/[₦,]/g, "")) -
        parseInt(a.outstanding.replace(/[₦,]/g, ""))
    );

  const recentPayments = [
    {
      client: "John Doe",
      amount: "₦1,500,000",
      time: "2 hours ago",
      method: "Bank Transfer",
    },
    {
      client: "Sarah Wilson",
      amount: "₦800,000",
      time: "4 hours ago",
      method: "POS",
    },
    {
      client: "Mike Johnson",
      amount: "₦2,200,000",
      time: "1 day ago",
      method: "Online",
    },
  ];

  const handleQuickPay = (fee: any) => {
    setSelectedFee(fee);
    onRecordPayment(fee);
  };

  const filteredPriorityFees = priorityFees.filter((fee) => {
    const matchesSearch =
      fee.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject =
      filterProject === "all" || fee.project === filterProject;
    return matchesSearch && matchesProject;
  });

  return (
    <div className="space-y-6">
      {/* Collection Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today's Collection
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrencyKPI(todayPayments)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">5 payments</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Weekly Target
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrencyKPI(weeklyTarget)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "32%" }}
                  ></div>
                </div>
                <span className="text-xs text-blue-600">32% achieved</span>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Collection
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrencyKPI(pendingAmount)}
                </p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-600">15 pending</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overdue Amount
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrencyKPI(overdueAmount)}
                </p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-600">Urgent attention</span>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Collections */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Priority Collections</span>
              </CardTitle>
              <Badge variant="destructive">
                {filteredPriorityFees.length} urgent
              </Badge>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search priority fees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Project" />
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
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPriorityFees.slice(0, 6).map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        fee.status === "Overdue"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium">{fee.clientName}</div>
                      <div className="text-sm text-gray-600">
                        {fee.project} • {fee.feeType}
                      </div>
                      <div className="text-xs text-gray-500">{fee.unit}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{fee.outstanding}</div>
                    <Badge
                      className={
                        fee.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {fee.status}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleQuickPay(fee)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Collect
                  </Button>
                </div>
              ))}
              {filteredPriorityFees.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No priority collections found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        {payment.method === "Bank Transfer" && (
                          <Banknote className="h-4 w-4 text-green-600" />
                        )}
                        {payment.method === "POS" && (
                          <CreditCard className="h-4 w-4 text-green-600" />
                        )}
                        {payment.method === "Online" && (
                          <Smartphone className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {payment.client}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {payment.amount}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.method}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Receipt className="h-4 w-4 mr-2" />
                  Generate Payment Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Send Bulk Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Collections
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Bank Transfer</span>
                  </div>
                  <span className="font-medium">₦2.1M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">POS</span>
                  </div>
                  <span className="font-medium">₦800K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Online</span>
                  </div>
                  <span className="font-medium">₦300K</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

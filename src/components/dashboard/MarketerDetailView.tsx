import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Phone,
  Mail,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Download,
  Eye,
  Trophy,
  Edit,
  Settings,
} from "lucide-react";
import { ProjectCommissionSettings } from "./marketers/ProjectCommissionSettings";
import { toast } from "sonner";
import { Marketer, MarketerService, Sale } from "@/services/marketer";

export function MarketerDetailView() {
  const params = useParams();
  const navigate = useNavigate();
  const [marketer, setMarketer] = useState<Marketer | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const marketerId = params.marketerId || params.id;

  useEffect(() => {
    const fetchMarketer = async () => {
      try {
        setLoading(true);
        const response = await MarketerService.getMarketer(marketerId);
        setMarketer(response.data.data);
        setSales(response.data.data.salesData.recentSales);
      } catch (error) {
        console.error("Error fetching marketer:", error);
        toast.error("Failed to fetch marketer details");
      } finally {
        setLoading(false);
      }
    };

    if (marketerId) {
      fetchMarketer();
    }
  }, [marketerId]);

  const [projectFilter, setProjectFilter] = useState("all");

  const commissions = [
    {
      id: 1,
      clientName: "John Doe",
      project: "Victoria Gardens",
      saleAmount: "₦25M",
      commissionAmount: "₦625K",
      rate: "2.5%",
      status: "paid",
      dateEarned: "2024-01-15",
      datePaid: "2024-02-01",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditProfile = () => {
    navigate(`/company/marketers/${marketer?._id}/edit`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading marketer details...</div>
      </div>
    );
  }

  if (!marketer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Marketer not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate("/company/marketers")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketers
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${marketer.firstName}+${marketer.lastName}&background=random`}
                  alt={`${marketer.firstName} ${marketer.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {marketer.firstName.charAt(0)}
                  {marketer.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {marketer.firstName} {marketer.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-2 capitalize">
                  {marketer.role.replace("-", " ")}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {marketer.phone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {marketer.email}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined: {formatDate(marketer.startDate)}
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  Commission Rate: {marketer.commissionRate}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(marketer.status)}>
                {marketer.status}
              </Badge>
              <Button
                variant="outline"
                onClick={() => toast.success("Report downloaded")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={handleEditProfile}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Sales</div>
                <div className="text-2xl font-bold text-blue-600">
                  {marketer.salesData.totalSales}
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Total Sales Volume
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(marketer.salesData.totalAmount)}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Total Commission Earned
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(marketer.salesData.commission)}
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="commission-settings">
            Commission Settings
          </TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Records</CardTitle>
            </CardHeader>
            <CardContent>
              {sales.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale._id}>
                        <TableCell className="font-medium">
                          {sale.clientId
                            ? `${sale.clientId.firstName} ${sale.clientId.lastName}`
                            : "Unknown Client"}
                        </TableCell>
                        <TableCell>{sale.unitNumber}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(sale.saleAmount)}
                        </TableCell>
                        <TableCell>{formatDate(sale.saleDate)}</TableCell>
                        <TableCell className="capitalize">
                          {sale.paymentMethod.replace("_", " ")}
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(
                            sale.saleAmount * (marketer.commissionRate / 100)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No sales records available.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commission Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {sales.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Sale Amount</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Date Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale._id}>
                        <TableCell className="font-medium">
                          {sale.clientId
                            ? `${sale.clientId.firstName} ${sale.clientId.lastName}`
                            : "Unknown Client"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(sale.saleAmount)}
                        </TableCell>
                        <TableCell>{marketer.commissionRate}%</TableCell>
                        <TableCell className="font-medium text-purple-600">
                          {formatCurrency(
                            sale.saleAmount * (marketer.commissionRate / 100)
                          )}
                        </TableCell>
                        <TableCell>{formatDate(sale.saleDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No commission records available.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission-settings" className="space-y-6">
          <ProjectCommissionSettings
            marketerId={marketer._id}
            marketerName={`${marketer.firstName} ${marketer.lastName}`}
          />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No activity logs available.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

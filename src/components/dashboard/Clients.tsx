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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  FileText,
  DollarSign,
  User,
  Building,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClientDetailView } from "./clients/ClientDetailView";
import { AssignPropertyModal } from "./clients/AssignPropertyModal";
import { AddPaymentModal } from "./clients/AddPaymentModal";
import { SendNoticeForm } from "./notices/SendNoticeForm";
import { useNavigate } from "react-router-dom";
import { ClientsService } from "@/services/clientsService";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatCurrency";

export function Clients() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isAssignPropertyOpen, setIsAssignPropertyOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isSendNoticeOpen, setIsSendNoticeOpen] = useState(false);
  const [filterKyc, setFilterKyc] = useState<string>("all");
  const [filterAllocation, setFilterAllocation] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [clients, setClients] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await ClientsService.getClients();
      if (response.success) {
        const clientsData = response.data?.data || [];
        // Transform API data to match the expected structure
        const transformedClients = clientsData.map((client: any) => ({
          ...client,
          // Ensure name fields are properly handled
          name: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
          // Format currency values
          totalPaid: client.totalPaid ? formatCurrency(client.totalPaid) : "₦0",
          balance: client.balance ? formatCurrency(client.balance) : "₦0",
          // Format next payment date if available
          nextPayment: client.nextPayment
            ? new Date(client.nextPayment).toLocaleDateString()
            : null,
          // Ensure projects array exists
          projects: client.projects || [],
          // Ensure documents array exists
          documents: client.documents || [],
          // Ensure status exists
          status: client.status || "New",
          // Ensure kycStatus exists
          kycStatus: client.kycStatus || "unverified",
          // Ensure paymentProgress exists
          paymentProgress: client.paymentProgress || 0,
          // Format assigned date if available
          assignedDate: client.assignedDate
            ? new Date(client.assignedDate).toLocaleDateString()
            : null,
        }));
        setClients(transformedClients);
      } else {
        toast.error(response.message || "Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "unverified":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getClientStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-gray-100 text-gray-800";
      case "Reserved":
        return "bg-yellow-100 text-yellow-800";
      case "Allocated":
        return "bg-blue-100 text-blue-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName || ""} ${
      client.lastName || ""
    }`.trim();
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyc = filterKyc === "all" || client.kycStatus === filterKyc;
    const matchesStatus =
      filterAllocation === "all" || client.status === filterAllocation;
    return matchesSearch && matchesKyc && matchesStatus;
  });

  const handleClientClick = (clientId: string | number) => {
    navigate(`/company/clients/${clientId}`);
  };

  const handleAssignProperty = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsAssignPropertyOpen(true);
  };

  const handleAddPayment = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsAddPaymentOpen(true);
  };

  const handleSendNotice = (e: React.MouseEvent, client: any) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsSendNoticeOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage client profiles, KYC, and property assignments
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate("/company/clients/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {clients.length}
            </div>
            <div className="text-sm text-gray-500">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {
                clients.filter((c) => c.projects && c.projects.length > 0)
                  .length
              }
            </div>
            <div className="text-sm text-gray-500">With Properties</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {clients.filter((c) => c.kycStatus === "verified").length}
            </div>
            <div className="text-sm text-gray-500">KYC Verified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {
                clients.filter((c) => !c.projects || c.projects.length === 0)
                  .length
              }
            </div>
            <div className="text-sm text-gray-500">Unassigned</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={filterKyc} onValueChange={setFilterKyc}>
            <SelectTrigger className="w-40 bg-background border-border z-10">
              <SelectValue placeholder="Filter by KYC" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All KYC</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAllocation} onValueChange={setFilterAllocation}>
            <SelectTrigger className="w-40 bg-background border-border z-10">
              <SelectValue placeholder="Client Status" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Allocated">Allocated</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
          >
            Card View
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            List View
          </Button>
        </div>
      </div>

      {/* Clients Display */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client._id || client.id}
              className="hover:shadow-md cursor-pointer bg-white border border-border hover:border-primary/20 rounded-xl"
              onClick={() => handleClientClick(client._id || client.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={client.passportPhoto || ""}
                        alt={`${client.firstName || ""} ${
                          client.lastName || ""
                        }`.trim()}
                      />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {`${client.firstName || ""} ${
                          client.lastName || ""
                        }`.trim()}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {client.projects && client.projects.length > 0 ? (
                  <div className="space-y-3">
                    {/* Show only first property with "+X more" indicator */}
                    <div className="border-b pb-2">
                      <div className="font-medium">
                        {client.projects[0].name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.projects[0].unit}
                      </div>
                      <div className="text-xs text-gray-400">
                        Assigned:{" "}
                        {client.projects[0].assignedDate
                          ? new Date(
                              client.projects[0].assignedDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                      {client.projects.length > 1 && (
                        <div className="text-xs text-blue-600 mt-1">
                          +{client.projects.length - 1} more
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Badge className={getKycStatusColor(client.kycStatus)}>
                          KYC {client.kycStatus}
                        </Badge>
                        <Badge className={getClientStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Payment Progress</span>
                        <span>{client.paymentProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${client.paymentProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Paid:</span>
                      <span className="font-medium text-green-600">
                        {client.totalPaid}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Balance:</span>
                      <span className="font-medium">{client.balance}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center py-4 text-gray-500">
                      <Building className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No property assigned</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Badge className={getKycStatusColor(client.kycStatus)}>
                        KYC {client.kycStatus}
                      </Badge>
                      <Badge className={getClientStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <Button
                      onClick={(e) => handleAssignProperty(e, client)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Assign Property
                    </Button>
                  </div>
                )}

                {/* Updated action buttons */}
                <div className="flex space-x-2 mt-4 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                    onClick={(e) => handleSendNotice(e, client)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Notice
                  </Button>
                  <Button
                    disabled={client.projects.length < 1}
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-accent hover:border-primary/20 transition-all duration-200"
                    onClick={(e) => handleAddPayment(e, client)}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Projects/Plots</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Progress</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client._id || client.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleClientClick(client._id || client.id)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={client.passportPhoto || ""}
                            alt={`${client.firstName || ""} ${
                              client.lastName || ""
                            }`.trim()}
                          />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {`${client.firstName || ""} ${
                              client.lastName || ""
                            }`.trim()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.phone}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <Badge
                              className={getKycStatusColor(client.kycStatus)}
                            >
                              KYC {client.kycStatus}
                            </Badge>
                            <Badge
                              className={getClientStatusColor(client.status)}
                            >
                              {client.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {client.projects && client.projects.length > 0 ? (
                        <div className="space-y-1">
                          <div>
                            <div className="font-medium text-sm">
                              {client.projects[0].name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {client.projects[0].unit}
                            </div>
                          </div>
                          {client.projects.length > 1 && (
                            <div className="text-xs text-blue-600">
                              +{client.projects.length - 1} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getClientStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {client.projects && client.projects.length > 0 ? (
                        <div>
                          <div className="font-medium text-green-600">
                            {client.totalPaid}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.paymentProgress}% complete
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-green-600 h-1 rounded-full"
                              style={{ width: `${client.paymentProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {client.nextPayment ? (
                        <span className="text-sm">{client.nextPayment}</span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          {client.paymentProgress === 100
                            ? "Complete"
                            : "Not set"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {(!client.projects || client.projects.length === 0) && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignProperty(e, client);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Building className="h-3 w-3 mr-1" />
                            Assign
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleSendNotice(e, client)}
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleAddPayment(e, client)}
                        >
                          <DollarSign className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Assign Property Modal */}
      <AssignPropertyModal
        isOpen={isAssignPropertyOpen}
        onClose={() => setIsAssignPropertyOpen(false)}
        client={selectedClient}
        onSuccess={fetchClients}
      />

      {/* Add Payment Modal */}
      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        client={selectedClient}
      />

      {/* Send Notice Modal */}
      <Dialog open={isSendNoticeOpen} onOpenChange={setIsSendNoticeOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Send Notice to{" "}
              {selectedClient
                ? `${selectedClient.firstName || ""} ${
                    selectedClient.lastName || ""
                  }`.trim()
                : ""}
            </DialogTitle>
            <DialogDescription>
              Send a notice to this client via email or WhatsApp
            </DialogDescription>
          </DialogHeader>
          <SendNoticeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

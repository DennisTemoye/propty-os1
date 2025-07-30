import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DollarSign } from "lucide-react";
import { SalesService } from "@/services/sales";
import { Client, ClientsService } from "@/services/clientsService";
import { ProjectsService } from "@/services/projectsService";
import { Project } from "@/types/project";
import { Marketer, MarketerService } from "@/services/marketer";

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockProjects = [
  { id: "project1", name: "Victoria Gardens" },
  { id: "project2", name: "Emerald Heights" },
  { id: "project3", name: "Golden View" },
  { id: "project4", name: "Ocean Breeze" },
];

const mockClients = [
  { id: "client1", name: "John Doe", email: "john@example.com" },
  { id: "client2", name: "Sarah Johnson", email: "sarah@example.com" },
  { id: "client3", name: "Robert Brown", email: "robert@example.com" },
  { id: "client4", name: "Alice Cooper", email: "alice@example.com" },
];

const mockMarketers = [
  { id: "marketer1", name: "Jane Smith" },
  { id: "marketer2", name: "Mike Davis" },
  { id: "marketer3", name: "Sarah Johnson" },
  { id: "marketer4", name: "Tom Wilson" },
];

export function RecordSaleModal({
  isOpen,
  onClose,
  onSubmit,
}: RecordSaleModalProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [marketers, setMarketers] = useState<Marketer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      clientId: "",
      projectId: "",
      unitNumber: "",
      saleAmount: "",
      initialPayment: "",
      marketerId: "",
      saleDate: new Date().toISOString().split("T")[0],
      paymentMethod: "",
      notes: "",
    },
  });

  const fetchClient = async () => {
    try {
      const response = await ClientsService.getClients();
      console.log(response);
      setClients(response.data.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await ProjectsService.getProjects();
      console.log(response);
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  const fetchMarketer = async () => {
    try {
      const response = await MarketerService.getMarketers();
      console.log(response);
      setMarketers(response.data.data);
    } catch (error) {
      console.error("Error fetching marketers:", error);
      toast.error("Failed to fetch marketers");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchClient();
      fetchProjects();
      fetchMarketer();
    }
  }, [isOpen]);

  const handleSubmit = async (data: any) => {
    // Validate required fields
    console.log(data);
    if (
      !data.clientId ||
      !data.projectId ||
      !data.unitNumber ||
      !data.saleAmount ||
      !data.initialPayment ||
      !data.saleDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await SalesService.recordSale(data);
      console.log(response);
      onSubmit(data);
      toast.success("Sale recorded successfully!");
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error recording sale:", error);
      toast.error("Failed to record sale. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Record New Sale</span>
          </DialogTitle>
          <DialogDescription>
            Record a new property sale and automatically create allocation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Client *</Label>
              <Select
                onValueChange={(value) => form.setValue("clientId", value)}
                value={form.watch("clientId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client._id} value={client._id}>
                      <div>
                        <div className="font-medium">{client.firstName}</div>
                        <div className="text-xs text-gray-500">
                          {client.email}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Project *</Label>
              <Select
                onValueChange={(value) => form.setValue("projectId", value)}
                value={form.watch("projectId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project._id} value={project._id}>
                      {project.projectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Unit Number *</Label>
              <Input
                {...form.register("unitNumber", { required: true })}
                placeholder="e.g., Block A - Plot 15"
              />
            </div>

            <div>
              <Label>Sale Amount (₦) *</Label>
              <Input
                type="number"
                {...form.register("saleAmount", { required: true })}
                placeholder="e.g., 25000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Initial Payment (₦) *</Label>
              <Input
                type="number"
                {...form.register("initialPayment", { required: true })}
                placeholder="e.g., 5000000"
              />
            </div>

            <div>
              <Label>Marketer</Label>
              <Select
                onValueChange={(value) => form.setValue("marketerId", value)}
                value={form.watch("marketerId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marketer" />
                </SelectTrigger>
                <SelectContent>
                  {marketers.map((marketer) => (
                    <SelectItem key={marketer._id} value={marketer._id}>
                      {marketer.firstName} {marketer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Sale Date *</Label>
              <Input
                type="date"
                {...form.register("saleDate", { required: true })}
              />
            </div>

            <div>
              <Label>Payment Method</Label>
              <Select
                onValueChange={(value) => form.setValue("paymentMethod", value)}
                value={form.watch("paymentMethod")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="installment">Installment Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea
              {...form.register("notes")}
              placeholder="Any additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Recording this sale will automatically
              create an allocation for the client and update the unit status.
              Commission calculations and accounting records will be updated
              accordingly.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Recording..." : "Record Sale & Allocate"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

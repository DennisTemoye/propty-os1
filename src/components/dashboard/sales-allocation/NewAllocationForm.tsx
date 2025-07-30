import React, { useEffect, useState } from "react";
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
import { AllocationService } from "@/services/allocationService";
import { ClientsService } from "@/services/clientsService";
import { ProjectsService } from "@/services/projectsService";
import { PlotsService } from "@/services/plotsService";
import { MarketerService } from "@/services/marketer";

interface NewAllocationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const mockClients = [
  { id: "client1", name: "John Doe", email: "john@example.com" },
  { id: "client2", name: "Jane Smith", email: "jane@example.com" },
  { id: "client3", name: "Robert Brown", email: "robert@example.com" },
];

const mockProjects = [
  { id: "project1", name: "Victoria Gardens" },
  { id: "project2", name: "Emerald Heights" },
  { id: "project3", name: "Golden View" },
];

const mockAvailablePlots = [
  {
    id: "plot1",
    number: "Block A - Plot 15",
    project: "Victoria Gardens",
    price: "₦25,000,000",
  },
  {
    id: "plot2",
    number: "Block B - Plot 22",
    project: "Emerald Heights",
    price: "₦30,000,000",
  },
  {
    id: "plot3",
    number: "Block C - Plot 08",
    project: "Golden View",
    price: "₦22,000,000",
  },
];

const mockMarketers = [
  { id: "marketer1", name: "Jane Smith" },
  { id: "marketer2", name: "Mike Davis" },
  { id: "marketer3", name: "Sarah Johnson" },
];

export function NewAllocationForm({
  onSubmit,
  onCancel,
}: NewAllocationFormProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [plots, setPlots] = useState<any[]>([]);
  const [marketers, setMarketers] = useState<any[]>([]);
  const form = useForm({
    defaultValues: {
      clientId: "",
      projectId: "",
      plotId: "",
      saleAmount: "",
      initialPayment: "",
      marketerId: "",
      allocationMode: "",
      notes: "",
    },
  });

  const fetchClients = async () => {
    const response = await ClientsService.getClients();
    setClients(response.data.data);
  };

  const fetchProjects = async () => {
    const response = await ProjectsService.getProjects();
    setProjects(response.data.data);
  };

  const fetchPlots = async (projectId: string) => {
    const response = await PlotsService.getPlotsByProjectId(projectId);

    setPlots(response.data.data);
  };

  const fetchMarketers = async () => {
    const response = await MarketerService.getMarketers();
    setMarketers(response.data.data);
  };

  const selectedProject = form.watch("projectId");

  useEffect(() => {
    fetchClients();
    fetchProjects();
    fetchMarketers();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchPlots(selectedProject);
    } else {
      setPlots([]);
    }
  }, [selectedProject]);

  const handleSubmit = async (data: any) => {
    console.log("data>>>>",data)
    try {
      await AllocationService.createAllocation(data);
      toast.success("Allocation submitted for approval!");
    } catch (error) {
      toast.error("Failed to submit allocation");
    }
    // onSubmit(data);
    // toast.success('Allocation submitted for approval!');
  };

  const availablePlots = plots.filter(
    (plot) => plot.projectId === selectedProject
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Client *</Label>
          <Select onValueChange={(value) => form.setValue("clientId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client._id} value={client._id}>
                  <div>
                    <div className="font-medium">
                      {client.firstName} {client.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Project *</Label>
          <Select onValueChange={(value) => form.setValue("projectId", value)}>
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

        <div>
          <Label>Available Plot *</Label>
          <Select onValueChange={(value) => form.setValue("plotId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select plot" />
            </SelectTrigger>
            <SelectContent>
              {availablePlots.map((plot) => (
                <SelectItem key={plot._id} value={plot._id}>
                  <div>
                    <div className="font-medium">{plot.plotNumber}</div>
                    <div className="text-xs text-gray-500">{plot.price}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Marketer</Label>
          <Select onValueChange={(value) => form.setValue("marketerId", value)}>
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

        <div>
          <Label>Sale Amount (₦) *</Label>
          <Input
            type="number"
            {...form.register("saleAmount", { required: true })}
            placeholder="e.g., 25000000"
          />
        </div>

        <div>
          <Label>Initial Payment (₦)</Label>
          <Input
            type="number"
            {...form.register("initialPayment")}
            placeholder="e.g., 5000000"
          />
        </div>
      </div>

      <div>
        <Label>Allocation Mode *</Label>
        <Select
          onValueChange={(value) => form.setValue("allocationMode", value)}
          defaultValue="instant_allocation"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select allocation mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instant_allocation">
              Instant Allocation
            </SelectItem>
            <SelectItem value="sales_offer">Sales Offer First</SelectItem>
            <SelectItem value="reservation">Reservation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          {...form.register("notes")}
          placeholder="Additional notes or special instructions..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Submit for Approval
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

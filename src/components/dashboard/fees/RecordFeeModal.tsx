import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Receipt, Search, Loader2 } from "lucide-react";
import { useFeeTypes } from "@/hooks/useFeeCollection";
import { useProjects, useClients } from "@/hooks/useApi";
import { FeeType } from "@/services/feeCollectionService";

interface RecordFeeModalProps {
  onClose: () => void;
}

export function RecordFeeModal({ onClose }: RecordFeeModalProps) {
  const [clientSearch, setClientSearch] = useState("");
  const { feeTypes, loading: feeTypesLoading } = useFeeTypes();

  // Use real data from API hooks
  const { projects, isLoading: projectsLoading } = useProjects();
  const { clients, isLoading: clientsLoading } = useClients();

  // Ensure feeTypes is always an array
  const safeFeeTypes = Array.isArray(feeTypes) ? feeTypes : [];

  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : [];

  // Ensure clients is always an array
  const safeClients = Array.isArray(clients) ? clients : [];

  // Debug logging
  useEffect(() => {
    console.log("RecordFeeModal data:", {
      projects: safeProjects.length,
      clients: safeClients.length,
      feeTypes: safeFeeTypes.length,
      projectsLoading,
      clientsLoading,
      feeTypesLoading,
    });
  }, [
    safeProjects,
    safeClients,
    safeFeeTypes,
    projectsLoading,
    clientsLoading,
    feeTypesLoading,
  ]);

  const form = useForm({
    defaultValues: {
      project: "",
      clientName: "",
      unit: "",
      feeType: "",
      amount: "",
      dueDate: "",
      description: "",
      status: "pending",
    },
  });

  const { control, watch } = form;
  const selectedProject = watch("project");

  const availableClients = useMemo(() => {
    if (!selectedProject) return [];
    // For now, return all clients since we don't have project-client relationships in the current data
    // In a real implementation, you might want to filter clients by project
    // This could be done by:
    // 1. Adding a projectId field to clients
    // 2. Creating a separate project-clients relationship table
    // 3. Filtering clients based on allocations or assignments
    return safeClients;
  }, [selectedProject, safeClients]);

  const filteredClients = useMemo(() => {
    if (!clientSearch) return availableClients;
    if (!Array.isArray(availableClients)) return [];
    return availableClients.filter((client) => {
      const clientName = `${client.firstName || ""} ${
        client.lastName || ""
      }`.trim();
      return clientName.toLowerCase().includes(clientSearch.toLowerCase());
    });
  }, [availableClients, clientSearch]);

  const onSubmit = (data: any) => {
    // Validate required fields
    if (
      !data.project ||
      !data.clientName ||
      !data.feeType ||
      !data.amount ||
      !data.dueDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate amount is a positive number
    const amount = parseFloat(data.amount.replace(/[₦,]/g, ""));
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Find the selected project and client for additional data
    const selectedProjectData = safeProjects.find(
      (p) => p.name === data.project
    );
    const selectedClientData = safeClients.find(
      (c) => (c._id || c.id) === data.clientName
    );
    const selectedFeeTypeData = safeFeeTypes.find(
      (ft) => ft.id === data.feeType
    );

    if (!selectedProjectData || !selectedClientData || !selectedFeeTypeData) {
      toast.error("Invalid selection. Please try again.");
      return;
    }

    // Prepare fee data for submission
    const feeData = {
      projectId: selectedProjectData._id || selectedProjectData.id,
      clientId: selectedClientData._id || selectedClientData.id,
      feeTypeId: selectedFeeTypeData.id,
      amount: amount,
      dueDate: data.dueDate,
      description:
        data.description ||
        `${selectedFeeTypeData.name} for ${selectedProjectData.name}`,
      unit: data.unit || undefined,
      status: data.status || "pending",
      currency: "NGN",
    };

    console.log("Recording new fee:", feeData);
    toast.success("Fee recorded successfully!");
    onClose();
    form.reset();
    setClientSearch("");
  };

  // Check if any data is still loading
  const isLoading = projectsLoading || clientsLoading || feeTypesLoading;

  // Check if we have data available
  const hasProjects = safeProjects.length > 0;
  const hasClients = safeClients.length > 0;
  const hasFeeTypes = safeFeeTypes.length > 0;

  // Show loading state if any data is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading fee collection data...</p>
        </div>
      </div>
    );
  }

  // Show error state if no data is available
  if (!hasProjects || !hasClients || !hasFeeTypes) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">
          <p className="font-medium">Unable to load required data</p>
          {!hasProjects && <p className="text-sm">No projects available</p>}
          {!hasClients && <p className="text-sm">No clients available</p>}
          {!hasFeeTypes && <p className="text-sm">No fee types available</p>}
        </div>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="project">Project *</Label>
          <Controller
            name="project"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value && value !== "no-projects") {
                    field.onChange(value);
                    form.setValue("clientName", ""); // Reset client when project changes
                    setClientSearch("");
                  }
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project first" />
                </SelectTrigger>
                <SelectContent>
                  {projectsLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Loading projects...</span>
                    </div>
                  ) : safeProjects.length > 0 ? (
                    safeProjects.map((project) => (
                      <SelectItem key={project.id} value={project.name}>
                        {project.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-projects" disabled>
                      No projects available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="clientSearch">Search & Select Client *</Label>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={
                  selectedProject ? "Search clients..." : "Select project first"
                }
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="pl-10"
                disabled={!selectedProject}
              />
            </div>
            <Controller
              name="clientName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    if (value && value !== "no-results") {
                      field.onChange(value);
                    }
                  }}
                  value={field.value}
                  disabled={!selectedProject}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedProject
                          ? "Select client"
                          : "Select project first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Loading clients...</span>
                      </div>
                    ) : filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <SelectItem
                          key={client._id || client.id}
                          value={client._id || client.id}
                        >
                          {`${client.firstName || ""} ${
                            client.lastName || ""
                          }`.trim()}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-results" disabled>
                        {clientSearch
                          ? "No clients found"
                          : "No clients available"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input
            {...form.register("unit")}
            placeholder="e.g., Block A - Plot 02"
          />
        </div>

        <div>
          <Label htmlFor="feeType">Fee Type *</Label>
          <Controller
            name="feeType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value && value !== "no-fee-types") {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      feeTypesLoading ? "Loading..." : "Select fee type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {feeTypesLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Loading fee types...</span>
                    </div>
                  ) : safeFeeTypes.length > 0 ? (
                    safeFeeTypes.map((feeType) => (
                      <SelectItem key={feeType.id} value={feeType.id}>
                        {feeType.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-fee-types" disabled>
                      No fee types available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount *</Label>
          <Input
            {...form.register("amount", { required: true })}
            placeholder="e.g., ₦5,000,000"
            type="text"
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            type="date"
            {...form.register("dueDate", { required: true })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description/Notes</Label>
        <Textarea
          {...form.register("description")}
          placeholder="Additional details about this fee..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Receipt className="h-4 w-4 mr-2" />
          Record Fee
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

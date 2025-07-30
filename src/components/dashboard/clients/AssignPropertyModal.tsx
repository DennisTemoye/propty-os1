import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, Check, User, Loader2, AlertCircle } from "lucide-react";
import { ProjectsService } from "@/services/projectsService";
import { AllocationService } from "@/services/allocationService";
import { toast } from "sonner";
import { Project, Block, Unit } from "@/types/project";
import { formatCurrency } from "@/utils/formatCurrency";

interface AssignPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onSuccess?: () => void;
}

export function AssignPropertyModal({
  isOpen,
  onClose,
  client,
  onSuccess,
}: AssignPropertyModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [assignmentType, setAssignmentType] = useState<"reserved" | "sold">(
    "reserved"
  );
  const [step, setStep] = useState<
    "project" | "block" | "unit" | "confirm" | "success"
  >("project");

  // API state
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects on modal open
  useEffect(() => {
    if (isOpen && projects.length === 0) {
      fetchProjects();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    setError(null);
    try {
      const response = await ProjectsService.getProjects();
      if (response.success && response.data) {
        // Handle both array and paginated response
        const projectsData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setProjects(projectsData);
        console.log(projectsData);
      } else {
        setError("Failed to fetch projects");
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
      toast.error("Failed to fetch projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchAvailableUnits = async (projectId: string, blockId: string) => {
    setLoadingUnits(true);
    setError(null);
    try {
      // Get the selected block to access its units
      const block = selectedProject?.blocks?.find(
        (b: Block) => b._id === blockId
      );
      if (block && block.units) {
        // Filter for available units in the selected block
        const availableBlockUnits = block.units.filter(
          (unit: Unit) => unit.status === "available"
        );
        setAvailableUnits(availableBlockUnits);
      } else {
        // Fallback: try to fetch units from API if not available in block
        const response = await ProjectsService.getProjectUnits(projectId);
        if (response.success && response.data) {
          const blockUnits = response.data.filter(
            (unit: Unit) =>
              unit.status === "available" && unit.projectId === projectId
          );
          setAvailableUnits(blockUnits);
        } else {
          setError("Failed to fetch available units");
          toast.error("Failed to fetch available units");
        }
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      setError("Failed to fetch available units");
      toast.error("Failed to fetch available units");
    } finally {
      setLoadingUnits(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project || null);
    setSelectedBlock(null);
    setSelectedUnit(null);
    setStep("block");
  };

  const handleBlockSelect = (blockId: string) => {
    const block = selectedProject?.blocks?.find(
      (b: Block) => b._id === blockId
    );
    setSelectedBlock(block || null);
    setSelectedUnit(null);
    setStep("unit");

    // Fetch available units for this block
    if (selectedProject?._id && blockId) {
      fetchAvailableUnits(selectedProject._id, blockId);
    }
  };

  const handleUnitSelect = (unit: any) => {
    setSelectedUnit(unit);
    setStep("confirm");
  };

  const handleConfirmAssignment = async () => {
    if (!selectedProject || !selectedBlock || !selectedUnit || !client) {
      toast.error("Missing required information for assignment");
      return;
    }

    setLoading(true);
    try {
      const allocationData = {
        clientId: client._id,
        projectId: selectedProject._id,
        blockId: selectedBlock._id,
        unitId: selectedUnit.id,
        plotId:
          selectedProject.terminologyType === "plots"
            ? selectedUnit.plotId
            : selectedUnit.unitNumber || selectedUnit.plotId,
        assignmentType: assignmentType,
        status: assignmentType === "reserved" ? "Reserved" : "Allocated",
        assignedDate: new Date().toISOString(),
        price: selectedUnit.price,
        size: selectedUnit.size,
      };

      const response = await AllocationService.createAllocation(allocationData);

      if (response.success) {
        toast.success("Property assigned successfully!");
        setStep("success");

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }

        setTimeout(() => {
          onClose();
          resetModal();
        }, 2000);
      } else {
        toast.error(response.message || "Failed to assign property");
      }
    } catch (error) {
      console.error("Error assigning property:", error);
      toast.error("Failed to assign property");
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setSelectedProject(null);
    setSelectedBlock(null);
    setSelectedUnit(null);
    setAssignmentType("reserved");
    setStep("project");
    setAvailableUnits([]);
    setError(null);
    setLoading(false);
    setLoadingProjects(false);
    setLoadingUnits(false);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Property to {client.name}</DialogTitle>
          <DialogDescription>
            Select a project, block, and available unit to assign to this client
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mb-6">
          {["project", "block", "unit", "confirm"].map((currentStep, index) => (
            <React.Fragment key={currentStep}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep
                    ? "bg-purple-600 text-white"
                    : ["project", "block", "unit", "confirm"].indexOf(step) >
                      index
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {["project", "block", "unit", "confirm"].indexOf(step) >
                index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 3 && <div className="flex-1 h-0.5 bg-gray-200"></div>}
            </React.Fragment>
          ))}
        </div>

        {step === "project" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Project</h3>
            {loadingProjects ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-gray-600">Loading projects...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-600">
                <AlertCircle className="h-8 w-8 mr-2" />
                <span>{error}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card
                    key={project._id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleProjectSelect(project._id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{project.projectName}</h4>
                          <p className="text-sm text-gray-600">
                            {project.location}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {project.blocks?.length || 0} blocks,{" "}
                            {project.availableUnits || 0} available{" "}
                            {project.terminologyType === "plots"
                              ? "plots"
                              : "units"}
                          </p>
                        </div>
                        <Building className="h-6 w-6 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {step === "block" && selectedProject && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Select Block in {selectedProject.name}
              </h3>
              <Button variant="outline" onClick={() => setStep("project")}>
                Back to Projects
              </Button>
            </div>
            {selectedProject.blocks && selectedProject.blocks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.blocks.map((block: Block) => (
                  <Card
                    key={block._id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleBlockSelect(block._id || "")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{block.name}</h4>
                          <p className="text-sm text-gray-600">{block.type}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {block.availableUnits || 0} available{" "}
                            {selectedProject?.terminologyType === "plots"
                              ? "plots"
                              : "units"}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {block.availableUnits || 0}{" "}
                          {selectedProject?.terminologyType === "plots"
                            ? "plots"
                            : "units"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No blocks available for this project</p>
              </div>
            )}
          </div>
        )}

        {step === "unit" && selectedBlock && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Select{" "}
                {selectedProject?.terminologyType === "plots" ? "Plot" : "Unit"}{" "}
                in {selectedBlock.name}
              </h3>
              <Button variant="outline" onClick={() => setStep("block")}>
                Back to Blocks
              </Button>
            </div>
            {loadingUnits ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-gray-600">
                  Loading available units...
                </span>
              </div>
            ) : availableUnits.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {selectedProject?.terminologyType === "plots"
                            ? "Plot ID"
                            : "Unit ID"}
                        </TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableUnits.map((unit: Unit) => (
                        <TableRow
                          key={unit.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleUnitSelect(unit)}
                        >
                          <TableCell className="font-medium">
                            {selectedProject?.terminologyType === "plots"
                              ? unit.plotId
                              : unit.unitNumber || unit.plotId}
                          </TableCell>
                          <TableCell>{unit.size}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(Number(unit.price))}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  No available{" "}
                  {selectedProject?.terminologyType === "plots"
                    ? "plots"
                    : "units"}{" "}
                  in this block
                </p>
              </div>
            )}
          </div>
        )}

        {step === "confirm" && selectedUnit && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Confirm Assignment</h3>
              <Button variant="outline" onClick={() => setStep("unit")}>
                Back to Units
              </Button>
            </div>

            {/* Assignment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Client Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {`${client.firstName || ""} ${
                        client.lastName || ""
                      }`.trim()}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {client.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {client.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Property Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Project:</span>{" "}
                      {selectedProject?.name}
                    </div>
                    <div>
                      <span className="font-medium">Block:</span>{" "}
                      {selectedBlock?.name}
                    </div>
                    <div>
                      <span className="font-medium">
                        {selectedProject?.terminologyType === "plots"
                          ? "Plot"
                          : "Unit"}
                        :
                      </span>{" "}
                      {selectedProject?.terminologyType === "plots"
                        ? selectedUnit?.plotId
                        : selectedUnit?.unitNumber || selectedUnit?.plotId}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span>{" "}
                      {selectedUnit?.size}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span>{" "}
                      {selectedUnit?.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Type</label>
              <Select
                value={assignmentType}
                onValueChange={(value: "reserved" | "sold") =>
                  setAssignmentType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserved">
                    Reserved (Pending Payment)
                  </SelectItem>
                  <SelectItem value="sold">Sold (Payment Completed)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleConfirmAssignment}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  "Confirm Assignment"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-900 mb-2">
              Property Assigned Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedProject?.terminologyType === "plots"
                ? selectedUnit?.plotId
                : selectedUnit?.unitNumber || selectedUnit?.plotId}{" "}
              has been assigned to{" "}
              {`${client?.firstName || ""} ${client?.lastName || ""}`.trim()}.
            </p>
            <p className="text-sm text-gray-500">
              Assignment documents are being generated and will be available in
              the client's profile.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

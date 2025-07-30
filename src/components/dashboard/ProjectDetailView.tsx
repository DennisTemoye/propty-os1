import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectsService } from "@/services/projectsService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Edit,
  MapPin,
  User,
  UserPlus,
  Trash2,
  Building,
  Clock,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Home,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Eye,
  Settings,
  Share2,
} from "lucide-react";
import { ProjectOverviewContent } from "@/components/dashboard/projects/ProjectOverviewContent";
import { ProjectBlocksTab } from "@/components/dashboard/projects/ProjectBlocksTab";
import { ProjectDocumentsTab } from "@/components/dashboard/projects/ProjectDocumentsTab";
import { ProjectSalesHistoryTab } from "@/components/dashboard/projects/ProjectSalesHistoryTab";
import { RevokeAllocationModal } from "@/components/dashboard/forms/RevokeAllocationModal";
import { AllocateUnitModal } from "@/components/dashboard/sales-allocation/AllocateUnitModal";
import { ReallocationModal } from "@/components/dashboard/forms/ReallocationModal";
import { getProjectImage, handleImageError } from "@/lib/utils";
import { useProjectTerminology } from "@/hooks/useProjectTerminology";
import { Project } from "@/types/project";
import { toast } from "sonner";

export function ProjectDetailView({ project }: { project: any }) {
  const params = useParams();
  const navigate = useNavigate();

  const projectData = project?.data || project;
  console.log({ projectData });
  const projectId = params.projectId || params.id;

  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [isReallocateOpen, setIsReallocateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);
  const [reallocateData, setReallocateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch project data from API
  useEffect(() => {
    if (project) {
      console.log({ project });
      setLoading(false);
    }
  }, [project]);

  const { labels } = useProjectTerminology(project);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Building className="h-16 w-16 text-muted-foreground animate-pulse" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Loading Project...
          </h2>
          <p className="text-muted-foreground">
            Please wait while we fetch the project details.
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Building className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Project Not Found
          </h2>
          <p className="text-muted-foreground">
            The requested project could not be found.
          </p>
        </div>
        <Button onClick={() => navigate("/company/projects")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  // Calculate derived values with fallbacks
  const totalPlots = projectData.totalPlots || 0;
  const totalUnits = projectData.totalUnits || totalPlots;
  const availableUnits =
    projectData.availableUnits || projectData.availablePlots || 0;
  const allocatedUnits =
    projectData.allocatedUnits || projectData.noOfAllocations || 0;
  const reservedUnits = projectData.reservedUnits || 0;
  const soldUnits = projectData.soldUnits || 0;
  const totalClients = projectData.totalClients || allocatedUnits;
  const allocationRate =
    projectData.allocationRate ||
    (totalUnits > 0 ? Math.round((allocatedUnits / totalUnits) * 100) : 0);
  const revenue = projectData.revenue || projectData.totalRevenue || 0;
  const pendingAllocations = projectData.pendingAllocations || 0;
  const blocks = projectData.blocks || [];
  const developmentStage =
    projectData.developmentStage ||
    (projectData as any).projectStatus ||
    "Planning";
  const projectStatus =
    projectData.status || (projectData as any).projectStatus || "Planning";

  console.log("blocks", blocks);
  const getStatusVariant = (status: string) => {
    if (!status) return "outline";

    switch (status.toLowerCase()) {
      case "ongoing":
      case "selling":
      case "presale":
        return "default";
      case "completed":
      case "sold out":
        return "secondary";
      case "upcoming":
      case "planning":
      case "documentation":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStageColor = (stage: string) => {
    if (!stage) return "bg-gray-50 text-gray-700 border-gray-200";

    switch (stage) {
      case "Construction":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Marketing":
      case "Selling":
        return "bg-green-50 text-green-700 border-green-200";
      case "Pre-Launch":
      case "Presale":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Planning":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Handover":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Documentation":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleAllocateUnit = () => setIsAllocateUnitOpen(true);

  const handleEditProject = () => {
    navigate(`/company/projects/${projectData._id}/edit`);
  };

  const handleViewBlocks = () => {
    navigate(`/company/projects/${projectData._id}/blocks`);
  };

  const handleViewReports = () => {
    navigate("/company/reports", {
      state: { projectId: projectData._id, projectName: projectData.name },
    });
  };

  const handleViewSalesAllocation = () => {
    navigate("/company/sales", {
      state: { projectId: projectData._id, projectName: projectData.name },
    });
  };

  const handleReallocate = (unitId: string, clientName: string) => {
    setReallocateData({ unitId, clientName });
    setIsReallocateOpen(true);
  };

  const handleRevoke = (allocation: any) => {
    setSelectedAllocation(allocation);
    setIsRevokeOpen(true);
  };

  const handleDeleteProject = () => {
    toast.success(
      `Project "${projectData.name}" has been deleted successfully.`
    );
    navigate("/company/projects");
  };

  const handlePendingAllocations = () => {
    navigate("/company/sales?tab=pending", {
      state: { projectId: projectData._id },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/company/projects")}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground truncate">
              {projectData.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground text-sm truncate">
                {projectData.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleAllocateUnit}
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {labels.allocateUnit}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleEditProject}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewBlocks}>
                <Building className="h-4 w-4 mr-2" />
                Manage Blocks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewReports}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewSalesAllocation}>
                <Users className="h-4 w-4 mr-2" />
                Sales & Allocation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Project</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{projectData.name}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteProject}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete Project
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Hero Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-64 lg:h-80">
          <img
            src={
              projectData.image ||
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop"
            }
            alt={projectData.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Overlays */}
          <div className="absolute top-4 left-4">
            <Badge
              variant={getStatusVariant(projectStatus)}
              className="bg-background/90 backdrop-blur-sm"
            >
              {projectStatus
                ? projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1)
                : "Unknown"}
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Badge
              className={`${getStageColor(
                developmentStage
              )} backdrop-blur-sm border`}
            >
              {developmentStage}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">
                  {blocks.length}
                </div>
                <div className="text-sm text-white/80">Blocks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">
                  {totalUnits}
                </div>
                <div className="text-sm text-white/80">{labels.totalUnits}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">
                  {totalClients}
                </div>
                <div className="text-sm text-white/80">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">
                  {allocationRate}%
                </div>
                <div className="text-sm text-white/80">Allocation Rate</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Home className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {availableUnits}
            </div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {allocatedUnits}
            </div>
            <div className="text-sm text-muted-foreground">Allocated</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {reservedUnits}
            </div>
            <div className="text-sm text-muted-foreground">Reserved</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {totalClients}
            </div>
            <div className="text-sm text-muted-foreground">Total Clients</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-lg lg:text-xl font-bold text-emerald-600">
              ₦{revenue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Allocations Alert */}
      {pendingAllocations > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    {pendingAllocations} Pending Allocations
                  </h3>
                  <p className="text-sm text-orange-700">
                    Requires your attention for approval
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handlePendingAllocations}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs Section */}
      <Card>
        <Tabs defaultValue="overview" className="w-full">
          <CardHeader className="pb-3">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="text-xs lg:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="blocks" className="text-xs lg:text-sm">
                Blocks
              </TabsTrigger>
              <TabsTrigger value="sales" className="text-xs lg:text-sm">
                Sales
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs lg:text-sm">
                Documents
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent value="overview" className="p-6 pt-0">
            <ProjectOverviewContent project={projectData} />
          </TabsContent>

          <TabsContent value="blocks" className="p-6 pt-0">
            <ProjectBlocksTab project={projectData} />
          </TabsContent>

          <TabsContent value="sales" className="p-6 pt-0">
            <ProjectSalesHistoryTab
              project={projectData}
              onReallocate={handleReallocate}
              onRevoke={handleRevoke}
            />
          </TabsContent>

          <TabsContent value="documents" className="p-6 pt-0">
            <ProjectDocumentsTab project={projectData} />
          </TabsContent>

          <TabsContent value="analytics" className="p-6 pt-0">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Detailed analytics and reporting for this project
              </p>
              <Button onClick={handleViewReports}>View Full Reports</Button>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-6 pt-0">
            <div className="text-center py-12">
              <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project Settings</h3>
              <p className="text-muted-foreground mb-4">
                Manage project configuration and preferences
              </p>
              <Button onClick={handleEditProject}>Edit Project Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Modals */}
      <AllocateUnitModal
        isOpen={isAllocateUnitOpen}
        onClose={() => setIsAllocateUnitOpen(false)}
        onSubmit={() => {
          toast.success("Plot allocated successfully!");
          setIsAllocateUnitOpen(false);
        }}
      />

      {reallocateData && (
        <ReallocationModal
          isOpen={isReallocateOpen}
          onClose={() => {
            setIsReallocateOpen(false);
            setReallocateData(null);
          }}
          allocation={reallocateData}
          onReallocate={() => {
            toast.success("Plot reallocated successfully!");
            setIsReallocateOpen(false);
            setReallocateData(null);
          }}
        />
      )}

      {selectedAllocation && (
        <RevokeAllocationModal
          isOpen={isRevokeOpen}
          onClose={() => {
            setIsRevokeOpen(false);
            setSelectedAllocation(null);
          }}
          allocation={selectedAllocation}
          onRevoke={() => {
            toast.success("Allocation revoked successfully!");
            setIsRevokeOpen(false);
            setSelectedAllocation(null);
          }}
        />
      )}
    </div>
  );
}

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
  Plus,
  MapPin,
  Building,
  Home,
  DollarSign,
  Search,
  Eye,
  Handshake,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjectImage, handleImageError } from "@/lib/utils";
import { ProjectsService } from "@/services/projectsService";
import { Project } from "@/types/project";

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const navigate = useNavigate();

  const getDevelopmentStageColor = (stage: string) => {
    switch (stage) {
      case "Planning":
        return "bg-gray-100 text-gray-800";
      case "Pre-Launch":
        return "bg-blue-100 text-blue-800";
      case "Marketing":
        return "bg-orange-100 text-orange-800";
      case "Construction":
        return "bg-yellow-100 text-yellow-800";
      case "Handover":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await ProjectsService.getProjects();
        setProjects(properties.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProperties();
  }, []);

  console.log(projects);

  const filteredProjects = projects.filter((project: any) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.primaryStructureType &&
        project.primaryStructureType
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesStage =
      stageFilter === "all" || project.status === stageFilter;

    return matchesSearch && matchesStage;
  });

  const handleProjectClick = (projectId: string) => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleViewDetails = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    navigate(`/company/projects/${projectId}`);
  };

  const handleNewProject = () => {
    navigate("/company/projects/new");
  };

  const developmentStages = [
    "Planning",
    "Pre-Launch",
    "Marketing",
    "Construction",
    "Handover",
    "Completed",
  ];

  // Calculate totals for KPI cards from actual projects data
  const totalProjects = projects.length;
  const totalUnits = projects.reduce((sum, project) => {
    const projectUnits =
      project.blocks?.reduce((blockSum, block) => {
        return blockSum + (block.totalUnits || 0) + (block.totalPlots || 0);
      }, 0) || 0;
    return sum + projectUnits;
  }, 0);

  const totalAllocations = projects.reduce((sum, project) => {
    return sum + (project.noOfAllocations || 0);
  }, 0);

  const totalPendingAllocations = projects.reduce((sum, project) => {
    return sum + (project.pendingAllocations || 0);
  }, 0);

  const kpiData = [
    {
      title: "Total Projects",
      value: totalProjects.toString(),
      subtitle: "All registered",
      icon: Building,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      cardBg: "from-purple-50 to-purple-100",
    },
    {
      title: "Total Plots",
      value: totalUnits.toLocaleString(),
      subtitle: "Across all projects",
      icon: Home,
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
      cardBg: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Total Allocations",
      value: totalAllocations.toLocaleString(),
      subtitle: "Successfully allocated",
      icon: Handshake,
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      cardBg: "from-blue-50 to-blue-100",
    },
    {
      title: "Pending Approvals",
      value: totalPendingAllocations.toString(),
      subtitle: "Awaiting approval",
      icon: AlertTriangle,
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      cardBg: "from-amber-50 to-amber-100",
    },
  ];

  // Helper function to get project statistics
  const getProjectStats = (project: Project) => {
    const totalPlots =
      project.blocks?.reduce((sum, block) => {
        return sum + (block.totalPlots || 0) + (block.totalUnits || 0);
      }, 0) || 0;

    const allocatedPlots = project.noOfAllocations || 0;
    const pendingAllocations = project.pendingAllocations || 0;
    const availableUnits = project.availableUnits || 0;

    return {
      totalPlots,
      allocatedPlots,
      pendingAllocations,
      availableUnits,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative px-6 py-12">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                    <Building className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Project Portfolio
                    </h1>
                    <p className="text-muted-foreground text-lg mt-2">
                      Orchestrate your real estate empire with precision and
                      insight
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl px-8"
                onClick={handleNewProject}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-8 space-y-8">
        {/* Enhanced KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-muted/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {kpi.title}
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      {kpi.value}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      {kpi.subtitle}
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-2xl ${kpi.bgColor} shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
                  >
                    <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="border-border/40 shadow-xl bg-gradient-to-r from-card via-card to-muted/10">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                <div className="relative flex-1 lg:w-96">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, locations, stages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-border/60 bg-background/60 backdrop-blur-sm focus:bg-background transition-colors"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="h-12 rounded-xl border-border/60 bg-background/60 backdrop-blur-sm">
                      <SelectValue placeholder="Development stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      {developmentStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-xl">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid" ? "shadow-sm" : "hover:bg-background/60"
                  }
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={
                    viewMode === "table"
                      ? "shadow-sm"
                      : "hover:bg-background/60"
                  }
                >
                  List View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project, index: number) => {
              const stats = getProjectStats(project);
              return (
                <Card
                  key={project._id}
                  className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-muted/5 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl transform hover:-translate-y-3 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project._id)}
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Project Image with Modern Overlay */}
                  <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                    <img
                      src={getProjectImage(project)}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Modern Stage Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-lg px-3 py-1 rounded-full font-medium">
                        {project.status || "Planning"}
                      </Badge>
                    </div>

                    {/* Enhanced Pending Indicator */}
                    {stats.pendingAllocations > 0 && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg flex items-center gap-1.5 px-3 py-1 rounded-full animate-pulse">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">
                            {stats.pendingAllocations} Pending
                          </span>
                        </Badge>
                      </div>
                    )}

                    {/* Project Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="relative p-6 space-y-6">
                    {/* Project Stats with Progress Indicators */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
                        <div className="text-2xl font-bold text-foreground">
                          {stats.totalPlots}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          Total{" "}
                          {project.terminologyType === "plots"
                            ? "Plots"
                            : "Units"}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                        <div className="text-2xl font-bold text-foreground">
                          {stats.allocatedPlots}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          Allocated
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                        <div className="text-2xl font-bold text-foreground">
                          {stats.pendingAllocations}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          Pending
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/10">
                        <div className="text-2xl font-bold text-foreground">
                          {stats.availableUnits}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          Available
                        </div>
                      </div>
                    </div>

                    {/* Revenue and Activity */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Total Revenue
                        </div>
                        <div className="text-xl font-bold text-emerald-600">
                          ₦{(project.totalRevenue || 0).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Last Activity
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {project.updatedAt
                            ? new Date(project.updatedAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Allocation Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const stats = getProjectStats(project);
                    return (
                      <TableRow
                        key={project._id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleProjectClick(project._id)}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500">
                              {project.category}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getDevelopmentStageColor(
                              project.status || "Planning"
                            )}
                          >
                            {project.status || "Planning"}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Total:</span>
                              <span className="font-medium">
                                {stats.totalPlots}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 space-y-0.5">
                              <div>Allocated: {stats.allocatedPlots}</div>
                              <div>Pending: {stats.pendingAllocations}</div>
                              <div>Available: {stats.availableUnits}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₦{(project.totalRevenue || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {project.updatedAt
                            ? new Date(project.updatedAt).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleViewDetails(e, project._id)}
                            className="h-8 px-3"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

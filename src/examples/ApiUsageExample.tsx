import React, { useState, useEffect } from "react";
import { AuthService, LoginCredentials } from "@/services/authService";
import {
  ProjectsService,
  Project,
  CreateProjectData,
} from "@/services/projectsService";
import {
  ClientsService,
  Client,
  CreateClientData,
} from "@/services/clientsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Example component showing how to use the API services
export const ApiUsageExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [newProject, setNewProject] = useState<CreateProjectData>({
    name: "",
    description: "",
    location: "",
    type: "residential",
    totalUnits: 0,
    priceRange: { min: 0, max: 0 },
  });

  // Example: Login functionality
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await AuthService.login(loginForm);

      if (response.success) {
        toast.success("Login successful!");
        // Redirect or update app state
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Fetch projects
  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      const response = await ProjectsService.getProjects({
        status: "active",
        limit: 10,
      });

      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while fetching projects");
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Create new project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await ProjectsService.createProject(newProject);

      if (response.success && response.data) {
        toast.success("Project created successfully!");
        setProjects((prev) => [...prev, response.data!]);
        // Reset form
        setNewProject({
          name: "",
          description: "",
          location: "",
          type: "residential",
          totalUnits: 0,
          priceRange: { min: 0, max: 0 },
        });
      } else {
        toast.error(response.message || "Failed to create project");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while creating project");
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Fetch clients
  const fetchClients = async () => {
    setIsLoading(true);

    try {
      const response = await ClientsService.getClients({
        status: "active",
        limit: 10,
      });

      if (response.success && response.data) {
        setClients(response.data);
      } else {
        toast.error("Failed to fetch clients");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while fetching clients");
    } finally {
      setIsLoading(false);
    }
  };

  // Example: Upload file
  const handleFileUpload = async (file: File, projectId: string) => {
    try {
      const response = await ProjectsService.uploadProjectDocument(
        projectId,
        file,
        (progress) => {
          console.log(`Upload progress: ${progress}%`);
        }
      );

      if (response.success) {
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while uploading file");
    }
  };

  // Example: Export data
  const handleExportProjects = async () => {
    try {
      await ProjectsService.exportProject("project-id", "excel");
      toast.success("Export completed!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while exporting");
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">API Usage Examples</h1>

      {/* Login Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Example</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Create Project Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Create Project Example</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <Input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Input
                placeholder="Location"
                value={newProject.location}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Total Units"
                value={newProject.totalUnits}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    totalUnits: parseInt(e.target.value),
                  }))
                }
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Projects List Example */}
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
                <p className="text-sm">
                  Units: {project.availableUnits}/{project.totalUnits}
                </p>
                <div className="mt-2 space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleFileUpload(new File([""], "test.pdf"), project.id)
                    }
                  >
                    Upload Document
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => ProjectsService.getProject(project.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={fetchProjects} disabled={isLoading} className="mt-4">
            {isLoading ? "Loading..." : "Refresh Projects"}
          </Button>
        </CardContent>
      </Card>

      {/* Clients List Example */}
      <Card>
        <CardHeader>
          <CardTitle>Clients List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {clients.map((client) => (
              <div key={client.id} className="p-4 border rounded">
                <h3 className="font-semibold">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-sm text-gray-600">{client.email}</p>
                <p className="text-sm">{client.phone}</p>
                <div className="mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => ClientsService.getClient(client.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={fetchClients} disabled={isLoading} className="mt-4">
            {isLoading ? "Loading..." : "Refresh Clients"}
          </Button>
        </CardContent>
      </Card>

      {/* Export Example */}
      <Card>
        <CardHeader>
          <CardTitle>Export Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-x-2">
            <Button onClick={handleExportProjects}>
              Export Projects (Excel)
            </Button>
            <Button
              variant="outline"
              onClick={() => ClientsService.exportClients("pdf")}
            >
              Export Clients (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiUsageExample;

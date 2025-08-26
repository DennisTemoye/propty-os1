import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AuthService,
  LoginCredentials,
  RegisterData,
} from "@/services/authService";

import {
  ClientsService,
  Client,
  CreateClientData,
  UpdateClientData,
} from "@/services/clientsService";
import { ProjectsService } from "@/services/projectsService";
import { CreateProjectData, UpdateProjectData } from "@/types/project";

// Query keys for React Query
export const queryKeys = {
  auth: {
    profile: ["auth", "profile"],
  },
  projects: {
    all: ["projects"],
    lists: () => [...queryKeys.projects.all, "list"],
    list: (filters: any) => [...queryKeys.projects.lists(), filters],
    details: () => [...queryKeys.projects.all, "detail"],
    detail: (id: string) => [...queryKeys.projects.details(), id],
    units: (projectId: string) => [
      ...queryKeys.projects.detail(projectId),
      "units",
    ],
    blocks: (projectId: string) => [
      ...queryKeys.projects.detail(projectId),
      "blocks",
    ],
    documents: (projectId: string) => [
      ...queryKeys.projects.detail(projectId),
      "documents",
    ],
  },
  clients: {
    all: ["clients"],
    lists: () => [...queryKeys.clients.all, "list"],
    list: (filters: any) => [...queryKeys.clients.lists(), filters],
    details: () => [...queryKeys.clients.all, "detail"],
    detail: (id: string) => [...queryKeys.clients.details(), id],
    payments: (clientId: string) => [
      ...queryKeys.clients.detail(clientId),
      "payments",
    ],
    allocations: (clientId: string) => [
      ...queryKeys.clients.detail(clientId),
      "allocations",
    ],
    documents: (clientId: string) => [
      ...queryKeys.clients.detail(clientId),
      "documents",
    ],
  },
};

// Authentication hooks
export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      AuthService.login(credentials),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Login successful!");
        // Invalidate and refetch user profile
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
      } else {
        toast.error(response.message || "Login failed");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred during login");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => AuthService.register(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Registration successful!");
      } else {
        toast.error(response.message || "Registration failed");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred during registration");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      toast.success("Logged out successfully");
      // Clear all queries from cache
      queryClient.clear();
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred during logout");
      // Still clear cache even if server call fails
      queryClient.clear();
    },
  });

  const profileQuery = useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => AuthService.getProfile(),
    enabled: AuthService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    profile: profileQuery.data?.data,
    isProfileLoading: profileQuery.isLoading,
    isProfileError: profileQuery.isError,
    refetchProfile: profileQuery.refetch,
  };
};

// Projects hooks
export const useProjects = (filters?: any) => {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: queryKeys.projects.list(filters),
    queryFn: () => ProjectsService.getProjects(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: CreateProjectData) =>
      ProjectsService.createProject(data),
    onSuccess: (response) => {
      console.log("response>>>>>>", response);
      if (response.success) {
        toast.success("Project created successfully!");
        // Invalidate projects list
        queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() });
      } else {
        toast.error(response.message || "Failed to create project");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while creating project");
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectData }) =>
      ProjectsService.updateProject(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success("Project updated successfully!");
        // Invalidate specific project and projects list
        queryClient.invalidateQueries({
          queryKey: queryKeys.projects.detail(variables.id),
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() });
      } else {
        toast.error(response.message || "Failed to update project");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while updating project");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => ProjectsService.deleteProject(id),
    onSuccess: (response, id) => {
      if (response.success) {
        toast.success("Project deleted successfully!");
        // Remove from cache and invalidate lists
        queryClient.removeQueries({ queryKey: queryKeys.projects.detail(id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.projects.lists() });
      } else {
        toast.error(response.message || "Failed to delete project");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while deleting project");
    },
  });

  return {
    projects: projectsQuery.data?.data || [],
    meta: projectsQuery.data?.meta,
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    refetch: projectsQuery.refetch,
    createProject: createProjectMutation.mutate,
    createProjectAsync: createProjectMutation.mutateAsync,
    isCreating: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    updateProjectAsync: updateProjectMutation.mutateAsync,
    isUpdating: updateProjectMutation.isPending,
    deleteProject: deleteProjectMutation.mutate,
    deleteProjectAsync: deleteProjectMutation.mutateAsync,
    isDeleting: deleteProjectMutation.isPending,
  };
};

export const useProject = (id: string) => {
  const queryClient = useQueryClient();

  const projectQuery = useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => ProjectsService.getProject(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const projectUnitsQuery = useQuery({
    queryKey: queryKeys.projects.units(id),
    queryFn: () => ProjectsService.getProjectUnits(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const projectBlocksQuery = useQuery({
    queryKey: queryKeys.projects.blocks(id),
    queryFn: () => ProjectsService.getProjectBlocks(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const projectDocumentsQuery = useQuery({
    queryKey: queryKeys.projects.documents(id),
    queryFn: () => ProjectsService.getProjectDocuments(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => ProjectsService.uploadProjectDocument(id, file, onProgress),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Document uploaded successfully!");
        // Invalidate project documents
        queryClient.invalidateQueries({
          queryKey: queryKeys.projects.documents(id),
        });
      } else {
        toast.error(response.message || "Failed to upload document");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message || "An error occurred while uploading document"
      );
    },
  });

  return {
    project: projectQuery.data?.data,
    units: projectUnitsQuery.data?.data || [],
    blocks: projectBlocksQuery.data?.data || [],
    documents: projectDocumentsQuery.data?.data || [],
    isLoading:
      projectQuery.isLoading ||
      projectUnitsQuery.isLoading ||
      projectBlocksQuery.isLoading ||
      projectDocumentsQuery.isLoading,
    isError:
      projectQuery.isError ||
      projectUnitsQuery.isError ||
      projectBlocksQuery.isError ||
      projectDocumentsQuery.isError,
    error:
      projectQuery.error ||
      projectUnitsQuery.error ||
      projectBlocksQuery.error ||
      projectDocumentsQuery.error,
    refetch: () => {
      projectQuery.refetch();
      projectUnitsQuery.refetch();
      projectBlocksQuery.refetch();
      projectDocumentsQuery.refetch();
    },
    uploadDocument: uploadDocumentMutation.mutate,
    uploadDocumentAsync: uploadDocumentMutation.mutateAsync,
    isUploading: uploadDocumentMutation.isPending,
  };
};

// Clients hooks
export const useClients = (filters?: any) => {
  const queryClient = useQueryClient();

  const clientsQuery = useQuery({
    queryKey: queryKeys.clients.list(filters),
    queryFn: () => ClientsService.getClients(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const createClientMutation = useMutation({
    mutationFn: (data: CreateClientData) => ClientsService.createClient(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Client created successfully!");
        // Invalidate clients list
        queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
      } else {
        toast.error(response.message || "Failed to create client");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while creating client");
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientData }) =>
      ClientsService.updateClient(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        toast.success("Client updated successfully!");
        // Invalidate specific client and clients list
        queryClient.invalidateQueries({
          queryKey: queryKeys.clients.detail(variables.id),
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
      } else {
        toast.error(response.message || "Failed to update client");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while updating client");
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: (id: string) => ClientsService.deleteClient(id),
    onSuccess: (response, id) => {
      if (response.success) {
        toast.success("Client deleted successfully!");
        // Remove from cache and invalidate lists
        queryClient.removeQueries({ queryKey: queryKeys.clients.detail(id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
      } else {
        toast.error(response.message || "Failed to delete client");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while deleting client");
    },
  });

  return {
    clients: clientsQuery.data?.data || [],
    meta: clientsQuery.data?.meta,
    isLoading: clientsQuery.isLoading,
    isError: clientsQuery.isError,
    error: clientsQuery.error,
    refetch: clientsQuery.refetch,
    createClient: createClientMutation.mutate,
    createClientAsync: createClientMutation.mutateAsync,
    isCreating: createClientMutation.isPending,
    updateClient: updateClientMutation.mutate,
    updateClientAsync: updateClientMutation.mutateAsync,
    isUpdating: updateClientMutation.isPending,
    deleteClient: deleteClientMutation.mutate,
    deleteClientAsync: deleteClientMutation.mutateAsync,
    isDeleting: deleteClientMutation.isPending,
  };
};

export const useClient = (id: string) => {
  const queryClient = useQueryClient();

  const clientQuery = useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => ClientsService.getClient(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const clientPaymentsQuery = useQuery({
    queryKey: queryKeys.clients.payments(id),
    queryFn: () => ClientsService.getClientPayments(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const clientAllocationsQuery = useQuery({
    queryKey: queryKeys.clients.allocations(id),
    queryFn: () => ClientsService.getClientAllocations(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const clientDocumentsQuery = useQuery({
    queryKey: queryKeys.clients.documents(id),
    queryFn: () => ClientsService.getClientDocuments(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    client: clientQuery.data?.data,
    payments: clientPaymentsQuery.data?.data || [],
    allocations: clientAllocationsQuery.data?.data || [],
    documents: clientDocumentsQuery.data?.data || [],
    isLoading:
      clientQuery.isLoading ||
      clientPaymentsQuery.isLoading ||
      clientAllocationsQuery.isLoading ||
      clientDocumentsQuery.isLoading,
    isError:
      clientQuery.isError ||
      clientPaymentsQuery.isError ||
      clientAllocationsQuery.isError ||
      clientDocumentsQuery.isError,
    error:
      clientQuery.error ||
      clientPaymentsQuery.error ||
      clientAllocationsQuery.error ||
      clientDocumentsQuery.error,
    refetch: () => {
      clientQuery.refetch();
      clientPaymentsQuery.refetch();
      clientAllocationsQuery.refetch();
      clientDocumentsQuery.refetch();
    },
  };
};

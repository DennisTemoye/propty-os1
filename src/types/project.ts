// Project Status Types
export type ProjectStatus =
  | "Acquisition"
  | "Documentation"
  | "Planning"
  | "Construction"
  | "Presale"
  | "Selling"
  | "Pause Sales"
  | "Sold Out";

// Legacy status types for backward compatibility
export type LegacyProjectStatus =
  | "active"
  | "inactive"
  | "completed"
  | "on-hold";

// API-compatible status types (for blocks)
export type APIBlockStatus =
  | "planning"
  | "construction"
  | "on-hold"
  | "completed";

export type ProjectCategory = "Land" | "Housing" | "Mixed";
export type TerminologyType = "plots" | "units";
export type BlockType =
  | "duplex"
  | "bungalow"
  | "apartment"
  | "commercial"
  | "land"
  | "utility";
export type BlockStatus = "planning" | "construction" | "completed" | "on-hold";
export type UnitStatus = "available" | "reserved" | "allocated" | "sold";

// Document Interface
export interface ProjectDocument {
  id: number;
  name: string;
  category: string;
  size: string;
  uploadDate: string;
  url?: string;
  type?: string;
  _id?: string; // MongoDB ID
  // Service-specific fields
  projectId?: string;
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Block Interface
export interface Block {
  _id?: string; // MongoDB ID
  name: string;
  type: BlockType;
  description?: string;
  totalUnits?: number;
  totalPlots?: number;
  availableUnits?: number;
  reservedUnits?: number;
  allocatedUnits?: number;
  soldUnits?: number;
  status: BlockStatus;
  defaultPrice?: string | number;
  defaultSize?: string;
  defaultPrototype?: string;
  structureType: TerminologyType;
  blockType?: string; // API field
  units?: Unit[];
  // Service-specific fields
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Unit Interface
export interface Unit {
  id: string;
  plotId: string;
  size: string;
  price: string;
  status: UnitStatus;
  client: string | null;
  purpose?: "developing" | "land-banking" | "investment";
  // Fields for Units (housing)
  unitName?: string; // Optional naming like "5 Bedroom Duplex"
  bedrooms?: number;
  bathrooms?: number;
  // Fields for Plots (land)
  prototype?: string; // For land plots
  // Service-specific fields
  projectId?: string;
  unitNumber?: string;
  floor?: number;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Main Project Interface
export interface Project {
  _id: string; // MongoDB ID
  id?: string;
  projectName: string;
  name: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  type?: string;
  totalUnits?: number;
  soldUnits?: number;
  reservedUnits?: number;
  allocatedUnits?: number;
  availableUnits?: number;
  description?: string;
  projectSize?: string;
  documentTitle?: string;
  projectManager?: string;
  tags?: string;
  startDate?: string;
  expectedCompletion?: string;
  totalPlots?: number;
  totalBudget?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  developmentStage?: string;
  terminologyType: TerminologyType;
  image?: string;
  documents?: ProjectDocument[];
  blocks?: Block[];
  allocatedTo?: string | null;
  // API-specific fields from the response
  noOfAllocations?: number;
  pendingAllocations?: number;
  totalRevenue?: number;
  totalExpenses?: number;
  totalProfit?: number;
  availablePlots?: number;
  totalClients?: number;
  allocationRate?: number;
  revenue?: number;
  // Service-specific fields
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  completionDate?: string;
  __v?: number; // MongoDB version key
}

// Create Project Data Interface (for API calls)
export interface Contact {
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
}
export interface BasicInfo {
  name: string;
  description?: string;
  location: string;
  category: ProjectCategory;
  terminologyType: TerminologyType;
  documentTitle?: string;
}

export interface ProjectDetails {
  status: ProjectStatus;
  projectSize?: string;
  projectManager?: string;
  tags?: string;
}

export interface ProjectTimeline {
  startDate: string;
  expectedCompletion: string;
  totalBudget: string;
}

export interface CreateProjectData {
  basicInfo: BasicInfo;
  projectDetails: ProjectDetails;
  projectTimeline: ProjectTimeline;
  contact: Contact;
  blocks: Block[];
  image?: string;
  documents?: ProjectDocument[];
}

// Update Project Data Interface
export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: number;
}

// Project Form Data Interface (for form handling)
export interface ProjectFormData {
  name: string;
  location: string;
  category: ProjectCategory;
  description?: string;
  status: ProjectStatus;
  projectSize?: string;
  documentTitle?: string;
  projectManager?: string;
  tags?: string;
  startDate?: string;
  expectedCompletion?: string;
  totalBudget?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  terminologyType: TerminologyType;
}

// Block Form Data Interface
export interface BlockFormData {
  id: string;
  name: string;
  type: BlockType;
  description?: string;
  totalUnits: number;
  status: BlockStatus;
  defaultPrice?: string;
  defaultSize?: string;
  structureType: TerminologyType;
}

// Project Statistics Interface
export interface ProjectStats {
  totalUnits: number;
  soldUnits: number;
  reservedUnits: number;
  allocatedUnits: number;
  availableUnits: number;
  totalRevenue?: string;
  averagePrice?: string;
  completionPercentage?: number;
}

// Project Filter Interface
export interface ProjectFilters {
  status?: ProjectStatus[];
  category?: ProjectCategory[];
  location?: string[];
  projectManager?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
  page?: number;
  limit?: number;
}

// Project Search Interface
export interface ProjectSearchParams {
  query?: string;
  filters?: ProjectFilters;
  sortBy?: "name" | "location" | "status" | "createdAt" | "totalUnits";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Project Response Interface (for API responses)
export interface ProjectResponse {
  success: boolean;
  data?: Project | Project[];
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Service-specific interfaces for backward compatibility
export interface ProjectUnit extends Unit {
  projectId: string;
  unitNumber: string;
  floor: number;
  features: string[];
}

export interface ProjectBlock extends Block {
  projectId: string;
}

// Legacy interfaces for backward compatibility
export interface LegacyProject {
  id: string;
  name: string;
  description?: string;
  location: string;
  status: LegacyProjectStatus;
  type: "residential" | "commercial" | "mixed-use";
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  priceRange: {
    min: number;
    max: number;
  };
  completionDate?: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

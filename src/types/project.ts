export interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  status: string;
  type: string;
  totalUnits: number;
  soldUnits: number;
  reservedUnits: number;
  availableUnits: number;
  description?: string;
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
  developmentStage?: string;
  // New field for terminology preference
  terminologyType: 'plots' | 'units';
  image?: string;
}

export interface Block {
  id: string;
  name: string;
  type: string;
  description: string;
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  soldUnits: number;
  status: 'planning' | 'construction' | 'completed' | 'on-hold';
  defaultPrice: string;
  defaultSize: string;
  defaultPrototype?: string;
  // New field for block structure type
  structureType: 'plots' | 'units';
  units: Unit[];
}

export interface Unit {
  id: string;
  plotId: string;
  size: string;
  price: string;
  status: 'available' | 'reserved' | 'sold';
  client: string | null;
  purpose?: 'developing' | 'land-banking' | 'investment';
  // Fields for Units (housing)
  unitName?: string; // Optional naming like "5 Bedroom Duplex"
  bedrooms?: number;
  bathrooms?: number;
  // Fields for Plots (land)
  prototype?: string; // For land plots
}
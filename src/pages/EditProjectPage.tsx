
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';

// Mock project data - in a real app, this would come from an API
const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 5,
    totalUnits: 150,
    availableUnits: 38,
    allocatedUnits: 89,
    reservedUnits: 23,
    totalClients: 112,
    totalRevenue: '₦2,500,000,000',
    allocationRate: 75,
    lastUpdated: '2024-01-15',
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    internalNotes: 'Focus on completing Block A before marketing Block C units.',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Abuja, FCT',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 8,
    totalUnits: 200,
    availableUnits: 32,
    allocatedUnits: 156,
    reservedUnits: 12,
    totalClients: 168,
    totalRevenue: '₦4,200,000,000',
    allocationRate: 78,
    lastUpdated: '2024-01-20',
    description: 'A mixed-use development combining residential and commercial spaces in the heart of Abuja.',
    projectManager: 'David Wilson',
    internalNotes: 'Commercial units showing strong interest from investors.',
    tags: ['Mixed-Use', 'Commercial', 'Abuja'],
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Golden View Towers',
    location: 'Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Pre-Launch',
    totalBlocks: 12,
    totalUnits: 300,
    availableUnits: 37,
    allocatedUnits: 245,
    reservedUnits: 18,
    totalClients: 263,
    totalRevenue: '₦6,800,000,000',
    allocationRate: 81,
    lastUpdated: '2024-01-18',
    description: 'Luxury high-rise towers offering panoramic views of Lagos lagoon and city skyline.',
    projectManager: 'Sarah Mitchell',
    internalNotes: 'High demand for penthouses and top floor units.',
    tags: ['Luxury', 'High-rise', 'Victoria Island'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'completed',
    developmentStage: 'Handover',
    totalBlocks: 6,
    totalUnits: 180,
    availableUnits: 5,
    allocatedUnits: 167,
    reservedUnits: 8,
    totalClients: 175,
    totalRevenue: '₦3,900,000,000',
    allocationRate: 92,
    lastUpdated: '2024-01-22',
    description: 'Completed residential development in the prestigious Ikoyi district.',
    projectManager: 'Michael Brown',
    internalNotes: 'Final units ready for handover.',
    tags: ['Completed', 'Ikoyi', 'Premium'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=600&fit=crop'
  },
  {
    id: 5,
    name: 'Marina Heights',
    location: 'Marina, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Mixed',
    type: 'Mixed-Use',
    status: 'ongoing',
    developmentStage: 'Planning',
    totalBlocks: 10,
    totalUnits: 250,
    availableUnits: 27,
    allocatedUnits: 198,
    reservedUnits: 25,
    totalClients: 223,
    totalRevenue: '₦5,500,000,000',
    allocationRate: 79,
    lastUpdated: '2024-01-25',
    description: 'Strategic mixed-use development in Lagos Marina business district.',
    projectManager: 'Jennifer Davis',
    internalNotes: 'Awaiting final planning approvals.',
    tags: ['Mixed-Use', 'Marina', 'Business District'],
    image: 'https://images.unsplash.com/photo-1503602642458-232114445914?w=1200&h=600&fit=crop'
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    location: 'Ajah, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Residential',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 15,
    totalUnits: 400,
    availableUnits: 75,
    allocatedUnits: 280,
    reservedUnits: 45,
    totalClients: 325,
    totalRevenue: '₦7,200,000,000',
    allocationRate: 70,
    lastUpdated: '2024-01-28',
    description: 'Large-scale residential estate development in Ajah corridor.',
    projectManager: 'Robert Taylor',
    internalNotes: 'Phase 2 construction in progress.',
    tags: ['Estate', 'Ajah', 'Family Homes'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=600&fit=crop'
  },
  {
    id: 7,
    name: 'Royal Gardens',
    location: 'Epe, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Land',
    type: 'Land Project',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 20,
    totalUnits: 500,
    availableUnits: 100,
    allocatedUnits: 320,
    reservedUnits: 80,
    totalClients: 400,
    totalRevenue: '₦4,800,000,000',
    allocationRate: 64,
    lastUpdated: '2024-01-30',
    description: 'Premium land development project with full infrastructure.',
    projectManager: 'Lisa Anderson',
    internalNotes: 'Infrastructure development 80% complete.',
    tags: ['Land', 'Infrastructure', 'Epe'],
    image: 'https://images.unsplash.com/photo-1501127122-970c479ebc57?w=1200&h=600&fit=crop'
  },
  {
    id: 8,
    name: 'Crystal Bay',
    location: 'Banana Island, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Housing',
    type: 'Waterfront',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 4,
    totalUnits: 80,
    availableUnits: 5,
    allocatedUnits: 65,
    reservedUnits: 10,
    totalClients: 75,
    totalRevenue: '₦8,500,000,000',
    allocationRate: 81,
    lastUpdated: '2024-02-01',
    description: 'Ultra-luxury waterfront development on exclusive Banana Island.',
    projectManager: 'Christopher Lee',
    internalNotes: 'Limited units available, high-value clientele.',
    tags: ['Ultra-Luxury', 'Waterfront', 'Banana Island'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=600&fit=crop'
  },
  {
    id: 9,
    name: 'Metro Heights',
    location: 'Ikeja, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    category: 'Mixed',
    type: 'Commercial',
    status: 'ongoing',
    developmentStage: 'Construction',
    totalBlocks: 7,
    totalUnits: 220,
    availableUnits: 25,
    allocatedUnits: 180,
    reservedUnits: 15,
    totalClients: 195,
    totalRevenue: '₦3,800,000,000',
    allocationRate: 81,
    lastUpdated: '2024-02-03',
    description: 'Modern commercial complex in Ikeja business hub.',
    projectManager: 'Amanda White',
    internalNotes: 'Office spaces in high demand.',
    tags: ['Commercial', 'Ikeja', 'Business Hub'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=600&fit=crop'
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    location: 'Ibadan, Oyo',
    city: 'Ibadan',
    state: 'Oyo State',
    category: 'Housing',
    type: 'Residential',
    status: 'upcoming',
    developmentStage: 'Pre-Launch',
    totalBlocks: 8,
    totalUnits: 160,
    availableUnits: 95,
    allocatedUnits: 45,
    reservedUnits: 20,
    totalClients: 65,
    totalRevenue: '₦1,200,000,000',
    allocationRate: 28,
    lastUpdated: '2024-02-05',
    description: 'Affordable housing development in Ibadan metropolitan area.',
    projectManager: 'Daniel Garcia',
    internalNotes: 'Pre-launch marketing campaign in preparation.',
    tags: ['Affordable', 'Ibadan', 'Pre-Launch'],
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc9701bc?w=1200&h=600&fit=crop'
  }
];

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '0'));

  const handleBack = () => {
    const backUrl = `/company/projects/${projectId}`;
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(backUrl);
      }
    } else {
      navigate(backUrl);
    }
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = () => {
    setHasUnsavedChanges(false);
    navigate(`/company/projects/${projectId}`);
  };

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <CompanySidebar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <Button onClick={() => navigate('/company/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <CompanySidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Project: {project.name}</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <ProjectForm 
              project={project}
              onClose={handleFormSubmit}
              onFormChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

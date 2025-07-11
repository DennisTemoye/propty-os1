import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { toast } from 'sonner';

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
    description: 'A premium residential estate featuring modern amenities and strategic location in the heart of Lekki.',
    projectManager: 'Alice Johnson',
    tags: ['Premium', 'Residential', 'Lekki'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop',
    projectSize: '50 hectares',
    startDate: '2024-01-01',
    expectedCompletion: '2025-12-31',
    totalBudget: '₦5,000,000,000',
    terminologyType: 'units',
    blocks: [
      {
        id: 'Block-A',
        prototype: 'Duplex',
        units: 30,
        status: 'construction',
        description: 'Premium duplex units with modern amenities'
      }
    ]
  },
  {
    id: 2,
    name: 'Emerald Heights Land',
    location: 'Abuja, FCT',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    category: 'Mixed',
    type: 'Land Development',
    status: 'ongoing',
    developmentStage: 'Marketing',
    totalBlocks: 8,
    totalUnits: 200,
    description: 'A mixed-use land development project with commercial and residential plots.',
    projectManager: 'Bob Wilson',
    tags: ['Mixed-Use', 'Land', 'Abuja'],
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&h=600&fit=crop',
    projectSize: '80 hectares',
    startDate: '2024-02-01',
    expectedCompletion: '2026-12-31',
    totalBudget: '₦4,200,000,000',
    terminologyType: 'plots',
    blocks: [
      {
        id: 'Block-B',
        prototype: 'Commercial Plot',
        units: 50,
        status: 'marketing',
        description: 'Prime commercial plots for business development'
      }
    ]
  }
];

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { confirmNavigation } = useUnsavedChanges(hasUnsavedChanges);
  
  const project = mockProjects.find(p => p.id === parseInt(id || '0'));

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <Button onClick={() => navigate('/company/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = () => {
    toast.success('Project updated successfully!');
    setHasUnsavedChanges(false);
    navigate(`/company/projects/${project.id}`);
  };

  const handleBack = () => {
    confirmNavigation('/company/projects');
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={`Edit Project: ${project.name}`}
        description="Update project information and details"
        backUrl="/company/projects"
        onBack={handleBack}
      />
      
      <div className="max-w-none px-4 md:px-6 py-4">
        <ProjectForm
          project={project}
          onClose={handleBack}
          onFormChange={() => setHasUnsavedChanges(true)}
        />
      </div>
    </DashboardLayout>
  );
}


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlocksUnitsManager } from '@/components/dashboard/projects/BlocksUnitsManager';
import { AssignUnitModal } from '@/components/dashboard/projects/AssignUnitModal';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    category: 'Housing',
    type: 'Residential',
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active',
    terminologyType: 'plots' as const
  }
];

export default function ProjectBlocksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isAssignUnitOpen, setIsAssignUnitOpen] = useState(false);
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleAssignUnit = (unit: any) => {
    setSelectedUnit(unit);
    setIsAssignUnitOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/company/projects')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Blocks & Units - {project.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Structure your project by blocks and units, and assign units to clients
          </p>
        </div>
        
        <BlocksUnitsManager 
          project={project} 
          onAssignUnit={handleAssignUnit}
        />

        <AssignUnitModal 
          isOpen={isAssignUnitOpen}
          onClose={() => setIsAssignUnitOpen(false)}
          unit={selectedUnit}
        />
      </div>
    </div>
  );
}

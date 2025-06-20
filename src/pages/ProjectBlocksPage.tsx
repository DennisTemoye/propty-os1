
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlocksUnitsManager } from '@/components/dashboard/projects/BlocksUnitsManager';
import { AssignUnitModal } from '@/components/dashboard/projects/AssignUnitModal';

const mockDevelopments = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active'
  }
];

export default function DevelopmentBlocksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isAssignUnitOpen, setIsAssignUnitOpen] = useState(false);
  
  const development = mockDevelopments.find(p => p.id === parseInt(projectId || '1'));

  if (!development) {
    return <div>Development not found</div>;
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
            Back to Developments
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Blocks & Units - {development.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Structure your development by blocks and units, and assign units to clients
          </p>
        </div>
        
        <BlocksUnitsManager 
          project={development} 
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

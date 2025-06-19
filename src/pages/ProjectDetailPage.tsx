
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProjectDetailView } from '@/components/dashboard/projects/ProjectDetailView';

const mockProjects = [
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

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = mockProjects.find(p => p.id === parseInt(projectId || '1'));

  if (!project) {
    return <div>Project not found</div>;
  }

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
        </div>
        
        <ProjectDetailView project={project} />
      </div>
    </div>
  );
}

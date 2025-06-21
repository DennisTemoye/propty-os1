
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Building, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectHeaderProps {
  project: {
    id: number;
    name: string;
    location: string;
    category: string;
    type: string;
    status: string;
    totalBlocks: number;
    totalUnits: number;
  };
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Housing':
        return 'bg-purple-100 text-purple-800';
      case 'Lands':
        return 'bg-orange-100 text-orange-800';
      case 'Both':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-6 text-gray-600 mb-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {project.location}
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {project.totalBlocks} Blocks
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {project.totalUnits} Units
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
            <Badge variant="outline">
              {project.type}
            </Badge>
          </div>
        </div>

        <Button 
          onClick={() => navigate(`/company/projects/${project.id}/settings`)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </div>
    </div>
  );
}


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, MapPin, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectKpiCardProps {
  project: {
    id: number;
    name: string;
    location: string;
    status: string;
    totalBlocks: number;
    totalUnits: number;
    availableUnits: number;
    allocatedUnits: number;
    reservedUnits: number;
    image?: string;
  };
}

export function ProjectKpiCard({ project }: ProjectKpiCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'acquisition':
        return 'bg-orange-100 text-orange-800';
      case 'documentation':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'construction':
        return 'bg-purple-100 text-purple-800';
      case 'presale':
        return 'bg-indigo-100 text-indigo-800';
      case 'selling':
        return 'bg-green-100 text-green-800';
      case 'pause sales':
        return 'bg-gray-100 text-gray-800';
      case 'sold out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectImage = (project: any) => {
    return project.image || '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <img 
            src={getProjectImage(project)} 
            alt={project.name}
            className="w-full h-full object-cover rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-lg"></div>
          <div className="absolute top-4 right-4">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.location}</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Building className="h-4 w-4 mr-1 text-blue-600" />
                <span className="text-sm text-gray-600">Blocks</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{project.totalBlocks}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 mr-1 text-green-600" />
                <span className="text-sm text-gray-600">Units</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{project.totalUnits}</div>
            </div>
          </div>

          {/* Unit Status Breakdown */}
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Available: {project.availableUnits}</span>
              <span className="text-blue-600">Allocated: {project.allocatedUnits}</span>
            </div>
            <div className="flex justify-center text-sm">
              <span className="text-yellow-600">Reserved: {project.reservedUnits}</span>
            </div>
          </div>

          {/* View Details Button */}
          <Button 
            onClick={() => navigate(`/company/projects/${project.id}`)}
            className="w-full"
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

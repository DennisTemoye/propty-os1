import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, MapPin, Eye, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectImage, handleImageError } from '@/lib/utils';

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
    totalClients: number;
    totalRevenue: string;
    allocationRate: number;
    image?: string;
  };
}

export function ProjectKpiCard({ project }: ProjectKpiCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 relative">
      {/* Pending Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-yellow-600 text-white text-xs flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>2 Pending</span>
        </Badge>
      </div>

      <CardContent className="p-0">
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <img 
            src={getProjectImage(project)} 
            alt={project.name}
            className="w-full h-full object-cover rounded-t-lg"
            onError={handleImageError}
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

          {/* Unit Status */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Available: {project.availableUnits}</span>
              <span className="text-gray-600">Allocated: {project.allocatedUnits}</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-lg font-semibold text-green-600">{project.totalRevenue}</div>
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

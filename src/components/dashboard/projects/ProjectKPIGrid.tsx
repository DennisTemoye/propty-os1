
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';

interface ProjectKPIGridProps {
  project: {
    availableUnits: number;
    allocatedUnits: number;
    reservedUnits: number;
    totalClients: number;
    totalRevenue: string;
    allocationRate: number;
    lastUpdated: string;
  };
}

export function ProjectKPIGrid({ project }: ProjectKPIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Available Units</div>
              <div className="text-2xl font-bold text-green-600">{project.availableUnits}</div>
            </div>
            <Building className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Allocated Units</div>
              <div className="text-2xl font-bold text-blue-600">{project.allocatedUnits}</div>
            </div>
            <Building className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Reserved Units</div>
              <div className="text-2xl font-bold text-yellow-600">{project.reservedUnits}</div>
            </div>
            <Building className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Clients</div>
              <div className="text-2xl font-bold text-purple-600">{project.totalClients}</div>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
              <div className="text-lg font-bold text-green-600">{project.totalRevenue}</div>
              <div className="text-xs text-gray-400">Last updated: {project.lastUpdated}</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

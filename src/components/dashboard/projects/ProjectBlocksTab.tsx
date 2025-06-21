
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Users, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectBlocksTabProps {
  project: {
    id: number;
    name: string;
  };
}

export function ProjectBlocksTab({ project }: ProjectBlocksTabProps) {
  const navigate = useNavigate();

  const mockBlocks = [
    { id: 'A', name: 'Block A', prototype: 'Duplex', units: 50, sold: 35, reserved: 8, available: 7 },
    { id: 'B', name: 'Block B', prototype: 'Bungalow', units: 50, sold: 30, reserved: 10, available: 10 },
    { id: 'C', name: 'Block C', prototype: 'Duplex', units: 50, sold: 24, reserved: 5, available: 21 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blocks & Units Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
          <Button 
            onClick={() => navigate(`/company/projects/${project.id}/blocks`)}
          >
            <Building className="h-4 w-4 mr-2" />
            Manage All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBlocks.map((block) => (
          <Card key={block.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{block.name}</span>
                <Badge variant="outline">{block.prototype}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Total Units: <span className="font-medium">{block.units}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-lg font-bold text-green-600">{block.sold}</div>
                    <div className="text-xs text-green-600">Sold</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <div className="text-lg font-bold text-yellow-600">{block.reserved}</div>
                    <div className="text-xs text-yellow-600">Reserved</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-lg font-bold text-blue-600">{block.available}</div>
                    <div className="text-xs text-blue-600">Available</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Units
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

interface MapViewProps {
  project: {
    id: number;
    name: string;
    location: string;
    totalUnits: number;
    soldUnits: number;
    reservedUnits: number;
    availableUnits: number;
  };
}

export function MapView({ project }: MapViewProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          <span className="font-medium">{project.location}</span>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mock Map Container */}
      <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 font-medium">Interactive Map View</p>
          <p className="text-sm text-gray-400">Project location and unit mapping</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{project.soldUnits}</div>
              <div className="text-sm text-gray-500">Sold Units</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{project.reservedUnits}</div>
              <div className="text-sm text-gray-500">Reserved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{project.availableUnits}</div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{project.totalUnits}</div>
              <div className="text-sm text-gray-500">Total Units</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Export Map</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Edit Units</Button>
      </div>
    </div>
  );
}


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Upload, Download, Eye } from 'lucide-react';

interface ProjectLayoutTabProps {
  project: {
    id: number;
    name: string;
  };
}

export function ProjectLayoutTab({ project }: ProjectLayoutTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Layout Designer</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Layout
          </Button>
          <Button>
            <Map className="h-4 w-4 mr-2" />
            Open Designer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Layout Available</h3>
            <p className="text-gray-500 mb-4">Upload a layout plan or use our designer to create one.</p>
            <div className="flex justify-center space-x-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Layout
              </Button>
              <Button>
                <Map className="h-4 w-4 mr-2" />
                Create Layout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

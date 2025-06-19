
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, MapPin, FileText, Building, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Lekki, Lagos',
    totalBlocks: 5,
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'ongoing',
    revenue: '₦2.5B'
  },
  {
    id: 2,
    name: 'Emerald Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Abuja, FCT',
    totalBlocks: 8,
    totalUnits: 200,
    soldUnits: 156,
    reservedUnits: 12,
    availableUnits: 32,
    status: 'ongoing',
    revenue: '₦4.2B'
  }
];

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProjectDetails = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleManageBlocks = (projectId: number) => {
    navigate(`/company/projects/${projectId}/blocks`);
  };

  const handleEditProject = (projectId: number) => {
    console.log('Edit project:', projectId);
    // Implement edit functionality
  };

  const handleDeleteProject = (projectId: number) => {
    console.log('Delete project:', projectId);
    // Implement delete functionality
  };

  const handleViewDocuments = (projectId: number) => {
    navigate('/company/documents');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your real estate projects, blocks, and units</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-500">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <div className="text-sm text-gray-500">Total Units</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">845</div>
            <div className="text-sm text-gray-500">Units Sold</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">₦15.2B</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('table')}
        >
          Table View
        </Button>
      </div>

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.type}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Blocks:</span>
                      <span className="font-medium">{project.totalBlocks || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Units:</span>
                      <span className="font-medium">{project.totalUnits}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sold:</span>
                      <span className="font-medium text-green-600">{project.soldUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reserved:</span>
                      <span className="font-medium text-orange-600">{project.reservedUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-blue-600">{project.availableUnits}</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(project.soldUnits / project.totalUnits) * 100}%` }}
                    ></div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Revenue:</span>
                      <span className="font-bold text-purple-600">{project.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleManageBlocks(project.id)}
                    >
                      <Building className="h-3 w-3 mr-1" />
                      Manage Blocks
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDocuments(project.id)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Documents
                    </Button>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleProjectDetails(project.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>

                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditProject(project.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Blocks/Units</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{project.totalBlocks || 0} blocks</div>
                        <div className="text-gray-500">{project.totalUnits} units</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-purple-600">
                      {project.revenue}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleProjectDetails(project.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManageBlocks(project.id)}
                        >
                          <Building className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDocuments(project.id)}
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditProject(project.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

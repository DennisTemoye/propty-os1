import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, MapPin, FileText, Building, Home, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NewProjectForm } from './forms/NewProjectForm';
import { ProjectDocumentsView } from './projects/ProjectDocumentsView';

const mockDevelopments = [
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
  },
  {
    id: 3,
    name: 'Golden View Towers',
    category: 'Housing',
    type: 'Residential',
    location: 'Victoria Island, Lagos',
    totalBlocks: 12,
    totalUnits: 300,
    soldUnits: 245,
    reservedUnits: 18,
    availableUnits: 37,
    status: 'ongoing',
    revenue: '₦6.8B'
  },
  {
    id: 4,
    name: 'Sunset Heights',
    category: 'Housing',
    type: 'Residential',
    location: 'Ikoyi, Lagos',
    totalBlocks: 6,
    totalUnits: 180,
    soldUnits: 167,
    reservedUnits: 8,
    availableUnits: 5,
    status: 'completed',
    revenue: '₦3.9B'
  },
  {
    id: 5,
    name: 'Marina Heights',
    category: 'Mixed',
    type: 'Mixed-Use',
    location: 'Marina, Lagos',
    totalBlocks: 10,
    totalUnits: 250,
    soldUnits: 198,
    reservedUnits: 25,
    availableUnits: 27,
    status: 'ongoing',
    revenue: '₦5.5B'
  },
  {
    id: 6,
    name: 'Palm Grove Estate',
    category: 'Housing',
    type: 'Residential',
    location: 'Ajah, Lagos',
    totalBlocks: 15,
    totalUnits: 400,
    soldUnits: 280,
    reservedUnits: 45,
    availableUnits: 75,
    status: 'ongoing',
    revenue: '₦7.2B'
  },
  {
    id: 7,
    name: 'Royal Gardens',
    category: 'Land',
    type: 'Land Development',
    location: 'Epe, Lagos',
    totalBlocks: 20,
    totalUnits: 500,
    soldUnits: 320,
    reservedUnits: 80,
    availableUnits: 100,
    status: 'ongoing',
    revenue: '₦4.8B'
  },
  {
    id: 8,
    name: 'Crystal Bay',
    category: 'Housing',
    type: 'Waterfront',
    location: 'Banana Island, Lagos',
    totalBlocks: 4,
    totalUnits: 80,
    soldUnits: 65,
    reservedUnits: 10,
    availableUnits: 5,
    status: 'ongoing',
    revenue: '₦8.5B'
  },
  {
    id: 9,
    name: 'Metro Heights',
    category: 'Mixed',
    type: 'Commercial',
    location: 'Ikeja, Lagos',
    totalBlocks: 7,
    totalUnits: 220,
    soldUnits: 180,
    reservedUnits: 15,
    availableUnits: 25,
    status: 'ongoing',
    revenue: '₦3.8B'
  },
  {
    id: 10,
    name: 'Paradise Gardens',
    category: 'Housing',
    type: 'Residential',
    location: 'Ibadan, Oyo',
    totalBlocks: 8,
    totalUnits: 160,
    soldUnits: 45,
    reservedUnits: 20,
    availableUnits: 95,
    status: 'upcoming',
    revenue: '₦1.2B'
  }
];

export function ProjectsUnits() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isNewDevelopmentOpen, setIsNewDevelopmentOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedDevelopment, setSelectedDevelopment] = useState<any>(null);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Housing':
        return 'bg-blue-100 text-blue-800';
      case 'Land':
        return 'bg-green-100 text-green-800';
      case 'Mixed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDevelopmentClick = (developmentId: number) => {
    navigate(`/company/projects/${developmentId}`);
  };

  const handleManageBlocks = (e: React.MouseEvent, developmentId: number) => {
    e.stopPropagation();
    navigate(`/company/projects/${developmentId}/blocks`);
  };

  const handleViewDocuments = (e: React.MouseEvent, development: any) => {
    e.stopPropagation();
    setSelectedDevelopment(development);
    setIsDocumentsModalOpen(true);
  };

  const kpiData = [
    {
      title: 'Total Developments',
      value: '12',
      subtitle: 'All registered',
      icon: Building,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      cardBg: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Total Units',
      value: '1,247',
      subtitle: 'Across all developments',
      icon: Home,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      cardBg: 'from-emerald-50 to-emerald-100',
    },
    {
      title: 'Units Sold',
      value: '845',
      subtitle: 'Successfully closed',
      icon: DollarSign,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      cardBg: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Total Revenue',
      value: '₦15.2B',
      subtitle: 'All time earnings',
      icon: DollarSign,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      cardBg: 'from-amber-50 to-amber-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developments</h1>
          <p className="text-gray-600 mt-1">Manage your real estate developments, blocks, and units</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsNewDevelopmentOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Development
        </Button>
      </div>

      {/* Development Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`bg-gradient-to-br ${kpi.cardBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.subtitle}</div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} shadow-sm`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

      {/* Developments Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockDevelopments.map((development) => (
            <Card 
              key={development.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => handleDevelopmentClick(development.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{development.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(development.category)}>
                      {development.category}
                    </Badge>
                    <Badge className={getStatusColor(development.status)}>
                      {development.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {development.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{development.type}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Blocks:</span>
                      <span className="font-medium">{development.totalBlocks || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Units:</span>
                      <span className="font-medium">{development.totalUnits}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sold:</span>
                      <span className="font-medium text-green-600">{development.soldUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reserved:</span>
                      <span className="font-medium text-orange-600">{development.reservedUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-blue-600">{development.availableUnits}</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(development.soldUnits / development.totalUnits) * 100}%` }}
                    ></div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Revenue:</span>
                      <span className="font-bold text-purple-600">{development.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => handleManageBlocks(e, development.id)}
                    >
                      <Building className="h-3 w-3 mr-1" />
                      Manage Blocks
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => handleViewDocuments(e, development)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Development</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Blocks/Units</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDevelopments.map((development) => (
                  <TableRow 
                    key={development.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDevelopmentClick(development.id)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{development.name}</div>
                        <div className="text-sm text-gray-500">{development.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(development.category)}>
                        {development.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{development.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{development.totalBlocks || 0} blocks</div>
                        <div className="text-gray-500">{development.totalUnits} units</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(development.status)}>
                        {development.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-purple-600">
                      {development.revenue}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleManageBlocks(e, development.id)}
                        >
                          <Building className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleViewDocuments(e, development)}
                        >
                          <FileText className="h-3 w-3" />
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

      {/* New Development Modal */}
      <Dialog open={isNewDevelopmentOpen} onOpenChange={setIsNewDevelopmentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Development</DialogTitle>
            <DialogDescription>
              Add a new real estate development to your portfolio
            </DialogDescription>
          </DialogHeader>
          <NewProjectForm onClose={() => setIsNewDevelopmentOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Documents Modal */}
      <Dialog open={isDocumentsModalOpen} onOpenChange={setIsDocumentsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Development Documents - {selectedDevelopment?.name}</DialogTitle>
            <DialogDescription>
              View and manage documents for this development
            </DialogDescription>
          </DialogHeader>
          <ProjectDocumentsView project={selectedDevelopment} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

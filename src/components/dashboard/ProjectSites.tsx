import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, MapPin, Plus, Search, LayoutGrid, List, Building, House, DollarSign, BarChart3, Calendar, Users, Eye, Edit, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectSiteForm } from './projects/ProjectSiteForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectStatsCard } from './projects/ProjectStatsCard';

const mockDevelopmentSites = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    totalBlocks: 8,
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active',
    propertyType: 'Residential',
    projectSize: 50000,
    developmentStage: 'Construction',
    completionPercentage: 65,
    startDate: '2024-01-15',
    estimatedCompletion: '2024-12-15',
    totalValue: 7500000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'John Doe',
  },
  {
    id: 2,
    name: 'Mainland Commercial Plaza',
    location: 'Ikeja, Lagos',
    totalBlocks: 3,
    totalUnits: 75,
    soldUnits: 45,
    reservedUnits: 12,
    availableUnits: 18,
    status: 'paused',
    propertyType: 'Commercial',
    projectSize: 15000,
    developmentStage: 'Marketing',
    completionPercentage: 80,
    startDate: '2023-08-10',
    estimatedCompletion: '2024-06-10',
    totalValue: 3750000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Sunset Land Development',
    location: 'Abuja FCT',
    totalBlocks: 12,
    totalUnits: 200,
    soldUnits: 196,
    reservedUnits: 4,
    availableUnits: 0,
    status: 'completed',
    propertyType: 'Mixed-Use',
    projectSize: 100000,
    developmentStage: 'Handover',
    completionPercentage: 100,
    startDate: '2023-01-20',
    estimatedCompletion: '2024-01-20',
    totalValue: 12000000000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    projectManager: 'Mike Johnson',
  }
];

export function ProjectSites() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [isDevelopmentFormOpen, setIsDevelopmentFormOpen] = useState(false);
  const [editingDevelopment, setEditingDevelopment] = useState<any>(null);
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle };
      case 'paused':
        return { color: 'bg-amber-100 text-amber-700', icon: Clock };
      case 'completed':
        return { color: 'bg-blue-100 text-blue-700', icon: CheckCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: AlertCircle };
    }
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'Residential': return 'bg-blue-100 text-blue-700';
      case 'Commercial': return 'bg-purple-100 text-purple-700';
      case 'Mixed-Use': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDevelopments = mockDevelopmentSites.filter(development => {
    const matchesSearch = development.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         development.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || development.status === statusFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && development.status === 'active') ||
                      (activeTab === 'completed' && development.status === 'completed');
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Calculate KPIs
  const totalDevelopments = mockDevelopmentSites.length;
  const activeDevelopments = mockDevelopmentSites.filter(p => p.status === 'active').length;
  const totalUnits = mockDevelopmentSites.reduce((sum, development) => sum + development.totalUnits, 0);
  const totalSold = mockDevelopmentSites.reduce((sum, development) => sum + development.soldUnits, 0);
  const totalRevenue = mockDevelopmentSites.reduce((sum, development) => sum + (development.soldUnits * 25000000), 0);

  const handleNewDevelopment = () => {
    setEditingDevelopment(null);
    setIsDevelopmentFormOpen(true);
  };

  const handleEditDevelopment = (development: any) => {
    setEditingDevelopment(development);
    setIsDevelopmentFormOpen(true);
  };

  const handleCardClick = (developmentId: number) => {
    navigate(`/company/projects/${developmentId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Development Sites</h1>
          <p className="text-gray-600">Manage your real estate developments</p>
        </div>
        <Button onClick={handleNewDevelopment} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          New Development
        </Button>
      </div>

      {/* KPI Cards - maintaining background colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectStatsCard
          title="Total Developments"
          value={totalDevelopments.toString()}
          subtitle={`${activeDevelopments} active`}
          icon={Building}
          trend="+12%"
          trendUp={true}
          gradient="from-violet-500 to-purple-600"
        />
        <ProjectStatsCard
          title="Total Units"
          value={totalUnits.toLocaleString()}
          subtitle="Across all developments"
          icon={House}
          trend="+8%"
          trendUp={true}
          gradient="from-emerald-500 to-teal-600"
        />
        <ProjectStatsCard
          title="Units Sold"
          value={totalSold.toLocaleString()}
          subtitle={`${((totalSold / totalUnits) * 100).toFixed(1)}% rate`}
          icon={DollarSign}
          trend="+15%"
          trendUp={true}
          gradient="from-blue-500 to-cyan-600"
        />
        <ProjectStatsCard
          title="Total Revenue"
          value={`₦${(totalRevenue / 1000000000).toFixed(1)}B`}
          subtitle="All time earnings"
          icon={BarChart3}
          trend="+22%"
          trendUp={true}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search developments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Developments ({totalDevelopments})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeDevelopments})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({mockDevelopmentSites.filter(p => p.status === 'completed').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Developments Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDevelopments.map((development) => {
            const statusConfig = getStatusConfig(development.status);
            const StatusIcon = statusConfig.icon;
            const salesProgress = (development.soldUnits / development.totalUnits) * 100;
            
            return (
              <Card 
                key={development.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCardClick(development.id)}
              >
                <div className="relative h-48">
                  <img 
                    src={development.imageUrl} 
                    alt={development.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className={statusConfig.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {development.status}
                    </Badge>
                    <Badge className={getPropertyTypeColor(development.propertyType)}>
                      {development.propertyType}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{development.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {development.location}
                  </div>

                  {/* Blocks and Units Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Building2 className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{development.totalBlocks}</span>
                      </div>
                      <div className="text-xs text-gray-500">Blocks</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <House className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{development.totalUnits}</span>
                      </div>
                      <div className="text-xs text-gray-500">Units</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Sales Progress</span>
                      <span className="font-medium">{salesProgress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${salesProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                    <div>
                      <div className="font-bold text-emerald-600">{development.soldUnits}</div>
                      <div className="text-gray-500">Sold</div>
                    </div>
                    <div>
                      <div className="font-bold text-amber-600">{development.reservedUnits}</div>
                      <div className="text-gray-500">Reserved</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600">{development.availableUnits}</div>
                      <div className="text-gray-500">Available</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {development.projectManager}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => handleCardClick(development.id)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditDevelopment(development)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDevelopments.map((development) => {
            const statusConfig = getStatusConfig(development.status);
            const StatusIcon = statusConfig.icon;
            const salesProgress = (development.soldUnits / development.totalUnits) * 100;
            
            return (
              <Card 
                key={development.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(development.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <img 
                        src={development.imageUrl} 
                        alt={development.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold">{development.name}</h3>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {development.status}
                          </Badge>
                          <Badge className={getPropertyTypeColor(development.propertyType)}>
                            {development.propertyType}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm space-x-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {development.location}
                          </div>
                          <div>{development.developmentStage}</div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {development.projectManager}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{development.totalBlocks}</div>
                        <div className="text-gray-500">Blocks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{development.totalUnits}</div>
                        <div className="text-gray-500">Units</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-emerald-600">{development.soldUnits}</div>
                        <div className="text-gray-500">Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{salesProgress.toFixed(1)}%</div>
                        <div className="text-gray-500">Sales Progress</div>
                      </div>
                      
                      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="sm" onClick={() => handleCardClick(development.id)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditDevelopment(development)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredDevelopments.length === 0 && (
        <Card>
          <CardContent className="p-16 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No developments found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by creating your first development site.'}
            </p>
            <Button onClick={handleNewDevelopment} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Development
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Development Form Modal */}
      <Dialog open={isDevelopmentFormOpen} onOpenChange={setIsDevelopmentFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDevelopment ? 'Edit Development Site' : 'Create New Development Site'}
            </DialogTitle>
            <DialogDescription>
              {editingDevelopment 
                ? 'Update development information and settings' 
                : 'Set up a new real estate development site'
              }
            </DialogDescription>
          </DialogHeader>
          <ProjectSiteForm 
            project={editingDevelopment}
            onClose={() => setIsDevelopmentFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

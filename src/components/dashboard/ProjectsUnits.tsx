import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Eye, Edit, Settings, MapPin, Calendar, Building2, Users } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Victoria Island, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'active',
    description: 'Premium residential development with modern amenities including swimming pool, gym, 24/7 security, and landscaped gardens.',
    projectManager: 'John Doe',
    internalNotes: 'Priority project with high-end finishes. Marketing to start Q2 2024.',
    tags: ['Premium', 'Family', 'Luxury'],
    allocationRate: 75,
    totalUnits: 120,
    allocatedUnits: 90,
    remainingUnits: 30,
    totalBlocks: 4,
    completionDate: '2025-12-31',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
  {
    id: 2,
    name: 'The Grand Residences',
    location: 'Ikoyi, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'active',
    description: 'Luxury apartments with stunning views and world-class facilities.',
    projectManager: 'Jane Smith',
    internalNotes: 'High demand expected. Focus on digital marketing.',
    tags: ['Luxury', 'Apartments', 'City View'],
    allocationRate: 90,
    totalUnits: 80,
    allocatedUnits: 72,
    remainingUnits: 8,
    totalBlocks: 2,
    completionDate: '2024-09-30',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
  {
    id: 3,
    name: 'Sunrise Commercial Hub',
    location: 'Ikeja, Lagos',
    category: 'Commercial',
    type: 'Commercial',
    status: 'completed',
    description: 'Modern office spaces and retail outlets in a prime location.',
    projectManager: 'Mike Johnson',
    internalNotes: 'All units sold out. Focus on property management.',
    tags: ['Office Space', 'Retail', 'Commercial'],
    allocationRate: 100,
    totalUnits: 50,
    allocatedUnits: 50,
    remainingUnits: 0,
    totalBlocks: 1,
    completionDate: '2023-12-31',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
  {
    id: 4,
    name: 'Green Acres Estate',
    location: 'Lekki, Lagos',
    category: 'Lands',
    type: 'Land Project',
    status: 'active',
    description: 'Plots of land available for residential and commercial development.',
    projectManager: 'Alice Brown',
    internalNotes: 'Fast selling. Focus on marketing to investors.',
    tags: ['Land', 'Plots', 'Investment'],
    allocationRate: 60,
    totalUnits: 200,
    allocatedUnits: 120,
    remainingUnits: 80,
    totalBlocks: 0,
    completionDate: '2026-06-30',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
  {
    id: 5,
    name: 'City View Apartments',
    location: 'Yaba, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'paused',
    description: 'Affordable apartments for young professionals and families.',
    projectManager: 'David Lee',
    internalNotes: 'Project paused due to funding issues. Seeking investors.',
    tags: ['Apartments', 'Affordable', 'City Living'],
    allocationRate: 40,
    totalUnits: 100,
    allocatedUnits: 40,
    remainingUnits: 60,
    totalBlocks: 3,
    completionDate: '2025-03-31',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
  {
    id: 6,
    name: 'Ocean Breeze Villas',
    location: 'Epe, Lagos',
    category: 'Housing',
    type: 'Residential',
    status: 'active',
    description: 'Luxury villas with ocean views and private beach access.',
    projectManager: 'Grace White',
    internalNotes: 'Exclusive project. Target high-net-worth individuals.',
    tags: ['Villas', 'Luxury', 'Ocean View'],
    allocationRate: 80,
    totalUnits: 30,
    allocatedUnits: 24,
    remainingUnits: 6,
    totalBlocks: 1,
    completionDate: '2024-12-31',
    image: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
  },
];

export function ProjectsUnits() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || project.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'sold out': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'housing': return 'bg-purple-100 text-purple-800';
      case 'lands': return 'bg-amber-100 text-amber-800';
      case 'both': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateProject = () => {
    navigate('/company/projects/new');
  };

  const handleEditProject = (projectId: number) => {
    navigate(`/company/projects/${projectId}/edit`);
  };

  const handleViewProject = (projectId: number) => {
    navigate(`/company/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects & Units</h1>
          <p className="text-gray-600 mt-1">Manage your property developments and track unit allocations</p>
        </div>
        <Button onClick={handleCreateProject} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search projects..."
            className="md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-500 -ml-8" />
        </div>

        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="sold out">Sold Out</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="lands">Lands</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png';
                }}
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <Badge className={getCategoryColor(project.category)} variant="outline">
                    {project.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{project.totalBlocks} Blocks</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{project.totalUnits} Units</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{project.completionDate}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">{project.allocationRate}% Allocated</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${project.allocationRate}%` }}
                ></div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewProject(project.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditProject(project.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
              ? 'Try adjusting your filters to see more projects.'
              : 'Get started by creating your first project.'
            }
          </p>
          <Button onClick={handleCreateProject} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}

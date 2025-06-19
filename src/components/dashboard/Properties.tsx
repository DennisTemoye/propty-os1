
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Search, MapPin, Home, Building2, Store, Users, Eye, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddPropertyModal } from './forms/AddPropertyModal';
import { useToast } from '@/hooks/use-toast';

export function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Main St, Downtown',
      type: 'Residential',
      totalUnits: 12,
      occupied: 10,
      vacant: 2,
      monthlyRevenue: 15600
    },
    {
      id: 2,
      name: 'Commerce Plaza',
      address: '456 Business Ave, City Center',
      type: 'Commercial',
      totalUnits: 8,
      occupied: 6,
      vacant: 2,
      monthlyRevenue: 24000
    },
    {
      id: 3,
      name: 'Maple Street Houses',
      address: '789 Maple St, Suburbs',
      type: 'Mixed',
      totalUnits: 6,
      occupied: 5,
      vacant: 1,
      monthlyRevenue: 9800
    }
  ]);

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'Residential': return <Home className="h-4 w-4" />;
      case 'Commercial': return <Building2 className="h-4 w-4" />;
      case 'Mixed': return <Store className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (occupied: number, total: number) => {
    const rate = (occupied / total) * 100;
    if (rate === 100) return <Badge className="bg-green-100 text-green-800">Full</Badge>;
    if (rate >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (rate >= 50) return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low</Badge>;
  };

  const handleViewProperty = (property: any) => {
    toast({
      title: "Viewing Property",
      description: `Opening detailed view for ${property.name}`,
    });
    // Navigate to property detail page
    console.log('Viewing property:', property);
  };

  const handleEditProperty = (property: any) => {
    toast({
      title: "Edit Property",
      description: `Opening edit form for ${property.name}`,
    });
    // Open edit modal
    console.log('Editing property:', property);
  };

  const handleDeleteProperty = (property: any) => {
    if (window.confirm(`Are you sure you want to delete ${property.name}?`)) {
      setProperties(prev => prev.filter(p => p.id !== property.id));
      toast({
        title: "Property Deleted",
        description: `${property.name} has been removed from your portfolio.`,
      });
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.type.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalUnits = properties.reduce((sum, prop) => sum + prop.totalUnits, 0);
  const totalOccupied = properties.reduce((sum, prop) => sum + prop.occupied, 0);
  const totalVacant = properties.reduce((sum, prop) => sum + prop.vacant, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Properties & Units</h1>
        <AddPropertyModal />
      </div>

      {/* Stats Cards - Updated Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-2">Total Properties</div>
                <div className="text-3xl font-bold text-sky-900 mb-1">{properties.length}</div>
                <div className="text-xs text-gray-600">In Portfolio</div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-2">Total Units</div>
                <div className="text-3xl font-bold text-emerald-900 mb-1">{totalUnits}</div>
                <div className="text-xs text-gray-600">Available Units</div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-2">Occupied</div>
                <div className="text-3xl font-bold text-purple-900 mb-1">{totalOccupied}</div>
                <div className="text-xs text-gray-600">Active Tenants</div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-2">Vacant</div>
                <div className="text-3xl font-bold text-amber-900 mb-1">{totalVacant}</div>
                <div className="text-xs text-gray-600">Available Units</div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Properties Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getPropertyIcon(property.type)}
                      <span className="font-medium">{property.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.totalUnits}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{property.occupied}/{property.totalUnits}</span>
                      {getStatusBadge(property.occupied, property.totalUnits)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${property.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProperty(property)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteProperty(property)}
                        className="text-red-600 hover:text-red-700"
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
    </div>
  );
}

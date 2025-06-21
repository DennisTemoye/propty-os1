
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Users, MapPin, Plus, Edit, XCircle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AllocationStatusBadge } from './allocation/AllocationStatusBadge';
import { RevokeAllocationModal } from './forms/RevokeAllocationModal';
import { UpdateAllocationStatusModal } from './allocation/UpdateAllocationStatusModal';
import { toast } from 'sonner';
import { AllocationStatus, RevocationData } from '@/types/allocation';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens',
    location: 'Victoria Island, Lagos',
    totalUnits: 120,
    soldUnits: 72,
    availableUnits: 48,
    revenue: '₦1.8B',
    status: 'active',
    units: [
      {
        id: 1,
        plotId: 'Block A - Plot 02',
        status: 'allocated',
        allocationStatus: 'allocated' as AllocationStatus,
        client: { name: 'John Doe', id: 1 },
        price: '₦25,000,000',
        assignedDate: '2024-01-10'
      },
      {
        id: 2,
        plotId: 'Block A - Plot 03',
        status: 'offered',
        allocationStatus: 'offered' as AllocationStatus,
        client: { name: 'Jane Smith', id: 2 },
        price: '₦25,000,000',
        assignedDate: '2024-01-15'
      },
      {
        id: 3,
        plotId: 'Block A - Plot 04',
        status: 'available',
        allocationStatus: null,
        client: null,
        price: '₦25,000,000',
        assignedDate: null
      }
    ]
  }
];

export function ProjectsUnits() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);

  const handleRevokeAllocation = (unit: any) => {
    setSelectedAllocation({
      id: unit.id,
      client: unit.client,
      unit: { plotId: unit.plotId },
      status: unit.allocationStatus,
      totalPaid: '₦15,000,000'
    });
    setIsRevokeOpen(true);
  };

  const handleUpdateStatus = (unit: any) => {
    setSelectedAllocation({
      id: unit.id,
      client: unit.client,
      unit: { plotId: unit.plotId },
      status: unit.allocationStatus
    });
    setIsStatusUpdateOpen(true);
  };

  const handleRevocationSubmit = (data: RevocationData) => {
    console.log('Processing revocation:', data);
    toast.success('Allocation revoked successfully');
    setIsRevokeOpen(false);
    setSelectedAllocation(null);
  };

  const handleStatusUpdate = (newStatus: AllocationStatus, notes?: string) => {
    console.log('Updating status:', { newStatus, notes });
    toast.success('Allocation status updated successfully');
    setIsStatusUpdateOpen(false);
    setSelectedAllocation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'allocated':
        return 'bg-blue-100 text-blue-800';
      case 'offered':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUnits = selectedProject.units.filter(unit => {
    if (filterStatus === 'all') return true;
    return unit.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects & Units</h1>
          <p className="text-gray-600 mt-1">Manage project developments and unit allocations</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{mockProjects.length}</div>
                <div className="text-sm text-gray-500">Total Projects</div>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mockProjects.reduce((acc, p) => acc + p.soldUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Units Sold</div>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockProjects.reduce((acc, p) => acc + p.availableUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Available Units</div>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">₦2.4B</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="units" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="units">Unit Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="space-y-6">
          {/* Project Selector and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Unit Management - {selectedProject.name}</span>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                      <SelectItem value="allocated">Allocated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Allocation Status</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnits.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.plotId}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {unit.allocationStatus ? (
                          <AllocationStatusBadge status={unit.allocationStatus} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {unit.client ? unit.client.name : '-'}
                      </TableCell>
                      <TableCell>{unit.price}</TableCell>
                      <TableCell>{unit.assignedDate || '-'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {unit.client && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUpdateStatus(unit)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Status
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevokeAllocation(unit)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Revoke
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.location}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Total Units:</span>
                            <div className="font-semibold">{project.totalUnits}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Sold:</span>
                            <div className="font-semibold text-green-600">{project.soldUnits}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Available:</span>
                            <div className="font-semibold text-blue-600">{project.availableUnits}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Revenue:</span>
                            <div className="font-semibold text-purple-600">{project.revenue}</div>
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Project analytics and insights coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Revoke Allocation Modal */}
      <RevokeAllocationModal
        isOpen={isRevokeOpen}
        onClose={() => setIsRevokeOpen(false)}
        allocation={selectedAllocation}
        onRevoke={handleRevocationSubmit}
      />

      {/* Update Status Modal */}
      <UpdateAllocationStatusModal
        isOpen={isStatusUpdateOpen}
        onClose={() => setIsStatusUpdateOpen(false)}
        allocation={selectedAllocation}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

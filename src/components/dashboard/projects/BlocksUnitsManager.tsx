
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Building, Users, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UnitEditModal } from './UnitEditModal';

interface BlocksUnitsManagerProps {
  project: any;
  onAssignUnit: (unit: any) => void;
}

export function BlocksUnitsManager({ project, onAssignUnit }: BlocksUnitsManagerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isNewBlockOpen, setIsNewBlockOpen] = useState(false);
  const [isNewUnitOpen, setIsNewUnitOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);

  const form = useForm();

  const mockBlocks = [
    {
      id: 1,
      name: 'Block A',
      type: 'Duplex',
      description: 'Premium duplex units with modern amenities',
      totalUnits: 30,
      availableUnits: 12,
      reservedUnits: 8,
      soldUnits: 10,
      units: [
        { id: 1, plotId: 'Block A - Plot 01', size: '500sqm', price: '₦25M', status: 'available', client: null },
        { id: 2, plotId: 'Block A - Plot 02', size: '500sqm', price: '₦25M', status: 'sold', client: 'John Doe' },
        { id: 3, plotId: 'Block A - Plot 03', size: '500sqm', price: '₦25M', status: 'reserved', client: 'Jane Smith' },
        { id: 4, plotId: 'Block A - Plot 04', size: '500sqm', price: '₦25M', status: 'available', client: null },
        { id: 5, plotId: 'Block A - Plot 05', size: '500sqm', price: '₦25M', status: 'available', client: null }
      ]
    },
    {
      id: 2,
      name: 'Block B',
      type: 'Bungalow',
      description: 'Spacious bungalow units perfect for families',
      totalUnits: 25,
      availableUnits: 18,
      reservedUnits: 4,
      soldUnits: 3,
      units: [
        { id: 6, plotId: 'Block B - Plot 01', size: '400sqm', price: '₦18M', status: 'available', client: null },
        { id: 7, plotId: 'Block B - Plot 02', size: '400sqm', price: '₦18M', status: 'sold', client: 'Mike Johnson' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-orange-100 text-orange-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onSubmitBlock = (data: any) => {
    console.log('New block data:', data);
    setIsNewBlockOpen(false);
  };

  const onSubmitUnit = (data: any) => {
    console.log('New unit data:', data);
    setIsNewUnitOpen(false);
  };

  const handleEditUnit = (unit: any) => {
    setEditingUnit(unit);
  };

  const handleDeleteUnit = (unitId: number) => {
    console.log('Delete unit:', unitId);
    // Implement delete functionality
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blocks">Blocks Management</TabsTrigger>
          <TabsTrigger value="units">Units Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Project Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{mockBlocks.length}</div>
                <div className="text-sm text-gray-500">Total Blocks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {mockBlocks.reduce((sum, block) => sum + block.totalUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Units</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {mockBlocks.reduce((sum, block) => sum + block.availableUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Available Units</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {mockBlocks.reduce((sum, block) => sum + block.soldUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Sold Units</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blocks Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockBlocks.map((block) => (
                  <Card key={block.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{block.name}</h3>
                          <p className="text-sm text-gray-600">{block.type}</p>
                        </div>
                        <Badge variant="outline">{block.totalUnits} units</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{block.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{block.availableUnits}</div>
                          <div className="text-gray-500">Available</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-orange-600">{block.reservedUnits}</div>
                          <div className="text-gray-500">Reserved</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-red-600">{block.soldUnits}</div>
                          <div className="text-gray-500">Sold</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(block.soldUnits / block.totalUnits) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Blocks Management</h3>
            <Dialog open={isNewBlockOpen} onOpenChange={setIsNewBlockOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Block</DialogTitle>
                  <DialogDescription>
                    Create a new block within this project
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmitBlock)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Block Name</label>
                    <Input placeholder="e.g., Block C" {...form.register('name')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Block Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select block type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Brief description of the block" {...form.register('description')} />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Create Block</Button>
                    <Button type="button" variant="outline" onClick={() => setIsNewBlockOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockBlocks.map((block) => (
              <Card key={block.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{block.name}</CardTitle>
                      <p className="text-sm text-gray-600">{block.type} • {block.totalUnits} units</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedBlock(block)}>
                        <Building className="h-3 w-3 mr-1" />
                        Manage Units
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{block.description}</p>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{block.totalUnits}</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">{block.availableUnits}</div>
                      <div className="text-gray-500">Available</div>
                    </div>
                    <div>
                      <div className="font-medium text-orange-600">{block.reservedUnits}</div>
                      <div className="text-gray-500">Reserved</div>
                    </div>
                    <div>
                      <div className="font-medium text-red-600">{block.soldUnits}</div>
                      <div className="text-gray-500">Sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Units Management</h3>
            <Dialog open={isNewUnitOpen} onOpenChange={setIsNewUnitOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Unit</DialogTitle>
                  <DialogDescription>
                    Add a new unit to an existing block
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmitUnit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Block</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBlocks.map((block) => (
                          <SelectItem key={block.id} value={block.id.toString()}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plot ID</label>
                    <Input placeholder="e.g., Block A - Plot 06" {...form.register('plotId')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plot Size</label>
                    <Input placeholder="e.g., 500sqm" {...form.register('size')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input placeholder="e.g., ₦25M" {...form.register('price')} />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Create Unit</Button>
                    <Button type="button" variant="outline" onClick={() => setIsNewUnitOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot ID</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBlocks.flatMap(block => 
                    block.units.map(unit => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-medium">{unit.plotId}</TableCell>
                        <TableCell>{block.name}</TableCell>
                        <TableCell>{unit.size}</TableCell>
                        <TableCell className="font-medium">{unit.price}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(unit.status)}>
                            {unit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{unit.client || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {unit.status === 'available' && (
                              <Button 
                                size="sm" 
                                onClick={() => onAssignUnit(unit)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Users className="h-3 w-3 mr-1" />
                                Assign
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditUnit(unit)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteUnit(unit.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Unit Edit Modal */}
      <UnitEditModal 
        isOpen={!!editingUnit}
        onClose={() => setEditingUnit(null)}
        unit={editingUnit}
      />
    </div>
  );
}

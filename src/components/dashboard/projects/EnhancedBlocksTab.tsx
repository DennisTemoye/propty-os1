import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, Edit, Trash2, Users, UserPlus, Eye, Home } from 'lucide-react';
import { toast } from 'sonner';
import { AllocateUnitModal } from '@/components/dashboard/sales-allocation/AllocateUnitModal';

interface EnhancedBlocksTabProps {
  project: {
    id: number;
    name: string;
  };
}

const mockBlocks = [
  {
    id: 'A',
    name: 'Block A',
    type: 'duplex',
    description: 'Luxury duplex plots with modern amenities',
    totalPlots: 30,
    availablePlots: 8,
    reservedPlots: 7,
    soldPlots: 15,
    status: 'completed',
    defaultPrice: '₦25,000,000',
    defaultSize: '500sqm',
    prototypeDetails: {
      bedrooms: 4,
      bathrooms: 3,
      features: ['Swimming Pool', 'Garden', 'Parking'],
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop'
    },
    plots: [
      { id: '1', plotId: 'A-001', size: '500sqm', price: '₦25,000,000', status: 'sold', client: 'John Doe', bedrooms: 4, bathrooms: 3 },
      { id: '2', plotId: 'A-002', size: '500sqm', price: '₦25,000,000', status: 'available', client: null, bedrooms: 4, bathrooms: 3 },
      { id: '3', plotId: 'A-003', size: '500sqm', price: '₦25,000,000', status: 'reserved', client: 'Jane Smith', bedrooms: 4, bathrooms: 3 },
    ]
  },
  {
    id: 'B',
    name: 'Block B',
    type: 'bungalow',
    description: 'Single-story bungalow plots',
    totalPlots: 25,
    availablePlots: 12,
    reservedPlots: 5,
    soldPlots: 8,
    status: 'construction',
    defaultPrice: '₦18,000,000',
    defaultSize: '400sqm',
    prototypeDetails: {
      bedrooms: 3,
      bathrooms: 2,
      features: ['Garden', 'Parking'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop'
    },
    plots: [
      { id: '4', plotId: 'B-001', size: '400sqm', price: '₦18,000,000', status: 'sold', client: 'Mike Johnson', bedrooms: 3, bathrooms: 2 },
      { id: '5', plotId: 'B-002', size: '400sqm', price: '₦18,000,000', status: 'available', client: null, bedrooms: 3, bathrooms: 2 },
    ]
  }
];

export function EnhancedBlocksTab({ project }: EnhancedBlocksTabProps) {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [isEditBlockOpen, setIsEditBlockOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [isAllocateUnitOpen, setIsAllocateUnitOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [usePrototype, setUsePrototype] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'construction':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'sold':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-orange-100 text-orange-800';
      case 'available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddBlock = (formData: FormData) => {
    const newBlock = {
      id: String.fromCharCode(65 + blocks.length),
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      totalPlots: parseInt(formData.get('totalPlots') as string),
      availablePlots: parseInt(formData.get('totalPlots') as string),
      reservedPlots: 0,
      soldPlots: 0,
      status: 'planning',
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      prototypeDetails: {
        bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
        bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()) || [],
        image: formData.get('prototypeImage') as string || ''
      },
      plots: []
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success('Block added successfully!');
    setIsAddBlockOpen(false);
  };

  const handleEditBlock = (formData: FormData) => {
    if (!selectedBlock) return;
    
    const updatedBlock = {
      ...selectedBlock,
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      prototypeDetails: {
        bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
        bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()) || [],
        image: formData.get('prototypeImage') as string || selectedBlock.prototypeDetails?.image || ''
      }
    };
    
    setBlocks(blocks.map(block => 
      block.id === selectedBlock.id ? updatedBlock : block
    ));
    toast.success('Block updated successfully!');
    setIsEditBlockOpen(false);
    setSelectedBlock(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    toast.success('Block deleted successfully!');
  };

  const handleAddUnit = (formData: FormData) => {
    if (!selectedBlock) return;

    const blockPrototype = selectedBlock.prototypeDetails;
    const newUnit = {
      id: `${selectedBlock.units.length + 1}`,
      plotId: formData.get('plotId') as string,
      size: usePrototype ? selectedBlock.defaultSize : (formData.get('size') as string),
      price: usePrototype ? selectedBlock.defaultPrice : (formData.get('price') as string),
      bedrooms: usePrototype ? blockPrototype?.bedrooms : parseInt(formData.get('bedrooms') as string) || 0,
      bathrooms: usePrototype ? blockPrototype?.bathrooms : parseInt(formData.get('bathrooms') as string) || 0,
      status: 'available',
      client: null
    };

    const updatedBlock = {
      ...selectedBlock,
      units: [...selectedBlock.units, newUnit],
      totalUnits: selectedBlock.totalUnits + 1,
      availableUnits: selectedBlock.availableUnits + 1
    };

    setBlocks(blocks.map(block => 
      block.id === selectedBlock.id ? updatedBlock : block
    ));
    
    setSelectedBlock(updatedBlock);
    toast.success('Unit added successfully!');
    setIsAddUnitOpen(false);
  };

  const handleEditUnit = (formData: FormData) => {
    if (!selectedBlock || !selectedUnit) return;

    const updatedUnit = {
      ...selectedUnit,
      plotId: formData.get('plotId') as string,
      size: formData.get('size') as string,
      price: formData.get('price') as string,
      bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
      bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
    };

    const updatedBlock = {
      ...selectedBlock,
      units: selectedBlock.units.map((unit: any) => 
        unit.id === selectedUnit.id ? updatedUnit : unit
      )
    };

    setBlocks(blocks.map(block => 
      block.id === selectedBlock.id ? updatedBlock : block
    ));
    
    setSelectedBlock(updatedBlock);
    toast.success('Unit updated successfully!');
    setIsEditUnitOpen(false);
    setSelectedUnit(null);
  };

  const handleDeleteUnit = (unitId: string) => {
    if (!selectedBlock) return;

    const unitToDelete = selectedBlock.units.find((unit: any) => unit.id === unitId);
    const updatedBlock = {
      ...selectedBlock,
      units: selectedBlock.units.filter((unit: any) => unit.id !== unitId),
      totalUnits: selectedBlock.totalUnits - 1,
      availableUnits: unitToDelete?.status === 'available' ? selectedBlock.availableUnits - 1 : selectedBlock.availableUnits,
      soldUnits: unitToDelete?.status === 'sold' ? selectedBlock.soldUnits - 1 : selectedBlock.soldUnits,
      reservedUnits: unitToDelete?.status === 'reserved' ? selectedBlock.reservedUnits - 1 : selectedBlock.reservedUnits
    };

    setBlocks(blocks.map(block => 
      block.id === selectedBlock.id ? updatedBlock : block
    ));
    
    setSelectedBlock(updatedBlock);
    toast.success('Unit deleted successfully!');
  };

  const handleAllocateUnit = (unitId: string) => {
    const unit = selectedBlock?.units.find((u: any) => u.id === unitId);
    if (unit) {
      setSelectedUnit(unit);
      setIsAllocateUnitOpen(true);
    }
  };

  const totalPlots = blocks.reduce((sum, block) => sum + block.totalPlots, 0);
  const totalSold = blocks.reduce((sum, block) => sum + block.soldPlots, 0);
  const totalReserved = blocks.reduce((sum, block) => sum + block.reservedPlots, 0);
  const totalAvailable = blocks.reduce((sum, block) => sum + block.availablePlots, 0);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Block Details</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsAddBlockOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Block
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalPlots}</div>
                  <div className="text-sm text-gray-500">Total Plots</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalSold}</div>
                  <div className="text-sm text-gray-500">Sold Plots</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalReserved}</div>
                  <div className="text-sm text-gray-500">Reserved Plots</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalAvailable}</div>
                  <div className="text-sm text-gray-500">Available Plots</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => (
              <Card key={block.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600" />
                      {block.name}
                    </CardTitle>
                    <Badge className={getStatusColor(block.status)}>
                      {block.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600">
                    {block.description}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-900">{block.totalPlots}</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">{block.soldPlots}</div>
                      <div className="text-gray-500">Sold</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-semibold text-orange-600">{block.reservedPlots}</div>
                      <div className="text-gray-500">Reserved</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">{block.availablePlots}</div>
                      <div className="text-gray-500">Available</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(block.soldPlots / block.totalPlots) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {Math.round((block.soldPlots / block.totalPlots) * 100)}% sold
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedBlock(block);
                        setIsEditBlockOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedBlock(block);
                        setActiveTab('details');
                      }}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Plots
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Block</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {block.name}? This will also delete all units in this block.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDeleteBlock(block.id)}
                          >
                            Delete Block
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {selectedBlock ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('overview')}
                  >
                    ← Back to Overview
                  </Button>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedBlock.name} Units</h3>
                    <p className="text-sm text-gray-500">{selectedBlock.description}</p>
                  </div>
                </div>
                <Button onClick={() => setIsAddUnitOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </div>

              {/* Prototype Details */}
              {selectedBlock.prototypeDetails && (
                <Card>
                  <CardHeader>
                    <CardTitle>Prototype Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p><strong>Bedrooms:</strong> {selectedBlock.prototypeDetails.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> {selectedBlock.prototypeDetails.bathrooms}</p>
                        <p><strong>Default Size:</strong> {selectedBlock.defaultSize}</p>
                        <p><strong>Default Price:</strong> {selectedBlock.defaultPrice}</p>
                        <div>
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {selectedBlock.prototypeDetails.features.map((feature: string, index: number) => (
                              <li key={index} className="text-sm">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {selectedBlock.prototypeDetails.image && (
                        <div>
                          <img 
                            src={selectedBlock.prototypeDetails.image} 
                            alt="Prototype" 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Units Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Units ({selectedBlock.units.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plot ID</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Bedrooms</TableHead>
                        <TableHead>Bathrooms</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedBlock.units.map((unit: any) => (
                        <TableRow key={unit.id}>
                          <TableCell className="font-medium">{unit.plotId}</TableCell>
                          <TableCell>{unit.size}</TableCell>
                          <TableCell>{unit.price}</TableCell>
                          <TableCell>{unit.bedrooms}</TableCell>
                          <TableCell>{unit.bathrooms}</TableCell>
                          <TableCell>
                            <Badge className={getUnitStatusColor(unit.status)}>
                              {unit.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{unit.client || '-'}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUnit(unit);
                                  setIsEditUnitOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              {unit.status === 'available' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAllocateUnit(unit.id)}
                                >
                                  <UserPlus className="h-3 w-3" />
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="text-red-600">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Unit</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete unit {unit.plotId}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() => handleDeleteUnit(unit.id)}
                                    >
                                      Delete Unit
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Block Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a block from the overview to view its units
              </p>
              <Button onClick={() => setActiveTab('overview')}>
                Go to Overview
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Block Modal */}
      <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Block</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddBlock(formData);
          }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="blockName">Block Name</Label>
                <Input id="blockName" name="blockName" placeholder="e.g., Block D" required />
              </div>
              <div>
                <Label htmlFor="blockType">Block Type</Label>
                <Select name="blockType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Brief description" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="totalUnits">Total Units</Label>
                <Input id="totalUnits" name="totalUnits" type="number" placeholder="e.g., 20" required />
              </div>
              <div>
                <Label htmlFor="defaultPrice">Default Unit Price</Label>
                <Input id="defaultPrice" name="defaultPrice" placeholder="e.g., ₦25,000,000" />
              </div>
              <div>
                <Label htmlFor="defaultSize">Default Unit Size</Label>
                <Input id="defaultSize" name="defaultSize" placeholder="e.g., 500sqm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" placeholder="e.g., 4" />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" placeholder="e.g., 3" />
              </div>
            </div>
            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" name="features" placeholder="e.g., Swimming Pool, Garden, Parking" />
            </div>
            <div>
              <Label htmlFor="prototypeImage">Prototype Image URL (optional)</Label>
              <Input id="prototypeImage" name="prototypeImage" type="url" placeholder="https://..." />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Block</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddBlockOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Block Modal */}
      <Dialog open={isEditBlockOpen} onOpenChange={setIsEditBlockOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Block</DialogTitle>
          </DialogHeader>
          {selectedBlock && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleEditBlock(formData);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blockName">Block Name</Label>
                  <Input id="blockName" name="blockName" defaultValue={selectedBlock.name} required />
                </div>
                <div>
                  <Label htmlFor="blockType">Block Type</Label>
                  <Select name="blockType" defaultValue={selectedBlock.type} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={selectedBlock.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultPrice">Default Unit Price</Label>
                  <Input id="defaultPrice" name="defaultPrice" defaultValue={selectedBlock.defaultPrice} />
                </div>
                <div>
                  <Label htmlFor="defaultSize">Default Unit Size</Label>
                  <Input id="defaultSize" name="defaultSize" defaultValue={selectedBlock.defaultSize} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" type="number" defaultValue={selectedBlock.prototypeDetails?.bedrooms} />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" name="bathrooms" type="number" defaultValue={selectedBlock.prototypeDetails?.bathrooms} />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input id="features" name="features" defaultValue={selectedBlock.prototypeDetails?.features?.join(', ')} />
              </div>
              <div>
                <Label htmlFor="prototypeImage">Prototype Image URL</Label>
                <Input id="prototypeImage" name="prototypeImage" type="url" defaultValue={selectedBlock.prototypeDetails?.image} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Update Block</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditBlockOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Unit Modal */}
      <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Unit to {selectedBlock?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddUnit(formData);
          }} className="space-y-4">
            <div>
              <Label htmlFor="plotId">Plot ID</Label>
              <Input id="plotId" name="plotId" placeholder="e.g., A-004" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="usePrototype" 
                checked={usePrototype} 
                onCheckedChange={(checked) => setUsePrototype(checked === true)}
              />
              <Label htmlFor="usePrototype">Use prototype details for this unit</Label>
            </div>
            {!usePrototype && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Input id="size" name="size" placeholder="e.g., 500sqm" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" placeholder="e.g., ₦25,000,000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" placeholder="e.g., 4" />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" placeholder="e.g., 3" />
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-2">
              <Button type="submit">Add Unit</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Modal */}
      <Dialog open={isEditUnitOpen} onOpenChange={setIsEditUnitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
          </DialogHeader>
          {selectedUnit && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleEditUnit(formData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="plotId">Plot ID</Label>
                <Input id="plotId" name="plotId" defaultValue={selectedUnit.plotId} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input id="size" name="size" defaultValue={selectedUnit.size} />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" defaultValue={selectedUnit.price} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" type="number" defaultValue={selectedUnit.bedrooms} />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" name="bathrooms" type="number" defaultValue={selectedUnit.bathrooms} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Update Unit</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditUnitOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Allocate Unit Modal */}
      <AllocateUnitModal
        isOpen={isAllocateUnitOpen}
        onClose={() => {
          setIsAllocateUnitOpen(false);
          setSelectedUnit(null);
        }}
        onSubmit={() => {
          toast.success('Unit allocated successfully!');
          setIsAllocateUnitOpen(false);
          setSelectedUnit(null);
        }}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, Plus, Edit, Trash2, Users, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { AllocateUnitModal } from '@/components/dashboard/sales-allocation/AllocateUnitModal';

interface ProjectBlocksTabProps {
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
    description: 'Luxury duplex units with modern amenities',
    totalUnits: 30,
    availableUnits: 8,
    reservedUnits: 7,
    soldUnits: 15,
    status: 'completed',
    defaultPrice: '₦25,000,000',
    defaultSize: '500sqm',
    prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png',
    units: [
      { 
        id: '1', 
        plotId: 'A-001', 
        size: '500sqm', 
        price: '₦25,000,000', 
        status: 'sold', 
        client: 'John Doe',
        prototypeDetails: 'Modern duplex with 4 bedrooms, 3 bathrooms, living room, kitchen, and garden',
        prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
      },
      { 
        id: '2', 
        plotId: 'A-002', 
        size: '500sqm', 
        price: '₦25,000,000', 
        status: 'available', 
        client: null,
        prototypeDetails: 'Modern duplex with 4 bedrooms, 3 bathrooms, living room, kitchen, and garden',
        prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
      },
      { 
        id: '3', 
        plotId: 'A-003', 
        size: '500sqm', 
        price: '₦25,000,000', 
        status: 'reserved', 
        client: 'Jane Smith',
        prototypeDetails: 'Modern duplex with 4 bedrooms, 3 bathrooms, living room, kitchen, and garden',
        prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
      },
    ]
  },
  {
    id: 'B',
    name: 'Block B',
    type: 'bungalow',
    description: 'Single-story bungalow units',
    totalUnits: 25,
    availableUnits: 12,
    reservedUnits: 5,
    soldUnits: 8,
    status: 'construction',
    defaultPrice: '₦18,000,000',
    defaultSize: '400sqm',
    prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png',
    units: [
      { 
        id: '4', 
        plotId: 'B-001', 
        size: '400sqm', 
        price: '₦18,000,000', 
        status: 'sold', 
        client: 'Mike Johnson',
        prototypeDetails: '3 bedroom bungalow with modern amenities',
        prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
      },
      { 
        id: '5', 
        plotId: 'B-002', 
        size: '400sqm', 
        price: '₦18,000,000', 
        status: 'available', 
        client: null,
        prototypeDetails: '3 bedroom bungalow with modern amenities',
        prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
      },
    ]
  }
];

export function NewProjectBlocksTab({ project }: ProjectBlocksTabProps) {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [selectedBlockForUnit, setSelectedBlockForUnit] = useState<string>('');
  const [allocatingUnit, setAllocatingUnit] = useState<any>(null);
  const [useDefaultPrototype, setUseDefaultPrototype] = useState(true);

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

  const handleAddBlock = (formData: FormData) => {
    const newBlock = {
      id: String.fromCharCode(65 + blocks.length),
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      totalUnits: parseInt(formData.get('totalUnits') as string),
      availableUnits: parseInt(formData.get('totalUnits') as string),
      reservedUnits: 0,
      soldUnits: 0,
      status: 'planning',
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      prototypeImage: '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png',
      units: []
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success('Block added successfully!');
    setIsAddBlockOpen(false);
  };

  const handleAddUnit = (formData: FormData) => {
    const blockId = formData.get('blockId') as string;
    const block = blocks.find(b => b.id === blockId);
    
    if (!block) return;

    const newUnit = {
      id: Date.now().toString(),
      plotId: formData.get('plotId') as string,
      size: formData.get('size') as string,
      price: formData.get('price') as string,
      status: 'available',
      client: null,
      prototypeDetails: useDefaultPrototype ? 
        `Standard ${block.type} unit with modern amenities` : 
        formData.get('prototypeDetails') as string,
      prototypeImage: useDefaultPrototype ? 
        block.prototypeImage : 
        '/lovable-uploads/64c4e701-f813-4adb-894b-5a95ea66268c.png'
    };

    const updatedBlocks = blocks.map(b => 
      b.id === blockId 
        ? { ...b, units: [...b.units, newUnit], availableUnits: b.availableUnits + 1, totalUnits: b.totalUnits + 1 }
        : b
    );
    
    setBlocks(updatedBlocks);
    toast.success('Unit added successfully!');
    setIsAddUnitOpen(false);
    setSelectedBlockForUnit('');
    setUseDefaultPrototype(true);
  };

  const handleEditBlock = (block: any) => {
    setEditingBlock(block);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    toast.success('Block deleted successfully!');
  };

  const handleEditUnit = (unit: any) => {
    setEditingUnit(unit);
  };

  const handleDeleteUnit = (unitId: string, blockId: string) => {
    const updatedBlocks = blocks.map(block => {
      if (block.id === blockId) {
        const updatedUnits = block.units.filter(unit => unit.id !== unitId);
        return {
          ...block,
          units: updatedUnits,
          totalUnits: block.totalUnits - 1,
          availableUnits: block.availableUnits - 1
        };
      }
      return block;
    });
    
    setBlocks(updatedBlocks);
    toast.success('Unit deleted successfully!');
  };

  const handleAllocateUnit = (unit: any) => {
    setAllocatingUnit(unit);
  };

  const totalUnits = blocks.reduce((sum, block) => sum + block.totalUnits, 0);
  const totalSold = blocks.reduce((sum, block) => sum + block.soldUnits, 0);
  const totalReserved = blocks.reduce((sum, block) => sum + block.reservedUnits, 0);
  const totalAvailable = blocks.reduce((sum, block) => sum + block.availableUnits, 0);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blocks">Block Management</TabsTrigger>
          <TabsTrigger value="units">Unit Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalUnits}</div>
                  <div className="text-sm text-muted-foreground">Total Units</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalSold}</div>
                  <div className="text-sm text-muted-foreground">Sold Units</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalReserved}</div>
                  <div className="text-sm text-muted-foreground">Reserved Units</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalAvailable}</div>
                  <div className="text-sm text-muted-foreground">Available Units</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blocks Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => (
              <Card key={block.id} className="cursor-pointer hover:shadow-md transition-shadow">
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
                  <div className="text-sm text-muted-foreground">
                    {block.description}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-semibold">{block.totalUnits}</div>
                      <div className="text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">{block.soldUnits}</div>
                      <div className="text-muted-foreground">Sold</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-semibold text-orange-600">{block.reservedUnits}</div>
                      <div className="text-muted-foreground">Reserved</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">{block.availableUnits}</div>
                      <div className="text-muted-foreground">Available</div>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(block.soldUnits / block.totalUnits) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {Math.round((block.soldUnits / block.totalUnits) * 100)}% sold
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Block Management</h2>
            <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Block
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Block</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddBlock(formData);
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="blockName">Block Name</Label>
                    <Input id="blockName" name="blockName" placeholder="e.g., Block C" required />
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
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Brief description" />
                  </div>
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
                  <div className="flex gap-2">
                    <Button type="submit">Add Block</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddBlockOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blocks Grid with Management */}
          <div className="grid grid-cols-1 gap-4">
            {blocks.map((block) => (
              <Card key={block.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Building className="h-5 w-5 mr-2 text-blue-600" />
                        {block.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{block.type} • {block.totalUnits} units</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlock(block)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Block
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete Block
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Block</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {block.name}? This will also remove all units in this block and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDeleteBlock(block.id)}
                            >
                              Delete Block
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{block.description}</p>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{block.totalUnits}</div>
                      <div className="text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">{block.availableUnits}</div>
                      <div className="text-muted-foreground">Available</div>
                    </div>
                    <div>
                      <div className="font-medium text-orange-600">{block.reservedUnits}</div>
                      <div className="text-muted-foreground">Reserved</div>
                    </div>
                    <div>
                      <div className="font-medium text-red-600">{block.soldUnits}</div>
                      <div className="text-muted-foreground">Sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Unit Management</h2>
            <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Unit</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddUnit(formData);
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="blockId">Block</Label>
                    <Select name="blockId" value={selectedBlockForUnit} onValueChange={setSelectedBlockForUnit} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        {blocks.map((block) => (
                          <SelectItem key={block.id} value={block.id}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="plotId">Plot ID</Label>
                      <Input id="plotId" name="plotId" placeholder="e.g., A-004" required />
                    </div>
                    <div>
                      <Label htmlFor="size">Size</Label>
                      <Input id="size" name="size" placeholder="e.g., 500sqm" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" placeholder="e.g., ₦25,000,000" required />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="useDefaultPrototype" 
                        checked={useDefaultPrototype}
                        onCheckedChange={(checked) => setUseDefaultPrototype(checked as boolean)}
                      />
                      <Label htmlFor="useDefaultPrototype">Use default prototype for all units in this block</Label>
                    </div>

                    {!useDefaultPrototype && (
                      <>
                        <div>
                          <Label htmlFor="prototypeDetails">Prototype Details</Label>
                          <Textarea 
                            id="prototypeDetails" 
                            name="prototypeDetails" 
                            placeholder="Describe the unit prototype..."
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="prototypeImage">Prototype Image (Optional)</Label>
                          <Input 
                            id="prototypeImage" 
                            name="prototypeImage" 
                            type="file" 
                            accept="image/*"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Add Unit</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Units Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Plot ID</th>
                      <th className="text-left p-4 font-medium">Block</th>
                      <th className="text-left p-4 font-medium">Size</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Client</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.flatMap(block => 
                      block.units.map(unit => (
                        <tr key={unit.id} className="border-b">
                          <td className="p-4 font-medium">{unit.plotId}</td>
                          <td className="p-4">{block.name}</td>
                          <td className="p-4">{unit.size}</td>
                          <td className="p-4 font-medium">{unit.price}</td>
                          <td className="p-4">
                            <Badge className={getUnitStatusColor(unit.status)}>
                              {unit.status}
                            </Badge>
                          </td>
                          <td className="p-4">{unit.client || '-'}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              {unit.status === 'available' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleAllocateUnit(unit)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Allocate Unit
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditUnit(unit)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Unit</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete unit {unit.plotId}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-destructive hover:bg-destructive/90"
                                      onClick={() => handleDeleteUnit(unit.id, block.id)}
                                    >
                                      Delete Unit
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Allocate Unit Modal */}
      {allocatingUnit && (
        <AllocateUnitModal
          isOpen={!!allocatingUnit}
          onClose={() => setAllocatingUnit(null)}
          onSubmit={() => {
            toast.success('Unit allocated successfully!');
            setAllocatingUnit(null);
          }}
        />
      )}
    </div>
  );
}
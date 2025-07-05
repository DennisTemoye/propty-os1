import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, Plus, Edit, Trash2, Users, UserPlus, Image as ImageIcon, Save } from 'lucide-react';
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
    description: 'Luxury duplex units with modern amenities',
    totalUnits: 30,
    availableUnits: 8,
    reservedUnits: 7,
    soldUnits: 15,
    status: 'completed',
    defaultPrice: '₦25,000,000',
    defaultSize: '500sqm',
    prototypeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    prototypeDetails: {
      bedrooms: 4,
      bathrooms: 3,
      parkingSpaces: 2,
      features: ['Swimming Pool Access', 'Gym', 'Security', 'Power Backup']
    },
    units: [
      { id: '1', plotId: 'A-001', size: '500sqm', price: '₦25,000,000', status: 'sold', client: 'John Doe', bedrooms: 4, bathrooms: 3, parkingSpaces: 2 },
      { id: '2', plotId: 'A-002', size: '500sqm', price: '₦25,000,000', status: 'available', client: null, bedrooms: 4, bathrooms: 3, parkingSpaces: 2 },
      { id: '3', plotId: 'A-003', size: '500sqm', price: '₦25,000,000', status: 'reserved', client: 'Jane Smith', bedrooms: 4, bathrooms: 3, parkingSpaces: 2 },
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
    prototypeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=300&fit=crop',
    prototypeDetails: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 1,
      features: ['Garden Space', 'Security', 'Power Backup']
    },
    units: [
      { id: '4', plotId: 'B-001', size: '400sqm', price: '₦18,000,000', status: 'sold', client: 'Mike Johnson', bedrooms: 3, bathrooms: 2, parkingSpaces: 1 },
      { id: '5', plotId: 'B-002', size: '400sqm', price: '₦18,000,000', status: 'available', client: null, bedrooms: 3, bathrooms: 2, parkingSpaces: 1 },
    ]
  }
];

export function EnhancedBlocksTab({ project }: EnhancedBlocksTabProps) {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [isEditBlockOpen, setIsEditBlockOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [usePrototypeForAll, setUsePrototypeForAll] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'construction': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
      prototypeImage: formData.get('prototypeImage') as string || '',
      prototypeDetails: {
        bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
        bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
        parkingSpaces: parseInt(formData.get('parkingSpaces') as string) || 0,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()) || []
      },
      units: []
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success('Block added successfully!');
    setIsAddBlockOpen(false);
  };

  const handleEditBlock = (block: any) => {
    setEditingBlock(block);
    setIsEditBlockOpen(true);
  };

  const handleUpdateBlock = (formData: FormData) => {
    const updatedBlock = {
      ...editingBlock,
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      prototypeImage: formData.get('prototypeImage') as string || editingBlock.prototypeImage,
      prototypeDetails: {
        bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
        bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
        parkingSpaces: parseInt(formData.get('parkingSpaces') as string) || 0,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()) || []
      }
    };
    
    setBlocks(blocks.map(block => block.id === editingBlock.id ? updatedBlock : block));
    toast.success('Block updated successfully!');
    setIsEditBlockOpen(false);
    setEditingBlock(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    toast.success('Block deleted successfully!');
  };

  const handleAddUnit = (formData: FormData) => {
    if (!selectedBlock) return;
    
    const prototypeDetails = usePrototypeForAll ? selectedBlock.prototypeDetails : {
      bedrooms: parseInt(formData.get('bedrooms') as string) || 0,
      bathrooms: parseInt(formData.get('bathrooms') as string) || 0,
      parkingSpaces: parseInt(formData.get('parkingSpaces') as string) || 0,
    };

    const newUnit = {
      id: Date.now().toString(),
      plotId: formData.get('plotId') as string,
      size: formData.get('size') as string || selectedBlock.defaultSize,
      price: formData.get('price') as string || selectedBlock.defaultPrice,
      status: 'available',
      client: null,
      ...prototypeDetails,
      customImage: formData.get('customImage') as string || ''
    };
    
    const updatedBlocks = blocks.map(block => 
      block.id === selectedBlock.id 
        ? { ...block, units: [...block.units, newUnit], availableUnits: block.availableUnits + 1 }
        : block
    );
    
    setBlocks(updatedBlocks);
    toast.success('Unit added successfully!');
    setIsAddUnitOpen(false);
    setSelectedBlock(null);
    setUsePrototypeForAll(false);
  };

  const totalUnits = blocks.reduce((sum, block) => sum + block.totalUnits, 0);
  const totalSold = blocks.reduce((sum, block) => sum + block.soldUnits, 0);
  const totalReserved = blocks.reduce((sum, block) => sum + block.reservedUnits, 0);
  const totalAvailable = blocks.reduce((sum, block) => sum + block.availableUnits, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blocks & Units Management</h2>
        <Button onClick={() => setIsAddBlockOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Block
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalUnits}</div>
            <div className="text-sm text-muted-foreground">Total Units</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalSold}</div>
            <div className="text-sm text-muted-foreground">Sold Units</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{totalReserved}</div>
            <div className="text-sm text-muted-foreground">Reserved Units</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalAvailable}</div>
            <div className="text-sm text-muted-foreground">Available Units</div>
          </CardContent>
        </Card>
      </div>

      {/* Blocks List */}
      {blocks.map((block) => (
        <Card key={block.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">{block.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{block.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(block.status)}>{block.status}</Badge>
                <Button size="sm" variant="outline" onClick={() => handleEditBlock(block)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit Block
                </Button>
                <Button size="sm" onClick={() => { setSelectedBlock(block); setIsAddUnitOpen(true); }}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Unit
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
                        Are you sure you want to delete {block.name}? This will remove all units.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteBlock(block.id)}>
                        Delete Block
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Block Stats */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="font-bold text-blue-600">{block.totalUnits}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="font-bold text-green-600">{block.soldUnits}</div>
                <div className="text-xs text-muted-foreground">Sold</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="font-bold text-orange-600">{block.reservedUnits}</div>
                <div className="text-xs text-muted-foreground">Reserved</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="font-bold text-purple-600">{block.availableUnits}</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>

            {/* Prototype Details */}
            {block.prototypeImage && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Block Prototype</h4>
                <div className="flex gap-4">
                  <img src={block.prototypeImage} alt="Prototype" className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Bedrooms: {block.prototypeDetails.bedrooms}</span>
                      <span>Bathrooms: {block.prototypeDetails.bathrooms}</span>
                      <span>Parking: {block.prototypeDetails.parkingSpaces}</span>
                      <span>Features: {block.prototypeDetails.features.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Units Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot ID</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {block.units?.map((unit: any) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.plotId}</TableCell>
                    <TableCell>{unit.size}</TableCell>
                    <TableCell>{unit.price}</TableCell>
                    <TableCell className="text-sm">
                      {unit.bedrooms}BR, {unit.bathrooms}BA, {unit.parkingSpaces}P
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(unit.status)}>{unit.status}</Badge>
                    </TableCell>
                    <TableCell>{unit.client || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {unit.status === 'available' && (
                          <Button size="sm" onClick={() => { setSelectedUnit(unit); setIsAllocateOpen(true); }}>
                            <UserPlus className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => { setSelectedUnit(unit); setIsEditUnitOpen(true); }}>
                          <Edit className="h-3 w-3" />
                        </Button>
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
                              <AlertDialogAction onClick={() => {
                                const updatedBlocks = blocks.map(b => 
                                  b.id === block.id 
                                    ? { ...b, units: b.units.filter((u: any) => u.id !== unit.id), availableUnits: b.availableUnits - 1 }
                                    : b
                                );
                                setBlocks(updatedBlocks);
                                toast.success('Unit deleted successfully!');
                              }}>
                                Delete Unit
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )) || (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No units in this block. Click "Add Unit" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Add Block Modal */}
      <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Block</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddBlock(new FormData(e.currentTarget));
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
                <Input id="totalUnits" name="totalUnits" type="number" placeholder="20" required />
              </div>
              <div>
                <Label htmlFor="defaultPrice">Default Price</Label>
                <Input id="defaultPrice" name="defaultPrice" placeholder="₦25,000,000" />
              </div>
              <div>
                <Label htmlFor="defaultSize">Default Size</Label>
                <Input id="defaultSize" name="defaultSize" placeholder="500sqm" />
              </div>
            </div>
            <div>
              <Label htmlFor="prototypeImage">Prototype Image URL</Label>
              <Input id="prototypeImage" name="prototypeImage" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" placeholder="4" />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" placeholder="3" />
              </div>
              <div>
                <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                <Input id="parkingSpaces" name="parkingSpaces" type="number" placeholder="2" />
              </div>
            </div>
            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" name="features" placeholder="Swimming Pool, Gym, Security" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Block</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddBlockOpen(false)}>Cancel</Button>
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
          {editingBlock && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBlock(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blockName">Block Name</Label>
                  <Input id="blockName" name="blockName" defaultValue={editingBlock.name} required />
                </div>
                <div>
                  <Label htmlFor="blockType">Block Type</Label>
                  <Select name="blockType" defaultValue={editingBlock.type}>
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
                <Textarea id="description" name="description" defaultValue={editingBlock.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultPrice">Default Price</Label>
                  <Input id="defaultPrice" name="defaultPrice" defaultValue={editingBlock.defaultPrice} />
                </div>
                <div>
                  <Label htmlFor="defaultSize">Default Size</Label>
                  <Input id="defaultSize" name="defaultSize" defaultValue={editingBlock.defaultSize} />
                </div>
              </div>
              <div>
                <Label htmlFor="prototypeImage">Prototype Image URL</Label>
                <Input id="prototypeImage" name="prototypeImage" defaultValue={editingBlock.prototypeImage} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" type="number" defaultValue={editingBlock.prototypeDetails?.bedrooms} />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" name="bathrooms" type="number" defaultValue={editingBlock.prototypeDetails?.bathrooms} />
                </div>
                <div>
                  <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                  <Input id="parkingSpaces" name="parkingSpaces" type="number" defaultValue={editingBlock.prototypeDetails?.parkingSpaces} />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input id="features" name="features" defaultValue={editingBlock.prototypeDetails?.features?.join(', ')} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Update Block
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditBlockOpen(false)}>Cancel</Button>
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
            handleAddUnit(new FormData(e.currentTarget));
          }} className="space-y-4">
            <div>
              <Label htmlFor="plotId">Plot ID</Label>
              <Input id="plotId" name="plotId" placeholder="e.g., A-101" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">Size</Label>
                <Input id="size" name="size" placeholder="500sqm" />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" placeholder="₦25,000,000" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="usePrototype" 
                checked={usePrototypeForAll}
                onCheckedChange={(checked) => setUsePrototypeForAll(checked === true)}
              />
              <Label htmlFor="usePrototype">Use block prototype details for this unit</Label>
            </div>
            
            {!usePrototypeForAll && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" placeholder="4" />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" placeholder="3" />
                  </div>
                  <div>
                    <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                    <Input id="parkingSpaces" name="parkingSpaces" type="number" placeholder="2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customImage">Unit Image URL (Optional)</Label>
                  <Input id="customImage" name="customImage" placeholder="https://..." />
                </div>
              </>
            )}
            
            <div className="flex gap-2">
              <Button type="submit">Add Unit</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddUnitOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Allocate Unit Modal */}
      {selectedUnit && (
        <AllocateUnitModal
          isOpen={isAllocateOpen}
          onClose={() => {
            setIsAllocateOpen(false);
            setSelectedUnit(null);
          }}
          onSubmit={() => {
            toast.success('Unit allocated successfully!');
            setIsAllocateOpen(false);
            setSelectedUnit(null);
          }}
        />
      )}
    </div>
  );
}
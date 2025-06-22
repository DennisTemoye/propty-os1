
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Building, Users, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UnitEditModal } from './UnitEditModal';
import { toast } from 'sonner';

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
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [isEditBlockOpen, setIsEditBlockOpen] = useState(false);
  const [blocks, setBlocks] = useState([
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
  ]);

  const blockForm = useForm();
  const unitForm = useForm();

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
    if (editingBlock) {
      // Update existing block
      setBlocks(blocks.map(block => 
        block.id === editingBlock.id 
          ? { ...block, ...data, totalUnits: editingBlock.totalUnits }
          : block
      ));
      toast.success(`Block "${data.name}" updated successfully!`);
      setEditingBlock(null);
      setIsEditBlockOpen(false);
    } else {
      // Create new block
      const newBlock = {
        id: Date.now(),
        name: data.name,
        type: data.type,
        description: data.description,
        totalUnits: 0,
        availableUnits: 0,
        reservedUnits: 0,
        soldUnits: 0,
        units: []
      };
      setBlocks([...blocks, newBlock]);
      toast.success(`Block "${data.name}" created successfully!`);
    }
    setIsNewBlockOpen(false);
    blockForm.reset();
  };

  const onSubmitUnit = (data: any) => {
    const selectedBlockId = parseInt(data.blockId);
    const newUnit = {
      id: Date.now(),
      plotId: data.plotId,
      size: data.size,
      price: data.price,
      status: 'available',
      client: null
    };

    setBlocks(blocks.map(block => {
      if (block.id === selectedBlockId) {
        return {
          ...block,
          units: [...block.units, newUnit],
          totalUnits: block.totalUnits + 1,
          availableUnits: block.availableUnits + 1
        };
      }
      return block;
    }));

    toast.success(`Unit "${data.plotId}" added successfully!`);
    setIsNewUnitOpen(false);
    unitForm.reset();
  };

  const handleEditBlock = (block: any) => {
    setEditingBlock(block);
    blockForm.reset({
      name: block.name,
      type: block.type,
      description: block.description
    });
    setIsEditBlockOpen(true);
  };

  const handleDeleteBlock = (blockId: number) => {
    const blockToDelete = blocks.find(b => b.id === blockId);
    if (blockToDelete && blockToDelete.units.length > 0) {
      toast.error('Cannot delete block with existing units. Remove all units first.');
      return;
    }
    
    setBlocks(blocks.filter(block => block.id !== blockId));
    toast.success('Block deleted successfully!');
  };

  const handleEditUnit = (unit: any) => {
    setEditingUnit(unit);
  };

  const handleDeleteUnit = (unitId: number) => {
    setBlocks(blocks.map(block => ({
      ...block,
      units: block.units.filter(unit => unit.id !== unitId),
      totalUnits: block.units.filter(unit => unit.id !== unitId).length,
      availableUnits: block.units.filter(unit => unit.id !== unitId && unit.status === 'available').length,
      reservedUnits: block.units.filter(unit => unit.id !== unitId && unit.status === 'reserved').length,
      soldUnits: block.units.filter(unit => unit.id !== unitId && unit.status === 'sold').length
    })));
    toast.success('Unit deleted successfully!');
  };

  const handleManageUnits = (block: any) => {
    setSelectedBlock(block);
    setActiveTab('units');
  };

  const handleAssignUnit = (unit: any) => {
    onAssignUnit(unit);
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
                <div className="text-2xl font-bold text-blue-600">{blocks.length}</div>
                <div className="text-sm text-gray-500">Total Blocks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {blocks.reduce((sum, block) => sum + block.totalUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Units</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {blocks.reduce((sum, block) => sum + block.availableUnits, 0)}
                </div>
                <div className="text-sm text-gray-500">Available Units</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {blocks.reduce((sum, block) => sum + block.soldUnits, 0)}
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
                {blocks.map((block) => (
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
                      
                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
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

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${block.totalUnits > 0 ? (block.soldUnits / block.totalUnits) * 100 : 0}%` }}
                        ></div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManageUnits(block)}
                          className="flex-1"
                        >
                          <Building className="h-3 w-3 mr-1" />
                          Manage Units
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditBlock(block)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
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
                <form onSubmit={blockForm.handleSubmit(onSubmitBlock)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Block Name</label>
                    <Input placeholder="e.g., Block C" {...blockForm.register('name', { required: true })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Block Type</label>
                    <Select onValueChange={(value) => blockForm.setValue('type', value)}>
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
                    <Textarea placeholder="Brief description of the block" {...blockForm.register('description')} />
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
            {blocks.map((block) => (
              <Card key={block.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{block.name}</CardTitle>
                      <p className="text-sm text-gray-600">{block.type} • {block.totalUnits} units</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlock(block)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManageUnits(block)}
                      >
                        <Building className="h-3 w-3 mr-1" />
                        Manage Units
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Block</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{block.name}"? This action cannot be undone.
                              {block.units.length > 0 && " You must remove all units from this block first."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDeleteBlock(block.id)}
                              disabled={block.units.length > 0}
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
                <form onSubmit={unitForm.handleSubmit(onSubmitUnit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Block</label>
                    <Select onValueChange={(value) => unitForm.setValue('blockId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        {blocks.map((block) => (
                          <SelectItem key={block.id} value={block.id.toString()}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plot ID</label>
                    <Input placeholder="e.g., Block A - Plot 06" {...unitForm.register('plotId', { required: true })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plot Size</label>
                    <Input placeholder="e.g., 500sqm" {...unitForm.register('size', { required: true })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input placeholder="e.g., ₦25M" {...unitForm.register('price', { required: true })} />
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

          {selectedBlock && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Filtering by: {selectedBlock.name}</h4>
                    <p className="text-sm text-gray-500">Showing units from {selectedBlock.name} only</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBlock(null)}>
                    Show All Units
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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
                  {blocks
                    .filter(block => !selectedBlock || block.id === selectedBlock.id)
                    .flatMap(block => 
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
                                  onClick={() => handleAssignUnit(unit)}
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
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Unit</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{unit.plotId}"? This action cannot be undone.
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
                      ))
                    )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Block Modal */}
      <Dialog open={isEditBlockOpen} onOpenChange={setIsEditBlockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Block</DialogTitle>
            <DialogDescription>
              Update block information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={blockForm.handleSubmit(onSubmitBlock)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Block Name</label>
              <Input placeholder="e.g., Block C" {...blockForm.register('name', { required: true })} />
            </div>
            <div>
              <label className="text-sm font-medium">Block Type</label>
              <Select onValueChange={(value) => blockForm.setValue('type', value)} defaultValue={editingBlock?.type}>
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
              <Textarea placeholder="Brief description of the block" {...blockForm.register('description')} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Update Block</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditBlockOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Unit Edit Modal */}
      <UnitEditModal 
        isOpen={!!editingUnit}
        onClose={() => setEditingUnit(null)}
        unit={editingUnit}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Trash2, Plus, Edit, Users } from 'lucide-react';
import { toast } from 'sonner';

interface BlockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: any;
  onUpdate: (blockData: any) => void;
  onDelete: (blockId: string) => void;
}

export function BlockDetailModal({ isOpen, onClose, block, onUpdate, onDelete }: BlockDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [blockData, setBlockData] = useState(block || {});

  if (!block) return null;

  const handleSave = () => {
    onUpdate(blockData);
    setIsEditing(false);
    toast.success('Block updated successfully!');
  };

  const handleDelete = () => {
    onDelete(block.id);
    onClose();
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{block.name} Details</DialogTitle>
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
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
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Delete Block
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Block
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">Units ({block.units?.length || 0})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Block Name</Label>
                  {isEditing ? (
                    <Input 
                      value={blockData.name || ''} 
                      onChange={(e) => setBlockData({...blockData, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm font-medium">{block.name}</p>
                  )}
                </div>
                
                <div>
                  <Label>Block Type</Label>
                  {isEditing ? (
                    <Select 
                      value={blockData.type || block.type} 
                      onValueChange={(value) => setBlockData({...blockData, type: value})}
                    >
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
                  ) : (
                    <p className="text-sm font-medium">{block.type}</p>
                  )}
                </div>

                <div>
                  <Label>Description</Label>
                  {isEditing ? (
                    <Input 
                      value={blockData.description || block.description} 
                      onChange={(e) => setBlockData({...blockData, description: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm">{block.description}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{block.totalUnits}</div>
                    <div className="text-sm text-gray-500">Total Units</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{block.availableUnits}</div>
                    <div className="text-sm text-gray-500">Available</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{block.reservedUnits}</div>
                    <div className="text-sm text-gray-500">Reserved</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{block.soldUnits}</div>
                    <div className="text-sm text-gray-500">Sold</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(block.soldUnits / block.totalUnits) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {Math.round((block.soldUnits / block.totalUnits) * 100)}% sold
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="units" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Unit Management</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot ID</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
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
                      <TableCell className="font-medium">{unit.price}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{unit.client || '-'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {unit.status === 'available' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Users className="h-3 w-3 mr-1" />
                              Assign
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No units found in this block
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="blockStatus">Block Status</Label>
                <Select 
                  value={blockData.status || block.status}
                  onValueChange={(value) => setBlockData({...blockData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unitPrice">Default Unit Price</Label>
                <Input 
                  id="unitPrice"
                  placeholder="e.g., ₦25,000,000"
                  value={blockData.defaultPrice || ''} 
                  onChange={(e) => setBlockData({...blockData, defaultPrice: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="unitSize">Default Unit Size</Label>
                <Input 
                  id="unitSize"
                  placeholder="e.g., 500sqm"
                  value={blockData.defaultSize || ''} 
                  onChange={(e) => setBlockData({...blockData, defaultSize: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Block Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Plus, Edit, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { BlockDetailModal } from './BlockDetailModal';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';
import { Project } from '@/types/project';

interface ProjectBlocksTabProps {
  project: Project;
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
    structureType: 'units',
    units: [
      { id: '1', plotId: 'A-001', size: '500sqm', price: '₦25,000,000', status: 'sold', client: 'John Doe', unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
      { id: '2', plotId: 'A-002', size: '500sqm', price: '₦25,000,000', status: 'available', client: null, unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
      { id: '3', plotId: 'A-003', size: '500sqm', price: '₦25,000,000', status: 'reserved', client: 'Jane Smith', unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
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
    structureType: 'units',
    units: [
      { id: '4', plotId: 'B-001', size: '400sqm', price: '₦18,000,000', status: 'sold', client: 'Mike Johnson', unitName: '3 Bedroom Bungalow', bedrooms: 3, bathrooms: 2 },
      { id: '5', plotId: 'B-002', size: '400sqm', price: '₦18,000,000', status: 'available', client: null, unitName: '3 Bedroom Bungalow', bedrooms: 3, bathrooms: 2 },
    ]
  },
  {
    id: 'C',
    name: 'Block C',
    type: 'land',
    description: 'Residential land plots for development',
    totalUnits: 20,
    availableUnits: 15,
    reservedUnits: 3,
    soldUnits: 2,
    status: 'planning',
    defaultPrice: '₦35,000,000',
    defaultSize: '300sqm',
    structureType: 'plots',
    units: [
      { id: '6', plotId: 'C-001', size: '300sqm', price: '₦35,000,000', status: 'sold', client: 'ABC Corp', prototype: 'Residential Plot' },
    ]
  }
];

export function ProjectBlocksTab({ project }: ProjectBlocksTabProps) {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isBlockDetailOpen, setIsBlockDetailOpen] = useState(false);
  
  const { labels } = useProjectTerminology(project);

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

  const handleAddBlock = (formData: FormData) => {
    const newBlock = {
      id: String.fromCharCode(65 + blocks.length), // A, B, C, D...
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      totalUnits: parseInt(formData.get('totalUnits') as string),
      availableUnits: parseInt(formData.get('totalUnits') as string),
      reservedUnits: 0,
      soldUnits: 0,
      status: 'planning' as const,
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      structureType: formData.get('structureType') as 'plots' | 'units',
      units: []
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success('Block added successfully!');
    setIsAddBlockOpen(false);
  };

  const handleBlockClick = (block: any) => {
    setSelectedBlock(block);
    setIsBlockDetailOpen(true);
  };

  const handleUpdateBlock = (updatedBlock: any) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? { ...block, ...updatedBlock } : block
    ));
    toast.success('Block updated successfully!');
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    toast.success('Block deleted successfully!');
  };

  const totalUnits = blocks.reduce((sum, block) => sum + block.totalUnits, 0);
  const totalSold = blocks.reduce((sum, block) => sum + block.soldUnits, 0);
  const totalReserved = blocks.reduce((sum, block) => sum + block.reservedUnits, 0);
  const totalAvailable = blocks.reduce((sum, block) => sum + block.availableUnits, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{labels.blockUnitsManagement}</h2>
        <div className="flex space-x-2">
          <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
            <DialogTrigger asChild>
              <Button>
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
                  <Input id="blockName" name="blockName" placeholder="e.g., Block D" required />
                </div>
                <div>
                  <Label htmlFor="structureType">Block Structure</Label>
                  <Select name="structureType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select structure type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plots">Plots (Land Development)</SelectItem>
                      <SelectItem value="units">Units (Housing/Buildings)</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="land">Land Plot</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" placeholder="Brief description" />
                </div>
                <div>
                  <Label htmlFor="totalUnits">Total {labels.units}</Label>
                  <Input id="totalUnits" name="totalUnits" type="number" placeholder="e.g., 20" required />
                </div>
                <div>
                  <Label htmlFor="defaultPrice">Default {labels.unit} Price</Label>
                  <Input id="defaultPrice" name="defaultPrice" placeholder="e.g., ₦25,000,000" />
                </div>
                <div>
                  <Label htmlFor="defaultSize">Default {labels.unit} Size</Label>
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalUnits}</div>
              <div className="text-sm text-gray-500">{labels.totalUnits}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalSold}</div>
              <div className="text-sm text-gray-500">{labels.soldUnits}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalReserved}</div>
              <div className="text-sm text-gray-500">{labels.reservedUnits}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalAvailable}</div>
              <div className="text-sm text-gray-500">{labels.availableUnits}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block) => (
          <Card key={block.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleBlockClick(block)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  {block.name}
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {block.structureType === 'plots' ? 'Plots' : 'Units'}
                  </Badge>
                  <Badge className={getStatusColor(block.status)}>
                    {block.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                {block.description}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{block.totalUnits}</div>
                  <div className="text-gray-500">Total</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-600">{block.soldUnits}</div>
                  <div className="text-gray-500">Sold</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="font-semibold text-orange-600">{block.reservedUnits}</div>
                  <div className="text-gray-500">Reserved</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-semibold text-blue-600">{block.availableUnits}</div>
                  <div className="text-gray-500">Available</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(block.soldUnits / block.totalUnits) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                {Math.round((block.soldUnits / block.totalUnits) * 100)}% sold
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlockClick(block);
                  }}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlockClick(block);
                  }}
                >
                  <Users className="h-3 w-3 mr-1" />
                  {labels.units}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Block Detail Modal */}
      {selectedBlock && (
        <BlockDetailModal
          isOpen={isBlockDetailOpen}
          onClose={() => {
            setIsBlockDetailOpen(false);
            setSelectedBlock(null);
          }}
          block={selectedBlock}
          onUpdate={handleUpdateBlock}
          onDelete={handleDeleteBlock}
        />
      )}
    </div>
  );
}

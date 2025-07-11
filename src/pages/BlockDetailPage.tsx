import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Trash2, Edit } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';
import { DynamicUnitsTable } from '@/components/dashboard/projects/DynamicUnitsTable';
import { AddUnitModal } from '@/components/dashboard/projects/AddUnitModal';
import { Block, Unit } from '@/types/project';

// Mock block data - in a real app, this would come from an API
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
    status: 'completed' as const,
    defaultPrice: '₦25,000,000',
    defaultSize: '500sqm',
    defaultPrototype: '5 Bedroom Duplex',
    structureType: 'units' as const,
    units: [
      { id: '1', plotId: 'A-001', size: '500sqm', price: '₦25,000,000', status: 'sold' as const, client: 'John Doe', unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
      { id: '2', plotId: 'A-002', size: '500sqm', price: '₦25,000,000', status: 'available' as const, client: null, unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
      { id: '3', plotId: 'A-003', size: '500sqm', price: '₦25,000,000', status: 'reserved' as const, client: 'Jane Smith', unitName: '5 Bedroom Duplex', bedrooms: 5, bathrooms: 4 },
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
    status: 'construction' as const,
    defaultPrice: '₦18,000,000',
    defaultSize: '400sqm',
    defaultPrototype: '3 Bedroom Bungalow',
    structureType: 'units' as const,
    units: [
      { id: '4', plotId: 'B-001', size: '400sqm', price: '₦18,000,000', status: 'sold' as const, client: 'Mike Johnson', unitName: '3 Bedroom Bungalow', bedrooms: 3, bathrooms: 2 },
      { id: '5', plotId: 'B-002', size: '400sqm', price: '₦18,000,000', status: 'available' as const, client: null, unitName: '3 Bedroom Bungalow', bedrooms: 3, bathrooms: 2 },
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
    status: 'planning' as const,
    defaultPrice: '₦35,000,000',
    defaultSize: '300sqm',
    defaultPrototype: 'Residential Plot',
    structureType: 'plots' as const,
    units: [
      { id: '6', plotId: 'C-001', size: '300sqm', price: '₦35,000,000', status: 'sold' as const, client: 'ABC Corp', prototype: 'Residential Plot' },
    ]
  }
];

export default function BlockDetailPage() {
  const navigate = useNavigate();
  const { projectId, blockId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  
  // Find the block - in a real app, this would be fetched from an API
  const block = mockBlocks.find(b => b.id === blockId);
  const [blockData, setBlockData] = useState<Block>(block || mockBlocks[0]);
  
  const { labels } = useProjectTerminology({ terminologyType: block?.structureType || 'plots' });

  if (!block) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Block Not Found</h2>
            <Button onClick={() => navigate(`/company/projects/${projectId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
    toast.success('Block updated successfully!');
  };

  const handleDelete = () => {
    // In a real app, this would delete via API
    toast.success('Block deleted successfully!');
    navigate(`/company/projects/${projectId}`);
  };

  const handleBack = () => {
    navigate(`/company/projects/${projectId}`);
  };

  const handleAddUnit = (newUnit: Unit) => {
    const updatedBlock = {
      ...blockData,
      units: [...(blockData.units || []), newUnit],
      totalUnits: (blockData.totalUnits || 0) + 1,
      availableUnits: newUnit.status === 'available' ? (blockData.availableUnits || 0) + 1 : blockData.availableUnits || 0,
      reservedUnits: newUnit.status === 'reserved' ? (blockData.reservedUnits || 0) + 1 : blockData.reservedUnits || 0,
      soldUnits: newUnit.status === 'sold' ? (blockData.soldUnits || 0) + 1 : blockData.soldUnits || 0,
    };
    setBlockData(updatedBlock);
    toast.success(`${labels.unit} added successfully!`);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={`${block.name} Details`}
        description={`Manage ${block.name} information and ${labels.unitsLower}`}
        onBack={handleBack}
        actions={
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
                    Are you sure you want to delete {block.name}? This will also remove all {labels.unitsLower} in this block and cannot be undone.
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
        }
      />
      
      <div className="max-w-none px-4 md:px-6 py-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">{labels.units} ({block.units?.length || 0})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Block Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Block Name</Label>
                    {isEditing ? (
                      <Input 
                        value={blockData.name || ''} 
                        onChange={(e) => setBlockData({...blockData, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{block.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Block Structure</Label>
                    {isEditing ? (
                      <Select 
                        value={blockData.structureType || block.structureType} 
                        onValueChange={(value: 'plots' | 'units') => setBlockData({...blockData, structureType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plots">Plots (Land Development)</SelectItem>
                          <SelectItem value="units">Units (Housing/Buildings)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium mt-1">{block.structureType === 'plots' ? 'Plots (Land Development)' : 'Units (Housing/Buildings)'}</p>
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
                          <SelectItem value="land">Land Plot</SelectItem>
                          <SelectItem value="utility">Utility</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium mt-1">{block.type}</p>
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
                      <p className="text-sm mt-1">{block.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{labels.units} Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{block.totalUnits}</div>
                      <div className="text-sm text-gray-500">{labels.totalUnits}</div>
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

                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(block.soldUnits / block.totalUnits) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {Math.round((block.soldUnits / block.totalUnits) * 100)}% sold
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="units" className="mt-6">
            <DynamicUnitsTable 
              block={blockData} 
              onAddUnit={() => setIsAddUnitOpen(true)}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Block Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="blockStatus">Block Status</Label>
                  <Select 
                    value={blockData.status || block.status}
                    onValueChange={(value: 'planning' | 'construction' | 'completed' | 'on-hold') => setBlockData({...blockData, status: value})}
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
                  <Label htmlFor="unitPrice">Default {labels.unit} Price</Label>
                  <Input 
                    id="unitPrice"
                    placeholder="e.g., ₦25,000,000"
                    value={blockData.defaultPrice || ''} 
                    onChange={(e) => setBlockData({...blockData, defaultPrice: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="unitSize">Default {labels.unit} Size</Label>
                  <Input 
                    id="unitSize"
                    placeholder="e.g., 500sqm"
                    value={blockData.defaultSize || ''} 
                    onChange={(e) => setBlockData({...blockData, defaultSize: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="defaultPrototype">
                    Default {block.structureType === 'plots' ? 'Prototype' : 'Design'}
                  </Label>
                  {block.structureType === 'plots' ? (
                    <Select 
                      value={blockData.defaultPrototype || ''} 
                      onValueChange={(value) => setBlockData({...blockData, defaultPrototype: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select default prototype" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="Residential Plot">Residential Plot</SelectItem>
                        <SelectItem value="Commercial Plot">Commercial Plot</SelectItem>
                        <SelectItem value="Mixed-Use Plot">Mixed-Use Plot</SelectItem>
                        <SelectItem value="Industrial Plot">Industrial Plot</SelectItem>
                        <SelectItem value="Agricultural Plot">Agricultural Plot</SelectItem>
                        <SelectItem value="Recreational Plot">Recreational Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select 
                      value={blockData.defaultPrototype || ''} 
                      onValueChange={(value) => setBlockData({...blockData, defaultPrototype: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select default design" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="1 Bedroom Apartment">1 Bedroom Apartment</SelectItem>
                        <SelectItem value="2 Bedroom Apartment">2 Bedroom Apartment</SelectItem>
                        <SelectItem value="3 Bedroom Apartment">3 Bedroom Apartment</SelectItem>
                        <SelectItem value="1 Bedroom Bungalow">1 Bedroom Bungalow</SelectItem>
                        <SelectItem value="2 Bedroom Bungalow">2 Bedroom Bungalow</SelectItem>
                        <SelectItem value="3 Bedroom Bungalow">3 Bedroom Bungalow</SelectItem>
                        <SelectItem value="4 Bedroom Bungalow">4 Bedroom Bungalow</SelectItem>
                        <SelectItem value="3 Bedroom Duplex">3 Bedroom Duplex</SelectItem>
                        <SelectItem value="4 Bedroom Duplex">4 Bedroom Duplex</SelectItem>
                        <SelectItem value="5 Bedroom Duplex">5 Bedroom Duplex</SelectItem>
                        <SelectItem value="6 Bedroom Duplex">6 Bedroom Duplex</SelectItem>
                        <SelectItem value="Studio Apartment">Studio Apartment</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Commercial Unit">Commercial Unit</SelectItem>
                        <SelectItem value="Office Space">Office Space</SelectItem>
                        <SelectItem value="Retail Space">Retail Space</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    This will be used as the default {block.structureType === 'plots' ? 'prototype' : 'design'} when adding new {labels.unitsLower}
                  </p>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Block Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddUnitModal
          isOpen={isAddUnitOpen}
          onClose={() => setIsAddUnitOpen(false)}
          block={blockData}
          onAddUnit={handleAddUnit}
        />
      </div>
    </DashboardLayout>
  );
}
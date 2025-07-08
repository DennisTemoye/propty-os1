import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, Edit, Trash2, Users, Filter, Search, Map, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectBlocksPlotsTabProps {
  project: {
    id: number;
    name: string;
  };
  userPermissions?: {
    canEdit?: boolean;
    canManage?: boolean;
    canViewLayout?: boolean;
  };
}

const mockBlocks = [
  {
    id: 'A',
    name: 'Block A',
    type: 'Duplex',
    description: 'Luxury duplex plots with modern amenities',
    totalPlots: 30,
    availablePlots: 8,
    reservedPlots: 7,
    allocatedPlots: 15,
    status: 'completed',
    defaultPrice: '₦25,000,000',
    defaultSize: '500sqm',
    plots: [
      { id: 'A-001', plotNumber: 'A-001', size: '500sqm', price: '₦25,000,000', status: 'allocated', purpose: 'Residential', client: 'John Doe' },
      { id: 'A-002', plotNumber: 'A-002', size: '500sqm', price: '₦25,000,000', status: 'available', purpose: 'Residential', client: null },
      { id: 'A-003', plotNumber: 'A-003', size: '500sqm', price: '₦25,000,000', status: 'reserved', purpose: 'Investment', client: 'Jane Smith' },
      { id: 'A-004', plotNumber: 'A-004', size: '500sqm', price: '₦25,000,000', status: 'allocated', purpose: 'Residential', client: 'Mike Johnson' },
      { id: 'A-005', plotNumber: 'A-005', size: '500sqm', price: '₦25,000,000', status: 'available', purpose: 'Residential', client: null },
    ]
  },
  {
    id: 'B',
    name: 'Block B',
    type: 'Bungalow',
    description: 'Single-story bungalow plots',
    totalPlots: 25,
    availablePlots: 12,
    reservedPlots: 5,
    allocatedPlots: 8,
    status: 'construction',
    defaultPrice: '₦18,000,000',
    defaultSize: '400sqm',
    plots: [
      { id: 'B-001', plotNumber: 'B-001', size: '400sqm', price: '₦18,000,000', status: 'allocated', purpose: 'Residential', client: 'Sarah Wilson' },
      { id: 'B-002', plotNumber: 'B-002', size: '400sqm', price: '₦18,000,000', status: 'available', purpose: 'Residential', client: null },
      { id: 'B-003', plotNumber: 'B-003', size: '400sqm', price: '₦18,000,000', status: 'reserved', purpose: 'Investment', client: 'David Brown' },
    ]
  },
  {
    id: 'C',
    name: 'Block C',
    type: 'Commercial',
    description: 'Commercial plots for business purposes',
    totalPlots: 20,
    availablePlots: 15,
    reservedPlots: 3,
    allocatedPlots: 2,
    status: 'planning',
    defaultPrice: '₦35,000,000',
    defaultSize: '300sqm',
    plots: [
      { id: 'C-001', plotNumber: 'C-001', size: '300sqm', price: '₦35,000,000', status: 'allocated', purpose: 'Commercial', client: 'ABC Corp' },
      { id: 'C-002', plotNumber: 'C-002', size: '300sqm', price: '₦35,000,000', status: 'available', purpose: 'Commercial', client: null },
    ]
  }
];

export function ProjectBlocksPlotsTab({ project, userPermissions = {} }: ProjectBlocksPlotsTabProps) {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [activeTab, setActiveTab] = useState('blocks');
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [isAddPlotOpen, setIsAddPlotOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'allocated':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBlockStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
      id: String.fromCharCode(65 + blocks.length),
      name: formData.get('blockName') as string,
      type: formData.get('blockType') as string,
      description: formData.get('description') as string,
      totalPlots: parseInt(formData.get('totalPlots') as string),
      availablePlots: parseInt(formData.get('totalPlots') as string),
      reservedPlots: 0,
      allocatedPlots: 0,
      status: 'planning',
      defaultPrice: formData.get('defaultPrice') as string,
      defaultSize: formData.get('defaultSize') as string,
      plots: []
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success('Block added successfully!');
    setIsAddBlockOpen(false);
  };

  const handleAddPlot = (formData: FormData) => {
    const blockId = formData.get('blockId') as string;
    const plotNumber = formData.get('plotNumber') as string;
    
    const newPlot = {
      id: `${blockId}-${plotNumber.split('-')[1]}`,
      plotNumber: plotNumber,
      size: formData.get('size') as string,
      price: formData.get('price') as string,
      status: 'available',
      purpose: formData.get('purpose') as string,
      client: null
    };

    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { 
            ...block, 
            plots: [...block.plots, newPlot],
            totalPlots: block.totalPlots + 1,
            availablePlots: block.availablePlots + 1
          }
        : block
    ));
    
    toast.success('Plot added successfully!');
    setIsAddPlotOpen(false);
  };

  // Get all plots for table view
  const allPlots = blocks.flatMap(block => 
    block.plots.map(plot => ({ ...plot, blockName: block.name, blockId: block.id }))
  );

  // Filter plots
  const filteredPlots = allPlots.filter(plot => {
    const matchesSearch = plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.blockName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plot.status === filterStatus;
    const matchesPurpose = filterPurpose === 'all' || plot.purpose === filterPurpose;
    
    return matchesSearch && matchesStatus && matchesPurpose;
  });

  const totalPlots = blocks.reduce((sum, block) => sum + block.totalPlots, 0);
  const totalAllocated = blocks.reduce((sum, block) => sum + block.allocatedPlots, 0);
  const totalReserved = blocks.reduce((sum, block) => sum + block.reservedPlots, 0);
  const totalAvailable = blocks.reduce((sum, block) => sum + block.availablePlots, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blocks & Plots Management</h2>
        <div className="flex space-x-2">
          {userPermissions.canManage && (
            <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
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
                  <Label htmlFor="blockType">Block Type</Label>
                  <Select name="blockType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Duplex">Duplex</SelectItem>
                      <SelectItem value="Bungalow">Bungalow</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" placeholder="Brief description" />
                </div>
                <div>
                  <Label htmlFor="totalPlots">Total Plots</Label>
                  <Input id="totalPlots" name="totalPlots" type="number" placeholder="e.g., 20" required />
                </div>
                <div>
                  <Label htmlFor="defaultPrice">Default Plot Price</Label>
                  <Input id="defaultPrice" name="defaultPrice" placeholder="e.g., ₦25,000,000" />
                </div>
                <div>
                  <Label htmlFor="defaultSize">Default Plot Size</Label>
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
          )}
          
          {userPermissions.canManage && (
            <Dialog open={isAddPlotOpen} onOpenChange={setIsAddPlotOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plot
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Plot</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddPlot(formData);
              }} className="space-y-4">
                <div>
                  <Label htmlFor="blockId">Block</Label>
                  <Select name="blockId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select block" />
                    </SelectTrigger>
                    <SelectContent>
                      {blocks.map(block => (
                        <SelectItem key={block.id} value={block.id}>{block.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="plotNumber">Plot Number</Label>
                  <Input id="plotNumber" name="plotNumber" placeholder="e.g., A-001" required />
                </div>
                <div>
                  <Label htmlFor="size">Plot Size</Label>
                  <Input id="size" name="size" placeholder="e.g., 500sqm" required />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" placeholder="e.g., ₦25,000,000" required />
                </div>
                <div>
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select name="purpose" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="Land Banking">Land Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Add Plot</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddPlotOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalPlots}</div>
              <div className="text-sm text-muted-foreground">Total Plots</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalAllocated}</div>
              <div className="text-sm text-muted-foreground">Allocated Plots</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalReserved}</div>
              <div className="text-sm text-muted-foreground">Reserved Plots</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalAvailable}</div>
              <div className="text-sm text-muted-foreground">Available Plots</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Blocks View vs Table View */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blocks">Blocks View</TabsTrigger>
          <TabsTrigger value="plots">Plots Table</TabsTrigger>
          <TabsTrigger value="layout">Layout View</TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => (
              <Card key={block.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      {block.name}
                    </CardTitle>
                    <Badge className={getBlockStatusColor(block.status)}>
                      {block.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium">{block.type}</div>
                    <div>{block.description}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-semibold">{block.totalPlots}</div>
                      <div className="text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">{block.allocatedPlots}</div>
                      <div className="text-muted-foreground">Allocated</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-semibold text-orange-600">{block.reservedPlots}</div>
                      <div className="text-muted-foreground">Reserved</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">{block.availablePlots}</div>
                      <div className="text-muted-foreground">Available</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(block.allocatedPlots / block.totalPlots) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Users className="h-3 w-3 mr-1" />
                      Plots
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plots" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search plots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="allocated">Allocated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPurpose} onValueChange={setFilterPurpose}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purpose</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Investment">Investment</SelectItem>
                <SelectItem value="Land Banking">Land Banking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plots Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot Number</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlots.map((plot) => (
                    <TableRow key={plot.id}>
                      <TableCell className="font-medium">{plot.plotNumber}</TableCell>
                      <TableCell>{plot.blockName}</TableCell>
                      <TableCell>{plot.size}</TableCell>
                      <TableCell>{plot.price}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(plot.status)}>
                          {plot.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{plot.purpose}</TableCell>
                      <TableCell>{plot.client || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-8 text-center">
                <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Layout View</h3>
                <p className="text-muted-foreground mb-4">Visual representation of blocks and plots layout.</p>
                <Button variant="outline">
                  <Map className="h-4 w-4 mr-2" />
                  Open Layout Designer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
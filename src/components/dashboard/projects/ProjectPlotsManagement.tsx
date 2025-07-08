import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  UserPlus, 
  Eye, 
  Home,
  Search,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { AllocateUnitModal } from '@/components/dashboard/sales-allocation/AllocateUnitModal';

interface ProjectPlotsManagementProps {
  projectId: number;
}

const mockBlocksData = [
  {
    id: 1,
    name: 'Block A',
    totalUnits: 50,
    availableUnits: 12,
    allocatedUnits: 32,
    reservedUnits: 6,
    status: 'active',
    dateCreated: '2024-01-01',
    description: 'Premium residential block with modern amenities'
  },
  {
    id: 2,
    name: 'Block B',
    totalUnits: 40,
    availableUnits: 8,
    allocatedUnits: 28,
    reservedUnits: 4,
    status: 'active',
    dateCreated: '2024-01-05',
    description: 'Mid-tier residential units with garden view'
  },
  {
    id: 3,
    name: 'Block C',
    totalUnits: 60,
    availableUnits: 18,
    allocatedUnits: 35,
    reservedUnits: 7,
    status: 'construction',
    dateCreated: '2024-01-10',
    description: 'Luxury penthouse units under construction'
  }
];

const mockUnitsData = [
  {
    id: 1,
    unitId: 'A-101',
    block: 'Block A',
    type: '3 Bedroom',
    size: '120 sqm',
    price: 15600000,
    status: 'available',
    floor: '1st Floor',
    clientName: null,
    dateAllocated: null
  },
  {
    id: 2,
    unitId: 'A-102',
    block: 'Block A',
    type: '2 Bedroom',
    size: '95 sqm',
    price: 12800000,
    status: 'allocated',
    floor: '1st Floor',
    clientName: 'John Doe',
    dateAllocated: '2024-01-15'
  },
  {
    id: 3,
    unitId: 'B-205',
    block: 'Block B',
    type: '3 Bedroom',
    size: '130 sqm',
    price: 18200000,
    status: 'reserved',
    floor: '2nd Floor',
    clientName: 'Jane Smith',
    dateAllocated: '2024-01-20'
  },
  {
    id: 4,
    unitId: 'C-301',
    block: 'Block C',
    type: '4 Bedroom Penthouse',
    size: '180 sqm',
    price: 35000000,
    status: 'available',
    floor: '3rd Floor',
    clientName: null,
    dateAllocated: null
  }
];

export function ProjectPlotsManagement({ projectId }: ProjectPlotsManagementProps) {
  const [activeTab, setActiveTab] = useState('blocks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string, type: 'block' | 'unit') => {
    if (type === 'block') {
      switch (status) {
        case 'active':
          return <Badge className="bg-green-100 text-green-800">Active</Badge>;
        case 'construction':
          return <Badge className="bg-yellow-100 text-yellow-800">Under Construction</Badge>;
        case 'completed':
          return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    } else {
      switch (status) {
        case 'available':
          return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Available</Badge>;
        case 'allocated':
          return <Badge className="bg-blue-100 text-blue-800"><Users className="h-3 w-3 mr-1" />Allocated</Badge>;
        case 'reserved':
          return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Reserved</Badge>;
        case 'sold':
          return <Badge className="bg-purple-100 text-purple-800"><CheckCircle className="h-3 w-3 mr-1" />Sold</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    }
  };

  const handleAllocateUnit = (unit: any) => {
    setSelectedUnit(unit);
    setIsAllocateModalOpen(true);
  };

  const filterBlocks = () => {
    if (!searchTerm) return mockBlocksData;
    return mockBlocksData.filter(block => 
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterUnits = () => {
    let filtered = mockUnitsData;
    
    if (selectedBlock) {
      filtered = filtered.filter(unit => unit.block === selectedBlock);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(unit => 
        unit.unitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (unit.clientName && unit.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Plots Management</h2>
          <p className="text-muted-foreground">Manage blocks and units in this project</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Building className="h-4 w-4 mr-2" />
            Add Block
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Unit
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="blocks">Blocks Overview</TabsTrigger>
          <TabsTrigger value="units">Units Management</TabsTrigger>
        </TabsList>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === 'blocks' ? 'Search blocks...' : 'Search units...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {activeTab === 'units' && (
            <select 
              value={selectedBlock || ''} 
              onChange={(e) => setSelectedBlock(e.target.value || null)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">All Blocks</option>
              {mockBlocksData.map(block => (
                <option key={block.id} value={block.name}>{block.name}</option>
              ))}
            </select>
          )}
        </div>

        <TabsContent value="blocks" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterBlocks().map((block) => (
              <Card key={block.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{block.name}</CardTitle>
                    {getStatusBadge(block.status, 'block')}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{block.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-lg">{block.totalUnits}</div>
                      <div className="text-muted-foreground">Total Units</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-lg text-green-600">{block.availableUnits}</div>
                      <div className="text-muted-foreground">Available</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-lg text-blue-600">{block.allocatedUnits}</div>
                      <div className="text-muted-foreground">Allocated</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="font-bold text-lg text-yellow-600">{block.reservedUnits}</div>
                      <div className="text-muted-foreground">Reserved</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="units" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>
                Units Management ({filterUnits().length})
                {selectedBlock && ` - ${selectedBlock}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit ID</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Type & Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterUnits().map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{unit.unitId}</div>
                          <div className="text-sm text-gray-500">{unit.floor}</div>
                        </div>
                      </TableCell>
                      <TableCell>{unit.block}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{unit.type}</div>
                          <div className="text-sm text-gray-500">{unit.size}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(unit.price)}</TableCell>
                      <TableCell>{getStatusBadge(unit.status, 'unit')}</TableCell>
                      <TableCell>
                        {unit.clientName ? (
                          <div>
                            <div className="font-medium">{unit.clientName}</div>
                            <div className="text-sm text-gray-500">{unit.dateAllocated}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="View Unit">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {unit.status === 'available' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleAllocateUnit(unit)}
                              title="Allocate Unit"
                            >
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" title="Edit Unit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filterUnits().length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No units found{searchTerm && ' matching your search'}.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Allocate Unit Modal */}
      <AllocateUnitModal
        isOpen={isAllocateModalOpen}
        onClose={() => {
          setIsAllocateModalOpen(false);
          setSelectedUnit(null);
        }}
        onSubmit={() => {
          toast.success('Unit allocated successfully!');
          setIsAllocateModalOpen(false);
          setSelectedUnit(null);
        }}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Edit, 
  Trash2, 
  Users, 
  DollarSign, 
  Calendar, 
  FileText, 
  Upload, 
  Download,
  Eye,
  Building,
  TrendingUp,
  AlertCircle,
  Plus,
  Save,
  Map
} from 'lucide-react';
import { toast } from 'sonner';

import { DocumentsView } from '../documents/DocumentsView';
import { ProjectBlocksTab } from './ProjectBlocksTab';
import { getProjectImage, handleImageError } from '@/lib/utils';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';

import { Project } from '@/types/project';

interface DevelopmentDetailViewProps {
  project: Project;
}

const mockDevelopmentDetails = {
  description: 'A premium residential estate featuring modern amenities and strategic location.',
  startDate: '2024-01-15',
  expectedCompletion: '2025-12-31',
  totalRevenue: '₦2,340,000,000',
  totalBudget: '₦1,800,000,000',
  avgUnitPrice: '₦15,600,000',
  recentSales: [
    { id: 1, unit: 'Unit A-15', client: 'John Doe', amount: '₦15,600,000', date: '2024-01-10' },
    { id: 2, unit: 'Unit B-08', client: 'Jane Smith', amount: '₦15,600,000', date: '2024-01-08' },
    { id: 3, unit: 'Unit C-22', client: 'Mike Johnson', amount: '₦15,600,000', date: '2024-01-05' },
  ],
  upcomingPayments: [
    { id: 1, client: 'Sarah Wilson', amount: '₦3,900,000', dueDate: '2024-01-25', type: 'Installment' },
    { id: 2, client: 'David Brown', amount: '₦7,800,000', dueDate: '2024-01-30', type: 'Balance Payment' },
  ],
  team: [
    { name: 'Alice Johnson', role: 'Development Manager', sales: 12 },
    { name: 'Bob Williams', role: 'Sales Agent', sales: 8 },
    { name: 'Carol Davis', role: 'Marketing Lead', sales: 15 },
  ],
  blocks: [
    { id: 'A', prototype: 'Duplex', units: 30, status: 'completed', sold: 25, reserved: 3, available: 2 },
    { id: 'B', prototype: 'Bungalow', units: 25, status: 'construction', sold: 18, reserved: 4, available: 3 },
    { id: 'C', prototype: 'Duplex', units: 30, status: 'planning', sold: 0, reserved: 0, available: 30 },
  ]
};

export function ProjectDetailView({ project }: DevelopmentDetailViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploadLayoutOpen, setIsUploadLayoutOpen] = useState(false);
  const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isBlockDetailOpen, setIsBlockDetailOpen] = useState(false);
  
  const { labels } = useProjectTerminology(project);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  const salesProgress = (project.soldUnits / project.totalUnits) * 100;
  const budgetProgress = 65;

  // Handler functions for various actions
  const handleUploadLayout = (layoutData: any) => {
    console.log('Upload layout:', layoutData);
    toast.success('Layout uploaded successfully!');
    setIsUploadLayoutOpen(false);
  };

  const handleOpenDesigner = () => {
    console.log('Opening layout designer...');
    toast.info('Layout designer would open in a new window');
  };

  const handleViewLayout = (layoutId?: string) => {
    console.log('View layout:', layoutId);
    toast.info('Layout viewer would open');
  };

  const handleDownloadLayout = (layoutId?: string) => {
    console.log('Download layout:', layoutId);
    toast.success('Layout download started');
  };

  const handleUploadDocument = (documentData: any) => {
    console.log('Upload document:', documentData);
    toast.success('Document uploaded successfully!');
    setIsUploadDocumentOpen(false);
  };

  const handleViewDocument = (docId: string) => {
    console.log('View document:', docId);
    toast.info('Document viewer would open');
  };

  const handleDownloadDocument = (docId: string) => {
    console.log('Download document:', docId);
    toast.success('Document download started');
  };

  const handleDeleteDocument = (docId: string) => {
    console.log('Delete document:', docId);
    toast.success('Document deleted successfully');
  };

  const handleBlockClick = (block: any) => {
    setSelectedBlock(block);
    setIsBlockDetailOpen(true);
  };

  const handleEditBlock = (blockData: any) => {
    console.log('Edit block:', blockData);
    toast.success('Block updated successfully!');
    setIsBlockDetailOpen(false);
  };

  const handleDeleteBlock = (blockId: string) => {
    console.log('Delete block:', blockId);
    toast.success('Block deleted successfully');
    setIsBlockDetailOpen(false);
  };

  const handleViewAllClients = () => {
    console.log('Viewing all clients for project:', project.id);
    toast.info('Redirecting to clients view...');
  };

  const handleGenerateReport = () => {
    console.log('Generating sales report for project:', project.id);
    toast.success('Sales report generation started');
  };

  const handleViewOnMap = () => {
    console.log('View project on map:', project.id);
    toast.info('Map view would open');
  };

  return (
    <div className="space-y-6">
      {/* Development Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Project Image */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src={getProjectImage(project)} 
              alt={project.name}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '1/1' }}
              onError={handleImageError}
            />
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {project.location}
            </div>
            <div className="flex items-center text-blue-600 mb-2">
              <FileText className="h-4 w-4 mr-1" />
              {project.documentTitle}
            </div>
            <p className="text-gray-600">{mockDevelopmentDetails.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Development
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{project.soldUnits}</div>
                <div className="text-sm text-gray-500">{labels.soldUnits}</div>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{mockDevelopmentDetails.totalRevenue}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{salesProgress.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Sales Progress</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{project.availableUnits}</div>
                <div className="text-sm text-gray-500">{labels.availableUnits}</div>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{mockDevelopmentDetails.totalBudget}</div>
                <div className="text-sm text-gray-500">Total Budget</div>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sales Progress</span>
                <span>{salesProgress.toFixed(1)}% Complete</span>
              </div>
              <Progress value={salesProgress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{project.soldUnits} sold</span>
                <span>{project.reservedUnits} reserved</span>
                <span>{project.availableUnits} available</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Utilization</span>
                <span>{budgetProgress}% Used</span>
              </div>
              <Progress value={budgetProgress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₦1,170,000,000 spent</span>
                <span>₦630,000,000 remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs with Functional Actions */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="blocks">{labels.blockUnitsManagement.split(' &')[0]}</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Development Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{project.projectSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Stage:</span>
                    <span>{project.developmentStage || project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span>{mockDevelopmentDetails.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Completion:</span>
                    <span>{mockDevelopmentDetails.expectedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document:</span>
                    <span className="text-blue-600">{project.documentTitle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleViewAllClients}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View All Clients
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGenerateReport}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Sales Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleViewOnMap}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Dialog open={isUploadDocumentOpen} onOpenChange={setIsUploadDocumentOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="docCategory">Document Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="allocation-letter">Allocation Letter</SelectItem>
                              <SelectItem value="survey-plan">Survey Plan</SelectItem>
                              <SelectItem value="deed-of-assignment">Deed of Assignment</SelectItem>
                              <SelectItem value="building-plan">Building Plan</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="docFile">Choose File</Label>
                          <Input type="file" id="docFile" accept=".pdf,.doc,.docx,.jpg,.png" />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUploadDocument({})}>Upload</Button>
                          <Button variant="outline" onClick={() => setIsUploadDocumentOpen(false)}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Layout Designer</h2>
            <div className="flex space-x-2">
              <Dialog open={isUploadLayoutOpen} onOpenChange={setIsUploadLayoutOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Layout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Layout</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="layoutName">Layout Name</Label>
                      <Input id="layoutName" placeholder="e.g., Master Plan" />
                    </div>
                    <div>
                      <Label htmlFor="layoutType">Layout Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site-plan">Site Plan</SelectItem>
                          <SelectItem value="block-plan">Block Plan</SelectItem>
                          <SelectItem value="floor-plan">Floor Plan</SelectItem>
                          <SelectItem value="unit-plan">Unit Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="layoutFile">Choose File</Label>
                      <Input type="file" id="layoutFile" accept=".pdf,.png,.jpg,.dwg" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleUploadLayout({})}>Upload</Button>
                      <Button variant="outline" onClick={() => setIsUploadLayoutOpen(false)}>Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleOpenDesigner}>
                <Map className="h-4 w-4 mr-2" />
                Open Designer
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Layout Preview</h3>
                <p className="text-gray-500 mb-4">Upload a layout file or use the designer to create one</p>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" onClick={() => handleViewLayout()}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Current
                  </Button>
                  <Button variant="outline" onClick={() => handleDownloadLayout()}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <ProjectBlocksTab project={project} />
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDevelopmentDetails.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{sale.unit}</div>
                      <div className="text-sm text-gray-500">{sale.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{sale.amount}</div>
                      <div className="text-sm text-gray-500">{sale.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsView project={project} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Project Settings</h2>
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Project</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{project.name}"? This action cannot be undone and will remove all associated data including allocations, blocks, and units.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        console.log('Delete project:', project.id);
                        toast.success('Project deleted successfully');
                      }}
                    >
                      Delete Project
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={() => {
                console.log('Save project settings');
                toast.success('Project settings saved successfully');
              }}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input id="projectName" defaultValue={project.name} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={project.location} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={mockDevelopmentDetails.description} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={project.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select defaultValue={project.type.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedCompletion">Expected Completion</Label>
                  <Input id="expectedCompletion" type="date" defaultValue={mockDevelopmentDetails.expectedCompletion} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Block Detail Modal */}
      <Dialog open={isBlockDetailOpen} onOpenChange={setIsBlockDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Block {selectedBlock?.id} Details</DialogTitle>
          </DialogHeader>
          {selectedBlock && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blockName">Block Name</Label>
                  <Input id="blockName" defaultValue={`Block ${selectedBlock.id}`} />
                </div>
                <div>
                  <Label htmlFor="blockType">Type</Label>
                  <Input id="blockType" defaultValue={selectedBlock.prototype} />
                </div>
              </div>
              <div>
                <Label htmlFor="blockUnits">Total Units</Label>
                <Input id="blockUnits" type="number" defaultValue={selectedBlock.units} />
              </div>
              <div>
                <Label htmlFor="blockStatus">Status</Label>
                <Select defaultValue={selectedBlock.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Block
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Block</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete Block {selectedBlock.id}? This will also remove all units in this block.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteBlock(selectedBlock.id)}
                      >
                        Delete Block
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsBlockDetailOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleEditBlock(selectedBlock)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map, Upload, Download, Eye, FileText, Calendar, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectLayoutTabProps {
  project: {
    id: number;
    name: string;
  };
}

const projectLayouts = {
  1: {
    hasLayout: true,
    layouts: [
      {
        id: 1,
        name: 'Master Plan',
        type: 'Site Plan',
        uploadDate: '2024-01-15',
        fileSize: '2.4 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 2,
        name: 'Block A Layout',
        type: 'Block Plan',
        uploadDate: '2024-01-10',
        fileSize: '1.8 MB',
        format: 'PNG',
        thumbnail: '/placeholder.svg'
      }
    ]
  },
  2: {
    hasLayout: true,
    layouts: [
      {
        id: 1,
        name: 'Commercial Complex Layout',
        type: 'Site Plan',
        uploadDate: '2024-01-12',
        fileSize: '3.2 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      }
    ]
  },
  3: {
    hasLayout: true,
    layouts: [
      {
        id: 1,
        name: 'Tower Layout Plan',
        type: 'Site Plan',
        uploadDate: '2024-01-08',
        fileSize: '4.1 MB',
        format: 'DWG',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 2,
        name: 'Floor Plans - Tower A',
        type: 'Floor Plan',
        uploadDate: '2024-01-05',
        fileSize: '2.7 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 3,
        name: 'Floor Plans - Tower B',
        type: 'Floor Plan',
        uploadDate: '2024-01-05',
        fileSize: '2.9 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      }
    ]
  },
  5: {
    hasLayout: true,
    layouts: [
      {
        id: 1,
        name: 'Marina Development Plan',
        type: 'Site Plan',
        uploadDate: '2024-01-06',
        fileSize: '3.8 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      }
    ]
  },
  8: {
    hasLayout: true,
    layouts: [
      {
        id: 1,
        name: 'Waterfront Layout',
        type: 'Site Plan',
        uploadDate: '2024-01-11',
        fileSize: '5.2 MB',
        format: 'PDF',
        thumbnail: '/placeholder.svg'
      },
      {
        id: 2,
        name: 'Villa Layouts',
        type: 'Unit Plan',
        uploadDate: '2024-01-09',
        fileSize: '3.1 MB',
        format: 'DWG',
        thumbnail: '/placeholder.svg'
      }
    ]
  }
};

export function ProjectLayoutTab({ project }: ProjectLayoutTabProps) {
  const [selectedLayout, setSelectedLayout] = useState<any>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [layouts, setLayouts] = useState(
    projectLayouts[project.id as keyof typeof projectLayouts]?.layouts || []
  );
  
  const projectLayoutData = projectLayouts[project.id as keyof typeof projectLayouts];

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF':
        return 'bg-red-100 text-red-700';
      case 'PNG':
      case 'JPG':
        return 'bg-green-100 text-green-700';
      case 'DWG':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleUploadLayout = (formData: FormData) => {
    const newLayout = {
      id: layouts.length + 1,
      name: 'New Layout Plan',
      type: 'Site Plan',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '2.1 MB',
      format: 'PDF',
      thumbnail: '/placeholder.svg'
    };
    setLayouts([...layouts, newLayout]);
    toast.success('Layout uploaded successfully!');
    setIsUploadOpen(false);
  };

  const handleViewLayout = (layoutId: number) => {
    console.log('Viewing layout:', layoutId);
    toast.info('Layout viewer would open in a new window');
  };

  const handleDownloadLayout = (layoutId: number) => {
    console.log('Downloading layout:', layoutId);
    toast.success('Layout download started');
  };

  const handleDeleteLayout = (layoutId: number) => {
    setLayouts(layouts.filter(layout => layout.id !== layoutId));
    toast.success('Layout deleted successfully');
  };

  const handleOpenDesigner = () => {
    console.log('Opening layout designer for project:', project.id);
    toast.info('Layout designer would open in a new window');
  };

  if (!projectLayoutData || !projectLayoutData.hasLayout) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Layout Designer</h2>
          <div className="flex space-x-2">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Layout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Layout</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUploadLayout(formData);
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="layoutName">Layout Name</Label>
                    <Input id="layoutName" name="layoutName" placeholder="e.g., Master Plan" required />
                  </div>
                  <div>
                    <Label htmlFor="layoutType">Layout Type</Label>
                    <Select name="layoutType" required>
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
                    <Input type="file" id="layoutFile" name="layoutFile" accept=".pdf,.png,.jpg,.dwg" required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Upload Layout</Button>
                    <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button onClick={handleOpenDesigner}>
              <Map className="h-4 w-4 mr-2" />
              Open Designer
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Layout Available</h3>
              <p className="text-gray-500 mb-4">Upload a layout plan or use our designer to create one.</p>
              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Layout
                </Button>
                <Button onClick={handleOpenDesigner}>
                  <Map className="h-4 w-4 mr-2" />
                  Create Layout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Layout Designer</h2>
        <div className="flex space-x-2">
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
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
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleUploadLayout(formData);
              }} className="space-y-4">
                <div>
                  <Label htmlFor="layoutName">Layout Name</Label>
                  <Input id="layoutName" name="layoutName" placeholder="e.g., Master Plan" required />
                </div>
                <div>
                  <Label htmlFor="layoutType">Layout Type</Label>
                  <Select name="layoutType" required>
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
                  <Input type="file" id="layoutFile" name="layoutFile" accept=".pdf,.png,.jpg,.dwg" required />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Upload Layout</Button>
                  <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Button onClick={handleOpenDesigner}>
            <Map className="h-4 w-4 mr-2" />
            Open Designer
          </Button>
        </div>
      </div>

      {/* Layout Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layouts.map((layout) => (
          <Card key={layout.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <img 
                  src={layout.thumbnail} 
                  alt={layout.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm">{layout.name}</h3>
                  <Badge variant="outline" className={getFormatColor(layout.format)}>
                    {layout.format}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-500">{layout.type}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {layout.uploadDate}
                  </div>
                  <span>{layout.fileSize}</span>
                </div>
                
                <div className="flex space-x-1 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewLayout(layout.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleDownloadLayout(layout.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteLayout(layout.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Layout Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Layout Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Total Layouts</h4>
              <p className="text-2xl font-bold text-blue-600">{layouts.length}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Last Updated</h4>
              <p className="text-sm text-gray-600">
                {layouts.length > 0 ? layouts[layouts.length - 1].uploadDate : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Total Size</h4>
              <p className="text-sm text-gray-600">
                {layouts.reduce((total, layout) => {
                  const size = parseFloat(layout.fileSize.split(' ')[0]);
                  return total + size;
                }, 0).toFixed(1)} MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

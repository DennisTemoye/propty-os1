
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MapPin, FileText, Upload, Edit, Trash2, Eye, Users, DollarSign, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NewProjectForm } from './forms/NewProjectForm';
import { MapView } from './maps/MapView';
import { DocumentsView } from './documents/DocumentsView';
import { LayoutUpload } from './uploads/LayoutUpload';
import { GeoTagUnits } from './maps/GeoTagUnits';
import { ReportsGenerator } from './reports/ReportsGenerator';
import { ProjectDetailView } from './projects/ProjectDetailView';

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active',
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Abuja, FCT',
    totalUnits: 200,
    soldUnits: 156,
    reservedUnits: 12,
    availableUnits: 32,
    status: 'active',
  },
  {
    id: 3,
    name: 'Golden View Apartments',
    location: 'Port Harcourt, Rivers',
    totalUnits: 80,
    soldUnits: 45,
    reservedUnits: 15,
    availableUnits: 20,
    status: 'planning',
  },
];

export function ProjectsUnits() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProjectClick = (project: any) => {
    setSelectedProjectForDetail(project);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Projects & Units</h1>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <NewProjectForm onClose={() => setIsNewProjectOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(project)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Units:</span>
                  <span className="font-medium">{project.totalUnits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sold:</span>
                  <span className="font-medium text-green-600">{project.soldUnits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reserved:</span>
                  <span className="font-medium text-yellow-600">{project.reservedUnits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available:</span>
                  <span className="font-medium text-blue-600">{project.availableUnits}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(project.soldUnits / project.totalUnits) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <MapPin className="h-3 w-3 mr-1" />
                        View Map
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-4xl">
                      <SheetHeader>
                        <SheetTitle>{project.name} - Map View</SheetTitle>
                      </SheetHeader>
                      <MapView project={project} />
                    </SheetContent>
                  </Sheet>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <FileText className="h-3 w-3 mr-1" />
                        Documents
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-2xl">
                      <SheetHeader>
                        <SheetTitle>{project.name} - Documents</SheetTitle>
                      </SheetHeader>
                      <DocumentsView project={project} />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProjectForDetail} onOpenChange={() => setSelectedProjectForDetail(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Project Details - {selectedProjectForDetail?.name}</DialogTitle>
            <DialogDescription>
              Comprehensive project overview and management
            </DialogDescription>
          </DialogHeader>
          {selectedProjectForDetail && <ProjectDetailView project={selectedProjectForDetail} />}
        </DialogContent>
      </Dialog>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Project Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Upload Layout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Project Layout</DialogTitle>
                </DialogHeader>
                <LayoutUpload />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col">
                  <MapPin className="h-6 w-6 mb-2" />
                  Geo-tag Units
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Geo-tag Units</DialogTitle>
                </DialogHeader>
                <GeoTagUnits />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Generate Reports
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Project Reports</DialogTitle>
                </DialogHeader>
                <ReportsGenerator />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

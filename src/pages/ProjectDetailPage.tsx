
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Trash2, FileText, Building, Users, BarChart3 } from 'lucide-react';
import { ProjectDetailView } from '@/components/dashboard/projects/ProjectDetailView';
import { NewDevelopmentForm } from '@/components/dashboard/forms/NewDevelopmentForm';
import { toast } from 'sonner';

const mockDevelopments = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    type: 'Residential',
    totalUnits: 150,
    soldUnits: 89,
    reservedUnits: 23,
    availableUnits: 38,
    status: 'active',
    documentTitle: 'Certificate of Occupancy',
    projectSize: '50 hectares',
    developmentStage: 'Construction'
  },
  {
    id: 2,
    name: 'Mainland Commercial Plaza',
    location: 'Ikeja, Lagos',
    type: 'Commercial',
    totalUnits: 75,
    soldUnits: 45,
    reservedUnits: 12,
    availableUnits: 18,
    status: 'paused',
    documentTitle: 'Approved Survey Plan',
    projectSize: '15 hectares',
    developmentStage: 'Marketing'
  },
  {
    id: 3,
    name: 'Sunset Land Development',
    location: 'Abuja FCT',
    type: 'Residential',
    totalUnits: 200,
    soldUnits: 196,
    reservedUnits: 4,
    availableUnits: 0,
    status: 'sold out',
    documentTitle: 'Family Receipt & Layout Plan',
    projectSize: '100 hectares',
    developmentStage: 'Handover'
  }
];

export default function DevelopmentDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const development = mockDevelopments.find(p => p.id === parseInt(projectId || '1'));

  if (!development) {
    return <div>Development not found</div>;
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this development? This action cannot be undone.')) {
      console.log('Deleting development:', development.id);
      toast.success('Development deleted successfully');
      navigate('/company/developments');
    }
  };

  const handleManageBlocks = () => {
    navigate(`/company/developments/${development.id}/blocks`);
  };

  const handleViewDocuments = () => {
    navigate('/company/documents', { state: { developmentId: development.id } });
  };

  const handleViewClients = () => {
    navigate('/company/clients', { state: { developmentId: development.id } });
  };

  const handleViewReports = () => {
    navigate('/company/reports', { state: { developmentId: development.id } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/company/developments')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Developments
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Development
              </Button>
              <Button 
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Development
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={handleManageBlocks}
            className="h-16 bg-blue-600 hover:bg-blue-700"
          >
            <Building className="h-5 w-5 mr-2" />
            Manage Blocks & Units
          </Button>
          <Button 
            onClick={handleViewDocuments}
            variant="outline"
            className="h-16"
          >
            <FileText className="h-5 w-5 mr-2" />
            View Documents
          </Button>
          <Button 
            onClick={handleViewClients}
            variant="outline"
            className="h-16"
          >
            <Users className="h-5 w-5 mr-2" />
            View Clients
          </Button>
          <Button 
            onClick={handleViewReports}
            variant="outline"
            className="h-16"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Generate Reports
          </Button>
        </div>
        
        <ProjectDetailView project={development} />

        {/* Edit Development Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Development</DialogTitle>
              <DialogDescription>
                Update development information and settings
              </DialogDescription>
            </DialogHeader>
            <NewDevelopmentForm onClose={() => setIsEditOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

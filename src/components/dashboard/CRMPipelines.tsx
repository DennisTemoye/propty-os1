
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CRMPipelinesPage } from './tools/CRMPipelines';
import { DownloadService } from '@/services/downloadService';
import { toast } from 'sonner';

export function CRMPipelines() {
  const handleExportPipelineData = () => {
    const mockPipelineData = [
      { name: 'John Smith', email: 'john@example.com', phone: '+234-801-111-2222', stage: 'Contacted', project: 'Victoria Gardens', source: 'Website', assignedTo: 'Jane Smith', createdDate: '2024-01-15', lastContact: '2024-01-20', status: 'Active' },
      { name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+234-802-222-3333', stage: 'Inspection', project: 'Emerald Heights', source: 'Referral', assignedTo: 'Mike Johnson', createdDate: '2024-01-10', lastContact: '2024-01-18', status: 'Active' }
    ];
    
    DownloadService.generateCRMReport(mockPipelineData);
    toast.success('CRM pipeline data exported successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">CRM Pipelines</h1>
        <Button variant="outline" onClick={handleExportPipelineData}>
          <Download className="h-4 w-4 mr-2" />
          Export Pipeline Data
        </Button>
      </div>
      <CRMPipelinesPage />
    </div>
  );
}

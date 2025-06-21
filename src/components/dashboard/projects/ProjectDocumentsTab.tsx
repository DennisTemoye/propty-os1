
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Eye, Trash2 } from 'lucide-react';

interface ProjectDocumentsTabProps {
  project: {
    id: number;
    name: string;
  };
}

export function ProjectDocumentsTab({ project }: ProjectDocumentsTabProps) {
  const mockDocuments = [
    { id: 1, name: 'Certificate of Occupancy', type: 'Legal', size: '2.4 MB', uploadDate: '2024-01-10', status: 'verified' },
    { id: 2, name: 'Survey Plan', type: 'Technical', size: '8.1 MB', uploadDate: '2024-01-08', status: 'pending' },
    { id: 3, name: 'Allocation Letters', type: 'Sales', size: '1.2 MB', uploadDate: '2024-01-05', status: 'verified' },
    { id: 4, name: 'Environmental Impact Report', type: 'Compliance', size: '15.6 MB', uploadDate: '2024-01-01', status: 'verified' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Documents</h2>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Badge variant="outline">{doc.type}</Badge>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

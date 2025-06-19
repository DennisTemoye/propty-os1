
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Upload, Eye, Trash2 } from 'lucide-react';

interface DocumentsViewProps {
  project: {
    id: number;
    name: string;
  };
}

const mockDocuments = [
  { id: 1, name: 'Project Layout.pdf', type: 'Layout', size: '2.3 MB', uploadDate: '2024-01-15', status: 'approved' },
  { id: 2, name: 'Environmental Impact.docx', type: 'Legal', size: '1.8 MB', uploadDate: '2024-01-10', status: 'pending' },
  { id: 3, name: 'Building Permit.pdf', type: 'Permit', size: '945 KB', uploadDate: '2024-01-08', status: 'approved' },
  { id: 4, name: 'Site Survey.pdf', type: 'Survey', size: '3.2 MB', uploadDate: '2024-01-05', status: 'approved' },
];

export function DocumentsView({ project }: DocumentsViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Documents</h3>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockDocuments.length}</div>
              <div className="text-sm text-gray-500">Total Documents</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mockDocuments.filter(d => d.status === 'approved').length}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{mockDocuments.filter(d => d.status === 'pending').length}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12.3</div>
              <div className="text-sm text-gray-500">Total MB</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {mockDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">
                      {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-500">
          Showing {mockDocuments.length} documents
        </div>
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}

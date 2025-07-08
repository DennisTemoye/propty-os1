
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Upload, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentsViewProps {
  project: {
    id: number;
    name: string;
  };
  userPermissions?: {
    canUpload?: boolean;
    canDelete?: boolean;
    canDownload?: boolean;
    canView?: boolean;
  };
}

const mockDocuments = [
  { id: 1, name: 'Project Layout.pdf', type: 'Layout', size: '2.3 MB', uploadDate: '2024-01-15', status: 'approved' },
  { id: 2, name: 'Environmental Impact.docx', type: 'Legal', size: '1.8 MB', uploadDate: '2024-01-10', status: 'pending' },
  { id: 3, name: 'Building Permit.pdf', type: 'Permit', size: '945 KB', uploadDate: '2024-01-08', status: 'approved' },
  { id: 4, name: 'Site Survey.pdf', type: 'Survey', size: '3.2 MB', uploadDate: '2024-01-05', status: 'approved' },
];

export function DocumentsView({ project, userPermissions = {} }: DocumentsViewProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState(mockDocuments);

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

  const handleUploadDocument = (formData: FormData) => {
    const newDoc = {
      id: documents.length + 1,
      name: 'New Document.pdf',
      type: 'General',
      size: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setDocuments([...documents, newDoc]);
    toast.success('Document uploaded successfully!');
    setIsUploadOpen(false);
  };

  const handleViewDocument = (docId: number) => {
    console.log('Viewing document:', docId);
    toast.info('Document viewer would open in a new window');
  };

  const handleDownloadDocument = (docId: number) => {
    console.log('Downloading document:', docId);
    toast.success('Document download started');
  };

  const handleDeleteDocument = (docId: number) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Documents</h3>
        {userPermissions.canUpload !== false && (
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUploadDocument(formData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="docName">Document Name</Label>
                <Input id="docName" name="docName" placeholder="e.g., Allocation Letter" required />
              </div>
              <div>
                <Label htmlFor="docCategory">Document Category</Label>
                <Select name="docCategory" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allocation-letter">Allocation Letter</SelectItem>
                    <SelectItem value="survey-plan">Survey Plan</SelectItem>
                    <SelectItem value="deed-of-assignment">Deed of Assignment</SelectItem>
                    <SelectItem value="building-plan">Building Plan</SelectItem>
                    <SelectItem value="legal">Legal Document</SelectItem>
                    <SelectItem value="permit">Permit</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="docFile">Choose File</Label>
                <Input 
                  type="file" 
                  id="docFile" 
                  name="docFile" 
                  accept=".pdf,.doc,.docx,.jpg,.png,.xlsx,.xls" 
                  required 
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Upload Document</Button>
                <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
              <div className="text-sm text-gray-500">Total Documents</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{documents.filter(d => d.status === 'approved').length}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.status === 'pending').length}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {documents.reduce((total, doc) => {
                  const size = parseFloat(doc.size.split(' ')[0]);
                  return total + (doc.size.includes('KB') ? size / 1024 : size);
                }, 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Total MB</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
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
                  {userPermissions.canView !== false && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDocument(doc.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {userPermissions.canDownload !== false && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadDocument(doc.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {userPermissions.canDelete && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Document</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{doc.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          Delete Document
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-500">
          Showing {documents.length} documents
        </div>
        <Button variant="outline" onClick={() => toast.info('Loading more documents...')}>
          Load More
        </Button>
      </div>
    </div>
  );
}

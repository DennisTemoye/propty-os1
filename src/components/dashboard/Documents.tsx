
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Upload, Download, Share, Eye, Trash2, Plus, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  description: string;
  status: 'approved' | 'pending' | 'rejected';
  category: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    name: 'Project Layout.pdf',
    type: 'PDF',
    size: '2.3 MB',
    uploadDate: '2024-01-15',
    description: 'Main project layout and site plan',
    status: 'approved',
    category: 'Layout'
  },
  {
    id: 2,
    name: 'Environmental Impact.docx',
    type: 'DOCX',
    size: '1.8 MB',
    uploadDate: '2024-01-10',
    description: 'Environmental impact assessment report',
    status: 'pending',
    category: 'Legal'
  },
  {
    id: 3,
    name: 'Building Permit.pdf',
    type: 'PDF',
    size: '945 KB',
    uploadDate: '2024-01-08',
    description: 'Official building permit documentation',
    status: 'approved',
    category: 'Permit'
  }
];

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [viewDocument, setViewDocument] = useState<Document | null>(null);

  const form = useForm();

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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onSubmitDocument = (data: any) => {
    const newDocument: Document = {
      id: documents.length + 1,
      name: data.fileName,
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      description: data.description,
      status: 'pending',
      category: data.category
    };
    
    setDocuments([...documents, newDocument]);
    setIsAddDocumentOpen(false);
    form.reset();
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleDownload = (doc: Document) => {
    console.log('Downloading:', doc.name);
    // Implement download logic
  };

  const categories = ['all', ...Array.from(new Set(documents.map(doc => doc.category)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsAddDocumentOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
                <div className="text-sm text-gray-500">Total Documents</div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {documents.filter(d => d.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-500">Approved</div>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {documents.filter(d => d.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {documents.filter(d => d.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-500">Rejected</div>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">
                      {doc.category} • {doc.size} • {doc.uploadDate}
                    </div>
                    <div className="text-sm text-gray-600">{doc.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => setViewDocument(doc)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Document Modal */}
      <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>
              Add a new document to the library with description
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitDocument)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Document Name</label>
              <Input {...form.register('fileName', { required: true })} placeholder="Enter document name" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select {...form.register('category', { required: true })} className="w-full px-3 py-2 border rounded-md">
                <option value="">Select category</option>
                <option value="Layout">Layout</option>
                <option value="Legal">Legal</option>
                <option value="Permit">Permit</option>
                <option value="Financial">Financial</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...form.register('description')} placeholder="Describe the document..." />
            </div>
            <div>
              <label className="text-sm font-medium">File Upload</label>
              <Input type="file" accept=".pdf,.doc,.docx,.jpg,.png" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Upload Document</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddDocumentOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Document Modal */}
      <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{viewDocument?.name}</DialogTitle>
            <DialogDescription>Document details and preview</DialogDescription>
          </DialogHeader>
          {viewDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Type:</span> {viewDocument.type}</div>
                <div><span className="font-medium">Size:</span> {viewDocument.size}</div>
                <div><span className="font-medium">Category:</span> {viewDocument.category}</div>
                <div><span className="font-medium">Upload Date:</span> {viewDocument.uploadDate}</div>
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-gray-600">{viewDocument.description}</p>
              </div>
              <div className="bg-gray-100 p-8 text-center rounded-lg">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Document preview would appear here</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

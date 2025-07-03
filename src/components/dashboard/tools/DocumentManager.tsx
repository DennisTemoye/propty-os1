
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Upload, Trash2, Plus, Search, Filter, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Document {
  id: string;
  title: string;
  fileName: string;
  category: string;
  linkedTo: 'client' | 'project';
  linkedId: string;
  linkedName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  url?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Victoria Gardens Survey Plan',
    fileName: 'victoria_gardens_survey.pdf',
    category: 'Survey',
    linkedTo: 'project',
    linkedId: '1',
    linkedName: 'Victoria Gardens',
    fileSize: '2.5 MB',
    fileType: 'PDF',
    uploadDate: '2024-01-15',
    uploadedBy: 'Sarah Wilson'
  },
  {
    id: '2',
    title: 'John Doe Allocation Letter',
    fileName: 'john_doe_allocation.pdf',
    category: 'Allocation Letter',
    linkedTo: 'client',
    linkedId: '1',
    linkedName: 'John Doe',
    fileSize: '856 KB',
    fileType: 'PDF',
    uploadDate: '2024-01-16',
    uploadedBy: 'Mike Johnson'
  },
  {
    id: '3',
    title: 'Certificate of Occupancy',
    fileName: 'co_lagos_estate.pdf',
    category: 'Certificate',
    linkedTo: 'project',
    linkedId: '2',
    linkedName: 'Lagos Estate',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    uploadDate: '2024-01-14',
    uploadedBy: 'David Brown'
  }
];

const categories = [
  'Survey',
  'Allocation Letter',
  'MoU',
  'Payment Receipt',
  'Certificate',
  'Layout Plan',
  'Contract',
  'KYC Documents',
  'Other'
];

export function DocumentManagerPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLinkedTo, setFilterLinkedTo] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    linkedTo: '',
    linkedName: ''
  });

  const form = useForm();

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.linkedName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesLinkedTo = filterLinkedTo === 'all' || doc.linkedTo === filterLinkedTo;
    
    return matchesSearch && matchesCategory && matchesLinkedTo;
  });

  const onSubmitDocument = (data: any) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      title: formData.title,
      fileName: data.fileName || 'document.pdf',
      category: formData.category,
      linkedTo: formData.linkedTo as 'client' | 'project',
      linkedId: '1',
      linkedName: formData.linkedName,
      fileSize: '1.2 MB',
      fileType: 'PDF',
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Current User'
    };
    
    setDocuments(prev => [...prev, newDocument]);
    setIsUploadOpen(false);
    setFormData({ title: '', category: '', linkedTo: '', linkedName: '' });
    form.reset();
    toast.success('Document uploaded successfully');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('Document deleted successfully');
    }
  };

  const handleDownload = (doc: Document) => {
    console.log('Downloading:', doc.fileName);
    toast.success(`Downloading ${doc.fileName}`);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Survey': 'bg-blue-100 text-blue-800',
      'Allocation Letter': 'bg-green-100 text-green-800',
      'MoU': 'bg-purple-100 text-purple-800',
      'Payment Receipt': 'bg-yellow-100 text-yellow-800',
      'Certificate': 'bg-red-100 text-red-800',
      'Layout Plan': 'bg-indigo-100 text-indigo-800',
      'Contract': 'bg-pink-100 text-pink-800',
      'KYC Documents': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Manager</h1>
          <p className="text-gray-600 mt-1">Store and manage signed documents, survey plans, allocation letters, etc.</p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="bg-gradient-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
            <div className="text-sm text-gray-500">Total Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.linkedTo === 'client').length}
            </div>
            <div className="text-sm text-gray-500">Client Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {documents.filter(d => d.linkedTo === 'project').length}
            </div>
            <div className="text-sm text-gray-500">Project Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {categories.length}
            </div>
            <div className="text-sm text-gray-500">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents or linked records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterLinkedTo} onValueChange={setFilterLinkedTo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="client">Client Documents</SelectItem>
                <SelectItem value="project">Project Documents</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterLinkedTo('all');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents found matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-10 w-10 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{doc.fileName}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <span>by {doc.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getCategoryColor(doc.category)} variant="secondary">
                          {doc.category}
                        </Badge>
                        <Badge variant="outline">
                          {doc.linkedTo === 'client' ? '👤' : '🏢'} {doc.linkedName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedDocument(doc)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Upload Document Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>
              Add a new document to your document manager
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmitDocument)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Document Title</label>
              <Input 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter document title" 
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Link To</label>
                <Select value={formData.linkedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, linkedTo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Linked Record Name</label>
              <Input 
                value={formData.linkedName}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedName: e.target.value }))}
                placeholder="Enter client or project name" 
                required 
              />
            </div>
            <div>
              <label className="text-sm font-medium">File Upload</label>
              <Input type="file" accept=".pdf,.doc,.docx,.jpg,.png,.jpeg" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Upload Document</Button>
              <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>Document preview and details</DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">File Name:</span> {selectedDocument.fileName}</div>
                <div><span className="font-medium">File Size:</span> {selectedDocument.fileSize}</div>
                <div><span className="font-medium">Category:</span> {selectedDocument.category}</div>
                <div><span className="font-medium">Upload Date:</span> {selectedDocument.uploadDate}</div>
                <div><span className="font-medium">Uploaded By:</span> {selectedDocument.uploadedBy}</div>
                <div><span className="font-medium">Linked To:</span> {selectedDocument.linkedName}</div>
              </div>
              <div className="bg-gray-100 p-12 text-center rounded-lg">
                <FileText className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Document preview would appear here</p>
                <p className="text-sm text-gray-500 mt-2">
                  In a real application, this would show the actual document content
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleDownload(selectedDocument)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

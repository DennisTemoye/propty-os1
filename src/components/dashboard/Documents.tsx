
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Download, Share, Eye, Trash2, Plus, Search, Image, Video, Music, Filter } from 'lucide-react';
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
  mediaType: 'document' | 'image' | 'video' | 'audio';
  thumbnail?: string;
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
    category: 'Layout',
    mediaType: 'document'
  },
  {
    id: 2,
    name: 'Property Photos.jpg',
    type: 'JPG',
    size: '4.8 MB',
    uploadDate: '2024-01-12',
    description: 'High-resolution property images',
    status: 'approved',
    category: 'Media',
    mediaType: 'image'
  },
  {
    id: 3,
    name: 'Virtual Tour Video.mp4',
    type: 'MP4',
    size: '124 MB',
    uploadDate: '2024-01-10',
    description: 'Virtual property tour video',
    status: 'pending',
    category: 'Media',
    mediaType: 'video'
  }
];

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMediaType, setSelectedMediaType] = useState('all');
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [viewDocument, setViewDocument] = useState<Document | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const form = useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMediaIcon = (mediaType: string, size = 'h-8 w-8') => {
    switch (mediaType) {
      case 'image': return <Image className={`${size} text-green-600`} />;
      case 'video': return <Video className={`${size} text-red-600`} />;
      case 'audio': return <Music className={`${size} text-purple-600`} />;
      default: return <FileText className={`${size} text-blue-600`} />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesMediaType = selectedMediaType === 'all' || doc.mediaType === selectedMediaType;
    return matchesSearch && matchesCategory && matchesMediaType;
  });

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const categories = ['all', ...Array.from(new Set(documents.map(doc => doc.category)))];
  const mediaTypes = ['all', 'document', 'image', 'video', 'audio'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documents & Media</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsAddDocumentOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
            <div className="text-sm text-gray-500">Total Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {documents.filter(d => d.mediaType === 'image' || d.mediaType === 'video').length}
            </div>
            <div className="text-sm text-gray-500">Media Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">2.1</div>
            <div className="text-sm text-gray-500">GB Used</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents and media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
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
              <select 
                value={selectedMediaType} 
                onChange={(e) => setSelectedMediaType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {mediaTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Display */}
      <Card>
        <CardHeader>
          <CardTitle>Library ({filteredDocuments.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3">
                    {getMediaIcon(doc.mediaType, 'h-12 w-12')}
                  </div>
                  <h4 className="font-medium text-center mb-2 text-sm">{doc.name}</h4>
                  <div className="text-center space-y-2">
                    <Badge className={getStatusColor(doc.status)} variant="outline">
                      {doc.status}
                    </Badge>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                    <div className="flex justify-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => setViewDocument(doc)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getMediaIcon(doc.mediaType)}
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
                    <Button size="sm" variant="outline">
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
          )}
        </CardContent>
      </Card>

      {/* Add Document Modal */}
      <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Document or Media</DialogTitle>
            <DialogDescription>
              Add a new document or media file to the library
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">File Name</label>
              <Input {...form.register('fileName', { required: true })} placeholder="Enter file name" />
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
                <option value="Media">Media</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...form.register('description')} placeholder="Describe the file..." />
            </div>
            <div>
              <label className="text-sm font-medium">File Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Supports: PDF, DOC, DOCX, JPG, PNG, MP4, MP3</p>
                <Input type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.png,.mp4,.mp3,.avi,.mov" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Upload File</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddDocumentOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Document Modal */}
      <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{viewDocument?.name}</DialogTitle>
            <DialogDescription>Document preview and details</DialogDescription>
          </DialogHeader>
          {viewDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Type:</span> {viewDocument.type}</div>
                <div><span className="font-medium">Size:</span> {viewDocument.size}</div>
                <div><span className="font-medium">Category:</span> {viewDocument.category}</div>
                <div><span className="font-medium">Media Type:</span> {viewDocument.mediaType}</div>
                <div><span className="font-medium">Upload Date:</span> {viewDocument.uploadDate}</div>
                <div><span className="font-medium">Status:</span> {viewDocument.status}</div>
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-gray-600">{viewDocument.description}</p>
              </div>
              <div className="bg-gray-100 p-12 text-center rounded-lg">
                {getMediaIcon(viewDocument.mediaType, 'h-16 w-16')}
                <p className="text-gray-600 mt-4">
                  {viewDocument.mediaType === 'image' ? 'Image preview would appear here' :
                   viewDocument.mediaType === 'video' ? 'Video player would appear here' :
                   viewDocument.mediaType === 'audio' ? 'Audio player would appear here' :
                   'Document preview would appear here'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

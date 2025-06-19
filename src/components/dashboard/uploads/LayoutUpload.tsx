
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function LayoutUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newFiles = Array.from(files).map(file => file.name);
          setUploadedFiles(prev => [...prev, ...newFiles]);
          toast.success('Layout uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Project Layout</h3>
        <p className="text-sm text-gray-500 mb-4">
          Support for PDF, PNG, JPG, and DWG files up to 50MB
        </p>
        
        <div className="space-y-2">
          <label htmlFor="layout-upload" className="cursor-pointer">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <span>Choose Files</span>
            </Button>
            <input
              id="layout-upload"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.dwg"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <p className="text-xs text-gray-400">or drag and drop files here</p>
        </div>
      </div>

      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Upload className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Uploaded Files</h4>
          {uploadedFiles.map((fileName, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{fileName}</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Upload Guidelines</p>
            <ul className="text-blue-700 mt-1 space-y-1">
              <li>• Ensure layouts are clear and properly scaled</li>
              <li>• Include unit numbers and dimensions where possible</li>
              <li>• Upload the most recent version of your layout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

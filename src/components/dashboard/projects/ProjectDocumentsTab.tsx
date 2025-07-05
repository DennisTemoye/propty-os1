
import React, { useState } from 'react';
import { DocumentsView } from '../documents/DocumentsView';
import { DocumentPreviewModal } from './DocumentPreviewModal';

interface ProjectDocumentsTabProps {
  project: {
    id: number;
    name: string;
  };
}

export function ProjectDocumentsTab({ project }: ProjectDocumentsTabProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <DocumentsView project={project} onViewDocument={handleViewDocument} />
      
      {selectedDocument && (
        <DocumentPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedDocument(null);
          }}
          document={selectedDocument}
        />
      )}
    </>
  );
}

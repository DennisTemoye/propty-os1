
import React from 'react';
import { DocumentsView } from '../documents/DocumentsView';

interface ProjectDocumentsTabProps {
  project: {
    id: number;
    name: string;
  };
  onPreviewDocument?: (document: any) => void;
}

export function ProjectDocumentsTab({ project, onPreviewDocument }: ProjectDocumentsTabProps) {
  return <DocumentsView project={project} onPreviewDocument={onPreviewDocument} />;
}

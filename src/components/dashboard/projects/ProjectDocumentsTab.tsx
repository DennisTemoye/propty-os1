
import React from 'react';
import { DocumentsView } from '../documents/DocumentsView';

interface ProjectDocumentsTabProps {
  project: {
    id: number;
    name: string;
  };
}

export function ProjectDocumentsTab({ project }: ProjectDocumentsTabProps) {
  return <DocumentsView project={project} />;
}

import React from "react";
import { DocumentsView } from "../documents/DocumentsView";

interface ProjectDocumentsTabProps {
  project: {
    _id: string;
    id?: string;
    name: string;
  };
}

export function ProjectDocumentsTab({ project }: ProjectDocumentsTabProps) {
  return (
    <DocumentsView
      project={{
        id: 1, // Fallback ID for documents view
        name: project.name,
      }}
    />
  );
}

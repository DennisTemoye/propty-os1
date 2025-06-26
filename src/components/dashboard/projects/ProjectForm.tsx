
import React from 'react';
import { UnifiedProjectForm } from './UnifiedProjectForm';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onFormChange?: () => void;
}

export function ProjectForm({ project, onClose, onFormChange }: ProjectFormProps) {
  return (
    <UnifiedProjectForm
      project={project}
      onClose={onClose}
      onFormChange={onFormChange}
      mode="edit"
    />
  );
}

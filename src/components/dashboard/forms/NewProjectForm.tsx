
import React from 'react';
import { UnifiedProjectForm } from '../projects/UnifiedProjectForm';

interface NewProjectFormProps {
  onClose: () => void;
  initialData?: any;
  onFormChange?: () => void;
}

export function NewProjectForm({ onClose, initialData, onFormChange }: NewProjectFormProps) {
  return (
    <UnifiedProjectForm
      project={initialData}
      onClose={onClose}
      onFormChange={onFormChange}
      mode="create"
    />
  );
}

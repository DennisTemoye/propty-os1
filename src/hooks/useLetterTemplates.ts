
import { useState, useCallback } from 'react';
import { LetterTemplate } from '@/types/allocation';

const mockTemplates: LetterTemplate[] = [
  {
    id: 'offer-template-1',
    name: 'Standard Offer Letter',
    type: 'offer_letter',
    status: 'active',
    content: `Dear {{clientName}},

We are pleased to present this offer for a property in our prestigious {{projectName}} development.

Property Details:
- Project: {{projectName}}
- Sale Amount: {{saleAmount}}
- Offer Date: {{offerDate}}

This offer is valid for 30 days from the date above. Please review the terms and conditions attached.

We look forward to your positive response.

Best regards,
{{companyName}}
{{companyAddress}}
{{companyPhone}}`,
    fields: ['clientName', 'projectName', 'saleAmount', 'offerDate', 'companyName', 'companyAddress', 'companyPhone'],
    lastModified: '2024-01-15',
    createdBy: 'System Admin'
  },
  {
    id: 'allocation-template-1',
    name: 'Standard Allocation Letter',
    type: 'allocation_letter',
    status: 'active',
    content: `Dear {{clientName}},

We are pleased to confirm the allocation of your unit in our prestigious {{projectName}} development.

Allocation Details:
- Project: {{projectName}}
- Unit Number: {{unitNumber}}
- Allocation Amount: {{allocationAmount}}
- Allocation Date: {{allocationDate}}

This allocation is now confirmed and your unit has been reserved exclusively for you.

Best regards,
{{companyName}}
Allocations Department`,
    fields: ['clientName', 'projectName', 'unitNumber', 'allocationAmount', 'allocationDate', 'companyName'],
    lastModified: '2024-01-10',
    createdBy: 'System Admin'
  }
];

export function useLetterTemplates() {
  const [templates, setTemplates] = useState<LetterTemplate[]>(mockTemplates);

  const getTemplateByType = useCallback((type: LetterTemplate['type']) => {
    return templates.find(template => template.type === type && template.status === 'active');
  }, [templates]);

  const saveTemplate = useCallback((template: LetterTemplate) => {
    setTemplates(prev => {
      const existingIndex = prev.findIndex(t => t.id === template.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...template, lastModified: new Date().toISOString() };
        return updated;
      }
      return [...prev, { ...template, id: `template-${Date.now()}`, lastModified: new Date().toISOString() }];
    });
  }, []);

  const deleteTemplate = useCallback((templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  }, []);

  const renderTemplate = useCallback((template: LetterTemplate, data: Record<string, any>) => {
    let content = template.content;
    template.fields.forEach(field => {
      const placeholder = `{{${field}}}`;
      const value = data[field] || `[${field}]`;
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });
    return content;
  }, []);

  return {
    templates,
    getTemplateByType,
    saveTemplate,
    deleteTemplate,
    renderTemplate
  };
}

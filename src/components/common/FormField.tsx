
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea' | 'select';
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  required = false,
  error,
  className,
  rows = 3,
  options = [],
  onChange,
  onBlur,
}: FormFieldProps) {
  const fieldId = `field-${name}`;

  const renderInput = () => {
    const commonProps = {
      id: fieldId,
      name,
      placeholder,
      required,
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        onChange?.(e.target.value),
      onBlur,
      className: cn(error && 'border-red-500 focus:border-red-500'),
    };

    switch (type) {
      case 'textarea':
        return <Textarea {...commonProps} rows={rows} />;
      
      case 'select':
        return (
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger className={cn(error && 'border-red-500')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return <Input {...commonProps} type={type} />;
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

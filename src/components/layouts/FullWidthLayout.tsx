
import React from 'react';

interface FullWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function FullWidthLayout({ 
  children, 
  className = '', 
  padding = 'md' 
}: FullWidthLayoutProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`w-full min-h-screen ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

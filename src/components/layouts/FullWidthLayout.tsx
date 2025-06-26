
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
    sm: 'p-2 sm:p-3 md:p-4',
    md: 'p-3 sm:p-4 md:p-6 lg:p-8',
    lg: 'p-4 sm:p-6 md:p-8 lg:p-12'
  };

  return (
    <div className={`w-full min-h-screen overflow-x-hidden ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

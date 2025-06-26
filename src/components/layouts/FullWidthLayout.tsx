
import React from 'react';
import { cn } from '@/lib/utils';

interface FullWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'paystack';
  background?: 'default' | 'gray' | 'gradient';
}

export function FullWidthLayout({ 
  children, 
  className = '', 
  padding = 'paystack',
  background = 'default'
}: FullWidthLayoutProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4 md:p-6',
    md: 'p-4 sm:p-6 md:p-8 lg:p-12',
    lg: 'p-6 sm:p-8 md:p-12 lg:p-16',
    paystack: 'paystack-spacing'
  };

  const backgroundClasses = {
    default: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-900',
    gradient: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
  };

  return (
    <div className={cn(
      'full-width min-h-screen no-overflow',
      backgroundClasses[background],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

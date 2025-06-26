
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = '2xl',
  padding = 'md'
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isSmallScreen } = useResponsive();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: isMobile ? 'px-2 py-1' : isTablet ? 'px-3 py-2' : 'px-4 py-2',
    md: isMobile ? 'px-3 py-2' : isTablet ? 'px-4 py-3' : 'px-6 py-4',
    lg: isMobile ? 'px-4 py-3' : isTablet ? 'px-6 py-4' : 'px-8 py-6'
  };

  return (
    <div className={cn(
      'w-full mx-auto',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      // Prevent horizontal scroll on small screens
      isSmallScreen && 'overflow-x-hidden',
      className
    )}>
      {children}
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = 'full',
  padding = 'md',
  fullWidth = false
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isSmallScreen } = useResponsive();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-none w-full'
  };

  const paddingClasses = {
    none: '',
    sm: isMobile ? 'px-2 py-1' : isTablet ? 'px-3 py-2' : 'px-4 py-2',
    md: isMobile ? 'px-4 py-2' : isTablet ? 'px-6 py-3' : 'px-8 py-4',
    lg: isMobile ? 'px-6 py-3' : isTablet ? 'px-8 py-4' : 'px-12 py-6'
  };

  return (
    <div className={cn(
      fullWidth ? 'w-full' : 'w-full mx-auto',
      !fullWidth && maxWidthClasses[maxWidth],
      fullWidth && 'max-w-none',
      paddingClasses[padding],
      // Prevent horizontal scroll on small screens
      isSmallScreen && 'overflow-x-hidden',
      className
    )}>
      {children}
    </div>
  );
}

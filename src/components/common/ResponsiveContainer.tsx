
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
  maxWidth = 'full',
  padding = 'md'
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'w-full'
  };

  const getPaddingClasses = () => {
    if (padding === 'none') return '';
    
    // Responsive padding based on screen size
    if (isMobile) {
      return {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4'
      }[padding];
    } else if (isTablet) {
      return {
        sm: 'px-4 py-3',
        md: 'px-6 py-4',
        lg: 'px-8 py-6'
      }[padding];
    } else if (isDesktop) {
      return {
        sm: 'px-6 py-4',
        md: 'px-8 py-6',
        lg: 'px-12 py-8'
      }[padding];
    } else if (isLargeDesktop) {
      return {
        sm: 'px-8 py-6',
        md: 'px-12 py-8',
        lg: 'px-16 py-12'
      }[padding];
    }
    
    // Default fallback
    return 'px-6 py-4';
  };

  return (
    <div className={cn(
      'w-full mx-auto',
      maxWidthClasses[maxWidth],
      getPaddingClasses(),
      // Prevent horizontal scroll on all screens
      'overflow-x-hidden',
      className
    )}>
      {children}
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'responsive';
}

export function ResponsiveContainer({ 
  children, 
  className,
  fullWidth = true,
  padding = 'responsive'
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isLargeDesktop } = useResponsive();

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'px-2 py-1';
      case 'md':
        return 'px-4 py-2';
      case 'lg':
        return 'px-6 py-3';
      case 'responsive':
        if (isMobile) return 'px-4 py-3';
        if (isTablet) return 'px-6 py-4';
        if (isLargeDesktop) return 'px-12 py-6';
        return 'px-8 py-5';
      default:
        return 'px-4 py-3';
    }
  };

  return (
    <div className={cn(
      fullWidth ? 'w-full' : 'w-full max-w-7xl mx-auto',
      getPaddingClasses(),
      className
    )}>
      {children}
    </div>
  );
}

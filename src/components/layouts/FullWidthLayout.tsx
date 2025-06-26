
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/use-responsive';

interface FullWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
  backgroundClass?: string;
}

export function FullWidthLayout({ 
  children, 
  className,
  withPadding = true,
  backgroundClass = 'bg-white dark:bg-gray-900'
}: FullWidthLayoutProps) {
  const { isMobile, isTablet, isLargeDesktop } = useResponsive();

  const getPadding = () => {
    if (!withPadding) return '';
    
    if (isMobile) return 'px-4 py-3';
    if (isTablet) return 'px-6 py-4';
    if (isLargeDesktop) return 'px-12 py-6';
    return 'px-8 py-5';
  };

  return (
    <div className={cn(
      'layout-full-width',
      backgroundClass,
      getPadding(),
      className
    )}>
      <div className="w-full mx-auto">
        {children}
      </div>
    </div>
  );
}

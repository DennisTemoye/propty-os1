
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return (
    <div className={cn(
      "p-4 md:p-6 lg:p-8 max-w-full",
      "space-y-6",
      "min-h-full",
      className
    )}>
      {children}
    </div>
  );
}


import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { useResponsive } from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const { isSmallScreen } = useResponsive();

  return (
    <SidebarProvider>
      <div className="layout-full-width flex bg-gray-50 dark:bg-gray-900">
        <CompanySidebar />
        
        <main className={cn(
          'layout-content',
          !isSmallScreen ? 'main-with-sidebar' : 'ml-0',
          'overflow-x-hidden',
          className
        )}>
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

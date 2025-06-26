
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { MobileWarningBanner } from '@/components/common/MobileWarningBanner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useResponsive } from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isSmallScreen } = useResponsive();
  const location = useLocation();

  return (
    <div className="w-full">
      <MobileWarningBanner />
      <SidebarProvider>
        <div className={cn(
          "min-h-screen flex w-full bg-gray-50 dark:bg-gray-900",
          isSmallScreen && "pt-16 sm:pt-20"
        )}>
          <CompanySidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <div className={cn(
            "flex-1 flex flex-col min-w-0 overflow-hidden w-full",
            !isSmallScreen && "ml-64"
          )}>
            <main className="flex-1 overflow-auto w-full">
              <div className={cn("w-full min-h-screen bg-gray-50", className)}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}

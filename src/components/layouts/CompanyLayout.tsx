
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';

interface CompanyLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CompanyLayout({ children, className = "" }: CompanyLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <CompanySidebar />
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

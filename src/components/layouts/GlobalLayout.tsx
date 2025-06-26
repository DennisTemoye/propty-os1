
import React from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoints } from '@/hooks/use-breakpoints';

interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function GlobalLayout({ 
  children, 
  className, 
  sidebar, 
  header, 
  footer 
}: GlobalLayoutProps) {
  const { isSmallScreen, isTablet } = useBreakpoints();

  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col w-full",
      className
    )}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      <div className="flex flex-1 overflow-hidden w-full">
        {/* Sidebar */}
        {sidebar && (
          <aside className={cn(
            "border-r bg-muted/40 flex-shrink-0",
            isSmallScreen ? "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform" : 
            isTablet ? "w-16" : "w-64"
          )}>
            {sidebar}
          </aside>
        )}

        {/* Main Content - Full Width */}
        <main className={cn(
          "flex-1 overflow-auto w-full",
          "px-4 md:px-6"
        )}>
          <div className="w-full h-full py-4 md:py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-background w-full">
          {footer}
        </footer>
      )}
    </div>
  );
}

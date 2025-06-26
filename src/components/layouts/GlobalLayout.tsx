
import React from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoints } from '@/hooks/use-breakpoints';

interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullWidth?: boolean;
  formLayout?: boolean;
}

export function GlobalLayout({ 
  children, 
  className, 
  sidebar, 
  header, 
  footer,
  fullWidth = true,
  formLayout = false
}: GlobalLayoutProps) {
  const { isSmallScreen } = useBreakpoints();

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
        {/* Sidebar - Always visible on desktop, collapsible on tablet/mobile */}
        {sidebar && (
          <aside className={cn(
            "border-r bg-muted/40 flex-shrink-0",
            isSmallScreen ? "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform" : "w-64"
          )}>
            {sidebar}
          </aside>
        )}

        {/* Main Content - Full width for dashboard, constrained for forms */}
        <main className={cn(
          "flex-1 overflow-auto w-full min-w-0",
          sidebar && !isSmallScreen && "ml-0"
        )}>
          <div className={cn(
            formLayout 
              ? "max-w-4xl mx-auto p-4 md:p-6 lg:p-8" 
              : "w-full h-full p-4 md:p-6 lg:p-8"
          )}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-background">
          {footer}
        </footer>
      )}
    </div>
  );
}

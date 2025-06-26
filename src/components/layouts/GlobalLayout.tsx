
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
  fullWidth = false,
  formLayout = false
}: GlobalLayoutProps) {
  const { isSmallScreen } = useBreakpoints();

  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col",
      className
    )}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <aside className={cn(
            "border-r bg-muted/40",
            isSmallScreen ? "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform" : "w-64 flex-shrink-0"
          )}>
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto",
          sidebar && !isSmallScreen && "ml-0",
          isSmallScreen && "w-full"
        )}>
          <div className={cn(
            fullWidth ? "w-full" : "container mx-auto",
            formLayout ? "max-w-4xl mx-auto p-4 md:p-6 lg:p-8" : fullWidth ? "p-4 md:p-6 lg:p-8" : "p-4 md:p-6 lg:p-8"
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

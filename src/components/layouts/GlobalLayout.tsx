
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
        {/* Sidebar - Fixed on desktop, overlay on mobile/tablet */}
        {sidebar && (
          <aside className={cn(
            "bg-muted/40 border-r",
            isSmallScreen 
              ? "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform" 
              : "fixed left-0 top-0 h-screen w-[260px] z-40 overflow-y-auto"
          )}>
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto w-full",
          sidebar && !isSmallScreen && "ml-[260px]",
          isSmallScreen && "w-full"
        )}>
          <div className={cn(
            "w-full h-full min-h-0",
            formLayout 
              ? "max-w-4xl mx-auto p-4 md:p-6 lg:p-8" 
              : "px-4 md:px-6 py-4 md:py-6"
          )}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className={cn(
          "border-t bg-background",
          sidebar && !isSmallScreen && "ml-[260px]"
        )}>
          {footer}
        </footer>
      )}
    </div>
  );
}

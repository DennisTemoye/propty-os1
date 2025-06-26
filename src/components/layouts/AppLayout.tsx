
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function AppLayout() {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Check if current route is a company route
  const isCompanyRoute = location.pathname.startsWith('/company');
  
  // For non-company routes, render full-width without sidebar
  if (!isCompanyRoute) {
    return (
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
    );
  }

  // For company routes, render with fixed sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        {/* Mobile/Tablet Sidebar Overlay */}
        {(isMobile || isTablet) && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-screen w-64 z-30 hidden lg:block">
          <CompanySidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {(isMobile || isTablet) && (
          <div className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 z-50 transform transition-transform duration-300 lg:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <CompanySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 min-h-screen">
          {/* Mobile Header */}
          {(isMobile || isTablet) && (
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 lg:hidden sticky top-0 z-20">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ProptyOS
                </h1>
                <div className="w-9" />
              </div>
            </header>
          )}
          
          {/* Page Content */}
          <main className="w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

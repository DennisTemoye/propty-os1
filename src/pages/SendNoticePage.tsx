
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/dashboard/CompanySidebar';
import { SendNoticeView } from '@/components/dashboard/notices/SendNoticeView';

export default function SendNoticePage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CompanySidebar />
        <main className="flex-1 p-6">
          <SendNoticeView />
        </main>
      </div>
    </SidebarProvider>
  );
}

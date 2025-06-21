
import React from 'react';
import { SendNoticeForm } from './notices/SendNoticeForm';
import { NoticeHistory } from './notices/NoticeHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, History } from 'lucide-react';

export function SendNotice() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Send Notice</h1>
          <div className="text-sm text-gray-500 mt-1">
            Send notifications to clients via email and WhatsApp with tracking and logs
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compose" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Compose Notice
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Notice History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <SendNoticeForm />
        </TabsContent>

        <TabsContent value="history">
          <NoticeHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

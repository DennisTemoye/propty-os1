
import React from 'react';
import { ResponsiveContainer } from '@/components/common/ResponsiveContainer';

// Simple CRM Pipelines placeholder component
export function CRMPipelinesPage() {
  return (
    <ResponsiveContainer className="max-w-full">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM Pipelines</h1>
          <p className="text-gray-600">Manage your sales pipelines and leads</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">New Leads</h3>
            <p className="text-gray-600">Fresh leads from various sources</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">In Progress</h3>
            <p className="text-gray-600">Leads being actively worked on</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Closed</h3>
            <p className="text-gray-600">Successfully converted leads</p>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

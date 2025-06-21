
import React from 'react';
import { ReportsGenerator } from './reports/ReportsGenerator';
import { ReportExportActions } from './reports/ReportExportActions';

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="text-sm text-gray-500 mt-1">
            Generate detailed reports for your business including payments, infrastructure fees, and service charges
          </div>
        </div>
        <ReportExportActions reportType="general" />
      </div>
      
      <ReportsGenerator />
    </div>
  );
}

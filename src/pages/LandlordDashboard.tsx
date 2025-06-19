
import React from 'react';
import { LandlordSidebar } from '@/components/dashboard/LandlordSidebar';
import { LandlordOverview } from '@/components/dashboard/LandlordOverview';
import { Properties } from '@/components/dashboard/Properties';
import { Tenants } from '@/components/dashboard/Tenants';
import { RentCollection } from '@/components/dashboard/RentCollection';
import { LandlordAccounting } from '@/components/dashboard/LandlordAccounting';
import { LeaseDocuments } from '@/components/dashboard/LeaseDocuments';
import { StaffVendors } from '@/components/dashboard/StaffVendors';
import { LandlordSettings } from '@/components/dashboard/LandlordSettings';
import { useLocation } from 'react-router-dom';

const LandlordDashboard = () => {
  const location = useLocation();

  const renderActiveModule = () => {
    const path = location.pathname;
    
    if (path === '/landlord/dashboard') {
      return <LandlordOverview />;
    } else if (path.startsWith('/landlord/properties')) {
      return <Properties />;
    } else if (path.startsWith('/landlord/tenants')) {
      return <Tenants />;
    } else if (path.startsWith('/landlord/rent-collection')) {
      return <RentCollection />;
    } else if (path.startsWith('/landlord/accounting')) {
      return <LandlordAccounting />;
    } else if (path.startsWith('/landlord/lease-documents')) {
      return <LeaseDocuments />;
    } else if (path.startsWith('/landlord/staff-vendors')) {
      return <StaffVendors />;
    } else if (path.startsWith('/landlord/settings')) {
      return <LandlordSettings />;
    } else {
      return <LandlordOverview />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <LandlordSidebar />
      <main className="flex-1 p-6">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default LandlordDashboard;

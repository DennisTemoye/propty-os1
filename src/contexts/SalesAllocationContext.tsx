
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PendingOffer, PendingAllocation, SalesRecord } from '@/types/allocation';

interface SalesAllocationContextType {
  // Counters
  pendingOffersCount: number;
  pendingAllocationsCount: number;
  pendingApprovalsCount: number;
  
  // Data
  pendingOffers: PendingOffer[];
  pendingAllocations: PendingAllocation[];
  salesRecords: SalesRecord[];
  
  // Actions
  addSalesRecord: (record: SalesRecord) => void;
  updateOfferStatus: (offerId: string, status: string) => void;
  updateAllocationStatus: (allocationId: string, status: string) => void;
  moveToApproval: (allocationId: string) => void;
  processApproval: (allocationId: string, action: 'approve' | 'decline') => void;
  
  // Counter updates
  incrementPendingOffers: () => void;
  decrementPendingOffers: () => void;
  incrementPendingAllocations: () => void;
  decrementPendingAllocations: () => void;
  incrementPendingApprovals: () => void;
  decrementPendingApprovals: () => void;
  
  // Sync function for global updates
  syncCounts: () => void;
}

const SalesAllocationContext = createContext<SalesAllocationContextType | undefined>(undefined);

// Mock data for initial state
const mockPendingOffers: PendingOffer[] = [
  {
    id: 'offer-1',
    clientName: 'John Doe',
    projectName: 'Victoria Gardens',
    salesType: 'offer_only',
    saleAmount: '₦25,000,000',
    saleDate: '2024-01-15',
    status: 'pending_offer',
    marketer: 'Jane Smith'
  },
  {
    id: 'offer-2',
    clientName: 'Sarah Johnson',
    projectName: 'Emerald Heights',
    salesType: 'offer_allocation',
    saleAmount: '₦30,000,000',
    initialPayment: '₦5,000,000',
    saleDate: '2024-01-12',
    status: 'pending_offer',
    marketer: 'Mike Davis'
  }
];

const mockPendingAllocations: PendingAllocation[] = [
  {
    id: 'allocation-1',
    clientName: 'Robert Brown',
    projectName: 'Golden View',
    unit: 'Block A - Plot 5',
    salesType: 'instant_allocation',
    submittedBy: 'Tom Johnson',
    submittedAt: '2024-01-13T11:30:00Z',
    status: 'pending',
    amount: '₦22,000,000'
  },
  {
    id: 'allocation-2',
    clientName: 'Emma Wilson',
    projectName: 'Royal Estate',
    unit: 'Block B - Plot 12',
    salesType: 'sales_offer',
    submittedBy: 'Sarah Wilson',
    submittedAt: '2024-01-14T16:45:00Z',
    status: 'pending',
    amount: '₦35,000,000'
  }
];

export function SalesAllocationProvider({ children }: { children: ReactNode }) {
  // Initialize with mock data
  const [pendingOffers, setPendingOffers] = useState<PendingOffer[]>(mockPendingOffers);
  const [pendingAllocations, setPendingAllocations] = useState<PendingAllocation[]>(mockPendingAllocations);
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);
  
  // Counters derived from actual data
  const [pendingOffersCount, setPendingOffersCount] = useState(0);
  const [pendingAllocationsCount, setPendingAllocationsCount] = useState(0);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(3); // Mock approvals

  // Sync counts with actual data
  const syncCounts = () => {
    setPendingOffersCount(pendingOffers.filter(o => o.status === 'pending_offer').length);
    setPendingAllocationsCount(pendingAllocations.filter(a => a.status === 'pending').length);
  };

  // Sync on data changes
  useEffect(() => {
    syncCounts();
  }, [pendingOffers, pendingAllocations]);

  // Actions
  const addSalesRecord = (record: SalesRecord) => {
    setSalesRecords(prev => [...prev, record]);
    
    // Create corresponding offer
    const newOffer: PendingOffer = {
      id: `offer-${Date.now()}`,
      clientName: record.clientName,
      projectName: record.projectName,
      salesType: record.salesType,
      saleAmount: record.saleAmount,
      initialPayment: record.initialPayment,
      saleDate: record.saleDate,
      status: 'pending_offer',
      marketer: record.marketerName,
      unitNumber: record.unitNumber,
      notes: record.notes
    };
    
    setPendingOffers(prev => [...prev, newOffer]);
    
    // If offer_allocation, also add to pending allocations
    if (record.salesType === 'offer_allocation') {
      const newAllocation: PendingAllocation = {
        id: `allocation-${Date.now()}`,
        clientName: record.clientName,
        projectName: record.projectName,
        unit: record.unitNumber || 'TBD',
        salesType: 'sales_offer',
        submittedBy: record.marketerName || 'System',
        submittedAt: new Date().toISOString(),
        status: 'pending',
        amount: record.saleAmount,
        notes: record.notes
      };
      setPendingAllocations(prev => [...prev, newAllocation]);
    }
  };

  const updateOfferStatus = (offerId: string, status: string) => {
    setPendingOffers(prev => 
      prev.map(offer => 
        offer.id === offerId ? { ...offer, status: status as any } : offer
      )
    );
  };

  const updateAllocationStatus = (allocationId: string, status: string) => {
    setPendingAllocations(prev => 
      prev.map(allocation => 
        allocation.id === allocationId ? { ...allocation, status: status as any } : allocation
      )
    );
  };

  const moveToApproval = (allocationId: string) => {
    updateAllocationStatus(allocationId, 'pending_approval');
    incrementPendingApprovals();
  };

  const processApproval = (allocationId: string, action: 'approve' | 'decline') => {
    updateAllocationStatus(allocationId, action === 'approve' ? 'approved' : 'declined');
    decrementPendingApprovals();
  };

  // Counter functions
  const incrementPendingOffers = () => setPendingOffersCount(prev => prev + 1);
  const decrementPendingOffers = () => setPendingOffersCount(prev => Math.max(0, prev - 1));
  const incrementPendingAllocations = () => setPendingAllocationsCount(prev => prev + 1);
  const decrementPendingAllocations = () => setPendingAllocationsCount(prev => Math.max(0, prev - 1));
  const incrementPendingApprovals = () => setPendingApprovalsCount(prev => prev + 1);
  const decrementPendingApprovals = () => setPendingApprovalsCount(prev => Math.max(0, prev - 1));

  const value = {
    // Counters
    pendingOffersCount,
    pendingAllocationsCount,
    pendingApprovalsCount,
    
    // Data
    pendingOffers,
    pendingAllocations,
    salesRecords,
    
    // Actions
    addSalesRecord,
    updateOfferStatus,
    updateAllocationStatus,
    moveToApproval,
    processApproval,
    
    // Counter updates
    incrementPendingOffers,
    decrementPendingOffers,
    incrementPendingAllocations,
    decrementPendingAllocations,
    incrementPendingApprovals,
    decrementPendingApprovals,
    
    // Sync
    syncCounts,
  };

  return (
    <SalesAllocationContext.Provider value={value}>
      {children}
    </SalesAllocationContext.Provider>
  );
}

export function useSalesAllocation() {
  const context = useContext(SalesAllocationContext);
  if (context === undefined) {
    throw new Error('useSalesAllocation must be used within a SalesAllocationProvider');
  }
  return context;
}


import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  
  // Counter updates
  incrementPendingOffers: () => void;
  decrementPendingOffers: () => void;
  incrementPendingAllocations: () => void;
  decrementPendingAllocations: () => void;
  incrementPendingApprovals: () => void;
  decrementPendingApprovals: () => void;
}

const SalesAllocationContext = createContext<SalesAllocationContextType | undefined>(undefined);

export function SalesAllocationProvider({ children }: { children: ReactNode }) {
  // State management
  const [pendingOffersCount, setPendingOffersCount] = useState(3);
  const [pendingAllocationsCount, setPendingAllocationsCount] = useState(2);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(2);
  
  const [pendingOffers, setPendingOffers] = useState<PendingOffer[]>([]);
  const [pendingAllocations, setPendingAllocations] = useState<PendingAllocation[]>([]);
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);

  // Actions
  const addSalesRecord = (record: SalesRecord) => {
    setSalesRecords(prev => [...prev, record]);
    
    if (record.salesType === 'offer_only') {
      incrementPendingOffers();
    } else if (record.salesType === 'offer_allocation') {
      incrementPendingOffers();
      incrementPendingAllocations();
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
    decrementPendingAllocations();
    incrementPendingApprovals();
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
    
    // Counter updates
    incrementPendingOffers,
    decrementPendingOffers,
    incrementPendingAllocations,
    decrementPendingAllocations,
    incrementPendingApprovals,
    decrementPendingApprovals,
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

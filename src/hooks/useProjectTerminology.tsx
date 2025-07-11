import { useMemo } from 'react';
import { Project } from '@/types/project';

export function useProjectTerminology(project?: Project | { terminologyType?: 'plots' | 'units' }) {
  return useMemo(() => {
    const type = project?.terminologyType || 'plots';
    
    return {
      terminology: type,
      labels: {
        // Singular forms
        unit: type === 'plots' ? 'Plot' : 'Unit',
        unitLower: type === 'plots' ? 'plot' : 'unit',
        // Plural forms
        units: type === 'plots' ? 'Plots' : 'Units',
        unitsLower: type === 'plots' ? 'plots' : 'units',
        // Action forms
        allocateUnit: type === 'plots' ? 'Allocate Plot' : 'Allocate Unit',
        assignUnit: type === 'plots' ? 'Assign Plot' : 'Assign Unit',
        // Management forms
        unitsManagement: type === 'plots' ? 'Plots Management' : 'Units Management',
        blockUnitsManagement: type === 'plots' ? 'Blocks & Plots Management' : 'Blocks & Units Management',
        // Status descriptions
        totalUnits: type === 'plots' ? 'Total Plots' : 'Total Units',
        availableUnits: type === 'plots' ? 'Available Plots' : 'Available Units',
        soldUnits: type === 'plots' ? 'Sold Plots' : 'Sold Units',
        reservedUnits: type === 'plots' ? 'Reserved Plots' : 'Reserved Units',
        allocatedUnits: type === 'plots' ? 'Allocated Plots' : 'Allocated Units',
        // Table headers
        unitColumn: type === 'plots' ? 'Plot ID' : 'Unit ID',
        plotNumber: type === 'plots' ? 'Plot Number' : 'Unit Number',
      }
    };
  }, [project?.terminologyType]);
}
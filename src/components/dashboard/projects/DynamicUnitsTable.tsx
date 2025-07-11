import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Users } from 'lucide-react';
import { Block, Unit } from '@/types/project';

interface DynamicUnitsTableProps {
  block: Block;
  units: Unit[];
  onEditUnit?: (unit: Unit) => void;
  onDeleteUnit?: (unitId: string) => void;
  onAssignUnit?: (unit: Unit) => void;
}

export function DynamicUnitsTable({ 
  block, 
  units, 
  onEditUnit, 
  onDeleteUnit, 
  onAssignUnit 
}: DynamicUnitsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-orange-100 text-orange-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isPlots = block.blockStructure === 'plots';
  const isUnits = block.blockStructure === 'units';
  const isMixed = block.blockStructure === 'mixed';

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isPlots ? 'Plot ID' : 'Unit ID'}</TableHead>
            {(isUnits || isMixed) && <TableHead>Unit Name</TableHead>}
            <TableHead>Size</TableHead>
            <TableHead>Price</TableHead>
            {(isUnits || isMixed) && <TableHead>Bedrooms</TableHead>}
            {(isUnits || isMixed) && <TableHead>Bathrooms</TableHead>}
            {(isPlots || isMixed) && <TableHead>Prototype</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.length > 0 ? units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">{unit.plotId}</TableCell>
              {(isUnits || isMixed) && (
                <TableCell>{unit.unitName || '-'}</TableCell>
              )}
              <TableCell>{unit.size}</TableCell>
              <TableCell className="font-medium">{unit.price}</TableCell>
              {(isUnits || isMixed) && (
                <TableCell>{unit.bedrooms || '-'}</TableCell>
              )}
              {(isUnits || isMixed) && (
                <TableCell>{unit.bathrooms || '-'}</TableCell>
              )}
              {(isPlots || isMixed) && (
                <TableCell>{unit.prototype || '-'}</TableCell>
              )}
              <TableCell>
                <Badge className={getStatusColor(unit.status)}>
                  {unit.status}
                </Badge>
              </TableCell>
              <TableCell>{unit.client || '-'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {unit.status === 'available' && onAssignUnit && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onAssignUnit(unit)}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  )}
                  {onEditUnit && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditUnit(unit)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  {onDeleteUnit && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => onDeleteUnit(unit.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell 
                colSpan={
                  isUnits ? 9 : 
                  isPlots ? 7 : 
                  10 // mixed case
                } 
                className="text-center py-8 text-gray-500"
              >
                No {isPlots ? 'plots' : isUnits ? 'units' : 'units/plots'} found in this block
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
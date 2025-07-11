import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Block, Unit } from '@/types/project';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';

interface DynamicUnitsTableProps {
  block: Block;
  onAddUnit?: () => void;
}

export function DynamicUnitsTable({ block, onAddUnit }: DynamicUnitsTableProps) {
  const { labels } = useProjectTerminology({ terminologyType: block.structureType });

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

  const renderTableHeaders = () => {
    if (block.structureType === 'units') {
      return (
        <TableRow>
          <TableHead>Unit ID</TableHead>
          <TableHead>Unit Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Bedrooms</TableHead>
          <TableHead>Bathrooms</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableHead>Plot ID</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Prototype</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    }
  };

  const renderTableRow = (unit: Unit) => {
    if (block.structureType === 'units') {
      return (
        <TableRow key={unit.id}>
          <TableCell className="font-medium">{unit.plotId}</TableCell>
          <TableCell>{unit.unitName || '-'}</TableCell>
          <TableCell>{unit.size}</TableCell>
          <TableCell className="font-medium">{unit.price}</TableCell>
          <TableCell>{unit.bedrooms || '-'}</TableCell>
          <TableCell>{unit.bathrooms || '-'}</TableCell>
          <TableCell>
            <Badge className={getStatusColor(unit.status)}>
              {unit.status}
            </Badge>
          </TableCell>
          <TableCell>{unit.client || '-'}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {unit.status === 'available' && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Users className="h-3 w-3 mr-1" />
                  Assign
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={unit.id}>
          <TableCell className="font-medium">{unit.plotId}</TableCell>
          <TableCell>{unit.size}</TableCell>
          <TableCell className="font-medium">{unit.price}</TableCell>
          <TableCell>{unit.prototype || '-'}</TableCell>
          <TableCell>
            <Badge className={getStatusColor(unit.status)}>
              {unit.status}
            </Badge>
          </TableCell>
          <TableCell>{unit.client || '-'}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {unit.status === 'available' && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Users className="h-3 w-3 mr-1" />
                  Allocate
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{labels.unitsManagement}</h3>
        <Button size="sm" onClick={onAddUnit}>
          <Plus className="h-4 w-4 mr-2" />
          Add {labels.unit}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {renderTableHeaders()}
          </TableHeader>
          <TableBody>
            {block.units?.map((unit) => renderTableRow(unit)) || (
              <TableRow>
                <TableCell colSpan={block.structureType === 'units' ? 9 : 7} className="text-center py-8 text-gray-500">
                  No {labels.unitsLower} found in this block
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
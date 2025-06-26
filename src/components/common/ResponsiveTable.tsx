
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  label: string;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
  priority?: 'high' | 'medium' | 'low'; // For responsive hiding
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
}

export function ResponsiveTable({
  columns,
  data,
  className,
  emptyMessage = 'No data available',
  onRowClick,
}: ResponsiveTableProps) {
  const { isSmallScreen } = useBreakpoints();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  // Filter columns based on screen size
  const visibleColumns = isSmallScreen 
    ? columns.filter(col => col.priority === 'high' || !col.priority)
    : columns;

  const hiddenColumns = isSmallScreen 
    ? columns.filter(col => col.priority === 'medium' || col.priority === 'low')
    : [];

  if (isSmallScreen && data.length > 0) {
    // Mobile card view
    return (
      <div className={cn('space-y-3', className)}>
        {data.map((row, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Always show high priority columns */}
                {visibleColumns.map((column) => (
                  <div key={column.key} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {column.label}:
                    </span>
                    <span className="text-sm">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </span>
                  </div>
                ))}
                
                {/* Expandable section for lower priority columns */}
                {hiddenColumns.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(index)}
                      className="w-full justify-between p-2 h-auto"
                    >
                      <span className="text-sm">More details</span>
                      {expandedRows.has(index) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    
                    {expandedRows.has(index) && (
                      <div className="space-y-2 pt-2 border-t">
                        {hiddenColumns.map((column) => (
                          <div key={column.key} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">
                              {column.label}:
                            </span>
                            <span className="text-sm">
                              {column.render ? column.render(row[column.key], row) : row[column.key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {onRowClick && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRowClick(row)}
                  className="w-full mt-3"
                >
                  View Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className={cn('rounded-md border overflow-x-auto', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length} className="text-center py-8 text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow 
                key={index}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {visibleColumns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

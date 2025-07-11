import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Block, Unit } from '@/types/project';
import { useProjectTerminology } from '@/hooks/useProjectTerminology';

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: Block;
  onAddUnit: (unit: Unit) => void;
}

export function AddUnitModal({ isOpen, onClose, block, onAddUnit }: AddUnitModalProps) {
  const [formData, setFormData] = useState({
    plotId: '',
    size: block.defaultSize || '',
    price: block.defaultPrice || '',
    unitName: '',
    bedrooms: '',
    bathrooms: '',
    prototype: '',
    status: 'available' as const
  });

  const { labels } = useProjectTerminology({ terminologyType: block.structureType });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUnit: Unit = {
      id: Date.now().toString(),
      plotId: formData.plotId,
      size: formData.size,
      price: formData.price,
      status: formData.status,
      client: null,
      ...(block.structureType === 'units' && {
        unitName: formData.unitName || undefined,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      }),
      ...(block.structureType === 'plots' && {
        prototype: formData.prototype || undefined,
      })
    };

    onAddUnit(newUnit);
    toast.success(`${labels.unit} added successfully!`);
    setFormData({
      plotId: '',
      size: block.defaultSize || '',
      price: block.defaultPrice || '',
      unitName: '',
      bedrooms: '',
      bathrooms: '',
      prototype: '',
      status: 'available'
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New {labels.unit}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="plotId">{labels.unitColumn}</Label>
            <Input
              id="plotId"
              value={formData.plotId}
              onChange={(e) => handleInputChange('plotId', e.target.value)}
              placeholder={`e.g., ${block.id}-001`}
              required
            />
          </div>

          {block.structureType === 'units' && (
            <div>
              <Label htmlFor="unitName">Unit Name (Optional)</Label>
              <Input
                id="unitName"
                value={formData.unitName}
                onChange={(e) => handleInputChange('unitName', e.target.value)}
                placeholder="e.g., 5 Bedroom Duplex"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                placeholder="e.g., 500sqm"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="e.g., ₦25,000,000"
                required
              />
            </div>
          </div>

          {block.structureType === 'units' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  placeholder="e.g., 3"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  placeholder="e.g., 2"
                  min="0"
                />
              </div>
            </div>
          )}

          {block.structureType === 'plots' && (
            <div>
              <Label htmlFor="prototype">Prototype</Label>
              <Input
                id="prototype"
                value={formData.prototype}
                onChange={(e) => handleInputChange('prototype', e.target.value)}
                placeholder="e.g., Residential Plot"
              />
            </div>
          )}

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'available' | 'reserved' | 'sold') => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add {labels.unit}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
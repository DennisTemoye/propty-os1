import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Block, Unit } from '@/types/project';

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: Block;
  onAddUnit: (unit: Unit) => void;
}

export function AddUnitModal({ isOpen, onClose, block, onAddUnit }: AddUnitModalProps) {
  const [formData, setFormData] = useState({
    plotId: '',
    unitName: '',
    size: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    prototype: '',
    status: 'available' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUnit: Unit = {
      id: `${block.id}-${Date.now()}`,
      plotId: formData.plotId,
      size: formData.size,
      price: formData.price,
      status: formData.status,
      client: null,
      ...(block.blockStructure === 'units' && {
        unitName: formData.unitName,
        bedrooms: parseInt(formData.bedrooms) || undefined,
        bathrooms: parseInt(formData.bathrooms) || undefined
      }),
      ...(block.blockStructure === 'plots' && {
        prototype: formData.prototype
      })
    };

    onAddUnit(newUnit);
    toast.success(`${block.blockStructure === 'plots' ? 'Plot' : 'Unit'} added successfully!`);
    setFormData({
      plotId: '',
      unitName: '',
      size: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      prototype: '',
      status: 'available'
    });
    onClose();
  };

  const isPlots = block.blockStructure === 'plots';
  const isUnits = block.blockStructure === 'units';
  const isMixed = block.blockStructure === 'mixed';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add New {isPlots ? 'Plot' : isUnits ? 'Unit' : 'Unit/Plot'} to {block.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="plotId">
              {isPlots ? 'Plot ID' : 'Unit ID'} *
            </Label>
            <Input
              id="plotId"
              value={formData.plotId}
              onChange={(e) => setFormData({ ...formData, plotId: e.target.value })}
              placeholder={isPlots ? 'e.g., B-P01' : 'e.g., A-001'}
              required
            />
          </div>

          {(isUnits || isMixed) && (
            <>
              <div>
                <Label htmlFor="unitName">Unit Name</Label>
                <Input
                  id="unitName"
                  value={formData.unitName}
                  onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
                  placeholder="e.g., 5 Bedroom Duplex, Studio Apartment"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </>
          )}

          {(isPlots || isMixed) && (
            <div>
              <Label htmlFor="prototype">Prototype</Label>
              <Select 
                value={formData.prototype}
                onValueChange={(value) => setFormData({ ...formData, prototype: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select prototype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential A">Residential A</SelectItem>
                  <SelectItem value="Residential B">Residential B</SelectItem>
                  <SelectItem value="Commercial Plot">Commercial Plot</SelectItem>
                  <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size">Size *</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="e.g., 500sqm"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., ₦25,000,000"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
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
              <Plus className="h-4 w-4 mr-2" />
              Add {isPlots ? 'Plot' : isUnits ? 'Unit' : 'Unit/Plot'}
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
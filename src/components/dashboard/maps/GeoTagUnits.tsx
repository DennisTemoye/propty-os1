
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Unit {
  id: number;
  name: string;
  type: string;
  coordinates: { lat: number; lng: number };
  status: string;
}

export function GeoTagUnits() {
  const [units, setUnits] = useState<Unit[]>([
    { id: 1, name: 'Unit A1', type: 'apartment', coordinates: { lat: 6.5244, lng: 3.3792 }, status: 'available' },
    { id: 2, name: 'Unit A2', type: 'apartment', coordinates: { lat: 6.5245, lng: 3.3793 }, status: 'sold' },
    { id: 3, name: 'Unit B1', type: 'apartment', coordinates: { lat: 6.5246, lng: 3.3794 }, status: 'reserved' },
  ]);

  const [newUnit, setNewUnit] = useState({
    name: '',
    type: '',
    lat: '',
    lng: '',
    status: ''
  });

  const addUnit = () => {
    if (!newUnit.name || !newUnit.type || !newUnit.lat || !newUnit.lng || !newUnit.status) {
      toast.error('Please fill all fields');
      return;
    }

    const unit: Unit = {
      id: Date.now(),
      name: newUnit.name,
      type: newUnit.type,
      coordinates: { lat: parseFloat(newUnit.lat), lng: parseFloat(newUnit.lng) },
      status: newUnit.status
    };

    setUnits([...units, unit]);
    setNewUnit({ name: '', type: '', lat: '', lng: '', status: '' });
    toast.success('Unit added successfully!');
  };

  const removeUnit = (id: number) => {
    setUnits(units.filter(unit => unit.id !== id));
    toast.success('Unit removed');
  };

  const saveGeoTags = () => {
    console.log('Saving geo-tags:', units);
    toast.success('Geo-tags saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Area */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Interactive Map</h3>
          <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Click on map to add units</p>
              <p className="text-sm text-gray-400">Units will appear as markers</p>
            </div>
          </div>
        </div>

        {/* Unit Management */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Unit Management</h3>
          
          {/* Add New Unit Form */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-base">Add New Unit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="unit-name">Unit Name</Label>
                  <Input
                    id="unit-name"
                    placeholder="e.g., Unit A1"
                    value={newUnit.name}
                    onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="unit-type">Type</Label>
                  <Select onValueChange={(value) => setNewUnit({ ...newUnit, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    placeholder="6.5244"
                    value={newUnit.lat}
                    onChange={(e) => setNewUnit({ ...newUnit, lat: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    placeholder="3.3792"
                    value={newUnit.lng}
                    onChange={(e) => setNewUnit({ ...newUnit, lng: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => setNewUnit({ ...newUnit, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={addUnit} className="w-full bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </CardContent>
          </Card>

          {/* Units List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {units.map((unit) => (
              <Card key={unit.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{unit.name}</div>
                      <div className="text-sm text-gray-500">
                        {unit.type} • {unit.coordinates.lat.toFixed(4)}, {unit.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        unit.status === 'available' ? 'bg-green-100 text-green-800' :
                        unit.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {unit.status}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => removeUnit(unit.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Import from CSV</Button>
        <Button onClick={saveGeoTags} className="bg-purple-600 hover:bg-purple-700">
          <Save className="h-4 w-4 mr-2" />
          Save Geo-tags
        </Button>
      </div>
    </div>
  );
}

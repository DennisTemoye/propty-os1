
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { PipelineStage } from './types';
import { toast } from 'sonner';

interface PipelineSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  stages: PipelineStage[];
  onUpdateStages: (stages: PipelineStage[]) => void;
}

export function PipelineSettings({ isOpen, onClose, stages, onUpdateStages }: PipelineSettingsProps) {
  const [editingStages, setEditingStages] = useState<PipelineStage[]>(stages);
  const [newStageName, setNewStageName] = useState('');

  const handleAddStage = () => {
    if (!newStageName.trim()) return;

    const newStage: PipelineStage = {
      id: `custom-${Date.now()}`,
      name: newStageName,
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      order: Math.max(...editingStages.map(s => s.order)) + 1,
      icon: 'circle'
    };

    setEditingStages([...editingStages, newStage]);
    setNewStageName('');
  };

  const handleRemoveStage = (stageId: string) => {
    setEditingStages(editingStages.filter(stage => stage.id !== stageId));
  };

  const handleSaveChanges = () => {
    onUpdateStages(editingStages);
    onClose();
    toast.success('Pipeline settings updated successfully');
  };

  const colorOptions = [
    'bg-slate-50 text-slate-700 border-slate-200',
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-orange-50 text-orange-700 border-orange-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-red-50 text-red-700 border-red-200'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pipeline Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Stages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pipeline Stages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingStages.map((stage, index) => (
                <div key={stage.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="cursor-grab">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="flex-1">
                    <Input
                      value={stage.name}
                      onChange={(e) => {
                        const updated = editingStages.map(s => 
                          s.id === stage.id ? { ...s, name: e.target.value } : s
                        );
                        setEditingStages(updated);
                      }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {colorOptions.map((color, colorIndex) => (
                      <button
                        key={colorIndex}
                        className={`w-6 h-6 rounded border-2 ${color} ${
                          stage.color === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                        }`}
                        onClick={() => {
                          const updated = editingStages.map(s => 
                            s.id === stage.id ? { ...s, color } : s
                          );
                          setEditingStages(updated);
                        }}
                      />
                    ))}
                  </div>
                  
                  <Badge className={`border font-medium ${stage.color}`} variant="outline">
                    Preview
                  </Badge>
                  
                  {!stage.isClosedStage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveStage(stage.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add New Stage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  placeholder="Enter stage name"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddStage()}
                />
                <Button onClick={handleAddStage} disabled={!newStageName.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSaveChanges} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

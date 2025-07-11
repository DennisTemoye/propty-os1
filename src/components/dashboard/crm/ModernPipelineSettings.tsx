import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, Plus, Trash2, GripVertical, Palette, Users, 
  Clock, CheckSquare, Save, RotateCcw 
} from 'lucide-react';
import { PipelineStage } from './types';
import { toast } from 'sonner';

interface ModernPipelineSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  stages: PipelineStage[];
  onUpdateStages: (stages: PipelineStage[]) => void;
}

export function ModernPipelineSettings({ 
  isOpen, 
  onClose, 
  stages, 
  onUpdateStages 
}: ModernPipelineSettingsProps) {
  const [localStages, setLocalStages] = useState<PipelineStage[]>(stages);
  const [newStageName, setNewStageName] = useState('');
  const [newStageColor, setNewStageColor] = useState('#3b82f6');
  const [draggedStage, setDraggedStage] = useState<PipelineStage | null>(null);

  const predefinedColors = [
    '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#ec4899', '#6366f1', '#84cc16', '#f97316'
  ];

  const handleAddStage = () => {
    if (!newStageName.trim()) {
      toast.error('Please enter a stage name');
      return;
    }

    const newStage: PipelineStage = {
      id: `stage_${Date.now()}`,
      name: newStageName,
      color: newStageColor,
      order: localStages.length + 1,
      icon: 'circle',
      description: `Custom stage: ${newStageName}`
    };

    setLocalStages([...localStages, newStage]);
    setNewStageName('');
    setNewStageColor('#3b82f6');
    toast.success('Stage added successfully');
  };

  const handleDeleteStage = (stageId: string) => {
    if (localStages.length <= 3) {
      toast.error('Cannot delete stage. Pipeline must have at least 3 stages.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this stage? This action cannot be undone.')) {
      const updatedStages = localStages
        .filter(stage => stage.id !== stageId)
        .map((stage, index) => ({ ...stage, order: index + 1 }));
      
      setLocalStages(updatedStages);
      toast.success('Stage deleted successfully');
    }
  };

  const handleUpdateStage = (stageId: string, updates: Partial<PipelineStage>) => {
    setLocalStages(localStages.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  };

  const handleSaveChanges = () => {
    onUpdateStages(localStages);
    onClose();
    toast.success('Pipeline settings updated successfully');
  };

  const handleResetChanges = () => {
    setLocalStages(stages);
    toast.info('Changes reset to original settings');
  };

  const handleDragStart = (e: React.DragEvent, stage: PipelineStage) => {
    setDraggedStage(stage);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    if (!draggedStage || draggedStage.id === targetStage.id) return;

    const draggedIndex = localStages.findIndex(s => s.id === draggedStage.id);
    const targetIndex = localStages.findIndex(s => s.id === targetStage.id);

    const newStages = [...localStages];
    newStages.splice(draggedIndex, 1);
    newStages.splice(targetIndex, 0, draggedStage);

    // Update order numbers
    const reorderedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1
    }));

    setLocalStages(reorderedStages);
    setDraggedStage(null);
    toast.success('Stage order updated');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm animate-scale-in">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            Pipeline Settings
          </DialogTitle>
          <DialogDescription>
            Customize your sales pipeline stages, automation settings, and workflow preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="stages" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100/50">
            <TabsTrigger value="stages" className="data-[state=active]:bg-white">Pipeline Stages</TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-white">Automation</TabsTrigger>
            <TabsTrigger value="permissions" className="data-[state=active]:bg-white">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="stages" className="space-y-6">
            {/* Add New Stage */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Add New Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="stageName">Stage Name</Label>
                    <Input
                      id="stageName"
                      value={newStageName}
                      onChange={(e) => setNewStageName(e.target.value)}
                      placeholder="Enter stage name"
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stageColor">Stage Color</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="stageColor"
                        type="color"
                        value={newStageColor}
                        onChange={(e) => setNewStageColor(e.target.value)}
                        className="w-16 h-10 p-1 bg-white/80 backdrop-blur-sm"
                      />
                      <div className="flex gap-1">
                        {predefinedColors.slice(0, 5).map((color) => (
                          <button
                            key={color}
                            onClick={() => setNewStageColor(color)}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddStage} 
                    disabled={!newStageName.trim()}
                    className="bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Stages */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Current Pipeline Stages
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Drag and drop to reorder stages. Click to edit stage properties.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {localStages
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => (
                    <div
                      key={stage.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, stage)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage)}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md cursor-move"
                    >
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      
                      <div className="flex items-center gap-3 flex-1">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="font-medium text-gray-900">{stage.name}</span>
                        <Badge variant="outline" className="text-xs">
                          Order: {stage.order}
                        </Badge>
                        {stage.isClosedStage && (
                          <Badge variant="secondary" className="text-xs bg-gray-100">
                            Closed Stage
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={stage.color}
                          onChange={(e) => handleUpdateStage(stage.id, { color: e.target.value })}
                          className="w-8 h-8 p-0 border-0 rounded"
                          title="Change color"
                        />
                        
                        <Input
                          value={stage.name}
                          onChange={(e) => handleUpdateStage(stage.id, { name: e.target.value })}
                          className="w-32 h-8 text-sm"
                        />

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStage(stage.id)}
                          disabled={localStages.length <= 3}
                          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Automation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="autoFollowUp">Auto Follow-up Days</Label>
                  <Input
                    id="autoFollowUp"
                    type="number"
                    placeholder="7"
                    className="w-32 bg-white/80 backdrop-blur-sm"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Automatically schedule follow-up reminders after this many days
                  </p>
                </div>

                <div>
                  <Label htmlFor="defaultAssignee">Default Assignee</Label>
                  <Select>
                    <SelectTrigger className="w-64 bg-white/80 backdrop-blur-sm">
                      <SelectValue placeholder="Select default assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="david">David Brown</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">
                    New leads will be automatically assigned to this person
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Required Fields for New Leads</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Name', 'Email', 'Phone', 'Project Interest', 'Budget', 'Source'].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <input type="checkbox" id={field} defaultChecked={['Name', 'Email', 'Phone'].includes(field)} />
                        <label htmlFor={field} className="text-sm">{field}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Role Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Sales Managers</h4>
                    <div className="space-y-2">
                      {['View all leads', 'Edit all leads', 'Delete leads', 'Assign leads', 'Access reports'].map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <input type="checkbox" id={`manager-${permission}`} defaultChecked />
                          <label htmlFor={`manager-${permission}`} className="text-sm">{permission}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Sales Agents</h4>
                    <div className="space-y-2">
                      {['View assigned leads', 'Edit assigned leads', 'Create new leads', 'Update lead status'].map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <input type="checkbox" id={`agent-${permission}`} defaultChecked />
                          <label htmlFor={`agent-${permission}`} className="text-sm">{permission}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Button 
            onClick={handleSaveChanges}
            className="flex-1 bg-gradient-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetChanges}
            className="px-8 hover-scale"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-8 hover-scale"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectCommission {
  id: string;
  projectId: string;
  projectName: string;
  commissionRate: number;
  commissionType: 'percentage' | 'fixed';
  fixedAmount?: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
}

interface ProjectCommissionSettingsProps {
  marketerId: string;
  marketerName: string;
}

const mockProjects = [
  { id: '1', name: 'Victoria Gardens' },
  { id: '2', name: 'Emerald Heights' },
  { id: '3', name: 'Golden View' },
  { id: '4', name: 'Sunset Residences' },
  { id: '5', name: 'Royal Palm Estate' }
];

const mockProjectCommissions: ProjectCommission[] = [
  {
    id: '1',
    projectId: '1',
    projectName: 'Victoria Gardens',
    commissionRate: 3.0,
    commissionType: 'percentage',
    isActive: true,
    startDate: '2024-01-01'
  },
  {
    id: '2',
    projectId: '2',
    projectName: 'Emerald Heights',
    commissionRate: 2.5,
    commissionType: 'percentage',
    isActive: true,
    startDate: '2024-01-15'
  },
  {
    id: '3',
    projectId: '3',
    projectName: 'Golden View',
    commissionType: 'fixed',
    fixedAmount: 500000,
    commissionRate: 0,
    isActive: true,
    startDate: '2024-02-01'
  }
];

export function ProjectCommissionSettings({ marketerId, marketerName }: ProjectCommissionSettingsProps) {
  const [commissions, setCommissions] = useState<ProjectCommission[]>(mockProjectCommissions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCommission, setEditingCommission] = useState<ProjectCommission | null>(null);
  const [formData, setFormData] = useState({
    projectId: '',
    commissionType: 'percentage',
    commissionRate: '',
    fixedAmount: '',
    startDate: '',
    endDate: ''
  });

  const availableProjects = mockProjects.filter(
    project => !commissions.some(
      comm => comm.projectId === project.id && comm.isActive
    )
  );

  const handleAddCommission = () => {
    if (!formData.projectId) {
      toast.error('Please select a project');
      return;
    }

    if (formData.commissionType === 'percentage' && !formData.commissionRate) {
      toast.error('Please enter commission rate');
      return;
    }

    if (formData.commissionType === 'fixed' && !formData.fixedAmount) {
      toast.error('Please enter fixed amount');
      return;
    }

    const selectedProject = mockProjects.find(p => p.id === formData.projectId);
    const newCommission: ProjectCommission = {
      id: Date.now().toString(),
      projectId: formData.projectId,
      projectName: selectedProject?.name || '',
      commissionType: formData.commissionType as 'percentage' | 'fixed',
      commissionRate: formData.commissionType === 'percentage' ? parseFloat(formData.commissionRate) : 0,
      fixedAmount: formData.commissionType === 'fixed' ? parseFloat(formData.fixedAmount) : undefined,
      isActive: true,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || undefined
    };

    setCommissions(prev => [...prev, newCommission]);
    setFormData({
      projectId: '',
      commissionType: 'percentage',
      commissionRate: '',
      fixedAmount: '',
      startDate: '',
      endDate: ''
    });
    setIsAddModalOpen(false);
    
    toast.success(`Commission rate set for ${selectedProject?.name}`);
  };

  const handleEditCommission = (commission: ProjectCommission) => {
    setEditingCommission(commission);
    setFormData({
      projectId: commission.projectId,
      commissionType: commission.commissionType,
      commissionRate: commission.commissionRate.toString(),
      fixedAmount: commission.fixedAmount?.toString() || '',
      startDate: commission.startDate,
      endDate: commission.endDate || ''
    });
  };

  const handleUpdateCommission = () => {
    if (!editingCommission) return;

    const updatedCommission: ProjectCommission = {
      ...editingCommission,
      commissionType: formData.commissionType as 'percentage' | 'fixed',
      commissionRate: formData.commissionType === 'percentage' ? parseFloat(formData.commissionRate) : 0,
      fixedAmount: formData.commissionType === 'fixed' ? parseFloat(formData.fixedAmount) : undefined,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined
    };

    setCommissions(prev => prev.map(comm => 
      comm.id === editingCommission.id ? updatedCommission : comm
    ));
    
    setEditingCommission(null);
    setFormData({
      projectId: '',
      commissionType: 'percentage',
      commissionRate: '',
      fixedAmount: '',
      startDate: '',
      endDate: ''
    });
    
    toast.success('Commission rate updated successfully');
  };

  const handleDeleteCommission = (commissionId: string) => {
    setCommissions(prev => prev.filter(comm => comm.id !== commissionId));
    toast.success('Commission rate removed');
  };

  const formatCommissionDisplay = (commission: ProjectCommission) => {
    if (commission.commissionType === 'percentage') {
      return `${commission.commissionRate}%`;
    } else {
      return `₦${commission.fixedAmount?.toLocaleString()} fixed`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Commission Settings</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Set project-specific commission rates for {marketerName}
            </p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Project Commission
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Project Commission Rate</DialogTitle>
                <DialogDescription>
                  Configure commission settings for a specific project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project</label>
                  <Select value={formData.projectId} onValueChange={(value) => setFormData(prev => ({ ...prev, projectId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProjects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Commission Type</label>
                  <Select value={formData.commissionType} onValueChange={(value) => setFormData(prev => ({ ...prev, commissionType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage of Sale</SelectItem>
                      <SelectItem value="fixed">Fixed Amount per Unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.commissionType === 'percentage' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3.0"
                      value={formData.commissionRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, commissionRate: e.target.value }))}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Amount (₦)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 500000"
                      value={formData.fixedAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, fixedAmount: e.target.value }))}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCommission}>
                    Add Commission Rate
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {commissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No project-specific commission rates set.</p>
            <p className="text-sm">Default marketer commission rate will apply to all projects.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell className="font-medium">{commission.projectName}</TableCell>
                  <TableCell>{formatCommissionDisplay(commission)}</TableCell>
                  <TableCell>{commission.startDate}</TableCell>
                  <TableCell>{commission.endDate || 'No end date'}</TableCell>
                  <TableCell>
                    <Badge className={commission.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {commission.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCommission(commission)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCommission(commission.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Edit Modal */}
        {editingCommission && (
          <Dialog open={true} onOpenChange={() => setEditingCommission(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Commission Rate</DialogTitle>
                <DialogDescription>
                  Update commission settings for {editingCommission.projectName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Type</label>
                  <Select value={formData.commissionType} onValueChange={(value) => setFormData(prev => ({ ...prev, commissionType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage of Sale</SelectItem>
                      <SelectItem value="fixed">Fixed Amount per Unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.commissionType === 'percentage' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3.0"
                      value={formData.commissionRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, commissionRate: e.target.value }))}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Amount (₦)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 500000"
                      value={formData.fixedAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, fixedAmount: e.target.value }))}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingCommission(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateCommission}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Commission
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
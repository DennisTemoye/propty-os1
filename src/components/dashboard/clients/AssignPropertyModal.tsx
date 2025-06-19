
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Check, User } from 'lucide-react';

interface AssignPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

const mockProjects = [
  {
    id: 1,
    name: 'Victoria Gardens Estate',
    location: 'Lekki, Lagos',
    blocks: [
      {
        id: 1,
        name: 'Block A',
        type: 'Duplex',
        availableUnits: [
          { id: 1, plotId: 'Block A - Plot 01', size: '500sqm', price: '₦25M' },
          { id: 4, plotId: 'Block A - Plot 04', size: '500sqm', price: '₦25M' },
          { id: 5, plotId: 'Block A - Plot 05', size: '500sqm', price: '₦25M' }
        ]
      },
      {
        id: 2,
        name: 'Block B',
        type: 'Bungalow',
        availableUnits: [
          { id: 6, plotId: 'Block B - Plot 01', size: '400sqm', price: '₦18M' },
          { id: 8, plotId: 'Block B - Plot 03', size: '400sqm', price: '₦18M' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Emerald Heights',
    location: 'Abuja, FCT',
    blocks: [
      {
        id: 3,
        name: 'Block C',
        type: 'Commercial',
        availableUnits: [
          { id: 10, plotId: 'Block C - Plot 01', size: '300sqm', price: '₦35M' },
          { id: 11, plotId: 'Block C - Plot 02', size: '300sqm', price: '₦35M' }
        ]
      }
    ]
  }
];

export function AssignPropertyModal({ isOpen, onClose, client }: AssignPropertyModalProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [assignmentType, setAssignmentType] = useState<'reserved' | 'sold'>('reserved');
  const [step, setStep] = useState<'project' | 'block' | 'unit' | 'confirm' | 'success'>('project');

  const handleProjectSelect = (projectId: string) => {
    const project = mockProjects.find(p => p.id.toString() === projectId);
    setSelectedProject(project);
    setSelectedBlock(null);
    setSelectedUnit(null);
    setStep('block');
  };

  const handleBlockSelect = (blockId: string) => {
    const block = selectedProject?.blocks.find((b: any) => b.id.toString() === blockId);
    setSelectedBlock(block);
    setSelectedUnit(null);
    setStep('unit');
  };

  const handleUnitSelect = (unit: any) => {
    setSelectedUnit(unit);
    setStep('confirm');
  };

  const handleConfirmAssignment = () => {
    console.log('Assigning property to client:', {
      client: client?.name,
      project: selectedProject?.name,
      block: selectedBlock?.name,
      unit: selectedUnit?.plotId,
      type: assignmentType
    });
    setStep('success');
    
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setSelectedProject(null);
    setSelectedBlock(null);
    setSelectedUnit(null);
    setAssignmentType('reserved');
    setStep('project');
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Assign Property to {client.name}
          </DialogTitle>
          <DialogDescription>
            Select a project, block, and available unit to assign to this client
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mb-6">
          {['project', 'block', 'unit', 'confirm'].map((currentStep, index) => (
            <React.Fragment key={currentStep}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep ? 'bg-purple-600 text-white' : 
                ['project', 'block', 'unit', 'confirm'].indexOf(step) > index ? 'bg-green-600 text-white' : 
                'bg-gray-200 text-gray-600'
              }`}>
                {['project', 'block', 'unit', 'confirm'].indexOf(step) > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 3 && <div className="flex-1 h-0.5 bg-gray-200"></div>}
            </React.Fragment>
          ))}
        </div>

        {step === 'project' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProjectSelect(project.id.toString())}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.location}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {project.blocks.length} blocks, {project.blocks.reduce((sum, block) => sum + block.availableUnits.length, 0)} available units
                        </p>
                      </div>
                      <Building className="h-6 w-6 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'block' && selectedProject && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Select Block in {selectedProject.name}</h3>
              <Button variant="outline" onClick={() => setStep('project')}>
                Back to Projects
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProject.blocks.map((block: any) => (
                <Card 
                  key={block.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleBlockSelect(block.id.toString())}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{block.name}</h4>
                        <p className="text-sm text-gray-600">{block.type}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {block.availableUnits.length} available units
                        </p>
                      </div>
                      <Badge variant="outline">{block.availableUnits.length} units</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'unit' && selectedBlock && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Select Unit in {selectedBlock.name}</h3>
              <Button variant="outline" onClick={() => setStep('block')}>
                Back to Blocks
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plot ID</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBlock.availableUnits.map((unit: any) => (
                      <TableRow key={unit.id} className="cursor-pointer hover:bg-gray-50"
                               onClick={() => handleUnitSelect(unit)}>
                        <TableCell className="font-medium">{unit.plotId}</TableCell>
                        <TableCell>{unit.size}</TableCell>
                        <TableCell className="font-medium">{unit.price}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'confirm' && selectedUnit && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Confirm Assignment</h3>
              <Button variant="outline" onClick={() => setStep('unit')}>
                Back to Units
              </Button>
            </div>
            
            {/* Assignment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Client Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {client.name}</div>
                    <div><span className="font-medium">Email:</span> {client.email}</div>
                    <div><span className="font-medium">Phone:</span> {client.phone}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Property Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Project:</span> {selectedProject?.name}</div>
                    <div><span className="font-medium">Block:</span> {selectedBlock?.name}</div>
                    <div><span className="font-medium">Unit:</span> {selectedUnit?.plotId}</div>
                    <div><span className="font-medium">Size:</span> {selectedUnit?.size}</div>
                    <div><span className="font-medium">Price:</span> {selectedUnit?.price}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Type</label>
              <Select value={assignmentType} onValueChange={(value: 'reserved' | 'sold') => setAssignmentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserved">Reserved (Pending Payment)</SelectItem>
                  <SelectItem value="sold">Sold (Payment Completed)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleConfirmAssignment} className="flex-1 bg-green-600 hover:bg-green-700">
                Confirm Assignment
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-900 mb-2">Property Assigned Successfully!</h3>
            <p className="text-gray-600 mb-4">
              {selectedUnit?.plotId} has been assigned to {client?.name}.
            </p>
            <p className="text-sm text-gray-500">
              Assignment documents are being generated and will be available in the client's profile.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

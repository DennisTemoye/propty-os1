import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Send, 
  Download, 
  Upload, 
  Printer, 
  Building2,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner';

interface AllocationLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: any;
  onSend: (allocation: any, options?: any) => void;
}

export function AllocationLetterModal({ isOpen, onClose, allocation, onSend }: AllocationLetterModalProps) {
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [useManualLetter, setUseManualLetter] = useState(false);
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  
  if (!allocation) return null;

  const handleSend = () => {
    const options = {
      useManualLetter,
      manualFile,
      offlineMode
    };
    
    onSend(allocation, options);
    
    if (offlineMode) {
      toast.success('Allocation letter marked for offline delivery');
    } else if (useManualLetter) {
      toast.success('Manual allocation letter sent successfully!');
    } else {
      toast.success('Allocation letter sent to client successfully!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setManualFile(file);
      setUseManualLetter(true);
      toast.success('Allocation letter file uploaded successfully');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-green-600" />
            <span>Unit Allocation Letter</span>
          </DialogTitle>
          <DialogDescription>
            Generate and send official unit allocation confirmation to client
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Letter Preview</TabsTrigger>
            <TabsTrigger value="customize">Customize Template</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            {/* Allocation Details */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Client</div>
                    <div className="font-semibold text-gray-900">{allocation.clientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Project</div>
                    <div className="font-semibold text-gray-900">{allocation.projectName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Unit</div>
                    <div className="font-semibold text-green-600">{allocation.unit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="font-semibold text-emerald-600">{allocation.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allocation Letter Preview */}
            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-6 text-sm">
                  {/* Letterhead */}
                  <div className="text-center border-b pb-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Building2 className="h-12 w-12 text-green-600" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">PROPERTY MANAGEMENT COMPANY</h2>
                        <p className="text-gray-600">Excellence in Real Estate Development</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      123 Business District, Lagos | +234 123 456 7890 | info@propertyco.com
                    </div>
                  </div>

                  {/* Document Header */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-green-700 mb-2">UNIT ALLOCATION LETTER</h3>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600">Reference: AL-{allocation.id}-{new Date().getFullYear()}</p>
                  </div>

                  {/* Recipient */}
                  <div className="space-y-2">
                    <p><strong>To:</strong> {allocation.clientName}</p>
                    <p><strong>Subject:</strong> Unit Allocation Confirmation - {allocation.projectName}</p>
                  </div>

                  {/* Letter Content */}
                  <div className="space-y-4">
                    <p>Dear {allocation.clientName},</p>
                    
                    <p>
                      We are pleased to confirm the successful allocation of your unit in our 
                      prestigious <strong>{allocation.projectName}</strong> development. This letter 
                      serves as official confirmation of your property ownership.
                    </p>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Allocation Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-green-600" />
                          <span><strong>Project:</strong> {allocation.projectName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span><strong>Unit:</strong> {allocation.unit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span><strong>Total Amount:</strong> {allocation.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span><strong>Allocation Date:</strong> {allocation.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">What's Next:</h4>
                      <ul className="list-decimal list-inside space-y-2 ml-4">
                        <li>Complete all required documentation within 30 days</li>
                        <li>Adhere to the agreed payment schedule</li>
                        <li>Attend the project orientation session</li>
                        <li>Maintain regular communication with your assigned project manager</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Important Terms & Conditions:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• This allocation is subject to full payment as per agreed schedule</li>
                        <li>• Property title transfer will commence upon completion of payments</li>
                        <li>• Any default in payment may result in allocation cancellation</li>
                        <li>• All company policies and procedures apply to this allocation</li>
                      </ul>
                    </div>

                    <p>
                      Congratulations on this significant investment milestone. Our team is committed 
                      to ensuring your journey with us is seamless and rewarding.
                    </p>

                    <p>
                      For any questions or clarifications, please don't hesitate to contact our 
                      customer service team or your assigned project manager.
                    </p>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p><strong>Project Manager:</strong> John Smith</p>
                        <p><strong>Direct Line:</strong> +234 123 456 7890</p>
                        <p><strong>Email:</strong> projects@propertyco.com</p>
                        <p><strong>Office Hours:</strong> Mon-Fri 8AM-6PM</p>
                      </div>
                    </div>

                    {/* Signature Area */}
                    <div className="mt-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="h-16 border-b border-gray-300 mb-2"></div>
                          <p className="font-semibold">Project Manager</p>
                          <p className="text-sm text-gray-600">Property Management Company</p>
                        </div>
                        <div>
                          <div className="h-16 border-b border-gray-300 mb-2"></div>
                          <p className="font-semibold">Client Acknowledgment</p>
                          <p className="text-sm text-gray-600">Date: _______________</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Template Customization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-green-300 hover:bg-green-50"
                  >
                    <Building2 className="h-6 w-6 text-green-600" />
                    <span className="text-sm">Upload Logo</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-blue-300 hover:bg-blue-50"
                  >
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span className="text-sm">Official Stamp</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-purple-300 hover:bg-purple-50"
                  >
                    <FileText className="h-6 w-6 text-purple-600" />
                    <span className="text-sm">Add Signature</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Digital Delivery */}
              <Card className={!useManualLetter && !offlineMode ? 'border-green-500 bg-green-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Send className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold">Digital Delivery</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Send generated allocation letter via email with tracking
                  </p>
                  <Button 
                    variant={!useManualLetter && !offlineMode ? "default" : "outline"}
                    onClick={() => {
                      setUseManualLetter(false);
                      setOfflineMode(false);
                    }}
                    className="w-full"
                  >
                    Use Digital Delivery
                  </Button>
                </CardContent>
              </Card>

              {/* Manual Upload */}
              <Card className={useManualLetter ? 'border-blue-500 bg-blue-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Upload className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">Manual Letter Upload</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Upload your own customized allocation letter
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="w-full"
                    />
                    {manualFile && (
                      <p className="text-sm text-blue-600">
                        File uploaded: {manualFile.name}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Offline Processing */}
              <Card className={offlineMode ? 'border-purple-500 bg-purple-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Printer className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold">Offline Hard Copy</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Print and deliver physical copy manually
                  </p>
                  <Button 
                    variant={offlineMode ? "default" : "outline"}
                    onClick={() => {
                      setOfflineMode(true);
                      setUseManualLetter(false);
                    }}
                    className="w-full"
                  >
                    Mark for Offline Delivery
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button 
            onClick={() => setShowSendConfirmation(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="h-4 w-4 mr-2" />
            {offlineMode ? 'Mark for Offline' : useManualLetter ? 'Send Manual Letter' : 'Send Allocation Letter'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => toast.success('PDF download started')}
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => { window.print(); toast.success('Print dialog opened'); }}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showSendConfirmation}
          onClose={() => setShowSendConfirmation(false)}
          onConfirm={handleSend}
          title={offlineMode ? "Mark for Offline Delivery" : "Send Allocation Letter"}
          description={
            offlineMode 
              ? `Mark this allocation letter for offline delivery to ${allocation?.clientName}? You can print and deliver it manually.`
              : `Are you sure you want to send the allocation letter to ${allocation?.clientName}? This action will notify the client and cannot be undone.`
          }
          confirmText={offlineMode ? "Mark for Offline" : "Send Letter"}
        />
      </DialogContent>
    </Dialog>
  );
}
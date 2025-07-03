import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Send, 
  Download, 
  Upload, 
  Printer, 
  Edit, 
  Image,
  Signature,
  Building2
} from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner';

interface EnhancedOfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onSend: (offer: any, options?: any) => void;
}

export function EnhancedOfferLetterModal({ isOpen, onClose, offer, onSend }: EnhancedOfferLetterModalProps) {
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [useManualLetter, setUseManualLetter] = useState(false);
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  
  if (!offer) return null;

  const handleSend = () => {
    const options = {
      useManualLetter,
      manualFile,
      offlineMode
    };
    
    onSend(offer, options);
    
    if (offlineMode) {
      toast.success('Letter marked for offline delivery');
    } else if (useManualLetter) {
      toast.success('Manual offer letter sent to client successfully!');
    } else {
      toast.success('Generated offer letter sent to client successfully!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setManualFile(file);
      setUseManualLetter(true);
      toast.success('Letter file uploaded successfully');
    }
  };

  const handleDownload = () => {
    toast.success('PDF download started');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Offer Letter Management</span>
          </DialogTitle>
          <DialogDescription>
            Review, customize, and send offer letter to client with multiple delivery options
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Letter Preview</TabsTrigger>
            <TabsTrigger value="customize">Customize Template</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            {/* Offer Details */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Client</div>
                    <div className="font-semibold text-gray-900">{offer.clientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Project</div>
                    <div className="font-semibold text-gray-900">{offer.projectName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="font-semibold text-emerald-600">{offer.saleAmount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <Badge className="bg-blue-600 text-white">
                      {offer.salesType === 'offer_only' ? 'Offer Only' : 'Offer + Allocation'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Letter Template Preview */}
            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-6 text-sm">
                  {/* Letterhead */}
                  <div className="text-center border-b pb-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Building2 className="h-12 w-12 text-blue-600" />
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PROPERTY OFFER LETTER</h3>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600">Reference: OL-{offer.id}-{new Date().getFullYear()}</p>
                  </div>

                  {/* Recipient */}
                  <div className="space-y-2">
                    <p><strong>To:</strong> {offer.clientName}</p>
                    <p><strong>Subject:</strong> Exclusive Property Offer - {offer.projectName}</p>
                  </div>

                  {/* Letter Content */}
                  <div className="space-y-4">
                    <p>Dear {offer.clientName},</p>
                    
                    <p>
                      We are delighted to present you with an exclusive opportunity to invest in our 
                      prestigious <strong>{offer.projectName}</strong> development. This offer represents 
                      exceptional value in today's competitive real estate market.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Offer Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>Project:</strong> {offer.projectName}</div>
                        {offer.unitNumber && <div><strong>Unit:</strong> {offer.unitNumber}</div>}
                        <div><strong>Total Investment:</strong> {offer.saleAmount}</div>
                        {offer.initialPayment && <div><strong>Initial Payment:</strong> {offer.initialPayment}</div>}
                        <div><strong>Offer Type:</strong> {offer.salesType === 'offer_only' ? 'Property Offer (Unit selection pending)' : 'Property Offer with Unit Allocation'}</div>
                        <div><strong>Validity:</strong> 30 days from issue date</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Prime location with excellent growth potential</li>
                        <li>World-class amenities and infrastructure</li>
                        <li>Flexible payment plans available</li>
                        <li>Professional property management services</li>
                      </ul>
                    </div>

                    {offer.salesType === 'offer_only' && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-800 font-medium">
                          <strong>Important Note:</strong> Unit allocation will be processed upon your acceptance 
                          of this offer and completion of initial payment requirements. Our sales team will 
                          assist you in selecting the perfect unit that meets your preferences.
                        </p>
                      </div>
                    )}

                    <p>
                      This offer is valid for <strong>30 days</strong> from the date of this letter. 
                      To proceed with this exceptional opportunity, please contact our sales team 
                      within the specified timeframe.
                    </p>

                    <p>
                      We look forward to welcoming you to our exclusive community and helping you 
                      achieve your real estate investment goals.
                    </p>

                    {/* Signature Area */}
                    <div className="mt-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="h-16 border-b border-gray-300 mb-2"></div>
                          <p className="font-semibold">Sales Manager</p>
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
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-blue-300 hover:bg-blue-50"
                  >
                    <Image className="h-6 w-6 text-blue-600" />
                    <span className="text-sm">Upload Logo</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-green-300 hover:bg-green-50"
                  >
                    <Signature className="h-6 w-6 text-green-600" />
                    <span className="text-sm">Add Signature</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center space-y-2 border-2 border-dashed hover:border-purple-300 hover:bg-purple-50"
                  >
                    <FileText className="h-6 w-6 text-purple-600" />
                    <span className="text-sm">Official Stamp</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Digital Delivery */}
              <Card className={!useManualLetter && !offlineMode ? 'border-blue-500 bg-blue-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Send className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">Digital Delivery</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Send generated letter via email with automatic tracking
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
              <Card className={useManualLetter ? 'border-green-500 bg-green-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Upload className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold">Manual Letter Upload</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Upload your own customized letter file
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="w-full"
                    />
                    {manualFile && (
                      <p className="text-sm text-green-600">
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
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="h-4 w-4 mr-2" />
            {offlineMode ? 'Mark for Offline' : useManualLetter ? 'Send Manual Letter' : 'Send Offer Letter'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleDownload}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            variant="outline"
            onClick={handlePrint}
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
          title={offlineMode ? "Mark for Offline Delivery" : "Send Offer Letter"}
          description={
            offlineMode 
              ? `Mark this offer letter for offline delivery to ${offer?.clientName}? You can print and deliver it manually.`
              : `Are you sure you want to send the offer letter to ${offer?.clientName}? This action will notify the client and cannot be undone.`
          }
          confirmText={offlineMode ? "Mark for Offline" : "Send Letter"}
        />
      </DialogContent>
    </Dialog>
  );
}
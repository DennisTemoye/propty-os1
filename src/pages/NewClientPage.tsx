
import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { NewClientForm } from '@/components/dashboard/forms/NewClientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const NewClientPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const formLink = "https://app.proptyos.com/form/client-intake?company=XYZ123";

  const copyFormLink = async () => {
    try {
      await navigator.clipboard.writeText(formLink);
      setCopied(true);
      toast.success('Form link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleClose = () => {
    navigate('/company/clients');
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        {/* Main Form Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/company/clients')}
                className="mb-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Button>
            </div>

            {/* Form Component */}
            <NewClientForm onClose={handleClose} />
          </div>
        </div>

        {/* Side Column */}
        <div className="w-80 p-6 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Client Self-Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Prefer to let your client fill this? Copy and send the form link below.
              </p>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Form Link</label>
                <div className="flex gap-2">
                  <Input 
                    value={formLink}
                    readOnly
                    className="text-xs bg-gray-50 dark:bg-gray-700"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyFormLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> Clients who complete this form will appear with a "Self-filled" status in your client list.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewClientPage;

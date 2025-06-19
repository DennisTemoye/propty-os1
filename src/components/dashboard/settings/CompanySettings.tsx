
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building, Upload, Save } from 'lucide-react';

export function CompanySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Company Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="ProptyOS Real Estate" />
            </div>
            <div>
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input id="companyEmail" type="email" defaultValue="info@proptyos.com" />
            </div>
            <div>
              <Label htmlFor="companyPhone">Phone Number</Label>
              <Input id="companyPhone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://proptyos.com" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" rows={3} defaultValue="123 Business Ave, Suite 100&#10;New York, NY 10001&#10;United States" />
            </div>
            <div>
              <Label htmlFor="description">Company Description</Label>
              <Textarea id="description" rows={4} defaultValue="Leading real estate management platform providing comprehensive solutions for property developers and real estate professionals." />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <Label>Company Logo</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

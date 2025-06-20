
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Share2, Users } from 'lucide-react';

export function ReferralProgram() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
          <p className="text-gray-600 mt-1">Invite other real estate companies and earn rewards</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Share2 className="h-4 w-4 mr-2" />
          Send Invitation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-500">Companies Referred</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-500">Active Referrals</div>
              </div>
              <Share2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-500">Months Earned</div>
              </div>
              <Gift className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Referral Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">How it works:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Invite other real estate companies to ProptyOS</li>
              <li>• When they activate their account, both companies get 1 month free</li>
              <li>• Track your referrals and rewards in real-time</li>
              <li>• No limit on the number of companies you can refer</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

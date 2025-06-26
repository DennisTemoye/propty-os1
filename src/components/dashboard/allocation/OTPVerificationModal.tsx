
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otpCode: string, reason?: string) => void;
  actionType: 'approve' | 'decline';
  approval: any;
}

export function OTPVerificationModal({ 
  isOpen, 
  onClose, 
  onVerify, 
  actionType, 
  approval 
}: OTPVerificationModalProps) {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const form = useForm({
    defaultValues: {
      otpCode: '',
      reason: ''
    }
  });

  const handleRequestOTP = () => {
    // Simulate OTP request
    console.log('Requesting OTP for approval:', approval?.id);
    setOtpSent(true);
    setStep('verify');
    toast.success('OTP sent to your registered phone number');
    
    // Start countdown
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = (data: any) => {
    if (!data.otpCode || data.otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    if (actionType === 'decline' && !data.reason.trim()) {
      toast.error('Please provide a reason for declining');
      return;
    }

    onVerify(data.otpCode, data.reason);
    handleClose();
  };

  const handleClose = () => {
    setStep('request');
    setOtpSent(false);
    setTimeLeft(300);
    form.reset();
    onClose();
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    toast.success('OTP resent to your registered phone number');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!approval) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>OTP Verification Required</span>
          </DialogTitle>
          <DialogDescription>
            {actionType === 'approve' ? 'Approve' : 'Decline'} {approval.type} for {approval.clientName}
          </DialogDescription>
        </DialogHeader>

        {step === 'request' ? (
          <div className="space-y-4">
            {/* Approval Summary */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Action:</span>
                    <span className="font-medium capitalize">{approval.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-medium">{approval.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project:</span>
                    <span className="font-medium">{approval.projectName}</span>
                  </div>
                  {approval.unit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium">{approval.unit}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{approval.amount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className={`p-4 rounded-lg border ${
              actionType === 'approve' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start space-x-2">
                {actionType === 'approve' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    actionType === 'approve' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {actionType === 'approve' ? 'Approval Confirmation' : 'Decline Confirmation'}
                  </p>
                  <p className={`text-sm mt-1 ${
                    actionType === 'approve' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {actionType === 'approve' 
                      ? 'This action will approve the allocation and update all related records.'
                      : 'This action will decline the allocation and notify the submitting user.'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleRequestOTP}
                className={`flex-1 ${
                  actionType === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Request OTP
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  OTP sent! Valid for {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div>
              <Label>Enter 6-digit OTP *</Label>
              <Input 
                {...form.register('otpCode', { required: true, pattern: /^\d{6}$/ })}
                placeholder="000000"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            {actionType === 'decline' && (
              <div>
                <Label>Reason for Declining *</Label>
                <Textarea 
                  {...form.register('reason', { required: actionType === 'decline' })}
                  placeholder="Please provide a detailed reason for declining this request..."
                  rows={3}
                />
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className={`flex-1 ${
                  actionType === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionType === 'approve' ? 'Approve' : 'Decline'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>

            {timeLeft > 0 && (
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-sm"
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

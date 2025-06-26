
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FullWidthLayout } from '@/components/layouts/FullWidthLayout';

const ResetCodePage = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === '123456') {
        toast.success('Code verified successfully!');
        navigate('/reset-password');
      } else {
        toast.error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('New verification code sent!');
      setCode('');
    } catch (error) {
      toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <FullWidthLayout 
      backgroundClass="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      className="min-h-screen flex items-center justify-center"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Enter verification code</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a 6-digit code to your email address.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={code} 
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 font-medium"
                >
                  {isResending ? 'Sending...' : 'Resend'}
                </button>
              </p>
              
              <Link 
                to="/forgot-password" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </FullWidthLayout>
  );
};

export default ResetCodePage;

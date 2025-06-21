
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuperAdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!show2FA) {
        setShow2FA(true);
      } else {
        // Redirect to super admin dashboard
        window.location.href = '/superadmin';
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/login" className="inline-flex items-center text-blue-300 hover:text-blue-200">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-400" />
            <h1 className="text-xl font-bold text-white">Super Admin</h1>
          </div>
        </div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800/90">
        <CardHeader className="text-center pb-2">
          <h2 className="text-2xl font-semibold text-white">Super Admin Access</h2>
          <p className="text-slate-300">Secure platform administration</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-900/20 rounded-md border border-red-800">
                {error}
              </div>
            )}
            
            {!show2FA ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter admin email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-slate-400 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="twofa" className="text-slate-200">2FA Verification Code</Label>
                <Input
                  id="twofa"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-slate-400 text-center">
                  Check your authenticator app for the verification code
                </p>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : show2FA ? 'Verify & Access' : 'Continue'}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-slate-400">
                Authorized personnel only
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminLoginPage;

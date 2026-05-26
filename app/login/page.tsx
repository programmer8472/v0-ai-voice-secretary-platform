'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'platform_admin' | 'tenant_admin' | 'tenant_user') => {
    setIsLoading(true);
    const demoEmails = {
      platform_admin: 'admin@callflow.io',
      tenant_admin: 'mike@rapidplumbing.com',
      tenant_user: 'reports@rapidplumbing.com',
    };
    
    const success = await login(demoEmails[role], 'demo');
    if (success) {
      router.push('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[400px] w-[400px] rounded-full bg-chart-2/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-muted-foreground">Sign in to your CallFlow account</p>
          </div>

          {/* Login Card */}
          <Card>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-lg">Sign in</CardTitle>
              <CardDescription>
                Enter your email and password to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              {/* Demo login options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or try a demo account
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('platform_admin')}
                    disabled={isLoading}
                    className="justify-start"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                    Platform Admin
                    <span className="ml-auto text-xs text-muted-foreground">Full access</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('tenant_admin')}
                    disabled={isLoading}
                    className="justify-start"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-chart-2 mr-2" />
                    Tenant Admin
                    <span className="ml-auto text-xs text-muted-foreground">Rapid Plumbing</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('tenant_user')}
                    disabled={isLoading}
                    className="justify-start"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-chart-3 mr-2" />
                    Client Viewer
                    <span className="ml-auto text-xs text-muted-foreground">Reports only</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/" className="text-primary hover:underline">
              Start your free trial
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

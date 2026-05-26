'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Phone,
  Building2,
  Settings,
  TestTube,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ['platform_admin', 'tenant_admin', 'tenant_user'],
  },
  {
    label: 'Jobs',
    href: '/dashboard/jobs',
    icon: <Phone className="h-4 w-4" />,
    roles: ['platform_admin', 'tenant_admin'],
  },
  {
    label: 'Organizations',
    href: '/dashboard/organizations',
    icon: <Building2 className="h-4 w-4" />,
    roles: ['platform_admin'],
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <BarChart3 className="h-4 w-4" />,
    roles: ['tenant_user'],
  },
  {
    label: 'Simulation',
    href: '/dashboard/simulation',
    icon: <TestTube className="h-4 w-4" />,
    roles: ['platform_admin'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />,
    roles: ['platform_admin', 'tenant_admin'],
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user, logout, switchRole, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user.role)
  );

  const roleLabels: Record<UserRole, string> = {
    platform_admin: 'Platform Admin',
    tenant_admin: 'Tenant Admin',
    tenant_user: 'Client Viewer',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Phone className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline-block">CallFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-8 hidden md:flex items-center gap-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Role Indicator (for demo) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-xs">
                <span className="text-muted-foreground">Viewing as:</span>
                <span className="font-medium">{roleLabels[user.role]}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => switchRole('platform_admin')}>
                Platform Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('tenant_admin')}>
                Tenant Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('tenant_user')}>
                Client Viewer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t bg-background p-4 md:hidden">
            <div className="space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="mb-2 text-xs text-muted-foreground">Switch Role (Demo)</p>
              <div className="flex flex-wrap gap-2">
                {(['platform_admin', 'tenant_admin', 'tenant_user'] as UserRole[]).map((role) => (
                  <Button
                    key={role}
                    variant={user.role === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      switchRole(role);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {roleLabels[role]}
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

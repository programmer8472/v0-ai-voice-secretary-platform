'use client';

import { useAuth } from '@/lib/auth-context';
import { PlatformAdminDashboard } from '@/components/dashboards/platform-admin-dashboard';
import { TenantAdminDashboard } from '@/components/dashboards/tenant-admin-dashboard';
import { TenantUserDashboard } from '@/components/dashboards/tenant-user-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  switch (user.role) {
    case 'platform_admin':
      return <PlatformAdminDashboard />;
    case 'tenant_admin':
      return <TenantAdminDashboard />;
    case 'tenant_user':
      return <TenantUserDashboard />;
    default:
      return <TenantUserDashboard />;
  }
}

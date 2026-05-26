'use client';

import { MetricCard } from '@/components/metric-card';
import { JobCard } from '@/components/job-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  mockPlatformMetrics,
  mockJobs,
  getOrganizationSummaries,
} from '@/lib/mock-data';
import {
  Activity,
  PhoneIncoming,
  Users,
  DollarSign,
  AlertTriangle,
  Building2,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export function PlatformAdminDashboard() {
  const orgSummaries = getOrganizationSummaries();
  const recentJobs = mockJobs.slice(0, 5);
  const urgentJobs = mockJobs.filter(
    (j) => j.urgency === 'emergency' || j.urgency === 'urgent'
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground">
          System-wide metrics and organization health across all tenants.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Workflows"
          value={mockPlatformMetrics.activeWorkflows}
          subtitle={`${mockPlatformMetrics.healthyWorkflows} healthy, ${mockPlatformMetrics.degradedWorkflows} degraded`}
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Calls Recovered"
          value={mockPlatformMetrics.missedCallsRecovered.toLocaleString()}
          subtitle="All-time across tenants"
          icon={<PhoneIncoming className="h-5 w-5" />}
          trend={8}
        />
        <MetricCard
          title="Active Organizations"
          value={mockPlatformMetrics.activeOrganizations}
          subtitle="Across all plans"
          icon={<Building2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Value Captured"
          value={`$${mockPlatformMetrics.totalValueCaptured.toLocaleString()}`}
          subtitle="Total pipeline value"
          icon={<DollarSign className="h-5 w-5" />}
          variant="success"
          trend={15}
        />
      </div>

      {/* Urgent Items Alert */}
      {urgentJobs.length > 0 && (
        <Card className="border-urgent/50 bg-urgent/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-urgent" />
              <CardTitle className="text-lg">Urgent Attention Required</CardTitle>
              <Badge variant="destructive" className="ml-auto">
                {urgentJobs.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {urgentJobs.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Organization Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Organization Health</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/organizations">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orgSummaries.map((org) => (
                <div
                  key={org.tenant.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        org.workflowHealth === 'healthy'
                          ? 'bg-success/10 text-success'
                          : org.workflowHealth === 'degraded'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {org.workflowHealth === 'healthy' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{org.tenant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {org.tenant.industry} &middot;{' '}
                        {org.metrics.activeWorkflows} active workflows
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${org.metrics.totalValueCaptured.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {org.metrics.leadsCapture} leads
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Jobs</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/jobs">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Delivery Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Total Sent</p>
              <p className="mt-1 text-2xl font-semibold">{mockPlatformMetrics.nextStepsCreated}</p>
            </div>
            <div className="rounded-lg border p-4 bg-success/5">
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="mt-1 text-2xl font-semibold text-success">
                {Math.round(mockPlatformMetrics.nextStepsCreated * 0.94)}
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-warning/5">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="mt-1 text-2xl font-semibold text-warning">
                {Math.round(mockPlatformMetrics.nextStepsCreated * 0.04)}
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-destructive/5">
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="mt-1 text-2xl font-semibold text-destructive">
                {Math.round(mockPlatformMetrics.nextStepsCreated * 0.02)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

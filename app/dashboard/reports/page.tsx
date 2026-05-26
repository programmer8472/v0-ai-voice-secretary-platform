'use client';

import { MetricCard } from '@/components/metric-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { mockTenantMetrics, getJobsForTenant } from '@/lib/mock-data';
import {
  PhoneIncoming,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Calendar,
} from 'lucide-react';

export default function ReportsPage() {
  const { user, currentTenant } = useAuth();
  const tenantId = user?.tenantId || 'tenant-1';
  const metrics = mockTenantMetrics[tenantId] || mockTenantMetrics['tenant-1'];
  const jobs = getJobsForTenant(tenantId);

  const completedJobs = jobs.filter((j) => j.status === 'completed');
  const totalPipelineValue = jobs.reduce((sum, j) => sum + (j.pipelineValue || 0), 0);
  const totalReportedValue = completedJobs.reduce((sum, j) => sum + (j.reportedValue || 0), 0);

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          Performance insights for {currentTenant?.name || 'your organization'}
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Calls Recovered"
            value={metrics.missedCallsRecovered}
            subtitle="Calls saved from voicemail"
            icon={<PhoneIncoming className="h-5 w-5" />}
            trend={metrics.weeklyTrend}
          />
          <MetricCard
            title="Leads Captured"
            value={metrics.leadsCapture}
            subtitle="Qualified opportunities"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            title="Pipeline Value"
            value={`$${totalPipelineValue.toLocaleString()}`}
            subtitle="Potential revenue"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            title="Reported Revenue"
            value={`$${totalReportedValue.toLocaleString()}`}
            subtitle="Confirmed closed deals"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
          />
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Call Distribution</CardTitle>
            <CardDescription>Breakdown by urgency level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Routine</span>
                  <span className="text-sm font-medium">{metrics.routineCases}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/50 rounded-full"
                    style={{
                      width: `${(metrics.routineCases / (metrics.routineCases + metrics.emergencyCases)) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Priority</span>
                  <span className="text-sm font-medium">{Math.round(metrics.emergencyCases * 0.6)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: '15%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Urgent / Emergency</span>
                  <span className="text-sm font-medium text-urgent">{metrics.emergencyCases}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-urgent rounded-full"
                    style={{
                      width: `${(metrics.emergencyCases / (metrics.routineCases + metrics.emergencyCases)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Performance</CardTitle>
            <CardDescription>Status of call handling workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Active Workflows</span>
                <span className="font-semibold">{metrics.activeWorkflows}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                <span className="text-sm">Completed</span>
                <span className="font-semibold text-success">{metrics.completedWorkflows}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Next Steps Created</span>
                <span className="font-semibold">{metrics.nextStepsCreated}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-urgent/10">
                <span className="text-sm">Emergencies Flagged</span>
                <span className="font-semibold text-urgent">{metrics.emergenciesFlagged}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Value Captured Summary</CardTitle>
          <CardDescription>
            ROI from calls handled by CallFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Average Lead Value</p>
              <p className="text-3xl font-bold">
                ${Math.round(totalPipelineValue / (metrics.leadsCapture || 1)).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-primary">
                {Math.round((completedJobs.length / (jobs.length || 1)) * 100)}%
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-success/10">
              <p className="text-sm text-muted-foreground mb-1">Total Revenue Impact</p>
              <p className="text-3xl font-bold text-success">
                ${metrics.totalValueCaptured.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time-based note */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Data shown for the current reporting period</span>
      </div>
    </div>
  );
}

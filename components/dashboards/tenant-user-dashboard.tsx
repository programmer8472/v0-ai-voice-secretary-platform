'use client';

import { MetricCard } from '@/components/metric-card';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import {
  mockTenantMetrics,
  getJobsForTenant,
} from '@/lib/mock-data';
import {
  PhoneIncoming,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export function TenantUserDashboard() {
  const { user, currentTenant } = useAuth();
  const tenantId = user?.tenantId || 'tenant-1';
  const metrics = mockTenantMetrics[tenantId] || mockTenantMetrics['tenant-1'];
  const jobs = getJobsForTenant(tenantId);
  
  const completedJobs = jobs.filter((j) => j.status === 'completed');
  const recentJobs = jobs.slice(0, 6);

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {currentTenant?.name || 'Your Business'} Report
        </h1>
        <p className="text-muted-foreground">
          A summary of what CallFlow is doing for your business
        </p>
      </div>

      {/* Value Highlight */}
      <Card className="bg-gradient-to-br from-success/10 via-background to-background border-success/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Value Captured</p>
            <p className="text-5xl font-bold tracking-tight text-success">
              ${metrics.totalValueCaptured.toLocaleString()}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-medium">{metrics.weeklyTrend}% increase this week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Calls Recovered"
          value={metrics.missedCallsRecovered}
          subtitle="Calls that would have gone to voicemail"
          icon={<PhoneIncoming className="h-5 w-5" />}
        />
        <MetricCard
          title="Leads Captured"
          value={metrics.leadsCapture}
          subtitle="Potential customers contacted"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Average Lead Value"
          value={`$${Math.round(metrics.totalValueCaptured / metrics.leadsCapture)}`}
          subtitle="Per captured lead"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </div>

      {/* Recent Jobs - Simplified View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>
            A snapshot of recent calls handled by CallFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{job.callerName}</p>
                    <StatusBadge variant="urgency" value={job.urgency} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {job.conversationExcerpt || job.callSummary}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(job.createdAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge variant="status" value={job.status} />
                  {job.pipelineValue && (
                    <p className="mt-2 text-sm font-medium text-success">
                      ${job.pipelineValue.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Routine Cases</span>
                <span className="font-medium">{metrics.routineCases}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(metrics.routineCases / (metrics.routineCases + metrics.emergencyCases)) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Emergency Cases</span>
                <span className="font-medium text-urgent">{metrics.emergencyCases}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-urgent rounded-full"
                  style={{
                    width: `${(metrics.emergencyCases / (metrics.routineCases + metrics.emergencyCases)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workflow Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Workflows</span>
                <Badge variant="secondary">{metrics.activeWorkflows}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed Workflows</span>
                <Badge variant="outline">{metrics.completedWorkflows}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Steps Created</span>
                <Badge variant="outline">{metrics.nextStepsCreated}</Badge>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Emergencies Flagged</span>
                <Badge variant="destructive">{metrics.emergenciesFlagged}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Data updated in real-time. Contact your administrator for detailed reports.</p>
      </div>
    </div>
  );
}

'use client';

import { MetricCard } from '@/components/metric-card';
import { JobCard } from '@/components/job-card';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import {
  mockTenantMetrics,
  getJobsForTenant,
  getDeliveryForJob,
} from '@/lib/mock-data';
import type { Job } from '@/lib/types';
import {
  Activity,
  PhoneIncoming,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export function TenantAdminDashboard() {
  const { user, currentTenant } = useAuth();
  const tenantId = user?.tenantId || 'tenant-1';
  const metrics = mockTenantMetrics[tenantId] || mockTenantMetrics['tenant-1'];
  const jobs = getJobsForTenant(tenantId);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const urgentJobs = jobs.filter(
    (j) => j.urgency === 'emergency' || j.urgency === 'urgent'
  );
  const activeJobs = jobs.filter((j) => j.status !== 'completed' && j.status !== 'archived');
  const pendingReviewJobs = jobs.filter((j) => j.status === 'pending_review');

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {currentTenant?.name || 'Rapid Plumbing Co.'} Dashboard
          </h1>
          <p className="text-muted-foreground">
            Day-to-day operations and incoming leads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Workflows"
          value={metrics.activeWorkflows}
          subtitle={`${metrics.completedWorkflows} completed total`}
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Calls Recovered This Week"
          value={metrics.missedCallsRecovered}
          icon={<PhoneIncoming className="h-5 w-5" />}
          trend={metrics.weeklyTrend}
        />
        <MetricCard
          title="Pending Review"
          value={pendingReviewJobs.length}
          subtitle="Needs your attention"
          icon={<Clock className="h-5 w-5" />}
          variant={pendingReviewJobs.length > 0 ? 'warning' : 'default'}
        />
        <MetricCard
          title="Value Captured"
          value={`$${metrics.totalValueCaptured.toLocaleString()}`}
          subtitle="Pipeline value this month"
          icon={<DollarSign className="h-5 w-5" />}
          variant="success"
          trend={metrics.weeklyTrend}
        />
      </div>

      {/* Urgent Alert */}
      {urgentJobs.length > 0 && (
        <Card className="border-urgent/50 bg-urgent/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-urgent" />
              <CardTitle className="text-lg">Urgent Jobs</CardTitle>
              <Badge variant="destructive" className="ml-auto">
                {urgentJobs.length} urgent
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {urgentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Jobs List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Incoming Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
                  <TabsTrigger value="review">
                    Needs Review ({pendingReviewJobs.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-3">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      compact
                      onClick={() => setSelectedJob(job)}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="active" className="space-y-3">
                  {activeJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      compact
                      onClick={() => setSelectedJob(job)}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="review" className="space-y-3">
                  {pendingReviewJobs.length > 0 ? (
                    pendingReviewJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        compact
                        onClick={() => setSelectedJob(job)}
                      />
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <CheckCircle2 className="mx-auto h-8 w-8 mb-2" />
                      <p>All caught up! No jobs pending review.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Job Detail */}
          {selectedJob ? (
            <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>Select a job to view details</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Routine Cases</span>
                <span className="font-medium">{metrics.routineCases}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Emergency Cases</span>
                <span className="font-medium text-urgent">{metrics.emergencyCases}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Emergencies Flagged</span>
                <span className="font-medium">{metrics.emergenciesFlagged}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Weekly Trend</span>
                <span className={`flex items-center gap-1 font-medium ${metrics.weeklyTrend >= 0 ? 'text-success' : 'text-destructive'}`}>
                  <TrendingUp className="h-4 w-4" />
                  {metrics.weeklyTrend}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function JobDetailPanel({ job, onClose }: { job: Job; onClose: () => void }) {
  const delivery = getDeliveryForJob(job.id);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{job.callerName}</CardTitle>
            <p className="text-sm text-muted-foreground">{job.callerPhone}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge variant="urgency" value={job.urgency} />
          <StatusBadge variant="status" value={job.status} />
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Summary</p>
          <p className="text-sm text-muted-foreground">{job.callSummary}</p>
        </div>

        {job.transcript && (
          <div>
            <p className="text-sm font-medium mb-1">Transcript Excerpt</p>
            <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground italic">
              &quot;{job.transcript.slice(0, 200)}...&quot;
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium mb-1">Next Step</p>
          <p className="text-sm text-muted-foreground">{job.nextStepOutcome}</p>
        </div>

        {job.pipelineValue && (
          <div>
            <p className="text-sm font-medium mb-1">Pipeline Value</p>
            <p className="text-lg font-semibold text-success">
              ${job.pipelineValue.toLocaleString()}
            </p>
          </div>
        )}

        {delivery && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Notification Status</p>
            <div className="flex items-center gap-2">
              <StatusBadge variant="delivery" value={delivery.status} />
              <span className="text-sm text-muted-foreground">
                via {delivery.channel} to {delivery.targetContact}
              </span>
            </div>
            {delivery.error && (
              <p className="mt-1 text-sm text-destructive">{delivery.error}</p>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Created {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </div>

        <Button className="w-full" asChild>
          <a href={`tel:${job.callerPhone.replace(/\D/g, '')}`}>
            Call Back
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

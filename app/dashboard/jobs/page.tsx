'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/job-card';
import { StatusBadge } from '@/components/status-badge';
import { useAuth } from '@/lib/auth-context';
import { mockJobs, getJobsForTenant, getDeliveryForJob } from '@/lib/mock-data';
import type { Job, UrgencyLevel, JobStatus } from '@/lib/types';
import { Search, Filter, X, Phone, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function JobsPage() {
  const { user } = useAuth();
  const isPlatformAdmin = user?.role === 'platform_admin';
  
  const allJobs = isPlatformAdmin
    ? mockJobs
    : getJobsForTenant(user?.tenantId || 'tenant-1');

  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      searchQuery === '' ||
      job.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.callSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.callerPhone.includes(searchQuery);

    const matchesUrgency = urgencyFilter === 'all' || job.urgency === urgencyFilter;
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

    return matchesSearch && matchesUrgency && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setUrgencyFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchQuery || urgencyFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground">
          {isPlatformAdmin ? 'All jobs across organizations' : 'Incoming calls and leads'}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={urgencyFilter}
                onValueChange={(value) => setUrgencyFilter(value as UrgencyLevel | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as JobStatus | 'all')}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {hasActiveFilters && (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {allJobs.length} jobs
            </p>
          )}
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No jobs match your filters.</p>
            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Job Detail Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-lg">
          {selectedJob && <JobDetailContent job={selectedJob} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobDetailContent({ job }: { job: Job }) {
  const delivery = getDeliveryForJob(job.id);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {job.callerName}
          <StatusBadge variant="urgency" value={job.urgency} />
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{job.callerPhone}</span>
        </div>

        <div className="flex gap-2">
          <StatusBadge variant="status" value={job.status} />
          <Badge variant="outline">{job.intent.replace('_', ' ')}</Badge>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Summary</p>
          <p className="text-sm text-muted-foreground">{job.callSummary}</p>
        </div>

        {job.transcript && (
          <div>
            <p className="text-sm font-medium mb-1">Transcript</p>
            <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground italic">
              &quot;{job.transcript}&quot;
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium mb-1">Next Step</p>
          <p className="text-sm text-muted-foreground">{job.nextStepOutcome}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </div>
          {job.pipelineValue && (
            <div className="flex items-center gap-1.5 text-success">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">${job.pipelineValue.toLocaleString()}</span>
            </div>
          )}
        </div>

        {delivery && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-2">Notification</p>
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

        <Button className="w-full" asChild>
          <a href={`tel:${job.callerPhone.replace(/\D/g, '')}`}>Call Back</a>
        </Button>
      </div>
    </>
  );
}

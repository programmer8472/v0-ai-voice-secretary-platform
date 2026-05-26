'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { cn } from '@/lib/utils';
import type { Job } from '@/lib/types';
import { Phone, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
}

export function JobCard({ job, onClick, compact = false, className }: JobCardProps) {
  const timeAgo = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

  if (compact) {
    return (
      <div
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          'flex items-center justify-between rounded-lg border bg-card p-3 transition-colors',
          onClick && 'cursor-pointer hover:bg-accent',
          className
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <StatusBadge variant="urgency" value={job.urgency} />
          <div className="min-w-0">
            <p className="font-medium truncate">{job.callerName}</p>
            <p className="text-sm text-muted-foreground truncate">{job.conversationExcerpt || job.callSummary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
          {onClick && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        'transition-all',
        onClick && 'cursor-pointer hover:shadow-md hover:border-primary/30',
        job.urgency === 'emergency' && 'border-urgent/50 bg-urgent/5',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{job.callerName}</h3>
              <StatusBadge variant="urgency" value={job.urgency} />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>{job.callerPhone}</span>
            </div>
          </div>
          <StatusBadge variant="status" value={job.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.callSummary}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{timeAgo}</span>
            </div>
            {job.pipelineValue && (
              <div className="flex items-center gap-1.5 text-success">
                <DollarSign className="h-3.5 w-3.5" />
                <span>${job.pipelineValue.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {/* Workflow Progress */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${job.workflowProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{job.workflowProgress}%</span>
          </div>
        </div>

        {job.nextStepOutcome && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Next step:</span> {job.nextStepOutcome}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

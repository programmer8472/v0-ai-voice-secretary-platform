import { cn } from '@/lib/utils';
import type { UrgencyLevel, JobStatus, DeliveryStatus } from '@/lib/types';

interface StatusBadgeProps {
  variant: 'urgency' | 'status' | 'delivery';
  value: UrgencyLevel | JobStatus | DeliveryStatus;
  className?: string;
}

const urgencyStyles: Record<UrgencyLevel, string> = {
  routine: 'bg-muted text-muted-foreground',
  priority: 'bg-warning/20 text-warning-foreground dark:text-warning',
  urgent: 'bg-urgent/20 text-urgent',
  emergency: 'bg-urgent text-urgent-foreground animate-pulse',
};

const statusStyles: Record<JobStatus, string> = {
  new: 'bg-primary/20 text-primary',
  in_progress: 'bg-chart-2/20 text-chart-2',
  pending_review: 'bg-warning/20 text-warning-foreground dark:text-warning',
  completed: 'bg-success/20 text-success',
  archived: 'bg-muted text-muted-foreground',
};

const deliveryStyles: Record<DeliveryStatus, string> = {
  pending: 'bg-muted text-muted-foreground',
  sent: 'bg-primary/20 text-primary',
  delivered: 'bg-success/20 text-success',
  failed: 'bg-destructive/20 text-destructive',
  skipped: 'bg-muted text-muted-foreground',
};

const urgencyLabels: Record<UrgencyLevel, string> = {
  routine: 'Routine',
  priority: 'Priority',
  urgent: 'Urgent',
  emergency: 'Emergency',
};

const statusLabels: Record<JobStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  pending_review: 'Pending Review',
  completed: 'Completed',
  archived: 'Archived',
};

const deliveryLabels: Record<DeliveryStatus, string> = {
  pending: 'Pending',
  sent: 'Sent',
  delivered: 'Delivered',
  failed: 'Failed',
  skipped: 'Skipped',
};

export function StatusBadge({ variant, value, className }: StatusBadgeProps) {
  let styles = '';
  let label = '';

  if (variant === 'urgency') {
    styles = urgencyStyles[value as UrgencyLevel];
    label = urgencyLabels[value as UrgencyLevel];
  } else if (variant === 'status') {
    styles = statusStyles[value as JobStatus];
    label = statusLabels[value as JobStatus];
  } else {
    styles = deliveryStyles[value as DeliveryStatus];
    label = deliveryLabels[value as DeliveryStatus];
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        styles,
        className
      )}
    >
      {label}
    </span>
  );
}

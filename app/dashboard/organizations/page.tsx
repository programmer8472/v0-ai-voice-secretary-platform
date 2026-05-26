'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getOrganizationSummaries } from '@/lib/mock-data';
import {
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  DollarSign,
  Phone,
  ExternalLink,
} from 'lucide-react';

export default function OrganizationsPage() {
  const organizations = getOrganizationSummaries();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
        <p className="text-muted-foreground">
          Manage tenants and view organization-level metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Organizations</p>
                <p className="text-2xl font-semibold">{organizations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-success/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Healthy</p>
                <p className="text-2xl font-semibold">
                  {organizations.filter((o) => o.workflowHealth === 'healthy').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-warning/10 p-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Degraded</p>
                <p className="text-2xl font-semibold">
                  {organizations.filter((o) => o.workflowHealth === 'degraded').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <DollarSign className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-semibold">
                  ${organizations.reduce((sum, o) => sum + o.metrics.totalValueCaptured, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations List */}
      <div className="grid gap-6">
        {organizations.map((org) => (
          <Card key={org.tenant.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      org.workflowHealth === 'healthy'
                        ? 'bg-success/10 text-success'
                        : org.workflowHealth === 'degraded'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {org.workflowHealth === 'healthy' ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : org.workflowHealth === 'degraded' ? (
                      <AlertTriangle className="h-6 w-6" />
                    ) : (
                      <XCircle className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{org.tenant.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{org.tenant.industry}</Badge>
                      <Badge
                        variant={
                          org.tenant.status === 'active'
                            ? 'default'
                            : org.tenant.status === 'trial'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {org.tenant.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Calls Recovered
                  </div>
                  <p className="text-xl font-semibold">{org.metrics.missedCallsRecovered}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Leads Captured
                  </div>
                  <p className="text-xl font-semibold">{org.metrics.leadsCapture}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Value Captured
                  </div>
                  <p className="text-xl font-semibold text-success">
                    ${org.metrics.totalValueCaptured.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4" />
                    Emergencies
                  </div>
                  <p className="text-xl font-semibold">{org.metrics.emergenciesFlagged}</p>
                </div>
              </div>

              {/* Recent Jobs Preview */}
              {org.recentJobs.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Recent Activity</p>
                  <div className="space-y-2">
                    {org.recentJobs.slice(0, 2).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              job.urgency === 'emergency'
                                ? 'bg-urgent animate-pulse'
                                : job.urgency === 'urgent'
                                  ? 'bg-warning'
                                  : 'bg-muted-foreground'
                            }`}
                          />
                          <span>{job.callerName}</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="text-muted-foreground truncate max-w-[200px]">
                            {job.conversationExcerpt || job.callSummary}
                          </span>
                        </div>
                        {job.pipelineValue && (
                          <span className="text-success font-medium">
                            ${job.pipelineValue}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

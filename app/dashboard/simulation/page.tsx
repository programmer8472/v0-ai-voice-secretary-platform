'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/status-badge';
import { mockTestScenarios, mockTenants } from '@/lib/mock-data';
import type { TestScenario, ScenarioType, IntentCategory } from '@/lib/types';
import {
  TestTube,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
  Phone,
  FileText,
  Send,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const scenarioTypes: { value: ScenarioType; label: string }[] = [
  { value: 'missed_call', label: 'Missed Call' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'service_inquiry', label: 'Service Inquiry' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'after_hours', label: 'After Hours' },
];

const expectedIntents: { value: IntentCategory; label: string }[] = [
  { value: 'service_request', label: 'Service Request' },
  { value: 'inquiry', label: 'General Inquiry' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'other', label: 'Other' },
];

export default function SimulationPage() {
  const [scenarios, setScenarios] = useState<TestScenario[]>(mockTestScenarios);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null);

  // New scenario form state
  const [newScenario, setNewScenario] = useState({
    name: '',
    type: 'missed_call' as ScenarioType,
    expectedIntent: 'service_request' as IntentCategory,
    transcript: '',
    tenantId: 'tenant-1',
  });

  const runScenario = async (scenario: TestScenario) => {
    setIsRunning(true);
    setSelectedScenario(scenario);

    // Simulate running the scenario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update scenario with results
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === scenario.id
          ? {
              ...s,
              status: 'completed' as const,
              completedAt: new Date().toISOString(),
              resultSummary: `Intent correctly identified as ${scenario.expectedIntent}. Workflow triggered successfully.`,
            }
          : s
      )
    );

    setIsRunning(false);
  };

  const createScenario = () => {
    const newId = `scenario-${Date.now()}`;
    const scenario: TestScenario = {
      id: newId,
      name: newScenario.name || `Test Scenario ${scenarios.length + 1}`,
      type: newScenario.type,
      expectedIntent: newScenario.expectedIntent,
      transcript: newScenario.transcript,
      deliveryMode: 'mock',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setScenarios((prev) => [scenario, ...prev]);
    setNewScenario({
      name: '',
      type: 'missed_call',
      expectedIntent: 'service_request',
      transcript: '',
      tenantId: 'tenant-1',
    });
  };

  const getStatusIcon = (status: TestScenario['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <TestTube className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Simulation Lab</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          Test call scenarios and inspect downstream workflow results
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Create New Scenario */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Create Test Scenario</CardTitle>
            <CardDescription>
              Simulate a call and test the AI response and workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <input
                id="scenario-name"
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="e.g., Emergency Gas Leak"
                value={newScenario.name}
                onChange={(e) =>
                  setNewScenario((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenario-type">Scenario Type</Label>
              <Select
                value={newScenario.type}
                onValueChange={(value: ScenarioType) =>
                  setNewScenario((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarioTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-intent">Expected Intent</Label>
              <Select
                value={newScenario.expectedIntent}
                onValueChange={(value: IntentCategory) =>
                  setNewScenario((prev) => ({ ...prev, expectedIntent: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {expectedIntents.map((intent) => (
                    <SelectItem key={intent.value} value={intent.value}>
                      {intent.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenant">Test Tenant</Label>
              <Select
                value={newScenario.tenantId}
                onValueChange={(value) =>
                  setNewScenario((prev) => ({ ...prev, tenantId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockTenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transcript">Sample Transcript</Label>
              <Textarea
                id="transcript"
                placeholder="Enter the simulated caller transcript..."
                className="min-h-[100px]"
                value={newScenario.transcript}
                onChange={(e) =>
                  setNewScenario((prev) => ({ ...prev, transcript: e.target.value }))
                }
              />
            </div>

            <Button onClick={createScenario} className="w-full" disabled={!newScenario.transcript}>
              <Play className="mr-2 h-4 w-4" />
              Create Scenario
            </Button>
          </CardContent>
        </Card>

        {/* Scenario List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Test Scenarios</CardTitle>
                <CardDescription>
                  {scenarios.filter((s) => s.status === 'completed').length} of{' '}
                  {scenarios.length} completed
                </CardDescription>
              </div>
              <Badge variant="outline">Mock Mode</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    selectedScenario?.id === scenario.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {getStatusIcon(scenario.status)}
                      <div className="min-w-0">
                        <p className="font-medium">{scenario.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {scenario.transcript.slice(0, 80)}...
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {scenario.type.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Expected: {scenario.expectedIntent.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant={scenario.status === 'pending' ? 'default' : 'outline'}
                        onClick={() => runScenario(scenario)}
                        disabled={isRunning}
                      >
                        {scenario.status === 'running' ? (
                          <>
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Running...
                          </>
                        ) : scenario.status === 'completed' ? (
                          'Re-run'
                        ) : (
                          <>
                            <Play className="mr-1 h-3 w-3" />
                            Run
                          </>
                        )}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(scenario.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Result Summary */}
                  {scenario.resultSummary && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Result:</span>{' '}
                        {scenario.resultSummary}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Details Panel */}
      {selectedScenario && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scenario Details: {selectedScenario.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" />
                  Input Transcript
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm">
                  &quot;{selectedScenario.transcript}&quot;
                </div>
              </div>

              {/* Processing */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  AI Analysis
                </div>
                <div className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Detected Intent</span>
                    <Badge variant="secondary">{selectedScenario.expectedIntent}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Scenario Type</span>
                    <Badge variant="outline">{selectedScenario.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Urgency</span>
                    <StatusBadge
                      variant="urgency"
                      value={
                        selectedScenario.type === 'emergency'
                          ? 'emergency'
                          : 'routine'
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Send className="h-4 w-4" />
                  Notification Outcome
                </div>
                <div className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Channel</span>
                    <Badge variant="secondary">SMS</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mode</span>
                    <Badge variant="outline">{selectedScenario.deliveryMode}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge
                      variant="delivery"
                      value={selectedScenario.status === 'completed' ? 'delivered' : 'pending'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {selectedScenario.resultSummary && (
              <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Test Passed</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedScenario.resultSummary}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

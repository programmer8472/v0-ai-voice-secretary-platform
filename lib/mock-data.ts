import type {
  User,
  Tenant,
  Job,
  CommunicationDelivery,
  PlatformMetrics,
  TenantMetrics,
  TestScenario,
  OrganizationSummary,
} from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@callflow.io',
    name: 'Sarah Chen',
    role: 'platform_admin',
  },
  {
    id: 'user-2',
    email: 'mike@rapidplumbing.com',
    name: 'Mike Johnson',
    role: 'tenant_admin',
    tenantId: 'tenant-1',
  },
  {
    id: 'user-3',
    email: 'reports@rapidplumbing.com',
    name: 'Lisa Martinez',
    role: 'tenant_user',
    tenantId: 'tenant-1',
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Rapid Plumbing Co.',
    industry: 'Plumbing',
    preferredNextStepLanguage: 'A technician will call you back within 2 hours.',
    communicationPreferences: {
      smsEnabled: true,
      emailEnabled: true,
      slackEnabled: false,
      notifyOnUrgent: true,
      notifyOnNewLead: true,
    },
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    id: 'tenant-2',
    name: 'CoolBreeze HVAC',
    industry: 'HVAC',
    preferredNextStepLanguage: 'Our team will reach out shortly to schedule your service.',
    communicationPreferences: {
      smsEnabled: true,
      emailEnabled: true,
      slackEnabled: true,
      notifyOnUrgent: true,
      notifyOnNewLead: true,
    },
    createdAt: '2024-02-20T14:30:00Z',
    status: 'active',
  },
  {
    id: 'tenant-3',
    name: 'Volt Electric Services',
    industry: 'Electrical',
    preferredNextStepLanguage: 'An electrician will contact you within the hour.',
    communicationPreferences: {
      smsEnabled: true,
      emailEnabled: false,
      slackEnabled: false,
      notifyOnUrgent: true,
      notifyOnNewLead: false,
    },
    createdAt: '2024-03-10T09:15:00Z',
    status: 'trial',
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    tenantId: 'tenant-1',
    callerName: 'Robert Williams',
    callerPhone: '+1 (555) 123-4567',
    callSummary: 'Caller reported a burst pipe in their basement causing flooding. Water is actively leaking and they need immediate assistance.',
    intent: 'emergency',
    urgency: 'emergency',
    status: 'in_progress',
    nextStepOutcome: 'Emergency dispatch initiated - Tech en route',
    createdAt: '2024-03-15T08:30:00Z',
    workflowProgress: 75,
    pipelineValue: 850,
    transcript: 'Hi, I have a burst pipe in my basement and water is everywhere. I need someone here as soon as possible...',
    conversationExcerpt: 'Burst pipe in basement, active flooding, requires immediate dispatch.',
  },
  {
    id: 'job-2',
    tenantId: 'tenant-1',
    callerName: 'Jennifer Adams',
    callerPhone: '+1 (555) 234-5678',
    callSummary: 'Customer inquiring about water heater replacement options and pricing.',
    intent: 'service_request',
    urgency: 'routine',
    status: 'pending_review',
    nextStepOutcome: 'Quote request created - Await callback',
    createdAt: '2024-03-15T07:45:00Z',
    workflowProgress: 50,
    pipelineValue: 2500,
    transcript: 'Hello, I would like to get a quote for replacing my water heater. It is about 15 years old...',
    conversationExcerpt: 'Water heater replacement inquiry, 15-year old unit.',
  },
  {
    id: 'job-3',
    tenantId: 'tenant-1',
    callerName: 'David Chen',
    callerPhone: '+1 (555) 345-6789',
    callSummary: 'Drain cleaning request for slow kitchen sink. Not urgent.',
    intent: 'service_request',
    urgency: 'routine',
    status: 'new',
    nextStepOutcome: 'Scheduled callback for estimate',
    createdAt: '2024-03-15T06:20:00Z',
    workflowProgress: 25,
    pipelineValue: 175,
    conversationExcerpt: 'Kitchen sink draining slowly, requesting service.',
  },
  {
    id: 'job-4',
    tenantId: 'tenant-2',
    callerName: 'Maria Santos',
    callerPhone: '+1 (555) 456-7890',
    callSummary: 'AC unit not cooling. Temperature in home is rising.',
    intent: 'service_request',
    urgency: 'priority',
    status: 'in_progress',
    nextStepOutcome: 'Technician assigned - ETA 2 hours',
    createdAt: '2024-03-15T09:00:00Z',
    workflowProgress: 60,
    pipelineValue: 450,
    conversationExcerpt: 'AC not cooling, home temperature rising, needs priority service.',
  },
  {
    id: 'job-5',
    tenantId: 'tenant-2',
    callerName: 'Tom Baker',
    callerPhone: '+1 (555) 567-8901',
    callSummary: 'Annual HVAC maintenance scheduling request.',
    intent: 'service_request',
    urgency: 'routine',
    status: 'completed',
    nextStepOutcome: 'Appointment scheduled for next week',
    createdAt: '2024-03-14T15:30:00Z',
    workflowProgress: 100,
    pipelineValue: 199,
    reportedValue: 199,
    conversationExcerpt: 'Requesting annual maintenance, flexible scheduling.',
  },
  {
    id: 'job-6',
    tenantId: 'tenant-3',
    callerName: 'Angela Price',
    callerPhone: '+1 (555) 678-9012',
    callSummary: 'Sparking outlet in kitchen - potential fire hazard.',
    intent: 'emergency',
    urgency: 'urgent',
    status: 'in_progress',
    nextStepOutcome: 'Emergency electrician dispatched',
    createdAt: '2024-03-15T08:15:00Z',
    workflowProgress: 80,
    pipelineValue: 350,
    conversationExcerpt: 'Kitchen outlet sparking, safety concern, urgent response needed.',
  },
];

// Mock Communication Deliveries
export const mockDeliveries: CommunicationDelivery[] = [
  {
    id: 'delivery-1',
    jobId: 'job-1',
    channel: 'sms',
    mode: 'live',
    status: 'delivered',
    providerStatus: 'delivered',
    targetContact: '+1 (555) 999-0001',
    sentAt: '2024-03-15T08:31:00Z',
    deliveredAt: '2024-03-15T08:31:05Z',
  },
  {
    id: 'delivery-2',
    jobId: 'job-1',
    channel: 'email',
    mode: 'live',
    status: 'delivered',
    providerStatus: 'opened',
    targetContact: 'dispatch@rapidplumbing.com',
    sentAt: '2024-03-15T08:31:00Z',
    deliveredAt: '2024-03-15T08:31:30Z',
  },
  {
    id: 'delivery-3',
    jobId: 'job-2',
    channel: 'sms',
    mode: 'live',
    status: 'sent',
    providerStatus: 'sent',
    targetContact: '+1 (555) 999-0001',
    sentAt: '2024-03-15T07:46:00Z',
  },
  {
    id: 'delivery-4',
    jobId: 'job-4',
    channel: 'slack',
    mode: 'live',
    status: 'delivered',
    providerStatus: 'posted',
    targetContact: '#urgent-calls',
    sentAt: '2024-03-15T09:01:00Z',
    deliveredAt: '2024-03-15T09:01:02Z',
  },
  {
    id: 'delivery-5',
    jobId: 'job-6',
    channel: 'sms',
    mode: 'live',
    status: 'failed',
    providerStatus: 'undeliverable',
    error: 'Phone number not reachable',
    targetContact: '+1 (555) 999-0003',
    sentAt: '2024-03-15T08:16:00Z',
  },
];

// Mock Platform Metrics
export const mockPlatformMetrics: PlatformMetrics = {
  activeWorkflows: 47,
  completedWorkflows: 1284,
  missedCallsRecovered: 892,
  leadsCapture: 1156,
  nextStepsCreated: 1089,
  emergenciesFlagged: 23,
  totalValueCaptured: 245780,
  activeOrganizations: 12,
  healthyWorkflows: 44,
  degradedWorkflows: 3,
};

// Mock Tenant Metrics
export const mockTenantMetrics: Record<string, TenantMetrics> = {
  'tenant-1': {
    activeWorkflows: 8,
    completedWorkflows: 234,
    missedCallsRecovered: 156,
    leadsCapture: 189,
    nextStepsCreated: 178,
    emergenciesFlagged: 4,
    totalValueCaptured: 42350,
    weeklyTrend: 12.5,
    routineCases: 165,
    emergencyCases: 24,
  },
  'tenant-2': {
    activeWorkflows: 5,
    completedWorkflows: 178,
    missedCallsRecovered: 112,
    leadsCapture: 145,
    nextStepsCreated: 134,
    emergenciesFlagged: 2,
    totalValueCaptured: 31200,
    weeklyTrend: 8.3,
    routineCases: 132,
    emergencyCases: 13,
  },
  'tenant-3': {
    activeWorkflows: 3,
    completedWorkflows: 67,
    missedCallsRecovered: 45,
    leadsCapture: 52,
    nextStepsCreated: 48,
    emergenciesFlagged: 1,
    totalValueCaptured: 12800,
    weeklyTrend: -2.1,
    routineCases: 48,
    emergencyCases: 4,
  },
};

// Mock Test Scenarios
export const mockTestScenarios: TestScenario[] = [
  {
    id: 'scenario-1',
    name: 'Emergency Burst Pipe',
    type: 'emergency',
    expectedIntent: 'emergency',
    transcript: 'Hi, this is an emergency. I have water flooding my basement from a burst pipe. Please send someone immediately!',
    resultSummary: 'Correctly identified as emergency. Dispatch workflow triggered.',
    deliveryMode: 'mock',
    status: 'completed',
    createdAt: '2024-03-14T10:00:00Z',
    completedAt: '2024-03-14T10:00:45Z',
  },
  {
    id: 'scenario-2',
    name: 'After-Hours Service Request',
    type: 'after_hours',
    expectedIntent: 'service_request',
    transcript: 'Hello, I know it is late but my water heater is making strange noises. Can someone call me tomorrow?',
    resultSummary: 'Identified as routine service request. Callback scheduled for business hours.',
    deliveryMode: 'mock',
    status: 'completed',
    createdAt: '2024-03-14T11:30:00Z',
    completedAt: '2024-03-14T11:31:15Z',
  },
  {
    id: 'scenario-3',
    name: 'Complaint Handling',
    type: 'service_inquiry',
    expectedIntent: 'complaint',
    transcript: 'I am very upset. Your technician was supposed to arrive at 9am and it is now noon. This is unacceptable!',
    resultSummary: 'Correctly identified as complaint. Escalation workflow triggered.',
    deliveryMode: 'mock',
    status: 'completed',
    createdAt: '2024-03-14T14:00:00Z',
    completedAt: '2024-03-14T14:00:38Z',
  },
  {
    id: 'scenario-4',
    name: 'Standard Missed Call',
    type: 'missed_call',
    expectedIntent: 'inquiry',
    transcript: 'Hi, I am calling to ask about your services. Please call me back when you get a chance.',
    deliveryMode: 'mock',
    status: 'pending',
    createdAt: '2024-03-15T09:00:00Z',
  },
];

// Helper function to get organization summaries
export function getOrganizationSummaries(): OrganizationSummary[] {
  return mockTenants.map((tenant) => ({
    tenant,
    metrics: mockTenantMetrics[tenant.id] || mockTenantMetrics['tenant-1'],
    recentJobs: mockJobs.filter((job) => job.tenantId === tenant.id).slice(0, 3),
    workflowHealth: tenant.status === 'active' ? 'healthy' : 'degraded',
  }));
}

// Helper to get jobs for a specific tenant
export function getJobsForTenant(tenantId: string): Job[] {
  return mockJobs.filter((job) => job.tenantId === tenantId);
}

// Helper to get delivery for a job
export function getDeliveryForJob(jobId: string): CommunicationDelivery | undefined {
  return mockDeliveries.find((d) => d.jobId === jobId);
}

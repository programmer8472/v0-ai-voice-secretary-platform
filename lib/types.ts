// User and Role Types
export type UserRole = 'platform_admin' | 'tenant_admin' | 'tenant_user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId?: string;
  avatar?: string;
}

// Organization / Tenant Types
export interface Tenant {
  id: string;
  name: string;
  industry: string;
  brandColor?: string;
  logo?: string;
  preferredNextStepLanguage: string;
  communicationPreferences: CommunicationPreferences;
  createdAt: string;
  status: 'active' | 'inactive' | 'trial';
}

export interface CommunicationPreferences {
  smsEnabled: boolean;
  emailEnabled: boolean;
  slackEnabled: boolean;
  webhookUrl?: string;
  notifyOnUrgent: boolean;
  notifyOnNewLead: boolean;
}

// Job / Lead / Call Record Types
export type UrgencyLevel = 'routine' | 'priority' | 'urgent' | 'emergency';
export type JobStatus = 'new' | 'in_progress' | 'pending_review' | 'completed' | 'archived';
export type IntentCategory = 'service_request' | 'inquiry' | 'complaint' | 'emergency' | 'follow_up' | 'other';

export interface Job {
  id: string;
  tenantId: string;
  callerName: string;
  callerPhone: string;
  callSummary: string;
  intent: IntentCategory;
  urgency: UrgencyLevel;
  status: JobStatus;
  nextStepOutcome: string;
  createdAt: string;
  workflowProgress: number;
  pipelineValue?: number;
  reportedValue?: number;
  transcript?: string;
  conversationExcerpt?: string;
  notificationResult?: CommunicationDelivery;
}

// Communication Delivery Types
export type DeliveryChannel = 'sms' | 'email' | 'slack' | 'webhook';
export type DeliveryStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'skipped';
export type DeliveryMode = 'live' | 'mock';

export interface CommunicationDelivery {
  id: string;
  jobId: string;
  channel: DeliveryChannel;
  mode: DeliveryMode;
  status: DeliveryStatus;
  providerStatus?: string;
  error?: string;
  skippedReason?: string;
  targetContact: string;
  sentAt?: string;
  deliveredAt?: string;
}

// Metrics Types
export interface PlatformMetrics {
  activeWorkflows: number;
  completedWorkflows: number;
  missedCallsRecovered: number;
  leadsCapture: number;
  nextStepsCreated: number;
  emergenciesFlagged: number;
  totalValueCaptured: number;
  activeOrganizations: number;
  healthyWorkflows: number;
  degradedWorkflows: number;
}

export interface TenantMetrics {
  activeWorkflows: number;
  completedWorkflows: number;
  missedCallsRecovered: number;
  leadsCapture: number;
  nextStepsCreated: number;
  emergenciesFlagged: number;
  totalValueCaptured: number;
  weeklyTrend: number; // percentage change
  routineCases: number;
  emergencyCases: number;
}

// Simulation / Test Types
export type ScenarioType = 'missed_call' | 'emergency' | 'service_inquiry' | 'complaint' | 'after_hours';

export interface TestScenario {
  id: string;
  name: string;
  type: ScenarioType;
  expectedIntent: IntentCategory;
  transcript: string;
  resultSummary?: string;
  notificationOutcome?: CommunicationDelivery;
  deliveryMode: DeliveryMode;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

// Organization Summary for Platform Admin
export interface OrganizationSummary {
  tenant: Tenant;
  metrics: TenantMetrics;
  recentJobs: Job[];
  workflowHealth: 'healthy' | 'degraded' | 'critical';
}

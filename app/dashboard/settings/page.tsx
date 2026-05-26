'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { mockTenants } from '@/lib/mock-data';
import { Building2, Bell, Mail, MessageSquare, Webhook, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user, currentTenant } = useAuth();
  const isPlatformAdmin = user?.role === 'platform_admin';
  const tenant = currentTenant || mockTenants[0];

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          {isPlatformAdmin
            ? 'Platform and organization settings'
            : 'Manage your organization preferences'}
        </p>
      </div>

      <Tabs defaultValue="organization">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isPlatformAdmin && <TabsTrigger value="platform">Platform</TabsTrigger>}
        </TabsList>

        {/* Organization Settings */}
        <TabsContent value="organization" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Organization Details</CardTitle>
              </div>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue={tenant.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue={tenant.industry} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="next-step">Default Next Step Language</Label>
                <Input
                  id="next-step"
                  defaultValue={tenant.preferredNextStepLanguage}
                />
                <p className="text-xs text-muted-foreground">
                  This message is used when the AI tells callers what to expect next.
                </p>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SMS */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive text messages for new leads and urgent alerts
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={tenant.communicationPreferences.smsEnabled} />
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email summaries and detailed reports
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={tenant.communicationPreferences.emailEnabled} />
              </div>

              {/* Slack */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Slack Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Post notifications to your Slack channels
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={tenant.communicationPreferences.slackEnabled} />
              </div>

              {/* Webhook */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Webhook className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Webhook URL</p>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to a custom endpoint
                    </p>
                  </div>
                </div>
                <Input
                  placeholder="https://your-app.com/webhook"
                  defaultValue={tenant.communicationPreferences.webhookUrl || ''}
                />
              </div>

              {/* Alert Preferences */}
              <div className="pt-4 border-t space-y-4">
                <p className="font-medium">Alert Triggers</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Notify on Urgent Calls</p>
                    <p className="text-xs text-muted-foreground">
                      Immediate alerts for emergency or urgent situations
                    </p>
                  </div>
                  <Switch defaultChecked={tenant.communicationPreferences.notifyOnUrgent} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Notify on New Leads</p>
                    <p className="text-xs text-muted-foreground">
                      Alert when a new potential customer calls
                    </p>
                  </div>
                  <Switch defaultChecked={tenant.communicationPreferences.notifyOnNewLead} />
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings (Admin only) */}
        {isPlatformAdmin && (
          <TabsContent value="platform" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>
                  Global settings that affect all organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable all incoming calls
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow New Registrations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable self-service signup for new organizations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Debug Logging</p>
                    <p className="text-sm text-muted-foreground">
                      Enable verbose logging for troubleshooting
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Platform Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

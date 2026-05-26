import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Trusted by 500+ service businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Never lose another call.{' '}
            <span className="text-primary">Never miss another lead.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            CallFlow is your 24/7 AI voice dispatcher. We answer missed calls, capture intake information, 
            flag emergencies, and hand qualified leads directly to your office team.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Hero visual - Dashboard preview */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
              {/* Mock browser chrome */}
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="mx-auto max-w-sm rounded bg-background/50 px-3 py-1 text-xs text-muted-foreground text-center">
                    app.callflow.io/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard preview content */}
              <div className="p-6 bg-background">
                <div className="grid gap-4 md:grid-cols-4">
                  {/* Metric cards preview */}
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Calls Recovered</p>
                    <p className="mt-1 text-2xl font-semibold">156</p>
                    <p className="text-xs text-success">+12% this week</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Leads Captured</p>
                    <p className="mt-1 text-2xl font-semibold">89</p>
                    <p className="text-xs text-success">+8% this week</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Value Captured</p>
                    <p className="mt-1 text-2xl font-semibold">$42,350</p>
                    <p className="text-xs text-success">+15% this week</p>
                  </div>
                  <div className="rounded-lg border bg-urgent/10 p-4">
                    <p className="text-xs text-muted-foreground">Urgent Cases</p>
                    <p className="mt-1 text-2xl font-semibold text-urgent">3</p>
                    <p className="text-xs text-urgent">Needs attention</p>
                  </div>
                </div>
                
                {/* Recent jobs preview */}
                <div className="mt-4 rounded-lg border">
                  <div className="border-b px-4 py-3">
                    <p className="font-medium text-sm">Recent Calls</p>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-2 w-2 rounded-full bg-urgent animate-pulse" />
                        <div>
                          <p className="text-sm font-medium">Robert Williams</p>
                          <p className="text-xs text-muted-foreground">Burst pipe - Emergency</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-2 w-2 rounded-full bg-success" />
                        <div>
                          <p className="text-sm font-medium">Jennifer Adams</p>
                          <p className="text-xs text-muted-foreground">Water heater quote</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">45 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

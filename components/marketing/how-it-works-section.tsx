import { Phone, MessageSquare, Bell, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Forward Your Calls',
    description: 'Set up call forwarding from your existing business number to your CallFlow line. Takes about 2 minutes.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'AI Handles the Call',
    description: 'CallFlow answers professionally, collects caller information, understands their needs, and detects urgency levels.',
  },
  {
    number: '03',
    icon: Bell,
    title: 'Your Team Gets Notified',
    description: 'Instant notifications via SMS, email, or Slack with caller details, summary, and recommended next steps.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Close the Deal',
    description: 'Your team follows up with warm leads who are ready to book. Track conversions and see your ROI.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            From missed call to booked job in 4 simple steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            CallFlow integrates seamlessly with your existing workflow. No apps to download, 
            no complex setup, just more captured leads.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}
              
              <div className="flex flex-col items-center text-center">
                {/* Step number and icon */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-card shadow-sm">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

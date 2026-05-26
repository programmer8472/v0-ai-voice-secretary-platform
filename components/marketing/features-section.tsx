import { Card, CardContent } from '@/components/ui/card';
import {
  PhoneIncoming,
  FileCheck,
  AlertTriangle,
  Users,
  BarChart3,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: PhoneIncoming,
    title: 'Missed Call Recovery',
    description: 'Automatically answer calls when your team is busy or after hours. Never let a potential job slip through the cracks.',
  },
  {
    icon: FileCheck,
    title: 'Structured Lead Capture',
    description: 'Collect caller information, service needs, and contact details in a consistent format ready for your team to act on.',
  },
  {
    icon: AlertTriangle,
    title: 'Urgency Detection',
    description: 'AI identifies emergencies like burst pipes or electrical hazards and flags them for immediate attention.',
  },
  {
    icon: Users,
    title: 'Clean Office Handoff',
    description: 'Notifications sent via SMS, email, or Slack with all the context your team needs to follow up effectively.',
  },
  {
    icon: BarChart3,
    title: 'ROI Visibility',
    description: 'Track pipeline value, conversion rates, and revenue impact. See exactly what CallFlow is doing for your business.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Forward your calls to CallFlow and start capturing leads in minutes. No technical knowledge required.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything you need to capture every call
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            CallFlow handles your overflow calls with the same care your team would, 
            capturing valuable leads and flagging urgent issues 24/7.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group relative overflow-hidden transition-all hover:border-primary/30 hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small service businesses getting started with call overflow.',
    features: [
      'Up to 100 calls/month',
      'SMS & email notifications',
      'Basic reporting',
      'Email support',
      '1 team member',
    ],
    cta: 'Start Free Trial',
    variant: 'outline' as const,
  },
  {
    name: 'Professional',
    price: '$249',
    period: '/month',
    description: 'For growing businesses that need more capacity and features.',
    features: [
      'Up to 500 calls/month',
      'SMS, email & Slack notifications',
      'Advanced reporting & analytics',
      'Priority support',
      'Up to 5 team members',
      'Custom greeting scripts',
      'Webhook integrations',
    ],
    cta: 'Start Free Trial',
    variant: 'default' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large operations with custom requirements.',
    features: [
      'Unlimited calls',
      'All notification channels',
      'Custom integrations',
      'Dedicated account manager',
      'Unlimited team members',
      'Custom AI training',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Simple pricing that grows with you
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Start free and scale as your business grows. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-6">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="mt-8 w-full" asChild>
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

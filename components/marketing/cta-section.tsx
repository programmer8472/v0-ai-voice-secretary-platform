import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Ready to stop losing calls?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join hundreds of home service businesses that trust CallFlow to capture their missed calls 
            and turn them into booked jobs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

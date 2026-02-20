import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, FileText } from 'lucide-react';
import LandingNavbar from '../../components/domain/LandingNavbar.jsx';
import LandingFooter from '../../components/domain/LandingFooter.jsx';
import Section from '../../components/domain/Section.jsx';
import FeatureCard from '../../components/domain/FeatureCard.jsx';
import TestimonialCard from '../../components/domain/TestimonialCard.jsx';
import FaqAccordion from '../../components/domain/FaqAccordion.jsx';
import WaitlistForm from '../../components/domain/WaitlistForm.jsx';
import Button from '../../components/ui/Button.jsx';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const FEATURES = [
  ['Webhook-verified payments', 'No manual mark-paid. Payment state is confirmed from webhook events.'],
  ['Automatic delivery fees', 'Delivery fees are applied consistently as part of checkout flow.'],
  ['Receipt PDFs', 'Generate receipts for customers as part of paid order lifecycle.'],
  ['Multi-business dashboard', 'Manage multiple stores from one premium admin dashboard.'],
  ['Order status tracking', 'Track statuses from placed to fulfilled with clarity.'],
  ['Telegram first, WhatsApp alongside', 'Launch with Telegram-first flows while supporting WhatsApp too.'],
];

const TESTIMONIALS = [
  ['Reduced manual payment checks and response times in week one.', 'Operations Lead'],
  ['Our team finally has one place to manage paid DM orders.', 'Growth Manager'],
  ['Delivery fees and receipt flow made fulfillment cleaner.', 'Customer Success Lead'],
];

export default function WaitlistLanding() {
  return (
    <div className="min-h-screen bg-app-bg text-text">
      <LandingNavbar />

      <Section className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Turn WhatsApp/Telegram DMs into verified, paid orders.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Run webhook-verified payments, automatic delivery fees, receipt PDFs, and a clean admin dashboard
            without manual follow-ups.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => scrollToId('waitlist')}>Join the waitlist</Button>
            <Button variant="secondary" onClick={() => scrollToId('demo')}>
              Request a demo
            </Button>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-xl border border-border bg-card-bg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium">Order #2391</p>
            <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white">PAID</span>
          </div>
          <p className="mt-4 text-sm text-text-muted">Total</p>
          <p className="text-2xl font-semibold">₦ 48,500</p>
          <div className="mt-5 grid gap-2 text-sm text-text-muted">
            <p>Payment: Webhook confirmed</p>
            <p>Delivery fee: Applied</p>
            <p>Status: Ready for fulfillment</p>
          </div>
          <button disabled className="mt-6 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-text-muted">
            Download receipt (disabled preview)
          </button>
        </motion.article>
      </Section>

      <Section className="py-6">
        <div className="rounded-xl border border-border bg-card-bg p-4 text-center text-sm text-text-muted shadow-sm">
          Trusted by growing commerce teams moving from manual DM operations to verified workflows.
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">Built for premium DM commerce operations</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, description], index) => (
            <FeatureCard key={title} title={title} description={description} delay={index * 0.02} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Capture order intent in chat', CheckCircle2],
            ['Verify payment via webhook', CreditCard],
            ['Issue receipt and track status', FileText],
          ].map(([label, Icon]) => (
            <article key={label} className="rounded-xl border border-border bg-card-bg p-6 shadow-sm">
              <Icon className="h-6 w-6 text-brand-accent" />
              <p className="mt-3 text-sm font-medium text-text">{label}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">What teams say</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map(([quote, role]) => (
            <TestimonialCard key={role} quote={quote} role={role} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <FaqAccordion />
        </div>
      </Section>

      <Section id="waitlist">
        <h2 className="text-3xl font-semibold tracking-tight">Join the waitlist</h2>
        <p className="mt-2 text-text-muted">Get early access to premium DM order workflows.</p>
        <div className="mt-6 max-w-2xl">
          <WaitlistForm intent="waitlist" />
        </div>
      </Section>

      <Section id="demo">
        <h2 className="text-3xl font-semibold tracking-tight">Request a demo</h2>
        <p className="mt-2 text-text-muted">Tell us your preferred channel and we will reach out.</p>
        <div className="mt-6 max-w-2xl">
          <WaitlistForm intent="demo" />
        </div>
      </Section>

      <LandingFooter />
    </div>
  );
}

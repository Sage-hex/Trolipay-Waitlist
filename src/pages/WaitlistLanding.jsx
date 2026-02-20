import { showToast } from '../components/ui/toastStore.js';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';

export default function WaitlistLanding() {
  return (
    <main className="min-h-screen bg-surface px-6 py-16 text-content antialiased">
      <section className="mx-auto max-w-4xl">
        <Card className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">Trolipay Waitlist</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Premium Waitlist Landing</h1>
          <p className="mx-auto max-w-2xl text-content-muted">
            Router is active at <code>/</code>. This is a placeholder landing page with local toast support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => showToast({ type: 'success', message: 'Welcome! Waitlist UX scaffold is ready.' })}>
              Show Success Toast
            </Button>
            <Button
              variant="ghost"
              onClick={() => showToast({ type: 'info', message: 'Local toast system is working.' })}
            >
              Show Info Toast
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

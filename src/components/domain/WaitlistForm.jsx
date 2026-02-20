import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button.jsx';
import { showToast } from '../ui/toastStore.js';
import { buildPayload, submitWaitlist } from '../../services/waitlist.js';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  business_name: z.string().optional(),
  channel_interest: z.enum(['telegram', 'whatsapp', 'both']),
  hp: z.string().optional(),
});

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export default function WaitlistForm({ intent = 'waitlist' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      business_name: '',
      channel_interest: 'both',
      hp: '',
    },
  });

  const onSubmit = async (values) => {
    const payload = buildPayload({ ...values, intent });
    const [result] = await Promise.all([submitWaitlist(payload, values.hp), delay(600)]);

    if (result.mode === 'local-fallback') {
      showToast({ type: 'warning', message: 'Saved locally. Network issue sending to waitlist.' });
      return;
    }

    if (result.ok) {
      showToast({
        type: 'success',
        message:
          intent === 'demo'
            ? "Demo request received. We'll contact you soon."
            : "You're on the list. We'll reach out soon.",
      });
      reset();
      return;
    }

    showToast({ type: 'error', message: 'Something went wrong. Please try again.' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-border bg-card-bg p-6 shadow-sm">
      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm text-text" htmlFor={`${intent}-email`}>
            Email
          </label>
          <input
            id={`${intent}-email`}
            type="email"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none ring-brand-accent focus-visible:ring-2"
            {...register('email')}
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm text-text" htmlFor={`${intent}-business`}>
            Business name (optional)
          </label>
          <input
            id={`${intent}-business`}
            type="text"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none ring-brand-accent focus-visible:ring-2"
            {...register('business_name')}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-text" htmlFor={`${intent}-channel`}>
            Channel interest
          </label>
          <select
            id={`${intent}-channel`}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none ring-brand-accent focus-visible:ring-2"
            {...register('channel_interest')}
          >
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="both">Both</option>
          </select>
        </div>

        <input tabIndex={-1} autoComplete="off" className="hidden" {...register('hp')} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : intent === 'demo' ? 'Request demo' : 'Join the waitlist'}
        </Button>
      </div>
    </form>
  );
}

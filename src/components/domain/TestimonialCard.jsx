export default function TestimonialCard({ quote, role }) {
  return (
    <article className="rounded-xl border border-border bg-card-bg p-6 shadow-sm">
      <p className="text-sm leading-relaxed text-text">“{quote}”</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-text-muted">{role}</p>
    </article>
  );
}

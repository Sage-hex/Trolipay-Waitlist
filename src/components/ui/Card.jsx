export default function Card({ children, className = '' }) {
  return (
    <article className={`rounded-xl border border-border bg-card-bg p-6 shadow-sm ${className}`.trim()}>
      {children}
    </article>
  );
}

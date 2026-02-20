export default function Card({ children, className = '' }) {
  return (
    <article
      className={`rounded-xl border border-stroke-subtle bg-surface-elevated p-6 shadow-soft ${className}`.trim()}
    >
      {children}
    </article>
  );
}

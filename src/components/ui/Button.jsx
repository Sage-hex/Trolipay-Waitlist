export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary: 'bg-brand-500 text-white shadow-soft hover:bg-brand-600',
    ghost: 'border border-stroke-subtle bg-surface-elevated text-content hover:bg-brand-500/10',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

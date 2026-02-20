export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 py-16 md:py-24 ${className}`.trim()}>
      {children}
    </section>
  );
}

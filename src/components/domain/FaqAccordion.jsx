const ITEMS = [
  {
    q: 'How does payment verification work?',
    a: 'Payments are verified through webhooks to reduce manual mark-paid work and improve trust.',
  },
  { q: 'Can I charge delivery automatically?', a: 'Yes. Delivery fees can be computed and added per order flow.' },
  { q: 'Are receipts included?', a: 'Yes. Receipt PDFs are generated for completed and paid orders.' },
  { q: 'Can I manage multiple businesses?', a: 'Yes. The dashboard is built to support multi-business operations.' },
  { q: 'Does it support order status updates?', a: 'Yes. You can track order lifecycle states in one place.' },
  { q: 'WhatsApp or Telegram first?', a: 'Telegram is first-class, with WhatsApp supported alongside it.' },
];

export default function FaqAccordion() {
  return (
    <div className="grid gap-3">
      {ITEMS.map((item) => (
        <details key={item.q} className="rounded-xl border border-border bg-card-bg p-5 shadow-sm">
          <summary className="cursor-pointer list-none font-medium text-text">{item.q}</summary>
          <p className="mt-3 text-sm text-text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

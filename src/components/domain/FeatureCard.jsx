import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.18, ease: 'easeOut', delay }}
      className="rounded-xl border border-border bg-card-bg p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
    </motion.article>
  );
}

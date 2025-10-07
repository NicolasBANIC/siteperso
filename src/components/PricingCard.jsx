'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Composant PricingCard
 * Props : price, title, features (array), buttonLabel, highlight
 */
export default function PricingCard({
  title,
  price,
  period = 'projet',
  description,
  features,
  highlight = false,
  buttonLabel = 'Demander un devis',
  buttonHref = '/devis',
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`relative overflow-hidden card-glassmorphism-alt p-8 transition-all duration-300 ${
        highlight
          ? 'border-primary'
          : 'hover:border-primary/20'
      } motion-reduce:transform-none`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="space-y-4">
        <h3 className="text-heading-lg font-bold card-title-emerald">{title}</h3>

        <div className="flex items-baseline gap-2">
          <span className="text-display font-bold text-primary">{price}</span>
          {period && <span className="text-body-sm text-muted">/ {period}</span>}
        </div>

        <p className="text-body-sm text-muted leading-relaxed">{description}</p>
      </div>

      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <span className="text-body-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button href={buttonHref} variant={highlight ? 'primary' : 'secondary'} size="md" fullWidth>
          {buttonLabel}
        </Button>
      </div>
    </motion.article>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Check } from "lucide-react";
import { Button } from './Button';

/**
 * Composant PricingCard
 * Props : price, title, features (array), buttonLabel, highlight
 */
export default function PricingCard({ 
  title, 
  price, 
  period = "projet", 
  description, 
  features, 
  highlight = false,
  buttonLabel = "Demander un devis",
  buttonHref = "/devis"
}) {
  return (
    <motion.article 
      className={`relative overflow-hidden rounded-lg bg-surface border p-8 transition-all duration-300 ${
        highlight 
          ? "border-accent shadow-elevation scale-105" 
          : "border-border hover:shadow-card-hover hover:scale-105"
      } motion-reduce:transform-none`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {highlight && (
        <div className="absolute -right-12 top-6 rotate-45 bg-accent-matrix px-12 py-1 text-caption font-bold text-accent-foreground uppercase tracking-widest">
          POPULAIRE
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-heading-lg font-bold text-foreground">{title}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-display font-bold text-accent">{price}</span>
          {period && <span className="text-body-sm text-muted">/ {period}</span>}
        </div>
        
        <p className="text-body-sm text-muted leading-relaxed">{description}</p>
      </div>
      
      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check 
              className="h-5 w-5 flex-shrink-0 text-accent" 
              aria-hidden="true" 
            />
            <span className="text-body-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        <Button 
          href={buttonHref}
          variant={highlight ? "primary" : "secondary"}
          size="md"
          fullWidth
        >
          {buttonLabel}
        </Button>
      </div>
    </motion.article>
  );
}
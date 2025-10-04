import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingCard({ 
  title, 
  price, 
  period = "projet", 
  description, 
  features, 
  highlighted = false,
  ctaText = "Demander un devis",
  ctaHref = "/devis"
}) {
  return (
    <article 
      className={`card relative overflow-hidden transition-all duration-300 ${
        highlighted 
          ? "scale-105 border-[var(--color-accent)] shadow-xl shadow-[var(--color-accent)]/10" 
          : "hover:scale-105"
      } motion-reduce:transform-none`}
    >
      {highlighted && (
        <div className="absolute -right-12 top-6 rotate-45 bg-[var(--color-accent-matrix)] px-12 py-1 text-caption font-bold text-slate-900 uppercase tracking-widest">
          POPULAIRE
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-heading-lg font-bold text-[var(--color-foreground)]">{title}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-display font-bold text-[var(--color-accent)]">{price}</span>
          {period && <span className="text-body-sm text-[var(--color-muted)]">/ {period}</span>}
        </div>
        
        <p className="text-body-sm text-[var(--color-muted)] leading-relaxed">{description}</p>
      </div>
      
      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check 
              className="h-5 w-5 flex-shrink-0 text-[var(--color-accent-matrix)] dark:text-[var(--color-accent-matrix)]" 
              aria-hidden="true" 
            />
            <span className="text-body-sm text-[var(--color-foreground)]">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        href={ctaHref}
        className={`mt-8 w-full ${highlighted ? "btn-primary" : "btn-secondary"} justify-center`}
      >
        {ctaText}
      </Link>
    </article>
  );
}
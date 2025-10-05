'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import ScrollReveal from "./ScrollReveal";

/**
 * CTASection - Section Call-to-Action réutilisable avec gradient
 * 
 * @param {string} title - Titre principal
 * @param {string} description - Description/sous-titre
 * @param {string} primaryButtonText - Texte du bouton principal
 * @param {string} primaryButtonHref - URL du bouton principal
 * @param {string} secondaryButtonText - Texte du bouton secondaire (optionnel)
 * @param {string} secondaryButtonHref - URL du bouton secondaire (optionnel)
 * @param {string} className - Classes CSS additionnelles
 */
export default function CTASection({
  title = "Vous avez un projet particulier ?",
  description = "Contactez-moi pour un audit gratuit ou une estimation personnalisée. Je réponds sous 24 heures ouvrées.",
  primaryButtonText = "Demander un devis gratuit",
  primaryButtonHref = "/devis",
  secondaryButtonText = "Me contacter",
  secondaryButtonHref = "/contact",
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();

  const buttonHoverProps = prefersReducedMotion ? {} : {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  return (
    <ScrollReveal direction="up">
      <section className={`rounded-lg bg-gradient-to-r from-accent to-accentSecondary px-8 py-12 md:py-16 text-white shadow-card ${className}`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-heading-xl md:text-display font-bold tracking-tight font-heading">
            {title}
          </h2>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.div {...buttonHoverProps}>
              <Link
                href={primaryButtonHref}
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-ui font-semibold text-accent shadow-lg hover:shadow-xl transition-shadow motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                {primaryButtonText}
              </Link>
            </motion.div>
            {secondaryButtonText && secondaryButtonHref && (
              <motion.div {...buttonHoverProps}>
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-ui font-semibold text-white hover:bg-white hover:text-accent transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                >
                  {secondaryButtonText}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
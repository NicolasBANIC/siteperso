import Link from "next/link";
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
  return (
    <ScrollReveal direction="up">
      <section className={`rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-12 text-white shadow-2xl ${className}`}>
        <div className="center-content space-y-6">
          <h2 className="text-heading-xl font-bold tracking-tight center-text">{title}</h2>
          <p className="text-body-lg text-white/90 center-text max-w-2xl">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-ui font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none"
            >
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-ui font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-accent)] motion-reduce:transform-none"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
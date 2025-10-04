import Image from "next/image";
import Link from "next/link";
import { Code2, ShoppingCart, Palette, Database, Wrench, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: "Site vitrine premium",
    description:
      "Une présence en ligne élégante, responsive et optimisée pour vos clients locaux. Idéal pour artisans, TPE et PME.",
    icon: Palette,
    features: [
      "Conception personnalisée et responsive",
      "Optimisation SEO locale avancée",
      "Intégration des avis et témoignages",
      "Formation à la prise en main",
      "Hébergement et maintenance inclus",
    ],
  },
  {
    title: "Site e-commerce",
    description:
      "Vendez vos produits en ligne avec une boutique fluide, sécurisée et connectée à vos outils du quotidien.",
    icon: ShoppingCart,
    features: [
      "Catalogue produits évolutif",
      "Paiements sécurisés (Stripe, PayPal)",
      "Gestion des stocks et livraisons",
      "Automatisation des emails",
      "Tableau de bord analytique",
    ],
  },
  {
    title: "Front-end sur mesure",
    description:
      "Interfaces modernes, rapides et accessibles pour une expérience utilisateur irréprochable.",
    icon: Code2,
    features: [
      "Next.js et React dernière génération",
      "Design system personnalisé",
      "Animations fluides et micro-interactions",
      "Performance Web Vitals optimale",
      "Accessibilité WCAG 2.1 AA",
    ],
  },
  {
    title: "Back-end & API",
    description:
      "Automatisation, intégrations et API robustes pour soutenir votre activité et vos applications métiers.",
    icon: Database,
    features: [
      "Node.js et architectures modernes",
      "Bases de données SQL/NoSQL",
      "Intégrations tierces (CRM, ERP)",
      "Tests automatisés et sécurité",
      "Documentation complète",
    ],
  },
  {
    title: "Maintenance & évolutions",
    description:
      "Gardez un site performant et sécurisé dans la durée avec des forfaits flexibles adaptés à vos besoins.",
    icon: Wrench,
    features: [
      "Mises à jour techniques régulières",
      "Monitoring et alertes",
      "Corrections rapides sous 48h",
      "Optimisations continues",
      "Support prioritaire",
    ],
  },
  {
    title: "Conseil & audit",
    description:
      "Bénéficiez d'un regard expert sur votre projet web : performance, SEO, accessibilité et stratégie digitale.",
    icon: Zap,
    features: [
      "Audit technique complet",
      "Recommandations SEO",
      "Analyse de performance",
      "Stratégie d'amélioration",
      "Rapport détaillé",
    ],
  },
];

export const metadata = {
  title: "Services — Nicolas Banic",
  description: "Prestations web pour artisans, TPE et PME : sites vitrines, e-commerce, applications sur mesure et maintenance.",
};

export default function ServicesPage() {
  return (
    <div className="container-page">
      {/* Header */}
      <ScrollReveal direction="up">
        <header className="mb-16 space-y-4 text-center">
          <h1 className="section-title">Des services web pensés pour votre réussite</h1>
          <p className="section-subtitle mx-auto">
            Du site vitrine à l'application sur mesure, je vous accompagne à chaque étape pour créer un outil digital à la
            hauteur de vos ambitions.
          </p>
        </header>
      </ScrollReveal>

      {/* Services Grid */}
      <section className="mb-24 grid gap-8 lg:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.title} direction="up" delay={index * 50}>
              <article className="card group flex flex-col gap-6 hover:border-[var(--color-accent)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-heading-lg font-semibold text-[var(--color-foreground)]">{service.title}</h2>
                    <p className="mt-2 text-body leading-relaxed text-[var(--color-muted)]">{service.description}</p>
                  </div>
                </div>
                <ul className="grid gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-body-sm text-[var(--color-muted)]">
                      <span className="mt-1.5 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          );
        })}
      </section>

      {/* Process Section */}
      <ScrollReveal direction="up">
        <section className="mb-24 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <div className="mb-8 space-y-3 text-center">
            <h2 className="text-heading-xl font-bold text-[var(--color-foreground)]">Comment je travaille</h2>
            <p className="text-body-lg text-[var(--color-muted)]">
              Un processus transparent et collaboratif pour garantir votre satisfaction
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Écoute & Analyse",
                description: "Je prends le temps de comprendre vos besoins, vos objectifs et votre cible.",
              },
              {
                step: "02",
                title: "Conception & Développement",
                description: "Je crée une solution sur mesure, moderne et performante, en vous tenant informé.",
              },
              {
                step: "03",
                title: "Lancement & Accompagnement",
                description: "Mise en ligne, formation et suivi pour assurer le succès de votre projet.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.step} direction="up" delay={index * 100}>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-heading-lg font-bold text-[var(--color-accent)]">
                    {item.step}
                  </div>
                  <h3 className="text-heading-md font-semibold text-[var(--color-foreground)]">{item.title}</h3>
                  <p className="mt-2 text-body-sm text-[var(--color-muted)]">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up">
        <section className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-12 text-white shadow-2xl">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-heading-xl font-bold tracking-tight">Vous avez un projet particulier ?</h2>
            <p className="text-body-lg text-white/90">
              Contactez-moi pour un audit gratuit ou une estimation personnalisée. Je réponds sous 24 heures ouvrées.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-ui font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none"
              >
                Demander un devis gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-ui font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-accent)] motion-reduce:transform-none"
              >
                Me contacter
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
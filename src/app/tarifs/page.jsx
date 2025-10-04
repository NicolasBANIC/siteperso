import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import HeroSection from "@/components/HeroSection";

const pricingPlans = [
  {
    title: "Site Vitrine Standard",
    price: "À partir de 1 299€",
    period: "projet",
    description: "Idéal pour artisans et TPE souhaitant une présence en ligne professionnelle et efficace.",
    features: [
      "Design responsive moderne",
      "Jusqu'à 5 pages personnalisées",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Hébergement 1 an inclus",
      "Formation à la gestion du site",
      "Support 30 jours",
    ],
    highlighted: false,
  },
  {
    title: "Site Vitrine Premium",
    price: "À partir de 2 499€",
    period: "projet",
    description: "La solution complète pour les entreprises exigeantes qui veulent se démarquer.",
    features: [
      "Design 100% sur mesure",
      "Pages illimitées",
      "Blog intégré",
      "Optimisation SEO avancée",
      "Animations et micro-interactions",
      "Hébergement 1 an inclus",
      "Formation complète",
      "Support 90 jours",
      "Maintenance 3 mois offerte",
    ],
    highlighted: true,
  },
  {
    title: "E-commerce",
    price: "À partir de 3 999€",
    period: "projet",
    description: "Boutique en ligne complète pour vendre vos produits avec une expérience client optimale.",
    features: [
      "Design e-commerce sur mesure",
      "Catalogue produits illimité",
      "Paiement sécurisé (Stripe/PayPal)",
      "Gestion des stocks",
      "Tableau de bord admin",
      "Optimisation SEO e-commerce",
      "Hébergement 1 an inclus",
      "Formation complète",
      "Support 90 jours",
    ],
    highlighted: false,
  },
];

const maintenancePlans = [
  {
    title: "Maintenance Essentielle",
    price: "49€",
    period: "mois",
    description: "Pour garder votre site à jour et sécurisé.",
    features: [
      "Mises à jour techniques mensuelles",
      "Sauvegardes hebdomadaires",
      "Monitoring de disponibilité",
      "Support par email",
      "1h de modifications incluse",
    ],
  },
  {
    title: "Maintenance Premium",
    price: "149€",
    period: "mois",
    description: "Accompagnement complet pour une tranquillité totale.",
    features: [
      "Tout du plan Essentielle",
      "Mises à jour hebdomadaires",
      "Sauvegardes quotidiennes",
      "Support prioritaire",
      "3h de modifications incluses",
      "Optimisations mensuelles",
      "Rapports de performance",
    ],
    highlighted: true,
  },
];

const additionalServices = [
  { name: "Développement sur mesure", price: "500€/jour" },
  { name: "Audit technique complet", price: "À partir de 299€" },
  { name: "Optimisation SEO avancée", price: "À partir de 499€" },
  { name: "Migration de site", price: "À partir de 399€" },
  { name: "Formation personnalisée", price: "80€/heure" },
];

export const metadata = {
  title: "Tarifs — Nicolas Banic",
  description: "Tarifs transparents pour la création de sites web : vitrines, e-commerce et applications sur mesure. Devis gratuit sous 24h.",
};

export default function TarifsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title='Tarifs <span class="bg-gradient-to-r from-[#00FF41] to-[#00D4FF] bg-clip-text text-transparent">transparents et adaptés</span>'
        subtitle="Des formules claires pour tous les budgets. Paiement en plusieurs fois possible. Devis personnalisé gratuit sous 24h."
        backgroundImage="/images/tarifs-hero.png"
        badge="Devis Gratuit"
        height="65vh"
      >
        <Link
          href="/devis"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-ui font-semibold text-[#0047AB] shadow-2xl transition-all hover:scale-105 hover:shadow-white/30"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Demander un devis gratuit</span>
          <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-ui font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20"
        >
          <span className="relative">Poser une question</span>
        </Link>
      </HeroSection>

      <div className="container-page">

      {/* Main Pricing */}
      <section className="mb-24">
        <ScrollReveal direction="up">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-foreground)]">
            Création de sites web
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <ScrollReveal key={plan.title} direction="up" delay={index * 100}>
              <PricingCard {...plan} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={300}>
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-muted)]">
              * Prix indicatifs H.T. Le tarif final dépend de vos besoins spécifiques.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Maintenance Pricing */}
      <section className="mb-24">
        <ScrollReveal direction="up">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-foreground)]">
            Forfaits de maintenance
          </h2>
        </ScrollReveal>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {maintenancePlans.map((plan, index) => (
            <ScrollReveal key={plan.title} direction="up" delay={index * 100}>
              <PricingCard {...plan} ctaText="Souscrire" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <ScrollReveal direction="up">
        <section className="mb-24 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Services complémentaires</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Des prestations à la carte pour répondre à tous vos besoins
            </p>
          </div>

          <div className="mx-auto max-w-2xl space-y-4">
            {additionalServices.map((service, index) => (
              <ScrollReveal key={service.name} direction="up" delay={index * 50}>
                <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                  <span className="font-medium text-[var(--color-foreground)]">{service.name}</span>
                  <span className="text-sm font-semibold text-[var(--color-accent)]">{service.price}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Why Choose Me */}
      <ScrollReveal direction="up">
        <section className="mb-24 rounded-3xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] p-8 md:p-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Pourquoi me choisir ?</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Star,
                title: "Qualité garantie",
                description: "Sites performants, accessibles et optimisés pour le référencement.",
              },
              {
                icon: Check,
                title: "Accompagnement complet",
                description: "De l'analyse à la mise en ligne, je suis à vos côtés à chaque étape.",
              },
              {
                icon: Star,
                title: "Tarifs transparents",
                description: "Pas de frais cachés. Devis détaillé et paiement en plusieurs fois possible.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} direction="up" delay={index * 100}>
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{item.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal direction="up">
        <section className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-12 text-white shadow-2xl">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Prêt à démarrer votre projet ?</h2>
            <p className="text-lg text-white/90">
              Recevez un devis personnalisé et gratuit sous 24h. Aucun engagement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none"
              >
                Demander un devis gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-accent)] motion-reduce:transform-none"
              >
                Poser une question
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
      </div>
    </>
  );
}
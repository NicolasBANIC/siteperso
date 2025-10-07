import Link from 'next/link';
import { Check, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import PricingCard from '@/components/PricingCard';
import HeroSection from '@/components/HeroSection';
import CTAButton from '@/components/CTAButton';
import CTASection from '@/components/CTASection';
import pricingData from '@/data/pricing.json';

// Use centralized pricing data
const pricingPlans = pricingData.pricingPlans;
const maintenancePlans = pricingData.maintenancePlans;
const additionalServices = pricingData.additionalServices;

export const metadata = {
  title: 'Tarifs — Nicolas Banic',
  description:
    'Tarifs transparents pour la création de sites web : vitrines, e-commerce et applications sur mesure. Devis gratuit sous 24h.',
};

export default function TarifsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title='Tarifs <span className="k">transparents et adaptés</span>'
        subtitle="Des formules claires pour tous les budgets. Paiement en plusieurs fois possible. Devis personnalisé gratuit sous 24h."
        backgroundImage="/images/tarifs-hero.png"
        badge="Devis Gratuit"
        height="65vh"
      >
        <CTAButton href="/devis" variant="primary" showIcon>
          Demander un devis gratuit
        </CTAButton>
        <CTAButton href="/contact" variant="secondary">
          Poser une question
        </CTAButton>
      </HeroSection>

      <div className="container-page">
        {/* Main Pricing */}
        <section className="section-spacing">
          <ScrollReveal direction="up">
            <h2 className="mb-8 heading-primary center-text">Création de sites web</h2>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <ScrollReveal key={plan.title} direction="up" delay={index * 100}>
                <PricingCard {...plan} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={300}>
            <div className="mt-8 center-text">
              <p className="body-small">
                * Prix indicatifs H.T. Le tarif final dépend de vos besoins spécifiques.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Maintenance Pricing */}
        <section className="section-spacing">
          <ScrollReveal direction="up">
            <h2 className="mb-8 heading-primary center-text">Forfaits de maintenance</h2>
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
          <section className="section-spacing section-card">
            <div className="mb-8 center-text">
              <h2 className="heading-secondary">Services complémentaires</h2>
              <p className="mt-2 body-regular">
                Des prestations à la carte pour répondre à tous vos besoins
              </p>
            </div>

            <div className="mx-auto max-w-2xl space-y-4">
              {additionalServices.map((service, index) => (
                <ScrollReveal key={service.name} direction="up" delay={index * 50}>
                  <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 gpu-accelerated">
                    <span className="body-regular font-medium">{service.name}</span>
                    <span className="badge-primary">{service.price}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Why Choose Me */}
        <ScrollReveal direction="up">
          <section className="section-spacing section-gradient">
            <div className="mb-8 center-text">
              <h2 className="heading-secondary">Pourquoi me choisir ?</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Star,
                  title: 'Qualité garantie',
                  description: 'Sites performants, accessibles et optimisés pour le référencement.',
                },
                {
                  icon: Check,
                  title: 'Accompagnement complet',
                  description:
                    "De l'analyse à la mise en ligne, je suis à vos côtés à chaque étape.",
                },
                {
                  icon: Star,
                  title: 'Tarifs transparents',
                  description:
                    'Pas de frais cachés. Devis détaillé et paiement en plusieurs fois possible.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} direction="up" delay={index * 100}>
                    <div className="center-content gpu-accelerated">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="heading-tertiary">{item.title}</h3>
                      <p className="mt-2 body-small">{item.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <CTASection
          title="Prêt à démarrer votre projet ?"
          description="Recevez un devis personnalisé et gratuit sous 24h. Aucun engagement."
          primaryButton={{ text: 'Demander un devis gratuit', href: '/devis' }}
          secondaryButton={{ text: 'Poser une question', href: '/contact' }}
        />
      </div>
    </>
  );
}

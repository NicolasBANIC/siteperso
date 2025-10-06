import TestimonialCard from "@/components/TestimonialCard";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import CTAButton from "@/components/CTAButton";
import CTASection from "@/components/CTASection";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Fondatrice",
    company: "Atelier Bois & Tradition",
    content:
      "Nicolas a parfaitement compris l'esprit que je voulais transmettre. Le site reflète mon savoir-faire artisanal et m'apporte de nouvelles demandes chaque semaine. Un vrai professionnel à l'écoute !",
    rating: 5,
    avatar: "/images/testimonial-avatar2.jpg"
  },
  {
    name: "Julien Dupont",
    role: "Gérant",
    company: "Les Douceurs de Léa",
    content:
      "Un accompagnement au-delà de mes attentes : branding, boutique en ligne, automatisation des commandes… tout est fluide pour mes clients comme pour mon équipe. Je recommande vivement !",
    rating: 5,
    avatar: "/images/testimonial-avatar1.jpg"
  },
  {
    name: "Claire Bernard",
    role: "Directrice",
    company: "Conseil Habitat",
    content:
      "En quelques semaines, le blog a boosté notre visibilité. Nous recevons des leads qualifiés quotidiennement avec un suivi analytique clair. Un investissement rentabilisé rapidement.",
    rating: 5,
    avatar: "/images/testimonial-avatar2.jpg"
  },
  {
    name: "Marc Lefebvre",
    role: "Fondateur",
    company: "Tech Innov",
    content:
      "Application web sur mesure développée dans les délais. Code propre, documentation complète, formation de l'équipe. Nicolas est un développeur de confiance.",
    rating: 5,
    avatar: "/images/testimonial-avatar1.jpg"
  },
  {
    name: "Émilie Rousseau",
    role: "Responsable Marketing",
    company: "Green Solutions",
    content:
      "Refonte complète de notre site avec une attention particulière à l'UX et au SEO. Les résultats sont là : +150% de trafic en 3 mois. Merci Nicolas !",
    rating: 5,
    avatar: "/images/testimonial-avatar2.jpg"
  },
  {
    name: "Thomas Moreau",
    role: "Directeur",
    company: "Artisan Pro",
    content:
      "Maintenance et évolutions régulières de notre plateforme. Réactivité exemplaire, conseils pertinents. Un partenaire de longue durée.",
    rating: 5,
    avatar: "/images/testimonial-avatar3.jpg"
  },
];

const stats = [
  { value: "98%", label: "Clients satisfaits" },
  { value: "4.9/5", label: "Note moyenne" },
  { value: "50+", label: "Projets livrés" },
  { value: "100%", label: "Recommandations" },
];

export const metadata = {
  title: "Témoignages clients — Nicolas Banic | Développeur Web Freelance",
  description: "Découvrez les avis et témoignages de mes clients : artisans, commerces et PME accompagnés pour leur présence digitale et leurs applications web.",
  openGraph: {
    title: "Témoignages clients — Nicolas Banic",
    description: "Avis clients d'artisans, commerces et PME accompagnés pour leur présence digitale.",
  },
};

export default function TemoignagesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title='Ils me font <span class="k">confiance</span>'
        subtitle="Une collaboration fondée sur l'écoute, la transparence et des résultats concrets pour chaque entreprise accompagnée. Découvrez les témoignages de mes clients satisfaits."
        backgroundImage="/images/temoignages-hero.png"
        badge="Note moyenne : 4.9/5 ⭐"
        height="65vh"
      >
        <CTAButton href="/devis">
          Rejoignez-les
        </CTAButton>
        <CTAButton href="/portfolio" variant="secondary" showIcon={false}>
          Voir mes réalisations
        </CTAButton>
      </HeroSection>

      {/* Stats Section */}
      <Section>
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="gpu-accelerated text-center p-6 bg-white rounded-xl shadow-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-matrix transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Testimonials Grid */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                <TestimonialCard {...testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quote Section */}
      <Section background="dark">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-6 opacity-50" />
              <blockquote className="text-2xl md:text-3xl font-light text-gray-900 mb-8 leading-relaxed">
                "La satisfaction de mes clients est ma priorité absolue. Chaque projet est une opportunité de créer une solution qui dépasse les attentes."
              </blockquote>
              <p className="text-gray-600 font-medium">
                Nicolas Banic — Développeur Web Freelance
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection 
        title="Prêt à rejoindre mes clients satisfaits ?"
        description="Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs."
        primaryButtonText="Demander un devis"
        primaryButtonHref="/devis"
        secondaryButtonText="Me contacter"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
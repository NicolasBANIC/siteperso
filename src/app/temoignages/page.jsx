import TestimonialCard from "@/components/TestimonialCard";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

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
        title='Ils me font <span class="bg-gradient-to-r from-[#00FF41] to-[#00D4FF] bg-clip-text text-transparent">confiance</span>'
        subtitle="Une collaboration fondée sur l'écoute, la transparence et des résultats concrets pour chaque entreprise accompagnée. Découvrez les témoignages de mes clients satisfaits."
        backgroundImage="/images/temoignages-hero.png"
        badge="Note moyenne : 4.9/5 ⭐"
        height="65vh"
      >
        <Link
          href="/devis"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-ui font-semibold text-[#0047AB] shadow-2xl transition-all hover:scale-105 hover:shadow-white/30"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Rejoignez-les</span>
          <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/portfolio"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-ui font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20"
        >
          <span className="relative">Voir mes réalisations</span>
        </Link>
      </HeroSection>

      {/* Stats Section */}
      <Section>
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[var(--color-border)]"
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
              <Quote className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6 opacity-50" />
              <blockquote className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8 leading-relaxed">
                "La satisfaction de mes clients est ma priorité absolue. Chaque projet est une opportunité de créer une solution qui dépasse les attentes."
              </blockquote>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Nicolas Banic — Développeur Web Freelance
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Prêt à rejoindre mes clients satisfaits ?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/devis" className="btn-primary">
                  Demander un devis
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Me contacter
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
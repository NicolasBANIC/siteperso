import Image from "next/image";
import Link from "next/link";
import { Code2, Lightbulb, Users, Award, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import CTAButton from "@/components/CTAButton";
import CTASection from "@/components/CTASection";

const skills = [
  "Next.js & React",
  "Node.js & Express",
  "TypeScript",
  "TailwindCSS",
  "PostgreSQL & Prisma",
  "API REST & GraphQL",
  "Git & CI/CD",
  "Vercel & Netlify",
  "SEO & Performance",
  "Accessibilité WCAG",
];

const values = [
  {
    icon: Code2,
    title: "Qualité & Performance",
    description: "Des sites rapides, accessibles et optimisés pour le référencement.",
  },
  {
    icon: Users,
    title: "Accompagnement personnalisé",
    description: "Je prends le temps de comprendre vos besoins et vous guide à chaque étape.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Modernité",
    description: "J'utilise les dernières technologies pour créer des solutions pérennes.",
  },
  {
    icon: Award,
    title: "Transparence & Confiance",
    description: "Tarifs clairs, délais respectés et communication régulière.",
  },
];

const stats = [
  { value: "10+", label: "Années d'expérience" },
  { value: "40+", label: "Projets réalisés" },
  { value: "100%", label: "Clients satisfaits" },
  { value: "24h", label: "Délai de réponse" },
];

export const metadata = {
  title: "À propos — Nicolas Banic",
  description: "Découvrez le parcours et la méthode de Nicolas Banic, développeur full-stack freelance pour artisans, TPE et PME.",
};

export default function AproposPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title='Un partenaire technique <span className="accent-word">de confiance</span>'
        subtitle="Développeur full-stack depuis plus de 10 ans, j'aide les artisans, TPE et PME à bâtir des outils digitaux performants, durables et alignés sur leurs objectifs business."
        backgroundImage="/images/apropos-hero.png"
        badge="10+ Années d'Expérience"
        height="65vh"
      >
        <CTAButton href="/contact" variant="primary" showIcon>
          Travaillons ensemble
        </CTAButton>
        <CTAButton href="/portfolio" variant="secondary">
          Découvrir mes projets
        </CTAButton>
      </HeroSection>

      <div className="container-page">

      {/* Stats */}
      <ScrollReveal direction="up">
        <section className="section-spacing grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} direction="up" delay={index * 50}>
              <div className="section-card center-content">
                <p className="text-4xl font-bold text-[var(--color-accent)]">{stat.value}</p>
                <p className="mt-2 body-small">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </section>
      </ScrollReveal>

      {/* Parcours & Compétences */}
      <section className="mb-24 grid gap-8 lg:grid-cols-2">
        <ScrollReveal direction="up">
          <div className="section-card space-y-4">
            <h2 className="heading-secondary">Mon parcours</h2>
            <p className="body-regular">
              Après plusieurs années en agence digitale puis en start-up, j'ai choisi le freelancing pour travailler au
              plus près des décisions et offrir une collaboration fluide et personnalisée.
            </p>
            <p className="body-regular">
              Mon expérience couvre la conception, le design, le développement front et back-end, ainsi que la stratégie
              produit. J'ai accompagné des dizaines d'artisans, TPE et PME dans leur transformation digitale.
            </p>
            <p className="body-regular">
              Aujourd'hui, je me concentre sur la création de sites web modernes et performants qui génèrent de vrais
              résultats pour mes clients.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="section-card space-y-4">
            <h2 className="heading-secondary">Compétences techniques</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                >
                  <span className="mt-1.5 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Valeurs */}
      <ScrollReveal direction="up">
        <section className="section-spacing">
          <div className="mb-12 space-y-4 center-text">
            <h2 className="heading-primary">Mes valeurs</h2>
            <p className="body-large mx-auto max-w-2xl">
              Ce qui guide mon travail au quotidien
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} direction="up" delay={index * 100}>
                  <div className="value-card">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C896]/20 to-[#007A5E]/10 text-[#00C896] transition-all duration-300 hover:from-[#00C896] hover:to-[#007A5E] hover:text-white">
                      <Icon className="icon h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-white/85 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Ce qui m'anime */}
      <section className="section-spacing grid gap-8 lg:grid-cols-2 lg:items-center">
        <ScrollReveal direction="up">
          <div className="section-card space-y-6">
            <h2 className="heading-secondary">Ce qui m'anime</h2>
            <p className="body-regular">
              J'aime comprendre votre métier pour traduire vos enjeux business en solutions digitales concrètes. Chaque projet
              est l'occasion d'apporter de la valeur à vos équipes et à vos clients.
            </p>
            <p className="body-regular">
              Qualité, transparence, réactivité et pédagogie sont au cœur de ma démarche. Je privilégie des cycles courts,
              l'écoute et les retours réguliers pour avancer efficacement.
            </p>
            <p className="body-regular">
              Mon objectif : créer des sites web qui non seulement vous plaisent, mais qui génèrent aussi des résultats
              mesurables pour votre activité.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-20 blur-2xl" />
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
              <Image
                src="/images/about-workspace.jpg"
                alt="Espace de travail moderne pour le développement web - bureau avec ordinateur et outils de développement"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <CTASection
        title="Travaillons ensemble"
        description="Vous avez un projet en tête ? Discutons-en autour d'un café (virtuel ou réel) !"
        primaryButton={{ text: "Demander un devis", href: "/devis" }}
        secondaryButton={{ text: "Me contacter", href: "/contact" }}
      />
      </div>
    </>
  );
}
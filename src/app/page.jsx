import Image from "next/image";
import Link from "next/link";
import { Code2, Palette, Rocket, CheckCircle2, Zap, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: "Sites vitrines premium",
    description:
      "Des sites qui valorisent votre savoir-faire artisanal ou PME, optimisés pour la conversion et le référencement local.",
    icon: "/images/service-vitrine.jpg",
    features: [
      "Design sur mesure et responsive",
      "Optimisation SEO avancée",
      "Performance et accessibilité",
    ],
  },
  {
    title: "E-commerce sur mesure",
    description:
      "Vendez en ligne avec une expérience fluide et sécurisée, adaptée à vos clients et à votre logistique.",
    icon: "/images/service-ecommerce.jpg",
    features: [
      "Paiement sécurisé intégré",
      "Gestion des stocks simplifiée",
      "Tableau de bord complet",
    ],
  },
  {
    title: "Applications web",
    description:
      "Automatisez vos processus métiers avec des solutions robustes, modernes et évolutives.",
    icon: "/images/service-webapp.svg",
    features: [
      "Développement sur mesure",
      "Interface d'administration",
      "API et intégrations",
    ],
  },
  {
    title: "SEO & Référencement",
    description:
      "Améliorez votre visibilité sur Google et attirez plus de clients qualifiés grâce à une stratégie SEO sur mesure.",
    icon: "/images/service-seo.jpg",
    features: [
      "Audit SEO complet",
      "Optimisation technique",
      "Stratégie de contenu",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analyse & Stratégie",
    description: "Nous définissons ensemble vos objectifs, votre cible et les fonctionnalités essentielles.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Design & Développement",
    description: "Je conçois une maquette sur mesure puis développe votre site avec les dernières technologies.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Lancement & Suivi",
    description: "Mise en ligne, formation et accompagnement pour garantir le succès de votre projet.",
    icon: Rocket,
  },
];

const technologies = [
  { name: "Next.js", logo: "/images/logos/nextjs.svg" },
  { name: "React", logo: "/images/logos/react.svg" },
  { name: "TailwindCSS", logo: "/images/logos/tailwind.svg" },
  { name: "Node.js", logo: "/images/logos/nodejs.svg" },
  { name: "TypeScript", logo: "/images/logos/typescript.svg" },
  { name: "JavaScript", logo: "/images/logos/javascript.svg" },
  { name: "Git", logo: "/images/logos/git.svg" },
  { name: "Figma", logo: "/images/logos/figma.svg" },
];

const stats = [
  { value: "24h", label: "Délai de réponse" },
  { value: "+40", label: "Projets réalisés" },
  { value: "5/5", label: "Satisfaction client" },
  { value: "100%", label: "Sites performants" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" aria-hidden="true" />
        
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <ScrollReveal direction="up">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-matrix)] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-matrix)]"></span>
                  </span>
                  <span className="text-[var(--color-muted)]">Disponible pour de nouveaux projets</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
                  Développeur <span className="text-[var(--color-accent)]">Full-Stack</span> pour artisans, TPE et PME
                </h1>

                <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                  J'accompagne les entreprises locales et les entrepreneurs dans la création de{" "}
                  <strong className="font-semibold text-[var(--color-foreground)]">sites web modernes</strong>,
                  optimisés et faciles à gérer. Un rendu soigné, des performances mesurables, et un budget maîtrisé.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/devis" className="btn-primary">
                    Demander un devis gratuit
                  </Link>
                  <Link href="/portfolio" className="btn-secondary">
                    Voir mes réalisations
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)]" aria-hidden="true" />
                    <span>Qualité agence</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)]" aria-hidden="true" />
                    <span>Tarifs transparents</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)]" aria-hidden="true" />
                    <span>Suivi personnalisé</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-20 blur-2xl" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
                  <Image
                    src="/images/hero-main.jpg"
                    alt="Aperçu d'un site web moderne sur ordinateur et mobile"
                    width={720}
                    height={720}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-lg font-semibold">Votre présence en ligne, prête en 4 à 6 semaines</p>
                    <p className="mt-1 text-sm text-white/80">Stratégie, design, développement et référencement inclus</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container-page">
        <ScrollReveal direction="up">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Une expertise complète pour propulser votre activité</h2>
            <p className="section-subtitle mx-auto">
              Je conçois des expériences digitales sur mesure, du maquettage à la mise en ligne, avec un souci du détail
              digne des meilleures agences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} direction="up" delay={index * 100}>
              <ServiceCard {...service} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container-page">
        <ScrollReveal direction="up">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Un processus éprouvé en 3 étapes</h2>
            <p className="section-subtitle mx-auto">
              De l'idée à la mise en ligne, je vous accompagne à chaque étape pour garantir le succès de votre projet.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} direction="up" delay={index * 100}>
                <article className="relative">
                  <div className="card group hover:border-[var(--color-accent)] transition-all duration-300">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-5xl font-bold text-[var(--color-accent)]/20">{step.number}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{step.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container-page">
        <ScrollReveal direction="up">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Technologies modernes et performantes</h2>
            <p className="section-subtitle mx-auto">
              J'utilise les meilleurs outils pour créer des sites rapides, sécurisés et évolutifs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="group flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:scale-110 hover:border-[var(--color-accent)] hover:shadow-lg motion-reduce:transform-none"
                title={tech.name}
              >
                <Image
                  src={tech.logo}
                  alt={`Logo ${tech.name}`}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="container-page">
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] p-12 text-white shadow-2xl">
            <div className="mb-8 space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Un partenariat sur le long terme</h2>
              <p className="text-lg text-white/90">
                Au-delà du lancement, je reste disponible pour vous accompagner et faire évoluer votre site.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} direction="up" delay={index * 50}>
                  <div className="text-center">
                    <p className="text-4xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-sm text-white/80">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="container-page">
        <ScrollReveal direction="up">
          <div className="card border-[var(--color-accent)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">
                <Zap className="h-8 w-8 text-[var(--color-accent)]" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--color-foreground)]">
                Prêt à lancer votre projet ?
              </h2>
              <p className="text-lg text-[var(--color-muted)]">
                Discutons de vos besoins et recevez un devis personnalisé sous 24h.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/devis" className="btn-primary">
                  Demander un devis gratuit
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
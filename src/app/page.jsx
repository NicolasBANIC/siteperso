import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  Zap, 
  Shield, 
  Rocket, 
  Code2, 
  Smartphone,
  Search,
  ShoppingCart,
  Layers,
  ArrowRight
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import HeroContactForm from "@/components/HeroContactForm";
import AnimatedCounter from "@/components/AnimatedCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import TechBadge from "@/components/TechBadge";
import MatrixRain from "@/components/MatrixRain";
import ParticlesBackground from "@/components/ParticlesBackground";
import CodeTypingAnimation from "@/components/CodeTypingAnimation";
import MockDashboard from "@/components/MockDashboard";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import MeshGradient from "@/components/MeshGradient";
import OptimizedVideo from "@/components/OptimizedVideo";
import CTAButton from "@/components/CTAButton";
import CTASection from "@/components/CTASection";
import StatItem from "@/components/StatItem";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import Section from "@/components/Section";
import PricingCard from "@/components/PricingCard";

const services = [
  {
    title: "Sites Vitrines Premium",
    description: "Créez une présence en ligne professionnelle qui convertit vos visiteurs en clients. Architecture Next.js 14 avec App Router pour des performances optimales (score Lighthouse >95), SEO technique avancé avec métadonnées dynamiques, et design responsive mobile-first.",
    icon: "/images/service-vitrine.jpg",
    features: [
      "Next.js 14 + React 19 pour des performances maximales",
      "SEO technique : Schema.org, Open Graph, sitemap XML",
      "Design System avec Tailwind CSS 4 et composants réutilisables",
      "Optimisation images WebP/AVIF avec lazy loading intelligent",
      "Accessibilité WCAG 2.1 niveau AA garantie"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    metrics: {
      performance: "95+",
      seo: "100",
      accessibility: "95+"
    }
  },
  {
    title: "E-commerce Sur Mesure",
    description: "Plateforme de vente en ligne complète avec gestion avancée. Intégration Stripe/PayPal pour paiements sécurisés, système de gestion de stock en temps réel, tableau de bord analytics avec métriques business, et architecture scalable pour supporter la croissance.",
    icon: "/images/service-ecommerce.jpg",
    features: [
      "Paiements sécurisés : Stripe, PayPal, 3D Secure",
      "Gestion de stock avec alertes automatiques",
      "Dashboard admin : analytics, commandes, clients",
      "Panier persistant avec Redis pour performances",
      "Email transactionnel automatisé (confirmations, tracking)"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe API"],
    metrics: {
      uptime: "99.9%",
      transactions: "Sécurisées",
      performance: "Sub-second"
    }
  },
  {
    title: "Applications Web Métier",
    description: "Solutions sur mesure pour automatiser vos processus. Architecture microservices avec API REST/GraphQL, authentification JWT sécurisée avec refresh tokens, base de données relationnelle optimisée (PostgreSQL), et tests automatisés (Jest, Cypress) pour garantir la fiabilité.",
    icon: "/images/service-webapp.jpg",
    features: [
      "Architecture microservices modulaire et évolutive",
      "API REST/GraphQL documentée (Swagger/OpenAPI)",
      "Authentification JWT + OAuth2 pour sécurité maximale",
      "Base de données PostgreSQL avec migrations versionnées",
      "CI/CD automatisé : tests, build, déploiement"
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    metrics: {
      reliability: "99.9%",
      security: "Enterprise-grade",
      scalability: "Horizontale"
    }
  },
  {
    title: "SEO & Performance",
    description: "Optimisation technique complète pour dominer les résultats de recherche. Audit SEO technique approfondi (Core Web Vitals, indexation, structure), optimisation du code pour temps de chargement <1s, stratégie de contenu avec recherche de mots-clés, et suivi analytics avec rapports mensuels.",
    icon: "/images/service-seo.jpg",
    features: [
      "Audit technique : Core Web Vitals, indexation, crawl",
      "Optimisation code : code splitting, tree shaking, compression",
      "Stratégie contenu : recherche mots-clés, maillage interne",
      "Schema markup pour rich snippets Google",
      "Suivi analytics : Google Analytics 4, Search Console"
    ],
    tech: ["Google Analytics", "Search Console", "Lighthouse", "Screaming Frog"],
    metrics: {
      visibility: "+150%",
      traffic: "+200%",
      conversions: "+80%"
    }
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analyse & Cahier des Charges",
    description: "Étude approfondie de vos besoins métier, analyse de la concurrence, définition des user stories et des parcours utilisateurs. Création d'un cahier des charges technique détaillé avec architecture système, stack technologique, et planning de développement.",
    icon: "/images/process-step1.svg",
    deliverables: [
      "Cahier des charges technique complet",
      "Analyse concurrentielle et benchmark",
      "User stories et parcours utilisateurs",
      "Architecture système et diagrammes",
      "Planning détaillé avec jalons"
    ],
    duration: "3-5 jours"
  },
  {
    number: "02",
    title: "Design & Prototypage UI/UX",
    description: "Conception d'interfaces modernes et intuitives avec Figma. Création de wireframes, maquettes haute-fidélité, design system complet (couleurs, typographie, composants), et prototypes interactifs pour validation avant développement.",
    icon: "/images/process-step2.svg",
    deliverables: [
      "Wireframes et maquettes Figma",
      "Design system complet et documenté",
      "Prototypes interactifs cliquables",
      "Guide de style et charte graphique",
      "Assets optimisés (SVG, WebP, icônes)"
    ],
    duration: "5-7 jours"
  },
  {
    number: "03",
    title: "Développement & Intégration",
    description: "Développement avec les technologies les plus récentes : Next.js 14, React 19, TypeScript pour la robustesse. Code propre et maintenable suivant les best practices (SOLID, DRY), architecture modulaire, et intégration continue avec tests automatisés.",
    icon: "/images/process-step3.svg",
    deliverables: [
      "Code source versionné (Git) et documenté",
      "Architecture modulaire et scalable",
      "Tests unitaires et d'intégration (Jest, Cypress)",
      "Documentation technique complète",
      "Environnements dev, staging, production"
    ],
    duration: "2-4 semaines"
  },
  {
    number: "04",
    title: "Tests & Assurance Qualité",
    description: "Phase de QA rigoureuse : tests fonctionnels sur tous les navigateurs et devices, tests de performance (Lighthouse, WebPageTest), tests de sécurité (OWASP), et tests d'accessibilité (WCAG 2.1). Correction de tous les bugs avant mise en production.",
    icon: "/images/process-step4.svg",
    deliverables: [
      "Tests cross-browser (Chrome, Firefox, Safari, Edge)",
      "Tests responsive (mobile, tablette, desktop)",
      "Audit performance (Lighthouse score >90)",
      "Tests sécurité (OWASP Top 10)",
      "Rapport QA complet avec corrections"
    ],
    duration: "3-5 jours"
  },
  {
    number: "05",
    title: "Déploiement & Maintenance",
    description: "Mise en production sur infrastructure optimisée (Vercel, AWS, ou votre hébergeur). Configuration SSL, CDN, monitoring, et sauvegardes automatiques. Formation à l'utilisation, documentation utilisateur, et support technique pendant 3 mois inclus.",
    icon: "/images/process-step5.svg",
    deliverables: [
      "Déploiement sur infrastructure sécurisée",
      "Configuration SSL, CDN, monitoring",
      "Formation utilisateur et documentation",
      "Support technique 3 mois inclus",
      "Maintenance et mises à jour de sécurité"
    ],
    duration: "2-3 jours + support continu"
  },
];

const technologies = [
  { 
    name: "Next.js", 
    logo: "/images/logos/nextjs.svg",
    description: "Framework React avec SSR/SSG pour performances optimales et SEO. App Router, Server Components, et optimisations automatiques."
  },
  { 
    name: "React", 
    logo: "/images/logos/react.svg",
    description: "Bibliothèque JavaScript pour interfaces utilisateur modernes. Composants réutilisables, hooks, et écosystème riche."
  },
  { 
    name: "TypeScript", 
    logo: "/images/logos/typescript.svg",
    description: "JavaScript typé pour code robuste et maintenable. Détection d'erreurs à la compilation et meilleure DX."
  },
  { 
    name: "Tailwind CSS", 
    logo: "/images/logos/tailwind.svg",
    description: "Framework CSS utility-first pour design rapide et cohérent. Personnalisable, performant, et responsive."
  },
  { 
    name: "Node.js", 
    logo: "/images/logos/nodejs.svg",
    description: "Runtime JavaScript côté serveur. API REST/GraphQL performantes, microservices, et écosystème npm."
  },
  { 
    name: "PostgreSQL", 
    logo: "/images/logos/postgresql.svg",
    description: "Base de données relationnelle robuste. ACID, transactions, et performances pour applications critiques."
  },
  { 
    name: "Git", 
    logo: "/images/logos/git.svg",
    description: "Contrôle de version distribué. Collaboration, branches, et historique complet du code source."
  },
  { 
    name: "Figma", 
    logo: "/images/logos/figma.svg",
    description: "Outil de design collaboratif. Prototypes interactifs, design systems, et handoff développeur."
  },
];

const stats = [
  { value: 40, suffix: "+", label: "Projets réalisés", description: "Sites et applications livrés" },
  { value: 98, suffix: "%", label: "Satisfaction client", description: "Note moyenne sur tous les projets" },
  { value: 24, suffix: "h", label: "Délai de réponse", description: "Réponse garantie sous 24h" },
  { value: 95, suffix: "+", label: "Score Lighthouse", description: "Performance moyenne des sites" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Design épuré avec vidéo et Matrix Rain */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[var(--color-anthracite)]">
        {/* Vidéo de fond */}
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src="/videos/videolibreCodingWM.webm"
            className=""
            opacity="opacity-70"
            disableOnMobile={false}
          />
        </div>

        {/* Matrix Rain par-dessus la vidéo */}
        <div className="absolute inset-0 z-[1]">
          <MatrixRain />
        </div>
        
        {/* Content */}
        <div className="container-page relative z-10 flex min-h-[90vh] items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
            {/* Left: Text Content */}
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-accent-matrix)]/50 bg-[var(--color-accent-matrix)]/20 px-4 py-2 text-caption font-medium backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-matrix)] opacity-75 motion-safe:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-matrix)] shadow-[0_0_8px_rgba(0,255,0,0.6)]"></span>
                  </span>
                  <span className="text-white font-semibold drop-shadow-md">Disponible pour de nouveaux projets</span>
                </div>

                <h1 className="text-hero font-bold tracking-tighter leading-tight text-white drop-shadow-lg">
                  Créons ensemble votre{" "}
                  <span className="text-[var(--color-accent-matrix)] drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">
                    présence digitale
                  </span>{" "}
                  de demain
                </h1>

                <p className="text-body-lg leading-relaxed text-white/90 font-regular max-w-xl drop-shadow-md">
                  Développeur web passionné, je conçois des sites et applications sur mesure qui allient design moderne et performances techniques.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <CTAButton href="/devis">
                    Demander un devis
                  </CTAButton>
                  <CTAButton href="/portfolio" variant="secondary" showIcon={false}>
                    Voir mes projets
                  </CTAButton>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-body-sm font-medium text-white drop-shadow-md">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]" aria-hidden="true" />
                    <span>Code de qualité</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm font-medium text-white drop-shadow-md">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]" aria-hidden="true" />
                    <span>Délais respectés</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm font-medium text-white drop-shadow-md">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-matrix)] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]" aria-hidden="true" />
                    <span>Support inclus</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Visual or Illustration */}
            <ScrollReveal direction="right" delay={200}>
              <div className="relative hidden lg:block">
                <div className="relative aspect-square w-full max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[var(--color-accent-matrix)]/10 blur-3xl"></div>
                  <MockDashboard />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 motion-safe:animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-caption uppercase tracking-widest font-medium">Découvrir</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section - Expertise */}
      <section className="border-b border-border bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                count={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
                icon={
                  index === 0 ? <Rocket className="h-8 w-8" /> :
                  index === 1 ? <CheckCircle2 className="h-8 w-8" /> :
                  index === 2 ? <Zap className="h-8 w-8" /> :
                  <Shield className="h-8 w-8" />
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative bg-white py-12 md:py-20">
        <ParticlesBackground />
        
        <div className="container-page-no-py">
          <ScrollReveal direction="up">
            <div className="relative z-10 mb-16 space-y-4 text-center">
              <div className="eyebrow mx-auto">Services</div>
              <h2 className="section-title">
                Une expertise technique complète pour propulser votre activité
              </h2>
              <p className="section-subtitle mx-auto">
                Du maquettage à la mise en production, je maîtrise toute la chaîne de développement web moderne.
                Code propre, architecture scalable, et performances optimales garanties.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative z-10 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} direction={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
              <article className="card group relative h-full overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-[var(--color-accent)] hover:shadow-matrix-lg motion-reduce:transform-none">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-accent)]/10 via-[var(--color-accent-secondary)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Numbered Icon Badge */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-anthracite to-accent text-2xl font-bold text-foreground shadow-matrix transition-all duration-300 group-hover:scale-110 group-hover:from-accent group-hover:to-accentTertiary group-hover:shadow-matrix-lg motion-reduce:transform-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="overflow-hidden rounded-xl flex-1">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={600}
                      height={200}
                      className="h-32 w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 motion-reduce:transform-none"
                    />
                  </div>
                </div>

                <h3 className="mb-3 text-heading-lg font-bold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {service.title}
                </h3>

                <p className="mb-6 text-body leading-relaxed text-[var(--color-muted)]">
                  {service.description}
                </p>

                <div className="mb-6 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <div 
                      key={feature} 
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                      <span className="text-body-sm text-[var(--color-foreground)]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-5">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-gradient-to-br hover:from-[var(--color-accent)]/5 hover:to-[var(--color-accent-secondary)]/5 hover:shadow-matrix"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
          </div>

          <ScrollReveal direction="up" delay={400}>
            <div className="relative z-10 mt-12 text-center">
              <Link href="/services" className="btn-primary">
                Découvrir tous les services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gradient-to-b from-white to-[var(--color-surface)] py-20">
        <div className="container-page">
          <ScrollReveal direction="up">
            <div className="mb-16 space-y-4 text-center">
              <div className="eyebrow mx-auto">Processus</div>
              <h2 className="section-title">
                Un processus éprouvé en 5 étapes pour garantir votre succès
              </h2>
              <p className="section-subtitle mx-auto">
                Méthodologie agile, communication transparente, et livraison itérative pour un projet maîtrisé de bout en bout.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative space-y-6">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-anthracite via-accent to-accentTertiary hidden lg:block" aria-hidden="true" />
            
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.number} direction="up" delay={index * 100}>
                <article className="card group relative overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-matrix-lg">
                  {/* Large background number */}
                  <div className="absolute right-4 top-4 text-[8rem] font-bold leading-none text-[var(--color-accent)]/5 select-none" aria-hidden="true">
                    {step.number}
                  </div>

                  <div className="relative grid gap-6 lg:grid-cols-[auto_1fr]">
                    {/* Left: Number Badge */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-anthracite to-accent text-2xl font-bold text-foreground shadow-matrix ring-4 ring-background transition-all duration-300 group-hover:scale-110 group-hover:from-accent group-hover:to-accentTertiary group-hover:shadow-matrix-lg motion-reduce:transform-none">
                        {step.number}
                      </div>
                      <div className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-accent border border-accent/20 transition-all group-hover:border-accent group-hover:shadow-matrix">
                        {step.duration}
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                          {step.title}
                        </h3>
                        <p className="leading-relaxed text-[var(--color-muted)]">
                          {step.description}
                        </p>
                      </div>

                      <div className="rounded-xl bg-surface/50 p-4 border border-border">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          Livrables
                        </h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {step.deliverables.map((deliverable) => (
                            <li key={deliverable} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-matrix" aria-hidden="true" />
                              <span className="text-sm text-[var(--color-foreground)]">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div className="mt-12 text-center">
              <Link href="/processus" className="btn-primary">
                En savoir plus sur mon processus
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-page-no-py">
        <ScrollReveal direction="up">
          <div className="mb-16 space-y-4 text-center">
            <div className="eyebrow mx-auto">Stack Technique</div>
            <h2 className="section-title">
              Technologies modernes et performantes
            </h2>
            <p className="section-subtitle mx-auto">
              J'utilise les meilleurs outils de l'écosystème JavaScript/TypeScript pour créer des applications
              rapides, sécurisées et évolutives.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {technologies.map((tech) => (
              <TechBadge
                key={tech.name}
                name={tech.name}
                logo={tech.logo}
                description={tech.description}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-16 rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent-secondary)]/5 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">
                  <Zap className="h-8 w-8 text-[var(--color-accent)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-foreground)]">
                  Performances Optimales
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  Code splitting, lazy loading, et optimisations avancées pour des temps de chargement &lt;1s
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent-secondary)]/10">
                  <Shield className="h-8 w-8 text-[var(--color-accent-secondary)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-foreground)]">
                  Sécurité Renforcée
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  HTTPS, authentification JWT, protection CSRF/XSS, et conformité RGPD garantie
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent-matrix)]/10">
                  <Rocket className="h-8 w-8 text-[var(--color-accent-matrix)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-foreground)]">
                  Scalabilité Assurée
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  Architecture modulaire et microservices pour supporter votre croissance sans limites
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* Tech Showcase Section - NEW */}
      <section className="relative overflow-hidden bg-[var(--color-surface)] py-20">
        
        <div className="container-page relative z-10">
          <ScrollReveal direction="up">
            <div className="mb-16 space-y-4 text-center">
              <div className="eyebrow mx-auto">Innovation Technologique</div>
              <h2 className="section-title">
                Des solutions qui impressionnent par leur technologie
              </h2>
              <p className="section-subtitle mx-auto">
                Découvrez des exemples concrets de ce que je peux créer pour vous : interfaces modernes, 
                animations fluides, et expériences utilisateur exceptionnelles.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Code Animation Demo */}
            <ScrollReveal direction="left" delay={100}>
              <GlassmorphismCard className="p-6" variant="gradient">
                <div className="mb-4">
                  <h3 className="mb-2 text-heading-md font-semibold text-[var(--color-foreground)]">
                    Code en temps réel
                  </h3>
                  <p className="text-body-sm text-[var(--color-muted)]">
                    Animation de code qui s'écrit automatiquement, parfait pour présenter 
                    vos solutions techniques de manière dynamique.
                  </p>
                </div>
                <CodeTypingAnimation snippetIndex={0} />
              </GlassmorphismCard>
            </ScrollReveal>
          </div>

          {/* Dashboard Demo - Full Width */}
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-8">
              <div className="mb-4 text-center">
                <h3 className="mb-2 text-heading-md font-semibold text-[var(--color-foreground)]">
                  Interfaces SaaS professionnelles
                </h3>
                <p className="text-body-sm text-[var(--color-muted)]">
                  Dashboard interactif avec données en temps réel, graphiques animés, 
                  et design moderne pour vos applications métier.
                </p>
              </div>
              <MockDashboard />
            </div>
          </ScrollReveal>

          {/* Features Grid */}
          <ScrollReveal direction="up" delay={300}>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <GlassmorphismCard className="p-6 text-center" hover={true}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] shadow-matrix">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h4 className="mb-2 text-heading-sm font-semibold text-[var(--color-foreground)]">
                  Code Moderne
                </h4>
                <p className="text-body-sm text-[var(--color-muted)]">
                  React 19, Next.js 15, TypeScript pour un code robuste et maintenable
                </p>
              </GlassmorphismCard>

              <GlassmorphismCard className="p-6 text-center" hover={true}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-anthracite)] to-[var(--color-accent)] shadow-matrix">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="mb-2 text-heading-sm font-semibold text-[var(--color-foreground)]">
                  Performances Extrêmes
                </h4>
                <p className="text-body-sm text-[var(--color-muted)]">
                  Optimisations avancées pour des temps de chargement ultra-rapides
                </p>
              </GlassmorphismCard>

              <GlassmorphismCard className="p-6 text-center" hover={true}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-secondary)] to-[var(--color-accent)] shadow-matrix">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h4 className="mb-2 text-heading-sm font-semibold text-[var(--color-foreground)]">
                  Animations Fluides
                </h4>
                <p className="text-body-sm text-[var(--color-muted)]">
                  Transitions et animations 60fps pour une expérience premium
                </p>
              </GlassmorphismCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-page-no-py">
        <ScrollReveal direction="up">
          <div className="mb-16 space-y-4 text-center">
            <div className="eyebrow mx-auto">Tarifs</div>
            <h2 className="section-title">
              Des formules adaptées à vos besoins
            </h2>
            <p className="section-subtitle mx-auto">
              Choisissez la formule qui correspond le mieux à votre projet. Tous les tarifs incluent un accompagnement personnalisé et un support de 3 mois.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <ScrollReveal direction="left" delay={100}>
            <PricingCard
              title="Starter"
              price="2 500€"
              period="projet"
              description="Idéal pour les petits projets et sites vitrines. Une solution clé en main pour démarrer votre présence en ligne."
              features={[
                "Site vitrine 5 pages maximum",
                "Design responsive (mobile, tablette, desktop)",
                "Optimisation SEO de base",
                "Formulaire de contact",
                "Hébergement 1 an inclus",
                "Formation à la gestion du contenu",
                "Support 3 mois inclus"
              ]}
              buttonLabel="Choisir Starter"
              buttonHref="/devis?plan=starter"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <PricingCard
              title="Business"
              price="5 500€"
              period="projet"
              description="Pour les entreprises qui veulent se démarquer avec un site professionnel et performant."
              features={[
                "Site sur mesure jusqu'à 15 pages",
                "Design personnalisé et moderne",
                "Optimisation SEO avancée",
                "Intégration CMS (WordPress/Strapi)",
                "Animations et interactions",
                "Tableau de bord analytics",
                "Formation complète",
                "Support 3 mois inclus"
              ]}
              highlight={true}
              buttonLabel="Choisir Business"
              buttonHref="/devis?plan=business"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={300}>
            <PricingCard
              title="Premium"
              price="Sur devis"
              period=""
              description="Pour les projets complexes nécessitant des fonctionnalités avancées et une architecture sur mesure."
              features={[
                "Application web complexe",
                "Architecture scalable et sécurisée",
                "Intégrations API tierces",
                "Espace membre / authentification",
                "Paiement en ligne (Stripe)",
                "Dashboard admin personnalisé",
                "Tests automatisés",
                "Support prioritaire 6 mois"
              ]}
              buttonLabel="Demander un devis"
              buttonHref="/devis?plan=premium"
            />
          </ScrollReveal>
        </div>

        {/* Daily Rate Card */}
        <ScrollReveal direction="up" delay={400}>
          <div className="card max-w-3xl mx-auto text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10 border-accent/30">
            <div className="space-y-4">
              <h3 className="text-heading-lg font-bold text-foreground">Taux Journalier Moyen (TJM)</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-display font-bold text-accent">450€</span>
                <span className="text-body text-muted">/ jour</span>
              </div>
              <p className="text-body text-muted max-w-2xl mx-auto">
                Pour les missions en régie ou les projets nécessitant une facturation au temps passé. 
                Idéal pour les collaborations longue durée et les projets évolutifs.
              </p>
              <div className="pt-4">
                <Button href="/contact" variant="secondary" size="md">
                  Discuter de votre projet
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={500}>
          <div className="mt-12 text-center">
            <Link href="/tarifs" className="btn-secondary">
              Voir tous les détails tarifaires
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[var(--color-surface)] to-white py-20">
        <div className="container-page">
          <ScrollReveal direction="up">
            <div className="mb-16 space-y-4 text-center">
              <div className="eyebrow mx-auto">Témoignages</div>
              <h2 className="section-title">
                Ils m'ont fait confiance
              </h2>
              <p className="section-subtitle mx-auto">
                Découvrez les retours de mes clients sur la qualité de mon travail et mon accompagnement.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <TestimonialSlider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="mt-12 text-center">
              <Link href="/temoignages" className="btn-secondary">
                Voir tous les témoignages
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-page-no-py">
        <CTASection 
          title="Prêt à démarrer votre projet ?"
          description="Discutons de vos besoins et je vous proposerai une solution sur mesure adaptée à votre budget et vos objectifs."
          primaryButtonText="Demander un devis gratuit"
          primaryButtonHref="/devis"
          secondaryButtonText="Me contacter"
          secondaryButtonHref="/contact"
        />
        </div>
      </section>
    </>
  );
}
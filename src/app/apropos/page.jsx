import Image from "next/image";
import Link from "next/link";
import { Code2, Lightbulb, Users, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

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
    <div className="container-page">
      {/* Header */}
      <header className="mb-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ScrollReveal direction="up">
          <div className="space-y-6">
            <h1 className="section-title">Un partenaire technique de confiance</h1>
            <p className="text-lg leading-relaxed text-[var(--color-muted)]">
              Développeur full-stack depuis plus de 10 ans, j'aide les artisans, TPE et PME à bâtir des outils digitaux
              performants, durables et alignés sur leurs objectifs business.
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-muted)]">
              Basé en France, j'interviens partout en distanciel ou sur site selon vos besoins.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
              <Image
                src="/images/avatar.jpg"
                alt="Portrait professionnel de Nicolas Banic"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 400px, 80vw"
              />
            </div>
          </div>
        </ScrollReveal>
      </header>

      {/* Stats */}
      <ScrollReveal direction="up">
        <section className="mb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} direction="up" delay={index * 50}>
              <div className="card text-center">
                <p className="text-4xl font-bold text-[var(--color-accent)]">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </section>
      </ScrollReveal>

      {/* Parcours & Compétences */}
      <section className="mb-24 grid gap-8 lg:grid-cols-2">
        <ScrollReveal direction="up">
          <div className="card space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">Mon parcours</h2>
            <p className="leading-relaxed text-[var(--color-muted)]">
              Après plusieurs années en agence digitale puis en start-up, j'ai choisi le freelancing pour travailler au
              plus près des décisions et offrir une collaboration fluide et personnalisée.
            </p>
            <p className="leading-relaxed text-[var(--color-muted)]">
              Mon expérience couvre la conception, le design, le développement front et back-end, ainsi que la stratégie
              produit. J'ai accompagné des dizaines d'artisans, TPE et PME dans leur transformation digitale.
            </p>
            <p className="leading-relaxed text-[var(--color-muted)]">
              Aujourd'hui, je me concentre sur la création de sites web modernes et performants qui génèrent de vrais
              résultats pour mes clients.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="card space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">Compétences techniques</h2>
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
        <section className="mb-24">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Mes valeurs</h2>
            <p className="section-subtitle mx-auto">
              Ce qui guide mon travail au quotidien
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} direction="up" delay={index * 100}>
                  <div className="card text-center">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{value.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{value.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Ce qui m'anime */}
      <ScrollReveal direction="up">
        <section className="mb-24 card space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">Ce qui m'anime</h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            J'aime comprendre votre métier pour traduire vos enjeux business en solutions digitales concrètes. Chaque projet
            est l'occasion d'apporter de la valeur à vos équipes et à vos clients.
          </p>
          <p className="leading-relaxed text-[var(--color-muted)]">
            Qualité, transparence, réactivité et pédagogie sont au cœur de ma démarche. Je privilégie des cycles courts,
            l'écoute et les retours réguliers pour avancer efficacement.
          </p>
          <p className="leading-relaxed text-[var(--color-muted)]">
            Mon objectif : créer des sites web qui non seulement vous plaisent, mais qui génèrent aussi des résultats
            mesurables pour votre activité.
          </p>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal direction="up">
        <section className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-12 text-white shadow-2xl">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Travaillons ensemble</h2>
            <p className="text-lg text-white/90">
              Vous avez un projet en tête ? Discutons-en autour d'un café (virtuel ou réel) !
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none"
              >
                Demander un devis
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-accent)] motion-reduce:transform-none"
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
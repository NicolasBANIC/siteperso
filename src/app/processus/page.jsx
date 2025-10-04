import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircle2, ArrowRight } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Analyse & Stratégie",
    description: "Nous définissons ensemble vos objectifs, votre cible et les fonctionnalités essentielles pour créer une solution parfaitement adaptée à vos besoins.",
    icon: "/images/process-step1.svg",
    details: [
      "Audit de vos besoins et objectifs",
      "Analyse de la concurrence",
      "Définition du cahier des charges",
      "Estimation des délais et du budget",
    ],
    duration: "1-2 semaines",
  },
  {
    number: "02",
    title: "Design & Maquettage",
    description: "Je conçois une maquette sur mesure qui reflète votre identité de marque et offre une expérience utilisateur optimale.",
    icon: "/images/process-step2.svg",
    details: [
      "Création de la charte graphique",
      "Maquettes desktop et mobile",
      "Prototypage interactif",
      "Validation avec vous",
    ],
    duration: "1-2 semaines",
  },
  {
    number: "03",
    title: "Développement",
    description: "Développement de votre site avec les dernières technologies web pour garantir performance, sécurité et évolutivité.",
    icon: "/images/process-step3.svg",
    details: [
      "Développement front-end responsive",
      "Intégration back-end et base de données",
      "Optimisation des performances",
      "Intégration des contenus",
    ],
    duration: "2-4 semaines",
  },
  {
    number: "04",
    title: "Tests & Optimisation",
    description: "Tests rigoureux sur tous les navigateurs et appareils pour garantir une expérience parfaite à tous vos utilisateurs.",
    icon: "/images/process-step4.svg",
    details: [
      "Tests multi-navigateurs et multi-devices",
      "Optimisation SEO technique",
      "Tests de performance et accessibilité",
      "Corrections et ajustements",
    ],
    duration: "1 semaine",
  },
  {
    number: "05",
    title: "Livraison & Suivi",
    description: "Mise en ligne de votre site, formation à son utilisation et accompagnement pour garantir le succès de votre projet.",
    icon: "/images/process-step5.svg",
    details: [
      "Mise en ligne et configuration",
      "Formation à l'administration",
      "Documentation complète",
      "Support et maintenance",
    ],
    duration: "En continu",
  },
];

const benefits = [
  {
    title: "Transparence totale",
    description: "Vous êtes informé à chaque étape avec des points réguliers et un accès à l'avancement du projet.",
  },
  {
    title: "Flexibilité",
    description: "Le processus s'adapte à vos contraintes et à la complexité de votre projet.",
  },
  {
    title: "Qualité garantie",
    description: "Chaque livrable est testé et validé avant de passer à l'étape suivante.",
  },
  {
    title: "Accompagnement continu",
    description: "Je reste disponible après la livraison pour vous accompagner dans l'évolution de votre site.",
  },
];

export const metadata = {
  title: "Processus de Développement — Nicolas Banic",
  description: "Découvrez ma méthode de travail en 5 étapes : de l'analyse à la livraison, un processus éprouvé pour garantir le succès de votre projet web.",
};

export default function ProcessusPage() {
  return (
    <div className="container-page">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="mb-16 space-y-4 text-center">
          <h1 className="section-title">Un processus éprouvé en 5 étapes</h1>
          <p className="section-subtitle mx-auto">
            De l'idée à la mise en ligne, je vous accompagne à chaque étape pour garantir le succès de votre projet web.
          </p>
        </div>
      </ScrollReveal>

      {/* Process Steps */}
      <div className="mb-24 space-y-12">
        {processSteps.map((step, index) => (
          <ScrollReveal key={step.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 50}>
            <article className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">
                    <Image
                      src={step.icon}
                      alt={`Illustration de l'étape ${step.number} - ${step.title}`}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">Étape {step.number}</span>
                    <h2 className="mt-1 text-3xl font-bold text-[var(--color-foreground)]">{step.title}</h2>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-[var(--color-muted)]">{step.description}</p>

                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent-matrix)]" />
                      <span className="text-[var(--color-muted)]">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm">
                  <span className="font-medium text-[var(--color-foreground)]">Durée :</span>
                  <span className="text-[var(--color-muted)]">{step.duration}</span>
                </div>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-10 blur-2xl" />
                <div className="card relative flex items-center justify-center p-12">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--color-accent)]/20 blur-xl" />
                    <Image
                      src={step.icon}
                      alt={`Grande illustration de l'étape ${step.number} - ${step.title} du processus de développement`}
                      width={200}
                      height={200}
                      className="relative h-48 w-48 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < processSteps.length - 1 && (
                <div className="col-span-full flex justify-center py-4">
                  <ArrowRight className="h-8 w-8 text-[var(--color-accent)]/30" />
                </div>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Benefits */}
      <ScrollReveal direction="up">
        <section className="mb-24">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Les avantages de ma méthode</h2>
            <p className="section-subtitle mx-auto">
              Un processus structuré pour des résultats garantis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} direction="up" delay={index * 50}>
                <div className="card group hover:border-[var(--color-accent)] transition-all duration-300">
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline Summary */}
      <ScrollReveal direction="up">
        <section className="mb-24">
          <div className="card border-[var(--color-accent)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)]">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                Durée totale moyenne : 6 à 10 semaines
              </h2>
              <p className="text-lg text-[var(--color-muted)]">
                Du premier contact à la mise en ligne, en fonction de la complexité de votre projet et de vos disponibilités.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/devis" className="btn-primary">
                  Demander un devis gratuit
                </Link>
                <Link href="/portfolio" className="btn-secondary">
                  Voir mes réalisations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal direction="up">
        <section>
          <div className="mb-12 space-y-4 text-center">
            <h2 className="section-title">Questions fréquentes</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Puis-je modifier le processus selon mes besoins ?",
                answer: "Absolument ! Ce processus est une base éprouvée, mais je l'adapte toujours aux spécificités de chaque projet et aux contraintes de mes clients.",
              },
              {
                question: "Que se passe-t-il si je veux des modifications en cours de route ?",
                answer: "Les modifications mineures sont incluses dans chaque étape. Pour des changements majeurs, nous discutons ensemble de l'impact sur le planning et le budget.",
              },
              {
                question: "Combien de temps après la livraison êtes-vous disponible ?",
                answer: "Je reste disponible pour le support et les questions pendant 30 jours après la livraison. Ensuite, je propose des contrats de maintenance mensuels.",
              },
              {
                question: "Puis-je voir l'avancement du projet en temps réel ?",
                answer: "Oui ! Vous avez accès à un espace de suivi où vous pouvez voir l'avancement, les maquettes, et communiquer avec moi à tout moment.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 50}>
                <details className="card group cursor-pointer">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--color-foreground)] list-none">
                    {faq.question}
                    <span className="text-[var(--color-accent)] transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
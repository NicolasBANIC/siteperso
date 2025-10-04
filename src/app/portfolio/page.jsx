"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    id: 1,
    title: "GTravaux",
    category: "Site vitrine",
    image: "/images/gtravaux.jpg",
    description: "Site vitrine pour une entreprise de travaux et rénovation.",
    longDescription: "Création d'un site vitrine moderne et responsive pour GTravaux, spécialisée dans les travaux de rénovation. Le site met en avant les services, le portfolio de réalisations et facilite la prise de contact.",
    technologies: ["Next.js", "TailwindCSS", "React"],
    features: [
      "Design responsive et moderne",
      "Galerie de réalisations",
      "Formulaire de contact optimisé",
      "Optimisation SEO locale",
    ],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Atelier Bois",
    category: "E-commerce",
    image: "/images/atelier-bois.jpg",
    description: "Boutique en ligne pour un artisan menuisier.",
    longDescription: "Développement d'une boutique e-commerce sur mesure pour un artisan menuisier. Catalogue produits, panier, paiement sécurisé et gestion des commandes.",
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
    features: [
      "Catalogue produits avec filtres",
      "Paiement sécurisé Stripe",
      "Gestion des stocks",
      "Tableau de bord admin",
    ],
    link: "#",
  },
  {
    id: 3,
    title: "Atelier Métal",
    category: "Site vitrine",
    image: "/images/atelier-metal.jpg",
    description: "Portfolio pour un artisan métallier.",
    longDescription: "Site portfolio élégant pour un artisan métallier, mettant en valeur ses créations uniques et son savoir-faire.",
    technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
    features: [
      "Galerie photos haute qualité",
      "Animations fluides",
      "Formulaire de devis",
      "Blog intégré",
    ],
    link: "#",
  },
  {
    id: 4,
    title: "Conseil Habitat",
    category: "Application web",
    image: "/images/conseil-habitat.jpg",
    description: "Plateforme de gestion pour un cabinet de conseil.",
    longDescription: "Application web complète pour la gestion des clients, projets et documents d'un cabinet de conseil en habitat.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    features: [
      "Gestion des clients et projets",
      "Système de documents",
      "Tableau de bord analytique",
      "Authentification sécurisée",
    ],
    link: "#",
  },
  {
    id: 5,
    title: "Douceurs de Léa",
    category: "E-commerce",
    image: "/images/douceurs-lea.jpg",
    description: "Boutique en ligne pour une pâtisserie artisanale.",
    longDescription: "Site e-commerce pour une pâtisserie artisanale avec système de commande en ligne et gestion des créneaux de retrait.",
    technologies: ["Next.js", "Stripe", "TailwindCSS"],
    features: [
      "Commande en ligne",
      "Gestion des créneaux",
      "Paiement sécurisé",
      "Système de fidélité",
    ],
    link: "#",
  },
  {
    id: 6,
    title: "Fashion Store",
    category: "E-commerce",
    image: "/images/portfolio-ecom-fashion.jpg",
    description: "Boutique e-commerce mode haut de gamme.",
    longDescription: "Plateforme e-commerce complète pour une boutique de mode avec gestion avancée des variantes (tailles, couleurs), wishlist et recommandations personnalisées.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "TypeScript"],
    features: [
      "Gestion des variantes produits",
      "Wishlist et favoris",
      "Recommandations IA",
      "Programme de fidélité",
    ],
    link: "#",
  },
  {
    id: 7,
    title: "SaaS Dashboard",
    category: "Application web",
    image: "/images/portfolio-saas-dashboard.jpg",
    description: "Dashboard analytique pour plateforme SaaS.",
    longDescription: "Interface d'administration complète pour une plateforme SaaS avec tableaux de bord personnalisables, graphiques en temps réel et gestion multi-utilisateurs.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Chart.js"],
    features: [
      "Tableaux de bord personnalisables",
      "Graphiques temps réel",
      "Gestion multi-utilisateurs",
      "Export de données",
    ],
    link: "#",
  },
  {
    id: 8,
    title: "GTravaux Mobile",
    category: "Site vitrine",
    image: "/images/portfolio-gtravaux-mobile.jpg",
    description: "Version mobile optimisée de GTravaux.",
    longDescription: "Optimisation mobile-first du site GTravaux avec expérience utilisateur améliorée, navigation tactile et performances optimales sur smartphone.",
    technologies: ["Next.js", "TailwindCSS", "PWA"],
    features: [
      "Design mobile-first",
      "Progressive Web App",
      "Mode hors ligne",
      "Notifications push",
    ],
    link: "#",
  },
];

const categories = ["Tous", "Site vitrine", "E-commerce", "Application web"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === "Tous"
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      <div className="container-page">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-12 space-y-4 text-center">
            <h1 className="section-title">Portfolio</h1>
            <p className="section-subtitle mx-auto">
              Découvrez une sélection de mes réalisations pour artisans, TPE et PME.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[var(--color-accent)] text-white shadow-lg"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={index * 50}>
              <article
                className="group card cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl motion-reduce:transform-none"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-[var(--color-accent)]">
                      Voir le projet
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 inline-flex rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{project.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{project.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-8 space-y-6">
              <div>
                <div className="mb-3 inline-flex rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent)]">
                  {selectedProject.category}
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-foreground)]">{selectedProject.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-[var(--color-foreground)]">Technologies utilisées</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-1.5 text-sm text-[var(--color-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-[var(--color-foreground)]">Fonctionnalités clés</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[var(--color-muted)]">
                      <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Voir le site
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github className="h-4 w-4" />
                    Code source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const metadata = {
  title: "Portfolio — Nicolas Banic",
  description: "Découvrez mes réalisations : sites vitrines, e-commerce et applications web pour artisans, TPE et PME.",
};
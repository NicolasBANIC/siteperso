import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { getAllProjectSlugs, getProjectBySlug, getAllProjects } from "@/data/projectsData";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import CTAButton from "@/components/CTAButton";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Génération statique des pages
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: `${project.title} - ${project.subtitle} | Portfolio Nicolas Banic`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - ${project.subtitle}`,
      description: project.shortDescription,
      images: [project.heroImage],
      type: "website",
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Contenu hero */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-page w-full pb-12">
            <Link
              href="/portfolio"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au portfolio
            </Link>
            
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-gray-900 backdrop-blur-sm">
                {project.category}
              </span>
            </div>
            
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/90 md:text-xl">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container-page">
        {/* Informations clés */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="mb-2 flex items-center gap-2 text-[var(--color-accent)]">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Année</span>
            </div>
            <p className="text-lg font-bold text-[var(--color-foreground)]">{project.year}</p>
          </div>

          <div className="card">
            <div className="mb-2 flex items-center gap-2 text-[var(--color-accent)]">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Durée</span>
            </div>
            <p className="text-lg font-bold text-[var(--color-foreground)]">{project.duration}</p>
          </div>

          <div className="card">
            <div className="mb-2 flex items-center gap-2 text-[var(--color-accent)]">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Type</span>
            </div>
            <p className="text-lg font-bold text-[var(--color-foreground)]">
              {project.isReal ? "Projet réel" : "Projet fictif"}
            </p>
          </div>

          {project.liveUrl && (
            <div className="card">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between transition-colors hover:text-[var(--color-accent)]"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[var(--color-accent)]">
                    <ExternalLink className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Site</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)]">
                    Voir en ligne
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">À propos du projet</h2>
          <div className="card">
            <p className="body-large mb-6">{project.description}</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-bold text-[var(--color-foreground)]">Contexte</h3>
                <p className="body-base">{project.context}</p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-[var(--color-foreground)]">Cible</h3>
                <p className="body-base">{project.target}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Objectifs */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Objectifs du projet</h2>
          <div className="card">
            <ul className="space-y-3">
              {project.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" />
                  <span className="body-base">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Processus */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Processus de réalisation</h2>
          <div className="space-y-4">
            {project.process.map((step, index) => (
              <div key={index} className="card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-foreground)]">{step.title}</h3>
                </div>
                <p className="body-base ml-13">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Technologies utilisées</h2>
          <div className="card">
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Livrables */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Livrables</h2>
          <div className="card">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" />
                  <span className="body-base">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Résultats (si projet réel) */}
        {project.results && project.results.length > 0 && (
          <div className="mb-16">
            <h2 className="heading-secondary mb-6">Résultats obtenus</h2>
            <div className="card bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent">
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" />
                    <span className="body-base font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Galerie */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Galerie du projet</h2>
          <ProjectGallery images={project.images} projectTitle={project.title} />
        </div>

        {/* CTA et navigation */}
        <div className="mb-16">
          <div className="card text-center">
            <h2 className="heading-secondary mb-4">Vous avez un projet similaire ?</h2>
            <p className="body-large mb-6">
              Discutons de vos besoins et créons ensemble une solution sur mesure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/devis">Demander un devis gratuit</CTAButton>
              <CTAButton href="/contact" variant="secondary" showIcon={false}>
                Me contacter
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Projet suivant */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-6">Projet suivant</h2>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group card block overflow-hidden p-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl motion-reduce:transform-none"
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={nextProject.coverImage}
                alt={`Aperçu du projet ${nextProject.title}`}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <span className="mb-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
                    {nextProject.category}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                    {nextProject.title}
                  </h3>
                  <p className="text-white/90">{nextProject.subtitle}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
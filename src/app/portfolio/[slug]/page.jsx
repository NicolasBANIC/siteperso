import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';

/**
 * Generate metadata for project page
 * TODO: SEO - Dynamic metadata per project
 */
export async function generateMetadata({ params }) {
  try {
    const project = await getProjectBySlug(params.slug);
    
    return {
      title: project.title,
      description: project.summary,
      openGraph: {
        title: project.title,
        description: project.summary,
        images: [project.og || project.cover],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.summary,
        images: [project.og || project.cover],
      },
    };
  } catch (error) {
    return {
      title: 'Projet non trouvé',
    };
  }
}

/**
 * Generate static params for all projects
 * TODO: Perf - Static generation for all project pages
 */
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Project Detail Page
 */
export default async function ProjectPage({ params }) {
  let project;
  
  try {
    project = await getProjectBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  // TODO: SEO - Add JSON-LD structured data for CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.cover,
    author: {
      '@type': 'Person',
      name: 'Nicolas Banic',
      url: 'https://siteperso-wsu8.vercel.app',
    },
    datePublished: `${project.year}-01-01`,
    keywords: project.stack.join(', '),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen">
        {/* Hero Section with Project Cover */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[var(--color-muted)]">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Back Button */}
          <div className="absolute top-8 left-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour au portfolio
            </Link>
          </div>

          {/* Project Title */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container-page">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {project.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container-page py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Quick Info & Links */}
            <section className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[var(--color-border)]">
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-foreground)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Voir le site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Code source
                  </a>
                )}
              </div>
            </section>

            {/* Context */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Contexte du projet
              </h2>
              <p className="text-lg text-[var(--color-muted)] leading-relaxed">
                {project.context}
              </p>
            </section>

            {/* Role & Deliverables */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Mon rôle & livrables
              </h2>
              <p className="text-lg text-[var(--color-muted)] leading-relaxed">
                {project.role}
              </p>
            </section>

            {/* Technologies */}
            {project.technologies && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4">
                  Stack technique complète
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-base font-medium text-[var(--color-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Résultats mesurables
              </h2>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-lg text-[var(--color-muted)]">{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Lighthouse Metrics */}
            {project.metrics && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-6">
                  Scores Lighthouse
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card">
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                      {project.metrics.performance}
                    </div>
                    <div className="text-sm font-medium text-[var(--color-muted)]">Performance</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card">
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                      {project.metrics.accessibility}
                    </div>
                    <div className="text-sm font-medium text-[var(--color-muted)]">Accessibilité</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card">
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                      {project.metrics.seo}
                    </div>
                    <div className="text-sm font-medium text-[var(--color-muted)]">SEO</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card">
                    <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                      {project.metrics.bestPractices}
                    </div>
                    <div className="text-sm font-medium text-[var(--color-muted)]">Best Practices</div>
                  </div>
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="pt-8 border-t border-[var(--color-border)]">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                  Vous avez un projet similaire ?
                </h2>
                <p className="text-lg text-[var(--color-muted)]">
                  Discutons de vos besoins et créons quelque chose d'exceptionnel ensemble.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/devis"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    Demander un devis
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium border border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    Voir d'autres projets
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
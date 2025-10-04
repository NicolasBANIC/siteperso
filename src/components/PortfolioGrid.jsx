'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * PortfolioGrid Component
 * Displays project cards with filtering by technology stack
 * 
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects
 */
export default function PortfolioGrid({ projects }) {
  const [filter, setFilter] = useState('all');

  // Extract unique technologies from all projects
  const allTechs = ['all', ...new Set(projects.flatMap(p => p.stack))];
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.stack.includes(filter));

  return (
    <section aria-labelledby="portfolio-title" className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label="Filtrer les projets par technologie">
        {allTechs.map(tech => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`
              rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
              border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]
              ${filter === tech 
                ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md' 
                : 'bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }
            `}
            aria-pressed={filter === tech}
          >
            {tech === 'all' ? 'Tous les projets' : tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-card bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 hover:shadow-xl hover:border-[var(--color-accent)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
          >
            {/* Project Cover Image */}
            <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-muted)]">
              <Image
                src={project.cover}
                alt={`Aperçu du projet ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Project Info */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-[var(--color-muted)] line-clamp-2">
                {project.summary}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs font-medium text-[var(--color-muted)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs font-medium text-[var(--color-muted)]">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              {/* View Project Link */}
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] pt-2">
                <span>Voir le projet</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-muted)] text-lg">
            Aucun projet trouvé pour cette technologie.
          </p>
        </div>
      )}
    </section>
  );
}
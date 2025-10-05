'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * PortfolioGrid Component
 * Displays project cards with filtering by technology stack
 * 
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects
 */
export default function PortfolioGrid({ projects }) {
  const [filter, setFilter] = useState('all');
  const prefersReducedMotion = useReducedMotion();

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
          <motion.button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`
              rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200
              border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent
              ${filter === tech 
                ? 'bg-accent text-white border-accent shadow-card' 
                : 'bg-surface text-muted border-border hover:border-accent hover:text-accent'
              }
            `}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-pressed={filter === tech}
          >
            {tech === 'all' ? 'Tous les projets' : tech}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : index * 0.05
              }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block rounded-lg overflow-hidden shadow-card bg-surface border border-border transition-all duration-300 hover:shadow-card hover:border-accent hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent motion-reduce:transform-none"
              >
                {/* Project Cover Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                  <Image
                    src={project.cover}
                    alt={`Aperçu du projet ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-accent pt-2">
                    <span>Voir le projet</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-muted text-lg">
            Aucun projet trouvé pour cette technologie.
          </p>
        </motion.div>
      )}
    </section>
  );
}
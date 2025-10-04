'use client';

import { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

/**
 * CaseStudyModal Component
 * Modal for displaying detailed project case study
 * 
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 */
export default function CaseStudyModal({ project, isOpen, onClose }) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          aria-label="Fermer la fenêtre"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Project Cover */}
        <div className="aspect-[21/9] relative overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Header */}
          <header>
            <h2 id="modal-title" className="text-3xl font-bold text-[var(--color-foreground)] mb-3">
              {project.title}
            </h2>
            <p className="text-lg text-[var(--color-muted)]">
              {project.summary}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-4">
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
          </header>

          {/* Tech Stack */}
          <section>
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
              Technologies utilisées
            </h3>
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
          </section>

          {/* Context */}
          <section>
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
              Contexte du projet
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              {project.context}
            </p>
          </section>

          {/* Role */}
          <section>
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
              Mon rôle & livrables
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              {project.role}
            </p>
          </section>

          {/* Results */}
          <section>
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
              Résultats mesurables
            </h3>
            <ul className="space-y-2">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[var(--color-muted)]">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lighthouse Metrics */}
          {project.metrics && (
            <section>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                Scores Lighthouse
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    {project.metrics.performance}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">Performance</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    {project.metrics.accessibility}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">Accessibilité</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    {project.metrics.seo}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">SEO</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    {project.metrics.bestPractices}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">Best Practices</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CTAButton from "@/components/CTAButton";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { getAllProjects, getCategories } from "@/data/projectsData";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  const projects = getAllProjects();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title='Portfolio : <span className="k">Mes réalisations</span>'
        subtitle="Découvrez une sélection de projets web que j'ai conçus et développés. Chaque projet est unique et répond à des besoins spécifiques avec une approche sur mesure."
        backgroundImage="/images/portfolio-hero.jpg"
        badge="5 Projets Présentés"
        height="65vh"
      >
        <CTAButton href="/devis">Démarrer votre projet</CTAButton>
        <CTAButton href="/contact" variant="secondary" showIcon={false}>
          Discutons de votre idée
        </CTAButton>
      </HeroSection>

      <div className="container-page">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="heading-secondary mb-4">
            Une sélection de projets variés
          </h2>
          <p className="body-large">
            Du site vitrine au e-commerce en passant par les applications web,
            découvrez comment je transforme des idées en solutions digitales
            performantes et esthétiques.
          </p>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-white shadow-matrix-lg"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-matrix"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              category={project.category}
              coverImage={project.coverImage}
              shortDescription={project.shortDescription}
              index={index}
            />
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="card mx-auto max-w-2xl">
            <h2 className="heading-secondary mb-4">
              Prêt à lancer votre projet ?
            </h2>
            <p className="body-large mb-6">
              Discutons de vos besoins et créons ensemble une solution digitale
              qui vous ressemble.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/devis">Demander un devis gratuit</CTAButton>
              <CTAButton href="/contact" variant="secondary" showIcon={false}>
                Me contacter
              </CTAButton>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
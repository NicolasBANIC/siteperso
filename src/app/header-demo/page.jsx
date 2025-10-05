"use client";

import { motion } from "framer-motion";

export default function HeaderDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite to-matrix/20">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="mb-6 text-hero font-bold text-white">
            Header Glassmorphism Demo
          </h1>
          <p className="mb-8 text-body-lg text-white/80">
            Scrollez vers le bas pour voir l'effet glassmorphism s'activer sur le header.
          </p>
          <div className="flex flex-col gap-4 text-left text-white/70">
            <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <strong className="text-matrix">✨ Au sommet (scrollY === 0):</strong>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>Fond anthracite opaque</li>
                <li>Pas de blur ni de bordure</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <strong className="text-matrix">🎨 En scrollant (scrollY &gt; 0):</strong>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>Fond anthracite semi-transparent (70%)</li>
                <li>Backdrop blur (flou d'arrière-plan)</li>
                <li>Bordure subtile blanche (10%)</li>
                <li>Ombre douce</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2 - Contenu pour tester le scroll */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-transparent to-matrix/10 px-6">
        <div className="max-w-4xl text-center">
          <h2 className="mb-6 text-heading-xl font-bold text-white">
            Section 2 - Continuez à scroller
          </h2>
          <p className="text-body text-white/70">
            Le header reste fixe en haut avec l'effet glassmorphism actif.
          </p>
        </div>
      </section>

      {/* Section 3 - Plus de contenu */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-matrix/10 to-matrix/20 px-6">
        <div className="max-w-4xl text-center">
          <h2 className="mb-6 text-heading-xl font-bold text-white">
            Section 3 - Effet Glassmorphism
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-md">
              <h3 className="mb-3 text-heading-md font-semibold text-matrix">
                Performances
              </h3>
              <ul className="space-y-2 text-left text-white/70">
                <li>✅ Passive event listener</li>
                <li>✅ GPU acceleration</li>
                <li>✅ Transition courte (200ms)</li>
                <li>✅ Backdrop blur optimisé</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-md">
              <h3 className="mb-3 text-heading-md font-semibold text-matrix">
                Accessibilité
              </h3>
              <ul className="space-y-2 text-left text-white/70">
                <li>✅ Prefers reduced motion</li>
                <li>✅ Safe area (mobile)</li>
                <li>✅ Contraste AA+</li>
                <li>✅ Focus visible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Test de contraste */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="max-w-4xl text-center">
          <h2 className="mb-6 text-heading-xl font-bold text-anthracite">
            Section 4 - Fond Clair
          </h2>
          <p className="text-body text-anthracite/70">
            Le header glassmorphism fonctionne aussi sur fond clair.
            <br />
            Le contraste reste optimal pour la lisibilité.
          </p>
        </div>
      </section>

      {/* Section 5 - Retour en haut */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-anthracite px-6">
        <div className="max-w-4xl text-center">
          <h2 className="mb-6 text-heading-xl font-bold text-white">
            Section 5 - Fin de la démo
          </h2>
          <p className="mb-8 text-body text-white/70">
            Remontez en haut pour voir l'effet glassmorphism se désactiver.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-matrix2 to-matrix px-8 py-4 font-medium text-white shadow-elev-sm transition-all duration-fast hover:-translate-y-1 hover:shadow-elev-md hover:shadow-ring-matrix"
          >
            ↑ Retour en haut
          </button>
        </div>
      </section>
    </div>
  );
}
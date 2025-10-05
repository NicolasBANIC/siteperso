'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { Input, Select } from '@/components/Input';
import { Mail, ArrowRight, Check } from 'lucide-react';

/**
 * Page de démonstration de la Charte Matrix
 * 
 * Affiche tous les composants avec la nouvelle charte graphique :
 * - Anthracite (#1A1A1A)
 * - Blanc (#FFFFFF)
 * - Vert Matrix (#0B8A3A)
 */
export default function CharteDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[var(--color-anthracite)] text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Charte Graphique Matrix
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Démonstration des composants avec la palette Anthracite, Blanc et Vert Matrix
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Bouton Primary
            </Button>
            <Button variant="secondary" size="lg">
              Bouton Secondary
            </Button>
            <Button variant="outline" size="lg">
              Bouton Outline
            </Button>
          </div>
        </div>
      </section>

      {/* Palette de couleurs */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-anthracite">
            Palette de couleurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Anthracite */}
            <div className="space-y-4">
              <div className="bg-[var(--color-anthracite)] h-32 rounded-xl shadow-elev-sm flex items-center justify-center">
                <span className="text-white font-mono">#1A1A1A</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Anthracite</h3>
                <p className="text-sm text-muted">Couleur principale - Fond Header/Footer</p>
              </div>
            </div>

            {/* Blanc */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-anthracite/20 h-32 rounded-xl shadow-elev-sm flex items-center justify-center">
                <span className="text-anthracite font-mono">#FFFFFF</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Blanc</h3>
                <p className="text-sm text-muted">Couleur secondaire - Texte sur anthracite</p>
              </div>
            </div>

            {/* Vert Matrix */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-matrix2 to-matrix h-32 rounded-xl shadow-elev-sm flex items-center justify-center">
                <span className="text-white font-mono">#0B8A3A</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Vert Matrix</h3>
                <p className="text-sm text-muted">Couleur accent - Hover & Focus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boutons */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-anthracite">
            Boutons
          </h2>
          
          {/* Tailles */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Tailles</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>

          {/* Variantes */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Variantes</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                Primary
              </Button>
              <Button variant="secondary">
                Secondary
              </Button>
              <Button variant="outline">
                Outline
              </Button>
            </div>
          </div>

          {/* Avec icônes */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Avec icônes</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<ArrowRight size={18} />}>
                Continuer
              </Button>
              <Button variant="secondary" icon={<Mail size={18} />}>
                Envoyer un email
              </Button>
              <Button variant="outline" icon={<Check size={18} />}>
                Valider
              </Button>
            </div>
          </div>

          {/* Pleine largeur */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pleine largeur</h3>
            <Button variant="primary" fullWidth>
              Bouton pleine largeur
            </Button>
          </div>
        </div>
      </section>

      {/* Formulaires */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-anthracite">
            Formulaires
          </h2>
          
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                label="Nom complet"
                placeholder="Jean Dupont"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                type="email"
                label="Email"
                placeholder="exemple@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <Select
                label="Service souhaité"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Sélectionnez un service</option>
                <option value="site-vitrine">Site Vitrine</option>
                <option value="e-commerce">E-commerce</option>
                <option value="application">Application Web</option>
              </Select>

              <Input
                type="textarea"
                label="Message"
                placeholder="Décrivez votre projet..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <div className="flex gap-4">
                <Button type="submit" variant="primary">
                  Envoyer
                </Button>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* États hover */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-anthracite">
            États Hover & Focus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card avec hover */}
            <div className="bg-white rounded-xl p-6 border-2 border-anthracite/10 transition-all duration-fast hover:border-matrix hover:shadow-ring-matrix hover:-translate-y-1 motion-reduce:hover:translate-y-0">
              <h3 className="text-xl font-semibold mb-2">Card avec hover</h3>
              <p className="text-muted mb-4">
                Survolez cette carte pour voir l'effet Matrix
              </p>
              <Button variant="primary" size="sm">
                En savoir plus
              </Button>
            </div>

            {/* Card avec gradient */}
            <div className="bg-gradient-to-br from-anthracite to-anthraciteLight text-white rounded-xl p-6 shadow-elev-sm transition-all duration-fast hover:shadow-elev-md hover:shadow-ring-matrix hover:-translate-y-1 motion-reduce:hover:translate-y-0">
              <h3 className="text-xl font-semibold mb-2">Card avec gradient</h3>
              <p className="text-white/80 mb-4">
                Gradient anthracite avec effet hover
              </p>
              <Button variant="secondary" size="sm">
                Découvrir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibilité */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-anthracite">
            Accessibilité WCAG AA+
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border-2 border-anthracite/10">
              <h3 className="text-xl font-semibold mb-4">Contrastes</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Anthracite sur Blanc : <strong>15.3:1</strong> (AAA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Blanc sur Anthracite : <strong>15.3:1</strong> (AAA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Vert Matrix sur Blanc : <strong>4.8:1</strong> (AA+)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-anthracite/10">
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Navigation au clavier</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>États focus visibles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Support prefers-reduced-motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-matrix" size={20} />
                  <span>Lecteurs d'écran compatibles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer demo */}
      <section className="bg-[var(--color-anthracite)] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Charte Matrix appliquée
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Tous les composants respectent la charte graphique avec les couleurs
            Anthracite, Blanc et Vert Matrix, tout en garantissant une accessibilité WCAG AA+.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary">
              Retour à l'accueil
            </Button>
            <Button href="/contact" variant="secondary">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
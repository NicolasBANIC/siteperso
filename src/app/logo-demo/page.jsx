"use client";

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="section-full bg-gradient-to-br from-[var(--color-primary-800)] via-[var(--color-primary-900)] to-[var(--neutral-900)]">
        <div className="container-page text-center">
          <h1 className="text-hero text-white mb-8">
            Logo BANDEV Matrix
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Découvrez le nouveau logo avec son esthétique "Matrix" et ses lignes de code animées
          </p>
          
          {/* Logo sur fond sombre */}
          <div className="bg-[var(--neutral-800)] rounded-3xl p-16 mb-8 border border-[var(--color-secondary-300)]/20">
            <p className="text-sm text-white/60 mb-6 uppercase tracking-wider">Sur fond sombre</p>
            <img 
              src="/brand/logo.svg" 
              alt="BANDEV Logo Matrix" 
              className="h-20 w-auto mx-auto"
            />
          </div>
          
          {/* Logo sur fond clair */}
          <div className="bg-white rounded-3xl p-16 border border-[var(--color-secondary-300)]/20">
            <p className="text-sm text-gray-600 mb-6 uppercase tracking-wider">Sur fond clair</p>
            <img 
              src="/brand/logo.svg" 
              alt="BANDEV Logo Matrix" 
              className="h-20 w-auto mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="section">
        <div className="container-page">
          <h2 className="section-title mb-16">Caractéristiques du Logo Matrix</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Couleurs */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-800)] to-[var(--color-primary-900)] mb-4"></div>
              <h3 className="text-xl font-semibold mb-3">Vert Émeraude Profond</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Lettres principales en vert émeraude (#007A5E → #003B32)
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-[var(--color-primary-800)] border border-[var(--color-border)]"></div>
                <div className="w-8 h-8 rounded bg-[var(--color-primary-900)] border border-[var(--color-border)]"></div>
                <div className="w-8 h-8 rounded bg-[var(--neutral-900)] border border-[var(--color-border)]"></div>
              </div>
            </div>

            {/* Lignes de code */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary-300)] to-[var(--color-secondary-200)] mb-4"></div>
              <h3 className="text-xl font-semibold mb-3">Turquoise Accent</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Lignes de code lumineuses (#00CFC1 → #00E5D6)
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-[var(--color-secondary-300)] border border-[var(--color-border)]"></div>
                <div className="w-8 h-8 rounded bg-[var(--color-secondary-200)] border border-[var(--color-border)]"></div>
                <div className="w-8 h-8 rounded bg-[var(--color-primary-300)] border border-[var(--color-border)]"></div>
              </div>
            </div>

            {/* Animations */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary-300)] to-[var(--color-primary-800)] mb-4 animate-pulse"></div>
              <h3 className="text-xl font-semibold mb-3">Animations Fluides</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Lignes de code animées horizontalement et verticalement
              </p>
              <div className="text-sm text-[var(--color-muted)]">
                Durées : 4s à 9s
              </div>
            </div>

            {/* Effet Matrix */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-800)] mb-4 flex items-center justify-center text-[var(--color-secondary-300)] font-mono text-xs">
                &lt;/&gt;
              </div>
              <h3 className="text-xl font-semibold mb-3">Effet "Pluie de Code"</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Lignes traversant chaque lettre comme dans Matrix
              </p>
              <div className="text-sm text-[var(--color-muted)]">
                Patterns horizontal + vertical
              </div>
            </div>

            {/* Lueur */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-900)] mb-4 shadow-lg shadow-[var(--color-secondary-300)]/50"></div>
              <h3 className="text-xl font-semibold mb-3">Effet de Lueur</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Halo subtil autour des lettres pour un effet premium
              </p>
              <div className="text-sm text-[var(--color-muted)]">
                Gaussian blur + opacity
              </div>
            </div>

            {/* Responsive */}
            <div className="card">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-800)] to-[var(--color-secondary-300)] mb-4"></div>
              <h3 className="text-xl font-semibold mb-3">100% Responsive</h3>
              <p className="text-[var(--color-muted)] mb-4">
                Adapté à tous les écrans : desktop, tablette, mobile
              </p>
              <div className="text-sm text-[var(--color-muted)]">
                h-10 mobile, h-12 desktop
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tailles */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container-page">
          <h2 className="section-title mb-16">Différentes Tailles</h2>
          
          <div className="space-y-12">
            {/* Très petit */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Très petit (h-6)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-6 w-auto mx-auto"
              />
            </div>

            {/* Petit */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Petit (h-8)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-8 w-auto mx-auto"
              />
            </div>

            {/* Moyen - Mobile */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Moyen - Mobile (h-10)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-10 w-auto mx-auto"
              />
            </div>

            {/* Grand - Desktop */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Grand - Desktop (h-12)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-12 w-auto mx-auto"
              />
            </div>

            {/* Très grand */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Très grand (h-16)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-16 w-auto mx-auto"
              />
            </div>

            {/* Extra large */}
            <div className="text-center">
              <p className="text-sm text-[var(--color-muted)] mb-4">Extra large (h-24)</p>
              <img 
                src="/brand/logo.svg" 
                alt="BANDEV Logo" 
                className="h-24 w-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Code technique */}
      <section className="section">
        <div className="container-page">
          <h2 className="section-title mb-16">Intégration Technique</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {/* HTML */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary-300)]">HTML / JSX</h3>
              <pre className="bg-[var(--neutral-900)] text-[var(--color-primary-300)] p-6 rounded-xl overflow-x-auto text-sm font-mono">
{`<img 
  src="/brand/logo.svg" 
  alt="BANDEV" 
  className="h-10 w-auto md:h-12"
/>`}
              </pre>
            </div>

            {/* CSS */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary-200)]">CSS Classes</h3>
              <pre className="bg-[var(--neutral-900)] text-[var(--color-primary-300)] p-6 rounded-xl overflow-x-auto text-sm font-mono">
{`.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.brand img {
  display: block;
  height: auto;
  width: auto;
  max-height: 100%;
}`}
              </pre>
            </div>

            {/* Couleurs */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-secondary-300)]">Palette de Couleurs</h3>
              <pre className="bg-[var(--neutral-900)] text-[var(--color-primary-300)] p-6 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Vert Émeraude Profond (Lettres) */
var(--color-primary-800)  /* Début */
var(--color-primary-900)  /* Milieu */
var(--neutral-900)  /* Fin */

/* Accent émeraude (Lignes) */
var(--color-primary-300)  /* Néon */
var(--color-primary-200)  /* Clair */`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-[var(--color-primary-800)] via-[var(--color-primary-900)] to-[var(--neutral-900)]">
        <div className="container-page text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Logo Matrix Prêt à l'Emploi
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Le logo BANDEV avec son esthétique Matrix est maintenant intégré dans le header et prêt pour la production.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/" className="btn-primary bg-[var(--color-secondary-300)] text-[var(--neutral-900)] hover:bg-[var(--color-secondary-200)]">
              Retour à l'accueil
            </a>
            <a href="/contact" className="btn-secondary border-[var(--color-secondary-300)] text-white hover:bg-[var(--color-secondary-300)]/10">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

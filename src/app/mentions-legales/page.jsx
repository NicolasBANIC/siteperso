import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Mentions légales — Nicolas Banic",
  description: "Mentions légales du site nicolasbanic.dev",
};

export default function MentionsLegalesPage() {
  return (
    <div className="container-page">
      <ScrollReveal direction="up">
        <header className="mb-12">
          <h1 className="section-title">Mentions légales</h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </header>
      </ScrollReveal>

      <div className="prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Éditeur du site</h2>
            <div className="mt-4 space-y-2 text-[var(--color-muted)]">
              <p>
                <strong className="text-[var(--color-foreground)]">Nom :</strong> Nicolas Banic
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Statut :</strong> Auto-entrepreneur / Micro-entreprise
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">SIRET :</strong> [Votre numéro SIRET]
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Adresse :</strong> [Votre adresse]
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Email :</strong>{" "}
                <a href="mailto:contact@nicolasbanic.dev" className="text-[var(--color-accent)] hover:underline">
                  contact@nicolasbanic.dev
                </a>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Hébergement</h2>
            <div className="mt-4 space-y-2 text-[var(--color-muted)]">
              <p>
                <strong className="text-[var(--color-foreground)]">Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Site web :</strong>{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
                  vercel.com
                </a>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Propriété intellectuelle</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété exclusive de Nicolas Banic,
              sauf mention contraire. Toute reproduction, distribution, modification ou utilisation sans autorisation préalable
              est strictement interdite.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={250}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Données personnelles</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Les informations collectées via les formulaires de contact et de devis sont destinées uniquement à Nicolas Banic
              pour répondre à vos demandes. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
              suppression de vos données. Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact@nicolasbanic.dev" className="text-[var(--color-accent)] hover:underline">
                contact@nicolasbanic.dev
              </a>
              .
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Cookies</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (préférence de thème). Aucun cookie
              de tracking ou publicitaire n'est utilisé.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={350}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Limitation de responsabilité</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Nicolas Banic s'efforce de maintenir les informations de ce site à jour et exactes. Toutefois, il ne peut être
              tenu responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation de ces informations.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Droit applicable</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
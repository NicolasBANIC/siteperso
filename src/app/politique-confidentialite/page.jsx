import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Politique de confidentialité — Nicolas Banic",
  description: "Politique de confidentialité et protection des données personnelles",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container-page">
      <ScrollReveal direction="up">
        <header className="mb-12">
          <h1 className="section-title">Politique de confidentialité</h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </header>
      </ScrollReveal>

      <div className="prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <ScrollReveal direction="up" delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Introduction</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Nicolas Banic accorde une grande importance à la protection de vos données personnelles. Cette politique de
              confidentialité explique quelles données nous collectons, pourquoi nous les collectons et comment nous les
              utilisons, conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Données collectées</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Nous collectons uniquement les données que vous nous fournissez volontairement via nos formulaires :
            </p>
            <ul className="mt-4 space-y-2 text-[var(--color-muted)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Formulaire de contact :</strong> nom, prénom, email,
                  téléphone (optionnel), message
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Formulaire de devis :</strong> nom, prénom, email,
                  téléphone, entreprise, type de projet, budget, description
                </span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Utilisation des données</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Vos données personnelles sont utilisées uniquement pour :
            </p>
            <ul className="mt-4 space-y-2 text-[var(--color-muted)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Répondre à vos demandes de contact ou de devis
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Vous fournir les services demandés
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Améliorer nos services
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={250}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Conservation des données</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Vos données personnelles sont conservées uniquement le temps nécessaire pour répondre à votre demande et assurer
              le suivi de notre relation commerciale. Elles sont ensuite supprimées ou anonymisées.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Vos droits</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="mt-4 space-y-2 text-[var(--color-muted)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Droit d'accès :</strong> vous pouvez demander une copie
                  de vos données personnelles
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Droit de rectification :</strong> vous pouvez demander
                  la correction de données inexactes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Droit à l'effacement :</strong> vous pouvez demander la
                  suppression de vos données
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <strong className="text-[var(--color-foreground)]">Droit d'opposition :</strong> vous pouvez vous opposer
                  au traitement de vos données
                </span>
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact@nicolasbanic.dev" className="text-[var(--color-accent)] hover:underline">
                contact@nicolasbanic.dev
              </a>
              .
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={350}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Cookies</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Ce site utilise uniquement des cookies techniques essentiels au fonctionnement du site (préférence de thème
              clair/sombre). Ces cookies ne collectent aucune donnée personnelle et ne nécessitent pas votre consentement.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Nous n'utilisons aucun cookie de tracking, de publicité ou d'analyse de tiers.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Sécurité</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
              données contre tout accès non autorisé, perte, destruction ou altération.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={450}>
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Modifications</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Cette politique de confidentialité peut être mise à jour occasionnellement. Nous vous encourageons à la consulter
              régulièrement. La date de dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
export const metadata = {
  title: "Mentions Légales | BANDEV - Nicolas Banic",
  description: "Mentions légales du site BANDEV, développeur web freelance.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl">
          Mentions Légales
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-[var(--color-muted)]">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>nicolasbanic.dev</strong> (ci-après "le Site") est édité par :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nom :</strong> Nicolas BANIC</li>
              <li><strong>Statut :</strong> Auto-entrepreneur</li>
              <li><strong>SIRET :</strong> 841 375 652 00028</li>
              <li><strong>Adresse :</strong> France</li>
              <li><strong>Email :</strong> <a href="mailto:contact@bandev.fr" className="text-[var(--color-accent)] hover:underline">contact@bandev.fr</a></li>
            </ul>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              2. Directeur de publication
            </h2>
            <p>
              Le directeur de la publication du Site est <strong>Nicolas BANIC</strong>.
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              3. Hébergement
            </h2>
            <p>Le Site est hébergé par :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hébergeur :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
              <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">vercel.com</a></li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              4. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu du Site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de Nicolas BANIC, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord écrit de Nicolas BANIC.
            </p>
            <p>
              Les marques, logos et signes distinctifs reproduits sur le Site sont la propriété de leurs titulaires respectifs.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              5. Données personnelles
            </h2>
            <p>
              Les informations collectées via le formulaire de contact sont destinées uniquement à Nicolas BANIC pour répondre à vos demandes.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés", vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@bandev.fr" className="text-[var(--color-accent)] hover:underline">contact@bandev.fr</a>
            </p>
            <p>
              Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-[var(--color-accent)] hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              6. Cookies
            </h2>
            <p>
              Le Site utilise des cookies techniques nécessaires à son bon fonctionnement (préférences de thème, etc.).
            </p>
            <p>
              Aucun cookie de tracking ou publicitaire n'est utilisé sans votre consentement explicite.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du Site.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              7. Limitation de responsabilité
            </h2>
            <p>
              Nicolas BANIC s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
            </p>
            <p>
              En conséquence, Nicolas BANIC décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le Site.
            </p>
            <p>
              Nicolas BANIC ne pourra être tenu responsable des dommages directs ou indirects résultant de l'accès au Site ou de l'utilisation de celui-ci.
            </p>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              8. Liens hypertextes
            </h2>
            <p>
              Le Site peut contenir des liens hypertextes vers d'autres sites. Nicolas BANIC n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
            <p>
              La création de liens hypertextes vers le Site est autorisée sous réserve d'en informer préalablement Nicolas BANIC et de ne pas porter atteinte à l'image du Site.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              9. Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
            </p>
            <p>
              En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français compétents.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              10. Contact
            </h2>
            <p>
              Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Par email :</strong> <a href="mailto:contact@bandev.fr" className="text-[var(--color-accent)] hover:underline">contact@bandev.fr</a></li>
              <li><strong>Via le formulaire de contact :</strong> <a href="/contact" className="text-[var(--color-accent)] hover:underline">Page Contact</a></li>
            </ul>
          </section>

          {/* Date de mise à jour */}
          <section className="border-t border-[var(--color-border)] pt-6">
            <p className="text-sm text-[var(--color-muted)]">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
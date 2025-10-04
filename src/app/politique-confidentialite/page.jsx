import { Metadata } from "next";

export const metadata = {
  title: "Politique de Confidentialité | BANDEV - Nicolas Banic",
  description: "Politique de confidentialité et protection des données personnelles du site BANDEV.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-[var(--color-muted)]">
          {/* Introduction */}
          <section>
            <p>
              La protection de vos données personnelles est une priorité pour <strong>BANDEV - Nicolas BANIC</strong>.
            </p>
            <p>
              Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, stockons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés".
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              1. Responsable du traitement des données
            </h2>
            <p>Le responsable du traitement des données personnelles est :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nom :</strong> Nicolas BANIC</li>
              <li><strong>SIRET :</strong> 841 375 652 00028</li>
              <li><strong>Email :</strong> <a href="mailto:contact@bandev.fr" className="text-[var(--color-accent)] hover:underline">contact@bandev.fr</a></li>
            </ul>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              2. Données personnelles collectées
            </h2>
            <p>Nous collectons les données personnelles suivantes :</p>

            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mt-6">
              2.1. Via le formulaire de contact
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nom complet</strong></li>
              <li><strong>Adresse email</strong></li>
              <li><strong>Sujet du message</strong></li>
              <li><strong>Contenu du message</strong></li>
              <li><strong>Budget estimé</strong> (optionnel)</li>
              <li><strong>Adresse IP</strong> (pour la sécurité et la prévention du spam)</li>
              <li><strong>Date et heure de soumission</strong></li>
            </ul>

            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mt-6">
              2.2. Données de navigation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies techniques</strong> (préférences de thème clair/sombre)</li>
              <li><strong>Données de navigation anonymes</strong> (si analytics activé)</li>
            </ul>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              3. Finalités du traitement
            </h2>
            <p>Vos données personnelles sont collectées pour les finalités suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Répondre à vos demandes de contact</strong> et vous fournir les informations demandées</li>
              <li><strong>Établir des devis</strong> et propositions commerciales</li>
              <li><strong>Améliorer nos services</strong> et l'expérience utilisateur</li>
              <li><strong>Prévenir le spam et les abus</strong> (via rate limiting et honeypot)</li>
              <li><strong>Respecter nos obligations légales</strong></li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              4. Base légale du traitement
            </h2>
            <p>Le traitement de vos données personnelles repose sur :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Votre consentement</strong> (formulaire de contact, newsletter)</li>
              <li><strong>L'exécution d'un contrat</strong> ou de mesures précontractuelles (devis, prestations)</li>
              <li><strong>Notre intérêt légitime</strong> (amélioration des services, sécurité du site)</li>
              <li><strong>Le respect d'obligations légales</strong> (comptabilité, fiscalité)</li>
            </ul>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              5. Destinataires des données
            </h2>
            <p>Vos données personnelles sont destinées à :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nicolas BANIC</strong> (responsable du traitement)</li>
              <li><strong>Prestataires techniques</strong> (hébergement : Vercel, email : selon configuration SMTP)</li>
            </ul>
            <p>
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
            </p>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              6. Durée de conservation
            </h2>
            <p>Vos données personnelles sont conservées pendant les durées suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Formulaire de contact :</strong> 3 ans à compter du dernier contact</li>
              <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
              <li><strong>Cookies techniques :</strong> 13 mois maximum</li>
            </ul>
            <p>
              À l'issue de ces durées, vos données sont supprimées ou anonymisées.
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              7. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La perte, la destruction ou l'altération accidentelle</li>
              <li>L'accès non autorisé</li>
              <li>La divulgation ou la modification non autorisée</li>
            </ul>
            <p>Mesures de sécurité mises en place :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Chiffrement HTTPS</strong> (SSL/TLS) pour toutes les communications</li>
              <li><strong>Rate limiting</strong> (limitation du nombre de requêtes par IP)</li>
              <li><strong>Honeypot anti-spam</strong> sur le formulaire de contact</li>
              <li><strong>Validation stricte</strong> des données côté client et serveur</li>
              <li><strong>Hébergement sécurisé</strong> chez Vercel (certifié SOC 2)</li>
            </ul>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              8. Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer votre consentement :</strong> À tout moment, sans affecter la licéité du traitement antérieur</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@bandev.fr" className="text-[var(--color-accent)] hover:underline">contact@bandev.fr</a>
            </p>
            <p>
              Nous nous engageons à répondre à votre demande dans un délai d'un mois.
            </p>
            <p>
              Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">www.cnil.fr</a>).
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              9. Cookies et technologies similaires
            </h2>
            <p>
              Le site utilise des cookies techniques strictement nécessaires à son fonctionnement :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookie de préférence de thème :</strong> Mémorise votre choix entre mode clair et sombre</li>
            </ul>
            <p>
              Ces cookies ne nécessitent pas de consentement préalable car ils sont essentiels au fonctionnement du site.
            </p>
            <p>
              Aucun cookie de tracking, publicitaire ou analytique n'est utilisé sans votre consentement explicite.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </section>

          {/* Transferts internationaux */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              10. Transferts de données hors UE
            </h2>
            <p>
              Nos prestataires techniques (Vercel) peuvent être situés en dehors de l'Union Européenne.
            </p>
            <p>
              Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place (clauses contractuelles types de la Commission Européenne, certifications Privacy Shield, etc.).
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              11. Modifications de la politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
            </p>
            <p>
              Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
            </p>
            <p>
              Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques en matière de protection des données.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
              12. Contact
            </h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, vous pouvez nous contacter :
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
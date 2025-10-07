import Image from 'next/image';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const metadata = {
  title: 'Page non trouvée — Nicolas Banic',
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="container-page min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Illustration 404 */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <Image
              src="/images/404-illustration.svg"
              alt="Illustration d'erreur 404 - page non trouvée"
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, 400px"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Texte */}
        <div className="space-y-4">
          <h1 className="text-hero font-bold text-[var(--color-accent)] tracking-tighter">404</h1>
          <h2 className="text-heading-xl font-bold text-[var(--color-foreground)]">
            Page non trouvée
          </h2>
          <p className="text-body-lg text-[var(--color-muted)] max-w-md mx-auto leading-relaxed">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée. Pas de panique, vous
            pouvez retourner à l'accueil ou explorer le site.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className="btn-primary">
            <Home className="h-5 w-5" aria-hidden="true" />
            Retour à l'accueil
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            <Search className="h-5 w-5" aria-hidden="true" />
            Voir le portfolio
          </Link>
        </div>

        {/* Liens rapides */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <p className="text-body-sm text-[var(--color-muted)] mb-4 font-medium">Liens rapides :</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="text-ui text-[var(--color-accent)] hover:underline font-medium"
            >
              Services
            </Link>
            <span className="text-[var(--color-border)]" aria-hidden="true">
              •
            </span>
            <Link
              href="/apropos"
              className="text-ui text-[var(--color-accent)] hover:underline font-medium"
            >
              À propos
            </Link>
            <span className="text-[var(--color-border)]" aria-hidden="true">
              •
            </span>
            <Link
              href="/contact"
              className="text-ui text-[var(--color-accent)] hover:underline font-medium"
            >
              Contact
            </Link>
            <span className="text-[var(--color-border)]" aria-hidden="true">
              •
            </span>
            <Link
              href="/devis"
              className="text-ui text-[var(--color-accent)] hover:underline font-medium"
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

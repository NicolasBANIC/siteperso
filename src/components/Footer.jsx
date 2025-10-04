import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/apropos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/nicolasbanic",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/NicolasBANIC",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "mailto:bcnicolaspro@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 text-sm text-[var(--color-muted)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-14 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-5 lg:max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src="/brand/logo.svg"
              alt="BANDEV"
              width="120"
              height="40"
              className="h-10 w-auto"
            />
          </div>
          <p className="leading-relaxed">
            Développeur web freelance spécialisé dans la création de sites web modernes, ultra-performants et sur mesure. Transformez vos idées en expériences digitales exceptionnelles.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            SIRET : 841 375 652 00028
          </p>
          <Link href="/devis" className="btn-primary inline-flex">
            Demander un devis
          </Link>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Navigation</h2>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-[var(--color-accent)]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Légal</h2>
              <ul className="mt-4 space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="transition-colors hover:text-[var(--color-accent)]" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Réseaux sociaux</h2>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] bg-transparent">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} BANDEV - Nicolas Banic. Tous droits réservés.</p>
          <p>
            Développé avec <span className="text-[var(--color-accent)]">Next.js 15</span> & <span className="text-[var(--color-accent)]">React 19</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
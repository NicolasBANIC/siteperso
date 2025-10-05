import Link from "next/link";
import { Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/processus", label: "Processus" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
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
    href: "mailto:contact@bandev.fr",
    label: "Email",
    icon: Mail,
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@bandev.fr",
    href: "mailto:contact@bandev.fr",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "France",
    href: null,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/95 text-sm text-muted backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-gutter py-14">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.svg"
                alt="BANDEV"
                width="120"
                height="40"
                className="h-10 w-auto"
              />
            </div>
            <p className="leading-relaxed text-foreground/80">
              Développeur web freelance spécialisé dans la création de sites web modernes, ultra-performants et sur mesure.
            </p>
            <p className="text-xs text-muted">
              SIRET : 841 375 652 00028
            </p>
            <Link 
              href="/devis" 
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-accent to-accentSecondary px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Demander un devis
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-foreground/70 transition-colors hover:text-accent"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Social Links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-muted">{item.label}</p>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </div>
                  </div>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block transition-colors hover:text-accent"
                      >
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                Réseaux sociaux
              </h3>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-accent hover:bg-accent hover:text-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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

        {/* Legal Links */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-foreground/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-border">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-transparent">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-gutter py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} BANDEV - Nicolas Banic. Tous droits réservés.</p>
          <p>
            Développé avec <span className="text-accent">Next.js 15</span> &{" "}
            <span className="text-accent">React 19</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
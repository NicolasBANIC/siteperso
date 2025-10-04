"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/processus", label: "Processus" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/apropos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      role="banner"
      className={`sticky top-0 inset-inline-start-0 z-50 w-full border-b border-transparent backdrop-blur transition-all motion-reduce:transition-none ${
        isScrolled
          ? "border-[var(--color-border)] bg-[var(--color-surface)]/95 shadow-sm"
          : "bg-[var(--color-surface)]/80"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/"
          className="brand inline-flex items-center transition-opacity duration-200 hover:opacity-80"
          aria-label="Accueil BANDEV"
        >
          <img
            src="/brand/logo.svg"
            alt="BANDEV"
            width="260"
            height="80"
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-ui font-medium lg:flex" aria-label="Navigation principale">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center px-1 py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--color-accent)] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/devis" className="btn-primary">
            Demander un devis
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--color-surface)]/60 p-2 text-[var(--color-muted)] transition hover:border-[var(--color-border)] hover:text-[var(--color-accent)] lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Ouvrir ou fermer le menu"
          aria-controls="menu-mobile"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`lg:hidden ${isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 ease-out motion-reduce:transition-none`}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6" aria-label="Navigation mobile">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-ui font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/devis" className="btn-primary justify-center mt-2">
            Demander un devis
          </Link>
        </nav>
      </div>
    </header>
  );
}
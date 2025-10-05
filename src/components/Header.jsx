"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      role="banner"
      className={`sticky top-0 inset-inline-start-0 z-50 w-full border-b border-transparent backdrop-blur transition-all motion-reduce:transition-none ${
        isScrolled
          ? "border-[var(--color-border)] bg-[var(--color-surface)]/95 shadow-sm"
          : "bg-[var(--color-surface)]/80"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Logo BAN.DEV Matrix - Positionné à gauche, aligné verticalement */}
        <Link
          href="/"
          className="brand flex items-center transition-opacity duration-200 hover:opacity-90"
          aria-label="Accueil BAN.DEV"
          style={{ marginRight: 'auto' }}
        >
          <img
            src="/brand/logo.svg"
            alt="BAN.DEV"
            width="312"
            height="60"
            className="h-10 w-auto md:h-[48px]"
            style={{ display: 'block' }}
          />
        </Link>

        {/* Navigation Desktop - Parfaitement centrée verticalement avec gap explicite */}
        <nav className="hidden items-center gap-6 text-ui font-medium lg:flex" aria-label="Navigation principale" style={{ marginLeft: '2rem' }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center justify-center px-1 py-1 transition-colors duration-200 ${
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

        {/* CTA Button - Parfaitement centré verticalement */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/devis" className="btn-primary">
            Demander un devis
          </Link>
        </div>

        {/* Menu Mobile Button - Parfaitement centré verticalement */}
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--color-surface)]/60 p-2 text-[var(--color-muted)] transition hover:border-[var(--color-border)] hover:text-[var(--color-accent)] lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Ouvrir ou fermer le menu"
          aria-controls="menu-mobile"
          aria-expanded={isMenuOpen}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isMenuOpen ? 'close' : 'open'}
              initial={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Menu Mobile - Drawer plein écran avec Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 top-[73px] z-40 bg-[var(--color-background)] lg:hidden"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <nav className="mx-auto flex h-full w-full max-w-7xl flex-col gap-2 overflow-y-auto px-6 py-8" aria-label="Navigation mobile">
              {links.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-6 py-4 text-heading-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                          : "text-[var(--color-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
                className="mt-4"
              >
                <Link href="/devis" className="btn-primary w-full justify-center">
                  Demander un devis
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
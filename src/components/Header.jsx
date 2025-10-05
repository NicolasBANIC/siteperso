"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrolled } from "@/hooks/useScrolled";

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
  const scrolled = useScrolled(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: log state changes
  useEffect(() => {
    console.log('🍔 Menu state changed:', isMenuOpen, 'Scrolled:', scrolled);
  }, [isMenuOpen, scrolled]);

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

  // Menu mobile component
  const mobileMenu = mounted && isMenuOpen && (
    <AnimatePresence>
      <motion.div
        id="menu-mobile"
        className="fixed inset-0 top-[73px] z-[9999] bg-[var(--color-anthracite)] lg:hidden"
        style={{ zIndex: 9999 }}
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
                  className={`block rounded-lg px-6 py-4 text-heading-sm font-medium transition-all duration-fast ${
                    isActive
                      ? "bg-gradient-to-br from-[var(--color-matrix-2)] to-[var(--color-matrix)] text-white [box-shadow:var(--shadow-ring)]"
                      : "text-white/80 hover:text-white hover:bg-gradient-to-br hover:from-[var(--color-matrix-2)]/20 hover:to-[var(--color-matrix)]/20 hover:[box-shadow:var(--shadow-ring)]"
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
            <Link 
              href="/devis" 
              className="relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-br from-[var(--color-matrix-2)] to-[var(--color-matrix)] shadow-[var(--shadow-sm)] transition-all duration-fast hover:shadow-[var(--shadow-md)] hover:[box-shadow:var(--shadow-ring)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
            >
              Demander un devis
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        role="banner"
        className={`fixed top-0 inset-inline-start-0 z-50 w-full border-b transition-all duration-200 motion-reduce:transition-none pointer-events-auto ${
          scrolled
            ? "border-[var(--color-border)]/40 bg-[var(--color-anthracite)]/70 backdrop-blur-md shadow-[var(--shadow-sm)]"
            : "border-transparent bg-[var(--color-anthracite)]"
        }`}
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(26, 26, 26, 0.7)" : "rgba(26, 26, 26, 1)",
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: "easeOut",
        }}
        style={{
          paddingTop: "env(safe-area-inset-top, 0)",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Logo BAN.DEV Matrix - Positionné à gauche, aligné verticalement */}
        <Link
          href="/"
          className="brand flex items-center transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100"
          aria-label="Accueil BAN.DEV"
          style={{ marginRight: 'auto', filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))' }}
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

        {/* Navigation Desktop - Charte Matrix : texte blanc sur anthracite */}
        <nav className="hidden items-center gap-6 text-ui font-medium lg:flex" aria-label="Navigation principale" style={{ marginLeft: '2rem' }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-fast group ${
                  isActive
                    ? "text-white bg-gradient-to-br from-[var(--color-matrix-2)] to-[var(--color-matrix)] [box-shadow:var(--shadow-ring)] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[var(--color-matrix-2)] after:to-[var(--color-matrix)]"
                    : "text-white/80 hover:text-white hover:bg-gradient-to-br hover:from-[var(--color-matrix-2)]/20 hover:to-[var(--color-matrix)]/20 hover:[box-shadow:var(--shadow-ring)] hover:-translate-y-0.5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button - Charte Matrix */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link 
            href="/devis" 
            className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-br from-[var(--color-matrix-2)] to-[var(--color-matrix)] shadow-[var(--shadow-sm)] transition-all duration-fast hover:shadow-[var(--shadow-md)] hover:[box-shadow:var(--shadow-ring)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
          >
            Demander un devis
          </Link>
        </div>

        {/* Menu Mobile Button - Charte Matrix */}
        <motion.button
          type="button"
          className="relative z-[10000] inline-flex items-center justify-center rounded-full border border-transparent bg-white/10 p-2 text-white transition hover:bg-gradient-to-br hover:from-[var(--color-matrix-2)]/20 hover:to-[var(--color-matrix)]/20 hover:[box-shadow:var(--shadow-ring)] lg:hidden"
}
          style={{ zIndex: 10000 }}
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
      </motion.header>

      {/* Menu Mobile - Rendu via Portal pour échapper au contexte de stacking */}
      {mounted && typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}
    </>
  );
}
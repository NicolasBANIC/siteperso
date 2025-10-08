'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrolled } from '@/hooks/useScrolled';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/processus', label: 'Processus' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/contact', label: 'Contact' },
];

function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // État du menu suivi pour accessibilité

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

  // Menu mobile component - Premium glassmorphism design
  const mobileMenu = mounted && isMenuOpen && (
    <AnimatePresence>
      <motion.div
        id="menu-mobile"
        className="fixed inset-0 top-[68px] z-[9999] lg:hidden backdrop-blur-xl bg-black/40"
        data-testid="mobile-menu"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav
          className="mx-auto flex h-full w-full max-w-7xl flex-col gap-2 overflow-y-auto px-6 py-8"
          aria-label="Navigation mobile"
        >
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
                  className={`block rounded-full px-6 py-4 text-heading-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'pastille-active text-white border border-cyan-300/30 shadow-[0_0_24px_rgba(34,211,238,.35)]'
                      : 'text-white/80 hover:text-cyan-300 hover:bg-white/5 hover:border hover:border-cyan-300/20 hover:shadow-[0_0_12px_rgba(34,211,238,.2)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
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
            className="mt-6 px-2"
          >
            <button className="inline-flex items-center justify-center rounded-md px-5 py-2 w-full font-semibold
                               text-slate-900 shadow-sm transition-colors whitespace-nowrap
                               bg-gradient-to-r from-[var(--brand-emerald)]
                               to-[color-mix(in_oklab,var(--brand-emerald)_70%,white_30%)]
                               hover:opacity-95 focus-visible:outline-none
                               focus-visible:ring-2 focus-visible:ring-offset-2
                               focus-visible:ring-[var(--brand-emerald)]"
                               onClick={() => window.location.href = '/devis'}>
              <span className="relative z-10">Demander un devis</span>
            </button>
          </motion.div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        role="banner"
        className={`sticky top-0 inset-x-0 z-[60] transition-all duration-300 motion-reduce:transition-none ${
          scrolled
            ? 'header-glass'
            : 'bg-transparent'
        }`}
        style={{ 
          height: 'var(--header-h, 80px)'
        }}
        initial={false}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.22,
          ease: 'easeOut',
        }}
      >
        {/* Conteneur principal - Layout structuré */}
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-full flex items-center">
          {/* Layout mobile - justification entre les éléments */}
          <div className="flex items-center justify-between lg:hidden w-full">
            {/* Logo mobile */}
            <Link
              href="/"
              className="brand flex items-center z-10"
              aria-label="BANDEV"
            >
              <img 
                src="/brand/logo-bandev-unified.svg" 
                alt="BANDEV" 
                width={132} 
                height={32} 
                className="h-8"
                style={{ 
                  display: 'block',
                  width: '132px'
                }}
              />
            </Link>

            {/* Menu Mobile Button */}
            <motion.button
              type="button"
              className="relative z-[10000] inline-flex items-center justify-center rounded-lg glass p-3 text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] hover:border-brand-cyan/40"
              style={{ zIndex: 10000 }}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Ouvrir ou fermer le menu"
              aria-controls="menu-mobile"
              aria-expanded={isMenuOpen}
              data-testid="mobile-menu-button"
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
                  {isMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden strokeWidth={2.5} />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden strokeWidth={2.5} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Layout desktop - Structure 3 zones selon spécifications */}
          <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center w-full">
            {/* Gauche = LOGO (cliquable) */}
            <div className="justify-self-start" style={{ minWidth: '132px' }}>
              <Link
                href="/"
                className="brand flex items-center"
                aria-label="BANDEV"
              >
                <img 
                  src="/brand/logo-bandev-unified.svg" 
                  alt="BANDEV" 
                  width={132} 
                  height={32} 
                  className="h-8"
                  style={{ 
                    display: 'block',
                    width: '132px',
                    minWidth: '132px'
                  }}
                />
              </Link>
            </div>

            {/* Centre = NAV */}
            <nav
              className="justify-self-center"
              aria-label="Navigation principale"
            >
              <ul className="flex items-center gap-6">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative inline-flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 group font-inter font-medium focus-visible:ring-2 focus-visible:ring-[var(--brand-emerald)] focus-visible:ring-offset-2 ${
                          isActive
                            ? 'pastille-active text-cyan-300 bg-white/5 shadow-[0_0_24px_rgba(34,211,238,.35)]'
                            : 'text-white/90 hover:text-cyan-300 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(34,211,238,.2)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
                        }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Droite = CTA */}
            <div className="justify-self-end">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md px-5 py-2 font-semibold
                                 text-slate-900 shadow-sm transition-colors whitespace-nowrap
                                 bg-gradient-to-r from-[var(--brand-emerald)]
                                 to-[color-mix(in_oklab,var(--brand-emerald)_70%,white_30%)]
                                 hover:opacity-95 focus-visible:outline-none
                                 focus-visible:ring-2 focus-visible:ring-offset-2
                                 focus-visible:ring-[var(--brand-emerald)]">
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile - Rendu via Portal pour échapper au contexte de stacking */}
      {mounted && typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}
    </>
  );
}

export default memo(Header);

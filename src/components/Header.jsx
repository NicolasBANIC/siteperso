'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrolled } from '@/hooks/useScrolled';
import { LogoHeader } from './Logo';

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

  // Menu mobile component - Design glassmorphism cohérent avec les héros
  const mobileMenu = mounted && isMenuOpen && (
    <AnimatePresence>
      <motion.div
        id="menu-mobile"
        className="fixed inset-0 top-[68px] z-[9999] lg:hidden"
        style={{
          zIndex: 9999,
          background: 'rgba(11,15,23,0.95)',
          backdropFilter: 'blur(12px)',
        }}
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
                  className={`block rounded-lg px-6 py-4 text-heading-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--color-primary-700)]/20 to-[var(--color-secondary-500)]/20 text-white border border-[var(--color-primary-700)]/30 shadow-[0_0_12px_rgba(15,143,114,0.3)]'
                      : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-[var(--color-primary-700)]/10 hover:to-[var(--color-secondary-500)]/10 hover:border hover:border-[var(--color-primary-700)]/20 hover:shadow-[0_0_8px_rgba(15,143,114,0.2)] hover:-translate-y-0.5'
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
            <Link
              href="/devis"
              className="relative inline-flex items-center justify-center w-full px-6 py-3 rounded-[9999px] font-semibold text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,200,180,0.4)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
            >
              <span className="relative z-10">Demander un devis</span>
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
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 motion-reduce:transition-none pointer-events-auto ${
          scrolled
            ? 'border-b border-white/8 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.25)]'
            : 'border-b border-transparent backdrop-blur-sm'
        }`}
        initial={false}
        animate={{
          background: scrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
          height: scrolled ? 'var(--header-height-scrolled)' : 'var(--header-height)',
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: 'easeOut',
        }}
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6"
          style={{ height: scrolled ? '64px' : '68px' }}
        >
          {/* Logo BANDEV unifié - Cohérent avec l'identité héros */}
          <Link
            href="/"
            className="brand flex items-center z-10"
            aria-label="Accueil BANDEV - Développeur Web Freelance"
          >
            <LogoHeader style={{ maxHeight: '32px' }} />
          </Link>

          {/* Navigation Desktop - Cohérence héros : typographie Inter, transitions fluides */}
          <nav
            className="hidden items-center gap-8 text-ui font-medium lg:flex"
            aria-label="Navigation principale"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 group font-inter font-medium ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-[var(--color-primary-700)]/20 to-[var(--color-secondary-500)]/20 shadow-[0_0_12px_rgba(15,143,114,0.3)] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[var(--color-primary-700)] after:to-[var(--color-secondary-500)]'
                      : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-[var(--color-primary-700)]/10 hover:to-[var(--color-secondary-500)]/10 hover:shadow-[0_0_8px_rgba(15,143,114,0.2)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - CORRECTED: Proportionné à la hauteur du header */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/devis"
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-[9999px] font-medium text-sm text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,200,180,0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
              style={{ height: '36px' }} // Harmonisé avec la hauteur du header
            >
              <span className="relative z-10">Demander un devis</span>
            </Link>
          </div>

          {/* Menu Mobile Button - Design minimaliste cohérent */}
          <motion.button
            type="button"
            className="relative z-[10000] inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[var(--color-primary-700)]/20 hover:to-[var(--color-secondary-500)]/20 hover:shadow-[0_0_12px_rgba(15,143,114,0.3)] hover:border-[var(--color-primary-700)]/40 lg:hidden"
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
      </motion.header>

      {/* Menu Mobile - Rendu via Portal pour échapper au contexte de stacking */}
      {mounted && typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}
    </>
  );
}

export default memo(Header);

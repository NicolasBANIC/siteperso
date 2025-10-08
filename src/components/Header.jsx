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
            <Link
              href="/devis"
              className="relative inline-flex items-center justify-center w-full px-6 py-3 rounded-full font-semibold text-slate-900 bg-cta-gradient shadow-lg transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
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
            ? 'header-premium scrolled glass-strong shadow-lg border-b border-white/10'
            : 'header-premium bg-transparent backdrop-blur-sm border-b border-transparent'
        }`}
        initial={false}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: 'easeOut',
        }}
      >
        <div
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6"
          style={{ height: scrolled ? '64px' : '68px' }}
        >
          {/* Logo BANDEV - Premium gradient styling */}
          <Link
            href="/"
            className="brand flex items-center z-10"
            aria-label="Accueil BANDEV - Développeur Web Freelance"
          >
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-brand-cyan font-bold text-xl">
              <LogoHeader style={{ maxHeight: '32px' }} />
            </div>
          </Link>

          {/* Navigation Desktop - Premium pill design */}
          <nav
            className="hidden items-center gap-6 text-ui font-medium lg:flex"
            aria-label="Navigation principale"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 group font-inter font-medium ${
                    isActive
                      ? 'pastille-active text-cyan-300 bg-white/5 shadow-[0_0_24px_rgba(34,211,238,.35)]'
                      : 'text-white/90 hover:text-cyan-300 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(34,211,238,.2)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Premium pill design */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/devis"
              className="btn relative inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
            >
              <span className="relative z-10">Demander un devis</span>
            </Link>
          </div>

          {/* Menu Mobile Button - Premium glassmorphism design */}
          <motion.button
            type="button"
            className="relative z-[10000] inline-flex items-center justify-center rounded-lg glass p-3 text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] hover:border-brand-cyan/40 lg:hidden"
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

// =====================================================
// BANDEV - Tests E2E - Validation corrections Header & Héros
// Tests Playwright - Validation des corrections ciblées
// =====================================================

import { test, expect } from '@playwright/test';

test.describe('🧭 Header & Héros - Corrections BANDEV', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('📋 Header - Structure 3 zones', () => {
    test('Logo BANDEV visible à gauche', async ({ page, isMobile }) => {
      // Logo présent dans le header - adapté selon viewport
      const logo = isMobile 
        ? page.locator('header .flex.lg\\:hidden img[alt="BANDEV"]') 
        : page.locator('header .hidden.lg\\:grid img[alt="BANDEV"]');
      
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('src', '/brand/logo-bandev-unified.svg');
      await expect(logo).toHaveAttribute('width', '132');
      await expect(logo).toHaveAttribute('height', '32');

      // Logo cliquable vers accueil 
      const logoLink = isMobile
        ? page.locator('header .flex.lg\\:hidden a[aria-label="BANDEV"]')
        : page.locator('header .hidden.lg\\:grid a[aria-label="BANDEV"]');
      
      await expect(logoLink).toHaveAttribute('href', '/');
      
      // Position à gauche (justify-self-start sur desktop)
      if (!isMobile) {
        const logoContainer = logoLink.locator('..');
        await expect(logoContainer).toHaveClass(/justify-self-start/);
      }
    });

    test('Navigation centrée avec 7 liens', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Navigation desktop uniquement');
      
      // Navigation centrée
      const nav = page.locator('header nav[aria-label="Navigation principale"]');
      await expect(nav).toBeVisible();
      await expect(nav).toHaveClass(/justify-self-center/);

      // 7 liens de navigation attendus
      const navLinks = nav.locator('ul li a');
      await expect(navLinks).toHaveCount(7);

      // Vérification des liens exacts
      const expectedLinks = ['Accueil', 'Services', 'Processus', 'Portfolio', 'Tarifs', 'Témoignages', 'Contact'];
      for (let i = 0; i < expectedLinks.length; i++) {
        await expect(navLinks.nth(i)).toContainText(expectedLinks[i]);
      }
    });

    test('CTA "Demander un devis" à droite', async ({ page, isMobile }) => {
      test.skip(isMobile, 'CTA desktop uniquement');
      
      // CTA présent et aligné à droite
      const ctaContainer = page.locator('header .justify-self-end');
      await expect(ctaContainer).toBeVisible();
      
      const cta = ctaContainer.locator('a');
      await expect(cta).toContainText('Demander un devis');
      await expect(cta).toHaveAttribute('href', '#contact');
      
      // Style avec gradient émeraude
      await expect(cta).toHaveClass(/bg-gradient-to-r/);
      await expect(cta).toHaveClass(/from-\[var\(--brand-emerald\)\]/);
    });

    test('Layout grid 3 colonnes en desktop', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Layout desktop uniquement');
      
      // Structure grid 3 colonnes (desktop only)
      const headerContainer = page.locator('header .hidden.lg\\:grid.grid-cols-\\[1fr_auto_1fr\\]');
      await expect(headerContainer).toBeVisible();
      
      // 3 zones présentes
      const zones = headerContainer.locator('> div');
      await expect(zones).toHaveCount(3);
      
      // Chaque zone a la bonne classe de justification
      await expect(zones.nth(0)).toHaveClass(/justify-self-start/); // Logo
      await expect(zones.nth(1)).toHaveClass(/justify-self-center/); // Nav  
      await expect(zones.nth(2)).toHaveClass(/justify-self-end/); // CTA
    });
  });

  test.describe('✨ Header - Glassmorphisme au scroll', () => {
    test('Effet glass activé au scroll', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Test du scroll desktop');
      
      // État initial (pas d'effet glass)
      const header = page.locator('header');
      await expect(header).not.toHaveClass(/header-glass/);
      
      // Scroll vers le bas
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(300); // Attendre la transition
      
      // Vérification de l'activation du glassmorphisme
      await expect(header).toHaveClass(/header-glass/);
    });

    test('Header sticky persistent et smooth', async ({ page }) => {
      // Header sticky
      const header = page.locator('header');
      await expect(header).toHaveClass(/sticky/);
      await expect(header).toHaveClass(/top-0/);
      
      // Scroll pour tester la persistance
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);
      
      // Header toujours visible en haut
      await expect(header).toBeVisible();
      
      // Retour en haut smooth
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
    });
  });

  test.describe('🎯 Héros - Layout 12 colonnes amélioré', () => {
    test('Badge "Disponible" supprimé complètement', async ({ page }) => {
      // Vérification que le badge n'existe plus
      const badge = page.locator('text="Disponible pour de nouveaux projets"');
      await expect(badge).not.toBeVisible();
      
      // Pas d'espace résiduel
      const heroTitle = page.locator('h1.hero-title');
      await expect(heroTitle).toBeVisible();
      
      // Titre directement visible sans badge au-dessus
      const heroContent = heroTitle.locator('..');
      await expect(heroContent).not.toContainText('Disponible');
    });

    test('Layout 12 colonnes - Texte 7/12, Formulaire 5/12', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Layout desktop uniquement');
      
      // Section avec grid-cols-12
      const heroSection = page.locator('section.grid.grid-cols-12');
      await expect(heroSection).toBeVisible();
      
      // Colonne gauche (texte) : responsive col-span
      const textColumn = heroSection.locator('.col-span-12.lg\\:col-span-7');
      await expect(textColumn).toBeVisible();
      
      // Colonne droite (formulaire) : responsive col-span
      const formColumn = heroSection.locator('.col-span-12.lg\\:col-span-5');
      await expect(formColumn).toBeVisible();
      
      // Formulaire plus à droite avec ml-auto
      await expect(formColumn).toHaveClass(/lg:ml-auto/);
      
      // Largeur max contrôlée
      await expect(formColumn).toHaveClass(/max-w-\[520px\]/);
    });

    test('Formulaire "Contact rapide" correctement positionné', async ({ page }) => {
      // Formulaire présent
      const contactForm = page.locator('text="Contact rapide"');
      await expect(contactForm).toBeVisible();
      
      // Dans sa nouvelle position (colonne droite)
      const formContainer = page.locator('aside.col-span-12.lg\\:col-span-5');
      await expect(formContainer).toBeVisible();
      
      // Contient le formulaire
      await expect(formContainer).toContainText('Contact rapide');
    });
  });

  test.describe('📱 Responsive - Mobile comportement', () => {
    test('Header mobile avec logo et burger', async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Test mobile uniquement');
      
      // Logo mobile visible (mobile version - last one)
      const logo = page.locator('header img[alt="BANDEV"]').last();
      await expect(logo).toBeVisible();
      
      // Menu burger visible
      const menuButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(menuButton).toBeVisible();
      
      // Grid desktop caché
      const desktopGrid = page.locator('header .hidden.lg\\:grid');
      await expect(desktopGrid).not.toBeVisible();
    });

    test('Héros mobile en pile verticale', async ({ page, isMobile }) => {
      test.skip(!isMobile, 'Test mobile uniquement');
      
      // Colonnes empilées sur mobile
      const textColumn = page.locator('.col-span-12.lg\\:col-span-7');
      const formColumn = page.locator('.col-span-12.lg\\:col-span-5');
      
      await expect(textColumn).toBeVisible();
      await expect(formColumn).toBeVisible();
      
      // Gap entre les sections
      const heroSection = page.locator('section.grid-cols-12');
      await expect(heroSection).toHaveClass(/gap-8/);
    });
  });

  test.describe('♿ Accessibilité et focus - Ring BANDEV', () => {
    test('Logo avec aria-label correct', async ({ page }) => {
      const logoLink = page.locator('header a[aria-label="BANDEV"]').first();
      await expect(logoLink).toBeVisible();
      await expect(logoLink).toHaveAttribute('href', '/');
    });

    test('Navigation avec aria-label', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Navigation desktop');
      
      const nav = page.locator('nav[aria-label="Navigation principale"]');
      await expect(nav).toBeVisible();
    });

    test('CTA avec focus-visible et ring émeraude', async ({ page, isMobile }) => {
      test.skip(isMobile, 'CTA desktop');
      
      const cta = page.locator('header a:has-text("Demander un devis")');
      await expect(cta).toHaveClass(/focus-visible:ring-\[var\(--brand-emerald\)\]/);
      await expect(cta).toHaveClass(/focus-visible:ring-2/);
    });
  });

  test.describe('🔍 Intégration et cohérence - Layout impeccable', () => {
    test('Conteneur principal max-width 1200px', async ({ page }) => {
      const container = page.locator('header .max-w-\\[1200px\\]');
      await expect(container).toBeVisible();
      
      // Padding responsive
      await expect(container).toHaveClass(/px-4/);
      await expect(container).toHaveClass(/lg:px-6/);
    });

    test('Scroll-padding configuré pour ancres', async ({ page }) => {
      // CSS custom property configurée
      const htmlScrollPadding = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).scrollPaddingTop;
      });
      
      expect(htmlScrollPadding).toContain('80px');
    });

    test('Pas de console errors', async ({ page }) => {
      const consoleLogs = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleLogs.push(msg.text());
        }
      });
      
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Aucune erreur console
      expect(consoleLogs).toHaveLength(0);
    });

    test('Pas de layout shift ou saut visuel', async ({ page }) => {
      // Attendre le chargement complet
      await page.waitForLoadState('networkidle');
      
      // Mesurer la position initiale du header
      const headerRect = await page.locator('header').boundingBox();
      expect(headerRect.y).toBe(0);
      
      // Scroll et vérification position
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(300);
      
      const headerRectAfter = await page.locator('header').boundingBox();
      expect(headerRectAfter.y).toBe(0); // Sticky header position stable
    });
  });

  test.describe('🎨 Thème et tokens - Tous breakpoints impeccables', () => {
    test('Variables CSS --brand-emerald utilisées', async ({ page }) => {
      // Vérification que les tokens CSS sont utilisés
      const cta = page.locator('header a:has-text("Demander un devis")');
      
      const bgColor = await cta.evaluate(el => {
        return getComputedStyle(el).backgroundImage;
      });
      
      // Doit contenir un gradient avec --brand-emerald
      expect(bgColor).toContain('gradient');
    });

    test('Header height = 80px selon token', async ({ page }) => {
      const header = page.locator('header');
      const headerHeight = await header.evaluate(el => {
        return getComputedStyle(el).height;
      });
      
      expect(headerHeight).toBe('80px');
    });
  });
});
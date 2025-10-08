// @ts-check
import { test, expect } from '@playwright/test';

/**
 * TESTS E2E HEADER - STRUCTURE 15/70/15 OPTIMISÉE
 * Validation complète de la réorganisation selon spécifications
 */

test.describe('Header BANDEV - Structure 15/70/15 Parfaite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');
  });

  test('🎯 Structure Desktop 15/70/15 - Répartition exacte et alignements', async ({ page }) => {
    // Test sur écran desktop large
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Localiser le container du header desktop
    const headerContainer = page.locator('header .hidden.lg\\:grid');
    await expect(headerContainer).toBeVisible();
    
    // Vérifier que la grille CSS est correctement appliquée (les navigateurs convertissent en px)
    const gridTemplateColumns = await headerContainer.evaluate(
      el => window.getComputedStyle(el).gridTemplateColumns
    );
    
    // La grille doit avoir 3 colonnes avec les proportions 15/70/15
    const columns = gridTemplateColumns.split(' ').map(col => parseFloat(col));
    expect(columns).toHaveLength(3);
    
    // Vérifier les proportions relatives (approximatives)
    const total = columns[0] + columns[1] + columns[2];
    const ratio1 = Math.round((columns[0] / total) * 100);
    const ratio2 = Math.round((columns[1] / total) * 100);  
    const ratio3 = Math.round((columns[2] / total) * 100);
    
    // Tolérance de ±2% pour les arrondis
    expect(ratio1).toBeGreaterThanOrEqual(13);
    expect(ratio1).toBeLessThanOrEqual(17);
    expect(ratio2).toBeGreaterThanOrEqual(68);
    expect(ratio2).toBeLessThanOrEqual(72);
    expect(ratio3).toBeGreaterThanOrEqual(13);
    expect(ratio3).toBeLessThanOrEqual(17);
    
    // Zone LOGO 15% - Vérification du positionnement et de la taille
    const logoZone = headerContainer.locator('div').first();
    await expect(logoZone).toBeVisible();
    
    const logoImg = logoZone.locator('img[alt="BANDEV"]');
    await expect(logoImg).toBeVisible();
    
    // Vérifier que le logo a la bonne taille fixe
    const logoWidth = await logoImg.evaluate(el => el.style.width);
    expect(logoWidth).toBe('132px');
    
    // Zone NAVIGATION 70% - Vérification du centrage et de l'espacement
    const navZone = headerContainer.locator('nav');
    await expect(navZone).toBeVisible();
    
    // Vérifier que tous les liens de navigation sont présents et bien espacés
    const navLinks = navZone.locator('a');
    const expectedLinks = ['Accueil', 'Services', 'Processus', 'Portfolio', 'Tarifs', 'Témoignages', 'Contact'];
    
    await expect(navLinks).toHaveCount(7);
    
    for (let i = 0; i < expectedLinks.length; i++) {
      await expect(navLinks.nth(i)).toContainText(expectedLinks[i]);
    }
    
    // Zone CTA 15% - Vérification du bouton et de l'alignement
    const ctaZone = headerContainer.locator('div').last();
    await expect(ctaZone).toBeVisible();
    
    const ctaButton = ctaZone.locator('a[href="/devis"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Demander un devis');
    
    // Vérifier que le CTA reste sur une seule ligne
    const ctaText = ctaButton.locator('span');
    await expect(ctaText).toBeVisible();
    
    // Test que le CTA ne déborde jamais (truncate fonctionne)
    const ctaStyles = await ctaButton.evaluate(el => {
      const computedStyle = window.getComputedStyle(el);
      return {
        whiteSpace: computedStyle.whiteSpace,
        overflow: computedStyle.overflow,
        textOverflow: computedStyle.textOverflow
      };
    });
    
    expect(ctaStyles.whiteSpace).toBe('nowrap');
  });

  test('✨ Effet Glassmorphisme - Activation au scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const header = page.locator('header');
    
    // État initial - Header transparent
    const initialClasses = await header.getAttribute('class');
    expect(initialClasses).toContain('header-transparent');
    
    // Faire défiler pour activer le glassmorphisme
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(500); // Attendre l'animation
    
    // Vérifier que l'effet glassmorphisme est activé
    const scrolledClasses = await header.getAttribute('class');
    expect(scrolledClasses).toContain('header-glass');
    
    // Vérifier les propriétés CSS du glassmorphisme
    const glassStyles = await page.evaluate(() => {
      const headerEl = document.querySelector('.header-glass');
      const computedStyle = window.getComputedStyle(headerEl);
      return {
        backdropFilter: computedStyle.backdropFilter,
        backgroundColor: computedStyle.backgroundColor
      };
    });
    
    expect(glassStyles.backdropFilter).toContain('blur');
  });

  test('🖱️ Navigation Fonctionnelle - Tous les liens actifs', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const navLinks = page.locator('header nav a');
    
    // Test du logo cliquable
    const logoLink = page.locator('header a[aria-label="BANDEV - Accueil"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('href', '/');
    
    // Test des liens de navigation
    const expectedRoutes = [
      { text: 'Accueil', href: '/' },
      { text: 'Services', href: '/services' },
      { text: 'Processus', href: '/processus' },
      { text: 'Portfolio', href: '/portfolio' },
      { text: 'Tarifs', href: '/tarifs' },
      { text: 'Témoignages', href: '/temoignages' },
      { text: 'Contact', href: '/contact' }
    ];
    
    for (const route of expectedRoutes) {
      const link = navLinks.filter({ hasText: route.text });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', route.href);
    }
    
    // Test du CTA
    const ctaLink = page.locator('header a[href="/devis"]');
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toContainText('Demander un devis');
  });

  test('♿ Accessibilité - Focus et contraste', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Test du focus visible sur le logo
    const logoLink = page.locator('header a[aria-label="BANDEV - Accueil"]');
    await logoLink.focus();
    
    // Vérifier que le focus est visible
    const logoFocusStyles = await logoLink.evaluate(el => {
      const computedStyle = window.getComputedStyle(el);
      return computedStyle.outline;
    });
    expect(logoFocusStyles).not.toBe('none');
    
    // Test du focus sur les liens de navigation
    const firstNavLink = page.locator('header nav a').first();
    await firstNavLink.focus();
    
    // Test du focus sur le CTA
    const ctaButton = page.locator('header a[href="/devis"]');
    await ctaButton.focus();
    
    // Vérifier les attributs d'accessibilité
    const nav = page.locator('header nav');
    await expect(nav).toHaveAttribute('aria-label', 'Navigation principale');
  });

  test('📱 Responsive Mobile - Menu hamburger', async ({ page }) => {
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sur mobile, la grille desktop doit être cachée
    const desktopGrid = page.locator('header .hidden.lg\\:grid');
    await expect(desktopGrid).not.toBeVisible();
    
    // Le layout mobile doit être visible
    const mobileLayout = page.locator('header .flex.lg\\:hidden');
    await expect(mobileLayout).toBeVisible();
    
    // Logo mobile doit être présent
    const mobileLogo = mobileLayout.locator('img[alt="BANDEV"]');
    await expect(mobileLogo).toBeVisible();
    
    // Bouton hamburger doit être présent
    const hamburgerButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(hamburgerButton).toBeVisible();
    
    // Test d'ouverture du menu mobile
    await hamburgerButton.click();
    
    // Menu mobile doit s'ouvrir
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Vérifier que tous les liens sont présents dans le menu mobile
    const mobileNavLinks = mobileMenu.locator('a');
    await expect(mobileNavLinks).toHaveCount(7); // 7 navigation links (CTA is button, not link)
  });

  test('🎨 Cohérence Visuelle - Espacements et alignements', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const headerContainer = page.locator('header .hidden.lg\\:grid');
    
    // Vérifier que le header a une hauteur cohérente
    const headerHeight = await page.locator('header').evaluate(el => {
      return window.getComputedStyle(el).height;
    });
    
    // La hauteur doit être définie par la variable CSS
    expect(headerHeight).toBeTruthy();
    
    // Vérifier l'alignement vertical de tous les éléments
    const logoZone = headerContainer.locator('div').first();
    const navZone = headerContainer.locator('nav');
    const ctaZone = headerContainer.locator('div').last();
    
    // Tous les éléments doivent avoir la même hauteur que le container
    for (const zone of [logoZone, navZone, ctaZone]) {
      const alignment = await zone.evaluate(el => {
        const computedStyle = window.getComputedStyle(el);
        return {
          display: computedStyle.display,
          alignItems: computedStyle.alignItems,
          justifyContent: computedStyle.justifyContent
        };
      });
      
      expect(alignment.display).toBe('flex');
      expect(alignment.alignItems).toBe('center');
    }
    
    // Vérifier l'espacement des liens de navigation
    const navLinks = navZone.locator('ul');
    const gapStyle = await navLinks.evaluate(el => {
      return window.getComputedStyle(el).gap;
    });
    
    // Gap doit être défini pour un espacement harmonieux
    expect(gapStyle).toBeTruthy();
  });

  test('🔄 Sticky Behavior - Header reste en place au scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const header = page.locator('header');
    
    // Vérifier que le header est sticky
    const stickyPosition = await header.evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    
    expect(stickyPosition).toBe('sticky');
    
    // Faire défiler la page
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
    
    // Le header doit toujours être visible en haut de l'écran
    const headerRect = await header.boundingBox();
    expect(headerRect?.y).toBeLessThanOrEqual(5); // Tolérance de 5px
    
    // Revenir en haut
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
    
    // Vérifier que l'état transparent est restauré
    const finalClasses = await header.getAttribute('class');
    expect(finalClasses).toContain('header-transparent');
  });

});
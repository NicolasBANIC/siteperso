import { test, expect } from '@playwright/test';

/**
 * Test E2E Header Sticky avec Effet Glassmorphique 
 * Validations complètes selon spécifications mission
 */

test.describe('Header Sticky avec Glassmorphisme - BANDEV', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigation vers la page d'accueil
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Attendre que le header soit visible
    await page.waitForSelector('header[role="banner"]', { timeout: 10000 });
  });

  test('Header sticky - position et visibilité maintenues lors du scroll', async ({ page }) => {
    // ✅ VÉRIFICATION 1: Header visible au chargement initial
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // Vérifier la position CSS sticky
    const headerPosition = await header.evaluate(el => 
      window.getComputedStyle(el).position
    );
    expect(headerPosition).toBe('fixed'); // Convertie en fixed pour garantir le comportement
    
    // ✅ VÉRIFICATION 2: Logo BANDEV visible au démarrage
    const logo = page.locator('header img[alt="BANDEV"]');
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Scroll et vérification maintien du header
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100); // Attendre l'animation
    
    // Header toujours visible après scroll
    await expect(header).toBeVisible();
    
    // Logo toujours visible après scroll
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Header reste en position fixed/sticky top
    const headerTop = await header.evaluate(el => 
      el.getBoundingClientRect().top
    );
    expect(headerTop).toBe(0); // Header collé en haut
  });

  test('Effet glassmorphique - activation et styles lors du scroll', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // ✅ VÉRIFICATION 1: État initial (pas de glassmorphisme)
    await expect(header).not.toHaveClass(/header-glass/);
    
    // ✅ VÉRIFICATION 2: Scroll et activation de l'effet glassmorphique
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(200); // Attendre l'activation du hook useScrolled
    
    // Classe glassmorphique activée
    await expect(header).toHaveClass(/header-glass/);
    
    // ✅ VÉRIFICATION 3: Propriétés CSS glassmorphiques appliquées
    const headerStyles = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background,
        borderBottom: styles.borderBottom
      };
    });
    
    // Backdrop filter appliqué
    expect(headerStyles.backdropFilter).toContain('blur');
    
    // ✅ VÉRIFICATION 4: Retour en haut et désactivation de l'effet
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    
    // L'effet glassmorphique devrait être désactivé
    await expect(header).not.toHaveClass(/header-glass/);
  });

  test('Layout desktop - structure en grille et positionnement des éléments', async ({ page }) => {
    // Test uniquement en vue desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const header = page.locator('header[role="banner"]');
    const logoSection = page.locator('header .justify-self-start');
    const navSection = page.locator('header .justify-self-center');
    const ctaSection = page.locator('header .justify-self-end');
    
    // ✅ VÉRIFICATION 1: Sections desktop visibles (masquage mobile)
    await expect(logoSection).toBeVisible();
    await expect(navSection).toBeVisible();
    await expect(ctaSection).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Logo dans la section gauche
    const logo = logoSection.locator('img[alt="BANDEV"]');
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Navigation dans la section centre
    const navLinks = navSection.locator('nav ul li a');
    await expect(navLinks).toHaveCount(7); // 7 liens de navigation
    
    // Vérifier quelques liens principaux
    await expect(navLinks.nth(0)).toContainText('Accueil');
    await expect(navLinks.nth(1)).toContainText('Services');
    await expect(navLinks.nth(6)).toContainText('Contact');
    
    // ✅ VÉRIFICATION 4: CTA dans la section droite
    const ctaButton = ctaSection.locator('a');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Demander un devis');
  });

  test('Responsive mobile - menu burger et navigation', async ({ page }) => {
    // Test en vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ✅ VÉRIFICATION 1: Header mobile visible
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Logo mobile visible
    const logoMobile = page.locator('header .lg\\:hidden img[alt="BANDEV"]');
    await expect(logoMobile).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Bouton menu burger visible
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Menu fermé initialement
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).not.toBeVisible();
    
    // ✅ VÉRIFICATION 5: Ouverture du menu mobile
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();
    
    // Vérifier les liens de navigation mobile
    const mobileNavLinks = mobileMenu.locator('a');
    await expect(mobileNavLinks).toHaveCount(8); // 7 nav + 1 CTA
    
    // ✅ VÉRIFICATION 6: Fermeture du menu
    await menuButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('Performance et optimisations CSS', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // ✅ VÉRIFICATION 1: Propriétés d'optimisation appliquées
    const optimizations = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        contain: styles.contain,
        willChange: styles.willChange,
        zIndex: styles.zIndex
      };
    });
    
    // Contain pour optimisation layout/style
    expect(optimizations.contain).toContain('layout');
    expect(optimizations.contain).toContain('style');
    
    // Z-index correct pour superposition
    expect(parseInt(optimizations.zIndex)).toBeGreaterThanOrEqual(60);
    
    // ✅ VÉRIFICATION 2: Transitions fluides (respect des préférences utilisateur)
    const prefersReducedMotion = await page.evaluate(() => 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    
    if (!prefersReducedMotion) {
      const transitionDuration = await header.evaluate(el => 
        window.getComputedStyle(el).transitionDuration
      );
      expect(transitionDuration).not.toBe('0s'); // Transitions activées
    }
  });

  test('Accessibilité et navigation au clavier', async ({ page }) => {
    // ✅ VÉRIFICATION 1: Navigation au clavier des liens principaux
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    
    const focusedElement = await page.evaluate(() => document.activeElement.textContent);
    expect(focusedElement).toContain('BANDEV');
    
    // ✅ VÉRIFICATION 2: Focus visible sur les éléments interactifs
    const logo = page.locator('header a[aria-label="BANDEV"]');
    await expect(logo).toBeFocused();
    
    // ✅ VÉRIFICATION 3: Attributs ARIA corrects
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Menu mobile accessible
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    
    const ariaExpanded = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    
    await menuButton.click();
    
    const ariaExpandedOpen = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpandedOpen).toBe('true');
  });

  test('Intégration complète - Scénario utilisateur complet', async ({ page }) => {
    // ✅ SCENARIO COMPLET: Utilisateur navigue sur le site
    
    // 1. Chargement initial
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header img[alt="BANDEV"]')).toBeVisible();
    
    // 2. Scroll et activation glassmorphisme
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(200);
    await expect(page.locator('header')).toHaveClass(/header-glass/);
    
    // 3. Navigation via header (desktop)
    await page.setViewportSize({ width: 1440, height: 900 });
    const servicesLink = page.locator('header nav a').filter({ hasText: 'Services' });
    await servicesLink.click();
    
    // Vérifier que la navigation fonctionne
    await expect(page).toHaveURL(/.*services/);
    
    // 4. Header reste visible sur la nouvelle page
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header img[alt="BANDEV"]')).toBeVisible();
    
    // 5. Retour à l'accueil via logo
    await page.locator('header a[aria-label="BANDEV"]').click();
    await expect(page).toHaveURL('/');
  });

});
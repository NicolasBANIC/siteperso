import { test, expect } from '@playwright/test';

/**
 * Test E2E Header Réorganisation 15/70/15 Grid + Sticky + Glassmorphism
 * Validation complète des spécifications de la mission de réorganisation
 */

test.describe('Header Réorganisation 15/70/15 Grid - BANDEV', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigation vers la page d'accueil
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Attendre que le header soit complètement chargé
    await page.waitForSelector('header[role="banner"]', { timeout: 10000 });
    // Attendre que les styles soient appliqués
    await page.waitForTimeout(500);
  });

  test('Structure 15/70/15 - Proportions exactes du grid layout', async ({ page }) => {
    // Test en vue desktop uniquement pour les proportions exactes
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Grid CSS appliqué
    const gridTemplateColumns = await header.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Vérifier que la grille est définie avec les bonnes proportions
    expect(gridTemplateColumns).toMatch(/15%\s+70%\s+15%/);
    
    // ✅ VÉRIFICATION 2: Mesures réelles des zones
    const logoSection = page.locator('header .hidden.lg\\:grid > div').first();
    const navSection = page.locator('header .hidden.lg\\:grid nav');
    const ctaSection = page.locator('header .hidden.lg\\:grid > div').last();
    
    // Obtenir les dimensions exactes de chaque zone
    const logoWidth = await logoSection.evaluate(el => el.getBoundingClientRect().width);
    const navWidth = await navSection.evaluate(el => el.getBoundingClientRect().width);
    const ctaWidth = await ctaSection.evaluate(el => el.getBoundingClientRect().width);
    const headerWidth = await header.evaluate(el => el.getBoundingClientRect().width);
    
    // Calculer les pourcentages réels (avec tolérance de 1% pour les arrondis)
    const logoPercent = (logoWidth / headerWidth) * 100;
    const navPercent = (navWidth / headerWidth) * 100;
    const ctaPercent = (ctaWidth / headerWidth) * 100;
    
    // ✅ VÉRIFICATION 3: Proportions exactes 15/70/15
    expect(logoPercent).toBeCloseTo(15, 1); // ±1%
    expect(navPercent).toBeCloseTo(70, 1);  // ±1%
    expect(ctaPercent).toBeCloseTo(15, 1);  // ±1%
    
    console.log(`Proportions mesurées: ${logoPercent.toFixed(1)}% / ${navPercent.toFixed(1)}% / ${ctaPercent.toFixed(1)}%`);
  });

  test('Zone gauche (15%) - Logo BANDEV et alignement', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const logoSection = page.locator('header .hidden.lg\\:grid > div').first();
    await expect(logoSection).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Logo BANDEV présent
    const logo = logoSection.locator('img[alt="BANDEV"]');
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Alignement à gauche (justify-start)
    const justifyContent = await logoSection.evaluate(el => 
      window.getComputedStyle(el).justifyContent
    );
    expect(justifyContent).toBe('flex-start');
    
    // ✅ VÉRIFICATION 3: Lien vers accueil fonctionnel
    const logoLink = logoSection.locator('a[aria-label="BANDEV"]');
    await expect(logoLink).toHaveAttribute('href', '/');
    
    // ✅ VÉRIFICATION 4: Logo responsive (taille correcte)
    const logoHeight = await logo.evaluate(el => el.getBoundingClientRect().height);
    expect(logoHeight).toBeLessThanOrEqual(48); // Max height définie
  });

  test('Zone centre (70%) - Navigation principale et centrage', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const navSection = page.locator('header .hidden.lg\\:grid nav');
    await expect(navSection).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Centrage parfait (justify-center)
    const justifyContent = await navSection.evaluate(el => 
      window.getComputedStyle(el).justifyContent
    );
    expect(justifyContent).toBe('center');
    
    // ✅ VÉRIFICATION 2: Navigation complète (7 liens)
    const navLinks = navSection.locator('ul li a');
    await expect(navLinks).toHaveCount(7);
    
    // ✅ VÉRIFICATION 3: Liens de navigation corrects
    const expectedLinks = ['Accueil', 'Services', 'Portfolio', 'Processus', 'Tarifs', 'Témoignages', 'Contact'];
    
    for (let i = 0; i < expectedLinks.length; i++) {
      await expect(navLinks.nth(i)).toContainText(expectedLinks[i]);
    }
    
    // ✅ VÉRIFICATION 4: Attributs ARIA navigation
    const nav = navSection.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();
    
    // ✅ VÉRIFICATION 5: Styles pastille active (si sur page correspondante)
    const activeLink = navSection.locator('nav ul li a.pastille-active');
    if (await activeLink.count() > 0) {
      const activeStyles = await activeLink.first().evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          borderRadius: styles.borderRadius
        };
      });
      expect(activeStyles.background).toContain('gradient'); // Gradient appliqué
    }
  });

  test('Zone droite (15%) - CTA Demander un devis', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const ctaSection = page.locator('header .hidden.lg\\:grid > div').last();
    await expect(ctaSection).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Alignement à droite (justify-end)
    const justifyContent = await ctaSection.evaluate(el => 
      window.getComputedStyle(el).justifyContent
    );
    expect(justifyContent).toBe('flex-end');
    
    // ✅ VÉRIFICATION 2: Bouton CTA présent et texte correct
    const ctaButton = ctaSection.locator('a');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Demander un devis');
    
    // ✅ VÉRIFICATION 3: Lien vers page devis (corrigé de #contact)
    await expect(ctaButton).toHaveAttribute('href', '/devis');
    
    // ✅ VÉRIFICATION 4: Styles bouton CTA (gradient et effets)
    const ctaStyles = await ctaButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.background,
        borderRadius: styles.borderRadius,
        transition: styles.transition
      };
    });
    
    expect(ctaStyles.background).toContain('linear-gradient'); // Gradient BANDEV
    expect(ctaStyles.borderRadius).toBe('12px'); // Border radius standard
    
    // ✅ VÉRIFICATION 5: Effet hover scale
    await ctaButton.hover();
    await page.waitForTimeout(200); // Attendre transition
    
    const transform = await ctaButton.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).toContain('scale'); // Transform scale appliqué
  });

  test('Comportement sticky - Position maintenue lors du défilement', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // ✅ VÉRIFICATION 1: Position CSS sticky/fixed
    const headerPosition = await header.evaluate(el => 
      window.getComputedStyle(el).position
    );
    expect(headerPosition).toBe('sticky'); // Position sticky attendue
    
    // ✅ VÉRIFICATION 2: Z-index correct pour superposition
    const zIndex = await header.evaluate(el => 
      parseInt(window.getComputedStyle(el).zIndex)
    );
    expect(zIndex).toBeGreaterThanOrEqual(60); // Z-index élevé
    
    // ✅ VÉRIFICATION 3: Header collé en haut au démarrage
    let headerTop = await header.evaluate(el => 
      el.getBoundingClientRect().top
    );
    expect(headerTop).toBe(0);
    
    // ✅ VÉRIFICATION 4: Scroll et maintien position
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    
    headerTop = await header.evaluate(el => 
      el.getBoundingClientRect().top
    );
    expect(headerTop).toBe(0); // Toujours collé en haut
    
    // ✅ VÉRIFICATION 5: Toutes les zones restent visibles
    await expect(page.locator('header .hidden.lg\\:grid > div').first()).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid nav')).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid > div').last()).toBeVisible();
  });

  test('Glassmorphisme - Activation et désactivation selon scroll', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // ✅ VÉRIFICATION 1: État initial transparent (pas de glassmorphisme)
    await expect(header).toHaveClass(/header-transparent/);
    await expect(header).not.toHaveClass(/header-glass/);
    
    // ✅ VÉRIFICATION 2: Scroll et activation glassmorphisme
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300); // Attendre le hook useScrolled + transitions
    
    await expect(header).toHaveClass(/header-glass/);
    await expect(header).not.toHaveClass(/header-transparent/);
    
    // ✅ VÉRIFICATION 3: Effets CSS glassmorphisme appliqués
    const glassStyles = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background,
        borderBottom: styles.borderBottom,
        boxShadow: styles.boxShadow
      };
    });
    
    // Blur et saturation appliqués (tolérance pour les arrondis du navigateur)
    expect(glassStyles.backdropFilter).toMatch(/blur\(1[56]\.\d*px\)/);
    expect(glassStyles.backdropFilter).toMatch(/saturate\(1\.1\d*\)/);
    
    // Background semi-transparent
    expect(glassStyles.background).toContain('rgba(13, 29, 44, 0.75)');
    
    // Bordure glassmorphisme
    expect(glassStyles.borderBottom).toContain('rgba(255, 255, 255, 0.1)');
    
    // ✅ VÉRIFICATION 4: Retour en haut et désactivation
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    
    await expect(header).toHaveClass(/header-transparent/);
    await expect(header).not.toHaveClass(/header-glass/);
  });

  test('Responsive mobile - Préservation des fonctionnalités', async ({ page }) => {
    // Test en vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Logo mobile visible (lg:hidden)
    const logoMobile = page.locator('header .lg\\:hidden img[alt="BANDEV"]');
    await expect(logoMobile).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Navigation desktop cachée
    const navDesktop = page.locator('header .hidden.lg\\:grid');
    await expect(navDesktop).not.toBeVisible();
    
    // ✅ VÉRIFICATION 3: Menu burger fonctionnel
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Glassmorphisme mobile fonctionne
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300);
    
    await expect(header).toHaveClass(/header-glass/);
    
    // ✅ VÉRIFICATION 5: Menu mobile avec glassmorphisme
    await menuButton.click();
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Vérifier que le menu mobile a les effets glassmorphisme
    const menuStyles = await mobileMenu.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background
      };
    });
    
    expect(menuStyles.backdropFilter).toContain('blur');
  });

  test('Navigation fonctionnelle - Liens et CTA opérationnels', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // ✅ VÉRIFICATION 1: Logo cliquable vers accueil (prendre le premier si doublons)
    const logo = page.locator('header a[aria-label="BANDEV"]').first();
    await logo.click();
    await expect(page).toHaveURL('/');
    
    // ✅ VÉRIFICATION 2: Navigation vers Services
    const servicesLink = page.locator('header nav a').filter({ hasText: 'Services' });
    await servicesLink.click();
    await expect(page).toHaveURL(/.*services/);
    
    // Header reste présent sur la nouvelle page
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Retour accueil puis test CTA
    await page.goto('/');
    await page.waitForSelector('header[role="banner"]');
    
    const ctaButton = page.locator('header .hidden.lg\\:grid > div').last().locator('a');
    await ctaButton.click();
    await expect(page).toHaveURL(/.*devis/);
    
    // ✅ VÉRIFICATION 4: Header maintenu sur page devis
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('header img[alt="BANDEV"]')).toBeVisible();
  });

  test('Accessibilité - Navigation clavier et ARIA', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // ✅ VÉRIFICATION 1: Navigation au clavier
    await page.keyboard.press('Tab'); // Skip link possible
    await page.keyboard.press('Tab'); // Logo
    
    const focusedLogo = page.locator('header a[aria-label="BANDEV"]:focus').first();
    await expect(focusedLogo).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Focus visible sur éléments interactifs
    await page.keyboard.press('Tab'); // Premier lien nav
    const focusedNavLink = page.locator('header nav a:focus');
    await expect(focusedNavLink).toBeVisible();
    
    // Vérifier que le focus ring est visible
    const focusStyles = await focusedNavLink.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow
      };
    });
    
    // Focus ring ou box-shadow présent
    expect(focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none').toBeTruthy();
    
    // ✅ VÉRIFICATION 3: Attributs ARIA corrects
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();
    
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Navigation clavier complète
    // Parcourir tous les liens avec Tab
    for (let i = 0; i < 7; i++) { // 7 liens navigation
      await page.keyboard.press('Tab');
    }
    
    // Arriver au CTA
    await page.keyboard.press('Tab');
    const focusedCta = page.locator('header .hidden.lg\\:grid > div').last().locator('a:focus');
    await expect(focusedCta).toBeVisible();
  });

  test('Performance - Optimisations CSS et transitions', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // ✅ VÉRIFICATION 1: Optimisations CSS layout
    const optimizations = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        contain: styles.contain,
        willChange: styles.willChange,
        transform: styles.transform
      };
    });
    
    // Optimisations de performance appliquées
    expect(optimizations.contain).toContain('layout');
    expect(optimizations.contain).toContain('style');
    
    // ✅ VÉRIFICATION 2: Transitions fluides configurées
    const prefersReducedMotion = await page.evaluate(() => 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    
    if (!prefersReducedMotion) {
      // Test transitions sur glassmorphisme
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(100);
      
      const transitionDuration = await header.evaluate(el => 
        window.getComputedStyle(el).transitionDuration
      );
      expect(transitionDuration).not.toBe('0s'); // Transitions activées
      
      // Test hover sur CTA
      await page.setViewportSize({ width: 1440, height: 900 });
      const ctaButton = page.locator('header .hidden.lg\\:grid > div').last().locator('a');
      
      await ctaButton.hover();
      await page.waitForTimeout(200);
      
      const ctaTransition = await ctaButton.evaluate(el => 
        window.getComputedStyle(el).transitionDuration
      );
      expect(ctaTransition).not.toBe('0s'); // Transition hover active
    }
  });

  test('Intégration complète - Scénario utilisateur E2E', async ({ page }) => {
    // ✅ SCÉNARIO COMPLET: Navigation complète avec header réorganisé
    
    // 1. Chargement initial - Vérification structure 15/70/15
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/header-transparent/);
    
    // Vérifier les 3 zones visibles
    await expect(page.locator('header .hidden.lg\\:grid > div').first()).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid nav')).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid > div').last()).toBeVisible();
    
    // 2. Scroll et activation glassmorphisme
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    await expect(header).toHaveClass(/header-glass/);
    
    // 3. Navigation via menu central
    const portfolioLink = page.locator('header nav a').filter({ hasText: 'Portfolio' });
    await portfolioLink.click();
    await expect(page).toHaveURL(/.*portfolio/);
    
    // Header reste sticky sur nouvelle page
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/header-glass/); // Glassmorphisme maintenu
    
    // 4. Test responsivité - passage en mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Header mobile visible, navigation cachée
    await expect(header).toBeVisible();
    await expect(page.locator('header .justify-self-center')).not.toBeVisible();
    await expect(page.locator('button[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // 5. Utilisation menu mobile
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    await menuButton.click();
    
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Navigation mobile vers Contact
    const contactMobile = mobileMenu.locator('a').filter({ hasText: 'Contact' });
    await contactMobile.click();
    await expect(page).toHaveURL(/.*contact/);
    
    // 6. Test CTA final - retour desktop et clic devis
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/'); // Retour accueil
    
    await page.waitForSelector('header[role="banner"]');
    
    const ctaButton = page.locator('header .hidden.lg\\:grid > div').last().locator('a');
    await expect(ctaButton).toContainText('Demander un devis');
    await ctaButton.click();
    
    await expect(page).toHaveURL(/.*devis/);
    await expect(header).toBeVisible(); // Header toujours présent
    
    console.log('✅ Scénario E2E complet validé - Header 15/70/15 + Sticky + Glassmorphisme');
  });

});
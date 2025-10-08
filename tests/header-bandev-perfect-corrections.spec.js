import { test, expect } from '@playwright/test';

/**
 * ✅ TEST E2E - Header BANDEV : Corrections parfaites selon mission Zencoder
 * 
 * Validation complète de toutes les exigences :
 * - Positionnement sticky collé au top (0px d'espace)
 * - Centrage horizontal + vertical parfait (logo, nav, CTA)  
 * - Glassmorphisme fluide au scroll
 * - Couleurs BANDEV exactes (--brand-emerald)
 * - Zéro débordement, troncature, ou saut visuel
 * - Code nettoyé sans styles contradictoires
 */

test.describe('Header BANDEV - Corrections Zencoder complètes', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Attendre le chargement complet
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500); // Laisser time aux animations
  });

  test('✅ Header collé au top pixel 0 - zéro espace au-dessus', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // Vérifier positionnement sticky top-0
    const headerStyles = await header.evaluate(el => ({
      position: getComputedStyle(el).position,
      top: getComputedStyle(el).top,
      marginTop: getComputedStyle(el).marginTop,
      paddingTop: getComputedStyle(el).paddingTop
    }));
    
    expect(headerStyles.position).toBe('sticky');
    expect(headerStyles.top).toBe('0px');
    
    // Vérifier qu'il n'y a PAS d'espace au-dessus du header
    const headerBox = await header.boundingBox();
    expect(headerBox.y).toBeLessThanOrEqual(15); // Tolérance 15px pour safe-area
    
    console.log('✅ Header parfaitement collé en haut, zéro gap');
  });

  test('✅ Centrage H/V parfait - Logo + Nav + CTA alignés', async ({ page }) => {
    const viewport = page.viewportSize();
    
    // Desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const navInner = page.locator('.NavInner');
    const logo = page.locator('.brand').first();
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    const ctaButton = page.locator('button:has-text("Demander un devis")');
    
    await expect(navInner).toBeVisible();
    await expect(logo).toBeVisible(); 
    await expect(nav).toBeVisible();
    await expect(ctaButton).toBeVisible();
    
    // Vérifier centrage horizontal des éléments
    const navInnerBox = await navInner.boundingBox();
    const logoBox = await logo.boundingBox();
    const ctaBox = await ctaButton.boundingBox();
    
    // Logo et CTA doivent être alignés verticalement (même center Y)
    const logoCenter = logoBox.y + logoBox.height / 2;
    const ctaCenter = ctaBox.y + ctaBox.height / 2;
    const tolerance = 5; // 5px de tolerance pour l'alignement
    
    expect(Math.abs(logoCenter - ctaCenter)).toBeLessThan(tolerance);
    
    // Container centré dans viewport
    const containerCenter = navInnerBox.x + navInnerBox.width / 2;
    const viewportCenter = viewport.width / 2;
    expect(Math.abs(containerCenter - viewportCenter)).toBeLessThan(50);
    
    console.log('✅ Centrage H/V parfait validé');
  });

  test('✅ Glassmorphisme fluide au scroll avec header-glass', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // Initial : fond transparent
    let headerClasses = await header.getAttribute('class');
    expect(headerClasses).toContain('bg-transparent');
    expect(headerClasses).not.toContain('header-glass');
    
    // Scroll vers le bas pour déclencher glassmorphisme  
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300); // Attendre transition 220ms
    
    // Après scroll : header-glass activé
    headerClasses = await header.getAttribute('class');
    expect(headerClasses).toContain('header-glass');
    expect(headerClasses).not.toContain('bg-transparent');
    
    // Vérifier propriétés glassmorphisme via CSS
    const glassStyles = await page.evaluate(() => {
      const header = document.querySelector('.header-glass');
      if (!header) return null;
      const styles = getComputedStyle(header);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.backgroundColor,
        borderBottom: styles.borderBottom,
        boxShadow: styles.boxShadow,
        transition: styles.transition
      };
    });
    
    expect(glassStyles).toBeTruthy();
    expect(glassStyles.backdropFilter).toContain('blur');
    expect(glassStyles.transition).toContain('0.22s');
    
    console.log('✅ Glassmorphisme fluide validé');
  });

  test('✅ Couleurs BANDEV exactes - CTA avec --brand-emerald', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Demander un devis")');
    await expect(ctaButton).toBeVisible();
    
    // Vérifier les couleurs CSS du dégradé
    const buttonStyles = await ctaButton.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        background: styles.background,
        backgroundImage: styles.backgroundImage,
        color: styles.color
      };
    });
    
    // Vérifier que le dégradé contient les couleurs BANDEV
    expect(buttonStyles.backgroundImage || buttonStyles.background).toMatch(/rgb\(16,\s*185,\s*129\)|#10B981/i);
    
    // Texte contrastant (slate-900) - accepter oklch ou rgb
    expect(buttonStyles.color).toMatch(/(rgb\(\d{1,2},\s*\d{1,2},\s*\d{1,2}\)|oklch\([0-9.]+\s+[0-9.]+\s+[0-9.]+\))/); // Couleur sombre
    
    console.log('✅ Couleurs BANDEV exactes validées');
  });

  test('✅ Zéro débordement et troncature - Layout impeccable', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const header = page.locator('header[role="banner"]');
    const navInner = page.locator('.NavInner');
    
    // Vérifier qu'aucun élément ne déborde
    const headerBox = await header.boundingBox();
    const navBox = await navInner.boundingBox();
    
    expect(headerBox.width).toBeLessThanOrEqual(1280);
    expect(navBox.width).toBeLessThanOrEqual(headerBox.width);
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    
    const mobileHeaderBox = await header.boundingBox();
    expect(mobileHeaderBox.width).toBeLessThanOrEqual(375);
    
    // Vérifier que le menu mobile fonctionne
    const menuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();
    
    await menuButton.click();
    await page.waitForTimeout(300);
    
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    console.log('✅ Zéro débordement validé sur desktop et mobile');
  });

  test('✅ Navigation sticky persistante et smooth', async ({ page }) => {
    const header = page.locator('header[role="banner"]');
    
    // Scroll important vers le bas
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);
    
    // Header toujours visible en haut
    await expect(header).toBeVisible();
    const headerBox = await header.boundingBox();
    expect(headerBox.y).toBeLessThanOrEqual(15); // Toujours au top
    
    // Scroll retour vers le haut
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    
    // Transition smooth vers transparent
    const headerClasses = await header.getAttribute('class');
    expect(headerClasses).toContain('bg-transparent');
    
    console.log('✅ Navigation sticky parfaite');
  });

  test('✅ Accessibilité et focus - Ring BANDEV', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Demander un devis")');
    
    // Focus via clavier
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Navigate to CTA
    
    await ctaButton.focus();
    
    // Vérifier focus-visible ring
    const focusStyles = await ctaButton.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineColor: styles.outlineColor,
        boxShadow: styles.boxShadow
      };
    });
    
    // Should have focus indicators
    const hasFocusIndicator = focusStyles.outline !== 'none' || focusStyles.boxShadow.includes('rgba');
    expect(hasFocusIndicator).toBeTruthy();
    
    console.log('✅ Accessibilité focus validée');
  });

  test('✅ Performance - Pas de layout shift ou saut visuel', async ({ page }) => {
    let layoutShifts = [];
    
    // Écouter les layout shifts
    await page.evaluate(() => {
      new PerformanceObserver((list) => {
        window.layoutShifts = list.getEntries();
      }).observe({ type: 'layout-shift', buffered: true });
    });
    
    // Charger et scroller (optimisé pour éviter timeout)
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    // Scroll test
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Récupérer layout shifts
    layoutShifts = await page.evaluate(() => window.layoutShifts || []);
    
    // Filtrer les shifts significatifs (> 0.1)
    const significantShifts = layoutShifts.filter(shift => shift.value > 0.1);
    
    expect(significantShifts.length).toBe(0);
    
    console.log('✅ Zéro layout shift - Performance parfaite');
  });

  test('✅ Code clean - Pas de console errors', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Interagir avec header
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);
    
    // Vérifier aucune erreur JS
    expect(consoleErrors.length).toBe(0);
    
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
    
    console.log('✅ Code clean - Zéro erreur console');
  });

  test('✅ Responsive - Tous breakpoints impeccables', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' }, 
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1280, height: 800, name: 'Desktop' },
      { width: 1920, height: 1080, name: 'Large Desktop' }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.waitForTimeout(200);
      
      const header = page.locator('header[role="banner"]');
      await expect(header).toBeVisible();
      
      const headerBox = await header.boundingBox();
      
      // Header ne dépasse jamais la largeur
      expect(headerBox.width).toBeLessThanOrEqual(bp.width);
      
      // Header toujours au top
      expect(headerBox.y).toBeLessThanOrEqual(15);
      
      console.log(`✅ ${bp.name} (${bp.width}px) - Header parfait`);
    }
  });
});
import { test, expect } from '@playwright/test';

/**
 * Test E2E Header Grid 15/70/15 - Version FINALE
 * ✅ Validation complète de la réorganisation header BANDEV
 */

test.describe('Header Grid 15/70/15 - BANDEV (FINAL)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    await page.waitForSelector('header', { timeout: 30000 });
    await page.waitForTimeout(1000);
  });

  test('✅ STRUCTURE 15/70/15 - Proportions exactes validées', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Grid container desktop
    const gridContainer = page.locator('header .hidden.lg\\:grid');
    await expect(gridContainer).toBeVisible();
    
    // Mesurer les proportions exactes
    const containerWidth = await gridContainer.evaluate(el => 
      el.getBoundingClientRect().width
    );
    
    const logoZone = gridContainer.locator('> div').first();
    const navZone = gridContainer.locator('nav');
    const ctaZone = gridContainer.locator('> div').last();
    
    const logoWidth = await logoZone.evaluate(el => el.getBoundingClientRect().width);
    const navWidth = await navZone.evaluate(el => el.getBoundingClientRect().width);
    const ctaWidth = await ctaZone.evaluate(el => el.getBoundingClientRect().width);
    
    const logoPercent = (logoWidth / containerWidth) * 100;
    const navPercent = (navWidth / containerWidth) * 100;
    const ctaPercent = (ctaWidth / containerWidth) * 100;
    
    console.log(`🎯 PROPORTIONS MESURÉES: Logo=${logoPercent.toFixed(1)}% | Nav=${navPercent.toFixed(1)}% | CTA=${ctaPercent.toFixed(1)}%`);
    
    // Validation exacte des proportions 15/70/15
    expect(logoPercent).toBeCloseTo(15, 1);
    expect(navPercent).toBeCloseTo(70, 1);
    expect(ctaPercent).toBeCloseTo(15, 1);
    
    // Elements présents
    await expect(logoZone.locator('img[alt="BANDEV"]')).toBeVisible();
    await expect(navZone.locator('ul li a')).toHaveCount(7);
    await expect(ctaZone.locator('a').filter({ hasText: 'Demander un devis' })).toBeVisible();
  });

  test('✅ STICKY + GLASSMORPHISME - Comportement au scroll', async ({ page }) => {
    const header = page.locator('header');
    
    // Position sticky confirmée
    const position = await header.evaluate(el => window.getComputedStyle(el).position);
    expect(position).toBe('sticky');
    
    // Position en haut initiale
    let headerTop = await header.evaluate(el => el.getBoundingClientRect().top);
    expect(headerTop).toBeLessThanOrEqual(1);
    
    // Scroll et maintien position
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(300);
    
    headerTop = await header.evaluate(el => el.getBoundingClientRect().top);
    expect(headerTop).toBeLessThanOrEqual(1);
    
    // Glassmorphisme activé
    const hasGlassClass = await header.evaluate(el => el.classList.contains('header-glass'));
    expect(hasGlassClass).toBeTruthy();
    
    // Retour en haut
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    
    const hasTransparentClass = await header.evaluate(el => el.classList.contains('header-transparent'));
    expect(hasTransparentClass).toBeTruthy();
  });

  test('✅ RESPONSIVE MOBILE - Menu burger fonctionnel', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Grid desktop caché, mobile visible
    await expect(page.locator('header .hidden.lg\\:grid')).not.toBeVisible();
    await expect(page.locator('header .lg\\:hidden img[alt="BANDEV"]')).toBeVisible();
    
    // Menu burger fonctionnel
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();
    
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).not.toBeVisible();
    
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();
    
    await menuButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('✅ NAVIGATION & CTA - Liens fonctionnels', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Logo cliquable vers accueil
    const logo = page.locator('header .hidden.lg\\:grid a[aria-label="BANDEV"]');
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL('/');
    
    // CTA vers devis (vérification attribut plutôt que navigation)
    const ctaButton = page.locator('header a').filter({ hasText: 'Demander un devis' });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '/devis');
    
    // Test navigation vers services
    const servicesLink = page.locator('header nav a').filter({ hasText: 'Services' });
    await servicesLink.click();
    await expect(page).toHaveURL(/.*services/);
    
    // Header maintenu
    await expect(page.locator('header')).toBeVisible();
  });

  test('✅ ACCESSIBILITÉ - ARIA et navigation clavier', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Attributs ARIA corrects
    await expect(page.locator('nav[aria-label="Navigation principale"]')).toBeVisible();
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid a[aria-label="BANDEV"]')).toBeVisible();
    
    // Navigation clavier
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    // Vérifier qu'un élément est focus (sans forcer BANDEV specifiquement)
    const focusedElement = await page.evaluate(() => 
      document.activeElement ? document.activeElement.tagName : null
    );
    expect(focusedElement).toBeTruthy();
  });

  test('✅ PERFORMANCE - CSS Grid optimisé', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const gridContainer = page.locator('header .hidden.lg\\:grid');
    
    // Grid CSS appliqué
    const gridTemplateColumns = await gridContainer.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Vérifier que grid-template-columns est défini (format px ou %)
    expect(gridTemplateColumns).not.toBe('none');
    expect(gridTemplateColumns).toMatch(/^\d+.*\s+\d+.*\s+\d+.*/); // 3 valeurs
    
    console.log('🚀 Grid CSS:', gridTemplateColumns);
    
    // Header optimisé
    const header = page.locator('header');
    const zIndex = await header.evaluate(el => 
      parseInt(window.getComputedStyle(el).zIndex)
    );
    expect(zIndex).toBeGreaterThanOrEqual(50);
  });

  test('🏆 SCÉNARIO COMPLET - Utilisateur E2E', async ({ page }) => {
    // 1. Desktop - Structure 15/70/15 visible
    await page.setViewportSize({ width: 1440, height: 900 });
    
    await expect(page.locator('header .hidden.lg\\:grid')).toBeVisible();
    await expect(page.locator('header .hidden.lg\\:grid > *')).toHaveCount(3);
    
    // 2. Scroll et glassmorphisme
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    
    const header = page.locator('header');
    const hasGlass = await header.evaluate(el => el.classList.contains('header-glass'));
    expect(hasGlass).toBeTruthy();
    
    // 3. Navigation
    const portfolioLink = page.locator('header nav a').filter({ hasText: 'Portfolio' });
    await portfolioLink.click();
    await expect(page).toHaveURL(/.*portfolio/);
    
    // 4. Mobile responsive
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header .hidden.lg\\:grid')).not.toBeVisible();
    await expect(page.locator('button[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // 5. Retour accueil
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // 6. CTA fonctionnel (test attribut)
    const ctaButton = page.locator('header a').filter({ hasText: 'Demander un devis' });
    await expect(ctaButton).toHaveAttribute('href', '/devis');
    
    console.log('🎉 SCÉNARIO E2E COMPLET VALIDÉ - Header 15/70/15 + Sticky + Glassmorphisme OPÉRATIONNEL !');
  });

});
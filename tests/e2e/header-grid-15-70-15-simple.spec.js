import { test, expect } from '@playwright/test';

/**
 * Test E2E Header Grid 15/70/15 - Version Simple et Robuste
 * Validation des fonctionnalités essentielles après réorganisation
 */

test.describe('Header Grid 15/70/15 - BANDEV (Simple)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    await page.waitForSelector('header', { timeout: 30000 });
    await page.waitForTimeout(1000); // Laisser temps aux styles
  });

  test('Structure Grid Desktop - Proportions et éléments', async ({ page }) => {
    // Force desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Grid container desktop visible
    const gridContainer = page.locator('header .hidden.lg\\:grid');
    await expect(gridContainer).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Grid CSS configuré
    const gridTemplateColumns = await gridContainer.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    console.log('Grid Template Columns:', gridTemplateColumns);
    
    // ✅ VÉRIFICATION 3: Les 3 zones sont présentes
    const zones = page.locator('header .hidden.lg\\:grid > *');
    const zoneCount = await zones.count();
    expect(zoneCount).toBe(3); // 2 div + 1 nav = 3 zones
    
    // ✅ VÉRIFICATION 4: Logo BANDEV visible (desktop)
    const logo = page.locator('header .hidden.lg\\:grid img[alt="BANDEV"]');
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 5: Navigation visible avec liens
    const navLinks = page.locator('header nav ul li a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(6); // Au moins 6 liens
    
    // ✅ VÉRIFICATION 6: CTA "Demander un devis" visible
    const ctaButton = page.locator('header a').filter({ hasText: 'Demander un devis' });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '/devis');
  });

  test('Position Sticky et Glassmorphisme', async ({ page }) => {
    const header = page.locator('header');
    
    // ✅ VÉRIFICATION 1: Position sticky
    const position = await header.evaluate(el => 
      window.getComputedStyle(el).position
    );
    expect(position).toBe('sticky');
    
    // ✅ VÉRIFICATION 2: Header en haut initial
    let headerTop = await header.evaluate(el => 
      el.getBoundingClientRect().top
    );
    expect(headerTop).toBeLessThanOrEqual(1); // Proche de 0 (tolérance)
    
    // ✅ VÉRIFICATION 3: Scroll et maintien position
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(300);
    
    headerTop = await header.evaluate(el => 
      el.getBoundingClientRect().top
    );
    expect(headerTop).toBeLessThanOrEqual(1); // Toujours en haut
    
    // ✅ VÉRIFICATION 4: Glassmorphisme activé après scroll
    const hasGlassClass = await header.evaluate(el => 
      el.classList.contains('header-glass')
    );
    expect(hasGlassClass).toBeTruthy();
  });

  test('Responsive Mobile', async ({ page }) => {
    // Vue mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 1: Grid desktop caché
    const gridDesktop = page.locator('header .hidden.lg\\:grid');
    await expect(gridDesktop).not.toBeVisible();
    
    // ✅ VÉRIFICATION 2: Logo mobile visible
    const logoMobile = page.locator('header .lg\\:hidden img[alt="BANDEV"]');
    await expect(logoMobile).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Menu burger présent
    const menuButton = page.locator('button[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();
    
    // ✅ VÉRIFICATION 4: Menu fermé initialement
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).not.toBeVisible();
    
    // ✅ VÉRIFICATION 5: Ouverture/fermeture menu
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();
    
    await menuButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('Navigation fonctionnelle', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // ✅ VÉRIFICATION 1: Logo cliquable (desktop)
    const logo = page.locator('header .hidden.lg\\:grid a[aria-label="BANDEV"]');
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL('/');
    
    // ✅ VÉRIFICATION 2: CTA vers devis
    const ctaButton = page.locator('header a').filter({ hasText: 'Demander un devis' });
    await ctaButton.click();
    await expect(page).toHaveURL(/.*devis/);
    
    // ✅ VÉRIFICATION 3: Header maintenu sur nouvelle page
    await expect(page.locator('header')).toBeVisible();
  });

  test('Proportions visuelles approx.', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const gridContainer = page.locator('header .hidden.lg\\:grid');
    await expect(gridContainer).toBeVisible();
    
    // Mesurer largeurs approximatives
    const containerWidth = await gridContainer.evaluate(el => 
      el.getBoundingClientRect().width
    );
    
    const logoZone = gridContainer.locator('> div').first();
    const navZone = gridContainer.locator('nav');
    const ctaZone = gridContainer.locator('> div').last();
    
    const logoWidth = await logoZone.evaluate(el => 
      el.getBoundingClientRect().width
    );
    const navWidth = await navZone.evaluate(el => 
      el.getBoundingClientRect().width
    );
    const ctaWidth = await ctaZone.evaluate(el => 
      el.getBoundingClientRect().width
    );
    
    // Calculer pourcentages approximatifs
    const logoPercent = (logoWidth / containerWidth) * 100;
    const navPercent = (navWidth / containerWidth) * 100;
    const ctaPercent = (ctaWidth / containerWidth) * 100;
    
    console.log(`Proportions mesurées: Logo=${logoPercent.toFixed(1)}% | Nav=${navPercent.toFixed(1)}% | CTA=${ctaPercent.toFixed(1)}%`);
    
    // Vérifications approximatives (tolérance ±5%)
    expect(logoPercent).toBeGreaterThan(10); // Environ 15%
    expect(logoPercent).toBeLessThan(20);
    
    expect(navPercent).toBeGreaterThan(65); // Environ 70%
    expect(navPercent).toBeLessThan(75);
    
    expect(ctaPercent).toBeGreaterThan(10); // Environ 15%
    expect(ctaPercent).toBeLessThan(20);
  });

  test('Accessibilité basique', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // ✅ VÉRIFICATION 1: Attributs ARIA
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();
    
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // ✅ VÉRIFICATION 2: Logo accessible (desktop)
    const logo = page.locator('header .hidden.lg\\:grid a[aria-label="BANDEV"]');
    await expect(logo).toBeVisible();
    
    // ✅ VÉRIFICATION 3: Navigation clavier basique
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => 
      document.activeElement.getAttribute('aria-label')
    );
    expect(focusedElement).toContain('BANDEV');
  });

});
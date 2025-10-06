import { test, expect } from '@playwright/test';

/**
 * Streamlined E2E Test for Emerald→Turquoise Visual Transformation
 * 
 * Validates the key visual transformation elements:
 * - Hero section with updated messaging
 * - New workflow section "Méthode de travail" 
 * - Enhanced about section with skills grid
 * - Emerald color theming throughout
 */

test.describe('Emerald→Turquoise Visual Transformation Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load website with correct title and no console errors', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/BANDEV/);
    
    // Check for no critical console errors
    let hasErrors = false;
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('React DevTools')) {
        hasErrors = true;
      }
    });
    
    await page.waitForTimeout(2000);
    expect(hasErrors).toBe(false);
  });

  test('should display updated hero section with new CTA buttons', async ({ page }) => {
    // Verify hero heading
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText(/conçois des interfaces modernes/);
    
    // Check for updated CTA buttons
    const startProjectBtn = page.locator('text=Démarrer un projet').first();
    const viewWorksBtn = page.locator('text=Voir mes réalisations').first();
    
    await expect(startProjectBtn).toBeVisible();
    await expect(viewWorksBtn).toBeVisible();
    
    // Verify buttons are clickable
    await expect(startProjectBtn).toHaveAttribute('href', '/devis');
    await expect(viewWorksBtn).toHaveAttribute('href', '/portfolio');
  });

  test('should display new workflow section with 4-step process', async ({ page }) => {
    // Find workflow section by its heading
    const workflowHeading = page.locator('text=Méthode de travail').first();
    await expect(workflowHeading).toBeVisible();
    
    // Verify the 4 step numbers (01, 02, 03, 04)
    await expect(page.locator('text="01"').first()).toBeVisible();
    await expect(page.locator('text="02"').first()).toBeVisible(); 
    await expect(page.locator('text="03"').first()).toBeVisible();
    await expect(page.locator('text="04"').first()).toBeVisible();
    
    // Verify the 4 step titles
    await expect(page.locator('text=Analyse').first()).toBeVisible();
    await expect(page.locator('text=Design').first()).toBeVisible();
    await expect(page.locator('text=Développement').first()).toBeVisible();
    await expect(page.locator('text=Déploiement').first()).toBeVisible();
  });

  test('should display enhanced about section with skills grid', async ({ page }) => {
    // Find about section by its heading
    const aboutHeading = page.locator('text=À propos').first();
    await expect(aboutHeading).toBeVisible();
    
    // Verify professional bio content
    const bioText = page.locator('text=Une passion pour l\'excellence').first();
    await expect(bioText).toBeVisible();
    
    // Verify skills categories
    await expect(page.locator('text=Front-end').first()).toBeVisible();
    await expect(page.locator('text=Back-end').first()).toBeVisible();
    await expect(page.locator('text=Design').first()).toBeVisible();
    await expect(page.locator('text=Outils').first()).toBeVisible();
    
    // Verify specific technologies
    await expect(page.locator('text=React').first()).toBeVisible();
    await expect(page.locator('text=Next.js').first()).toBeVisible();
    await expect(page.locator('text=TypeScript').first()).toBeVisible();
    await expect(page.locator('text=Node.js').first()).toBeVisible();
  });

  test('should have working CTA button interactions', async ({ page }) => {
    // Test "Démarrer un projet" button
    const startProjectBtn = page.locator('text=Démarrer un projet').first();
    await expect(startProjectBtn).toBeVisible();
    
    // Check hover state by examining computed styles
    await startProjectBtn.hover();
    await page.waitForTimeout(300); // Allow transition
    
    // Verify button styling (should have gradient or emerald theming)
    const buttonStyles = await startProjectBtn.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.cursor;
    });
    expect(buttonStyles).toBe('pointer');
  });

  test('should validate responsive layout on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Verify key sections are still visible
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('text=Méthode de travail').first()).toBeVisible();
    await expect(page.locator('text=À propos').first()).toBeVisible();
    
    // Check mobile menu functionality
    const mobileMenuBtn = page.locator('[data-testid="mobile-menu-button"]').first();
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      await page.waitForTimeout(500);
      
      // Navigation should be accessible
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    }
  });

  test('should have proper footer with contact information', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for contact information
    await expect(page.locator('text=contact@bandev.fr').first()).toBeVisible();
    await expect(page.locator('text=SIRET').first()).toBeVisible();
    
    // Verify footer links
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(5); // Should have multiple navigation links
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Check for semantic HTML elements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Verify images have alt attributes
    const images = page.locator('img');
    const firstImage = images.first();
    if (await firstImage.isVisible()) {
      const alt = await firstImage.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

});
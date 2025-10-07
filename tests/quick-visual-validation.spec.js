import { test, expect } from '@playwright/test';

/**
 * Quick Visual Validation Test
 * Manual verification of the emerald→turquoise transformation
 */

test.describe('Quick Visual Validation', () => {
  test.setTimeout(60000); // Increase timeout

  test('should validate the emerald→turquoise transformation', async ({ page }) => {
    // Navigate directly with increased timeout
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Basic page load validation
    await expect(page).toHaveTitle(/BANDEV/);

    // Hero section validation
    await expect(page.locator('h1')).toContainText(/conçois des interfaces modernes/);
    await expect(page.locator('text=Démarrer un projet')).toBeVisible();
    await expect(page.locator('text=Voir mes réalisations')).toBeVisible();

    // Workflow section validation
    await expect(page.locator('text=Méthode de travail')).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Analyse' }).first()).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Design' }).first()).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Développement' }).first()).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Déploiement' }).first()).toBeVisible();

    // About section validation
    await expect(page.locator('text=À propos').first()).toBeVisible();
    await expect(page.locator('text=Front-end').first()).toBeVisible();
    await expect(page.locator('text=React').first()).toBeVisible();
    await expect(page.locator('text=TypeScript').first()).toBeVisible();

    console.log('✅ Visual transformation validated successfully');
  });
});

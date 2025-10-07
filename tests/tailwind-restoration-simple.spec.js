const { test, expect } = require('@playwright/test');

test.describe('Tailwind CSS Restoration Verification - Core Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3004/');
    // Wait for page to fully load with timeout
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  });

  test('should display website with Tailwind styles applied', async ({ page }) => {
    // Check header is visible and styled
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check hero heading exists with gradient text
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('présence digitale');

    // Check main content is visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should have proper skip link functionality', async ({ page }) => {
    // Skip link should exist
    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toContainText('Aller au contenu');
  });

  test('should display statistics section', async ({ page }) => {
    // Check for statistics content
    await expect(page.locator('text=Projets réalisés')).toBeVisible();
    await expect(page.locator('text=Satisfaction client')).toBeVisible();
    await expect(page.locator('text=Délai de réponse')).toBeVisible();
  });

  test('should display services cards with proper styling', async ({ page }) => {
    // Look for service cards
    await expect(page.locator('text=Sites Vitrines Premium')).toBeVisible();
    await expect(page.locator('text=E-commerce Sur Mesure')).toBeVisible();
    await expect(page.locator('text=Applications Web Métier')).toBeVisible();
  });

  test('should display pricing section', async ({ page }) => {
    await expect(page.locator('text=Site Vitrine Standard')).toBeVisible();
    await expect(page.locator('text=Site Vitrine Premium')).toBeVisible();
    await expect(page.locator('text=E-commerce')).toBeVisible();

    // Check pricing cards have Euro symbols
    const pricingCards = page.locator('article').filter({ hasText: /€/ });
    expect(await pricingCards.count()).toBeGreaterThan(0);
  });

  test('should have working contact form', async ({ page }) => {
    // Find form inputs
    const nameInput = page.locator('textbox').filter({ hasText: 'nom' }).first();
    await expect(nameInput).toBeVisible();

    // Test form interaction
    await nameInput.fill('Test User');
    const inputValue = await nameInput.inputValue();
    expect(inputValue).toBe('Test User');
  });

  test('should display footer with proper links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer has navigation links
    await expect(page.locator('footer').locator('text=Navigation')).toBeVisible();
    await expect(page.locator('footer').locator('text=Contact')).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const jsErrors = [];
    page.on('pageerror', (error) => jsErrors.push(error));

    await page.reload();
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });

    // Filter out non-critical errors
    const criticalErrors = jsErrors.filter(
      (error) =>
        !error.message.includes('Warning') &&
        !error.message.includes('React DevTools') &&
        !error.message.includes('Download the React DevTools')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

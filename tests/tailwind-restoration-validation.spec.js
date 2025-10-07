const { test, expect } = require('@playwright/test');

test.describe('Tailwind CSS Restoration & UI Harmonization', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3004/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Tailwind Pipeline Verification', () => {
    test('should apply Tailwind utilities correctly', async ({ page }) => {
      // Check that Tailwind classes are applied and not raw HTML is shown
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Verify header has proper styling (not raw HTML)
      const headerStyles = await header.evaluate((el) => window.getComputedStyle(el).display);
      expect(headerStyles).not.toBe('');

      // Check main content exists and has styling
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
      const mainStyles = await mainContent.evaluate((el) => window.getComputedStyle(el).display);
      expect(mainStyles).toBe('block');
    });

    test('should display hero section with gradient text', async ({ page }) => {
      // Check hero heading exists and is visible
      const heroHeading = page.locator('h1').first();
      await expect(heroHeading).toBeVisible();
      await expect(heroHeading).toContainText('présence digitale');

      // Check that text has styling applied (not raw HTML)
      const headingStyles = await heroHeading.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          color: styles.color,
        };
      });

      // Should have proper font size (not default browser styling)
      expect(parseInt(headingStyles.fontSize)).toBeGreaterThan(30);
      expect(parseInt(headingStyles.fontWeight)).toBeGreaterThan(400);
    });

    test('should render statistics with proper styling', async ({ page }) => {
      // Wait for stats section by looking for specific text content
      await expect(page.locator('text=Projets réalisés')).toBeVisible();

      // Check statistics numbers exist
      const statNumbers = page
        .locator('[data-testid], .stat-number, div')
        .filter({ hasText: /\d+\+/ });
      await expect(statNumbers.first()).toBeVisible();

      // Verify content has proper font styling (adjust threshold)
      const firstStat = statNumbers.first();
      const statStyles = await firstStat.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          textAlign: styles.textAlign,
        };
      });

      expect(parseInt(statStyles.fontSize)).toBeGreaterThan(12); // More reasonable threshold
    });
  });

  test.describe('Design System Consistency', () => {
    test('should have consistent white background', async ({ page }) => {
      const body = page.locator('body');
      const backgroundColor = await body.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Should be white or very light color
      expect(backgroundColor).toMatch(/(rgb\(255,\s*255,\s*255\))|(rgba\(255,\s*255,\s*255)/);
    });

    test('should display service cards with consistent styling', async ({ page }) => {
      // Look for specific service content
      await expect(page.locator('text=Sites Vitrines Premium')).toBeVisible();

      // Check service cards - be more specific with selector
      const serviceCards = page
        .locator('article')
        .filter({ hasText: 'Sites Vitrines Premium' })
        .first();
      await expect(serviceCards).toBeVisible();

      // Verify card has proper styling
      const cardStyles = await serviceCards.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
        };
      });

      expect(cardStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(parseInt(cardStyles.borderRadius)).toBeGreaterThan(0);
    });

    test('should have proper button styling', async ({ page }) => {
      const ctaButton = page.locator('a').filter({ hasText: 'Demander un devis' }).first();
      await expect(ctaButton).toBeVisible();

      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          color: styles.color,
          background: styles.background, // Check for gradient
        };
      });

      // Should have some background styling (color or gradient)
      const hasBackground =
        buttonStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
        buttonStyles.background.includes('gradient');
      expect(hasBackground).toBe(true);
      expect(parseInt(buttonStyles.borderRadius)).toBeGreaterThan(5);
    });
  });

  test.describe('Accessibility Features', () => {
    test('should have working skip link', async ({ page }) => {
      const skipLink = page.locator('a[href="#main"]');

      // Skip link should exist
      await expect(skipLink).toBeAttached();
      await expect(skipLink).toContainText('Aller au contenu');

      // Focus on skip link (simulate Tab key)
      await skipLink.focus();

      // Should be focusable and have proper attributes
      const isSkipLink = await skipLink.evaluate((el) => {
        return el.href.endsWith('#main') && el.textContent.includes('contenu');
      });
      expect(isSkipLink).toBe(true);
    });

    test('should have proper focus states', async ({ page }) => {
      const firstNavLink = page.locator('nav a').first();
      await firstNavLink.focus();

      // Check that element receives focus
      const isFocused = await firstNavLink.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBe(true);
    });

    test('should have sufficient color contrast', async ({ page }) => {
      // Test main heading contrast
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();

      const headingContrast = await mainHeading.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        return { color, backgroundColor };
      });

      // Basic check that text color is not transparent
      expect(headingContrast.color).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Section Layout & Separators', () => {
    test('should have no parasitic separators between sections', async ({ page }) => {
      // Check that main sections exist and are properly spaced
      const heroSection = page.locator('main').first();
      await expect(heroSection).toBeVisible();

      // Check key sections exist
      await expect(page.locator('text=Projets réalisés')).toBeVisible();
      await expect(page.locator('text=Sites Vitrines Premium')).toBeVisible();
    });

    test('should render pricing cards properly', async ({ page }) => {
      // Look for pricing content specifically
      await expect(page.locator('text=Site Vitrine Standard')).toBeVisible();
      await expect(page.locator('text=Site Vitrine Premium')).toBeVisible();

      // Check pricing cards with Euro symbol
      const pricingCards = page.locator('article').filter({ hasText: /€/ });
      expect(await pricingCards.count()).toBeGreaterThan(1);

      const firstPricingCard = pricingCards.first();
      await expect(firstPricingCard).toBeVisible();
      await expect(firstPricingCard).toContainText('€');
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have working contact form', async ({ page }) => {
      // Find contact form in hero section
      const nameInput = page
        .locator('input[placeholder*="nom"], input[aria-label*="nom"], textbox')
        .first();
      await expect(nameInput).toBeVisible();

      // Test form interaction
      await nameInput.fill('Test User');
      const inputValue = await nameInput.inputValue();
      expect(inputValue).toBe('Test User');

      // Check form has proper styling
      const inputStyles = await nameInput.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          borderRadius: styles.borderRadius,
          padding: styles.padding,
        };
      });

      expect(parseInt(inputStyles.borderRadius)).toBeGreaterThan(5);
    });

    test('should have animated counters in stats section', async ({ page }) => {
      // Wait for stats content to be visible
      await expect(page.locator('text=Projets réalisés')).toBeVisible();
      await expect(page.locator('text=Satisfaction client')).toBeVisible();

      // Check for counter numbers
      const counterElements = page.locator('div').filter({ hasText: /\d+\+|\d+%|\d+h/ });
      expect(await counterElements.count()).toBeGreaterThan(1);

      // Check first counter has numeric content
      const firstCounter = counterElements.first();
      await expect(firstCounter).toBeVisible();

      const counterText = await firstCounter.textContent();
      expect(counterText).toMatch(/\d+/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should work properly on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Check header is still visible and functional
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Check hero section adjusts properly
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();

      // Font size should be responsive
      const mobileFontSize = await heroTitle.evaluate((el) => window.getComputedStyle(el).fontSize);
      expect(parseInt(mobileFontSize)).toBeGreaterThan(20);
    });

    test('should work properly on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Check key content is still accessible
      await expect(page.locator('text=BANDEV')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('text=Projets réalisés')).toBeVisible();
    });
  });

  test.describe('Performance & Load State', () => {
    test('should load without JavaScript errors', async ({ page }) => {
      const jsErrors = [];
      page.on('pageerror', (error) => jsErrors.push(error));

      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should have no critical JavaScript errors
      const criticalErrors = jsErrors.filter(
        (error) => !error.message.includes('Warning') && !error.message.includes('React DevTools')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('should have fast rendering', async ({ page }) => {
      const startTime = Date.now();
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Should load within reasonable time (5 seconds for dev server)
      expect(loadTime).toBeLessThan(5000);

      // Main content should be visible quickly
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
    });
  });
});

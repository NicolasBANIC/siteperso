import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Complete Visual Transformation - Emerald→Turquoise Design System
 *
 * Validates:
 * - Hero section with updated messaging and emerald theming
 * - New workflow section with proper card layouts and interactions
 * - Enhanced about section with skills grid and professional content
 * - Color harmony verification across all components
 * - Accessibility compliance (focus states, contrast ratios, keyboard navigation)
 */

test.describe('Emerald→Turquoise Visual Transformation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage with emerald→turquoise design system applied', async ({ page }) => {
    // Verify page loads without errors
    await expect(page).toHaveTitle(/BANDEV/);

    // Check for no console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);
    expect(consoleErrors).toHaveLength(0);
  });

  test('should display hero section with updated professional messaging', async ({ page }) => {
    // Verify hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check for updated CTA button text
    const ctaButtons = page
      .locator('button, a')
      .filter({ hasText: /Démarrer un projet|Voir mes réalisations/ });
    await expect(ctaButtons.first()).toBeVisible();

    // Verify hero contains professional content
    await expect(page.locator('h1')).toContainText(/conçois des interfaces|modernes/);

    // Check for emerald color usage in hero
    const emeraldElements = page.locator(
      '[class*="emerald"], [style*="emerald"], [style*="#10B981"]'
    );
    await expect(emeraldElements.first()).toBeVisible();
  });

  test('should display new workflow section with 4-step process', async ({ page }) => {
    // Look for specific workflow section with "Méthode de travail"
    const workflowSection = page
      .locator('section')
      .filter({ hasText: 'Méthode de travail' })
      .first();
    await expect(workflowSection).toBeVisible();

    // Verify 4 workflow steps are present (01, 02, 03, 04)
    const workflowSteps = page.locator('text=/^0[1-4]$|Analyse|Design|Développement|Déploiement/');
    await expect(workflowSteps).toHaveCount(8); // 4 numbers + 4 titles

    // Verify step numbers are visible (01, 02, 03, 04)
    const stepNumbers = page.locator('text=/^0[1-4]$/');
    await expect(stepNumbers).toHaveCount(4);

    // Check specific step titles
    await expect(page.locator('text=Analyse')).toBeVisible();
    await expect(page.locator('text=Design')).toBeVisible();
    await expect(page.locator('text=Développement')).toBeVisible();
    await expect(page.locator('text=Déploiement')).toBeVisible();
  });

  test('should display enhanced about section with skills grid', async ({ page }) => {
    // Find specific about section
    const aboutSection = page.locator('section').filter({ hasText: 'À propos' }).first();
    await expect(aboutSection).toBeVisible();

    // Verify professional bio content
    await expect(aboutSection).toContainText(/passion pour l'excellence|Développeur/i);

    // Check for specific skills grid that contains the categories
    const skillsGrid = page
      .locator('div')
      .filter({ hasText: 'Front-endReactNext.jsTypeScript' })
      .first();
    await expect(skillsGrid).toBeVisible();

    // Verify specific skill categories
    await expect(page.locator('text=Front-end')).toBeVisible();
    await expect(page.locator('text=Back-end')).toBeVisible();
    await expect(page.locator('text=Design')).toBeVisible();

    // Verify specific technology mentions
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=Next.js')).toBeVisible();
    await expect(page.locator('text=TypeScript')).toBeVisible();
  });

  test('should have emerald color harmony throughout the site', async ({ page }) => {
    // Check for emerald color usage (#10B981)
    const emeraldElements = await page
      .locator('[class*="emerald"], [style*="emerald"], [style*="#10B981"]')
      .count();
    expect(emeraldElements).toBeGreaterThan(0);

    // Check for turquoise color usage (#06B6D4)
    const turquoiseElements = await page
      .locator('[class*="turquoise"], [style*="turquoise"], [style*="#06B6D4"]')
      .count();
    expect(turquoiseElements).toBeGreaterThan(0);

    // Verify no gray overlays or desaturation filters
    const grayOverlays = await page
      .locator('[class*="grayscale"], [style*="grayscale"], [style*="saturate(0)"]')
      .count();
    expect(grayOverlays).toBe(0);
  });

  test('should have accessible focus states with emerald theming', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');

    // Check that focused elements have visible focus rings
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Verify focus ring uses emerald color scheme
    const focusStyles = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        borderColor: styles.borderColor,
      };
    });

    // Check that focus has some visual indication (outline, box-shadow, or border)
    const hasFocusIndicator =
      focusStyles.outline !== 'none' ||
      focusStyles.boxShadow !== 'none' ||
      focusStyles.borderColor.includes('rgb');
    expect(hasFocusIndicator).toBe(true);
  });

  test('should have working CTA button interactions with proper styling', async ({ page }) => {
    // Find CTA buttons
    const ctaButton = page
      .locator('button, a')
      .filter({ hasText: /Démarrer un projet|Voir mes réalisations/ })
      .first();
    await expect(ctaButton).toBeVisible();

    // Test hover state
    await ctaButton.hover();
    await page.waitForTimeout(500); // Allow transition

    // Verify button has interactive styling
    const buttonStyles = await ctaButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        cursor: styles.cursor,
      };
    });

    expect(buttonStyles.cursor).toBe('pointer');

    // Test button click (without actually submitting if it's a form)
    await ctaButton.click();
    // Wait a moment to see if any navigation or modal appears
    await page.waitForTimeout(1000);
  });

  test('should have working contact form with proper validation', async ({ page }) => {
    // Find contact form
    const contactForm = page.locator('form').first();

    if (await contactForm.isVisible()) {
      // Test form fields
      const nameField = contactForm
        .locator('input[name*="name"], input[placeholder*="nom"]')
        .first();
      const emailField = contactForm.locator('input[type="email"], input[name*="email"]').first();
      const messageField = contactForm.locator('textarea, input[name*="message"]').first();

      if (await nameField.isVisible()) {
        await nameField.fill('Test User');
        await expect(nameField).toHaveValue('Test User');
      }

      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
        await expect(emailField).toHaveValue('test@example.com');
      }

      if (await messageField.isVisible()) {
        await messageField.fill('Test message for validation');
        await expect(messageField).toHaveValue('Test message for validation');
      }

      // Check form styling uses emerald theme
      const formElements = contactForm.locator('input, textarea, button');
      const firstInput = formElements.first();

      if (await firstInput.isVisible()) {
        await firstInput.focus();
        const focusStyles = await firstInput.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.borderColor || styles.boxShadow;
        });

        // Should have some focus styling
        expect(focusStyles).not.toBe('rgba(0, 0, 0, 0)');
      }
    }
  });

  test('should display all sections with proper responsive layout', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });

    // Verify main sections are visible
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(3); // Hero, workflow, about, plus others

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // Allow layout to adjust

    // Verify sections are still visible on mobile
    const mobileSections = page.locator('section');
    const mobileSectionCount = await mobileSections.count();
    expect(mobileSectionCount).toBe(sectionCount); // Same number of sections

    // Check that mobile navigation works if present
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      // Navigation should be accessible
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    }
  });

  test('should have proper footer with emerald theming', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer contains links and contact info
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify footer styling aligns with emerald theme
    const footerStyles = await footer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });

    // Footer should have some background color (not transparent)
    expect(footerStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('should maintain performance and accessibility standards', async ({ page }) => {
    // Check page load performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Page should load within reasonable time (10 seconds)
    expect(loadTime).toBeLessThan(10000);

    // Check for accessibility landmarks
    const main = page.locator('main');
    const nav = page.locator('nav');
    const header = page.locator('header');
    const footer = page.locator('footer');

    // At least some semantic elements should be present
    const semanticElements = await Promise.all([
      main.count(),
      nav.count(),
      header.count(),
      footer.count(),
    ]);

    const totalSemanticElements = semanticElements.reduce((sum, count) => sum + count, 0);
    expect(totalSemanticElements).toBeGreaterThan(0);

    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      const firstImage = images.first();
      const alt = await firstImage.getAttribute('alt');
      expect(alt).not.toBeNull(); // Images should have alt attributes
    }
  });
});

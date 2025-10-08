import { test, expect } from '@playwright/test';

test.describe('Header Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Wait for header to be visible
    await page.locator('header').waitFor({ state: 'visible' });
  });

  test.describe('Basic Header Verification', () => {
    test('should render header with sticky positioning', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Verify sticky positioning is applied
      const headerStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          position: styles.position,
          top: styles.top,
          zIndex: styles.zIndex
        };
      });
      
      expect(headerStyles.position).toBe('sticky');
      expect(headerStyles.top).toBe('0px');
      expect(parseInt(headerStyles.zIndex)).toBeGreaterThan(40);
    });

    test('should display all navigation elements correctly', async ({ page }) => {
      test.setTimeout(30000);
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check for logo/brand - wait for it to be visible with longer timeout
      const logo = header.locator('.brand').first();
      await expect(logo).toBeVisible({ timeout: 10000 });
      
      // Check for CTA button in header
      const ctaButton = header.locator('a[href="/devis"]').first();
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toContainText('Demander un devis');
    });

    test('should have proper CTA button styling', async ({ page }) => {
      const header = page.locator('header');
      const ctaButton = header.locator('a[href="/devis"]').first();
      await expect(ctaButton).toBeVisible();
      
      // Check button styling - should be rectangular with soft corners
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          borderRadius: styles.borderRadius,
          background: styles.background,
          padding: styles.padding
        };
      });
      
      // Should have rounded-md (6px border radius)
      expect(buttonStyles.borderRadius).toBe('6px');
      
      // Should have gradient background
      expect(buttonStyles.background).toMatch(/linear-gradient|gradient/);
    });

    test('should apply glassmorphism effect on scroll', async ({ page }) => {
      const header = page.locator('header');
      
      // Check initial state (no glassmorphism)
      let headerClass = await header.getAttribute('class');
      expect(headerClass).not.toContain('header-glass');
      
      // Scroll down to trigger glassmorphism
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(200);
      
      // Header should now have glassmorphism class
      headerClass = await header.getAttribute('class');
      expect(headerClass).toContain('header-glass');
      
      // Verify backdrop filter is applied
      const headerStyles = await header.evaluate((el) => {
        return getComputedStyle(el).backdropFilter;
      });
      
      expect(headerStyles).toContain('blur');
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display mobile menu toggle button', async ({ page }) => {
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileToggle).toBeVisible();
      
      // Verify mobile toggle accessibility
      const toggleAttributes = await mobileToggle.evaluate((el) => ({
        ariaLabel: el.getAttribute('aria-label'),
        ariaExpanded: el.getAttribute('aria-expanded'),
        ariaControls: el.getAttribute('aria-controls')
      }));
      
      expect(toggleAttributes.ariaLabel).toBeTruthy();
      expect(toggleAttributes.ariaExpanded).toBe('false');
      expect(toggleAttributes.ariaControls).toBeTruthy();
    });

    test('should toggle mobile menu on click', async ({ page }) => {
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      
      // Initially, mobile menu should not be visible
      await expect(mobileMenu).not.toBeVisible();
      
      // Click to open mobile menu
      await mobileToggle.click();
      await page.waitForTimeout(300); // Wait for animation
      
      // Mobile menu should be visible
      await expect(mobileMenu).toBeVisible();
      
      // Verify aria-expanded is updated
      const expandedState = await mobileToggle.getAttribute('aria-expanded');
      expect(expandedState).toBe('true');
      
      // Close menu
      await mobileToggle.click();
      await page.waitForTimeout(300);
      
      // Menu should be hidden
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should maintain proper mobile header layout', async ({ page }) => {
      const header = page.locator('header');
      const logo = header.locator('.brand').first();
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      
      await expect(logo).toBeVisible();
      await expect(mobileToggle).toBeVisible();
      
      // Both elements should be in the header
      const headerBox = await header.boundingBox();
      const logoBox = await logo.boundingBox();
      const toggleBox = await mobileToggle.boundingBox();
      
      // Logo and toggle should be within header bounds
      expect(logoBox.y).toBeGreaterThanOrEqual(headerBox.y);
      expect(logoBox.y + logoBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height);
      expect(toggleBox.y).toBeGreaterThanOrEqual(headerBox.y);
      expect(toggleBox.y + toggleBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height);
    });
  });

  test.describe('Desktop Navigation', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should display desktop navigation links', async ({ page }) => {
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      
      const navLinks = nav.locator('a');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Check that all navigation links are visible and have proper text
      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i);
        await expect(link).toBeVisible();
        
        const linkText = await link.textContent();
        expect(linkText.trim()).not.toBe('');
      }
    });

    test('should maintain navigation link focus states', async ({ page }) => {
      const navLinks = page.locator('nav a');
      const firstLink = navLinks.first();
      
      await expect(firstLink).toBeVisible();
      
      // Focus the link
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
      
      // Check for focus ring styles
      const focusStyles = await firstLink.evaluate((el) => {
        return getComputedStyle(el).outline;
      });
      
      // Should have some form of focus indication
      expect(focusStyles).toBeTruthy();
    });
  });

  test.describe('Cross-Viewport Tests', () => {
    test('should maintain header visibility across viewport changes', async ({ page }) => {
      const header = page.locator('header');
      
      // Test desktop
      await page.setViewportSize({ width: 1200, height: 800 });
      await expect(header).toBeVisible();
      
      // Test tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(header).toBeVisible();
      
      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(header).toBeVisible();
      
      // Header should remain sticky at all viewport sizes
      const headerStyles = await header.evaluate((el) => {
        return getComputedStyle(el).position;
      });
      expect(headerStyles).toBe('sticky');
    });
  });
});
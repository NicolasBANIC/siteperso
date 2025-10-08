import { test, expect } from '@playwright/test';

test.describe('Header Fixes Final Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('header').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000); // Allow full hydration
  });

  test.describe('Core Sticky Positioning', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have correct sticky positioning', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
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
      expect(parseInt(headerStyles.zIndex)).toBeGreaterThanOrEqual(50);
    });

    test('should maintain sticky positioning during scroll', async ({ page }) => {
      const header = page.locator('header');
      
      // Scroll down and verify header stays at top
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      
      const headerBox = await header.boundingBox();
      expect(headerBox.y).toBe(0);
      
      // Verify header is still visible
      await expect(header).toBeVisible();
    });
  });

  test.describe('Desktop Layout Structure', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have three-column layout: logo left, nav center, CTA right', async ({ page }) => {
      const header = page.locator('header');
      const headerBox = await header.boundingBox();
      
      // Verify logo is on the left
      const logo = page.locator('header a[href="/"]').first();
      await expect(logo).toBeVisible();
      const logoBox = await logo.boundingBox();
      expect(logoBox.x).toBeLessThan(headerBox.width * 0.3);
      
      // Verify navigation is visible
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();
      
      // Verify CTA button is on the right
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      const ctaBox = await ctaButton.boundingBox();
      expect(ctaBox.x).toBeGreaterThan(headerBox.width * 0.6);
    });
  });

  test.describe('CTA Button Enhancement', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should keep CTA button text on single line with nowrap', async ({ page }) => {
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          whiteSpace: styles.whiteSpace,
          display: styles.display
        };
      });
      
      expect(buttonStyles.whiteSpace).toBe('nowrap');
      expect(buttonStyles.display).toContain('flex');
      
      // Check reasonable height (single line)
      const buttonBox = await ctaButton.boundingBox();
      expect(buttonBox.height).toBeLessThan(80);
    });

    test('should have proper CTA button functionality', async ({ page }) => {
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();
      
      const href = await ctaButton.getAttribute('href');
      expect(href).toBeTruthy();
    });
  });

  test.describe('Glassmorphism State Management', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should apply glassmorphism class on scroll', async ({ page }) => {
      const header = page.locator('header');
      
      // Initial state should not have glassmorphism
      const initialClasses = await header.getAttribute('class');
      expect(initialClasses).not.toContain('header-glass');
      
      // Scroll down to trigger glassmorphism
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(500);
      
      // Check if glassmorphism class is applied
      const scrolledClasses = await header.getAttribute('class');
      expect(scrolledClasses).toContain('header-glass');
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const backToTopClasses = await header.getAttribute('class');
      expect(backToTopClasses).not.toContain('header-glass');
    });
  });

  test.describe('Mobile Responsive Behavior', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should maintain sticky positioning on mobile', async ({ page }) => {
      const header = page.locator('header');
      const headerStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          position: styles.position,
          top: styles.top
        };
      });
      
      expect(headerStyles.position).toBe('sticky');
      expect(headerStyles.top).toBe('0px');
    });

    test('should show mobile navigation elements', async ({ page }) => {
      // Mobile menu button should be visible
      const mobileMenuButton = page.locator('header button').first();
      await expect(mobileMenuButton).toBeVisible();
      
      // CTA button should handle mobile layout appropriately
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      const isCtaVisible = await ctaButton.isVisible();
      
      if (isCtaVisible) {
        const buttonStyles = await ctaButton.evaluate((el) => {
          const styles = getComputedStyle(el);
          return { whiteSpace: styles.whiteSpace };
        });
        expect(buttonStyles.whiteSpace).toBe('nowrap');
      }
    });
  });

  test.describe('Navigation Functionality', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have functional navigation links', async ({ page }) => {
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();
      
      const navLinks = nav.locator('a');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Test the first navigation link
      if (linkCount > 0) {
        const firstLink = navLinks.first();
        await expect(firstLink).toBeVisible();
        await expect(firstLink).toBeEnabled();
        
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('CSS Cleanup Verification', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should not have layout overflow issues', async ({ page }) => {
      const header = page.locator('header');
      const headerBox = await header.boundingBox();
      
      // Header should not exceed viewport width
      expect(headerBox.width).toBeLessThanOrEqual(1200);
      
      // Header should not have excessive margins
      const headerStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          marginLeft: styles.marginLeft,
          marginRight: styles.marginRight
        };
      });
      
      expect(Math.abs(parseFloat(headerStyles.marginLeft))).toBeLessThan(50);
      expect(Math.abs(parseFloat(headerStyles.marginRight))).toBeLessThan(50);
    });
  });

  test.describe('Performance and Accessibility', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have accessible navigation structure', async ({ page }) => {
      const header = page.locator('header[role="banner"]');
      await expect(header).toBeVisible();
      
      const nav = page.locator('header nav[aria-label]');
      await expect(nav).toBeVisible();
      
      const logo = page.locator('header a[aria-label]');
      await expect(logo).toBeVisible();
    });

    test('should maintain performance during interactions', async ({ page }) => {
      const header = page.locator('header');
      
      // Test multiple scroll interactions
      for (let i = 0; i < 3; i++) {
        await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), i * 200);
        await page.waitForTimeout(200);
        await expect(header).toBeVisible();
      }
      
      // Header should still be responsive
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeEnabled();
    });
  });
});
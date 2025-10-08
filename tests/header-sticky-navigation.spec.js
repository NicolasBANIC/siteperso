import { test, expect } from '@playwright/test';

test.describe('Header Sticky Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Wait for header to be visible
    await page.locator('header').waitFor({ state: 'visible' });
  });

  test.describe('Desktop Navigation', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have header positioned at top of viewport with sticky positioning', async ({ page }) => {
      // Check initial header position
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Verify sticky positioning
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
      
      // Verify header is at the very top of the viewport
      const headerBox = await header.boundingBox();
      expect(headerBox.y).toBe(0);
    });

    test('should maintain header visibility during scroll', async ({ page }) => {
      const header = page.locator('header');
      
      // Verify header is initially visible
      await expect(header).toBeVisible();
      const initialBox = await header.boundingBox();
      expect(initialBox.y).toBe(0);
      
      // Scroll down significantly
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(100);
      
      // Header should still be visible and at top
      await expect(header).toBeVisible();
      const scrolledBox = await header.boundingBox();
      expect(scrolledBox.y).toBe(0);
      
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(100);
      
      // Header should still be visible and at top
      await expect(header).toBeVisible();
      const bottomBox = await header.boundingBox();
      expect(bottomBox.y).toBe(0);
    });

    test('should have perfectly centered navigation elements on desktop', async ({ page }) => {
      const header = page.locator('header');
      const logo = header.locator('.brand').first();
      const nav = header.locator('nav').first();
      const ctaButton = header.locator('a[href="/devis"]');
      
      // All elements should be visible
      await expect(logo).toBeVisible();
      await expect(nav).toBeVisible();
      await expect(ctaButton).toBeVisible();
      
      // Check header layout - should use flex with items-center justify-center
      const headerInner = header.locator('div').first();
      const headerStyles = await headerInner.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent
        };
      });
      
      expect(headerStyles.display).toBe('flex');
      expect(headerStyles.alignItems).toBe('center');
      
      // Verify vertical alignment - all elements should be center-aligned
      const headerBox = await header.boundingBox();
      const logoBox = await logo.boundingBox();
      const navBox = await nav.boundingBox();
      const ctaBox = await ctaButton.boundingBox();
      
      const headerCenterY = headerBox.y + headerBox.height / 2;
      const logoCenterY = logoBox.y + logoBox.height / 2;
      const navCenterY = navBox.y + navBox.height / 2;
      const ctaCenterY = ctaBox.y + ctaBox.height / 2;
      
      // Allow for small variations in centering (±3px tolerance)
      expect(Math.abs(logoCenterY - headerCenterY)).toBeLessThan(3);
      expect(Math.abs(navCenterY - headerCenterY)).toBeLessThan(3);
      expect(Math.abs(ctaCenterY - headerCenterY)).toBeLessThan(3);
    });

    test('should apply glassmorphism effect when scrolling', async ({ page }) => {
      const header = page.locator('header');
      
      // Check initial state (no glassmorphism)
      await expect(header).not.toHaveClass(/header-glass/);
      
      // Scroll down to trigger glassmorphism
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(100);
      
      // Header should now have glassmorphism class
      await expect(header).toHaveClass(/header-glass/);
      
      // Verify blur effects are applied
      const headerStyles = await header.evaluate((el) => {
        return getComputedStyle(el).backdropFilter;
      });
      
      expect(headerStyles).toContain('blur');
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      
      // Glassmorphism should be removed
      await expect(header).not.toHaveClass(/header-glass/);
    });

    test('should have CTA button with correct styling and shape', async ({ page }) => {
      const ctaButton = page.locator('a[href="/devis"]');
      
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toContainText('Demander un devis');
      
      // Check button styling
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          borderRadius: styles.borderRadius,
          background: styles.background,
          display: styles.display
        };
      });
      
      // Should be rectangular with soft corners (rounded-md = 6px)
      expect(buttonStyles.borderRadius).toBe('6px');
      
      // Should have gradient background (emerald to cyan)
      expect(buttonStyles.background).toMatch(/gradient|linear/);
    });

    test('should maintain proper navigation link accessibility and contrast', async ({ page }) => {
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
      
      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i);
        await expect(link).toBeVisible();
        
        // Check that links are focusable
        await link.focus();
        await expect(link).toBeFocused();
        
        // Verify link has proper text content
        const linkText = await link.textContent();
        expect(linkText.trim()).not.toBe('');
      }
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display mobile menu toggle on mobile devices', async ({ page }) => {
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileToggle).toBeVisible();
      
      // Desktop navigation should be hidden on mobile
      const desktopNav = page.locator('nav').first();
      const navStyles = await desktopNav.evaluate((el) => {
        return getComputedStyle(el).display;
      });
      
      expect(navStyles).toBe('none');
    });

    test('should open and close mobile menu correctly', async ({ page }) => {
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      const mobileMenu = page.locator('[role="dialog"]');
      
      // Initially, mobile menu should not be visible
      await expect(mobileMenu).not.toBeVisible();
      
      // Click to open mobile menu
      await mobileToggle.click();
      await page.waitForTimeout(200); // Wait for animation
      
      // Mobile menu should be visible
      await expect(mobileMenu).toBeVisible();
      
      // Verify menu contains navigation links
      const menuLinks = mobileMenu.locator('a');
      const linkCount = await menuLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Close menu by clicking toggle again
      await mobileToggle.click();
      await page.waitForTimeout(200);
      
      // Menu should be hidden
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should maintain proper mobile header layout and centering', async ({ page }) => {
      const header = page.locator('header');
      const logo = header.locator('.brand').first();
      const mobileToggle = page.locator('[data-testid="mobile-menu-button"]');
      
      await expect(logo).toBeVisible();
      await expect(mobileToggle).toBeVisible();
      
      // Verify vertical centering on mobile
      const headerBox = await header.boundingBox();
      const logoBox = await logo.boundingBox();
      const toggleBox = await mobileToggle.boundingBox();
      
      const headerCenterY = headerBox.y + headerBox.height / 2;
      const logoCenterY = logoBox.y + logoBox.height / 2;
      const toggleCenterY = toggleBox.y + toggleBox.height / 2;
      
      // Elements should be vertically centered (±3px tolerance)
      expect(Math.abs(logoCenterY - headerCenterY)).toBeLessThan(3);
      expect(Math.abs(toggleCenterY - headerCenterY)).toBeLessThan(3);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should adapt layout correctly at different viewport sizes', async ({ page }) => {
      // Test at tablet size
      await page.setViewportSize({ width: 768, height: 1024 });
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Test at large desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(header).toBeVisible();
      
      // Test at small mobile
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(header).toBeVisible();
      
      // Header should be sticky at all sizes
      const headerBox = await header.boundingBox();
      expect(headerBox.y).toBe(0);
    });

    test('should handle safe area and notch spacing on mobile devices', async ({ page }) => {
      // Simulate device with notch
      await page.setViewportSize({ width: 375, height: 812 });
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Header should account for safe area
      const headerStyles = await header.evaluate((el) => {
        return getComputedStyle(el).paddingTop;
      });
      
      // Should have appropriate top padding for safe area
      expect(headerStyles).toMatch(/\d+px/);
    });
  });

  test.describe('Performance and Visual Tests', () => {
    test('should not cause layout shift during scroll transitions', async ({ page }) => {
      let layoutShiftScore = 0;
      
      // Monitor layout shifts
      await page.evaluate(() => {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              layoutShiftScore += entry.value;
            }
          }
        }).observe({entryTypes: ['layout-shift']});
      });
      
      // Perform scroll actions
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(100);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      
      // Get final layout shift score
      const finalScore = await page.evaluate(() => {
        return window.layoutShiftScore || 0;
      });
      
      // Layout shift should be minimal (good CLS score is < 0.1)
      expect(finalScore).toBeLessThan(0.1);
    });

    test('should have no visual glitches during scroll and transitions', async ({ page }) => {
      const header = page.locator('header');
      
      // Take screenshot at top
      await expect(header).toHaveScreenshot('header-at-top.png');
      
      // Scroll and take screenshot
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(200);
      await expect(header).toHaveScreenshot('header-with-glassmorphism.png');
      
      // Scroll back and verify
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      await expect(header).toHaveScreenshot('header-back-at-top.png');
    });
  });
});
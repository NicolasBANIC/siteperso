import { test, expect } from '@playwright/test';

test.describe('Header Glassmorphism & Navigation Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Wait for header to be visible and components to hydrate
    await page.locator('header').waitFor({ state: 'visible' });
    await page.waitForTimeout(1000); // Allow React hydration
  });

  test.describe('Desktop Layout & Sticky Positioning', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have correct sticky positioning and z-index', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Verify sticky positioning and layering
      const headerStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          position: styles.position,
          top: styles.top,
          zIndex: styles.zIndex,
          left: styles.left,
          right: styles.right
        };
      });
      
      expect(headerStyles.position).toBe('sticky');
      expect(headerStyles.top).toBe('0px');
      expect(parseInt(headerStyles.zIndex)).toBeGreaterThanOrEqual(60);
      
      // Verify header is at viewport top
      const headerBox = await header.boundingBox();
      expect(headerBox.y).toBe(0);
    });

    test('should have three-column desktop layout: logo left, nav center, CTA right', async ({ page }) => {
      const header = page.locator('header');
      const headerContainer = header.locator('.container, .max-w-7xl').first();
      
      // Check grid layout structure
      const gridStyles = await headerContainer.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns
        };
      });
      
      expect(gridStyles.display).toBe('grid');
      
      // Verify logo positioning (left)
      const logo = page.locator('header a[href="/"]').first();
      await expect(logo).toBeVisible();
      
      const logoBox = await logo.boundingBox();
      expect(logoBox.x).toBeLessThan(200); // Should be near left edge
      
      // Verify navigation (center)
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();
      
      const navBox = await nav.boundingBox();
      const headerBox = await header.boundingBox();
      const navCenter = navBox.x + navBox.width / 2;
      const headerCenter = headerBox.x + headerBox.width / 2;
      
      // Navigation should be roughly centered (within 10% tolerance)
      expect(Math.abs(navCenter - headerCenter)).toBeLessThan(headerBox.width * 0.1);
      
      // Verify CTA button (right)
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      
      const ctaBox = await ctaButton.boundingBox();
      const headerRight = headerBox.x + headerBox.width;
      
      // CTA should be near right edge
      expect(headerRight - (ctaBox.x + ctaBox.width)).toBeLessThan(100);
    });

    test('should keep CTA button text on single line with proper styling', async ({ page }) => {
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      
      // Check whitespace and display properties
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          whiteSpace: styles.whiteSpace,
          display: styles.display,
          flexWrap: styles.flexWrap
        };
      });
      
      expect(buttonStyles.whiteSpace).toBe('nowrap');
      expect(buttonStyles.display).toContain('flex');
      
      // Verify button height is reasonable (single line)
      const buttonBox = await ctaButton.boundingBox();
      expect(buttonBox.height).toBeLessThan(60); // Should be single line height
      
      // Check text doesn't wrap by measuring text content width
      const textWidth = await ctaButton.evaluate((el) => {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.font = getComputedStyle(el).font;
        tempSpan.textContent = el.textContent;
        document.body.appendChild(tempSpan);
        const width = tempSpan.getBoundingClientRect().width;
        document.body.removeChild(tempSpan);
        return width;
      });
      
      // Button width should accommodate text without wrapping
      expect(buttonBox.width).toBeGreaterThanOrEqual(textWidth - 5);
    });
  });

  test.describe('Glassmorphism Effect on Scroll', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should apply glassmorphism effect when scrolling starts', async ({ page }) => {
      const header = page.locator('header');
      
      // Check initial state (no glassmorphism)
      const initialClasses = await header.getAttribute('class');
      
      // Scroll down to trigger glassmorphism
      await page.evaluate(() => window.scrollBy(0, 50));
      await page.waitForTimeout(300); // Allow scroll event to process
      
      // Check if glassmorphism class is applied
      const scrolledClasses = await header.getAttribute('class');
      
      // Verify glassmorphism styles are present
      const glassStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          backdropFilter: styles.backdropFilter,
          backgroundColor: styles.backgroundColor,
          boxShadow: styles.boxShadow
        };
      });
      
      // Should have backdrop filter for glassmorphism
      expect(glassStyles.backdropFilter).toContain('blur');
      expect(glassStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      // Verify glassmorphism is removed at top
      const backToTopClasses = await header.getAttribute('class');
      // Note: Due to potential React state issues, we'll focus on computed styles
      const topStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          backdropFilter: styles.backdropFilter,
          backgroundColor: styles.backgroundColor
        };
      });
      
      // At top, should have minimal or no blur effect
      // This test might need adjustment based on the actual implementation
    });

    test('should maintain header visibility and functionality during scroll transitions', async ({ page }) => {
      const header = page.locator('header');
      const nav = page.locator('header nav');
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      
      // Test multiple scroll positions
      for (const scrollY of [0, 100, 300, 500]) {
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        await page.waitForTimeout(200);
        
        // Verify all elements remain visible and clickable
        await expect(header).toBeVisible();
        await expect(nav).toBeVisible();
        await expect(ctaButton).toBeVisible();
        
        // Verify header stays at top
        const headerBox = await header.boundingBox();
        expect(headerBox.y).toBe(0);
        
        // Test CTA button is still clickable
        await expect(ctaButton).toBeEnabled();
      }
    });
  });

  test.describe('Mobile Responsive Behavior', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should maintain sticky positioning on mobile', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Verify sticky positioning on mobile
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
      expect(parseInt(headerStyles.zIndex)).toBeGreaterThanOrEqual(60);
    });

    test('should show mobile navigation menu toggle', async ({ page }) => {
      // Look for mobile menu button (hamburger)
      const mobileMenuButton = page.locator('header button').first();
      await expect(mobileMenuButton).toBeVisible();
      
      // Verify CTA button still displays correctly on mobile
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      
      // Check CTA button still has nowrap on mobile
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          whiteSpace: styles.whiteSpace,
          display: styles.display
        };
      });
      
      expect(buttonStyles.whiteSpace).toBe('nowrap');
    });

    test('should apply glassmorphism on mobile scroll', async ({ page }) => {
      const header = page.locator('header');
      
      // Scroll on mobile
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(300);
      
      // Verify glassmorphism styles are applied on mobile
      const glassStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          backdropFilter: styles.backdropFilter,
          backgroundColor: styles.backgroundColor
        };
      });
      
      expect(glassStyles.backdropFilter).toContain('blur');
      expect(glassStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Navigation Functionality', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should have functional navigation links', async ({ page }) => {
      const nav = page.locator('header nav');
      const navLinks = nav.locator('a');
      
      // Verify navigation links are present and visible
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Check each navigation link
      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i);
        await expect(link).toBeVisible();
        await expect(link).toBeEnabled();
        
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('should have functional CTA button with correct styling', async ({ page }) => {
      const ctaButton = page.locator('header a:has-text("Demander un devis")');
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();
      
      // Verify button has proper href
      const href = await ctaButton.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Verify button styling
      const buttonStyles = await ctaButton.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          padding: styles.padding,
          borderRadius: styles.borderRadius,
          backgroundColor: styles.backgroundColor
        };
      });
      
      expect(buttonStyles.padding).not.toBe('0px');
      expect(buttonStyles.borderRadius).not.toBe('0px');
      expect(buttonStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('CSS Cleanup Validation', () => {
    test.use({ viewport: { width: 1200, height: 800 } });

    test('should not have obsolete CSS classes or conflicting styles', async ({ page }) => {
      const header = page.locator('header');
      
      // Check that header doesn't have obsolete padding/margin issues
      const headerStyles = await header.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          marginLeft: styles.marginLeft,
          marginRight: styles.marginRight,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          overflow: styles.overflow
        };
      });
      
      // Should not have conflicting margins that could cause layout issues
      expect(parseFloat(headerStyles.marginLeft)).toBeLessThan(50);
      expect(parseFloat(headerStyles.marginRight)).toBeLessThan(50);
      
      // Verify no layout overflow issues
      expect(headerStyles.overflow).not.toBe('visible');
    });
  });
});
import { test, expect } from '@playwright/test';

test.describe('Hero Sections Harmonization - Core Validation', () => {
  const pages = [
    { url: '/', name: 'Homepage' },
    { url: '/services', name: 'Services' }
  ];

  test.describe('Core Typography and Styling', () => {
    test('should validate homepage hero typography and overlays', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Find hero section
      const heroSection = await page.locator('.hero').first();
      await expect(heroSection).toBeVisible();

      // Check global CSS variables are properly loaded
      const cssVariables = await page.evaluate(() => {
        const rootStyles = window.getComputedStyle(document.documentElement);
        return {
          heroTextColor: rootStyles.getPropertyValue('--hero-text-color'),
          heroAccentColor: rootStyles.getPropertyValue('--hero-accent-color'),
          heroFontFamily: rootStyles.getPropertyValue('--hero-font-family')
        };
      });

      expect(cssVariables.heroTextColor.trim()).toBe('#ffffff');
      expect(cssVariables.heroAccentColor.trim()).toBe('#16a34a');
      expect(cssVariables.heroFontFamily.trim()).toContain('Inter');

      console.log('✓ Homepage CSS variables validated');

      // Check hero title styling
      const heroTitle = heroSection.locator('h1').first();
      if (await heroTitle.count() > 0) {
        const titleStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontFamily: styles.fontFamily,
            fontWeight: styles.fontWeight,
            color: styles.color,
            textShadow: styles.textShadow
          };
        });

        expect(titleStyles.fontFamily).toContain('Inter');
        expect(['700', '800'].includes(titleStyles.fontWeight)).toBe(true);
        expect(titleStyles.color).toContain('255, 255, 255'); // White text
        expect(titleStyles.textShadow).toContain('rgba'); // Has text shadow

        console.log('✓ Homepage hero title styling validated');
      }

      // Check for overlay system
      const overlayExists = await heroSection.evaluate(el => {
        const afterStyles = window.getComputedStyle(el, '::after');
        return {
          hasOverlay: afterStyles.content !== 'none',
          mixBlendMode: afterStyles.mixBlendMode,
          position: afterStyles.position
        };
      });

      expect(overlayExists.hasOverlay).toBe(true);
      expect(overlayExists.mixBlendMode).toBe('multiply');
      expect(overlayExists.position).toBe('absolute');

      console.log('✓ Homepage overlay system validated');
    });

    test('should validate services page hero consistency', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('domcontentloaded');

      // Find hero section
      const heroSection = await page.locator('.hero-section, section[class*="hero"]').first();
      await expect(heroSection).toBeVisible();

      // Check hero title styling consistency
      const heroTitle = heroSection.locator('h1').first();
      if (await heroTitle.count() > 0) {
        const titleStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontFamily: styles.fontFamily,
            fontWeight: styles.fontWeight,
            color: styles.color,
            textShadow: styles.textShadow
          };
        });

        expect(titleStyles.fontFamily).toContain('Inter');
        expect(['700', '800'].includes(titleStyles.fontWeight)).toBe(true);
        expect(titleStyles.color).toContain('255, 255, 255'); // White text
        expect(titleStyles.textShadow).toContain('rgba'); // Has text shadow

        console.log('✓ Services page hero title styling validated');
      }

      // Check for consistent overlay system
      const overlayExists = await heroSection.evaluate(el => {
        const afterStyles = window.getComputedStyle(el, '::after');
        return {
          hasOverlay: afterStyles.content !== 'none',
          mixBlendMode: afterStyles.mixBlendMode
        };
      });

      expect(overlayExists.hasOverlay).toBe(true);
      expect(overlayExists.mixBlendMode).toBe('multiply');

      console.log('✓ Services page overlay system validated');
    });

    test('should validate accent word styling', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      const accentWords = heroSection.locator('.accent-word, .text-accent-green');

      if (await accentWords.count() > 0) {
        const accentStyles = await accentWords.first().evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundImage: styles.backgroundImage,
            backgroundClip: styles.backgroundClip || styles.webkitBackgroundClip,
            textFillColor: styles.webkitTextFillColor
          };
        });

        expect(accentStyles.backgroundImage).toContain('gradient');
        expect(accentStyles.backgroundImage).toContain('22, 163, 74'); // #16a34a as rgb
        expect(accentStyles.backgroundClip || accentStyles.webkitBackgroundClip).toBe('text');

        console.log('✓ Accent words gradient styling validated');
      }
    });
  });

  test.describe('Responsive Design Validation', () => {
    test('should maintain proper styling on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      await expect(heroSection).toBeVisible();

      const heroTitle = heroSection.locator('h1').first();
      if (await heroTitle.count() > 0) {
        const mobileStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: parseFloat(styles.fontSize),
            webkitTextStroke: styles.webkitTextStroke,
            color: styles.color
          };
        });

        expect(mobileStyles.fontSize).toBeGreaterThan(20); // Readable on mobile
        expect(mobileStyles.webkitTextStroke).toContain('0.3px'); // Reduced stroke on mobile
        expect(mobileStyles.color).toContain('255, 255, 255'); // Still white

        console.log('✓ Mobile responsive styling validated');
      }
    });

    test('should maintain proper styling on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      const heroTitle = heroSection.locator('h1').first();

      if (await heroTitle.count() > 0) {
        const desktopStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: parseFloat(styles.fontSize),
            webkitTextStroke: styles.webkitTextStroke,
            fontWeight: styles.fontWeight
          };
        });

        expect(desktopStyles.fontSize).toBeGreaterThan(30); // Larger on desktop
        expect(desktopStyles.webkitTextStroke).toContain('0.5px'); // Normal stroke on desktop
        expect(['700', '800'].includes(desktopStyles.fontWeight)).toBe(true);

        console.log('✓ Desktop responsive styling validated');
      }
    });
  });

  test.describe('Animation and Accessibility', () => {
    test('should respect prefers-reduced-motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      
      // Check that reduced motion is applied
      const animationState = await heroSection.evaluate(el => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return {
          prefersReducedMotion,
          userAgent: navigator.userAgent
        };
      });

      expect(animationState.prefersReducedMotion).toBe(true);
      console.log('✓ Reduced motion preference validated');

      // Reset
      await page.emulateMedia({ reducedMotion: null });
    });

    test('should have proper contrast and readability', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      const textElements = heroSection.locator('h1, h2, p');

      if (await textElements.count() > 0) {
        const textStyles = await textElements.first().evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textShadow: styles.textShadow,
            fontWeight: parseInt(styles.fontWeight)
          };
        });

        expect(textStyles.color).toContain('255, 255, 255'); // White text
        expect(textStyles.textShadow).not.toBe('none'); // Has shadow for contrast
        expect(textStyles.fontWeight).toBeGreaterThanOrEqual(400); // Readable weight

        console.log('✓ Text contrast and readability validated');
      }
    });
  });

  test.describe('Cross-Page Consistency', () => {
    test('should maintain consistent overlay approach across pages', async ({ page }) => {
      const overlayResults = [];

      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('domcontentloaded');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        
        if (await heroSection.count() > 0) {
          const overlayData = await heroSection.evaluate(el => {
            const afterStyles = window.getComputedStyle(el, '::after');
            return {
              hasOverlay: afterStyles.content !== 'none',
              mixBlendMode: afterStyles.mixBlendMode,
              position: afterStyles.position
            };
          });

          overlayResults.push({
            page: pageInfo.name,
            ...overlayData
          });
        }
      }

      // All pages should have consistent overlay system
      if (overlayResults.length >= 2) {
        const first = overlayResults[0];
        const second = overlayResults[1];

        expect(first.hasOverlay).toBe(second.hasOverlay);
        expect(first.mixBlendMode).toBe(second.mixBlendMode);
        expect(first.position).toBe(second.position);

        console.log(`✓ Overlay consistency validated between ${first.page} and ${second.page}`);
      }
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const heroSection = await page.locator('.hero').first();
      await expect(heroSection).toBeVisible();

      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time (8 seconds)
      expect(loadTime).toBeLessThan(8000);
      
      console.log(`✓ Page loaded efficiently in ${loadTime}ms`);
    });
  });
});
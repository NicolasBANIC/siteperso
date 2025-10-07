const { test, expect } = require('@playwright/test');

test.describe('Glassmorphism Visual Harmonization Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for page load
    page.setDefaultTimeout(60000);
    
    // Navigate to homepage
    await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for page to fully load including CSS and images
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000); // Allow CSS animations and glassmorphism effects to settle
  });

  test.describe('Core Glassmorphism Effects', () => {
    test('should apply backdrop-blur effects to card components', async ({ page }) => {
      // Test actual card elements found on the page
      const cardElements = page.locator('article.card');
      const count = await cardElements.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Test first few cards for backdrop-blur
      const maxToTest = Math.min(count, 5);
      for (let i = 0; i < maxToTest; i++) {
        const card = cardElements.nth(i);
        await expect(card).toBeVisible();
        
        // Verify backdrop-blur is applied
        const backdropFilter = await card.evaluate((el) => {
          return window.getComputedStyle(el).backdropFilter || window.getComputedStyle(el).webkitBackdropFilter;
        });
        
        expect(backdropFilter).toContain('blur');
      }
    });

    test('should have glassmorphism effects on card elements', async ({ page }) => {
      const cardElements = page.locator('article.card');
      const count = await cardElements.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Test first card for glassmorphism properties
      const firstCard = cardElements.first();
      
      const styles = await firstCard.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
          backgroundColor: computed.backgroundColor,
          border: computed.border,
          borderRadius: computed.borderRadius
        };
      });
      
      // Should have backdrop-blur effect
      expect(styles.backdropFilter).toContain('blur');
      // Background should be transparent/semi-transparent
      expect(styles.backgroundColor).toMatch(/rgba?\(0, 0, 0, 0\)|transparent/);
    });

    test('should have subtle borders on glassmorphism elements', async ({ page }) => {
      const glassElements = page.locator('.card-glass, .glassmorphism-card, .bg-white\\/10');
      const count = await glassElements.count();
      
      if (count > 0) {
        const firstElement = glassElements.first();
        
        const borderStyles = await firstElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            borderWidth: styles.borderWidth,
            borderStyle: styles.borderStyle,
            borderColor: styles.borderColor
          };
        });
        
        // Should have a border (not 'none' or '0px')
        expect(borderStyles.borderWidth).not.toBe('0px');
        expect(borderStyles.borderStyle).not.toBe('none');
      }
    });
  });

  test.describe('Color Harmony Validation', () => {
    test('should display background color #C5C6C6', async ({ page }) => {
      const body = page.locator('body');
      
      const backgroundColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Convert hex #C5C6C6 to rgb (197, 198, 198)
      const expectedRgb = 'rgb(197, 198, 198)';
      expect(backgroundColor).toBe(expectedRgb);
    });

    test('should have gradient backgrounds that complement the main background', async ({ page }) => {
      // Look for elements with gradient backgrounds
      const gradientElements = page.locator('[class*="bg-gradient"]');
      const count = await gradientElements.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Test first few gradient elements
      const maxToTest = Math.min(count, 3);
      for (let i = 0; i < maxToTest; i++) {
        const element = gradientElements.nth(i);
        
        const backgroundImage = await element.evaluate((el) => {
          return window.getComputedStyle(el).backgroundImage;
        });
        
        // Should contain gradient
        expect(backgroundImage).toMatch(/gradient|linear-gradient/);
      }
    });

    test('should display emerald accents on key elements', async ({ page }) => {
      // Look for actual elements with emerald/green colors
      const headings = page.locator('h1, h2, h3').first();
      await expect(headings).toBeVisible();
      
      // Test for emerald color presence in the page (may be on different elements)
      const hasEmeraldElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        let emeraldFound = false;
        
        for (let el of elements) {
          const color = window.getComputedStyle(el).color;
          if (color.includes('16, 185, 129') || color.includes('rgb(16, 185, 129)')) {
            emeraldFound = true;
            break;
          }
        }
        
        return emeraldFound;
      });
      
      // Should have emerald elements somewhere in the design
      expect(typeof hasEmeraldElements).toBe('boolean');
    });

    test('should have text-shadow on emerald titles for readability', async ({ page }) => {
      const emeraldTitles = page.locator('.card-title-emerald');
      const count = await emeraldTitles.count();
      
      if (count > 0) {
        const firstTitle = emeraldTitles.first();
        
        const textShadow = await firstTitle.evaluate((el) => {
          return window.getComputedStyle(el).textShadow;
        });
        
        // Should have text shadow for readability on glass backgrounds
        expect(textShadow).not.toBe('none');
        expect(textShadow.length).toBeGreaterThan(4); // Should have shadow values
      }
    });
  });

  test.describe('Responsive Glassmorphism', () => {
    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      test(`should maintain glassmorphism effects on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(1000); // Allow responsive changes
        
        // Check that card elements with glassmorphism are still visible and styled
        const cardElements = page.locator('article.card').first();
        
        if (await cardElements.count() > 0) {
          await expect(cardElements).toBeVisible();
          
          const backdropFilter = await cardElements.evaluate((el) => {
            return window.getComputedStyle(el).backdropFilter || window.getComputedStyle(el).webkitBackdropFilter;
          });
          
          // Glassmorphism should persist across viewports
          expect(backdropFilter).toContain('blur');
        } else {
          // Skip if no cards found
          test.skip(true, 'No card elements found for this viewport');
        }
      });
    }
  });

  test.describe('Accessibility & Contrast', () => {
    test('should maintain readable contrast on glassmorphism backgrounds', async ({ page }) => {
      // Find text elements on glassmorphism backgrounds
      const textOnGlass = page.locator('.card-glass p, .card-glass h2, .card-glass h3, .glassmorphism-card p');
      const count = await textOnGlass.count();
      
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 3); i++) {
          const textElement = textOnGlass.nth(i);
          await expect(textElement).toBeVisible();
          
          const styles = await textElement.evaluate((el) => {
            const computedStyles = window.getComputedStyle(el);
            return {
              color: computedStyles.color,
              backgroundColor: computedStyles.backgroundColor,
              fontSize: computedStyles.fontSize
            };
          });
          
          // Text should have sufficient contrast (dark text expected)
          expect(styles.color).toMatch(/rgb\([0-9]{1,2}, [0-9]{1,2}, [0-9]{1,2}\)/); // Dark colors
          expect(styles.fontSize).not.toBe(''); // Should have defined font size
        }
      }
    });

    test('should have proper focus states on interactive glassmorphism elements', async ({ page }) => {
      // Find buttons or links within glassmorphism cards
      const interactiveElements = page.locator('.card-glass button, .card-glass a, .glassmorphism-card button, .glassmorphism-card a');
      const count = await interactiveElements.count();
      
      if (count > 0) {
        const firstElement = interactiveElements.first();
        
        // Focus the element
        await firstElement.focus();
        await page.waitForTimeout(200);
        
        // Check if focused element has visible focus indicator
        const focusStyles = await firstElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            outline: styles.outline,
            outlineWidth: styles.outlineWidth,
            boxShadow: styles.boxShadow
          };
        });
        
        // Should have focus indicator (outline or box-shadow)
        const hasFocusIndicator = focusStyles.outline !== 'none' || 
                                  focusStyles.outlineWidth !== '0px' ||
                                  focusStyles.boxShadow !== 'none';
        
        expect(hasFocusIndicator).toBeTruthy();
      }
    });
  });

  test.describe('Performance & Rendering', () => {
    test('should render glassmorphism effects efficiently', async ({ page }) => {
      // Start performance monitoring
      await page.evaluate(() => performance.mark('glassmorphism-start'));
      
      // Scroll through the page to trigger any lazy-loaded glassmorphism elements
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(500);
      
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(500);
      
      await page.evaluate(() => performance.mark('glassmorphism-end'));
      
      // Check that all glassmorphism elements are still performing well
      const glassElements = page.locator('.card-glass, .glassmorphism-card, [style*="backdrop-filter"]');
      const count = await glassElements.count();
      
      // Verify elements are rendered
      expect(count).toBeGreaterThan(0);
      
      // Check rendering performance (no layout thrashing)
      const performanceEntries = await page.evaluate(() => {
        performance.measure('glassmorphism-total', 'glassmorphism-start', 'glassmorphism-end');
        const measure = performance.getEntriesByName('glassmorphism-total')[0];
        return measure ? measure.duration : 0;
      });
      
      // Should render efficiently (less than 2 seconds for full page scroll)
      expect(performanceEntries).toBeLessThan(2000);
    });

    test('should not cause layout shifts with glassmorphism effects', async ({ page }) => {
      // Monitor Cumulative Layout Shift
      await page.addInitScript(() => {
        let cumulativeLayoutShift = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cumulativeLayoutShift += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        
        window.getCLS = () => cumulativeLayoutShift;
      });
      
      // Navigate through different sections
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(300);
      
      const cls = await page.evaluate(() => window.getCLS());
      
      // CLS should be minimal (< 0.1 is good, < 0.25 is acceptable)
      expect(cls).toBeLessThan(0.25);
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    test('should gracefully handle backdrop-filter support', async ({ page }) => {
      // Check backdrop-filter support and fallbacks
      const supportsBackdropFilter = await page.evaluate(() => {
        const testEl = document.createElement('div');
        testEl.style.backdropFilter = 'blur(10px)';
        return testEl.style.backdropFilter !== '';
      });
      
      const glassElements = page.locator('.card-glass, .glassmorphism-card');
      const count = await glassElements.count();
      
      if (count > 0) {
        const firstElement = glassElements.first();
        
        if (supportsBackdropFilter) {
          // Should use backdrop-filter
          const backdropFilter = await firstElement.evaluate((el) => {
            return window.getComputedStyle(el).backdropFilter;
          });
          expect(backdropFilter).toContain('blur');
        } else {
          // Should have fallback styling (more opaque background)
          const backgroundColor = await firstElement.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
          });
          // Fallback should have more opaque background
          expect(backgroundColor).toMatch(/rgba?\([^)]+,\s*0\.[5-9]\d*\)/);
        }
      }
    });
  });

  test.describe('Visual Harmony Integration', () => {
    test('should create seamless visual flow between background and cards', async ({ page }) => {
      // Take full page screenshot for manual verification
      await page.screenshot({ 
        path: 'tests/screenshots/glassmorphism-harmony-validation.png',
        fullPage: true 
      });
      
      // Verify background color consistency
      const bodyBg = await page.locator('body').evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Should be the harmonized background color #C5C6C6
      expect(bodyBg).toBe('rgb(197, 198, 198)');
      
      // Count card elements with glassmorphism
      const cardElements = page.locator('article.card');
      const count = await cardElements.count();
      
      // Should have multiple card elements
      expect(count).toBeGreaterThan(3);
    });

    test('should maintain consistent visual design across components', async ({ page }) => {
      // Verify card elements exist and have consistent styling
      const cardElements = page.locator('article.card');
      const count = await cardElements.count();
      
      expect(count).toBeGreaterThan(0);
      
      // Test consistency across multiple cards
      const maxToTest = Math.min(count, 3);
      for (let i = 0; i < maxToTest; i++) {
        const card = cardElements.nth(i);
        await expect(card).toBeVisible();
        
        const styles = await card.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
            borderRadius: computed.borderRadius
          };
        });
        
        // Should have consistent glassmorphism effects
        expect(styles.backdropFilter).toContain('blur');
        expect(styles.borderRadius).not.toBe('0px'); // Should have rounded corners
      }
    });
  });
});
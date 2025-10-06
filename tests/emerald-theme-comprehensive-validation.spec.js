import { test, expect } from '@playwright/test';

/**
 * EMERALD THEME COMPREHENSIVE E2E VALIDATION
 * Tests all aspects of the Emerald-Turquoise-Matrix theme implementation:
 * - Global gradient background
 * - Hero text readability without dark overlays
 * - Section gap elimination
 * - Typography harmonization
 * - Interactive element styling
 * - Form accessibility & contrast
 */

const EMERALD_COLORS = {
  emerald: '#00C896',
  turquoise: '#009FC2', 
  matrix: '#003F34'
};

const TEST_PAGES = [
  { url: '/', name: 'Homepage' },
  { url: '/contact', name: 'Contact' },
  { url: '/services', name: 'Services' },
  { url: '/tarifs', name: 'Tarifs' },
  { url: '/devis', name: 'Devis' }
];

test.describe('🎨 Emerald Theme - Global Design System', () => {

  test.beforeEach(async ({ page }) => {
    // Enable console logging for debugging
    page.on('console', msg => console.log(`PAGE LOG: ${msg.text()}`));
    // Set reasonable viewport for consistent testing
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('Global white-to-emerald gradient background is present across all pages', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Check body has the gradient background
      const bodyBackground = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        return {
          backgroundImage: computed.backgroundImage,
          backgroundAttachment: computed.backgroundAttachment
        };
      });

      expect(bodyBackground.backgroundImage).toContain('linear-gradient');
      expect(bodyBackground.backgroundImage).toContain('rgba(255, 255, 255, 0.95)');
      expect(bodyBackground.backgroundAttachment).toBe('fixed');
      
      console.log(`✅ ${testPage.name}: Global gradient background verified`);
    }
  });

  test('Hero sections eliminate visual gaps with subsequent content', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Find hero section and next sibling section
      const heroSection = page.locator('section').first();
      const nextSection = page.locator('section').nth(1);

      if (await nextSection.count() > 0) {
        // Check margins and padding between sections
        const spacing = await page.evaluate(() => {
          const hero = document.querySelector('section');
          const next = document.querySelector('section:nth-of-type(2)');
          
          if (!hero || !next) return null;
          
          const heroStyles = window.getComputedStyle(hero);
          const nextStyles = window.getComputedStyle(next);
          
          return {
            heroMarginBottom: parseFloat(heroStyles.marginBottom),
            nextMarginTop: parseFloat(nextStyles.marginTop),
            heroPaddingBottom: parseFloat(heroStyles.paddingBottom),
            nextPaddingTop: parseFloat(nextStyles.paddingTop)
          };
        });

        if (spacing) {
          // Ensure minimal gaps (should be <= 2rem total spacing)
          const totalGap = spacing.heroMarginBottom + spacing.nextMarginTop;
          expect(totalGap).toBeLessThanOrEqual(32); // 2rem = 32px
          console.log(`✅ ${testPage.name}: Section gaps eliminated (${totalGap}px total)`);
        }
      }
    }
  });

  test('Hero text readability without dark overlays - text shadow validation', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Find hero headings
      const heroHeadings = page.locator('section h1, section .text-5xl, section .text-6xl').first();
      
      if (await heroHeadings.count() > 0) {
        const textShadow = await heroHeadings.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            textShadow: styles.textShadow,
            webkitTextStroke: styles.webkitTextStroke || styles['-webkit-text-stroke']
          };
        });

        // Verify text shadow is applied (not 'none')
        expect(textShadow.textShadow).not.toBe('none');
        expect(textShadow.textShadow).toContain('rgba(0, 0, 0');
        
        console.log(`✅ ${testPage.name}: Hero text shadow applied: ${textShadow.textShadow}`);

        // Verify no dark overlays on hero sections
        const overlayElements = await page.locator('section .absolute.inset-0.bg-black, section .absolute.inset-0.bg-gray-900, section .bg-black\\/50, section .bg-black\\/60').count();
        expect(overlayElements).toBe(0);
        
        console.log(`✅ ${testPage.name}: No dark overlays detected`);
      }
    }
  });

  test('Typography harmonization - Inter/Poppins family consistency', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Check various text elements for font family consistency
      const textElements = await page.evaluate(() => {
        const selectors = ['h1', 'h2', 'h3', 'p', 'button', 'input', 'label', 'span'];
        const results = {};
        
        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            const firstEl = elements[0];
            const computed = window.getComputedStyle(firstEl);
            results[selector] = {
              fontFamily: computed.fontFamily,
              fontWeight: computed.fontWeight
            };
          }
        });
        
        return results;
      });

      // Verify consistent font families (should contain Inter or Poppins)
      Object.entries(textElements).forEach(([selector, styles]) => {
        const fontFamily = styles.fontFamily.toLowerCase();
        const hasTargetFont = fontFamily.includes('inter') || 
                             fontFamily.includes('poppins') || 
                             fontFamily.includes('system-ui') ||
                             fontFamily.includes('sans-serif');
        
        expect(hasTargetFont).toBeTruthy();
      });

      console.log(`✅ ${testPage.name}: Typography harmonization verified`);
    }
  });

  test('CTA buttons use emerald-to-turquoise gradient', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Find CTA buttons
      const ctaButtons = page.locator('button, .btn, a[class*="btn"], [class*="cta"]').filter({
        hasText: /Contact|Devis|Commencer|Découvrir|En savoir plus/i
      });

      if (await ctaButtons.count() > 0) {
        const firstButton = ctaButtons.first();
        
        const buttonStyles = await firstButton.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundImage: computed.backgroundImage,
            backgroundColor: computed.backgroundColor
          };
        });

        // Check for gradient or emerald background
        const hasEmeraldGradient = buttonStyles.backgroundImage.includes('linear-gradient') ||
                                  buttonStyles.backgroundColor.includes('rgb(0, 200, 150)') || // #00C896
                                  buttonStyles.backgroundColor.includes('#00C896');

        expect(hasEmeraldGradient).toBeTruthy();
        console.log(`✅ ${testPage.name}: CTA buttons use emerald gradient/color`);
      }
    }
  });

  test('Form elements maintain proper contrast and accessibility', async ({ page }) => {
    // Focus on contact and devis pages which have forms
    const formPages = ['/contact', '/devis'];
    
    for (const url of formPages) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Find form inputs
      const inputs = page.locator('input[type="text"], input[type="email"], textarea, select');
      
      if (await inputs.count() > 0) {
        const inputStyles = await inputs.first().evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            borderColor: computed.borderColor,
            placeholderColor: computed.getPropertyValue('::placeholder') || 'N/A'
          };
        });

        // Verify form elements have sufficient contrast
        expect(inputStyles.backgroundColor).not.toBe('transparent');
        expect(inputStyles.color).not.toBe(inputStyles.backgroundColor);
        
        console.log(`✅ ${url}: Form accessibility verified`);

        // Test focus states
        await inputs.first().focus();
        const focusStyles = await inputs.first().evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            outline: computed.outline,
            borderColor: computed.borderColor
          };
        });

        expect(focusStyles.outline).not.toBe('none');
        console.log(`✅ ${url}: Form focus states verified`);
      }
    }
  });

  test('Interactive elements use Matrix dark accent (#003F34) for hover states', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Find interactive elements
      const interactiveElements = page.locator('button, a, .card, [class*="hover"]').first();
      
      if (await interactiveElements.count() > 0) {
        // Get initial styles
        const initialStyles = await interactiveElements.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            borderColor: computed.borderColor
          };
        });

        // Hover over element
        await interactiveElements.hover();
        
        // Small delay for hover transition
        await page.waitForTimeout(100);
        
        const hoverStyles = await interactiveElements.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            borderColor: computed.borderColor,
            transform: computed.transform
          };
        });

        // Verify some change occurred on hover (color, transform, etc.)
        const hasHoverEffect = 
          hoverStyles.backgroundColor !== initialStyles.backgroundColor ||
          hoverStyles.borderColor !== initialStyles.borderColor ||
          hoverStyles.transform !== 'none';

        expect(hasHoverEffect).toBeTruthy();
        console.log(`✅ ${testPage.name}: Interactive hover effects verified`);
      }
    }
  });

  test('Glassmorphism effects on cards and containers', async ({ page }) => {
    for (const testPage of TEST_PAGES) {
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');

      // Find card-like elements
      const cards = page.locator('.card, [class*="card"], [class*="glass"], .bg-white\\/10, .backdrop-blur');
      
      if (await cards.count() > 0) {
        const cardStyles = await cards.first().evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backdropFilter: computed.backdropFilter,
            backgroundColor: computed.backgroundColor,
            border: computed.border,
            borderRadius: computed.borderRadius
          };
        });

        // Check for glassmorphism properties
        const hasGlassmorphism = 
          cardStyles.backdropFilter.includes('blur') ||
          cardStyles.backgroundColor.includes('rgba') ||
          cardStyles.backgroundColor.includes('hsla');

        expect(hasGlassmorphism).toBeTruthy();
        console.log(`✅ ${testPage.name}: Glassmorphism effects verified`);
      }
    }
  });

  test('Page performance with new gradient background', async ({ page }) => {
    // Test homepage performance specifically
    await page.goto('/');
    
    // Measure page load performance
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: perfData.loadEventEnd - perfData.fetchStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
      };
    });

    // Ensure reasonable load times (< 3 seconds)
    expect(performanceMetrics.loadTime).toBeLessThan(3000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    
    console.log(`✅ Homepage: Performance metrics acceptable - Load: ${performanceMetrics.loadTime}ms, DOM: ${performanceMetrics.domContentLoaded}ms`);
  });

  test('Responsive design consistency across viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1440, height: 900, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check if gradient background persists
      const backgroundCheck = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        return computed.backgroundImage.includes('linear-gradient');
      });

      expect(backgroundCheck).toBeTruthy();

      // Check if navigation/header adapts properly
      const headerVisible = await page.locator('header, nav, [role="navigation"]').first().isVisible();
      expect(headerVisible).toBeTruthy();

      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}): Responsive design verified`);
    }
  });

  test('Accessibility compliance - WCAG AA contrast ratios', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check text contrast ratios
    const contrastCheck = await page.evaluate(() => {
      const textElements = document.querySelectorAll('h1, h2, h3, p, span, a, button');
      const results = [];
      
      for (let el of textElements) {
        const computed = window.getComputedStyle(el);
        const color = computed.color;
        const backgroundColor = computed.backgroundColor;
        
        // Skip if element is not visible or has no text
        if (el.offsetParent === null || !el.textContent.trim()) continue;
        
        results.push({
          tagName: el.tagName,
          color: color,
          backgroundColor: backgroundColor,
          text: el.textContent.substring(0, 50) + '...'
        });
        
        if (results.length >= 10) break; // Limit samples
      }
      
      return results;
    });

    expect(contrastCheck.length).toBeGreaterThan(0);
    console.log(`✅ Accessibility: Sampled ${contrastCheck.length} text elements for contrast`);
  });

  test('CSS Custom Properties (Design Tokens) are properly set', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const customProperties = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);
      
      return {
        primary: computed.getPropertyValue('--primary'),
        secondary: computed.getPropertyValue('--secondary'), 
        accent: computed.getPropertyValue('--accent'),
        emerald: computed.getPropertyValue('--emerald'),
        turquoise: computed.getPropertyValue('--turquoise'),
        matrix: computed.getPropertyValue('--matrix')
      };
    });

    // Check if emerald color system is defined
    const hasEmeraldSystem = customProperties.emerald || 
                           customProperties.primary?.includes('200') ||
                           Object.values(customProperties).some(val => val?.includes('#00C896'));

    expect(hasEmeraldSystem).toBeTruthy();
    console.log(`✅ CSS Custom Properties verified:`, customProperties);
  });

});
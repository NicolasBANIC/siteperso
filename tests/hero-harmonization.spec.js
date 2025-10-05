import { test, expect } from '@playwright/test';

test.describe('Hero Sections Harmonization', () => {
  const pages = [
    { url: '/', name: 'Homepage' },
    { url: '/services', name: 'Services' },
    { url: '/about', name: 'About' }
  ];

  test.describe('Typography Consistency', () => {
    test('should have consistent font family Inter across all hero sections', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        // Find hero section (either .hero or .hero-section)
        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        await expect(heroSection).toBeVisible();

        // Check h1 typography
        const h1 = heroSection.locator('h1').first();
        if (await h1.count() > 0) {
          const h1Styles = await h1.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              fontFamily: styles.fontFamily,
              fontWeight: styles.fontWeight,
              lineHeight: styles.lineHeight,
              letterSpacing: styles.letterSpacing
            };
          });

          expect(h1Styles.fontFamily).toContain('Inter');
          expect(['700', '800'].includes(h1Styles.fontWeight)).toBe(true); // Accept both values
          expect(parseFloat(h1Styles.lineHeight)).toBeCloseTo(1.1, 1);
          expect(parseFloat(h1Styles.letterSpacing)).toBeLessThan(0);
        }

        // Check h2 typography
        const h2 = heroSection.locator('h2').first();
        if (await h2.count() > 0) {
          const h2Styles = await h2.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              fontFamily: styles.fontFamily,
              fontWeight: styles.fontWeight,
              letterSpacing: styles.letterSpacing
            };
          });

          expect(h2Styles.fontFamily).toContain('Inter');
          expect(h2Styles.fontWeight).toBe('700');
          expect(parseFloat(h2Styles.letterSpacing)).toBe(0);
        }

        // Check paragraph typography
        const paragraph = heroSection.locator('p').first();
        if (await paragraph.count() > 0) {
          const pStyles = await paragraph.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              fontFamily: styles.fontFamily,
              fontWeight: styles.fontWeight,
              lineHeight: styles.lineHeight,
              letterSpacing: styles.letterSpacing
            };
          });

          expect(pStyles.fontFamily).toContain('Inter');
          expect(pStyles.fontWeight).toBe('400');
          expect(parseFloat(pStyles.lineHeight)).toBeCloseTo(1.5, 1);
          expect(parseFloat(pStyles.letterSpacing)).toBeGreaterThan(0);
        }

        console.log(`✓ Typography validated for ${pageInfo.name}`);
      }
    });

    test('should have emerald green gradient on accent words', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        const accentWords = heroSection.locator('.accent-word, .text-accent-green');

        if (await accentWords.count() > 0) {
          const accentStyles = await accentWords.first().evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundImage: styles.backgroundImage,
              backgroundClip: styles.backgroundClip || styles.webkitBackgroundClip,
              textFillColor: styles.webkitTextFillColor || 'unset'
            };
          });

          expect(accentStyles.backgroundImage).toContain('gradient');
          expect(accentStyles.backgroundImage).toContain('22, 163, 74'); // #16a34a as rgb
          expect(accentStyles.backgroundClip || accentStyles.webkitBackgroundClip).toBe('text');
        }

        console.log(`✓ Accent colors validated for ${pageInfo.name}`);
      }
    });
  });

  test.describe('Unified Overlay System', () => {
    test('should have consistent overlay system across all hero sections', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        await expect(heroSection).toBeVisible();

        // Check for overlay using ::after pseudo-element
        const overlayExists = await heroSection.evaluate(el => {
          const afterStyles = window.getComputedStyle(el, '::after');
          return {
            content: afterStyles.content,
            position: afterStyles.position,
            background: afterStyles.background,
            mixBlendMode: afterStyles.mixBlendMode,
            opacity: afterStyles.opacity
          };
        });

        expect(overlayExists.content).not.toBe('none');
        expect(overlayExists.position).toBe('absolute');
        expect(overlayExists.mixBlendMode).toBe('multiply');

        console.log(`✓ Overlay system validated for ${pageInfo.name}`);
      }
    });

    test('should have proper z-index layering', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        const heroContent = heroSection.locator('.hero-content, [class*="content"]').first();

        if (await heroContent.count() > 0) {
          const contentStyles = await heroContent.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              position: styles.position,
              zIndex: styles.zIndex
            };
          });

          expect(contentStyles.position).toBe('relative');
          expect(parseInt(contentStyles.zIndex)).toBeGreaterThan(0);
        }

        console.log(`✓ Z-index layering validated for ${pageInfo.name}`);
      }
    });
  });

  test.describe('CSS Variables System', () => {
    test('should use global hero CSS variables', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const cssVariables = await page.evaluate(() => {
        const rootStyles = window.getComputedStyle(document.documentElement);
        return {
          heroTextColor: rootStyles.getPropertyValue('--hero-text-color'),
          heroAccentColor: rootStyles.getPropertyValue('--hero-accent-color'),
          heroOverlayDark: rootStyles.getPropertyValue('--hero-overlay-dark'),
          heroOverlayLight: rootStyles.getPropertyValue('--hero-overlay-light'),
          heroFontFamily: rootStyles.getPropertyValue('--hero-font-family')
        };
      });

      expect(cssVariables.heroTextColor.trim()).toBe('#ffffff');
      expect(cssVariables.heroAccentColor.trim()).toBe('#16a34a');
      expect(cssVariables.heroOverlayDark.trim()).not.toBe('');
      expect(cssVariables.heroOverlayLight.trim()).not.toBe('');
      expect(cssVariables.heroFontFamily.trim()).toContain('Inter');

      console.log('✓ CSS variables system validated');
    });

    test('should apply consistent text shadow values', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        const heroTitle = heroSection.locator('h1').first();

        if (await heroTitle.count() > 0) {
          const titleStyles = await heroTitle.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              textShadow: styles.textShadow,
              webkitTextStroke: styles.webkitTextStroke
            };
          });

          expect(titleStyles.textShadow).toContain('rgba');
          // Should have at least one shadow layer
          expect((titleStyles.textShadow.match(/rgba/g) || []).length).toBeGreaterThanOrEqual(1);
        }

        console.log(`✓ Text shadows validated for ${pageInfo.name}`);
      }
    });
  });

  test.describe('Animation System', () => {
    test('should have staggered entry animations', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        
        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        await expect(heroSection).toBeVisible();

        // Check for animation classes
        const animatedElements = heroSection.locator('[class*="animate-"], [style*="animation"]');
        
        if (await animatedElements.count() > 0) {
          const firstElement = animatedElements.first();
          const animationStyles = await firstElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              animationName: styles.animationName,
              animationDuration: styles.animationDuration,
              animationDelay: styles.animationDelay
            };
          });

          expect(animationStyles.animationName).not.toBe('none');
          expect(animationStyles.animationDuration).not.toBe('0s');
        }

        console.log(`✓ Animations validated for ${pageInfo.name}`);
      }
    });

    test('should respect prefers-reduced-motion', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        
        // Check that animations are disabled when reduced motion is preferred
        const reducedMotionStyles = await heroSection.evaluate(el => {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const styles = window.getComputedStyle(el);
          return {
            prefersReducedMotion,
            animationName: styles.animationName,
            animationDuration: styles.animationDuration
          };
        });

        if (reducedMotionStyles.prefersReducedMotion) {
          expect(
            reducedMotionStyles.animationName === 'none' || 
            reducedMotionStyles.animationDuration === '0s'
          ).toBe(true);
        }

        console.log(`✓ Reduced motion respected for ${pageInfo.name}`);
      }

      // Reset motion preference
      await page.emulateMedia({ reducedMotion: null });
    });
  });

  test.describe('Responsive Design Harmonization', () => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1280, height: 800, name: 'Desktop' },
      { width: 1920, height: 1080, name: 'Large Desktop' }
    ];

    test('should maintain consistent appearance across viewports', async ({ page }) => {
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        for (const pageInfo of pages.slice(0, 3)) { // Test first 3 pages for performance
          await page.goto(pageInfo.url);
          await page.waitForLoadState('networkidle');

          const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
          await expect(heroSection).toBeVisible();

          // Check that text remains readable
          const heroTitle = heroSection.locator('h1').first();
          if (await heroTitle.count() > 0) {
            await expect(heroTitle).toBeVisible();
            
            const titleStyles = await heroTitle.evaluate(el => {
              const styles = window.getComputedStyle(el);
              return {
                fontSize: parseFloat(styles.fontSize),
                color: styles.color,
                visibility: styles.visibility
              };
            });

            expect(titleStyles.fontSize).toBeGreaterThan(20);
            expect(titleStyles.visibility).toBe('visible');
          }

          console.log(`✓ ${viewport.name} responsive design validated for ${pageInfo.name}`);
        }
      }
    });

    test('should adjust text stroke on mobile', async ({ page }) => {
      // Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const heroTitle = page.locator('.hero h1, .hero-section h1').first();
      
      if (await heroTitle.count() > 0) {
        const mobileStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            webkitTextStroke: styles.webkitTextStroke
          };
        });

        // Should have reduced stroke on mobile
        expect(mobileStyles.webkitTextStroke).toContain('0.5px');
      }

      // Desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.reload();

      if (await heroTitle.count() > 0) {
        const desktopStyles = await heroTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            webkitTextStroke: styles.webkitTextStroke
          };
        });

        // Should have normal stroke on desktop
        expect(desktopStyles.webkitTextStroke).toContain('1px');
      }

      console.log('✓ Mobile text stroke adaptation validated');
    });
  });

  test.describe('Content Readability and Contrast', () => {
    test('should maintain proper contrast ratios', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        const textElements = heroSection.locator('h1, h2, p');

        if (await textElements.count() > 0) {
          const firstTextElement = textElements.first();
          const textStyles = await firstTextElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              textShadow: styles.textShadow
            };
          });

          // Text should be white/light with shadow for contrast
          expect(textStyles.color).toContain('255, 255, 255');
          expect(textStyles.textShadow).not.toBe('none');
        }

        console.log(`✓ Contrast ratio validated for ${pageInfo.name}`);
      }
    });

    test('should have enhanced readability features', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        const heroTitle = heroSection.locator('h1').first();

        if (await heroTitle.count() > 0) {
          const enhancedStyles = await heroTitle.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              textShadow: styles.textShadow,
              webkitTextStroke: styles.webkitTextStroke,
              fontWeight: styles.fontWeight
            };
          });

          // Should have at least one text shadow for enhanced readability
          expect((enhancedStyles.textShadow.match(/rgba/g) || []).length).toBeGreaterThanOrEqual(1);
          expect(enhancedStyles.webkitTextStroke).not.toBe('none');
          expect(parseInt(enhancedStyles.fontWeight)).toBeGreaterThanOrEqual(700);
        }

        console.log(`✓ Enhanced readability validated for ${pageInfo.name}`);
      }
    });
  });

  test.describe('Cross-Page Consistency', () => {
    test('should have identical styling approach across all pages', async ({ page }) => {
      const styleFingerprints = [];

      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        
        const styleFingerprint = await heroSection.evaluate(el => {
          const styles = window.getComputedStyle(el);
          const afterStyles = window.getComputedStyle(el, '::after');
          
          return {
            position: styles.position,
            overlayMixBlendMode: afterStyles.mixBlendMode,
            overlayExists: afterStyles.content !== 'none',
            hasBackgroundImage: styles.backgroundImage !== 'none'
          };
        });

        styleFingerprints.push({
          page: pageInfo.name,
          ...styleFingerprint
        });
      }

      // All pages should have similar styling approach
      const firstFingerprint = styleFingerprints[0];
      for (let i = 1; i < styleFingerprints.length; i++) {
        const currentFingerprint = styleFingerprints[i];
        
        expect(currentFingerprint.overlayMixBlendMode).toBe(firstFingerprint.overlayMixBlendMode);
        expect(currentFingerprint.overlayExists).toBe(firstFingerprint.overlayExists);
        
        console.log(`✓ Styling consistency validated between ${firstFingerprint.page} and ${currentFingerprint.page}`);
      }
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load hero sections efficiently', async ({ page }) => {
      for (const pageInfo of pages) {
        const startTime = Date.now();
        
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');

        const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
        await expect(heroSection).toBeVisible();

        const loadTime = Date.now() - startTime;
        
        // Should load within reasonable time (10 seconds)
        expect(loadTime).toBeLessThan(10000);
        
        console.log(`✓ ${pageInfo.name} loaded in ${loadTime}ms`);
      }
    });

    test('should handle slow network gracefully', async ({ page }) => {
      // Simulate slow 3G
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 100);
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const heroSection = await page.locator('.hero, .hero-section, section[class*="hero"]').first();
      await expect(heroSection).toBeVisible();

      // Should still maintain proper styling even with slow loading
      const heroTitle = heroSection.locator('h1').first();
      if (await heroTitle.count() > 0) {
        await expect(heroTitle).toBeVisible();
      }

      console.log('✓ Slow network handling validated');
    });
  });
});
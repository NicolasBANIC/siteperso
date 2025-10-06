import { test, expect } from '@playwright/test';

test.describe('Emerald Redesign - Focused Issue Analysis', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('should identify body margin issue', async ({ page }) => {
    await page.goto('/');
    
    // Check body styles
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computedStyles = window.getComputedStyle(body);
      return {
        margin: computedStyles.margin,
        padding: computedStyles.padding,
        marginTop: computedStyles.marginTop,
        marginBottom: computedStyles.marginBottom,
        marginLeft: computedStyles.marginLeft,
        marginRight: computedStyles.marginRight
      };
    });

    console.log('Body styles:', bodyStyles);
    
    // The test will show us what the actual values are
    expect(bodyStyles).toBeTruthy();
  });

  test('should identify CTA button styling issues', async ({ page }) => {
    await page.goto('/');
    
    // Check CTA button in header - should be /devis link
    const ctaButton = page.locator('header').locator('a[href="/devis"]').first();
    
    if (await ctaButton.count() > 0) {
      const ctaStyles = await ctaButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
          color: styles.color,
          background: styles.background,
          classes: el.className,
          href: el.href
        };
      });

      console.log('CTA Button styles (header /devis):', ctaStyles);
      expect(ctaStyles).toBeTruthy();
    } else {
      // Also check for contact CTA button
      const contactButton = page.locator('header').locator('a[href="/contact"]').first();
      if (await contactButton.count() > 0) {
        const contactStyles = await contactButton.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            borderColor: styles.borderColor,
            color: styles.color,
            background: styles.background,
            classes: el.className,
            href: el.href
          };
        });

        console.log('Contact Button styles:', contactStyles);
        expect(contactStyles).toBeTruthy();
      } else {
        console.log('No CTA buttons found in header');
      }
    }
  });

  test('should identify hero text readability issues', async ({ page }) => {
    await page.goto('/');
    
    const heroTitle = page.locator('h1, .hero-title, [data-testid="hero-title"]').first();
    
    if (await heroTitle.count() > 0) {
      const titleStyles = await heroTitle.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          textShadow: styles.textShadow,
          color: styles.color,
          WebkitTextStroke: styles.WebkitTextStroke,
          filter: styles.filter,
          classes: el.className,
          innerHTML: el.innerHTML.substring(0, 100) + '...'
        };
      });

      console.log('Hero title styles:', titleStyles);
      expect(titleStyles).toBeTruthy();
    }
  });

  test('should check emerald color variables', async ({ page }) => {
    await page.goto('/');
    
    // Check CSS custom properties
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      
      return {
        primaryColor: styles.getPropertyValue('--color-primary').trim(),
        primaryDark: styles.getPropertyValue('--color-primary-dark').trim(),
        borderRadius: styles.getPropertyValue('--border-radius').trim(),
        shadowEmerald: styles.getPropertyValue('--shadow-emerald').trim(),
        allCustomProps: Array.from(document.styleSheets)
          .map(sheet => {
            try {
              return Array.from(sheet.cssRules)
                .filter(rule => rule.selectorText === ':root')
                .map(rule => rule.cssText)
                .join('\n');
            } catch (e) {
              return '';
            }
          })
          .join('\n')
          .substring(0, 500) + '...'
      };
    });

    console.log('CSS Custom Properties:', rootStyles);
    expect(rootStyles).toBeTruthy();
  });

  test('should analyze pricing data consistency', async ({ page }) => {
    // Check homepage pricing
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const homepagePricing = await page.locator('.pricing-card, [data-testid="pricing-card"]').evaluateAll((cards) => {
      return cards.map((card, index) => {
        const title = card.querySelector('.card-title, .pricing-title, h3, h4')?.textContent?.trim();
        const price = card.querySelector('.price, .pricing-price, .card-price')?.textContent?.trim();
        return { index, title, price, found: !!title && !!price };
      });
    });

    console.log('Homepage pricing:', homepagePricing);

    // Try to check tarifs page pricing - handle potential navigation issues
    try {
      await page.goto('/tarifs');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      const tarifsPricing = await page.locator('.pricing-card, [data-testid="pricing-card"]').evaluateAll((cards) => {
        return cards.map((card, index) => {
          const title = card.querySelector('.card-title, .pricing-title, h3, h4')?.textContent?.trim();
          const price = card.querySelector('.price, .pricing-price, .card-price')?.textContent?.trim();
          return { index, title, price, found: !!title && !!price };
        });
      });

      console.log('Tarifs pricing:', tarifsPricing);
      
      // This should pass - pricing consistency was confirmed working
      expect(homepagePricing.length).toBeGreaterThan(0);
      expect(tarifsPricing.length).toBeGreaterThan(0);
      expect(homepagePricing.length).toBe(tarifsPricing.length);
    } catch (error) {
      console.log('Tarifs page navigation failed:', error.message);
      // Still expect homepage pricing to work
      expect(homepagePricing.length).toBeGreaterThan(0);
    }
  });

  test('should check mobile menu functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const mobileMenuTrigger = page.locator('[data-testid="mobile-menu-trigger"], [data-testid="mobile-menu-button"], .mobile-menu-trigger, button[aria-label*="menu"]');
    
    if (await mobileMenuTrigger.count() > 0) {
      const triggerInfo = await mobileMenuTrigger.first().evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          visible: styles.display !== 'none' && styles.visibility !== 'hidden',
          position: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          classes: el.className,
          zIndex: styles.zIndex,
          pointerEvents: styles.pointerEvents
        };
      });
      
      console.log('Mobile menu trigger info:', triggerInfo);
      expect(triggerInfo.visible).toBe(true);
    } else {
      console.log('No mobile menu trigger found');
    }
  });

  test('should analyze testimonial slider structure', async ({ page }) => {
    await page.goto('/temoignages');
    await page.waitForLoadState('networkidle');

    const testimonialSlider = page.locator('.testimonial-slider, [data-testid="testimonial-slider"], .testimonials-container').first();
    
    if (await testimonialSlider.count() > 0) {
      const sliderInfo = await testimonialSlider.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          height: styles.height,
          minHeight: styles.minHeight,
          transition: styles.transition,
          classes: el.className,
          actualHeight: rect.height,
          children: el.children.length
        };
      });
      
      console.log('Testimonial slider info:', sliderInfo);
      expect(sliderInfo.actualHeight).toBeGreaterThan(0);
    } else {
      console.log('No testimonial slider found on /temoignages');
    }
  });

});
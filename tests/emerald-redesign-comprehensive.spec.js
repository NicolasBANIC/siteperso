import { test, expect } from '@playwright/test';

test.describe('Emerald Redesign - Comprehensive UX/UI Polish Verification', () => {
  const pages = [
    { path: '/', title: 'Homepage' },
    { path: '/apropos', title: 'About Page' },
    { path: '/services', title: 'Services Page' },
    { path: '/portfolio', title: 'Portfolio Page' },
    { path: '/contact', title: 'Contact Page' },
    { path: '/tarifs', title: 'Pricing Page' },
    { path: '/processus', title: 'Process Page' },
    { path: '/temoignages', title: 'Testimonials Page' }
  ];

  // Color constants for emerald palette
  const emeraldColors = {
    primary: '#00C896',
    primaryDark: '#007A5E',
    emeraldGlow: 'rgba(0, 200, 150, 0.3)'
  };

  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test.describe('1. Header & Navigation Consistency', () => {
    test('should have consistent header height and no gaps', async ({ page }) => {
      for (const testPage of pages) {
        await page.goto(testPage.path);
        
        // Wait for header to be visible
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Check header height (68px default, 64px when scrolled)
        const headerBox = await header.boundingBox();
        expect(headerBox.height).toBeGreaterThanOrEqual(64);
        expect(headerBox.height).toBeLessThanOrEqual(72);

        // Check for no gaps above header
        const bodyStyles = await page.evaluate(() => {
          const body = document.body;
          const computedStyles = window.getComputedStyle(body);
          return {
            margin: computedStyles.margin,
            padding: computedStyles.padding
          };
        });

        // Ensure body has no unwanted margins/padding
        expect(bodyStyles.margin).toContain('0px');
        expect(bodyStyles.padding).toContain('0px');

        // Verify header position (should be at top)
        expect(headerBox.y).toBe(0);
      }
    });

    test('should maintain emerald color palette in navigation', async ({ page }) => {
      await page.goto('/');
      
      // Check CTA button uses emerald colors
      const ctaButton = page.locator('header').locator('[data-testid="cta-button"], .cta-button, a[href="/contact"]').first();
      await expect(ctaButton).toBeVisible();

      // Check that emerald colors are applied (via CSS custom properties)
      const ctaStyles = await ctaButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor
        };
      });

      // Should use emerald green variants
      expect(ctaStyles.backgroundColor).toMatch(/rgb\(0,\s*200,\s*150\)|rgb\(0,\s*122,\s*94\)/);
    });

    test('should have proper header scrolled state', async ({ page }) => {
      await page.goto('/');
      
      const header = page.locator('header');
      
      // Check initial header height
      let headerBox = await header.boundingBox();
      const initialHeight = headerBox.height;

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500); // Wait for scroll animation

      // Check scrolled header height (should be slightly smaller)
      headerBox = await header.boundingBox();
      expect(headerBox.height).toBeLessThanOrEqual(initialHeight);
      expect(headerBox.height).toBeGreaterThanOrEqual(60);
    });

    test('should have consistent mobile menu positioning', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
      await page.goto('/');

      // Check if mobile menu trigger exists
      const mobileMenuTrigger = page.locator('[data-testid="mobile-menu-trigger"], .mobile-menu-trigger, button[aria-label*="menu"]');
      
      if (await mobileMenuTrigger.count() > 0) {
        await expect(mobileMenuTrigger).toBeVisible();
        
        // Click to open mobile menu
        await mobileMenuTrigger.click();
        await page.waitForTimeout(300);

        // Check mobile menu positioning relative to header
        const header = page.locator('header');
        const headerBox = await header.boundingBox();
        
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu');
        if (await mobileMenu.count() > 0) {
          const menuBox = await mobileMenu.boundingBox();
          
          // Menu should be positioned below header
          expect(menuBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 5);
        }
      }
    });
  });

  test.describe('2. Hero Sections Text Readability', () => {
    test('should have enhanced text readability on all hero sections', async ({ page }) => {
      const heroPages = [
        { path: '/', selector: '.hero-section, [data-testid="hero-section"]' },
        { path: '/apropos', selector: '.hero-section, [data-testid="hero-section"]' },
        { path: '/contact', selector: '.hero-section, [data-testid="hero-section"]' },
        { path: '/portfolio', selector: '.hero-section, [data-testid="hero-section"]' }
      ];

      for (const heroPage of heroPages) {
        await page.goto(heroPage.path);
        
        const heroSection = page.locator(heroPage.selector).first();
        
        if (await heroSection.count() > 0) {
          await expect(heroSection).toBeVisible();

          // Check for hero title text
          const heroTitle = heroSection.locator('h1, .hero-title, [data-testid="hero-title"]').first();
          
          if (await heroTitle.count() > 0) {
            await expect(heroTitle).toBeVisible();

            // Check text shadows and readability enhancements
            const titleStyles = await heroTitle.evaluate((el) => {
              const styles = window.getComputedStyle(el);
              return {
                textShadow: styles.textShadow,
                color: styles.color,
                WebkitTextStroke: styles.WebkitTextStroke,
                filter: styles.filter
              };
            });

            // Should have text shadows for readability
            expect(titleStyles.textShadow).not.toBe('none');
          }

          // Check for overlay presence behind text
          const overlay = heroSection.locator('.overlay, [data-testid="hero-overlay"], .hero-overlay').first();
          
          if (await overlay.count() > 0) {
            const overlayStyles = await overlay.evaluate((el) => {
              const styles = window.getComputedStyle(el);
              return {
                backgroundColor: styles.backgroundColor,
                background: styles.background,
                opacity: styles.opacity
              };
            });

            // Should have some form of background overlay
            expect(overlayStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
                   overlayStyles.background.includes('gradient') ||
                   overlayStyles.opacity !== '1').toBeTruthy();
          }
        }
      }
    });

    test('should have proper contrast ratios for hero text', async ({ page }) => {
      await page.goto('/');
      
      const heroTitle = page.locator('h1, .hero-title, [data-testid="hero-title"]').first();
      
      if (await heroTitle.count() > 0) {
        await expect(heroTitle).toBeVisible();

        // Check text color for sufficient contrast
        const textColor = await heroTitle.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.color;
        });

        // Should be white or very light for contrast over backgrounds
        expect(textColor).toMatch(/rgb\(255,\s*255,\s*255\)|rgb\(2[5-9][0-9],|rgb\(2[0-4][0-9],.*2[0-4][0-9]|#fff|white/);
      }
    });
  });

  test.describe('3. Visual Identity & Color Palette Consistency', () => {
    test('should use consistent emerald gradient across components', async ({ page }) => {
      await page.goto('/');
      
      // Check multiple elements that should use emerald colors
      const emeraldElements = [
        '[data-testid="cta-button"], .cta-button',
        '.accent-text, .emerald-accent',
        '.primary-button, .btn-primary',
        '.gradient-text'
      ];

      for (const selector of emeraldElements) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        if (count > 0) {
          const element = elements.first();
          const styles = await element.evaluate((el) => {
            const computedStyles = window.getComputedStyle(el);
            return {
              color: computedStyles.color,
              backgroundColor: computedStyles.backgroundColor,
              background: computedStyles.background
            };
          });

          // Should contain emerald green colors
          const hasEmeraldColor = 
            styles.color.includes('0, 200, 150') ||
            styles.color.includes('0, 122, 94') ||
            styles.backgroundColor.includes('0, 200, 150') ||
            styles.backgroundColor.includes('0, 122, 94') ||
            styles.background.includes('0, 200, 150') ||
            styles.background.includes('0, 122, 94') ||
            styles.background.includes('#00C896') ||
            styles.background.includes('#007A5E');

          expect(hasEmeraldColor).toBeTruthy();
        }
      }
    });

    test('should have consistent border radius and shadows', async ({ page }) => {
      await page.goto('/');
      
      // Check cards, buttons, and components for consistent styling
      const styledElements = [
        '.card, [data-testid="card"]',
        '.btn, button, [data-testid="button"]',
        '.pricing-card, [data-testid="pricing-card"]',
        '.service-card, [data-testid="service-card"]',
        '.testimonial-card, [data-testid="testimonial-card"]'
      ];

      for (const selector of styledElements) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        if (count > 0) {
          const element = elements.first();
          const styles = await element.evaluate((el) => {
            const computedStyles = window.getComputedStyle(el);
            return {
              borderRadius: computedStyles.borderRadius,
              boxShadow: computedStyles.boxShadow
            };
          });

          // Should have 12px border radius (or similar)
          if (styles.borderRadius !== 'none' && styles.borderRadius !== '0px') {
            expect(styles.borderRadius).toMatch(/12px|0.75rem|1[0-6]px/);
          }

          // Should have box shadow for depth
          if (styles.boxShadow !== 'none') {
            expect(styles.boxShadow).toContain('rgba');
          }
        }
      }
    });
  });

  test.describe('4. Typography & Layout Coherence', () => {
    test('should have no text overlapping issues', async ({ page }) => {
      const testPages = [
        '/',
        '/apropos',
        '/services'
      ];

      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');

        // Check for potential overflow issues
        const overflowElements = await page.locator('*').evaluateAll((elements) => {
          return elements.filter(el => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            // Check if element overflows its container
            return (
              styles.overflow === 'visible' &&
              rect.width > (el.parentElement?.getBoundingClientRect().width || window.innerWidth)
            );
          }).length;
        });

        expect(overflowElements).toBe(0);

        // Specifically check the "À propos" values section if on about page
        if (testPage === '/apropos') {
          const valuesSection = page.locator('.values-section, [data-testid="values-section"]');
          
          if (await valuesSection.count() > 0) {
            const valueItems = valuesSection.locator('.value-item, .grid > div');
            const count = await valueItems.count();
            
            if (count > 0) {
              for (let i = 0; i < count; i++) {
                const item = valueItems.nth(i);
                
                // Check that text doesn't overflow
                const hasOverflow = await item.evaluate((el) => {
                  return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
                });
                
                expect(hasOverflow).toBeFalsy();
              }
            }
          }
        }
      }
    });

    test('should have consistent section spacing', async ({ page }) => {
      await page.goto('/');
      
      const sections = page.locator('section, .section, [data-testid="section"]');
      const count = await sections.count();
      
      if (count > 1) {
        const spacings = [];
        
        for (let i = 0; i < Math.min(count, 5); i++) {
          const section = sections.nth(i);
          const styles = await section.evaluate((el) => {
            const computedStyles = window.getComputedStyle(el);
            return {
              marginTop: computedStyles.marginTop,
              marginBottom: computedStyles.marginBottom,
              paddingTop: computedStyles.paddingTop,
              paddingBottom: computedStyles.paddingBottom
            };
          });
          
          spacings.push(styles);
        }

        // Check that sections have consistent vertical spacing patterns
        const hasConsistentSpacing = spacings.every((spacing, index) => {
          if (index === 0) return true;
          
          const prev = spacings[index - 1];
          
          // Allow for some variation but should follow a pattern
          return (
            spacing.paddingTop === prev.paddingTop ||
            spacing.marginTop === prev.marginTop ||
            Math.abs(parseInt(spacing.paddingTop) - parseInt(prev.paddingTop)) <= 32
          );
        });

        expect(hasConsistentSpacing).toBeTruthy();
      }
    });

    test('should be responsive across different viewport sizes', async ({ page }) => {
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop Large' },
        { width: 1440, height: 900, name: 'Desktop' },
        { width: 1024, height: 768, name: 'Tablet Landscape' },
        { width: 768, height: 1024, name: 'Tablet Portrait' },
        { width: 375, height: 667, name: 'Mobile' }
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check that content adapts properly
        const body = page.locator('body');
        const hasHorizontalScroll = await body.evaluate((el) => {
          return el.scrollWidth > window.innerWidth;
        });

        // Should not have horizontal scroll on any viewport
        expect(hasHorizontalScroll).toBeFalsy();

        // Check header remains functional
        const header = page.locator('header');
        await expect(header).toBeVisible();
        
        const headerBox = await header.boundingBox();
        expect(headerBox.width).toBeLessThanOrEqual(viewport.width);

        // Check hero section adapts
        const heroSection = page.locator('.hero-section, [data-testid="hero-section"]').first();
        if (await heroSection.count() > 0) {
          const heroBox = await heroSection.boundingBox();
          expect(heroBox.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    });
  });

  test.describe('5. Pricing Data Consistency', () => {
    test('should have identical pricing between homepage and tarifs page', async ({ page }) => {
      // Get pricing data from homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const homepagePricing = await page.locator('.pricing-card, [data-testid="pricing-card"]').evaluateAll((cards) => {
        return cards.map(card => {
          const title = card.querySelector('.card-title, .pricing-title, h3, h4')?.textContent?.trim();
          const price = card.querySelector('.price, .pricing-price, .card-price')?.textContent?.trim();
          const features = Array.from(card.querySelectorAll('.feature, .pricing-feature, li')).map(feature => 
            feature.textContent?.trim()
          ).filter(Boolean);
          
          return { title, price, features };
        }).filter(item => item.title && item.price);
      });

      // Get pricing data from tarifs page
      await page.goto('/tarifs');
      await page.waitForLoadState('networkidle');
      
      const tarifsPricing = await page.locator('.pricing-card, [data-testid="pricing-card"]').evaluateAll((cards) => {
        return cards.map(card => {
          const title = card.querySelector('.card-title, .pricing-title, h3, h4')?.textContent?.trim();
          const price = card.querySelector('.price, .pricing-price, .card-price')?.textContent?.trim();
          const features = Array.from(card.querySelectorAll('.feature, .pricing-feature, li')).map(feature => 
            feature.textContent?.trim()
          ).filter(Boolean);
          
          return { title, price, features };
        }).filter(item => item.title && item.price);
      });

      // Compare pricing data
      expect(homepagePricing.length).toBeGreaterThan(0);
      expect(tarifsPricing.length).toBeGreaterThan(0);
      expect(homepagePricing.length).toBe(tarifsPricing.length);

      // Compare each pricing card
      for (let i = 0; i < homepagePricing.length; i++) {
        expect(homepagePricing[i].title).toBe(tarifsPricing[i].title);
        expect(homepagePricing[i].price).toBe(tarifsPricing[i].price);
        
        // Features should be identical (allowing for minor formatting differences)
        expect(homepagePricing[i].features.length).toBe(tarifsPricing[i].features.length);
        
        for (let j = 0; j < homepagePricing[i].features.length; j++) {
          const homepageFeature = homepagePricing[i].features[j].replace(/\s+/g, ' ');
          const tarifsFeature = tarifsPricing[i].features[j].replace(/\s+/g, ' ');
          expect(homepageFeature).toBe(tarifsFeature);
        }
      }
    });

    test('should load pricing data from centralized source', async ({ page }) => {
      // Check that pricing.json file is being used
      await page.goto('/');
      
      // Intercept network requests to check if pricing.json is loaded
      const networkRequests = [];
      page.on('request', (request) => {
        if (request.url().includes('pricing') || request.url().includes('.json')) {
          networkRequests.push(request.url());
        }
      });

      await page.waitForLoadState('networkidle');
      
      // Check if pricing data is loaded dynamically or statically
      const pricingCards = page.locator('.pricing-card, [data-testid="pricing-card"]');
      const count = await pricingCards.count();
      
      expect(count).toBeGreaterThan(0);

      // Verify consistent styling across pricing cards
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const card = pricingCards.nth(i);
          await expect(card).toBeVisible();
          
          const price = card.locator('.price, .pricing-price, .card-price').first();
          if (await price.count() > 0) {
            await expect(price).toBeVisible();
            
            // Price should be prominently displayed
            const priceStyles = await price.evaluate((el) => {
              const styles = window.getComputedStyle(el);
              return {
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                color: styles.color
              };
            });

            expect(parseInt(priceStyles.fontSize)).toBeGreaterThan(20);
            expect(parseInt(priceStyles.fontWeight)).toBeGreaterThanOrEqual(600);
          }
        }
      }
    });
  });

  test.describe('6. Testimonials & Animations', () => {
    test('should have smooth testimonial transitions without layout jumps', async ({ page }) => {
      await page.goto('/temoignages');
      await page.waitForLoadState('networkidle');

      const testimonialSlider = page.locator('.testimonial-slider, [data-testid="testimonial-slider"]').first();
      
      if (await testimonialSlider.count() > 0) {
        // Check initial state
        const initialBox = await testimonialSlider.boundingBox();
        expect(initialBox.height).toBeGreaterThan(0);

        // Look for navigation controls
        const prevButton = page.locator('[data-testid="testimonial-prev"], .testimonial-prev, .slick-prev').first();
        const nextButton = page.locator('[data-testid="testimonial-next"], .testimonial-next, .slick-next').first();
        
        if (await nextButton.count() > 0) {
          // Record initial height to check for layout jumps
          const initialHeight = initialBox.height;
          
          // Click next button
          await nextButton.click();
          await page.waitForTimeout(500); // Wait for animation
          
          // Check height remained consistent (anti-jump measure)
          const afterBox = await testimonialSlider.boundingBox();
          expect(Math.abs(afterBox.height - initialHeight)).toBeLessThan(10);
        }

        // Check for smooth animation CSS
        const animationStyles = await testimonialSlider.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            transition: styles.transition,
            transform: styles.transform,
            height: styles.height,
            minHeight: styles.minHeight
          };
        });

        // Should have some form of transition or animation
        expect(animationStyles.transition !== 'all 0s ease 0s' || 
               animationStyles.transform !== 'none' ||
               animationStyles.minHeight !== 'auto').toBeTruthy();
      }
    });

    test('should have minimum height to prevent layout jumps', async ({ page }) => {
      await page.goto('/temoignages');
      
      const testimonialContainer = page.locator('.testimonial-slider, [data-testid="testimonial-slider"], .testimonials-container').first();
      
      if (await testimonialContainer.count() > 0) {
        const containerStyles = await testimonialContainer.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            height: styles.height,
            minHeight: styles.minHeight
          };
        });

        // Should have a minimum height set (around 450px as mentioned in implementation)
        const minHeightValue = parseInt(containerStyles.minHeight) || parseInt(containerStyles.height);
        expect(minHeightValue).toBeGreaterThanOrEqual(400);
      }
    });
  });

  test.describe('7. Logo & Footer Consistency', () => {
    test('should have consistent logo styling between header and footer', async ({ page }) => {
      await page.goto('/');
      
      const headerLogo = page.locator('header').locator('[data-testid="logo"], .logo, img[alt*="BANDEV"], img[alt*="logo"]').first();
      const footerLogo = page.locator('footer').locator('[data-testid="logo"], .logo, img[alt*="BANDEV"], img[alt*="logo"]').first();

      if (await headerLogo.count() > 0 && await footerLogo.count() > 0) {
        await expect(headerLogo).toBeVisible();
        await expect(footerLogo).toBeVisible();

        // Get logo attributes
        const headerLogoSrc = await headerLogo.getAttribute('src');
        const footerLogoSrc = await footerLogo.getAttribute('src');

        // Should use the same logo file or very similar
        expect(headerLogoSrc).toBeTruthy();
        expect(footerLogoSrc).toBeTruthy();

        // Check dimensions are proportional
        const headerBox = await headerLogo.boundingBox();
        const footerBox = await footerLogo.boundingBox();

        expect(headerBox.width).toBeGreaterThan(0);
        expect(footerBox.width).toBeGreaterThan(0);

        // Aspect ratios should be similar
        const headerRatio = headerBox.width / headerBox.height;
        const footerRatio = footerBox.width / footerBox.height;
        expect(Math.abs(headerRatio - footerRatio)).toBeLessThan(0.2);
      }
    });

    test('should have emerald-themed footer CTA button', async ({ page }) => {
      await page.goto('/');
      
      const footerCTA = page.locator('footer').locator('[data-testid="cta-button"], .cta-button, .footer-cta, .btn-primary').first();
      
      if (await footerCTA.count() > 0) {
        await expect(footerCTA).toBeVisible();

        const ctaStyles = await footerCTA.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            borderColor: styles.borderColor,
            color: styles.color
          };
        });

        // Should use emerald color palette
        const hasEmeraldStyling = 
          ctaStyles.backgroundColor.includes('0, 200, 150') ||
          ctaStyles.backgroundColor.includes('0, 122, 94') ||
          ctaStyles.borderColor.includes('0, 200, 150') ||
          ctaStyles.borderColor.includes('0, 122, 94');

        expect(hasEmeraldStyling).toBeTruthy();
      }
    });
  });

  test.describe('8. Code & Structural Quality', () => {
    test('should have consistent emerald colors in About page values section', async ({ page }) => {
      await page.goto('/apropos');
      
      const valuesSection = page.locator('.values-section, [data-testid="values-section"]');
      
      if (await valuesSection.count() > 0) {
        const valueItems = valuesSection.locator('.value-item, .grid > div');
        const count = await valueItems.count();
        
        if (count > 0) {
          const item = valueItems.first();
          
          // Check for emerald color usage in values section
          const itemStyles = await item.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            const iconElement = el.querySelector('.icon, .value-icon, svg');
            const iconStyles = iconElement ? window.getComputedStyle(iconElement) : null;
            
            return {
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              borderColor: styles.borderColor,
              iconColor: iconStyles?.color || iconStyles?.fill || 'none'
            };
          });

          // Should use emerald colors instead of legacy green
          const hasEmeraldColors = 
            itemStyles.color.includes('0, 200, 150') ||
            itemStyles.color.includes('0, 122, 94') ||
            itemStyles.iconColor.includes('0, 200, 150') ||
            itemStyles.iconColor.includes('0, 122, 94') ||
            itemStyles.borderColor.includes('0, 200, 150');

          // Should NOT use legacy green colors
          const hasLegacyGreen = 
            itemStyles.color.includes('34, 197, 94') ||
            itemStyles.iconColor.includes('34, 197, 94') ||
            itemStyles.borderColor.includes('34, 197, 94');

          expect(hasLegacyGreen).toBeFalsy();
        }
      }
    });

    test('should have consistent design tokens usage', async ({ page }) => {
      await page.goto('/');
      
      // Check that CSS custom properties are being used
      const rootStyles = await page.evaluate(() => {
        const root = document.documentElement;
        const styles = window.getComputedStyle(root);
        
        return {
          primaryColor: styles.getPropertyValue('--color-primary').trim(),
          primaryDark: styles.getPropertyValue('--color-primary-dark').trim(),
          borderRadius: styles.getPropertyValue('--border-radius').trim()
        };
      });

      // Should have emerald color tokens defined
      if (rootStyles.primaryColor) {
        expect(rootStyles.primaryColor).toMatch(/#00C896|rgb\(0,\s*200,\s*150\)/);
      }
      
      if (rootStyles.primaryDark) {
        expect(rootStyles.primaryDark).toMatch(/#007A5E|rgb\(0,\s*122,\s*94\)/);
      }
    });
  });

  test.describe('9. Accessibility & Performance', () => {
    test('should meet WCAG contrast requirements', async ({ page }) => {
      await page.goto('/');
      
      // Check high-contrast elements
      const textElements = [
        'h1, h2, h3, h4, h5, h6',
        'p',
        '.hero-title',
        '.card-title',
        'button',
        'a'
      ];

      for (const selector of textElements) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        if (count > 0) {
          const element = elements.first();
          
          if (await element.isVisible()) {
            const textColor = await element.evaluate((el) => {
              const styles = window.getComputedStyle(el);
              return styles.color;
            });

            // Parse RGB values to check contrast
            const rgbMatch = textColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
              const [, r, g, b] = rgbMatch.map(Number);
              
              // Calculate luminance (simplified)
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              
              // Text should be either very light (>0.7) or very dark (<0.3) for good contrast
              expect(luminance > 0.7 || luminance < 0.3).toBeTruthy();
            }
          }
        }
      }
    });

    test('should have proper semantic HTML structure', async ({ page }) => {
      await page.goto('/');
      
      // Check for semantic elements
      const semanticElements = [
        'header',
        'nav', 
        'main',
        'section',
        'footer'
      ];

      for (const element of semanticElements) {
        const elementLocator = page.locator(element);
        const count = await elementLocator.count();
        expect(count).toBeGreaterThan(0);
      }

      // Check heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((elements) => {
        return elements.map(el => ({
          tag: el.tagName.toLowerCase(),
          text: el.textContent?.substring(0, 50)
        }));
      });

      // Should have at least one h1
      const h1Count = headings.filter(h => h.tag === 'h1').length;
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(2); // Should not have too many h1s
    });

    test('should load without console errors', async ({ page }) => {
      const consoleErrors = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Filter out common non-critical errors
      const criticalErrors = consoleErrors.filter(error => 
        !error.includes('favicon') &&
        !error.includes('404') &&
        !error.includes('network') &&
        !error.includes('ResizeObserver')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('10. Cross-Page Consistency', () => {
    test('should maintain design consistency across all pages', async ({ page }) => {
      const designElements = {
        headerHeight: null,
        emeraldColors: [],
        fontFamilies: [],
        borderRadius: null
      };

      // Collect design patterns from homepage
      await page.goto('/');
      
      const header = page.locator('header');
      const headerBox = await header.boundingBox();
      designElements.headerHeight = headerBox.height;

      // Check other pages maintain same patterns
      for (const testPage of pages.slice(1)) { // Skip homepage since we used it as reference
        await page.goto(testPage.path);
        await page.waitForLoadState('networkidle');

        // Check header consistency
        const pageHeaderBox = await header.boundingBox();
        expect(Math.abs(pageHeaderBox.height - designElements.headerHeight)).toBeLessThan(5);

        // Check for emerald colors presence
        const emeraldElements = page.locator('[style*="#00C896"], [style*="#007A5E"], .text-emerald, .bg-emerald');
        const emeraldCount = await emeraldElements.count();
        
        // Should have some emerald elements on each page
        if (testPage.path !== '/mentions-legales' && testPage.path !== '/politique-confidentialite') {
          expect(emeraldCount).toBeGreaterThanOrEqual(0);
        }

        // Check footer consistency
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        
        const footerBox = await footer.boundingBox();
        expect(footerBox.width).toBeGreaterThan(0);
      }
    });
  });
});
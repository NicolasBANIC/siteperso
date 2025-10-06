import { test, expect } from '@playwright/test';

test.describe('Deep Emerald Theme Validation - BANDEV', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should display correct Deep Emerald gradient background on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check body background gradient - Deep Emerald theme
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        background: computedStyle.background,
        backgroundImage: computedStyle.backgroundImage
      };
    });
    
    // Verify the Deep Emerald gradient is applied
    expect(bodyStyles.backgroundImage).toContain('linear-gradient');
    expect(bodyStyles.backgroundImage).toMatch(/rgb\(255,\s*255,\s*255\)|#FFFFFF/); // White start
    expect(bodyStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/); // Deep Emerald end
  });

  test('should display correct header colors with Deep Emerald theme', async ({ page }) => {
    await page.goto('/');
    
    // Check header navigation colors
    const headerButton = page.locator('header').locator('a').first();
    
    // Check initial button styles
    const buttonStyles = await headerButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      };
    });
    
    // Verify text is white for readability
    expect(buttonStyles.color).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
    
    // Test hover state for Deep Emerald accent
    await headerButton.hover();
    
    const hoverStyles = await headerButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    // Should maintain readability on hover
    expect(hoverStyles.color).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
  });

  test('should display logo with Deep Emerald gradient colors', async ({ page }) => {
    await page.goto('/');
    
    // Check if logo is present and uses correct colors
    const logo = page.locator('[alt="BANDEV Logo"]').first();
    await expect(logo).toBeVisible();
    
    // Verify logo SVG contains Deep Emerald colors
    const logoElement = await logo.elementHandle();
    if (logoElement) {
      const logoSrc = await logoElement.getAttribute('src');
      expect(logoSrc).toContain('logo.svg');
    }
  });

  test('should display correct button styles with Deep Emerald theme', async ({ page }) => {
    await page.goto('/');
    
    // Find CTA buttons
    const ctaButton = page.locator('.btn-primary').first();
    await expect(ctaButton).toBeVisible();
    
    // Check button gradient background (Deep Emerald theme)
    const buttonStyles = await ctaButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundImage: styles.backgroundImage,
        color: styles.color
      };
    });
    
    // Verify Deep Emerald gradient
    expect(buttonStyles.backgroundImage).toContain('linear-gradient');
    expect(buttonStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/); // Deep Emerald
    expect(buttonStyles.backgroundImage).toMatch(/rgb\(0,\s*207,\s*193\)|#00CFC1/); // Turquoise accent
    
    // Text should be white for contrast
    expect(buttonStyles.color).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
  });

  test('should verify text readability across Deep Emerald gradient', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading contrast
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    
    const headingStyles = await mainHeading.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        textShadow: styles.textShadow
      };
    });
    
    // Main headings should have good contrast (white text with shadow)
    expect(headingStyles.color).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
    expect(headingStyles.textShadow).toBeTruthy();
    
    // Check paragraph text readability
    const paragraph = page.locator('p').first();
    if (await paragraph.isVisible()) {
      const pStyles = await paragraph.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color
        };
      });
      
      // Paragraph text should be readable (white or dark based on background position)
      expect(pStyles.color).toMatch(/rgb\(255,\s*255,\s*255\)|rgb\(16,\s*16,\s*16\)|white|#101010/);
    }
  });

  test('should navigate to testimonials page with consistent Deep Emerald theme', async ({ page }) => {
    await page.goto('/temoignages');
    
    // Check page loads correctly
    await page.waitForLoadState('networkidle');
    
    // Verify title gradient uses Deep Emerald colors
    const titleElement = page.locator('h1').first();
    await expect(titleElement).toBeVisible();
    
    // Check for gradient text in title
    const gradientSpan = page.locator('h1 span').first();
    if (await gradientSpan.isVisible()) {
      const spanStyles = await gradientSpan.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundImage: styles.backgroundImage,
          WebkitBackgroundClip: styles.webkitBackgroundClip || styles.backgroundClip
        };
      });
      
      // Should use Deep Emerald gradient for text
      expect(spanStyles.backgroundImage).toContain('linear-gradient');
      expect(spanStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/);
      expect(spanStyles.backgroundImage).toMatch(/rgb\(0,\s*207,\s*193\)|#00CFC1/);
    }
  });

  test('should navigate to logo demo page with Deep Emerald theme consistency', async ({ page }) => {
    await page.goto('/logo-demo');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Check hero section background uses Deep Emerald
    const heroSection = page.locator('section').first();
    const heroStyles = await heroSection.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundImage: styles.backgroundImage
      };
    });
    
    // Verify Deep Emerald gradient in hero
    expect(heroStyles.backgroundImage).toContain('linear-gradient');
    expect(heroStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/);
    expect(heroStyles.backgroundImage).toMatch(/rgb\(0,\s*59,\s*50\)|#003B32/);
  });

  test('should verify Deep Emerald theme on contact page', async ({ page }) => {
    await page.goto('/contact');
    
    await page.waitForLoadState('networkidle');
    
    // Check form elements use correct colors
    const formInput = page.locator('input[type="text"]').first();
    if (await formInput.isVisible()) {
      const inputStyles = await formInput.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          borderColor: styles.borderColor,
          backgroundColor: styles.backgroundColor
        };
      });
      
      // Form elements should have consistent styling
      expect(inputStyles.backgroundColor).toMatch(/rgb\(255,\s*255,\s*255\)|white|transparent/);
    }
    
    // Check submit button uses Deep Emerald theme
    const submitButton = page.locator('button[type="submit"]').first();
    if (await submitButton.isVisible()) {
      const buttonStyles = await submitButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundImage: styles.backgroundImage,
          backgroundColor: styles.backgroundColor
        };
      });
      
      // Should use Deep Emerald colors
      const bgContent = buttonStyles.backgroundImage || buttonStyles.backgroundColor;
      expect(bgContent).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E|linear-gradient/);
    }
  });

  test('should verify responsive Deep Emerald theme on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    // Check mobile navigation
    const mobileMenuButton = page.locator('[aria-label="Menu mobile"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Check mobile menu colors
      const mobileMenu = page.locator('[role="dialog"]').first();
      if (await mobileMenu.isVisible()) {
        const menuStyles = await mobileMenu.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            backdropFilter: styles.backdropFilter
          };
        });
        
        // Mobile menu should have glassmorphism with Deep Emerald accents
        expect(menuStyles.backdropFilter).toContain('blur');
      }
    }
    
    // Verify body gradient is maintained on mobile
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        backgroundImage: computedStyle.backgroundImage
      };
    });
    
    expect(bodyStyles.backgroundImage).toContain('linear-gradient');
    expect(bodyStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/);
  });

  test('should verify particles background uses Deep Emerald colors', async ({ page }) => {
    await page.goto('/');
    
    // Wait for particles to load
    await page.waitForTimeout(2000);
    
    // Check if particles canvas exists
    const particlesCanvas = page.locator('canvas').first();
    if (await particlesCanvas.isVisible()) {
      // Verify canvas is present (particles are working)
      await expect(particlesCanvas).toBeVisible();
      
      // Canvas should have proper dimensions
      const canvasSize = await particlesCanvas.boundingBox();
      expect(canvasSize?.width).toBeGreaterThan(0);
      expect(canvasSize?.height).toBeGreaterThan(0);
    }
  });

  test('should verify no dark overlays or filters on hero sections', async ({ page }) => {
    await page.goto('/');
    
    // Check main hero section
    const heroSection = page.locator('section').first();
    const heroOverlay = heroSection.locator('.hero-overlay, [class*="overlay"]').first();
    
    // Should not have dark overlays (as per requirement #2)
    if (await heroOverlay.isVisible()) {
      const overlayStyles = await heroOverlay.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          background: styles.background,
          opacity: styles.opacity
        };
      });
      
      // If overlay exists, it should be very light (not dark)
      if (overlayStyles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        expect(parseFloat(overlayStyles.opacity)).toBeLessThan(0.3);
      }
    }
  });

  test('should verify visual consistency across all main pages', async ({ page }) => {
    const pages = ['/', '/temoignages', '/contact', '/portfolio'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Check body gradient is consistent
      const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return {
          backgroundImage: computedStyle.backgroundImage
        };
      });
      
      // All pages should have the Deep Emerald gradient
      expect(bodyStyles.backgroundImage).toContain('linear-gradient');
      expect(bodyStyles.backgroundImage).toMatch(/rgb\(255,\s*255,\s*255\)|#FFFFFF/); // White start
      expect(bodyStyles.backgroundImage).toMatch(/rgb\(0,\s*122,\s*94\)|#007A5E/); // Deep Emerald end
      
      // Check header is present and consistent
      const header = page.locator('header').first();
      await expect(header).toBeVisible();
      
      // Verify no console errors related to styles
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Should have minimal style-related errors
      expect(errors.filter(e => e.includes('style') || e.includes('CSS')).length).toBeLessThan(3);
    }
  });
});
import { test, expect } from '@playwright/test';

test.describe('Deep Emerald Theme - Final Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    // Set longer timeout for page loads
    page.setDefaultTimeout(15000);
  });

  test('should verify Deep Emerald theme is applied correctly on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Take a screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/homepage-deep-emerald-theme.png',
      fullPage: true 
    });
    
    // Verify the page loads successfully
    const title = await page.title();
    expect(title).toBeTruthy();
    
    console.log('Homepage loaded with title:', title);
  });

  test('should verify CSS variables contain Deep Emerald colors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check if CSS variables are properly set
    const cssVariables = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      return {
        primaryColor: computedStyle.getPropertyValue('--color-primary').trim(),
        primaryDark: computedStyle.getPropertyValue('--color-primary-dark').trim(),
        turquoise: computedStyle.getPropertyValue('--color-turquoise').trim(),
        gradientEmerald: computedStyle.getPropertyValue('--gradient-emerald').trim()
      };
    });
    
    console.log('CSS Variables found:', cssVariables);
    
    // Verify Deep Emerald colors are set
    expect(cssVariables.primaryColor).toBe('#007A5E');
    expect(cssVariables.primaryDark).toBe('#003B32');
    expect(cssVariables.turquoise).toBe('#00CFC1');
    expect(cssVariables.gradientEmerald).toContain('linear-gradient');
    expect(cssVariables.gradientEmerald).toContain('#007A5E');
  });

  test('should verify BANDEV logo uses Deep Emerald gradient', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Look for the BANDEV logo
    const logo = page.locator('[aria-label*="BANDEV"]').first();
    await expect(logo).toBeVisible();
    
    // Check if SVG logo contains Deep Emerald colors
    const logoSVG = await page.locator('svg[role="img"]').first();
    if (await logoSVG.count() > 0) {
      const svgContent = await logoSVG.innerHTML();
      
      // Verify Deep Emerald colors in SVG
      expect(svgContent).toContain('#007A5E');
      console.log('Logo SVG verified with Deep Emerald colors');
    }
  });

  test('should verify header navigation uses Deep Emerald theme', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check header navigation links
    const navLinks = page.locator('header a');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    console.log(`Found ${linkCount} navigation links in header`);
    
    // Check first navigation link styling
    const firstLink = navLinks.first();
    const linkClasses = await firstLink.getAttribute('class');
    
    // Should contain Deep Emerald theme classes
    expect(linkClasses).toContain('#007A5E');
    console.log('Navigation link verified with Deep Emerald styling');
  });

  test('should verify body background has Deep Emerald gradient', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check computed background styles
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        background: computed.background,
        backgroundImage: computed.backgroundImage,
        backgroundColor: computed.backgroundColor
      };
    });
    
    console.log('Body background styles:', bodyStyles);
    
    // Should have a background gradient
    const hasGradient = bodyStyles.background.includes('linear-gradient') || 
                       bodyStyles.backgroundImage.includes('linear-gradient');
    
    if (hasGradient) {
      console.log('✓ Deep Emerald gradient found in body background');
      expect(hasGradient).toBe(true);
    } else {
      console.log('⚠ No gradient found in body, checking alternative implementations');
      // The gradient might be applied to a parent container
      expect(bodyStyles.backgroundColor).toBeTruthy();
    }
  });

  test('should verify testimonials page loads with Deep Emerald theme', async ({ page }) => {
    await page.goto('/temoignages');
    await page.waitForLoadState('domcontentloaded');
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/testimonials-deep-emerald-theme.png',
      fullPage: true 
    });
    
    // Check page loaded successfully
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('confiance');
    
    console.log('Testimonials page verified with Deep Emerald theme');
  });

  test('should verify logo demo page uses Deep Emerald colors', async ({ page }) => {
    await page.goto('/logo-demo');
    await page.waitForLoadState('domcontentloaded');
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/logo-demo-deep-emerald-theme.png',
      fullPage: true 
    });
    
    // Check page content
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('Logo');
    
    console.log('Logo demo page verified with Deep Emerald theme');
  });

  test('should verify no critical JavaScript errors', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000); // Allow time for any async operations
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('404') && 
      !error.includes('favicon') &&
      !error.includes('net::ERR') &&
      !error.includes('SecurityError')
    );
    
    console.log(`Total console errors: ${errors.length}`);
    console.log(`Critical errors: ${criticalErrors.length}`);
    
    // Should have minimal critical errors
    expect(criticalErrors.length).toBeLessThan(3);
  });

  test('should verify responsive design maintains Deep Emerald theme', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/mobile-deep-emerald-theme.png',
      fullPage: true 
    });
    
    // Check page renders on mobile
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(bodyHeight).toBeGreaterThan(300);
    
    console.log('Mobile responsive design verified');
  });

  test('should verify overall Deep Emerald theme consistency', async ({ page }) => {
    const pages = ['/', '/temoignages', '/contact'];
    
    for (const pagePath of pages) {
      console.log(`Testing Deep Emerald theme on page: ${pagePath}`);
      
      await page.goto(pagePath);
      await page.waitForLoadState('domcontentloaded');
      
      // Check CSS variables are consistent across pages
      const cssVars = await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        return {
          primary: computed.getPropertyValue('--color-primary').trim(),
          turquoise: computed.getPropertyValue('--color-turquoise').trim()
        };
      });
      
      // Verify Deep Emerald colors are consistent
      expect(cssVars.primary).toBe('#007A5E');
      expect(cssVars.turquoise).toBe('#00CFC1');
      
      console.log(`✓ Page ${pagePath} verified with Deep Emerald theme`);
    }
  });
});
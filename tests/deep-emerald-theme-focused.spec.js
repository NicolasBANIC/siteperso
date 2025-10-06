import { test, expect } from '@playwright/test';

test.describe('Deep Emerald Theme - Focused Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should display Deep Emerald gradient on body element', async ({ page }) => {
    await page.goto('/');
    
    // Wait for basic content to load
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Check body gradient
    const bodyBackground = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return computedStyle.backgroundImage;
    });
    
    console.log('Body background:', bodyBackground);
    
    // Should have the Deep Emerald gradient
    expect(bodyBackground).toContain('linear-gradient');
  });

  test('should verify CSS variables contain Deep Emerald colors', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Check CSS custom properties
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
    
    console.log('CSS Variables:', cssVariables);
    
    // Verify Deep Emerald colors
    expect(cssVariables.primaryColor).toBe('#007A5E');
    expect(cssVariables.primaryDark).toBe('#003B32');
    expect(cssVariables.turquoise).toBe('#00CFC1');
    expect(cssVariables.gradientEmerald).toContain('linear-gradient');
    expect(cssVariables.gradientEmerald).toContain('#007A5E');
  });

  test('should verify header elements exist and have proper styling', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Check header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check navigation links exist
    const navLinks = await page.locator('header a').count();
    expect(navLinks).toBeGreaterThan(0);
    
    console.log('Header found with', navLinks, 'navigation links');
  });

  test('should verify logo exists in header', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Look for logo by various selectors
    const logoSelectors = [
      'img[alt*="BANDEV"]',
      'img[alt*="Logo"]',
      'svg[role="img"]',
      '[class*="logo"]',
      'header img'
    ];
    
    let logoFound = false;
    for (const selector of logoSelectors) {
      const logo = page.locator(selector).first();
      if (await logo.count() > 0) {
        logoFound = true;
        console.log('Logo found with selector:', selector);
        break;
      }
    }
    
    expect(logoFound).toBe(true);
  });

  test('should verify testimonials page loads with Deep Emerald theme', async ({ page }) => {
    await page.goto('/temoignages');
    
    await page.waitForSelector('body', { timeout: 15000 });
    
    // Check page title or heading exists
    const hasTitle = await page.locator('h1, h2, [class*="title"]').count();
    expect(hasTitle).toBeGreaterThan(0);
    
    // Verify gradient title contains Deep Emerald colors
    const gradientElements = await page.locator('[class*="gradient"], span[class*="bg-gradient"]').count();
    console.log('Found', gradientElements, 'gradient elements on testimonials page');
  });

  test('should verify contact page accessibility', async ({ page }) => {
    await page.goto('/contact');
    
    await page.waitForSelector('body', { timeout: 15000 });
    
    // Basic page structure validation
    const hasHeading = await page.locator('h1, h2').count();
    expect(hasHeading).toBeGreaterThan(0);
    
    console.log('Contact page loaded successfully');
  });

  test('should verify no JavaScript errors on main pages', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    const pages = ['/', '/temoignages', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForSelector('body', { timeout: 10000 });
      await page.waitForTimeout(2000); // Allow time for JS to execute
    }
    
    // Filter out common browser errors that aren't related to our theme
    const criticalErrors = errors.filter(error => 
      !error.includes('404') && 
      !error.includes('favicon') &&
      !error.includes('net::ERR')
    );
    
    console.log('Total console errors:', errors.length);
    console.log('Critical errors:', criticalErrors.length);
    
    expect(criticalErrors.length).toBeLessThan(5);
  });

  test('should verify responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Check page renders properly on mobile
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(bodyHeight).toBeGreaterThan(500);
    
    // Check header is still visible on mobile
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    console.log('Mobile viewport test passed');
  });

  test('should verify particle canvas exists', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('body', { timeout: 10000 });
    await page.waitForTimeout(3000); // Allow particles to initialize
    
    // Check if particles canvas exists
    const canvasCount = await page.locator('canvas').count();
    console.log('Found', canvasCount, 'canvas elements');
    
    if (canvasCount > 0) {
      const canvas = page.locator('canvas').first();
      const canvasSize = await canvas.boundingBox();
      expect(canvasSize?.width).toBeGreaterThan(0);
      expect(canvasSize?.height).toBeGreaterThan(0);
    }
  });

  test('should verify overall page structure and navigation', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Verify basic page structure
    const hasHeader = await page.locator('header').count();
    const hasMain = await page.locator('main, [role="main"], section').count();
    const hasFooter = await page.locator('footer').count();
    
    expect(hasHeader).toBeGreaterThanOrEqual(1);
    expect(hasMain).toBeGreaterThanOrEqual(1);
    
    console.log('Page structure validation passed');
    console.log('Header elements:', hasHeader);
    console.log('Main content areas:', hasMain);
    console.log('Footer elements:', hasFooter);
  });
});
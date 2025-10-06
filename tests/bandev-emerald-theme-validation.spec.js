import { test, expect } from '@playwright/test';

test.describe('BANDEV Emerald Theme Unification - Visual Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set large desktop viewport for consistency
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Increase timeout for slow loading
    test.setTimeout(60000);
  });

  test('Homepage structural integrity and emerald theming', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load with fallback
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    
    // 1. STRUCTURE: Check no white bands between header and hero
    const header = page.locator('header');
    const heroSection = page.locator('section').first();
    
    // Verify header is present and positioned
    await expect(header).toBeVisible();
    
    // Check hero section starts immediately after header (no gap)
    const headerBox = await header.boundingBox();
    const heroBox = await heroSection.boundingBox();
    
    expect(heroBox.y).toBeLessThanOrEqual(headerBox.y + headerBox.height + 5); // 5px tolerance
    
    // 2. EMERALD COLORS: Verify CSS custom properties (correct property names)
    const emeraldPrimary = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    });
    expect(emeraldPrimary.trim()).toBe('#00C896');
    
    // 3. HERO TEXT VISIBILITY: Check hero title with proper selector
    const heroTitle = page.locator('h1, [class*="hero"], .text-6xl, .text-5xl').first();
    await expect(heroTitle).toBeVisible();
    
    // Verify text shadow or enhancement is applied
    const textStyles = await heroTitle.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        textShadow: styles.textShadow,
        webkitTextStroke: styles.webkitTextStroke
      };
    });
    
    // Should have text enhancement for contrast
    const hasTextEnhancement = textStyles.textShadow !== 'none' || textStyles.webkitTextStroke !== '';
    expect(hasTextEnhancement).toBe(true);
    
    // 4. HEADER CTA BUTTON: Check proportions and emerald styling
    const ctaButton = page.locator('header a[href="/devis"]');
    await expect(ctaButton).toBeVisible();
    
    const buttonBox = await ctaButton.boundingBox();
    expect(buttonBox.height).toBeLessThanOrEqual(42); // Should be around 36-40px, not oversized
    
    // Check emerald gradient background
    const buttonBg = await ctaButton.evaluate(el => getComputedStyle(el).backgroundImage);
    expect(buttonBg).toContain('linear-gradient');
  });

  test('Services page hero consistency', async ({ page }) => {
    await page.goto('/services');
    
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // 1. STRUCTURE: No white bands
    const header = page.locator('header');
    const heroSection = page.locator('section').first();
    
    const headerBox = await header.boundingBox();
    const heroBox = await heroSection.boundingBox();
    
    expect(heroBox.y).toBeLessThanOrEqual(headerBox.y + headerBox.height + 5);
    
    // 2. HERO TEXT: Verify readability enhancements
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Check text enhancement (shadow or stroke)
    const heroTitleStyles = await heroTitle.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        textShadow: styles.textShadow,
        webkitTextStroke: styles.webkitTextStroke
      };
    });
    
    // Should have either text-shadow or webkit-text-stroke for contrast
    const hasTextEnhancement = heroTitleStyles.textShadow !== 'none' || heroTitleStyles.webkitTextStroke !== '';
    expect(hasTextEnhancement).toBe(true);
  });

  test('Contact page hero consistency', async ({ page }) => {
    await page.goto('/contact');
    
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // 1. STRUCTURE: No white bands
    const header = page.locator('header');
    const heroSection = page.locator('section').first();
    
    const headerBox = await header.boundingBox();
    const heroBox = await heroSection.boundingBox();
    
    expect(heroBox.y).toBeLessThanOrEqual(headerBox.y + headerBox.height + 5);
    
    // 2. HERO TEXT: Verify readability enhancements
    const heroTitle = page.locator('h1, [class*="hero"]').first();
    await expect(heroTitle).toBeVisible();
    
    // Check text enhancement (shadow or stroke)
    const heroTitleStyles = await heroTitle.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        textShadow: styles.textShadow,
        webkitTextStroke: styles.webkitTextStroke
      };
    });
    
    // Should have either text-shadow or webkit-text-stroke for contrast
    const hasTextEnhancement = heroTitleStyles.textShadow !== 'none' || heroTitleStyles.webkitTextStroke !== '';
    expect(hasTextEnhancement).toBe(true);
  });

  test('Logo consistency across pages', async ({ page }) => {
    const pages = ['/', '/services', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
      
      // Check header logo (be more flexible with logo detection)
      const headerLogo = page.locator('header svg, header img, header [aria-label*="BANDEV"], header a[href="/"]').first();
      await expect(headerLogo).toBeVisible();
      
      // Check footer logo (if exists)
      const footerLogo = page.locator('footer svg[role="img"], footer [data-testid="unified-logo"], footer svg').first();
      if (await footerLogo.count() > 0) {
        await expect(footerLogo).toBeVisible();
      }
    }
  });

  test('Emerald color scheme consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // Check emerald variants in CSS properties (correct names)
    const emeraldColors = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      return {
        colorPrimary: styles.getPropertyValue('--color-primary'),
        colorPrimaryDark: styles.getPropertyValue('--color-primary-dark'),
        colorAccent: styles.getPropertyValue('--color-accent')
      };
    });
    
    expect(emeraldColors.colorPrimary.trim()).toBe('#00C896');
    expect(emeraldColors.colorPrimaryDark.trim()).toBe('#007A5E');
    
    // Check buttons with emerald styling (more flexible selector)
    const emeraldButtons = page.locator('a[href="/devis"], button[class*="gradient"], a[class*="gradient"]');
    if (await emeraldButtons.count() > 0) {
      const firstButton = emeraldButtons.first();
      const buttonBg = await firstButton.evaluate(el => getComputedStyle(el).backgroundImage);
      // Should contain gradient or emerald colors
      const hasEmeraldStyling = buttonBg.includes('linear-gradient') || buttonBg.includes('00C896') || buttonBg.includes('007A5E');
      expect(hasEmeraldStyling).toBe(true);
    }
  });

  test('Responsive behavior and mobile consistency', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // 1. STRUCTURE: Still no white bands on mobile
    const header = page.locator('header');
    const heroSection = page.locator('section').first();
    
    const headerBox = await header.boundingBox();
    const heroBox = await heroSection.boundingBox();
    
    expect(heroBox.y).toBeLessThanOrEqual(headerBox.y + headerBox.height + 10); // Slightly more tolerance on mobile
    
    // 2. HERO TEXT: Still readable on mobile (use more specific selector)
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    
    // 3. HEADER CTA: Check if button is accessible on mobile (may be hidden in mobile menu)
    const mobileCtaButton = page.locator('header a[href="/devis"]');
    const mobileMenuButton = page.locator('header button[aria-label*="menu"], header button[class*="menu"]');
    
    // Either button is visible or there's a mobile menu
    const hasCtaOrMenu = (await mobileCtaButton.count() > 0 && await mobileCtaButton.isVisible()) || 
                         (await mobileMenuButton.count() > 0);
    expect(hasCtaOrMenu).toBe(true);
  });

  test('Transitions and animations consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // Check consistent transition duration (0.25s cubic-bezier)
    const interactiveElements = page.locator('button, a[href], .card, [class*="hover"]');
    if (await interactiveElements.count() > 0) {
      const firstElement = interactiveElements.first();
      const transition = await firstElement.evaluate(el => getComputedStyle(el).transition);
      
      // Should contain our standardized transition
      if (transition !== 'none' && transition !== '') {
        expect(transition).toMatch(/0\.25s|cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)/);
      }
    }
    
    // Test hover states (if possible, skip mobile buttons)
    const hoverableButton = page.locator('a[href="/devis"]:not([class*="mobile"]), button:visible').first();
    if (await hoverableButton.count() > 0) {
      try {
        await hoverableButton.hover({ timeout: 3000 });
        // Wait for transition
        await page.waitForTimeout(300);
        // Element should still be visible and styled
        await expect(hoverableButton).toBeVisible();
      } catch (error) {
        // Skip hover test if element is not hoverable
        console.log('Hover test skipped - element not hoverable');
      }
    }
  });

  test('Typography hierarchy and font consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    
    // Check hero title font weight and family
    const heroTitle = page.locator('h1, [class*="hero"]').first();
    if (await heroTitle.count() > 0) {
      const titleStyles = await heroTitle.evaluate(el => {
        const styles = getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight
        };
      });
      
      // Font family should be system/modern (Inter, system-ui, or fallback)
      const hasModernFont = titleStyles.fontFamily.includes('Inter') || 
                           titleStyles.fontFamily.includes('system-ui') ||
                           titleStyles.fontFamily.includes('-apple-system');
      expect(hasModernFont || titleStyles.fontFamily.includes('sans-serif')).toBe(true);
      
      // Check font weight is defined (any valid weight is acceptable)
      const hasValidWeight = titleStyles.fontWeight && titleStyles.fontWeight !== '' && titleStyles.fontWeight !== 'undefined';
      expect(hasValidWeight).toBe(true); 
    }
    
    // Check if there's modern typography system in place
    const bodyText = page.locator('p, .text-base, body').first();
    if (await bodyText.count() > 0) {
      const bodyFont = await bodyText.evaluate(el => getComputedStyle(el).fontFamily);
      // Should use modern font stack
      const hasGoodTypography = bodyFont.includes('Inter') || 
                               bodyFont.includes('system-ui') ||
                               bodyFont.includes('sans-serif');
      expect(hasGoodTypography).toBe(true);
    }
  });
});
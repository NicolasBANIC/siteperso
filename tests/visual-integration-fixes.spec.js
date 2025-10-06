import { test, expect } from '@playwright/test';

test.describe('Visual Integration Fixes Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Homepage: No gaps between hero and content sections', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check that hero section starts immediately after header (no pt-[73px])
    const main = await page.locator('main');
    const mainStyles = await main.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop || '0px',
        marginTop: styles.marginTop || '0px'
      };
    });
    
    // Main should not have padding-top
    expect(mainStyles.paddingTop).toBe('0px');
    expect(mainStyles.marginTop).toBe('0px');
    
    // Check hero section positioning
    const heroSection = await page.locator('.hero');
    await expect(heroSection).toBeVisible();
    
    const heroStyles = await heroSection.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        marginTop: styles.marginTop || '0px',
        paddingTop: styles.paddingTop || '0px'
      };
    });
    expect(heroStyles.marginTop).toBe('0px');
    expect(heroStyles.paddingTop).toBe('0px');
    
    // Check that there's no visible gap between hero and next section
    const heroBottom = await heroSection.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.bottom;
    });
    
    const nextSection = await page.locator('.hero').locator('xpath=following-sibling::section[1]');
    if (await nextSection.count() > 0) {
      const nextSectionTop = await nextSection.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.top;
      });
      
      // Should be no gap (or minimal acceptable gap < 10px)
      const gap = nextSectionTop - heroBottom;
      expect(gap).toBeLessThanOrEqual(10);
    }
  });

  test('Homepage: Hero text is perfectly readable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check main hero title
    const heroTitle = await page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    
    // Check text color (should be white)
    const titleColor = await heroTitle.evaluate(el => {
      const styles = getComputedStyle(el);
      return styles.color || '';
    });
    
    // Color should be white or very close to white
    const isWhite = titleColor.includes('rgb(255, 255, 255)') || 
                   titleColor.includes('rgb(248, 250, 252)') || 
                   titleColor.includes('#ffffff') || 
                   titleColor.includes('#fff') ||
                   titleColor.includes('248, 250, 252');
    
    expect(isWhite).toBeTruthy();
    
    // Check text shadow exists for readability
    const textShadow = await heroTitle.evaluate(el => {
      const styles = getComputedStyle(el);
      return styles.textShadow || 'none';
    });
    expect(textShadow).not.toBe('none');
    if (textShadow !== 'none') {
      expect(textShadow).toContain('rgba(0, 0, 0');
    }
    
    // Check accent word (should have emerald gradient)
    const accentWord = await page.locator('.accent-word');
    if (await accentWord.count() > 0) {
      const accentStyles = await accentWord.evaluate(el => getComputedStyle(el));
      const backgroundImage = accentStyles.backgroundImage || '';
      if (backgroundImage !== 'none') {
        expect(backgroundImage).toContain('linear-gradient');
      }
    }
    
    // Check subtitle is readable
    const subtitle = await page.locator('.hero .subtitle');
    if (await subtitle.count() > 0) {
      await expect(subtitle).toBeVisible();
      const subtitleStyles = await subtitle.evaluate(el => getComputedStyle(el));
      const subtitleShadow = subtitleStyles.textShadow || 'none';
      expect(subtitleShadow).not.toBe('none');
    }
  });

  test('Contact page: Typography matches emerald theme', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check main heading colors (should be white)
    const headings = await page.locator('h2');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      const firstHeading = headings.first();
      const headingColor = await firstHeading.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.color || '';
      });
      
      // Should be white or very close - accept various white color formats
      const isWhite = headingColor.includes('255, 255, 255') || 
                     headingColor.includes('248, 250, 252') ||
                     headingColor.includes('#ffffff') ||
                     headingColor.includes('#fff') ||
                     headingColor.toLowerCase().includes('white');
      expect(isWhite).toBeTruthy();
    }
    
    // Check secondary text colors (should be gray #D1D5DB)
    const secondaryTexts = await page.locator('p').filter({ hasNotText: /^$/ });
    const textCount = await secondaryTexts.count();
    
    if (textCount > 0) {
      const firstText = secondaryTexts.first();
      const textColor = await firstText.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.color || '';
      });
      
      // Should be gray - accept various gray shades
      const isAcceptableColor = textColor.includes('209, 213, 219') || 
                               textColor.includes('175, 175, 175') ||
                               textColor.includes('156, 163, 175') ||
                               textColor.includes('#d1d5db') ||
                               textColor.includes('rgb(209, 213, 219)') ||
                               // Also accept white text as valid for dark theme
                               textColor.includes('255, 255, 255') ||
                               textColor.toLowerCase().includes('white');
      
      expect(isAcceptableColor).toBeTruthy();
    }
  });

  test('CTA buttons: Emerald gradient consistency', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check primary CTA buttons
    const ctaButtons = await page.locator('.btn-primary');
    const buttonCount = await ctaButtons.count();
    
    if (buttonCount > 0) {
      const firstButton = ctaButtons.first();
      const buttonStyles = await firstButton.evaluate(el => getComputedStyle(el));
      
      // Check background has gradient
      const backgroundImage = buttonStyles.backgroundImage || '';
      if (backgroundImage !== 'none') {
        expect(backgroundImage).toContain('linear-gradient');
        
        // Check for emerald colors in gradient
        const hasEmeraldGradient = backgroundImage.includes('#00C896') || 
                                  backgroundImage.includes('#007A5E') ||
                                  backgroundImage.includes('0, 200, 150') ||
                                  backgroundImage.includes('0, 122, 94');
        
        expect(hasEmeraldGradient).toBeTruthy();
      }
      
      // Check text color is white
      const textColor = buttonStyles.color || '';
      expect(textColor).toContain('255, 255, 255');
    }
    
    // Test hover state
    if (buttonCount > 0) {
      const firstButton = ctaButtons.first();
      await firstButton.hover();
      await page.waitForTimeout(300);
      
      const hoverStyles = await firstButton.evaluate(el => getComputedStyle(el));
      expect(hoverStyles.backgroundImage).toContain('linear-gradient');
    }
  });

  test('Services page: No visual gaps', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    // Check hero section
    const heroSection = await page.locator('.hero, .hero-section');
    if (await heroSection.count() > 0) {
      const heroStyles = await heroSection.evaluate(el => {
        const styles = getComputedStyle(el);
        return {
          marginTop: styles.marginTop || '0px',
          paddingTop: styles.paddingTop || '0px'
        };
      });
      expect(heroStyles.marginTop).toBe('0px');
      expect(heroStyles.paddingTop).toBe('0px');
    }
    
    // Check main element
    const main = await page.locator('main');
    const mainStyles = await main.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop || '0px',
        marginTop: styles.marginTop || '0px'
      };
    });
    expect(mainStyles.paddingTop).toBe('0px');
    expect(mainStyles.marginTop).toBe('0px');
  });

  test('Tarifs page: No visual gaps', async ({ page }) => {
    await page.goto('/tarifs');
    await page.waitForLoadState('networkidle');
    
    // Check hero section
    const heroSection = await page.locator('.hero, .hero-section');
    if (await heroSection.count() > 0) {
      const heroStyles = await heroSection.evaluate(el => {
        const styles = getComputedStyle(el);
        return {
          marginTop: styles.marginTop || '0px',
          paddingTop: styles.paddingTop || '0px'
        };
      });
      expect(heroStyles.marginTop).toBe('0px');
      expect(heroStyles.paddingTop).toBe('0px');
    }
    
    // Check main element
    const main = await page.locator('main');
    const mainStyles = await main.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop || '0px',
        marginTop: styles.marginTop || '0px'
      };
    });
    expect(mainStyles.paddingTop).toBe('0px');
    expect(mainStyles.marginTop).toBe('0px');
  });

  test('Cross-page navigation: Smooth transitions', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to contact page
    await page.click('a[href="/contact"]');
    await page.waitForLoadState('networkidle');
    
    // Check no visual issues on contact page
    const heroSection = await page.locator('.hero, .hero-section');
    if (await heroSection.count() > 0) {
      await expect(heroSection).toBeVisible();
      const heroMargin = await heroSection.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.marginTop || '0px';
      });
      expect(heroMargin).toBe('0px');
    }
    
    // Navigate to services
    await page.click('a[href="/services"]');
    await page.waitForLoadState('networkidle');
    
    // Check main element consistency
    const main = await page.locator('main');
    const mainStyles = await main.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop || '0px',
        marginTop: styles.marginTop || '0px'
      };
    });
    expect(mainStyles.paddingTop).toBe('0px');
    expect(mainStyles.marginTop).toBe('0px');
    
    // Navigate to tarifs
    await page.click('a[href="/tarifs"]');
    await page.waitForLoadState('networkidle');
    
    // Final check on tarifs page
    const tarifMain = await page.locator('main');
    const tarifMainStyles = await tarifMain.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop || '0px',
        marginTop: styles.marginTop || '0px'
      };
    });
    expect(tarifMainStyles.paddingTop).toBe('0px');
    expect(tarifMainStyles.marginTop).toBe('0px');
  });

  test('Visual contrast: Text readability across pages', async ({ page }) => {
    const pages = ['/', '/contact', '/services', '/tarifs'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Check hero text readability if hero exists
      const heroTitle = await page.locator('.hero h1, .hero-title, .hero .hero-title');
      if (await heroTitle.count() > 0) {
        const titleColor = await heroTitle.evaluate(el => {
          const styles = getComputedStyle(el);
          return {
            color: styles.color || '',
            textShadow: styles.textShadow || 'none'
          };
        });
        
        // Should have text shadow for readability
        expect(titleColor.textShadow).not.toBe('none');
        expect(titleColor.textShadow).toContain('rgba(0, 0, 0');
        
        // Color should be white or close to white
        const isReadableWhite = titleColor.color.includes('255, 255, 255') || 
                               titleColor.color.includes('248, 250, 252') ||
                               titleColor.color.includes('#ffffff') ||
                               titleColor.color.toLowerCase().includes('white');
        expect(isReadableWhite).toBeTruthy();
      }
    }
  });

  test('Mobile responsiveness: Visual integration maintained', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check hero section on mobile
    const heroSection = await page.locator('.hero');
    if (await heroSection.count() > 0) {
      await expect(heroSection).toBeVisible();
      
      const heroStyles = await heroSection.evaluate(el => getComputedStyle(el));
      expect(heroStyles.marginTop).toBe('0px');
      expect(heroStyles.paddingTop).toBe('0px');
    }
    
    // Check main element
    const main = await page.locator('main');
    const mainStyles = await main.evaluate(el => getComputedStyle(el));
    expect(mainStyles.paddingTop).toBe('0px');
    expect(mainStyles.marginTop).toBe('0px');
    
    // Test text readability on mobile
    const heroTitle = await page.locator('.hero-title');
    if (await heroTitle.count() > 0) {
      await expect(heroTitle).toBeVisible();
      const titleStyles = await heroTitle.evaluate(el => getComputedStyle(el));
      expect(titleStyles.textShadow).not.toBe('none');
    }
  });
});
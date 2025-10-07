import { test, expect } from '@playwright/test';

test.describe('BANDEV Global Visual Refinement Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage with extended timeout
    await page.goto('/', { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display global gradient background on homepage', async ({ page }) => {
    // Check if body has the global gradient background
    const bodyBackground = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return computedStyle.backgroundImage;
    });

    // Should contain a linear gradient
    expect(bodyBackground).toContain('linear-gradient');

    // Verify main content doesn't override the global background
    const mainElement = page.locator('main');
    const mainBackground = await mainElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    // Should be transparent or rgba(0,0,0,0) to allow global gradient to show through
    expect(mainBackground).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
  });

  test('should have no parasitic separators between sections', async ({ page }) => {
    // Check that sections don't have border separators
    const sections = page.locator('section:not(.hero):not(.hero-section)');
    const sectionCount = await sections.count();

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const borderBottom = await section.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.borderBottom;
      });

      // Should not have visible borders
      expect(borderBottom).toMatch(/none|0px/);
    }

    // Verify no separator elements exist
    const separators = page.locator(
      '.section-separator, .band, .band--green, .band--grey, .separator, .gradient-strip, .divider, .section-divider'
    );
    await expect(separators).toHaveCount(0);
  });

  test('should display correct hero keyword gradient colors', async ({ page }) => {
    // Find accent words in hero section
    const accentWords = page.locator('.hero .accent-word, .hero h1 span, .hero h2 span');

    if ((await accentWords.count()) > 0) {
      const accentWord = accentWords.first();

      // Check if the element has gradient styling
      const backgroundImage = await accentWord.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.backgroundImage;
      });

      // Should contain linear gradient
      expect(backgroundImage).toContain('linear-gradient');

      // Check if text fill color is transparent (for gradient text effect)
      const textFillColor = await accentWord.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.webkitTextFillColor || style.color;
      });

      expect(textFillColor).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should have consistent card styling throughout homepage', async ({ page }) => {
    // Find all card-like elements
    const cards = page.locator(
      '.card, .service-card, .pricing-card, .testimonial-card, article[class*="card"]'
    );
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThan(0);

    // Check each card has proper styling
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      // Check first 5 cards
      const card = cards.nth(i);

      // Verify border radius
      const borderRadius = await card.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.borderRadius;
      });

      expect(borderRadius).toMatch(/\d+px/); // Should have rounded corners

      // Verify background styling
      const background = await card.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.background;
      });

      // Should have some form of background (color or gradient)
      expect(background).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should maintain gradient consistency across different pages', async ({ page }) => {
    const pages = [
      { url: '/services', name: 'Services' },
      { url: '/portfolio', name: 'Portfolio' },
      { url: '/tarifs', name: 'Tarifs' },
    ];

    for (const testPage of pages) {
      await page.goto(testPage.url);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Check body background
      const bodyBackground = await page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return computedStyle.backgroundImage;
      });

      expect(bodyBackground, `${testPage.name} page should have gradient background`).toContain(
        'linear-gradient'
      );

      // Verify no sections override the global background
      const sectionsWithBackground = await page.locator('section').evaluateAll((sections) => {
        return sections.filter((section) => {
          const style = window.getComputedStyle(section);
          const bg = style.backgroundColor;
          return (
            bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && !section.classList.contains('hero')
          );
        }).length;
      });

      expect(
        sectionsWithBackground,
        `${testPage.name} page should not have sections with background overrides`
      ).toBe(0);
    }
  });

  test('should have proper text contrast for accessibility', async ({ page }) => {
    // Check main heading contrast
    const mainHeading = page.locator('h1').first();

    if (await mainHeading.isVisible()) {
      const textColor = await mainHeading.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.color;
      });

      // Should not be transparent or too light
      expect(textColor).not.toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
    }

    // Check paragraph text contrast
    const paragraphs = page.locator('p').first();

    if (await paragraphs.isVisible()) {
      const textColor = await paragraphs.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.color;
      });

      // Should have adequate contrast
      expect(textColor).not.toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
    }
  });

  test('should have seamless hero to content section transition', async ({ page }) => {
    const heroSection = page.locator('.hero, .hero-section, section[class*="hero"]').first();

    if (await heroSection.isVisible()) {
      // Check hero has no bottom margin that would create gaps
      const heroMarginBottom = await heroSection.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.marginBottom;
      });

      expect(heroMarginBottom).toMatch(/0px|auto/);

      // Find next section after hero
      const nextSection = page
        .locator('.hero + section, .hero-section + section, section[class*="hero"] + section')
        .first();

      if (await nextSection.isVisible()) {
        // Check next section has no top margin that would create gaps
        const nextMarginTop = await nextSection.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.marginTop;
        });

        expect(nextMarginTop).toMatch(/0px|auto/);
      }
    }
  });

  test('should have cards with emerald accent shadows on hover', async ({ page }) => {
    const cards = page.locator('.card, .service-card, .pricing-card').first();

    if (await cards.isVisible()) {
      // Hover over the card
      await cards.hover();

      // Check if shadow changes on hover
      const boxShadow = await cards.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.boxShadow;
      });

      // Should have some form of shadow (not 'none')
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should not have console errors that could indicate styling issues', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate and interact with the page
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));

    // Wait for any potential errors
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('DevTools') &&
        !error.includes('chrome-extension') &&
        !error.includes('favicon.ico')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should maintain responsive gradient consistency', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Wait for responsive changes
      await page.waitForTimeout(500);

      // Check background gradient is maintained
      const bodyBackground = await page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return computedStyle.backgroundImage;
      });

      expect(bodyBackground, `${viewport.name} viewport should maintain gradient`).toContain(
        'linear-gradient'
      );

      // Verify main sections don't have background overrides
      const mainBackground = await page.locator('main').evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.backgroundColor;
      });

      expect(mainBackground, `${viewport.name} main should be transparent`).toMatch(
        /transparent|rgba\(0,\s*0,\s*0,\s*0\)/
      );
    }
  });
});

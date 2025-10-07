import { test, expect } from '@playwright/test';

test.describe('BANDEV Harmonization & À Propos Removal Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage with extended timeout
    await page.goto('/', { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
  });

  test('should not display "À propos" links in header navigation', async ({ page }) => {
    // Check header navigation links
    const headerNavLinks = page.locator('header nav a, header navigation a');
    const headerLinkTexts = await headerNavLinks.allTextContents();

    // Verify "À propos" is not present in header navigation
    const hasAPropos = headerLinkTexts.some(
      (text) => text.toLowerCase().includes('à propos') || text.toLowerCase().includes('a propos')
    );

    expect(hasAPropos, 'Header should not contain "À propos" link').toBeFalsy();

    // Verify expected navigation items are present
    const expectedHeaderLinks = [
      'Accueil',
      'Services',
      'Processus',
      'Portfolio',
      'Tarifs',
      'Témoignages',
      'Contact',
    ];
    const presentLinks = headerLinkTexts.filter((text) => expectedHeaderLinks.includes(text));
    expect(presentLinks.length).toBeGreaterThan(5); // Should have most expected links
  });

  test('should not display "À propos" links in footer navigation', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Check footer navigation links
    const footerNavLinks = page.locator('footer nav a, footer ul li a');
    const footerLinkTexts = await footerNavLinks.allTextContents();

    // Verify "À propos" is not present in footer navigation
    const hasAPropos = footerLinkTexts.some(
      (text) => text.toLowerCase().includes('à propos') || text.toLowerCase().includes('a propos')
    );

    expect(hasAPropos, 'Footer should not contain "À propos" link').toBeFalsy();
  });

  test('should return 404 when attempting to access /apropos page', async ({ page }) => {
    // Navigate to the removed À propos page
    const response = await page.goto('/apropos', { waitUntil: 'domcontentloaded' });

    // Should return 404 status
    expect(response.status()).toBe(404);

    // Should show 404 page content
    const pageTitle = await page.title();
    expect(pageTitle.toLowerCase()).toMatch(/404|not found|page not found/);
  });

  test('should display hero sections without dark overlay filters', async ({ page }) => {
    // Find hero sections
    const heroSections = page.locator('.hero, .hero-section, section[class*="hero"]');
    const heroCount = await heroSections.count();

    expect(heroCount).toBeGreaterThan(0);

    // Check each hero section
    for (let i = 0; i < heroCount; i++) {
      const hero = heroSections.nth(i);

      // Check for overlay elements
      const overlayElements = hero.locator(
        '[class*="overlay"], [class*="backdrop"], .hero-overlay, .section-overlay'
      );
      const overlayCount = await overlayElements.count();

      // Should not have dark overlay elements
      expect(overlayCount, `Hero section ${i + 1} should not have overlay elements`).toBe(0);

      // Check for inline styles that might create dark overlays
      const beforePseudoElement = await hero.evaluate((el) => {
        const computed = window.getComputedStyle(el, '::before');
        return {
          background: computed.background,
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          opacity: computed.opacity,
        };
      });

      // Should not have dark semi-transparent backgrounds in pseudo elements
      if (
        beforePseudoElement.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
        beforePseudoElement.backgroundColor !== 'transparent'
      ) {
        const opacity = parseFloat(beforePseudoElement.opacity);
        expect(opacity, 'Hero overlay opacity should be very low or zero').toBeLessThan(0.1);
      }
    }
  });

  test('should display emerald-turquoise gradient on keyword text in headings', async ({
    page,
  }) => {
    // Find gradient text elements (keywords)
    const gradientTexts = page.locator(
      '.heading-gradient, .gradient-text, h1 .gradient, h2 .gradient, [class*="gradient"]'
    );

    if ((await gradientTexts.count()) > 0) {
      const firstGradientText = gradientTexts.first();

      // Check background image for gradient
      const backgroundImage = await firstGradientText.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.backgroundImage;
      });

      expect(backgroundImage).toContain('linear-gradient');

      // Check for emerald-turquoise color scheme in gradient
      const gradientColors = backgroundImage.toLowerCase();
      const hasEmeraldColors =
        gradientColors.includes('16, 163, 74') || // #16A34A
        gradientColors.includes('15, 143, 114') || // #0F8F72
        gradientColors.includes('0, 200, 180') || // #00C8B4
        gradientColors.includes('57, 189, 248'); // #39BDF8

      expect(hasEmeraldColors, 'Gradient should contain emerald-turquoise colors').toBeTruthy();

      // Verify text is transparent for gradient effect
      const color = await firstGradientText.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.webkitTextFillColor || style.color;
      });

      expect(color).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should display buttons with rounded corners and emerald-turquoise gradient', async ({
    page,
  }) => {
    // Find CTA buttons
    const buttons = page.locator('button, .btn, .button, [class*="cta"], a[class*="button"]');
    const buttonCount = await buttons.count();

    expect(buttonCount).toBeGreaterThan(0);

    // Check first few buttons
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);

      // Skip if button is not visible
      if (!(await button.isVisible())) continue;

      // Check border radius for rounded corners
      const borderRadius = await button.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.borderRadius;
      });

      // Should have significant border radius (approaching circular: 9999px)
      const radiusValue = parseInt(borderRadius);
      expect(radiusValue, `Button ${i + 1} should have rounded corners`).toBeGreaterThan(15);

      // Check for gradient background
      const background = await button.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          backgroundImage: style.backgroundImage,
          backgroundColor: style.backgroundColor,
        };
      });

      // Should have gradient or emerald-toned background
      const hasGradient = background.backgroundImage.includes('linear-gradient');
      const hasEmeraldBg =
        background.backgroundColor.includes('16, 163, 74') ||
        background.backgroundColor.includes('15, 143, 114') ||
        background.backgroundColor.includes('0, 200, 180');

      expect(
        hasGradient || hasEmeraldBg,
        `Button ${i + 1} should have gradient or emerald background`
      ).toBeTruthy();
    }
  });

  test('should have white background on homepage', async ({ page }) => {
    // Check body background
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        background: computed.background,
      };
    });

    // Should have white background or very light background
    const bgColor = bodyStyles.backgroundColor.toLowerCase();
    const isWhiteOrLight =
      bgColor.includes('255, 255, 255') ||
      bgColor.includes('rgba(255, 255, 255') ||
      bgColor === 'white' ||
      bgColor === 'transparent';

    expect(isWhiteOrLight, 'Homepage should have white or light background').toBeTruthy();

    // Check main content area
    const mainBackground = await page.locator('main').evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    // Main should be transparent to show body background
    expect(mainBackground).toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)|white/);
  });

  test('should display cards with harmonized gradient backgrounds', async ({ page }) => {
    // Find card elements
    const cards = page.locator('.card, .service-card, .pricing-card, article[class*="card"]');
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThan(0);

    // Check first few cards
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = cards.nth(i);

      if (!(await card.isVisible())) continue;

      // Check background for gradient or white background
      const background = await card.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          backgroundImage: style.backgroundImage,
          backgroundColor: style.backgroundColor,
          background: style.background,
        };
      });

      // Should have gradient background or white/light background
      const hasGradient = background.backgroundImage.includes('linear-gradient');
      const hasWhiteBg =
        background.backgroundColor.includes('255, 255, 255') ||
        background.backgroundColor === 'white';

      expect(
        hasGradient || hasWhiteBg,
        `Card ${i + 1} should have gradient or white background`
      ).toBeTruthy();

      // Check shadow properties
      const boxShadow = await card.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.boxShadow;
      });

      // Should have soft shadow
      expect(boxShadow).not.toBe('none');
      expect(boxShadow).toContain('rgba');
    }
  });

  test('should maintain harmonization across different viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1366, height: 768, name: 'Desktop Standard' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);

      // Check navigation remains without À propos
      const navLinks = page.locator('header nav a, header navigation a');
      const navTexts = await navLinks.allTextContents();
      const hasAPropos = navTexts.some((text) => text.toLowerCase().includes('à propos'));

      expect(hasAPropos, `${viewport.name}: Header should not contain À propos`).toBeFalsy();

      // Check gradient text is still working
      const gradientElements = page.locator('.heading-gradient, [class*="gradient"]');
      if ((await gradientElements.count()) > 0) {
        const backgroundImage = await gradientElements.first().evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.backgroundImage;
        });

        expect(backgroundImage, `${viewport.name}: Should maintain gradient text`).toContain(
          'linear-gradient'
        );
      }

      // Check buttons maintain styling
      const buttons = page.locator('button, .btn, [class*="button"]').first();
      if (await buttons.isVisible()) {
        const borderRadius = await buttons.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.borderRadius;
        });

        const radiusValue = parseInt(borderRadius);
        expect(
          radiusValue,
          `${viewport.name}: Buttons should maintain rounded corners`
        ).toBeGreaterThan(10);
      }
    }
  });

  test('should display text readability enhancement in hero without global dark overlay', async ({
    page,
  }) => {
    const heroSection = page.locator('.hero, .hero-section, section[class*="hero"]').first();

    if (await heroSection.isVisible()) {
      // Check for text elements that might have localized readability enhancement
      const heroText = heroSection.locator('h1, h2, p');

      if ((await heroText.count()) > 0) {
        const textElement = heroText.first();

        // Check for localized backdrop or text shadow for readability
        const styles = await textElement.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            textShadow: computed.textShadow,
            backgroundColor: computed.backgroundColor,
            backdropFilter: computed.backdropFilter,
            webkitBackdropFilter: computed.webkitBackdropFilter,
          };
        });

        // Should have some form of text readability enhancement (shadow, backdrop, etc.)
        const hasReadabilityEnhancement =
          styles.textShadow !== 'none' ||
          styles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
          styles.backdropFilter !== 'none' ||
          styles.webkitBackdropFilter !== 'none';

        // Text should be readable without requiring global dark overlay
        expect(
          hasReadabilityEnhancement,
          'Hero text should have readability enhancement'
        ).toBeTruthy();
      }
    }
  });

  test('should load all pages successfully without broken links to À propos', async ({ page }) => {
    const pagesToTest = [
      { url: '/', name: 'Homepage' },
      { url: '/services', name: 'Services' },
      { url: '/processus', name: 'Processus' },
      { url: '/portfolio', name: 'Portfolio' },
      { url: '/tarifs', name: 'Tarifs' },
      { url: '/temoignages', name: 'Témoignages' },
      { url: '/contact', name: 'Contact' },
    ];

    for (const testPage of pagesToTest) {
      const response = await page.goto(testPage.url, { waitUntil: 'domcontentloaded' });

      // Should load successfully
      expect(response.status(), `${testPage.name} should load successfully`).toBe(200);

      // Check for any À propos links that might be broken
      const aproposLinks = page.locator('a[href*="apropos"], a[href*="/apropos"]');
      const aproposLinkCount = await aproposLinks.count();

      expect(aproposLinkCount, `${testPage.name} should not contain À propos links`).toBe(0);
    }
  });
});

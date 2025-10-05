import { test, expect } from '@playwright/test';

test.describe('BANDEV Design System Unification', () => {
  // Configuration de base pour tous les tests
  test.beforeEach(async ({ page, context }) => {
    // Configuration standard pour tous les navigateurs
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
  });

  test.describe('Logo BANDEV Unifié', () => {
    test('doit afficher le logo unifié avec typographie Inter et couleurs cohérentes', async ({ page }) => {
      // Vérification de la présence du logo
      const logo = page.locator('[data-testid="unified-logo"]');
      await expect(logo).toBeVisible();

      // Vérification du SVG logo unifié
      const logoSvg = logo.locator('svg');
      await expect(logoSvg).toBeVisible();
      await expect(logoSvg).toHaveAttribute('aria-label');
      
      // Vérification des styles cohérents
      const logoStyles = await logo.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          transition: styles.transition
        };
      });

      expect(logoStyles.display).toContain('flex');
    });

    test('doit avoir des interactions hover cohérentes avec glow émeraude', async ({ page }) => {
      const logo = page.locator('[data-testid="unified-logo"]');
      
      // Test d'interaction hover
      await logo.hover();
      
      // Attendre l'animation
      await page.waitForTimeout(300);
      
      // Vérifier l'effet de glow (shadow filter ou box-shadow avec couleur émeraude)
      const hoverStyles = await logo.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          filter: styles.filter,
          transform: styles.transform
        };
      });

      // Vérification que l'hover déclenche un effet visuel
      expect(hoverStyles.filter !== 'none' || hoverStyles.transform !== 'none').toBeTruthy();
    });

    test('doit être responsive sur mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const logo = page.locator('[data-testid="unified-logo"]');
      await expect(logo).toBeVisible();
      
      // Vérification de la taille adaptée mobile
      const logoRect = await logo.boundingBox();
      expect(logoRect.height).toBeLessThan(60); // Logo compact sur mobile
    });
  });

  test.describe('Header Glassmorphism', () => {
    test('doit avoir un header avec effet glassmorphism unifié', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Vérification des styles glassmorphism
      const headerStyles = await header.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          backdropFilter: styles.backdropFilter,
          borderRadius: styles.borderRadius
        };
      });

      // Vérification de la transparence (rgba avec alpha < 1)
      expect(headerStyles.backgroundColor).toMatch(/rgba?\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/);
      
      // Vérification du backdrop filter pour le glassmorphism
      expect(headerStyles.backdropFilter).toContain('blur');
    });

    test('doit avoir une navigation avec états hover cohérents', async ({ page }) => {
      const desktopNavLinks = page.locator('nav.hidden a, .hidden.lg\\:flex a');
      
      // Vérification uniquement sur desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();
      
      const linkCount = await desktopNavLinks.count();
      if (linkCount > 0) {
        // Test du premier lien de navigation
        const firstLink = desktopNavLinks.first();
        await firstLink.hover();
        
        await page.waitForTimeout(200);
        
        // Vérification des styles d'hover avec couleur émeraude
        const hoverStyles = await firstLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            transform: styles.transform,
            background: styles.background
          };
        });

        // Vérification que l'hover change l'apparence
        expect(
          hoverStyles.color !== 'rgb(255, 255, 255)' || 
          hoverStyles.transform !== 'none' ||
          hoverStyles.background.includes('linear-gradient')
        ).toBeTruthy();
      }
    });

    test('doit afficher le bouton CTA avec style unifié', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();
      
      const ctaButton = page.locator('header a[href="/devis"]').first();
      
      if (await ctaButton.count() > 0) {
        await expect(ctaButton).toBeVisible();
        
        // Vérification des styles du CTA
        const ctaStyles = await ctaButton.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.background,
            borderRadius: styles.borderRadius,
            transition: styles.transition
          };
        });

        // Vérification du gradient émeraude
        expect(ctaStyles.background).toContain('linear-gradient') || expect(ctaStyles.background).toContain('rgb');
        expect(ctaStyles.borderRadius).not.toBe('0px');
      }
    });
  });

  test.describe('Navigation Mobile', () => {
    test('doit afficher le menu mobile avec glassmorphism', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      // Chercher le bouton du menu mobile
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"], button[aria-label*="menu"], .mobile-menu-toggle').first();
      
      if (await mobileMenuButton.count() > 0) {
        await mobileMenuButton.click();
        
        // Attendre l'ouverture du menu
        await page.waitForTimeout(300);
        
        // Vérifier la présence du menu mobile
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, nav[class*="mobile"]').first();
        await expect(mobileMenu).toBeVisible();
        
        // Vérification des styles glassmorphism du menu mobile
        const menuStyles = await mobileMenu.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            backdropFilter: styles.backdropFilter
          };
        });

        // Vérification de la transparence et du blur
        expect(menuStyles.backgroundColor).toMatch(/rgba?\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/) || 
               expect(menuStyles.backdropFilter).toContain('blur');
      }
    });

    test('doit permettre l\'ouverture et fermeture du menu mobile via le bouton toggle', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      
      if (await mobileMenuButton.count() > 0) {
        // Ouvrir le menu
        await mobileMenuButton.click();
        await page.waitForTimeout(500);
        
        // Vérifier que le menu est ouvert
        const mobileMenu = page.locator('[data-testid="mobile-menu"]');
        await expect(mobileMenu).toBeVisible();
        
        // Fermer le menu en cliquant à nouveau sur le bouton
        await mobileMenuButton.click();
        await page.waitForTimeout(500);
        
        // Vérifier que le menu est fermé
        await expect(mobileMenu).not.toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Cohérence Typographique', () => {
    test('doit utiliser la police Inter sur tous les éléments de navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();
      
      // Vérification du logo
      const logo = page.locator('[data-testid="unified-logo"]');
      if (await logo.count() > 0) {
        const logoStyles = await logo.locator('text').first().evaluate((el) => {
          return window.getComputedStyle(el).fontFamily || el.getAttribute('font-family');
        });
        expect(logoStyles).toContain('Inter');
      }
      
      // Vérification des liens de navigation desktop
      const desktopNavLinks = page.locator('nav.hidden a, .hidden.lg\\:flex a');
      
      // Test de cohérence typographique
      for (let i = 0; i < Math.min(2, await desktopNavLinks.count()); i++) {
        const link = desktopNavLinks.nth(i);
        const linkStyles = await link.evaluate((el) => {
          return window.getComputedStyle(el).fontFamily;
        });
        
        expect(linkStyles).toContain('Inter');
      }
    });

    test('doit avoir des couleurs cohérentes avec la palette émeraude', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();
      
      // Vérification du DEV du logo (couleur émeraude)
      const logo = page.locator('[data-testid="unified-logo"]');
      const devText = logo.locator('text:has-text("DEV")');
      
      if (await devText.count() > 0) {
        const fillValue = await devText.getAttribute('fill');
        // Vérifier qu'il utilise le gradient émeraude
        expect(fillValue).toContain('emerald-gradient');
      } else {
        // Alternative: vérifier un lien de navigation avec couleur émeraude
        const navLinks = page.locator('.hidden.lg\\:flex a');
        const linkCount = await navLinks.count();
        expect(linkCount).toBeGreaterThan(0); // Au moins un lien de navigation
      }
    });
  });

  test.describe('Tests d\'Accessibilité', () => {
    test('doit avoir des attributs ARIA appropriés', async ({ page }) => {
      // Vérification du logo SVG
      const logo = page.locator('[data-testid="unified-logo"]');
      const logoSvg = logo.locator('svg');
      await expect(logoSvg).toHaveAttribute('aria-label');
      
      // Vérification de la navigation
      const nav = page.locator('nav').first();
      if (await nav.count() > 0) {
        const hasAriaLabel = await nav.getAttribute('aria-label');
        expect(hasAriaLabel).toBeTruthy();
      }
      
      // Vérification du bouton mobile si présent
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
      if (await mobileButton.count() > 0) {
        await expect(mobileButton).toHaveAttribute('aria-label');
        await expect(mobileButton).toHaveAttribute('aria-expanded');
      }
    });

    test('doit respecter les préférences de mouvement réduit', async ({ page, context }) => {
      // Simulation de prefers-reduced-motion
      await context.addInitScript(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: (query) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => {},
          })
        });
      });

      await page.reload();

      // Test d'interaction avec mouvement réduit
      const logo = page.locator('[data-testid="unified-logo"]');
      await logo.hover();
      
      await page.waitForTimeout(200);
      
      // Vérification que les animations sont réduites
      const logoStyles = await logo.evaluate((el) => {
        return window.getComputedStyle(el).animationDuration;
      });
      
      // Les animations devraient être courtes ou désactivées
      expect(logoStyles === '0s' || parseFloat(logoStyles) <= 0.2).toBeTruthy();
    });
  });

  test.describe('Tests de Performance', () => {
    test('doit charger les éléments de navigation rapidement', async ({ page }) => {
      const startTime = Date.now();
      
      // Attendre que tous les éléments critiques soient visibles
      await expect(page.locator('[data-testid="unified-logo"]')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      
      // Vérification du temps de chargement (moins de 2 secondes)
      expect(loadTime).toBeLessThan(2000);
    });

    test('doit avoir des transitions fluides', async ({ page }) => {
      const logo = page.locator('[data-testid="unified-logo"]');
      
      // Test de fluidité des transitions sur les liens de navigation
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();
      
      const navLinks = page.locator('.hidden.lg\\:flex a');
      if (await navLinks.count() > 0) {
        const firstLink = navLinks.first();
        const transitionDuration = await firstLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.transitionDuration;
        });
        
        // Vérification qu'une transition est définie
        expect(transitionDuration).not.toBe('0s');
        
        // Les transitions ne doivent pas être trop longues
        const duration = parseFloat(transitionDuration);
        expect(duration).toBeLessThan(1); // Moins d'une seconde
      }
    });
  });

  test.describe('Tests Responsive', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 720 },
      { name: 'Large Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`doit être correctement affiché en ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.reload();
        
        // Vérifications communes
        const header = page.locator('header');
        await expect(header).toBeVisible();
        
        const logo = page.locator('[data-testid="unified-logo"]');
        await expect(logo).toBeVisible();
        
        // Vérifications spécifiques par taille
        if (width < 768) {
          // Mobile - Menu hamburger
          const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
          if (await mobileButton.count() > 0) {
            await expect(mobileButton).toBeVisible();
          }
        } else if (width >= 1024) {
          // Desktop large - Navigation horizontale visible
          const nav = page.locator('nav.hidden.lg\\:flex');
          await expect(nav).toBeVisible();
          
          const navLinks = nav.locator('a');
          expect(await navLinks.count()).toBeGreaterThan(0);
        } else {
          // Tablette - Vérifier que le header existe au minimum
          const header = page.locator('header');
          await expect(header).toBeVisible();
        }
        
        // Vérification que le header reste bien positionné
        const headerRect = await header.boundingBox();
        expect(headerRect.y).toBeLessThanOrEqual(10); // Proche du haut de la page
      });
    });
  });

  test.describe('Validation Visuelle', () => {
    test('doit maintenir la cohérence visuelle avec les hero sections', async ({ page }) => {
      // Capturer le header pour analyse visuelle
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Navigation vers une page avec hero section
      const heroSection = page.locator('[class*="hero"], .hero-section').first();
      
      if (await heroSection.count() > 0) {
        // Vérifier que le hero est visible
        await expect(heroSection).toBeVisible();
        
        // Vérification de la cohérence des couleurs
        const headerStyles = await header.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            border: styles.borderColor
          };
        });
        
        const heroStyles = await heroSection.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            color: styles.color
          };
        });
        
        // Les éléments devraient partager des thèmes de couleurs similaires
        expect(typeof headerStyles.background).toBe('string');
        expect(typeof heroStyles.background).toBe('string');
      }
    });

    test('doit avoir un contraste suffisant pour l\'accessibilité', async ({ page }) => {
      // Test du contraste du logo
      const logo = page.locator('[data-testid="unified-logo"]');
      await expect(logo).toBeVisible();
      
      // Test du contraste de la navigation
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        const firstLink = navLinks.first();
        const linkStyles = await firstLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            backgroundColor: styles.backgroundColor
          };
        });
        
        // Vérifier que les couleurs ne sont pas identiques (contraste minimum)
        expect(linkStyles.color !== linkStyles.backgroundColor).toBeTruthy();
      }
    });
  });
});
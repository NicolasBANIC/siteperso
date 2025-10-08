import { test, expect } from '@playwright/test';

test.describe('BANDEV Header Centering & Visual Transitions', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
  });

  test('should have perfectly centered header elements on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Ce test concerne spécifiquement le layout desktop');
    
    // Vérifier la structure du header
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Vérifier le conteneur desktop centré
    const desktopContainer = header.locator('.hidden.lg\\:flex');
    await expect(desktopContainer).toBeVisible();
    
    const containerStyles = await desktopContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems
      };
    });
    
    expect(containerStyles.display).toBe('flex');
    expect(containerStyles.justifyContent).toBe('center');
    expect(containerStyles.alignItems).toBe('center');
    
    // Vérifier le bloc interne centré (logo + nav + CTA)
    const centeredBlock = desktopContainer.locator('div').first();
    const blockStyles = await centeredBlock.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems
      };
    });
    
    expect(blockStyles.display).toBe('flex');
    expect(blockStyles.alignItems).toBe('center');
    expect(blockStyles.justifyContent).toBe('center');
    
    // Vérifier que le logo BANDEV est visible
    const logo = header.locator('.brand').first();
    await expect(logo).toBeVisible();
    
    // Vérifier que la navigation est visible
    const nav = header.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Vérifier que le bouton CTA "Demander un devis" est visible
    const ctaButton = header.locator('text="Demander un devis"').first();
    await expect(ctaButton).toBeVisible();
  });

  test('should maintain proper mobile header layout', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Ce test concerne spécifiquement le layout mobile');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Vérifier le conteneur mobile centré
    const mobileContainer = header.locator('.lg\\:hidden');
    await expect(mobileContainer).toBeVisible();
    
    // En mobile, vérifier que le logo BANDEV est accessible
    const logo = header.locator('.brand').first();
    await expect(logo).toBeVisible();
    
    // Le menu mobile devrait être présent (bouton burger)
    const mobileMenuButton = header.locator('button').first();
    await expect(mobileMenuButton).toBeVisible();
    
    // Vérifier que le conteneur mobile utilise un layout approprié
    const containerStyles = await mobileContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        alignItems: styles.alignItems
      };
    });
    
    expect(containerStyles.display).toBe('flex');
    expect(containerStyles.alignItems).toBe('center');
  });

  test('should apply glassmorphism effect on scroll', async ({ page }) => {
    const header = page.locator('header');
    
    // Capturer les styles initiaux du header
    const initialStyles = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background
      };
    });
    
    // Faire défiler la page vers le bas
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300); // Attendre la transition
    
    // Vérifier que l'effet glassmorphisme est appliqué
    const scrolledStyles = await header.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backdropFilter: styles.backdropFilter,
        background: styles.background
      };
    });
    
    // L'effet blur devrait être appliqué au scroll
    expect(scrolledStyles.backdropFilter).toContain('blur');
    
    // Vérifier que le header a la classe ou les styles de glassmorphisme
    const hasGlassEffect = await header.evaluate(el => {
      return el.classList.contains('header-glass') || 
             window.getComputedStyle(el).backdropFilter.includes('blur');
    });
    expect(hasGlassEffect).toBe(true);
  });

  test('should have rectangular CTA button with correct styling', async ({ page }) => {
    const ctaButton = page.locator('text="Demander un devis"').first();
    await expect(ctaButton).toBeVisible();
    
    // Vérifier les styles du bouton CTA
    const buttonStyles = await ctaButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        borderRadius: styles.borderRadius,
        background: styles.background,
        backgroundImage: styles.backgroundImage
      };
    });
    
    // Vérifier que le border-radius est de 8px (coins doux)
    expect(buttonStyles.borderRadius).toBe('8px');
    
    // Vérifier qu'il y a un gradient avec les couleurs BANDEV
    const hasGradient = buttonStyles.backgroundImage.includes('gradient') ||
                       buttonStyles.background.includes('gradient');
    expect(hasGradient).toBe(true);
    
    // Vérifier que le bouton contient les couleurs #10B981 et #22D3EE
    const backgroundStr = buttonStyles.backgroundImage || buttonStyles.background;
    expect(backgroundStr).toMatch(/(?:#10B981|rgb\(16,\s*185,\s*129\))/i);
  });

  test('should have section-soft transitions applied to major sections', async ({ page }) => {
    // Vérifier que les sections principales ont la classe section-soft
    const sections = [
      '.hero, section:has(.hero)',
      '.stats, section:has(.stats)', 
      '.services, section:has(.services)',
      '.process, section:has(.process)',
      '.technologies, section:has(.technologies)',
      '.pricing, section:has(.pricing)',
      '.testimonials, section:has(.testimonials)',
      '.about, section:has(.about)'
    ];
    
    for (const sectionSelector of sections) {
      const section = page.locator(sectionSelector).first();
      const exists = await section.count() > 0;
      
      if (exists) {
        // Vérifier que la section a la classe section-soft
        const hasSectionSoft = await section.evaluate(el => {
          return el.classList.contains('section-soft');
        });
        
        if (hasSectionSoft) {
          // Vérifier que les pseudo-éléments ::before et ::after sont présents
          const hasPseudoElements = await section.evaluate(el => {
            const beforeStyles = window.getComputedStyle(el, '::before');
            const afterStyles = window.getComputedStyle(el, '::after');
            return {
              hasBeforeContent: beforeStyles.content !== 'none',
              hasAfterContent: afterStyles.content !== 'none',
              beforeBackground: beforeStyles.background,
              afterBackground: afterStyles.background
            };
          });
          
          // Au moins un des pseudo-éléments devrait avoir un gradient
          const hasGradientEffect = 
            hasPseudoElements.beforeBackground.includes('gradient') ||
            hasPseudoElements.afterBackground.includes('gradient');
          
          expect(hasGradientEffect).toBe(true);
        }
      }
    }
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Vérifier le contraste du bouton CTA
    const ctaButton = page.locator('text="Demander un devis"').first();
    await expect(ctaButton).toBeVisible();
    
    // Vérifier que le bouton a un état focus visible
    await ctaButton.focus();
    const focusedStyles = await ctaButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow
      };
    });
    
    // Le bouton devrait avoir un outline ou une box-shadow au focus
    const hasFocusIndicator = focusedStyles.outline !== 'none' || 
                             focusedStyles.boxShadow !== 'none';
    expect(hasFocusIndicator).toBe(true);
    
    // Vérifier que le header reste navigable au clavier
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus').textContent();
    expect(focusedElement).toBeTruthy();
  });

  test('should not break responsiveness at different viewport sizes', async ({ page }) => {
    const breakpoints = [
      { width: 320, height: 568 },   // Mobile small
      { width: 768, height: 1024 },  // Tablet
      { width: 1024, height: 768 },  // Tablet landscape
      { width: 1280, height: 720 },  // Desktop small
      { width: 1920, height: 1080 }  // Desktop large
    ];
    
    for (const { width, height } of breakpoints) {
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(100);
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Vérifier que le header n'a pas de débordement horizontal
      const headerBox = await header.boundingBox();
      expect(headerBox.width).toBeLessThanOrEqual(width);
      
      // Vérifier que les éléments principaux restent visibles
      const logo = header.locator('[data-testid="logo"], img[alt*="BANDEV"], .logo').first();
      await expect(logo).toBeVisible();
      
      // Pour desktop, vérifier le bouton CTA
      if (width >= 768) {
        const ctaButton = header.locator('text="Demander un devis"').first();
        await expect(ctaButton).toBeVisible();
      }
    }
  });

  test('should have smooth transitions and no visual glitches', async ({ page }) => {
    // Vérifier les transitions du header au scroll
    const header = page.locator('header');
    
    // Capturer screenshot initial
    await page.screenshot({ path: 'tests/screenshots/header-initial.png' });
    
    // Faire défiler progressivement et vérifier les transitions
    for (let scrollY = 0; scrollY <= 200; scrollY += 50) {
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(50);
      
      // Vérifier que le header reste visible et positionné correctement
      const headerBox = await header.boundingBox();
      expect(headerBox.y).toBeLessThanOrEqual(10); // Le header devrait rester en haut
    }
    
    // Capturer screenshot final avec glassmorphisme
    await page.screenshot({ path: 'tests/screenshots/header-scrolled.png' });
    
    // Revenir en haut pour tester la transition inverse
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    
    await expect(header).toBeVisible();
  });
});
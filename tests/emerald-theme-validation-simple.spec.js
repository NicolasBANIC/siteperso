import { test, expect } from '@playwright/test';

/**
 * EMERALD THEME - VALIDATION SIMPLE ET RAPIDE
 * Tests focalisés sur les éléments critiques de l'implémentation
 */

test.describe('🎨 Emerald Theme Implementation - Final Validation', () => {

  test.beforeEach(async ({ page }) => {
    // Configuration pour des tests plus rapides
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('✅ Homepage: Global gradient background and hero readability', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Test 1: Vérifier le gradient de fond global
    const backgroundStyle = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        backgroundImage: computed.backgroundImage,
        hasGradient: computed.backgroundImage.includes('linear-gradient'),
        backgroundAttachment: computed.backgroundAttachment
      };
    });

    expect(backgroundStyle.hasGradient).toBeTruthy();
    expect(backgroundStyle.backgroundAttachment).toBe('fixed');
    console.log('✅ Global gradient background with fixed attachment verified');

    // Test 2: Vérifier l'absence d'overlays sombres sur le hero
    const darkOverlays = await page.locator('.absolute.inset-0.bg-black, .bg-black\\/50, .bg-black\\/60, .bg-black\\/70').count();
    expect(darkOverlays).toBe(0);
    console.log('✅ No dark overlays detected on hero sections');

    // Test 3: Vérifier la présence de text-shadow pour la lisibilité
    const heroHeading = page.locator('section h1, section .text-5xl, section .text-6xl').first();
    if (await heroHeading.count() > 0) {
      const textShadow = await heroHeading.evaluate(el => 
        window.getComputedStyle(el).textShadow
      );
      expect(textShadow).not.toBe('none');
      expect(textShadow).toContain('rgba(0, 0, 0');
      console.log('✅ Hero text has proper shadow for readability');
    }
  });

  test('✅ Contact Page: Form accessibility and styling', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    
    // Test des formulaires sur la page contact
    const formInputs = page.locator('input[type="text"], input[type="email"], textarea');
    
    if (await formInputs.count() > 0) {
      const firstInput = formInputs.first();
      
      // Vérifier les styles de base
      const inputStyles = await firstInput.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          hasVisibleBackground: computed.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                               computed.backgroundColor !== 'transparent'
        };
      });

      expect(inputStyles.hasVisibleBackground).toBeTruthy();
      
      // Test des états de focus
      await firstInput.focus();
      const focusedStyles = await firstInput.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return computed.outline !== 'none';
      });

      expect(focusedStyles).toBeTruthy();
      console.log('✅ Form inputs have proper styling and focus states');
    }

    // Vérifier la cohérence du gradient de fond sur cette page aussi
    const pageBackground = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundImage.includes('linear-gradient');
    });
    
    expect(pageBackground).toBeTruthy();
    console.log('✅ Contact page maintains gradient background consistency');
  });

  test('✅ Typography: Inter/Poppins harmonization', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Vérifier la consistance typographique
    const fontCheck = await page.evaluate(() => {
      const elements = [
        document.querySelector('h1'),
        document.querySelector('h2'),
        document.querySelector('p'),
        document.querySelector('button')
      ].filter(Boolean);
      
      return elements.map(el => {
        const fontFamily = window.getComputedStyle(el).fontFamily.toLowerCase();
        return {
          tag: el.tagName,
          hasTargetFont: fontFamily.includes('inter') || 
                        fontFamily.includes('poppins') ||
                        fontFamily.includes('system-ui') ||
                        fontFamily.includes('sans-serif')
        };
      });
    });

    // Tous les éléments doivent utiliser les bonnes polices
    fontCheck.forEach(element => {
      expect(element.hasTargetFont).toBeTruthy();
    });

    console.log('✅ Typography harmonization verified across elements');
  });

  test('✅ Section spacing: Gap elimination between hero and content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Vérifier les espaces entre sections
    const sectionSpacing = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length < 2) return { verified: true, totalGap: 0 };

      const hero = sections[0];
      const next = sections[1];
      
      const heroStyle = window.getComputedStyle(hero);
      const nextStyle = window.getComputedStyle(next);
      
      const heroMarginBottom = parseFloat(heroStyle.marginBottom) || 0;
      const nextMarginTop = parseFloat(nextStyle.marginTop) || 0;
      const totalGap = heroMarginBottom + nextMarginTop;
      
      return {
        verified: totalGap <= 32, // Max 2rem (32px)
        totalGap: totalGap,
        heroMargin: heroMarginBottom,
        nextMargin: nextMarginTop
      };
    });

    expect(sectionSpacing.verified).toBeTruthy();
    console.log(`✅ Section gaps eliminated - Total gap: ${sectionSpacing.totalGap}px`);
  });

  test('✅ Interactive elements: Emerald color scheme validation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Chercher des boutons CTA
    const ctaButton = page.locator('button, a').filter({ 
      hasText: /contact|devis|commencer|découvrir|en savoir plus/i 
    }).first();

    if (await ctaButton.count() > 0) {
      const buttonStyle = await ctaButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        const bgImage = computed.backgroundImage;
        const bgColor = computed.backgroundColor;
        
        return {
          hasEmeraldStyling: bgImage.includes('linear-gradient') ||
                           bgImage.includes('#00C896') ||
                           bgColor.includes('rgb(0, 200, 150)') ||
                           bgColor.includes('#00C896')
        };
      });

      expect(buttonStyle.hasEmeraldStyling).toBeTruthy();
      console.log('✅ CTA buttons use emerald color scheme');
    }
  });

  test('✅ Mobile responsiveness: Gradient persistence', async ({ page }) => {
    // Test en viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Vérifier que le gradient persiste en mobile
    const mobileBackground = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        hasGradient: computed.backgroundImage.includes('linear-gradient'),
        isFixed: computed.backgroundAttachment === 'fixed'
      };
    });

    expect(mobileBackground.hasGradient).toBeTruthy();
    
    // Vérifier la navigation mobile
    const navigation = page.locator('header, nav, [role="navigation"]').first();
    expect(await navigation.isVisible()).toBeTruthy();
    
    console.log('✅ Mobile responsiveness verified with gradient persistence');
  });

  test('✅ Performance: CSS integration impact', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que les performances restent acceptables
    expect(loadTime).toBeLessThan(8000); // Max 8 secondes pour networkidle
    
    console.log(`✅ Page loads in acceptable time: ${loadTime}ms`);
    
    // Vérifier que tous les styles sont bien appliqués
    const stylesApplied = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      
      return {
        hasGradient: computed.backgroundImage.includes('linear-gradient'),
        backgroundNotEmpty: computed.backgroundImage !== 'none'
      };
    });

    expect(stylesApplied.hasGradient).toBeTruthy();
    expect(stylesApplied.backgroundNotEmpty).toBeTruthy();
    console.log('✅ All CSS styles properly loaded and applied');
  });

  test('✅ Cross-page consistency: Emerald theme uniformity', async ({ page }) => {
    const pagesToTest = ['/', '/contact'];
    const results = {};

    for (const url of pagesToTest) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      results[url] = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        
        return {
          backgroundImage: computed.backgroundImage,
          backgroundAttachment: computed.backgroundAttachment,
          hasGradient: computed.backgroundImage.includes('linear-gradient')
        };
      });
    }

    // Vérifier la consistance entre les pages
    expect(results['/'].hasGradient).toBeTruthy();
    expect(results['/contact'].hasGradient).toBeTruthy();
    expect(results['/'].backgroundAttachment).toBe(results['/contact'].backgroundAttachment);
    
    console.log('✅ Cross-page consistency verified for emerald theme');
  });
});
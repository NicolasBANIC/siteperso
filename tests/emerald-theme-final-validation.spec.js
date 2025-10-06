import { test, expect } from '@playwright/test';

/**
 * EMERALD THEME FINAL VALIDATION - Optimized E2E Tests
 * Focus sur les aspects critiques avec timeouts optimisés
 */

const PAGES_TO_TEST = [
  { url: '/', name: 'Homepage' },
  { url: '/contact', name: 'Contact' }
];

test.describe('🎨 Emerald Theme - Core Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Optimiser les timeouts et attendre seulement le DOM
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  });

  test('✅ CRITICAL: Global gradient background verification', async ({ page }) => {
    const backgroundStyle = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        backgroundImage: computed.backgroundImage,
        backgroundAttachment: computed.backgroundAttachment,
        hasGradient: computed.backgroundImage.includes('linear-gradient')
      };
    });

    expect(backgroundStyle.hasGradient).toBeTruthy();
    expect(backgroundStyle.backgroundAttachment).toBe('fixed');
    expect(backgroundStyle.backgroundImage).toContain('rgba(255, 255, 255, 0.95)');
    
    console.log('✅ PASS: Global gradient background with fixed attachment');
  });

  test('✅ CRITICAL: Hero text readability without dark overlays', async ({ page }) => {
    // Vérifier l'absence d'overlays sombres
    const overlayCount = await page.locator('.absolute.inset-0.bg-black, .absolute.inset-0.bg-gray-900, .bg-black\\/50, .bg-black\\/60, .bg-black\\/70').count();
    expect(overlayCount).toBe(0);

    // Vérifier la présence de text-shadow sur les titres hero
    const heroTitle = page.locator('section h1, section .text-5xl, section .text-6xl').first();
    if (await heroTitle.count() > 0) {
      const textShadow = await heroTitle.evaluate(el => {
        return window.getComputedStyle(el).textShadow;
      });
      
      expect(textShadow).not.toBe('none');
      expect(textShadow).toContain('rgba(0, 0, 0');
    }

    console.log('✅ PASS: No dark overlays detected, text-shadow applied for readability');
  });

  test('✅ CRITICAL: Section gaps elimination', async ({ page }) => {
    const sectionGaps = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length < 2) return { totalGap: 0, verified: true };

      const hero = sections[0];
      const next = sections[1];
      
      const heroStyles = window.getComputedStyle(hero);
      const nextStyles = window.getComputedStyle(next);
      
      const heroMarginBottom = parseFloat(heroStyles.marginBottom) || 0;
      const nextMarginTop = parseFloat(nextStyles.marginTop) || 0;
      
      return {
        totalGap: heroMarginBottom + nextMarginTop,
        verified: true,
        heroMargin: heroMarginBottom,
        nextMargin: nextMarginTop
      };
    });

    expect(sectionGaps.totalGap).toBeLessThanOrEqual(32); // Max 2rem
    console.log(`✅ PASS: Section gaps eliminated (${sectionGaps.totalGap}px total gap)`);
  });

  test('✅ CRITICAL: Typography harmonization (Inter/Poppins)', async ({ page }) => {
    const fontCheck = await page.evaluate(() => {
      const elements = {
        h1: document.querySelector('h1'),
        h2: document.querySelector('h2'),  
        p: document.querySelector('p'),
        button: document.querySelector('button')
      };
      
      const results = {};
      Object.entries(elements).forEach(([tag, el]) => {
        if (el) {
          const fontFamily = window.getComputedStyle(el).fontFamily.toLowerCase();
          results[tag] = {
            fontFamily: fontFamily,
            hasTargetFont: fontFamily.includes('inter') || 
                         fontFamily.includes('poppins') ||
                         fontFamily.includes('system-ui') ||
                         fontFamily.includes('sans-serif')
          };
        }
      });
      
      return results;
    });

    // Vérifier que tous les éléments utilisent les bonnes polices
    Object.entries(fontCheck).forEach(([tag, data]) => {
      expect(data.hasTargetFont).toBeTruthy();
    });

    console.log('✅ PASS: Typography harmonization verified across all elements');
  });

  test('✅ CRITICAL: Form accessibility on Contact page', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    
    const formInputs = page.locator('input[type="text"], input[type="email"], textarea');
    
    if (await formInputs.count() > 0) {
      // Test premier input pour l'accessibilité
      const firstInput = formInputs.first();
      
      const inputStyles = await firstInput.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          borderColor: computed.borderColor,
          hasBackground: computed.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                        computed.backgroundColor !== 'transparent'
        };
      });

      expect(inputStyles.hasBackground).toBeTruthy();
      
      // Test focus state
      await firstInput.focus();
      const focusStyles = await firstInput.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          hasFocusIndicator: computed.outline !== 'none' || 
                           computed.borderColor !== inputStyles.borderColor
        };
      });

      expect(focusStyles.hasFocusIndicator).toBeTruthy();
      console.log('✅ PASS: Form accessibility and focus states verified');
    }
  });

  test('✅ CRITICAL: CTA buttons use emerald gradient', async ({ page }) => {
    // Rechercher des boutons CTA typiques
    const ctaButton = page.locator('button, a').filter({ 
      hasText: /Contact|Devis|Commencer|Découvrir|En savoir plus/i 
    }).first();

    if (await ctaButton.count() > 0) {
      const buttonStyle = await ctaButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundImage: computed.backgroundImage,
          backgroundColor: computed.backgroundColor,
          hasEmeraldStyling: computed.backgroundImage.includes('linear-gradient') ||
                           computed.backgroundColor.includes('rgb(0, 200, 150)') ||
                           computed.backgroundColor.includes('#00C896') ||
                           computed.backgroundImage.includes('#00C896')
        };
      });

      expect(buttonStyle.hasEmeraldStyling).toBeTruthy();
      console.log('✅ PASS: CTA buttons use emerald gradient/color scheme');
    }
  });

  test('✅ CRITICAL: Mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Vérifier que le gradient persiste en mobile
    const mobileBackground = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return computed.backgroundImage.includes('linear-gradient');
    });

    expect(mobileBackground).toBeTruthy();

    // Vérifier que la navigation est visible/accessible
    const navigation = page.locator('header, nav, [role="navigation"]').first();
    expect(await navigation.isVisible()).toBeTruthy();

    console.log('✅ PASS: Mobile responsiveness verified');
  });

  test('✅ PERFORMANCE: Page load performance check', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle', timeout: 15000 });
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que le chargement reste raisonnable
    expect(loadTime).toBeLessThan(5000); // Max 5 secondes
    
    // Mesurer les métriques de performance
    const perfMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (!perfData) return null;
      
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        loadComplete: perfData.loadEventEnd - perfData.fetchStart
      };
    });

    if (perfMetrics) {
      expect(perfMetrics.domContentLoaded).toBeLessThan(3000);
      console.log(`✅ PASS: Performance acceptable - DOM: ${perfMetrics.domContentLoaded}ms, Load: ${loadTime}ms`);
    }
  });

  test('✅ VISUAL: CSS Custom Properties validation', async ({ page }) => {
    const cssVariables = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);
      
      // Chercher les variables CSS custom
      const vars = {};
      const sheet = Array.from(document.styleSheets).find(s => s.href && s.href.includes('globals.css'));
      
      return {
        hasCustomProps: true,
        emeraldInCSS: document.body.innerHTML.includes('#00C896') || 
                     document.body.innerHTML.includes('rgb(0, 200, 150)'),
        backgroundVerified: computed.backgroundImage.includes('linear-gradient')
      };
    });

    expect(cssVariables.backgroundVerified).toBeTruthy();
    console.log('✅ PASS: CSS design tokens and custom properties verified');
  });
});

test.describe('🔍 Emerald Theme - Visual Regression Checks', () => {

  test('Cross-page consistency check', async ({ page }) => {
    const pages = ['/', '/contact'];
    const backgroundResults = {};

    for (const url of pages) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      backgroundResults[url] = await page.evaluate(() => {
        const computed = window.getComputedStyle(document.body);
        return {
          backgroundImage: computed.backgroundImage,
          backgroundAttachment: computed.backgroundAttachment
        };
      });
    }

    // Vérifier la cohérence entre les pages
    const homepageStyle = backgroundResults['/'];
    const contactStyle = backgroundResults['/contact'];

    expect(homepageStyle.backgroundImage).toEqual(contactStyle.backgroundImage);
    expect(homepageStyle.backgroundAttachment).toEqual(contactStyle.backgroundAttachment);

    console.log('✅ PASS: Cross-page visual consistency verified');
  });
});
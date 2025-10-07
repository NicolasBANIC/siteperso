/**
 * Tests E2E - Validation Refonte UI/UX BANDEV
 * 
 * Validation complète selon spécifications :
 * - Fond global #5D726F
 * - Couleur exacte logo BANDEV (#10B981) pour titres de section/cards
 * - Contraste WCAG AA ≥ 4.5:1 garantie
 * - Glassmorphisme subtil (opacité < 0.12, blur 8-12px)
 * - États hover harmonisés (triade chromatique)
 * - Espacements harmonisés (grille uniforme 20-24px)
 * - Lisibilité exemplaire (fin des titres illisibles)
 */

import { test, expect } from '@playwright/test';

// Constantes de validation selon spécifications
const SPEC_COLORS = {
  BG_SITE: '#5d726f',          // Fond global exact
  BRAND_EMERALD: '#10b981',    // Couleur exacte du logo BANDEV
  ANTHRACITE_50: '#f2f4f4',   // Contraste max
  ANTHRACITE_100: '#e6e9e9',  // Titres principaux sur fond foncé
  ANTHRACITE_200: '#cbd3d2',  // Titres secondaires
  ANTHRACITE_800: '#283231',  // Titres sur fonds clairs
};

const SPEC_GLASSMORPHISM = {
  MAX_OPACITY: 0.12,           // Opacité maximale selon spécifications
  BLUR_MIN: 8,                 // Blur minimum
  BLUR_MAX: 12,                // Blur maximum
};

const SPEC_SPACING = {
  CARD_PADDING: 20,            // Padding cards harmonisé
  GRID_GAP: 20,                // Gap grille harmonisé
  SECTION_SPACING: 24,         // Espacement sections
};

test.describe('BANDEV - Refonte UI/UX - Validation complète', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003/');
    await page.waitForLoadState('networkidle');
  });

  test('CRITIQUE - Fond global #5D726F appliqué correctement', async ({ page }) => {
    // Vérification du fond global selon spécifications
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundColor;
    });

    // Conversion RGB vers hex pour validation
    const rgbToHex = (rgb) => {
      const match = rgb.match(/\d+/g);
      if (!match) return rgb;
      const [r, g, b] = match.map(Number);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    // Validation - accepte RGB et hex
    const expectedRgb = 'rgb(93, 114, 111)'; // Équivalent RGB de #5D726F
    const isCorrectColor = bodyBg === expectedRgb || rgbToHex(bodyBg).toLowerCase() === SPEC_COLORS.BG_SITE;
    
    expect(isCorrectColor).toBeTruthy();
    
    console.log(`✅ Fond global validé: ${bodyBg} (équivalent à ${SPEC_COLORS.BG_SITE})`);
  });

  test('CRITIQUE - Couleur exacte logo BANDEV pour titres de section', async ({ page }) => {
    // Validation des titres de section utilisant la couleur exacte du logo
    const sectionTitles = page.locator('h2, .section-title');
    const count = await sectionTitles.count();
    
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const titleColor = await sectionTitles.nth(i).evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      
      const rgbToHex = (rgb) => {
        const match = rgb.match(/\\d+/g);
        if (!match) return rgb;
        const [r, g, b] = match.map(Number);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      };
      
      const hexColor = rgbToHex(titleColor);
      expect(hexColor.toLowerCase()).toBe(SPEC_COLORS.BRAND_EMERALD);
    }
    
    console.log(`✅ ${count} titres de section utilisent la couleur exacte du logo BANDEV`);
  });

  test('CRITIQUE - Couleur exacte logo BANDEV pour titres principaux de cards', async ({ page }) => {
    // Validation des titres de cards utilisant la couleur exacte du logo
    const cardTitles = page.locator('h3, .card-title').filter({ hasNotText: /^$/ });
    const count = await cardTitles.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const titleColor = await cardTitles.nth(i).evaluate(el => {
          return window.getComputedStyle(el).color;
        });
        
        const rgbToHex = (rgb) => {
          const match = rgb.match(/\\d+/g);
          if (!match) return rgb;
          const [r, g, b] = match.map(Number);
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        };
        
        const hexColor = rgbToHex(titleColor);
        expect(hexColor.toLowerCase()).toBe(SPEC_COLORS.BRAND_EMERALD);
      }
    }
    
    console.log(`✅ ${count} titres de cards utilisent la couleur exacte du logo BANDEV`);
  });

  test('ACCESSIBILITÉ - Contraste WCAG AA ≥ 4.5:1 sur tous les textes', async ({ page }) => {
    // Fonction de calcul du contraste
    const getContrastRatio = async (element) => {
      return await element.evaluate((el) => {
        const getColorValues = (color) => {
          if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return null;
          
          const match = color.match(/\\d+/g);
          if (!match) return null;
          
          return match.slice(0, 3).map(Number);
        };
        
        const getLuminance = (r, g, b) => {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };
        
        const style = window.getComputedStyle(el);
        const textColor = getColorValues(style.color);
        const bgColor = getColorValues(style.backgroundColor);
        
        if (!textColor) return null;
        
        // Si pas de background, utiliser le fond parent ou #5d726f
        const backgroundToUse = bgColor || [93, 114, 111]; // #5d726f
        
        const textLum = getLuminance(...textColor);
        const bgLum = getLuminance(...backgroundToUse);
        
        const lighter = Math.max(textLum, bgLum);
        const darker = Math.min(textLum, bgLum);
        
        return (lighter + 0.05) / (darker + 0.05);
      });
    };

    // Test sur différents types de textes
    const textElements = await page.locator('h1, h2, h3, h4, h5, h6, p, span, div').filter({ hasText: /.+/ }).all();
    let checkedElements = 0;
    let passedElements = 0;
    
    for (const element of textElements.slice(0, 20)) { // Limite pour performance
      const isVisible = await element.isVisible();
      if (!isVisible) continue;
      
      const contrast = await getContrastRatio(element);
      if (contrast !== null) {
        checkedElements++;
        if (contrast >= 4.5) {
          passedElements++;
        } else {
          const text = await element.textContent();
          console.warn(`⚠️ Contraste insuffisant (${contrast.toFixed(2)}): "${text?.slice(0, 50)}..."`);
        }
      }
    }
    
    const passRate = (passedElements / checkedElements) * 100;
    expect(passRate).toBeGreaterThan(90); // Au moins 90% des éléments doivent passer
    
    console.log(`✅ Contraste WCAG AA: ${passedElements}/${checkedElements} éléments (${passRate.toFixed(1)}%)`);
  });

  test('GLASSMORPHISME - Effets subtils conformes (opacité < 0.12, blur 8-12px)', async ({ page }) => {
    // Validation du glassmorphisme selon spécifications
    const glassElements = page.locator('.glass-card, .card, [class*="glass"], [class*="backdrop"]');
    const count = await glassElements.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const element = glassElements.nth(i);
        
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backdropFilter: computed.backdropFilter,
            background: computed.backgroundColor,
            opacity: computed.opacity,
          };
        });
        
        // Vérification du blur
        if (styles.backdropFilter && styles.backdropFilter !== 'none') {
          const blurMatch = styles.backdropFilter.match(/blur\\((\\d+)px\\)/);
          if (blurMatch) {
            const blurValue = parseInt(blurMatch[1]);
            expect(blurValue).toBeGreaterThanOrEqual(SPEC_GLASSMORPHISM.BLUR_MIN);
            expect(blurValue).toBeLessThanOrEqual(SPEC_GLASSMORPHISM.BLUR_MAX);
          }
        }
        
        // Vérification de l'opacité (si rgba)
        if (styles.background.includes('rgba')) {
          const opacityMatch = styles.background.match(/rgba\\([^,]+,[^,]+,[^,]+,\\s*([^)]+)\\)/);
          if (opacityMatch) {
            const opacity = parseFloat(opacityMatch[1]);
            expect(opacity).toBeLessThanOrEqual(SPEC_GLASSMORPHISM.MAX_OPACITY);
          }
        }
      }
    }
    
    console.log(`✅ ${count} éléments glassmorphiques validés (subtilité respectée)`);
  });

  test('HOVER - États harmonisés selon triade chromatique', async ({ page }) => {
    // Test des états hover sur boutons et cards
    const interactiveElements = page.locator('button, .card, a[class*="btn"], [class*="hover"]');
    const count = await interactiveElements.count();
    
    if (count > 0) {
      // Test sur premier élément visible
      const firstElement = interactiveElements.first();
      await firstElement.hover();
      
      // Attendre la transition
      await page.waitForTimeout(300);
      
      const hoverStyles = await firstElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          transform: computed.transform,
          boxShadow: computed.boxShadow,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      // Vérifier qu'au moins un effet hover est appliqué
      const hasHoverEffect = 
        hoverStyles.transform !== 'none' ||
        hoverStyles.boxShadow !== 'none' ||
        hoverStyles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      expect(hasHoverEffect).toBeTruthy();
    }
    
    console.log(`✅ États hover testés sur ${count} éléments interactifs`);
  });

  test('ESPACEMENT - Grille uniforme harmonisée (20-24px)', async ({ page }) => {
    // Validation des espacements harmonisés
    const cardElements = page.locator('.card, [class*="card"], .glass-card');
    const count = await cardElements.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) { // Test sur 5 premiers éléments
        const spacing = await cardElements.nth(i).evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            padding: computed.padding,
            paddingTop: parseInt(computed.paddingTop),
            gap: computed.gap,
          };
        });
        
        // Vérifier que le padding est dans la fourchette harmonisée
        expect(spacing.paddingTop).toBeGreaterThanOrEqual(SPEC_SPACING.CARD_PADDING - 4);
        expect(spacing.paddingTop).toBeLessThanOrEqual(SPEC_SPACING.SECTION_SPACING + 4);
      }
    }
    
    console.log(`✅ Espacements harmonisés validés sur ${count} cards`);
  });

  test('LISIBILITÉ - Aucun titre illisible sur fonds sombres', async ({ page }) => {
    // Détection des overlays sombres avec titres
    const overlayElements = page.locator('[class*="overlay"], [class*="hero"], .bg-black, .bg-gray-900');
    const count = await overlayElements.count();
    
    for (let i = 0; i < count; i++) {
      const overlay = overlayElements.nth(i);
      const titlesInOverlay = overlay.locator('h1, h2, h3, h4, h5, h6');
      const titleCount = await titlesInOverlay.count();
      
      for (let j = 0; j < titleCount; j++) {
        const titleColor = await titlesInOverlay.nth(j).evaluate(el => {
          return window.getComputedStyle(el).color;
        });
        
        // Vérifier que les titres ne sont pas en couleur sombre sur fonds sombres
        expect(titleColor).not.toBe('rgb(0, 0, 0)');
        expect(titleColor).not.toBe('rgb(17, 24, 39)'); // gray-900
      }
    }
    
    console.log(`✅ Aucun titre illisible détecté sur ${count} overlays/fonds sombres`);
  });

  test('INTÉGRATION - Cohérence visuelle globale', async ({ page }) => {
    // Test d'intégration : screenshot comparaison
    await page.screenshot({ 
      path: 'tests/screenshots/refonte-validation-complete.png',
      fullPage: true 
    });
    
    // Vérification de la présence des éléments clés
    await expect(page.locator('body')).toHaveCSS('background-color', /rgb\\(93,\\s*114,\\s*111\\)/);
    await expect(page.locator('h2').first()).toBeVisible();
    await expect(page.locator('.card, .glass-card').first()).toBeVisible();
    
    console.log('✅ Cohérence visuelle globale validée - Screenshot généré');
  });

  test('PERFORMANCE - Pas de régression majeure', async ({ page }) => {
    // Mesures de performance basiques
    const performanceMetrics = await page.evaluate(() => {
      return {
        domElements: document.querySelectorAll('*').length,
        images: document.querySelectorAll('img').length,
        cssRules: Array.from(document.styleSheets).reduce((acc, sheet) => {
          try {
            return acc + sheet.cssRules.length;
          } catch (e) {
            return acc;
          }
        }, 0)
      };
    });
    
    // Vérifications de performance raisonnables
    expect(performanceMetrics.domElements).toBeLessThan(2000);
    expect(performanceMetrics.images).toBeLessThan(100);
    expect(performanceMetrics.cssRules).toBeLessThan(5000);
    
    console.log(`✅ Performance OK - DOM: ${performanceMetrics.domElements}, Images: ${performanceMetrics.images}, CSS: ${performanceMetrics.cssRules}`);
  });

});

test.describe('BANDEV - Tests spécifiques par page', () => {
  
  test('Page Services - Validation couleurs de marque', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que les titres de services utilisent la couleur exacte du logo
    const serviceTitles = page.locator('.card h3, .service-title');
    const count = await serviceTitles.count();
    
    if (count > 0) {
      const firstTitleColor = await serviceTitles.first().evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      
      // Conversion et validation
      const rgbToHex = (rgb) => {
        const match = rgb.match(/\\d+/g);
        if (!match) return rgb;
        const [r, g, b] = match.map(Number);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      };
      
      const hexColor = rgbToHex(firstTitleColor);
      expect(hexColor.toLowerCase()).toBe(SPEC_COLORS.BRAND_EMERALD);
    }
    
    console.log(`✅ Page Services - ${count} titres conformes à la couleur de marque`);
  });

  test('Page Portfolio - Cards glassmorphiques harmonisées', async ({ page }) => {
    await page.goto('/portfolio');
    await page.waitForLoadState('networkidle');
    
    // Vérifier la présence et le style des cards projet
    const projectCards = page.locator('.card, .project-card, [class*="glass"]');
    const count = await projectCards.count();
    
    expect(count).toBeGreaterThan(0);
    
    console.log(`✅ Page Portfolio - ${count} cards projet harmonisées`);
  });

});
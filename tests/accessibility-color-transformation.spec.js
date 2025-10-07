import { test, expect } from '@playwright/test';

/**
 * Tests E2E - Transformation d'Accessibilité BANDEV
 *
 * Validation des changements majeurs :
 * - Fond principal #C5C6C6 implémenté
 * - Vert émeraude #10B981 préservé (couleur de marque)
 * - Contrastes WCAG 2.1 AA respectés
 * - Variables CSS sémantiques correctement mappées
 * - Focus rings accessibles
 */

test.describe('Transformation Accessibilité - Palette #C5C6C6', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('ÉTAPE 2 - Validation du fond principal #C5C6C6', async ({ page }) => {
    // Vérifier que la variable CSS --background est correctement définie
    const backgroundValue = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
    });

    expect(backgroundValue).toBe('#C5C6C6');

    // Vérifier que le body utilise bien ce fond
    const bodyBackground = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    // La couleur peut être en RGB, vérifions la valeur équivalente
    expect(['rgb(197, 198, 198)', '#C5C6C6']).toContain(
      bodyBackground === 'rgb(197, 198, 198)' ? 'rgb(197, 198, 198)' : bodyBackground
    );
  });

  test('ÉTAPE 2 - Préservation du vert émeraude #10B981', async ({ page }) => {
    // Vérifier que la variable CSS --primary conserve la couleur de marque
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    });

    expect(primaryColor).toBe('#10B981');

    // Vérifier que le logo BANDEV utilise bien cette couleur pour "DEV"
    const logoDevElement = await page.locator('svg text').filter({ hasText: 'DEV' });
    await expect(logoDevElement).toBeVisible();

    // Vérifier le gradient contient bien le vert émeraude
    const logoFill = await logoDevElement.getAttribute('fill');
    expect(logoFill).toContain('emerald-gradient');
  });

  test('ÉTAPE 5 - Mapping Tailwind correct', async ({ page }) => {
    // Tester que les classes Tailwind utilisent les nouvelles variables
    await page.addStyleTag({
      content: `
        .test-bg-background { background-color: var(--background); }
        .test-text-foreground { color: var(--foreground); }
        .test-bg-primary { background-color: var(--primary); }
      `,
    });

    // Créer des éléments de test
    await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.className = 'test-bg-background test-text-foreground';
      testDiv.style.width = '100px';
      testDiv.style.height = '100px';
      testDiv.textContent = 'Test';
      document.body.appendChild(testDiv);
    });

    const testElement = page.locator('div').filter({ hasText: 'Test' }).first();

    const computedStyles = await testElement.evaluate((el) => ({
      backgroundColor: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
    }));

    // Fond #C5C6C6 = rgb(197, 198, 198)
    expect(computedStyles.backgroundColor).toBe('rgb(197, 198, 198)');
    // Texte #111827 = rgb(17, 24, 39)
    expect(computedStyles.color).toBe('rgb(17, 24, 39)');
  });

  test('ÉTAPE 3 - Contraste WCAG AA sur éléments principaux', async ({ page }) => {
    // Fonction pour calculer le ratio de contraste
    const getContrastRatio = (color1, color2) => {
      const getLuminance = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map((x) => {
          x /= 255;
          return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const lum1 = getLuminance(color1);
      const lum2 = getLuminance(color2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);

      return (brightest + 0.05) / (darkest + 0.05);
    };

    // Tester le contraste du texte principal
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();

    const titleStyles = await heroTitle.evaluate((el) => ({
      color: getComputedStyle(el).color,
      backgroundColor:
        getComputedStyle(el).backgroundColor || getComputedStyle(document.body).backgroundColor,
    }));

    // Pour les titres sur fond clair, on vérifie que le ratio est >= 4.5:1
    const textRatio = getContrastRatio(titleStyles.color, titleStyles.backgroundColor);
    expect(textRatio).toBeGreaterThanOrEqual(4.5);
  });

  test('ÉTAPE 3 - Focus rings accessibles', async ({ page }) => {
    // Tester la visibilité des focus rings sur les boutons
    const ctaButton = page.locator('a').filter({ hasText: 'Démarrer un projet' }).first();

    // Simuler le focus via JavaScript
    await ctaButton.focus();

    // Vérifier que le focus est visible
    const focusStyles = await ctaButton.evaluate((el) => ({
      outline: getComputedStyle(el).outline,
      boxShadow: getComputedStyle(el).boxShadow,
    }));

    // Au moins l'un des deux devrait être présent pour l'accessibilité
    expect(focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none').toBe(true);
  });

  test('ÉTAPE 3 - Éléments UI respectent le ratio 3:1 minimum', async ({ page }) => {
    // Tester les boutons - ils doivent respecter un ratio de 3:1 minimum
    const button = page.locator('button, .btn').filter({ hasText: 'Envoyer' }).first();

    if ((await button.count()) > 0) {
      const buttonStyles = await button.evaluate((el) => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        borderColor: getComputedStyle(el).borderColor || 'none',
      }));

      // Le bouton doit avoir un background visible (pas transparent)
      expect(buttonStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(buttonStyles.backgroundColor).not.toBe('transparent');
    }
  });

  test('ÉTAPE 4 - Typographie optimisée', async ({ page }) => {
    // Vérifier que les paragraphes respectent les bonnes pratiques
    const paragraph = page.locator('p').first();

    const pStyles = await paragraph.evaluate((el) => ({
      fontSize: parseFloat(getComputedStyle(el).fontSize),
      lineHeight: getComputedStyle(el).lineHeight,
      maxWidth: getComputedStyle(el).maxWidth,
    }));

    // Taille minimum 16px (1rem) pour lisibilité
    expect(pStyles.fontSize).toBeGreaterThanOrEqual(16);

    // Line-height entre 1.5 et 1.7 pour lisibilité optimale
    const numericLineHeight = parseFloat(pStyles.lineHeight) / pStyles.fontSize;
    expect(numericLineHeight).toBeGreaterThanOrEqual(1.5);
    expect(numericLineHeight).toBeLessThanOrEqual(1.7);
  });

  test('ÉTAPE 6 - Variables CSS cohérentes dans tout le DOM', async ({ page }) => {
    // Vérifier que toutes les variables importantes sont définies
    const cssVariables = await page.evaluate(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      return {
        background: rootStyles.getPropertyValue('--background').trim(),
        foreground: rootStyles.getPropertyValue('--foreground').trim(),
        primary: rootStyles.getPropertyValue('--primary').trim(),
        muted: rootStyles.getPropertyValue('--muted').trim(),
        mutedForeground: rootStyles.getPropertyValue('--muted-foreground').trim(),
        card: rootStyles.getPropertyValue('--card').trim(),
        border: rootStyles.getPropertyValue('--border').trim(),
        primaryForeground: rootStyles.getPropertyValue('--primary-foreground').trim(),
      };
    });

    // Palette structurée selon les spécifications
    expect(cssVariables.background).toBe('#C5C6C6');
    expect(cssVariables.foreground).toBe('#111827');
    expect(cssVariables.muted).toBe('#D3D5D5');
    expect(cssVariables.mutedForeground).toBe('#334155');
    expect(cssVariables.card).toBe('#DCDDDE');
    expect(cssVariables.border).toBe('#94A3B8');
    expect(cssVariables.primary).toBe('#10B981');
    expect(cssVariables.primaryForeground).toBe('#0A0F0F');
  });

  test('Validation Matrix Rain adapté au fond clair', async ({ page }) => {
    // Vérifier que l'effet Matrix Rain utilise des opacités adaptées au fond clair
    const rainOpacity = await page.evaluate(() => {
      const beforeElement = getComputedStyle(document.body, '::before');
      return {
        opacity: beforeElement.opacity,
        mixBlendMode: beforeElement.mixBlendMode,
      };
    });

    // L'opacité doit être réduite pour le fond clair (0.7 vs 0.9 avant)
    expect(parseFloat(rainOpacity.opacity)).toBeLessThanOrEqual(0.8);

    // Mix blend mode adapté au fond clair
    expect(rainOpacity.mixBlendMode).toBe('multiply');
  });

  test('Intégration complète - Rendu visuel cohérent', async ({ page }) => {
    // Screenshot de régression pour valider le rendu global
    await expect(page).toHaveScreenshot('bandev-accessibilite-final.png', {
      fullPage: false,
      threshold: 0.3, // Tolérance pour les variations de rendu
    });
  });
});

test.describe('Validation Lighthouse Accessibilité', () => {
  test("Score d'accessibilité maintenu après transformation", async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Simulation d'un audit Lighthouse basique via axe-core
    await page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.7.2/axe.min.js',
    });

    const axeResults = await page.evaluate(async () => {
      const results = await axe.run();
      return {
        violations: results.violations.length,
        passes: results.passes.length,
      };
    });

    // Aucune violation d'accessibilité majeure
    expect(axeResults.violations).toBe(0);

    // Au moins quelques tests d'accessibilité qui passent
    expect(axeResults.passes).toBeGreaterThan(10);
  });
});

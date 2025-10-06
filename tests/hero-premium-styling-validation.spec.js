/**
 * Tests E2E - Validation du style premium des sections héros
 * Vérifie que le dégradé premium vert émeraude → turquoise est correctement appliqué
 * sur tous les mots-clés à fort impact et que les couleurs premium sont utilisées
 * pour le reste du texte des héros sur toutes les pages principales.
 */

import { test, expect } from '@playwright/test';

// Configuration des pages à tester avec leurs mots-clés à fort impact
const PAGES_CONFIG = [
  {
    url: '/',
    name: 'Accueil',
    keywordSelector: '.accent-word',
    expectedKeyword: 'présence digitale'
  },
  {
    url: '/services',
    name: 'Services',
    keywordSelector: '.accent-word',
    expectedKeyword: 'pensés pour votre réussite'
  },
  {
    url: '/portfolio',
    name: 'Portfolio',
    keywordSelector: '.accent-word',
    expectedKeyword: 'Mes réalisations'
  },
  {
    url: '/contact',
    name: 'Contact',
    keywordSelector: '.accent-word',
    expectedKeyword: 'contact'
  },
  {
    url: '/apropos',
    name: 'À propos',
    keywordSelector: '.accent-word',
    expectedKeyword: 'de confiance'
  },
  {
    url: '/tarifs',
    name: 'Tarifs',
    keywordSelector: '.accent-word',
    expectedKeyword: 'transparents et adaptés'
  },
  {
    url: '/devis',
    name: 'Devis',
    keywordSelector: '.accent-word',
    expectedKeyword: 'sur mesure'
  },
  {
    url: '/processus',
    name: 'Processus',
    keywordSelector: 'h1 span[style*="linear-gradient"]',
    expectedKeyword: 'éprouvé en 5 étapes'
  },
  {
    url: '/temoignages',
    name: 'Témoignages',
    keywordSelector: 'h1 span[style*="linear-gradient"]',
    expectedKeyword: 'confiance'
  }
];

// Couleurs premium attendues
const PREMIUM_COLORS = {
  gradient: 'linear-gradient(90deg, rgb(0, 210, 127) 0%, rgb(0, 191, 166) 40%, rgb(0, 158, 235) 100%)',
  primaryText: 'rgb(245, 247, 250)', // #F5F7FA
  secondaryText: 'rgb(232, 236, 240)', // #E8ECF0
  mutedText: 'rgba(245, 247, 250, 0.8)' // avec opacité
};

test.describe('Style Premium des Sections Héros', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configuration pour éviter les timeouts sur les animations
    await page.addInitScript(() => {
      // Réduire les animations pour accélérer les tests
      document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01s !important;
            animation-delay: 0s !important;
            transition-duration: 0.01s !important;
            transition-delay: 0s !important;
          }
        `;
        document.head.appendChild(style);
      });
    });
  });

  // Test principal : vérification du gradient premium sur toutes les pages
  for (const pageConfig of PAGES_CONFIG) {
    test(`${pageConfig.name} - Gradient premium sur les mots-clés`, async ({ page }) => {
      // Navigation vers la page
      await page.goto(pageConfig.url);
      await page.waitForLoadState('networkidle');
      
      // Attendre que la section héro soit visible
      await page.waitForSelector('.hero, .hero-section, section[class*="hero"]', { timeout: 10000 });
      
      // Localiser l'élément avec le mot-clé à fort impact
      const keywordElement = page.locator(pageConfig.keywordSelector).first();
      
      // Vérifier que l'élément est visible
      await expect(keywordElement).toBeVisible({ timeout: 5000 });
      
      // Vérifier que le texte correspond au mot-clé attendu
      if (pageConfig.expectedKeyword) {
        await expect(keywordElement).toContainText(pageConfig.expectedKeyword, { ignoreCase: true });
      }
      
      // Vérifier les propriétés CSS du gradient
      const computedStyle = await keywordElement.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          backgroundImage: styles.backgroundImage,
          webkitBackgroundClip: styles.webkitBackgroundClip,
          backgroundClip: styles.backgroundClip,
          webkitTextFillColor: styles.webkitTextFillColor,
          color: styles.color
        };
      });
      
      // Assertions sur le gradient premium
      expect(computedStyle.backgroundImage).toContain('linear-gradient');
      expect(computedStyle.backgroundImage).toContain('rgb(0, 210, 127)'); // #00D27F
      expect(computedStyle.backgroundImage).toContain('rgb(0, 191, 166)'); // #00BFA6  
      expect(computedStyle.backgroundImage).toContain('rgb(0, 158, 235)'); // #009EEB
      
      // Vérifier les propriétés de clipping pour le gradient sur texte
      expect(computedStyle.webkitBackgroundClip || computedStyle.backgroundClip).toBe('text');
      // 'transparent' peut être représenté comme 'rgba(0, 0, 0, 0)' dans certains navigateurs
      expect(computedStyle.webkitTextFillColor === 'transparent' || computedStyle.webkitTextFillColor === 'rgba(0, 0, 0, 0)').toBe(true);
    });
  }

  // Test des couleurs premium du texte principal des héros
  for (const pageConfig of PAGES_CONFIG) {
    test(`${pageConfig.name} - Couleurs premium du texte principal`, async ({ page }) => {
      await page.goto(pageConfig.url);
      await page.waitForLoadState('networkidle');
      
      // Attendre que la section héro soit visible
      await page.waitForSelector('.hero, .hero-section, section[class*="hero"]', { timeout: 10000 });
      
      // Vérifier le titre principal (h1)
      const mainTitle = page.locator('.hero h1, .hero-title, .hero-section h1, section[class*="hero"] h1').first();
      if (await mainTitle.count() > 0) {
        const titleStyle = await mainTitle.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textShadow: styles.textShadow,
            webkitTextStroke: styles.webkitTextStroke
          };
        });
        
        // Vérifier que la couleur premium est utilisée
        expect(titleStyle.color).toBe(PREMIUM_COLORS.primaryText);
        
        // Vérifier la présence des effets de lisibilité
        expect(titleStyle.textShadow).toContain('rgba(0, 0, 0');
        expect(titleStyle.webkitTextStroke).toContain('rgba(0, 0, 0');
      }
      
      // Vérifier les sous-titres/paragraphes
      const subtitleElements = page.locator('.hero p, .hero .subtitle, .hero-section p, section[class*="hero"] p').first();
      if (await subtitleElements.count() > 0) {
        const subtitleStyle = await subtitleElements.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textShadow: styles.textShadow
          };
        });
        
        // Vérifier que la couleur premium avec opacité est utilisée
        expect(subtitleStyle.color).toBe(PREMIUM_COLORS.mutedText);
        expect(subtitleStyle.textShadow).toContain('rgba(0, 0, 0');
      }
    });
  }

  // Test de cohérence visuelle entre les pages
  test('Cohérence du style premium entre toutes les pages', async ({ page }) => {
    const gradientStyles = [];
    
    for (const pageConfig of PAGES_CONFIG) {
      await page.goto(pageConfig.url);
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.hero, .hero-section, section[class*="hero"]', { timeout: 10000 });
      
      const keywordElement = page.locator(pageConfig.keywordSelector).first();
      if (await keywordElement.count() > 0) {
        const style = await keywordElement.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return styles.backgroundImage;
        });
        gradientStyles.push({ page: pageConfig.name, gradient: style });
      }
    }
    
    // Vérifier que tous les gradients sont identiques
    const firstGradient = gradientStyles[0]?.gradient;
    expect(firstGradient).toContain('linear-gradient');
    
    for (const styleInfo of gradientStyles) {
      expect(styleInfo.gradient).toBe(firstGradient);
    }
  });

  // Test de responsivité du style premium
  test('Style premium responsive sur mobile et tablette', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablette' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const keywordElement = page.locator('.accent-word').first();
      await expect(keywordElement).toBeVisible();
      
      const style = await keywordElement.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundImage: styles.backgroundImage,
          webkitBackgroundClip: styles.webkitBackgroundClip,
          webkitTextFillColor: styles.webkitTextFillColor
        };
      });
      
      // Le gradient doit être présent sur toutes les tailles d'écran
      expect(style.backgroundImage).toContain('linear-gradient');
      expect(style.backgroundImage).toContain('rgb(0, 210, 127)');
      expect(style.webkitBackgroundClip).toBe('text');
      expect(style.webkitTextFillColor).toBe('transparent');
    }
  });

  // Test de contraste et lisibilité
  test('Contraste et lisibilité du texte sur les arrière-plans', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que les text-shadow sont présents pour la lisibilité
    const heroTitle = page.locator('.hero h1, .hero-title').first();
    const titleStyle = await heroTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        textShadow: styles.textShadow,
        webkitTextStroke: styles.webkitTextStroke,
        color: styles.color
      };
    });
    
    expect(titleStyle.textShadow).toContain('rgba(0, 0, 0');
    expect(titleStyle.webkitTextStroke).toContain('rgba(0, 0, 0');
    expect(titleStyle.color).toBe(PREMIUM_COLORS.primaryText);
  });

  // Test des animations et transitions
  test('Animations fluides sans affecter le gradient', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const keywordElement = page.locator('.accent-word').first();
    await expect(keywordElement).toBeVisible();
    
    // Vérifier que les animations n'affectent pas le gradient
    const initialStyle = await keywordElement.evaluate(el => {
      return window.getComputedStyle(el).backgroundImage;
    });
    
    // Attendre un délai pour s'assurer que les animations sont terminées
    await page.waitForTimeout(1000);
    
    const finalStyle = await keywordElement.evaluate(el => {
      return window.getComputedStyle(el).backgroundImage;
    });
    
    // Le gradient doit rester stable
    expect(finalStyle).toBe(initialStyle);
    expect(finalStyle).toContain('rgb(0, 210, 127)');
    expect(finalStyle).toContain('rgb(0, 191, 166)');
    expect(finalStyle).toContain('rgb(0, 158, 235)');
  });

  // Test d'accessibilité du contraste
  test('Accessibilité - Contraste suffisant du texte', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que les couleurs premium offrent un contraste suffisant
    const heroElements = page.locator('.hero h1, .hero p, .hero .subtitle');
    const count = await heroElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = heroElements.nth(i);
      const isVisible = await element.isVisible();
      
      if (isVisible) {
        const style = await element.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textShadow: styles.textShadow,
            webkitTextStroke: styles.webkitTextStroke
          };
        });
        
        // Vérifier que les techniques d'amélioration du contraste sont présentes
        expect(style.textShadow).toContain('rgba(0, 0, 0');
        expect(style.webkitTextStroke || '').toContain('rgba(0, 0, 0');
      }
    }
  });

});
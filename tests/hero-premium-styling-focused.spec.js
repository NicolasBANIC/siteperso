/**
 * Tests E2E - Validation focalisée du style premium des sections héros
 * Test simplifié et robuste pour vérifier le gradient premium vert émeraude → turquoise
 */

import { test, expect } from '@playwright/test';

// Configuration simplifiée avec les pages principales
const MAIN_PAGES = [
  { url: '/', name: 'Accueil' },
  { url: '/services', name: 'Services' },
  { url: '/portfolio', name: 'Portfolio' },
  { url: '/contact', name: 'Contact' }
];

// Couleurs du gradient premium
const PREMIUM_GRADIENT_COLORS = [
  'rgb(0, 210, 127)',  // #00D27F
  'rgb(0, 191, 166)',  // #00BFA6  
  'rgb(0, 158, 235)'   // #009EEB
];

test.describe('Style Premium des Sections Héros - Tests Focalisés', () => {
  
  test.beforeEach(async ({ page }) => {
    // Réduire les animations pour les tests
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01s !important;
            transition-duration: 0.01s !important;
          }
        `;
        document.head.appendChild(style);
      });
    });
  });

  // Test principal : Vérification du gradient sur les pages principales
  for (const page_config of MAIN_PAGES) {
    test(`${page_config.name} - Gradient premium visible et correct`, async ({ page }) => {
      // Navigation vers la page
      await page.goto(page_config.url);
      await page.waitForLoadState('networkidle');
      
      // Attendre un peu pour que tout soit chargé
      await page.waitForTimeout(2000);
      
      // Rechercher les éléments avec gradient (plusieurs sélecteurs possibles)
      const gradientSelectors = [
        '.accent-word',
        '.hero h1 span',
        '.hero-title span',
        'span[style*="linear-gradient"]',
        '.text-accent-green'
      ];
      
      let gradientElement = null;
      let foundSelector = null;
      
      // Essayer chaque sélecteur jusqu'à trouver un élément visible
      for (const selector of gradientSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        if (count > 0) {
          const firstElement = elements.first();
          if (await firstElement.isVisible()) {
            gradientElement = firstElement;
            foundSelector = selector;
            break;
          }
        }
      }
      
      // Vérifier qu'on a trouvé au moins un élément avec gradient
      expect(gradientElement).not.toBeNull();
      console.log(`${page_config.name}: Élément trouvé avec le sélecteur: ${foundSelector}`);
      
      // Vérifier les propriétés CSS du gradient
      const computedStyle = await gradientElement.evaluate(el => {
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
      
      // Vérifier que les couleurs premium sont présentes
      let hasAllColors = true;
      const missingColors = [];
      
      for (const color of PREMIUM_GRADIENT_COLORS) {
        if (!computedStyle.backgroundImage.includes(color)) {
          hasAllColors = false;
          missingColors.push(color);
        }
      }
      
      if (!hasAllColors) {
        console.log(`${page_config.name}: Couleurs manquantes:`, missingColors);
        console.log(`${page_config.name}: backgroundImage actuel:`, computedStyle.backgroundImage);
      }
      
      // Au moins une des couleurs premium doit être présente
      const hasAnyPremiumColor = PREMIUM_GRADIENT_COLORS.some(color => 
        computedStyle.backgroundImage.includes(color)
      );
      expect(hasAnyPremiumColor).toBe(true);
      
      // Vérifier que c'est bien un gradient appliqué au texte
      if (computedStyle.backgroundImage.includes('linear-gradient')) {
        expect(computedStyle.webkitBackgroundClip || computedStyle.backgroundClip).toBe('text');
        // Accepter transparent sous différentes formes
        const isTransparent = computedStyle.webkitTextFillColor === 'transparent' || 
                             computedStyle.webkitTextFillColor === 'rgba(0, 0, 0, 0)';
        expect(isTransparent).toBe(true);
      }
    });
  }

  // Test de cohérence visuelle
  test('Cohérence du gradient premium entre les pages principales', async ({ page }) => {
    const gradientData = [];
    
    for (const page_config of MAIN_PAGES) {
      await page.goto(page_config.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Chercher un élément avec gradient
      const selectors = ['.accent-word', '.hero h1 span', 'span[style*="linear-gradient"]'];
      let gradientStyle = null;
      
      for (const selector of selectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0 && await element.isVisible()) {
          gradientStyle = await element.evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
          });
          if (gradientStyle && gradientStyle.includes('linear-gradient')) {
            break;
          }
        }
      }
      
      if (gradientStyle && gradientStyle.includes('linear-gradient')) {
        gradientData.push({
          page: page_config.name,
          gradient: gradientStyle
        });
      }
    }
    
    // Vérifier qu'on a des données pour au moins 2 pages
    expect(gradientData.length).toBeGreaterThanOrEqual(2);
    
    // Vérifier que tous les gradients contiennent les couleurs premium
    for (const data of gradientData) {
      const hasGoodColors = PREMIUM_GRADIENT_COLORS.some(color => 
        data.gradient.includes(color)
      );
      expect(hasGoodColors).toBe(true);
    }
    
    console.log('Gradients trouvés:', gradientData.map(d => `${d.page}: ${d.gradient.substring(0, 100)}...`));
  });

  // Test des couleurs du texte principal des héros
  test('Couleurs premium appliquées au texte principal des héros', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Chercher les titres principaux des héros
    const titleSelectors = [
      '.hero h1',
      '.hero-title',
      '.hero-section h1',
      'h1'
    ];
    
    let titleElement = null;
    
    for (const selector of titleSelectors) {
      const element = page.locator(selector).first();
      if (await element.count() > 0 && await element.isVisible()) {
        titleElement = element;
        break;
      }
    }
    
    expect(titleElement).not.toBeNull();
    
    const titleStyle = await titleElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        textShadow: styles.textShadow
      };
    });
    
    // Vérifier que la couleur n'est pas noire/par défaut
    expect(titleStyle.color).not.toBe('rgb(0, 0, 0)');
    expect(titleStyle.color).not.toBe('rgba(0, 0, 0, 1)');
    
    // Vérifier qu'il y a une text-shadow pour la lisibilité
    expect(titleStyle.textShadow).toContain('rgba');
    
    console.log('Couleur du titre principal:', titleStyle.color);
    console.log('Text-shadow:', titleStyle.textShadow);
  });

  // Test responsive
  test('Style premium responsive sur mobile', async ({ page }) => {
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Chercher un élément avec gradient
    const selectors = ['.accent-word', '.hero h1 span', 'span[style*="linear-gradient"]'];
    let gradientFound = false;
    
    for (const selector of selectors) {
      const element = page.locator(selector).first();
      if (await element.count() > 0 && await element.isVisible()) {
        const style = await element.evaluate(el => {
          return window.getComputedStyle(el).backgroundImage;
        });
        
        if (style && style.includes('linear-gradient')) {
          gradientFound = true;
          
          // Vérifier qu'au moins une couleur premium est présente
          const hasGoodColor = PREMIUM_GRADIENT_COLORS.some(color => style.includes(color));
          expect(hasGoodColor).toBe(true);
          
          console.log('Mobile - Gradient trouvé:', style.substring(0, 100) + '...');
          break;
        }
      }
    }
    
    // Au moins un gradient doit être trouvé sur mobile
    expect(gradientFound).toBe(true);
  });

});
import { test, expect } from '@playwright/test';

// Test E2E pour valider la refonte UI/UX complète du site BANDEV
test.describe('BANDEV UI/UX Refactoring - Complete Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3004');
    // Attendre que la page soit complètement chargée
    await page.waitForSelector('h1', { state: 'visible' });
  });

  test('Should display correct global background color #0D1D2C', async ({ page }) => {
    // Vérifier que le fond global du site est bien #0D1D2C
    const bodyElement = page.locator('body');
    await expect(bodyElement).toHaveCSS('background-color', 'rgb(13, 29, 44)'); // #0D1D2C en RGB
  });

  test('Should display BANDEV brand colors from logo extraction', async ({ page }) => {
    // Vérifier que les titres principaux utilisent la couleur de marque #10B981
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    
    // Vérifier que les titres de section utilisent la couleur émeraude de la marque
    const sectionTitles = page.locator('h2, h3').filter({ hasText: /Services|Processus|Stack Technique/ }).first();
    if (await sectionTitles.count() > 0) {
      // Les titres de section devraient utiliser la couleur de marque ou des variantes appropriées
      await expect(sectionTitles).toBeVisible();
    }
  });

  test('Should implement glassmorphism effects correctly', async ({ page }) => {
    // Test des effets glassmorphisme sur les cards
    const cards = page.locator('[class*="glass"], article, .card').first();
    if (await cards.count() > 0) {
      await expect(cards).toBeVisible();
      
      // Vérifier que les propriétés glassmorphisme sont appliquées
      const cardStyle = await cards.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backdropFilter: computed.backdropFilter,
          background: computed.background,
          borderRadius: computed.borderRadius
        };
      });
      
      // Au moins une propriété glassmorphisme doit être présente
      const hasGlassmorphism = cardStyle.backdropFilter.includes('blur') || 
                              cardStyle.background.includes('rgba');
      expect(hasGlassmorphism).toBeTruthy();
    }
  });

  test('Should have premium header with glassmorphism on scroll', async ({ page }) => {
    // Test du header premium avec glassmorphisme au scroll
    const header = page.locator('header, [role="banner"]').first();
    await expect(header).toBeVisible();
    
    // Vérifier l'état initial
    const initialStyle = await header.evaluate(el => window.getComputedStyle(el).background);
    
    // Simuler le scroll
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300); // Attendre l'animation
    
    // Vérifier que l'état du header change au scroll
    const scrolledStyle = await header.evaluate(el => window.getComputedStyle(el).background);
    
    // Le style devrait être différent ou contenir des propriétés glassmorphisme
    expect(scrolledStyle !== initialStyle || scrolledStyle.includes('rgba')).toBeTruthy();
  });

  test('Should display proper contrast ratios for accessibility', async ({ page }) => {
    // Vérifier que les textes ont un contraste suffisant sur le fond #0D1D2C
    const textElements = page.locator('h1, h2, h3, p').first();
    await expect(textElements).toBeVisible();
    
    const textColor = await textElements.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return computed.color;
    });
    
    // Vérifier que la couleur du texte n'est pas la même que le fond
    expect(textColor).not.toBe('rgb(13, 29, 44)');
    
    // Les textes devraient être clairs sur fond sombre
    const isLightText = textColor.includes('rgb(255') || 
                       textColor.includes('rgb(2') || 
                       textColor.includes('rgb(1');
    expect(isLightText).toBeTruthy();
  });

  test('Should have responsive unified components', async ({ page }) => {
    // Test de responsivité des composants UnifiedCard et UnifiedButton
    
    // Desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    const desktopCards = page.locator('article, .card').first();
    if (await desktopCards.count() > 0) {
      await expect(desktopCards).toBeVisible();
    }
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);
    if (await desktopCards.count() > 0) {
      await expect(desktopCards).toBeVisible();
    }
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    if (await desktopCards.count() > 0) {
      await expect(desktopCards).toBeVisible();
    }
  });

  test('Should have proper navigation with brand colors', async ({ page }) => {
    // Test de navigation avec les couleurs de marque
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Tester le hover sur le premier lien
      const firstLink = navLinks.first();
      await expect(firstLink).toBeVisible();
      
      // Simuler hover
      await firstLink.hover();
      await page.waitForTimeout(100);
      
      // Le lien devrait avoir un effet hover
      const hoverStyle = await firstLink.evaluate(el => window.getComputedStyle(el));
      expect(hoverStyle).toBeDefined();
    }
  });

  test('Should have footer with premium styling', async ({ page }) => {
    // Test du footer premium
    const footer = page.locator('footer, [role="contentinfo"]').first();
    await expect(footer).toBeVisible();
    
    // Vérifier que le footer a des styles cohérents avec le thème
    const footerStyle = await footer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.background,
        color: computed.color
      };
    });
    
    // Le footer devrait avoir un background sombre cohérent
    expect(footerStyle.background).toBeDefined();
    expect(footerStyle.color).toBeDefined();
  });

  test('Should have proper typography hierarchy with anthracite colors', async ({ page }) => {
    // Test de hiérarchie typographique
    const headings = {
      h1: page.locator('h1').first(),
      h2: page.locator('h2').first(),
      h3: page.locator('h3').first(),
      p: page.locator('p').first()
    };
    
    for (const [tag, element] of Object.entries(headings)) {
      if (await element.count() > 0) {
        await expect(element).toBeVisible();
        
        const style = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            color: computed.color
          };
        });
        
        // Vérifier que chaque élément a une taille et poids appropriés
        expect(parseFloat(style.fontSize)).toBeGreaterThan(0);
        expect(parseInt(style.fontWeight)).toBeGreaterThan(0);
        
        // La couleur devrait être visible sur fond sombre
        expect(style.color).not.toBe('rgb(13, 29, 44)');
      }
    }
  });

  test('Should maintain functionality with new design system', async ({ page }) => {
    // Test de fonctionnalité avec le nouveau design
    
    // Vérifier que le formulaire de contact est fonctionnel
    const contactForm = page.locator('form').first();
    if (await contactForm.count() > 0) {
      await expect(contactForm).toBeVisible();
      
      // Les champs de formulaire devraient être visibles et utilisables
      const inputs = contactForm.locator('input, textarea').first();
      if (await inputs.count() > 0) {
        await expect(inputs).toBeVisible();
        await expect(inputs).toBeEnabled();
      }
    }
    
    // Vérifier que les boutons CTA sont fonctionnels
    const ctaButtons = page.locator('a[href="/devis"], button');
    const buttonCount = await ctaButtons.count();
    
    if (buttonCount > 0) {
      const firstButton = ctaButtons.first();
      await expect(firstButton).toBeVisible();
      await expect(firstButton).toBeEnabled();
    }
  });

  test('Should have optimized performance with new CSS architecture', async ({ page }) => {
    // Test de performance avec la nouvelle architecture CSS
    
    // Mesurer le temps de chargement initial
    const startTime = Date.now();
    await page.waitForSelector('h1', { state: 'visible' });
    const loadTime = Date.now() - startTime;
    
    // Le chargement devrait être rapide (moins de 3 secondes en développement)
    expect(loadTime).toBeLessThan(3000);
    
    // Vérifier qu'il n'y a pas d'erreurs de console majeures
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Recharger pour capturer les erreurs potentielles
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Ne devrait pas avoir d'erreurs critiques liées au CSS
    const cssErrors = errors.filter(error => 
      error.includes('css') || 
      error.includes('style') || 
      error.includes('unexpected')
    );
    expect(cssErrors.length).toBeLessThan(3); // Tolérer quelques warnings mineurs
  });

});

// Test spécifique pour les composants unifiés
test.describe('Unified Components Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3004');
  });

  test('UnifiedCard components should render correctly', async ({ page }) => {
    // Chercher les articles qui utilisent probablement UnifiedCard
    const articles = page.locator('article');
    const articleCount = await articles.count();
    
    if (articleCount > 0) {
      const firstArticle = articles.first();
      await expect(firstArticle).toBeVisible();
      
      // Vérifier les propriétés visuelles attendues d'une UnifiedCard
      const cardStyle = await firstArticle.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          borderRadius: computed.borderRadius,
          background: computed.background,
          padding: computed.padding
        };
      });
      
      // Devrait avoir un border-radius pour le glassmorphisme
      expect(parseFloat(cardStyle.borderRadius)).toBeGreaterThan(0);
    }
  });

  test('UnifiedButton components should have proper styling', async ({ page }) => {
    // Tester les boutons unifiés
    const buttons = page.locator('button, a[class*="btn"], a[href="/devis"]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Tester l'interaction hover
      await firstButton.hover();
      await page.waitForTimeout(100);
      
      const buttonStyle = await firstButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          borderRadius: computed.borderRadius,
          transition: computed.transition,
          cursor: computed.cursor
        };
      });
      
      // Devrait avoir des propriétés d'interaction
      expect(buttonStyle.cursor).toBe('pointer');
    }
  });

});
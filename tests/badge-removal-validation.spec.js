import { test, expect } from '@playwright/test';

test.describe('Badge Removal - Complete Site Validation', () => {
  test.setTimeout(60000); // Augmenter le timeout global

  test.beforeEach(async ({ page }) => {
    // Configurer des timeouts plus longs
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
  });

  test('Page d\'accueil - Aucun badge "Populaire" visible sur les cartes de pricing', async ({ page }) => {
    // Naviguer vers la page d'accueil
    await page.goto('/', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    // Vérifier que la section tarifs est présente
    const tarifSection = page.locator('section').filter({ hasText: 'Tarifs' }).first();
    await expect(tarifSection).toBeVisible();

    // Vérifier qu'aucun badge "Populaire" n'est présent dans toute la page
    const popularBadges = page.locator('text=Populaire');
    await expect(popularBadges).toHaveCount(0);

    // Vérifier spécifiquement qu'aucun badge n'est présent dans les cartes de pricing
    const pricingCards = page.locator('[class*="pricing"], [data-testid*="pricing"], .card').filter({ hasText: /Site|€|mois/ });
    for (let i = 0; i < await pricingCards.count(); i++) {
      const card = pricingCards.nth(i);
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }

    // Vérifier que les cartes "Site Vitrine Premium" n'ont pas de badge
    const premiumCards = page.locator('text=Site Vitrine Premium').locator('..').locator('..');
    for (let i = 0; i < await premiumCards.count(); i++) {
      const card = premiumCards.nth(i);
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }
  });

  test('Page tarifs - Aucun badge "Populaire" visible sur toutes les cartes de pricing', async ({ page }) => {
    // Naviguer vers la page tarifs
    await page.goto('/tarifs', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    // Vérifier que la page tarifs est bien chargée
    await expect(page.locator('h1')).toContainText(/tarif|prix/i);

    // Vérifier qu'aucun badge "Populaire" n'est présent dans toute la page
    const popularBadges = page.locator('text=Populaire');
    await expect(popularBadges).toHaveCount(0);

    // Vérifier spécifiquement dans la section principale des tarifs
    const mainPricingSection = page.locator('section').filter({ hasText: /Site|€|tarif/i }).first();
    await expect(mainPricingSection).toBeVisible();
    
    const badgesInMainSection = mainPricingSection.locator('text=Populaire');
    await expect(badgesInMainSection).toHaveCount(0);

    // Vérifier dans les cartes de maintenance si elles existent
    const maintenanceSection = page.locator('section').filter({ hasText: /maintenance/i });
    if (await maintenanceSection.count() > 0) {
      const badgesInMaintenance = maintenanceSection.locator('text=Populaire');
      await expect(badgesInMaintenance).toHaveCount(0);
    }

    // Vérifier que toutes les cartes de pricing n'ont pas de badge
    const allPricingCards = page.locator('[class*="card"], [class*="pricing"]').filter({ hasText: /€|Site|mois/ });
    for (let i = 0; i < await allPricingCards.count(); i++) {
      const card = allPricingCards.nth(i);
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }
  });

  test('Navigation complète - Vérification de l\'absence de badges sur toutes les pages principales', async ({ page }) => {
    const pagesToTest = [
      { url: '/', name: 'Accueil' },
      { url: '/tarifs', name: 'Tarifs' },
      { url: '/services', name: 'Services' },
      { url: '/portfolio', name: 'Portfolio' }
    ];

    for (const { url, name } of pagesToTest) {
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForLoadState('domcontentloaded');

      // Vérifier qu'aucun badge "Populaire" n'est présent sur la page
      const popularBadges = page.locator('text=Populaire');
      await expect(popularBadges).toHaveCount(0, `Page ${name} ne devrait pas contenir de badge "Populaire"`);
    }
  });

  test('Vérification spécifique - Les cartes de services ne doivent pas être affectées', async ({ page }) => {
    // Test sur la page services
    await page.goto('/services', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    // Vérifier que les cartes de services sont présentes (avec numéros, pas de badges)
    const serviceCards = page.locator('[class*="service"], .card').filter({ hasText: /développement|création|maintenance/i });
    await expect(serviceCards.first()).toBeVisible();

    // Vérifier qu'aucune carte de service n'a de badge "Populaire"
    for (let i = 0; i < await serviceCards.count(); i++) {
      const card = serviceCards.nth(i);
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }

    // Vérifier que les numéros des services sont toujours présents (1, 2, 3, etc.)
    const numberedElements = page.locator('text=/^[0-9]+$/');
    // Au moins quelques numéros devraient être visibles sur les cartes de service
    await expect(numberedElements.first()).toBeVisible();
  });

  test('Test de régression - Vérifier que la fonctionnalité des cartes de pricing est intacte', async ({ page }) => {
    await page.goto('/tarifs', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    // Vérifier que les cartes de pricing contiennent toujours les informations essentielles
    const pricingCards = page.locator('[class*="card"], [class*="pricing"]').filter({ hasText: /€|Site/ });
    
    // Au moins une carte devrait être visible
    await expect(pricingCards.first()).toBeVisible();

    // Vérifier que les prix sont affichés
    const priceElements = page.locator('text=/\d+\s*€/');
    await expect(priceElements.first()).toBeVisible();

    // Vérifier que les titres de plans sont présents
    const planTitles = page.locator('text=/Site.*Vitrine|Site.*Premium|Site.*E-commerce/i');
    await expect(planTitles.first()).toBeVisible();

    // Vérifier qu'aucun badge n'interfère avec l'affichage
    for (let i = 0; i < await pricingCards.count(); i++) {
      const card = pricingCards.nth(i);
      
      // La carte doit être visible
      await expect(card).toBeVisible();
      
      // La carte ne doit pas contenir de badge "Populaire"
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }
  });

  test('Test mobile - Vérification de l\'absence de badges sur mobile', async ({ page }) => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    // Vérifier qu'aucun badge n'est présent en mobile
    const popularBadges = page.locator('text=Populaire');
    await expect(popularBadges).toHaveCount(0);

    // Tester aussi la page tarifs en mobile
    await page.goto('/tarifs', { waitUntil: 'load' });
    await page.waitForLoadState('domcontentloaded');

    const mobileBadges = page.locator('text=Populaire');
    await expect(mobileBadges).toHaveCount(0);
  });
});
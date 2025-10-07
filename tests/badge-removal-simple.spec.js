import { test, expect } from '@playwright/test';

test.describe('Badge Removal - Core Validation', () => {
  test.setTimeout(60000);

  test('Page d\'accueil - Aucun badge "Populaire"', async ({ page }) => {
    await page.goto('/', { timeout: 45000 });
    
    // Vérifier qu'aucun badge "Populaire" n'est présent
    const popularBadges = page.locator('text=Populaire');
    await expect(popularBadges).toHaveCount(0);
    
    // Vérifier qu'aucun élément avec la classe PopularBadge n'existe
    const badgeElements = page.locator('[class*="popularBadge"], [class*="PopularBadge"]');
    await expect(badgeElements).toHaveCount(0);
  });

  test('Page tarifs - Aucun badge "Populaire"', async ({ page }) => {
    await page.goto('/tarifs', { timeout: 45000 });
    
    // Vérifier qu'aucun badge "Populaire" n'est présent
    const popularBadges = page.locator('text=Populaire');
    await expect(popularBadges).toHaveCount(0);
    
    // Vérifier qu'aucun élément avec la classe PopularBadge n'existe
    const badgeElements = page.locator('[class*="popularBadge"], [class*="PopularBadge"]');
    await expect(badgeElements).toHaveCount(0);
  });

  test('Validation fonctionnelle - Les cartes de pricing fonctionnent sans badges', async ({ page }) => {
    await page.goto('/tarifs', { timeout: 45000 });
    
    // Vérifier que les cartes de pricing sont présentes et visibles
    const pricingCards = page.locator('.card, [class*="card"]').filter({ hasText: /Site|€/ });
    await expect(pricingCards.first()).toBeVisible();
    
    // Vérifier qu'aucune carte ne contient de badge
    for (let i = 0; i < Math.min(await pricingCards.count(), 5); i++) {
      const card = pricingCards.nth(i);
      const badgeInCard = card.locator('text=Populaire');
      await expect(badgeInCard).toHaveCount(0);
    }
  });

  test('Test de navigation - Absence de badges sur les pages principales', async ({ page }) => {
    const pages = ['/', '/tarifs'];
    
    for (const url of pages) {
      await page.goto(url, { timeout: 45000 });
      
      // Vérifier qu'aucun badge "Populaire" n'est présent
      const popularBadges = page.locator('text=Populaire');
      await expect(popularBadges).toHaveCount(0, `Aucun badge sur ${url}`);
    }
  });
});
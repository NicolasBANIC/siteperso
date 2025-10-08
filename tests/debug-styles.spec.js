import { test, expect } from '@playwright/test';

test('Debug header styles', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('header').waitFor({ state: 'visible' });

  // Test viewport sizes
  await page.setViewportSize({ width: 1200, height: 800 });

  const header = page.locator('header');
  const ctaButton = header.locator('a[href="/devis"]').first();
  
  console.log('CTA button exists:', await ctaButton.count());
  
  if (await ctaButton.count() > 0) {
    const styles = await ctaButton.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        borderRadius: computed.borderRadius,
        display: computed.display,
        visibility: computed.visibility
      };
    });
    console.log('CTA button styles:', styles);
  }

  const logo = header.locator('.brand').first();
  console.log('Logo exists:', await logo.count());
  
  if (await logo.count() > 0) {
    const logoStyles = await logo.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity
      };
    });
    console.log('Logo styles:', logoStyles);
  }
});
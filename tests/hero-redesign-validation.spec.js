import { test, expect } from '@playwright/test';

test.describe('Hero Redesign Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not contain MockDashboard component', async ({ page }) => {
    // Check that MockDashboard is completely removed
    const mockDashboard = page.locator('[data-testid="mock-dashboard"], .mock-dashboard');
    await expect(mockDashboard).toHaveCount(0);
    
    // Also check for any text that might indicate dashboard content
    const dashboardText = page.getByText(/dashboard|analytics widget|chart/i);
    await expect(dashboardText).toHaveCount(0);
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check that contact form is present
    const contactForm = page.getByRole('form', { name: /contact/i }).or(
      page.locator('form').or(
        page.getByText('Contact rapide').locator('..')
      )
    );
    
    // Check all required fields are present
    await expect(page.getByRole('textbox', { name: /nom/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /message/i })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: /rgpd|données/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /envoyer/i })).toBeVisible();
  });

  test('should have proper text readability on hero section', async ({ page }) => {
    // Check that main heading is visible and readable
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    
    // Check that text has proper contrast (this tests the CSS properties)
    const headingStyles = await heading.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        textShadow: styles.textShadow,
        fontWeight: styles.fontWeight,
        color: styles.color
      };
    });
    
    // Verify text shadow is applied for readability
    expect(headingStyles.textShadow).not.toBe('none');
    expect(parseInt(headingStyles.fontWeight)).toBeGreaterThanOrEqual(700);
  });

  test('should have responsive layout', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByText('Contact rapide')).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('Contact rapide')).toBeVisible();
    
    // Form should still be accessible on mobile
    await expect(page.getByRole('textbox', { name: /nom/i })).toBeVisible();
  });

  test('should validate form submission', async ({ page }) => {
    // Fill form with valid data
    await page.getByRole('textbox', { name: /nom/i }).fill('Test User');
    await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
    await page.getByRole('checkbox', { name: /rgpd|données/i }).check();
    
    // Submit form
    await page.getByRole('button', { name: /envoyer/i }).click();
    
    // Should show some response (error message since no backend)
    await expect(page.getByRole('alert').or(page.getByText(/erreur|merci/i))).toBeVisible();
  });
});
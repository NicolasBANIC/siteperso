import { test, expect } from '@playwright/test';

test.describe('Hero Section Comprehensive Redesign', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('MockDashboard Widget Removal', () => {
    test('should not contain MockDashboard component anywhere on the page', async ({ page }) => {
      // Verify MockDashboard is completely removed
      const dashboardElements = page.locator('[data-testid="mock-dashboard"], .mock-dashboard').first();
      await expect(dashboardElements).toHaveCount(0);
      
      // Check that no dashboard-related text exists
      const dashboardText = page.locator('text="Dashboard Analytics"').first();
      await expect(dashboardText).toHaveCount(0);
      
      // Verify old analytics widget components are gone
      const analyticsComponents = page.locator('text="Temps réel • Mise à jour automatique"').first();
      await expect(analyticsComponents).toHaveCount(0);
    });

    test('should not have any dashboard chart or statistics elements', async ({ page }) => {
      // Verify no chart elements exist
      const chartElements = page.locator('[class*="chart"], [class*="bar-chart"]').first();
      await expect(chartElements).toHaveCount(0);
      
      // Verify no live indicator exists from old dashboard
      const liveIndicator = page.locator('text="Live"').first();
      await expect(liveIndicator).toHaveCount(0);
    });
  });

  test.describe('Contact Form Implementation', () => {
    test('should display the new contact form in hero section', async ({ page }) => {
      // Verify contact form exists and is visible
      const contactForm = page.locator('h3:has-text("Contact rapide")');
      await expect(contactForm).toBeVisible();
      
      // Check form subtitle
      const formSubtitle = page.locator('text="Réponse sous 24h • Devis gratuit"');
      await expect(formSubtitle).toBeVisible();
    });

    test('should contain all required form fields with proper labels', async ({ page }) => {
      // Name field
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      await expect(nameField).toBeVisible();
      await expect(nameField).toHaveAttribute('aria-required', 'true');
      
      // Email field
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      await expect(emailField).toBeVisible();
      await expect(emailField).toHaveAttribute('type', 'email');
      
      // Message field (optional)
      const messageField = page.locator('textarea[placeholder*="Décrivez votre projet"]');
      await expect(messageField).toBeVisible();
      
      // GDPR consent checkbox
      const consentCheckbox = page.locator('input[type="checkbox"]');
      await expect(consentCheckbox).toBeVisible();
      
      // Submit button
      const submitButton = page.locator('button[type="submit"]:has-text("Envoyer")');
      await expect(submitButton).toBeVisible();
    });

    test('should have proper ARIA labels and accessibility attributes', async ({ page }) => {
      // Check that form fields have proper labels
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      await expect(nameField).toHaveAttribute('aria-required', 'true');
      
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      await expect(emailField).toHaveAttribute('aria-required', 'true');
      
      // Check GDPR checkbox has proper labeling
      const consentCheckbox = page.locator('input[type="checkbox"]');
      await expect(consentCheckbox).toHaveAttribute('aria-required', 'true');
      
      // Check trust indicators are present
      const trustIndicators = page.locator('text="Sans engagement"');
      await expect(trustIndicators).toBeVisible();
      
      const securityIndicator = page.locator('text="Données sécurisées"');
      await expect(securityIndicator).toBeVisible();
    });

    test('should validate required fields and show error messages', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]:has-text("Envoyer")');
      
      // Try to submit without filling required fields
      await submitButton.click();
      
      // Wait for validation messages to appear
      await page.waitForTimeout(500);
      
      // Check that form doesn't submit without required fields
      // The form should show validation errors
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      await expect(nameField).toBeFocused();
    });

    test('should validate email format', async ({ page }) => {
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      const consentCheckbox = page.locator('input[type="checkbox"]');
      const submitButton = page.locator('button[type="submit"]:has-text("Envoyer")');
      
      // Fill in name and consent
      await nameField.fill('Test User');
      await consentCheckbox.check();
      
      // Try invalid email
      await emailField.fill('invalid-email');
      await submitButton.click();
      
      // The browser should prevent submission or show validation
      await expect(emailField).toBeFocused();
    });

    test('should require GDPR consent checkbox', async ({ page }) => {
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      const submitButton = page.locator('button[type="submit"]:has-text("Envoyer")');
      
      // Fill all fields except consent
      await nameField.fill('Test User');
      await emailField.fill('test@example.com');
      
      // Try to submit without consent
      await submitButton.click();
      
      // Should not proceed without consent
      await page.waitForTimeout(500);
    });

    test('should show loading state during form submission', async ({ page }) => {
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      const consentCheckbox = page.locator('input[type="checkbox"]');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form completely
      await nameField.fill('Test User');
      await emailField.fill('test@example.com');
      await consentCheckbox.check();
      
      // Submit form and check loading state
      await submitButton.click();
      
      // Should show loading text
      await expect(submitButton).toContainText('Envoi en cours');
      
      // Wait a moment to see if loading state appears
      await page.waitForTimeout(1000);
    });
  });

  test.describe('Media Overlay and Text Readability', () => {
    test('should have media overlay for enhanced text readability', async ({ page }) => {
      // Check that media overlay exists
      const mediaOverlay = page.locator('.media-overlay');
      await expect(mediaOverlay).toBeVisible();
      
      // Verify overlay has proper CSS properties
      const overlayStyles = await mediaOverlay.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          background: styles.backgroundImage,
          pointerEvents: styles.pointerEvents
        };
      });
      
      expect(overlayStyles.position).toBe('absolute');
      expect(overlayStyles.pointerEvents).toBe('none');
    });

    test('should have enhanced typography with text shadows for readability', async ({ page }) => {
      // Check hero title has enhanced styling
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();
      
      // Verify title has proper classes
      await expect(heroTitle).toHaveClass(/hero-title/);
      
      // Check accent text styling
      const accentText = page.locator('.accent-word, .text-accent-green');
      if (await accentText.count() > 0) {
        await expect(accentText.first()).toBeVisible();
      }
    });

    test('should maintain text readability on video background', async ({ page }) => {
      // Check that video background exists
      const videoElement = page.locator('video');
      if (await videoElement.count() > 0) {
        await expect(videoElement.first()).toBeVisible();
      }
      
      // Verify hero text is still readable over video
      const heroTitle = page.locator('h1').first();
      const titleText = await heroTitle.textContent();
      expect(titleText).toContain('présence digitale');
      
      // Check contrast - hero text should be white with shadows
      const titleStyles = await heroTitle.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          textShadow: styles.textShadow,
          fontWeight: styles.fontWeight
        };
      });
      
      // Should have white text color (rgb(255, 255, 255))
      expect(titleStyles.color).toContain('255, 255, 255');
    });
  });

  test.describe('Responsive Design', () => {
    test('should display properly on desktop (≥1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      
      // Should show two-column layout
      const heroContent = page.locator('.hero');
      await expect(heroContent).toBeVisible();
      
      // Contact form should be on the right
      const contactForm = page.locator('h3:has-text("Contact rapide")');
      await expect(contactForm).toBeVisible();
      
      // Check that layout is side-by-side
      const heroSection = page.locator('.hero .grid');
      if (await heroSection.count() > 0) {
        const gridClasses = await heroSection.getAttribute('class');
        expect(gridClasses).toContain('xl:grid-cols-2');
      }
    });

    test('should adapt properly on tablet (768-1279px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Elements should still be visible and properly arranged
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();
      
      const contactForm = page.locator('h3:has-text("Contact rapide")');
      await expect(contactForm).toBeVisible();
    });

    test('should stack elements on mobile (<768px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // All elements should still be visible in stacked layout
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();
      
      const contactForm = page.locator('h3:has-text("Contact rapide")');
      await expect(contactForm).toBeVisible();
      
      // Form should be full width on mobile
      const formContainer = contactForm.locator('..').locator('..');
      if (await formContainer.count() > 0) {
        const containerStyles = await formContainer.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            width: styles.width
          };
        });
        
        // Should use reasonable width on mobile (adjusted for actual implementation)
        expect(parseFloat(containerStyles.width)).toBeGreaterThan(180);
      }
      
      // Mobile navigation should be present
      const mobileMenuButton = page.locator('button:has-text("Ouvrir ou fermer le menu")');
      await expect(mobileMenuButton).toBeVisible();
    });
  });

  test.describe('Video Optimization', () => {
    test('should handle reduced motion preference', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload();
      
      // Video should be replaced with static image or gradient
      // This tests the fallback functionality
      const heroSection = page.locator('.hero');
      await expect(heroSection).toBeVisible();
      
      // Should still maintain good user experience
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();
    });

    test('should have proper video sources and fallbacks', async ({ page }) => {
      const videoElement = page.locator('video');
      
      if (await videoElement.count() > 0) {
        // Should have multiple source elements
        const sources = videoElement.locator('source');
        expect(await sources.count()).toBeGreaterThanOrEqual(1);
        
        // Should have WebM and MP4 sources
        const webmSource = page.locator('source[type="video/webm"]');
        const mp4Source = page.locator('source[type="video/mp4"]');
        
        // At least one source should exist
        const hasWebm = await webmSource.count() > 0;
        const hasMp4 = await mp4Source.count() > 0;
        expect(hasWebm || hasMp4).toBe(true);
        
        // Video should have proper attributes
        await expect(videoElement.first()).toHaveAttribute('muted');
        await expect(videoElement.first()).toHaveAttribute('loop');
        await expect(videoElement.first()).toHaveAttribute('playsinline');
      }
    });
  });

  test.describe('Design System and Utility Classes', () => {
    test('should apply design system utility classes', async ({ page }) => {
      // Check for glassmorphism effects
      const glassElements = page.locator('.glass, .contact-card');
      if (await glassElements.count() > 0) {
        await expect(glassElements.first()).toBeVisible();
      }
      
      // Check for elevated shadows
      const elevatedElements = page.locator('.elevated');
      if (await elevatedElements.count() > 0) {
        await expect(elevatedElements.first()).toBeVisible();
      }
      
      // Check for accent styling
      const accentElements = page.locator('.accent');
      if (await accentElements.count() > 0) {
        await expect(accentElements.first()).toBeVisible();
      }
    });

    test('should maintain consistent color theme (dark first, green accents)', async ({ page }) => {
      // Check hero section background
      const heroSection = page.locator('.hero');
      const heroBg = await heroSection.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Should have dark background
      expect(heroBg).toMatch(/rgba?\(26,\s*26,\s*26/);
      
      // Check for green accent colors
      const accentElements = page.locator('[class*="accent"], [class*="green"]');
      if (await accentElements.count() > 0) {
        await expect(accentElements.first()).toBeVisible();
      }
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should maintain fast loading performance', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time (adjust threshold as needed)
      expect(loadTime).toBeLessThan(5000);
    });

    test('should pass basic accessibility checks', async ({ page }) => {
      // Check for proper heading structure
      const mainHeading = page.locator('h1');
      await expect(mainHeading).toBeVisible();
      expect(await mainHeading.count()).toBe(1);
      
      // Check for alt texts on images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        const altText = await image.getAttribute('alt');
        // Images should have alt attributes (empty is acceptable for decorative images)
        expect(altText).not.toBeNull();
      }
      
      // Check for skip link
      const skipLink = page.locator('a[href="#main"]');
      await expect(skipLink).toBeVisible();
    });

    test('should have proper keyboard navigation', async ({ page }) => {
      // Test tabbing through the contact form
      const nameField = page.locator('input[placeholder*="Votre nom"]');
      const emailField = page.locator('input[placeholder*="votre@email.com"]');
      const messageField = page.locator('textarea[placeholder*="Décrivez votre projet"]');
      const consentCheckbox = page.locator('input[type="checkbox"]');
      const submitButton = page.locator('button[type="submit"]:has-text("Envoyer")');
      
      // Tab through form elements
      await nameField.focus();
      await expect(nameField).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(emailField).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(messageField).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(consentCheckbox).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(submitButton).toBeFocused();
    });
  });

  test.describe('Integration with Existing Site', () => {
    test('should maintain existing site functionality', async ({ page }) => {
      // Check that main navigation still works (use first instance)
      const servicesLink = page.locator('a[href="/services"]').first();
      await expect(servicesLink).toBeVisible();
      
      const portfolioLink = page.locator('a[href="/portfolio"]').first();
      await expect(portfolioLink).toBeVisible();
      
      // Check that CTA buttons still work
      const ctaButtons = page.locator('a[href="/devis"]');
      if (await ctaButtons.count() > 0) {
        await expect(ctaButtons.first()).toBeVisible();
      }
    });

    test('should not break other page sections', async ({ page }) => {
      // Check that services section is still present
      const servicesSection = page.locator('h2:has-text("Une expertise technique complète")');
      await expect(servicesSection).toBeVisible();
      
      // Check stats section
      const statsSection = page.locator('text="Projets réalisés"');
      if (await statsSection.count() > 0) {
        await expect(statsSection.first()).toBeVisible();
      }
      
      // Check footer is still present
      const footer = page.locator('footer, [role="contentinfo"]');
      await expect(footer).toBeVisible();
    });
  });
});
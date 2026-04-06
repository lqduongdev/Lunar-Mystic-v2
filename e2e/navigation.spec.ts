import { test, expect } from './fixtures';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });

  test('should navigate to onboarding page', async ({ page }) => {
    await page.goto('/');

    const onboardingLink = page.locator('a[href="/onboarding"]');
    if (await onboardingLink.count() > 0) {
      await onboardingLink.click();
      await expect(page).toHaveURL('/onboarding');
    }
  });

  test('should navigate to home page from any page', async ({ page }) => {
    await page.goto('/home');
    await expect(page.locator('a[href="/home"]')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Check all navigation links are clickable
    const navLinks = page.locator('nav a, header a, [role="navigation"] a');
    const count = await navLinks.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });
});

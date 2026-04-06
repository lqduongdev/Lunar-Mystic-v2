import { test, expect } from './fixtures';

test.describe('Navigation', () => {
  test('should redirect from home', async ({ page }) => {
    await page.goto('/');
    // Home page redirects to onboarding or auth
    await expect(page).toHaveURL(/^\/(onboarding|auth)(\?.*)?$/, { timeout: 5000 });
  });

  test('should load onboarding page', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page).toHaveURL('/onboarding');
  });

  test('should load home page', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL('/home');
  });

  test('should load settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL('/settings');
  });

  test('should load aspects page', async ({ page }) => {
    await page.goto('/aspects');
    await expect(page).toHaveURL('/aspects');
  });
});

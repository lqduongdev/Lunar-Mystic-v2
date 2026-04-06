import { test, expect } from './fixtures';

test.describe('Navigation', () => {
  test('should redirect from home', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/\/(onboarding|auth|home)(\?.*)?/);
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

  test('should load result page', async ({ page }) => {
    await page.goto('/result');
    await expect(page).toHaveURL('/result');
  });
});

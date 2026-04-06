import { test, expect } from './fixtures';

test.describe('Home Page', () => {
  test('should load and redirect from home', async ({ page }) => {
    await page.goto('/');
    // Home page redirects - wait for navigation
    await page.waitForURL(/\/(onboarding|auth|home)(\?.*)?/);
  });

  test('should have a valid title', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveTitle(/.+/);
  });

  test('should load home page content', async ({ page }) => {
    await page.goto('/home');
    await expect(page.locator('body')).toBeVisible();
  });
});

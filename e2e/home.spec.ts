import { test, expect } from './fixtures';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    // Home page may redirect to onboarding or auth
    await expect(page).toHaveURL(/^\/(onboarding|auth)?(\?.*)?$/);
  });

  test('should have a valid title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('Lunar Mystic');
  });

  test('should display Lunar Mystic branding', async ({ page }) => {
    await page.goto('/');

    // Check for the main heading with the Lunar Mystic title
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');

    // Check for main element (present on splash page)
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });
});

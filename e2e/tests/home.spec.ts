import { test, expect } from '../fixtures';
import { HomePage } from '../pages/HomePage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { TEST_USERS } from '../utils/test-data';

test.describe('Home Page', () => {
  let homePage: HomePage;
  let onboardingPage: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    onboardingPage = new OnboardingPage(page);

    // Clear state and complete onboarding
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Complete onboarding for authenticated tests
    if (!test.info().title.includes('redirect')) {
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
    }
  });

  test.describe('Page Load', () => {
    test('HM-01: should display home page with all analysis cards', async ({ page }) => {
      await homePage.navigate();

      // Verify all cards are visible
      expect(await homePage.isCardVisible('lifetime')).toBeTruthy();
      expect(await homePage.isCardVisible('daily')).toBeTruthy();
      expect(await homePage.isCardVisible('specific')).toBeTruthy();
    });

    test('HM-02: should display header on home page', async ({ page }) => {
      await homePage.navigate();
      await expect(homePage.header).toBeVisible();
    });

    test('HM-03: should display settings button', async ({ page }) => {
      await homePage.navigate();
      await expect(homePage.settingsButton).toBeVisible();
    });

    test('HM-04: should have correct page title', async ({ page }) => {
      await homePage.navigate();
      await expect(page).toHaveTitle(/.+/);
    });
  });

  test.describe('Card Interactions', () => {
    test('HM-05: should navigate to result when clicking Whole Life card', async ({ page }) => {
      await homePage.selectWholeLifeAnalysis();
      await expect(page).toHaveURL(/\/result/);
    });

    test('HM-06: should navigate to result when clicking Daily Forecast card', async ({ page }) => {
      await homePage.selectDailyForecast();
      await expect(page).toHaveURL(/\/result/);
    });

    test('HM-07: should navigate to aspects when clicking Specific Analysis card', async ({ page }) => {
      await homePage.selectSpecificAnalysis();
      await expect(page).toHaveURL(/\/aspects/);
    });

    test('HM-08: should have three cards total', async ({ page }) => {
      await homePage.navigate();
      const cards = await homePage.getAllCards();
      expect(cards.length).toBe(3);
    });
  });

  test.describe('Navigation', () => {
    test('HM-09: should navigate to settings from home', async ({ page }) => {
      await homePage.navigate();
      await homePage.goToSettings();
      await expect(page).toHaveURL(/\/settings/);
    });

    test('HM-10: should maintain user state after navigation', async ({ page }) => {
      await homePage.navigate();

      // Navigate away and back
      await homePage.goToSettings();
      await page.goBack();

      // User should still be logged in
      await expect(page).toHaveURL(/\/home/);
    });
  });

  test.describe('Access Control', () => {
    test('HM-11: should redirect to onboarding if not authenticated', async ({ page }) => {
      await page.evaluate(() => localStorage.clear());
      await page.goto('/home');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('HM-12: should allow direct access when authenticated', async ({ page }) => {
      await homePage.navigate();
      await expect(page).toHaveURL(/\/home/);
    });
  });

  test.describe('Responsive Design', () => {
    test('HM-13: should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await homePage.navigate();

      // Cards should still be visible on mobile
      expect(await homePage.isCardVisible('lifetime')).toBeTruthy();
      expect(await homePage.isCardVisible('daily')).toBeTruthy();
      expect(await homePage.isCardVisible('specific')).toBeTruthy();
    });

    test('HM-14: should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await homePage.navigate();

      expect(await homePage.isCardVisible('lifetime')).toBeTruthy();
      expect(await homePage.isCardVisible('daily')).toBeTruthy();
      expect(await homePage.isCardVisible('specific')).toBeTruthy();
    });

    test('HM-15: should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await homePage.navigate();

      expect(await homePage.isCardVisible('lifetime')).toBeTruthy();
      expect(await homePage.isCardVisible('daily')).toBeTruthy();
      expect(await homePage.isCardVisible('specific')).toBeTruthy();
    });
  });
});
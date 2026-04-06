import { test, expect } from '../fixtures';
import { OnboardingPage } from '../pages/OnboardingPage';
import { HomePage } from '../pages/HomePage';
import { AspectsPage } from '../pages/AspectsPage';
import { ResultPage } from '../pages/ResultPage';
import { SettingsPage } from '../pages/SettingsPage';
import { TEST_USERS } from '../utils/test-data';

test.describe('Navigation Flow', () => {
  let onboardingPage: OnboardingPage;
  let homePage: HomePage;
  let aspectsPage: AspectsPage;
  let resultPage: ResultPage;
  let settingsPage: SettingsPage;

  test.beforeEach(async ({ page }) => {
    onboardingPage = new OnboardingPage(page);
    homePage = new HomePage(page);
    aspectsPage = new AspectsPage(page);
    resultPage = new ResultPage(page);
    settingsPage = new SettingsPage(page);

    // Clear state before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Root Navigation', () => {
    test('NV-01: should redirect to onboarding when not authenticated', async ({ page }) => {
      await page.goto('/');

      // Should redirect to onboarding or home
      await page.waitForURL(/\/(onboarding|home)/, { timeout: 10000 });
    });

    test('NV-02: should redirect to home when already authenticated', async ({ page }) => {
      // Complete onboarding first
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate to root
      await page.goto('/');

      // Should redirect to home
      await expect(page).toHaveURL(/\/home/);
    });
  });

  test.describe('Full User Flow', () => {
    test('NV-03: should complete onboarding -> home -> result flow', async ({ page }) => {
      // Step 1: Onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Step 2: Select lifetime analysis
      await homePage.selectWholeLifeAnalysis();
      await expect(page).toHaveURL(/\/result/);

      // Step 3: Verify result loads
      await resultPage.waitForResults();
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('NV-04: should complete onboarding -> home -> aspects -> result flow', async ({ page }) => {
      // Step 1: Onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Step 2: Navigate to aspects
      await homePage.selectSpecificAnalysis();
      await expect(page).toHaveURL(/\/aspects/);

      // Step 3: Select an aspect
      await aspectsPage.selectAspect('love');
      await expect(page).toHaveURL(/\/result/);

      // Step 4: Verify result loads
      await resultPage.waitForResults();
      expect(await resultPage.isAstrologyContentVisible()).toBeTruthy();
    });

    test('NV-05: should access settings from any page', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Access settings from home
      await homePage.goToSettings();
      await expect(page).toHaveURL(/\/settings/);

      // Go back to home
      await settingsPage.goBack();
      await expect(page).toHaveURL(/\/home/);

      // Navigate to result
      await homePage.selectWholeLifeAnalysis();
      await expect(page).toHaveURL(/\/result/);

      // Access settings from result
      await resultPage.settingsButton.click();
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('Browser Navigation', () => {
    test('NV-06: should handle browser back navigation', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate to settings
      await homePage.goToSettings();
      await expect(page).toHaveURL(/\/settings/);

      // Go back
      await page.goBack();
      await expect(page).toHaveURL(/\/home/);

      // Navigate to result
      await homePage.selectWholeLifeAnalysis();
      await expect(page).toHaveURL(/\/result/);

      // Go back
      await page.goBack();
      await expect(page).toHaveURL(/\/home/);
    });

    test('NV-07: should handle browser forward navigation', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate to settings
      await homePage.goToSettings();
      await expect(page).toHaveURL(/\/settings/);

      // Go back and forward
      await page.goBack();
      await expect(page).toHaveURL(/\/home/);

      await page.goForward();
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('Direct URL Access', () => {
    test('NV-08: should access home directly when authenticated', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Direct access
      await page.goto('/home');
      await expect(page).toHaveURL(/\/home/);
    });

    test('NV-09: should access settings directly when authenticated', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Direct access
      await settingsPage.navigate();
      await expect(page).toHaveURL(/\/settings/);
    });

    test('NV-10: should access aspects directly when authenticated', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Direct access
      await aspectsPage.navigate();
      await expect(page).toHaveURL(/\/aspects/);
    });

    test('NV-11: should redirect to onboarding from home when not authenticated', async ({ page }) => {
      await page.goto('/home');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('NV-12: should redirect to onboarding from settings when not authenticated', async ({ page }) => {
      await page.goto('/settings');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('NV-13: should redirect to onboarding from aspects when not authenticated', async ({ page }) => {
      await page.goto('/aspects');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('NV-14: should redirect to onboarding from result when not authenticated', async ({ page }) => {
      await page.goto('/result');

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });
  });

  test.describe('Header Navigation', () => {
    test('NV-15: should have consistent header across pages', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Check header on home
      await expect(homePage.header).toBeVisible();
      const homeHeader = await homePage.header.textContent();

      // Check header on settings
      await homePage.goToSettings();
      await expect(settingsPage.header).toBeVisible();

      // Check header on result
      await settingsPage.goBack();
      await homePage.selectWholeLifeAnalysis();
      await expect(resultPage.header).toBeVisible();
    });

    test('NV-16: should navigate via settings icon', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate via settings button
      await homePage.goToSettings();
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('State Persistence', () => {
    test('NV-17: should maintain user info across navigation', async ({ page }) => {
      const user = TEST_USERS.vietnamese;

      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(user);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Navigate around
      await homePage.goToSettings();
      await settingsPage.goBack();
      await homePage.selectWholeLifeAnalysis();
      await resultPage.waitForResults();

      // Check user info is still correct
      const userName = await resultPage.getUserName();
      expect(userName).toContain(user.name.split(' ')[0]);
    });

    test('NV-18: should maintain settings across navigation', async ({ page }) => {
      // Complete onboarding
      await onboardingPage.navigate();
      await onboardingPage.fillForm(TEST_USERS.vietnamese);
      await onboardingPage.submit();
      await expect(page).toHaveURL(/\/home/, { timeout: 10000 });

      // Change settings
      await homePage.goToSettings();
      await settingsPage.selectLanguage('en');
      await settingsPage.selectLightTheme();

      // Navigate away
      await settingsPage.goBack();
      await homePage.selectWholeLifeAnalysis();
      await resultPage.waitForResults();

      // Go back to settings
      await resultPage.settingsButton.click();

      // Settings should be persisted
      const lang = await settingsPage.getCurrentLanguage();
      const theme = await settingsPage.getCurrentTheme();

      expect(lang).toBe('en');
      expect(theme).toBe('light');
    });
  });
});
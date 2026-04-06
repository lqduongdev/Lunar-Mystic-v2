import { test, expect } from '../fixtures';
import { SettingsPage } from '../pages/SettingsPage';
import { HomePage } from '../pages/HomePage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { TEST_USERS } from '../utils/test-data';

test.describe('Settings Page', () => {
  let settingsPage: SettingsPage;
  let homePage: HomePage;
  let onboardingPage: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    settingsPage = new SettingsPage(page);
    homePage = new HomePage(page);
    onboardingPage = new OnboardingPage(page);

    // Clear state and complete onboarding
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    await onboardingPage.navigate();
    await onboardingPage.fillForm(TEST_USERS.vietnamese);
    await onboardingPage.submit();
    await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
  });

  test.describe('Page Load', () => {
    test('ST-01: should display settings page', async ({ page }) => {
      await settingsPage.navigate();
      await expect(page).toHaveURL(/\/settings/);
    });

    test('ST-02: should display all settings sections', async ({ page }) => {
      await settingsPage.navigate();

      // Language section
      await expect(settingsPage.languageSelect).toBeVisible();

      // Theme section (radio buttons)
      const themeSection = page.locator('section:has-text("Giao diện"), section:has-text("Theme")');
      await expect(themeSection).toBeVisible();

      // Notifications section
      await expect(settingsPage.notificationToggle).toBeVisible();
    });

    test('ST-03: should display header', async ({ page }) => {
      await settingsPage.navigate();
      await expect(settingsPage.header).toBeVisible();
    });

    test('ST-04: should display back button', async ({ page }) => {
      await settingsPage.navigate();
      await expect(settingsPage.backButton).toBeVisible();
    });
  });

  test.describe('Language Selection', () => {
    test('ST-05: should switch to English', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectLanguage('en');

      // Verify language changed
      const currentLang = await settingsPage.getCurrentLanguage();
      expect(currentLang).toBe('en');
    });

    test('ST-06: should switch to Vietnamese', async ({ page }) => {
      await settingsPage.navigate();

      // First switch to English
      await settingsPage.selectLanguage('en');

      // Then switch back to Vietnamese
      await settingsPage.selectLanguage('vi');

      const currentLang = await settingsPage.getCurrentLanguage();
      expect(currentLang).toBe('vi');
    });

    test('ST-07: should persist language across page reload', async ({ page }) => {
      await settingsPage.navigate();
      await settingsPage.selectLanguage('en');

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Language should still be English
      const currentLang = await settingsPage.getCurrentLanguage();
      expect(currentLang).toBe('en');
    });

    test('ST-08: should persist language across navigation', async ({ page }) => {
      await settingsPage.navigate();
      await settingsPage.selectLanguage('en');

      // Navigate away and back
      await homePage.navigate();
      await settingsPage.navigate();

      const currentLang = await settingsPage.getCurrentLanguage();
      expect(currentLang).toBe('en');
    });
  });

  test.describe('Theme Selection', () => {
    test('ST-09: should switch to light theme', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectLightTheme();

      const theme = await settingsPage.getCurrentTheme();
      expect(theme).toBe('light');
    });

    test('ST-10: should switch to dark theme', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectDarkTheme();

      const theme = await settingsPage.getCurrentTheme();
      expect(theme).toBe('dark');
    });

    test('ST-11: should switch to system theme', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectSystemTheme();

      // System theme could be either light or dark depending on system
      const theme = await settingsPage.getCurrentTheme();
      expect(['light', 'dark']).toContain(theme);
    });

    test('ST-12: should persist theme across page reload', async ({ page }) => {
      await settingsPage.navigate();
      await settingsPage.selectLightTheme();

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      const theme = await settingsPage.getCurrentTheme();
      expect(theme).toBe('light');
    });

    test('ST-13: should apply theme to page elements', async ({ page }) => {
      await settingsPage.navigate();

      // Set dark theme
      await settingsPage.selectDarkTheme();

      // Check data-theme attribute on html
      const htmlTheme = await page.locator('html').getAttribute('data-theme');
      expect(htmlTheme).toBe('dark');
    });
  });

  test.describe('Notifications Toggle', () => {
    test('ST-14: should toggle notifications on', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.toggleNotifications(true);

      const isEnabled = await settingsPage.isNotificationsEnabled();
      expect(isEnabled).toBeTruthy();
    });

    test('ST-15: should toggle notifications off', async ({ page }) => {
      await settingsPage.navigate();

      // First ensure it's on
      await settingsPage.toggleNotifications(true);

      // Then toggle off
      await settingsPage.toggleNotifications(false);

      const isEnabled = await settingsPage.isNotificationsEnabled();
      expect(isEnabled).toBeFalsy();
    });

    test('ST-16: should persist notification setting across reload', async ({ page }) => {
      await settingsPage.navigate();
      await settingsPage.toggleNotifications(true);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      const isEnabled = await settingsPage.isNotificationsEnabled();
      expect(isEnabled).toBeTruthy();
    });
  });

  test.describe('Links', () => {
    test('ST-17: should display help link', async ({ page }) => {
      await settingsPage.navigate();
      await expect(settingsPage.helpLink).toBeVisible();
    });

    test('ST-18: should display privacy link', async ({ page }) => {
      await settingsPage.navigate();
      await expect(settingsPage.privacyLink).toBeVisible();
    });
  });

  test.describe('Version Info', () => {
    test('ST-19: should display version information', async ({ page }) => {
      await settingsPage.navigate();

      const version = await settingsPage.getVersion();
      expect(version.length).toBeGreaterThan(0);
    });
  });

  test.describe('Navigation', () => {
    test('ST-20: should navigate back to home', async ({ page }) => {
      await settingsPage.navigate();
      await settingsPage.goBack();

      await expect(page).toHaveURL(/\/home/);
    });

    test('ST-21: should access settings from home', async ({ page }) => {
      await homePage.navigate();
      await homePage.goToSettings();

      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('Access Control', () => {
    test('ST-22: should redirect to onboarding if not authenticated', async ({ page }) => {
      await page.evaluate(() => localStorage.clear());
      await settingsPage.navigate();

      // Should redirect to onboarding
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    test('ST-23: should allow direct access when authenticated', async ({ page }) => {
      await settingsPage.navigate();
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  test.describe('Responsive Design', () => {
    test('ST-24: should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await settingsPage.navigate();

      await expect(settingsPage.languageSelect).toBeVisible();
      await expect(settingsPage.notificationToggle).toBeVisible();
    });

    test('ST-25: should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await settingsPage.navigate();

      await expect(settingsPage.languageSelect).toBeVisible();
      await expect(settingsPage.notificationToggle).toBeVisible();
    });

    test('ST-26: should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await settingsPage.navigate();

      await expect(settingsPage.languageSelect).toBeVisible();
      await expect(settingsPage.notificationToggle).toBeVisible();
    });
  });

  test.describe('Combined Settings', () => {
    test('ST-27: should change language and theme together', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectLanguage('en');
      await settingsPage.selectLightTheme();

      const lang = await settingsPage.getCurrentLanguage();
      const theme = await settingsPage.getCurrentTheme();

      expect(lang).toBe('en');
      expect(theme).toBe('light');
    });

    test('ST-28: should persist combined settings', async ({ page }) => {
      await settingsPage.navigate();

      await settingsPage.selectLanguage('en');
      await settingsPage.selectLightTheme();
      await settingsPage.toggleNotifications(true);

      // Reload
      await page.reload();
      await page.waitForLoadState('networkidle');

      const lang = await settingsPage.getCurrentLanguage();
      const theme = await settingsPage.getCurrentTheme();
      const notif = await settingsPage.isNotificationsEnabled();

      expect(lang).toBe('en');
      expect(theme).toBe('light');
      expect(notif).toBeTruthy();
    });
  });
});